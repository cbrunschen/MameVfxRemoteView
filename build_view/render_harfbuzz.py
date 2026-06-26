#!/usr/bin/env python3

import uharfbuzz as hb
import os
import subprocess
from textwrap import dedent
from dataclasses import dataclass, field
from util import Alignment, dprint, set_debug
from renderutil import Metrics, PathBuilder, ti
import render
      

@dataclass
class Font(render.Font):
  font: hb.Font # type: ignore

  def __post_init__(self):
    dprint(f'Created: {str(self)}')
  
  def scaledTo(self, get, target: float) -> Font:
    scale = self.scaleFor(get, target)
    return Font(self.family, self.size * scale, self.metrics * scale, self.font, bold=self.bold, italic=self.italic)


class TextRenderer(render.TextRenderer):
  file_path = os.path.split(os.path.dirname(os.path.realpath(__file__)))[0]
  font_map = { 
    'Arimo' : {
      False: os.path.join(file_path, 'fonts/Arimo.ttf'),
      True : os.path.join(file_path, 'fonts/Arimo-Italic.ttf'),
    },
  }

  def get_font_file(self, family: str, bold: bool, italic: bool):
    dprint(f'get_font_file("{family}", {bold=}, {italic=})')
    if family in self.font_map:
      path = self.font_map[family][italic]
      dprint(f'get_font_file() from map returns "{path}"')
      return path

    weight = 'bold' if bold else 'regular'
    slant = 'italic' if italic else 'roman'
    cmd = ['fc-match', '--format=%{file}', f'{family}:weight={weight}:slant={slant}']
    dprint(f'get_font_file() running command: "{cmd}"')
    result = subprocess.run(cmd, capture_output=True, encoding='utf8')
    dprint(f'get_font_file() result: "{result.stdout}"')
    return result.stdout
  
  def pathForText(self, s:str, font: hb.Font): # type: ignore
    buf = hb.Buffer() # type: ignore
    buf.add_str(s)
    buf.guess_segment_properties()

    features = {"kern": True, "liga": False}
    hb.shape(font, buf, features) # type: ignore

    pb = PathBuilder()  

    def moveTo(x, y, userdata=None): pb.moveTo(x, y)
    def lineTo(x, y, userdata=None): pb.lineTo(x, y)
    def quadTo(x1, y1, x2, y2, userdata=None): pb.quadTo(x1, y1, x2, y2)
    def cubicTo(x1, y1, x2, y2, x3, y3, userdata=None): pb.cubicTo(x1, y1, x2, y2, x3, y3)  
    def closePath(userdata=None): pb.close()

    draw_funcs = hb.DrawFuncs() # type: ignore
    draw_funcs.set_move_to_func(moveTo)
    draw_funcs.set_line_to_func(lineTo)
    draw_funcs.set_quadratic_to_func(quadTo)
    draw_funcs.set_cubic_to_func(cubicTo)
    draw_funcs.set_close_path_func(closePath)

    infos = buf.glyph_infos
    positions = buf.glyph_positions

    for info, pos in zip(infos, positions):
      font.draw_glyph(info.codepoint, draw_funcs)
      pb.advance(pos.x_advance, pos.y_advance)

    return pb.build()

  def getFamily(self, font_family: str):
    if font_family == 'Panel':
      return 'Arimo'
    return font_family

  def measure(self, s: str, font: hb.Font, baseline:float): # type: ignore
    path = self.pathForText(s, font).tf(1, -1, 0, baseline)
    return path.bbox()

  def metrics(self, font: hb.Font): # type: ignore
    extents = font.get_font_extents('ltr')

    ascent = extents.ascender
    descent = -extents.descender
    height = ascent + descent + extents.line_gap
    baseline = height - descent

    (_, text_y_min, _, text_y_max) = self.measure('lj', font, baseline)
    (_, cap_y_min, _, cap_y_max) = self.measure('M', font, baseline)

    baseline = height - descent

    text_up = baseline - text_y_min
    text_down = text_y_max - baseline
    cap_height = baseline - cap_y_min
    above_text = text_y_min
    dprint(f'\'lj\' {text_y_min=},{text_y_max=} => {text_up=},{text_down=},{above_text=}')
    dprint(f'\'M\' {cap_y_min=},{cap_y_max=} => {cap_height=}')

    result = Metrics(height, text_up, text_down, above_text, ascent, descent, cap_height)
    dprint(f'metrics = {result}')
    return result

  def getFont(self, family: str, bold: bool = False, italic: bool = False):
    weight = 700 if bold else 400
    family = self.getFamily(family)
    ff = self.get_font_file(family, bold, italic)
    blob = hb.Blob.from_file_path(ff) # type: ignore
    face = hb.Face(blob) # type: ignore
    font = hb.Font(face) # type: ignore

    for info in face.axis_infos:
      dprint(f"Face has axis info {info}")
      if info.tag == 'wght':
        dprint(f'Setting font weight to {weight}')
        font.set_variation(info.tag, weight)

    return Font(family, 1.0, self.metrics(font).scaledToTextHeight(1.0), font, bold=bold, italic=italic)

  def widthForText(self, s:str, f: hb.Font): # type: ignore
    buf = hb.Buffer() # type: ignore
    buf.add_str(s)
    buf.guess_segment_properties()

    features = {"kern": True, "liga": False}
    hb.shape(f, buf, features) # type: ignore

    return sum(pos.x_advance for pos in buf.glyph_positions)

  def textWidth(self, s: str, f: render.Font) -> float:
    if isinstance(f, Font):
      return f.scale * self.widthForText(s, f.font)
    raise ValueError

  def textPath(self, s: str,  w: float, f: render.Font, alignment: Alignment = Alignment.CENTERED) -> tuple[float, float, str]:
    if not isinstance(f, Font):
      raise ValueError

    dprint(f"textPath for '{s}' in '{f.family}'")

    extents = f.font.get_font_extents('ltr')
    ascent = extents.ascender
    descent = -extents.descender
    height = ascent + descent + extents.line_gap

    path = self.pathForText(s, f.font).tf(1, -1, 0, height - descent)

    x_scale = 0
    y_scale = 0
    x_offset = 0

    y_scale = f.scale
    x_scale = y_scale
    scaled_width = self.textWidth(s, f)
    dprint(f'{scaled_width=}')

    if scaled_width > w or alignment >= Alignment.STRETCH:
      x_scale *= (w / scaled_width)
      scaled_width = w
    
    dprint(f'{x_scale=}')
    dprint(f'scaled width -> {scaled_width}')

    if alignment == Alignment.CENTERED:
      x_offset = (w - scaled_width) / 2
      dprint(f'centered: x_offset = ({w} - {scaled_width}) / 2 = {x_offset}')
    elif alignment == Alignment.RIGHT:
      x_offset = w - scaled_width
      dprint(f'right: x_offset = {w} - {scaled_width} = {x_offset}')

    x_offset = ti(x_offset / f.scale)
    dprint(f'font-scale offset: {x_offset}')
    return x_scale, y_scale, path.svg(dx=x_offset)


def sample():  
  set_debug(True)
  w = 500
  
  h = 50
  m = 'height'

  bgs = ['#ffffff', '#dddddd']
  tr = TextRenderer()
  panel = tr.getFont('Panel').scaledTo(m, h)
  panelBold = tr.getFont('Panel', bold=True).scaledTo(m, h)
  panelItalic = tr.getFont('Panel', italic=True).scaledTo(m, h)
  panelBoldItalic = tr.getFont('Panel', bold=True, italic=True).scaledTo(m, h)

  dprint(f'Panel size = {panel.size}')
  dprint(f'Panel bold size = {panelBold.size}')
  dprint(f'Panel italic size = {panelItalic.size}')
  dprint(f'Panel bold italic size = {panelBoldItalic.size}')

  liberationMono = tr.getFont('Liberation Mono').scaledTo(m, h)
  liberationSerif = tr.getFont('Liberation Serif').scaledTo(m, h)
  ps = [
    (panel, tr.textPath("Left", w, panel, alignment=Alignment.LEFT)),
    (panel, tr.textPath("Center", w, panel, alignment=Alignment.CENTERED)),
    (panel, tr.textPath("Right", w, panel, alignment=Alignment.RIGHT)),
    (panel, tr.textPath("Stretch", w, panel, alignment=Alignment.STRETCH)),
    (panel, tr.textPath("Squish Squish Squish Squish Squish", w, panel, alignment=Alignment.LEFT)),
    (panelBold, tr.textPath("Bold", w, panelBold, alignment=Alignment.CENTERED)),
    (panelItalic, tr.textPath("Italic", w, panelItalic, alignment=Alignment.CENTERED)),
    (panelBoldItalic, tr.textPath("Bold+Italic", w, panelBoldItalic, alignment=Alignment.CENTERED)),
    (liberationMono, tr.textPath("Liberation Mono", w, liberationMono, alignment=Alignment.CENTERED)),
    (liberationSerif, tr.textPath("Liberation Serif", w, liberationSerif, alignment=Alignment.CENTERED)),
  ]
  n = len(ps)
  print('<?xml version="1.0" encoding="UTF-8"?>')
  print(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{n * h}" viewBox="0 0 {w} {n * h}">')
  for i, (f, (sx, sy, p)) in enumerate(ps):
    bg = bgs[i % len(bgs)]
    above = 0#f.above_text
    print(f'<rect x="0" y="{i * h }" width="{w}" height="{n * h}" fill="{bg}" />')
    print(f'<path transform="translate(0 {i * h - above}) scale({sx}, {sy})" fill="black" d="{p}" />')
  print('</svg>')

def metrics():
  tr = TextRenderer();
  metrics = tr.metrics('Panel')
  want_text_height = 3.6  
  scale = want_text_height / metrics.height
  height = metrics.height * scale
  ascent = metrics.ascent * scale
  descent = metrics.descent * scale
  print(f'height={height}, ascent={ascent}, descent={descent}')
  print(f'text_height = {ascent + descent}')

def explore(family: str, bold: bool, italic: bool):
  tr = TextRenderer()
  fn = tr.get_font_file(family, bold, italic)
  print(fn)
  # face = ft.Face(fn)
  # if face.has_multiple_masters:
  #   vi = face.get_variation_info()
  #   print(vi.axes)
  #   print(vi.instances)
  
def tryPath(s, family:str='Arimo', bold:bool=False, italic:bool=False):

  weight = 700 if bold else 400
  tr = TextRenderer()
  ff = tr.get_font_file(family, bold, italic)

  blob = hb.Blob.from_file_path(ff) # type: ignore
  face = hb.Face(blob) # type: ignore
  font = hb.Font(face) # type: ignore

  extents = font.get_font_extents('ltr')
  ppem = font.ppem
  scale = font.scale

  dprint(f"font {ppem=}, {scale=}, {extents=}")

  for info in face.axis_infos:
    print(f"Face has axis info {info}")
    if info.tag == 'wght':
      font.set_variation(info.tag, weight)

  buf = hb.Buffer() # type: ignore
  buf.add_str(s)
  buf.guess_segment_properties()

  features = {"kern": True, "liga": False}
  hb.shape(font, buf, features) # type: ignore

  pb = PathBuilder()  

  def moveTo(x, y, userdata=None): pb.moveTo(x, y)
  def lineTo(x, y, userdata=None): pb.lineTo(x, y)
  def quadTo(x1, y1, x2, y2, userdata=None): pb.quadTo(x1, y1, x2, y2)
  def cubicTo(x1, y1, x2, y2, x3, y3, userdata=None): pb.cubicTo(x1, y1, x2, y2, x3, y3)  
  def closePath(userdata=None): pb.close()

  draw_funcs = hb.DrawFuncs() # type: ignore
  draw_funcs.set_move_to_func(moveTo)
  draw_funcs.set_line_to_func(lineTo)
  draw_funcs.set_quadratic_to_func(quadTo)
  draw_funcs.set_cubic_to_func(cubicTo)
  draw_funcs.set_close_path_func(closePath)

  infos = buf.glyph_infos
  positions = buf.glyph_positions

  for info, pos in zip(infos, positions):
    font.draw_glyph(info.codepoint, draw_funcs)
    pb.advance(pos.x_advance, pos.y_advance)


  path = pb.build()
  dprint(f'bbox={path.bbox()}')

  with open(f'/tmp/p.svg', 'w') as f:
    f.write(dedent(f'''\
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <svg width="3000" height="600" viewBox="0 0 15000 3000" xmlns="http://www.w3.org/2000/svg">
      <path stroke="black" stroke-width="1" transform="translate(0, 1000) scale(0.5, -0.5)" d="{path.svg()}"/>
      <text x="0" y="2000" font-family="{family}" font-style="{'italic' if italic else 'normal'}" font-weight="{'bold' if bold else 'regular'}" font-size="1024"
      >{s}</text> 
      </svg>
    ''').strip())

def multiple():
  explore("Liberation Mono", False, True)
  explore("Helvetica", True, False)
  explore("Arimo", False, False)
  explore("Arimo", True, False)
  explore("Arimo", False, True)
  explore("Arimo", True, True)

  tryPath('Sequence', 'Arimo', bold=True, italic=False)

if __name__ == "__main__":
  set_debug(True)
  sample()

