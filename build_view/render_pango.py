#!/usr/bin/env python3

import cairo
import gi
import io
import os
from dataclasses import dataclass, field
from util import Alignment, dprint, set_debug
from renderutil import Cubic, Metrics

gi.require_version("Pango", "1.0")
from gi.repository import Pango # pyright: ignore[reportMissingModuleSource]

gi.require_version("PangoCairo", "1.0")
from gi.repository import PangoCairo # pyright: ignore[reportMissingModuleSource]

@dataclass
class Font:
  family: str
  size: float
  metrics: Metrics
  bold: bool = field(kw_only=True, default=False)
  italic: bool = field(kw_only=True, default=False)

  def __post_init__(self):
    dprint(f'Created: {str(self)}')

  @property
  def scale(self):
    return self.metrics.scale

  @property
  def text_height(self):
    return self.metrics.text_height

  @property
  def text_up(self):
    return self.metrics.text_up

  @property
  def above_text(self):
    return self.metrics.above_text

  @property
  def ascent(self):
    return self.metrics.ascent

  @property
  def descent(self):
    return self.metrics.descent

  @property
  def top(self):
    return self.metrics.top

  @property
  def height(self):
    return self.metrics.height

  @property
  def baseline(self):
    return self.metrics.baseline  

  def scaleFor(self, get, target: float):
    return self.metrics.scaleFor(get, target)
  
  def scaledTo(self, get, target: float):
    scale = self.scaleFor(get, target)
    return Font(self.family, self.size * scale, self.metrics * scale, bold=self.bold, italic=self.italic)

  def scaleTo(self, get, target:float):
    scale = self.scaleFor(get, target)
    self.size = self.size * scale
    self.metrics = self.metrics * scale
    return self

  def scaledToHeight(self, height: float):
    return self.scaledTo('height', height)

  def scaledToCapHeight(self, cap_height):
    return self.scaledTo('cap_height', cap_height)

  def scaledToTextHeight(self, text_height):
    return self.scaledTo('text_height', text_height)

  def scaledToAscent(self, ascent):
    return self.scaledTo('ascent', ascent)


class TextRenderer:
  font_map = PangoCairo.font_map_get_default()
  file_path = os.path.split(os.path.dirname(os.path.realpath(__file__)))[0]

  font_map.add_font_file(os.path.join(file_path, 'fonts/Arimo.ttf'))
  font_map.add_font_file(os.path.join(file_path, 'fonts/Arimo-Italic.ttf'))

  INITIAL_SIZE = 256 * Pango.SCALE

  def getFamily(self, font_family: str):
    if font_family == 'Panel':
      return 'Arimo'
    return font_family
  
  def measure_path(self, path):
    dprint(f'measuring path {path}')

    current_y = 0
    y_min = float('inf')
    y_max = float('-inf')
    current_x = 0
    x_min = float('inf')
    x_max = float('-inf')

    def m(x, y):
      nonlocal current_x, current_y
      current_x, current_y = x, y

    def ux(x):
      nonlocal current_x, x_min, x_max
      x_min = min(x_min, current_x, x)
      x_max = max(x_max, current_x, x)
      current_x = x

    def uy(y):
      nonlocal current_y, y_min, y_max
      y_min = min(y_min, current_y, y)
      y_max = max(y_max, current_y, y)
      current_y = y

    def u(x, y):
      ux(x)
      uy(y)

    def pe(element):
      nonlocal current_x, current_y
      type, points = element
      if type == cairo.PATH_MOVE_TO:
        m(*points)
      elif type == cairo.PATH_LINE_TO:
        u(*points)
      elif type == cairo.PATH_CURVE_TO:
        for x in Cubic(current_x, points[0], points[2], points[4]).extremes():
          ux(x)
        for y in Cubic(current_y, points[1], points[3], points[5]).extremes():
          uy(y)
    
    for element in path:
      dprint(f'element: {element}')
      pe(element)

    return tuple(Pango.SCALE * v for v in [x_min, y_min, x_max, y_max])

  
  def measure(self, s: str, font_family: str, bold: bool = False, italic: bool = False):
    font_family = self.getFamily(font_family)
    desc = Pango.FontDescription()
    desc.set_family(font_family)
    # Always render fonts at a large size - 256 points! - so we don't trigger low-resolution hinting.
    desc.set_size(self.INITIAL_SIZE)
    desc.set_style(Pango.Style.ITALIC if italic else Pango.Style.NORMAL)
    desc.set_weight(Pango.Weight.BOLD if bold else Pango.Weight.NORMAL)

    with io.BytesIO() as result, cairo.SVGSurface(result, self.INITIAL_SIZE, self.INITIAL_SIZE) as surface:
      ctx = cairo.Context(surface)
      layout = PangoCairo.create_layout(ctx)
      pctx = layout.get_context()
      pctx.set_font_map(self.font_map)
      pctx.set_font_description(desc)

      ctx.move_to(0, 0)
      layout.set_text(s)
      PangoCairo.layout_path(ctx, layout)
      return self.measure_path(ctx.copy_path())


  def metrics(self, font_family: str, bold: bool = False, italic: bool = False):
    dprint(f"metrics for '{font_family}'{' bold' if bold else ''}{' italic' if italic else ''}")
    font_family = self.getFamily(font_family)
    desc = Pango.FontDescription()
    desc.set_family(font_family)
    # Always render fonts at a large size - 256 points! - so we don't trigger low-resolution hinting.
    desc.set_size(self.INITIAL_SIZE)
    desc.set_style(Pango.Style.ITALIC if italic else Pango.Style.NORMAL)
    desc.set_weight(Pango.Weight.BOLD if bold else Pango.Weight.NORMAL)

    with io.BytesIO() as result, cairo.SVGSurface(result, self.INITIAL_SIZE, self.INITIAL_SIZE) as surface:
      ctx = cairo.Context(surface)
      layout = PangoCairo.create_layout(ctx)

      pctx = layout.get_context()
      pctx.set_font_map(self.font_map)
      pctx.set_font_description(desc)

      ctx.move_to(0, 0)
      layout.set_text("lj")
      PangoCairo.layout_path(ctx, layout)
      (_, text_y_min, _, text_y_max) = self.measure_path(ctx.copy_path())

      ctx.new_path()
      ctx.move_to(0, 0)
      layout.set_text("M")
      PangoCairo.layout_path(ctx, layout)
      (_, cap_y_min, _, cap_y_max) = self.measure_path(ctx.copy_path())

      metrics = pctx.get_metrics()

      baseline = metrics.height - metrics.descent

      text_up = baseline - text_y_min
      text_down = text_y_max - baseline
      cap_height = baseline - cap_y_min
      above_text = text_y_min
      dprint(f'\'lj\' {text_y_min=},{text_y_max=} => {text_up=},{text_down=},{above_text=}')
      dprint(f'\'M\' {cap_y_min=},{cap_y_max=} => {cap_height=}')

      result = Metrics(metrics.height, text_up, text_down, above_text, metrics.ascent, metrics.descent, cap_height)
      dprint(f'metrics = {result}')
      return result


  def getFont(self, family: str, bold: bool = False, italic: bool = False):
    return Font(self.getFamily(family), 1.0, metrics=self.metrics(family, bold=bold, italic=italic).scaledToTextHeight(1.0), bold=bold, italic=italic)


  def textWidth(self, s: str, f: Font):
    font_family = self.getFamily(f.family)
    dprint(f"textWidth for '{font_family}'")

    x_min, y_min, x_max, y_max = [v * f.scale for v in self.measure(s, f.family, f.bold, f.italic)]
    dprint(f'measured: ({x_min},{y_min},{x_max-x_min},{y_max-y_min})')

    desc = Pango.FontDescription()
    desc.set_family(font_family)
    # Always render fonts at a large size - 256 points! - so we don't trigger low-resolution hinting.
    desc.set_size(self.INITIAL_SIZE)
    desc.set_style(Pango.Style.ITALIC if f.italic else Pango.Style.NORMAL)
    desc.set_weight(Pango.Weight.BOLD if f.bold else Pango.Weight.NORMAL)

    with io.BytesIO() as result, cairo.SVGSurface(result, 100, 100) as surface:
      ctx = cairo.Context(surface)
      layout = PangoCairo.create_layout(ctx)
      layout.set_text(s)

      pctx = layout.get_context()
      pctx.set_font_map(self.font_map)
      pctx.set_font_description(desc)
      metrics = pctx.get_metrics()
      dprint(f'metrics: height={metrics.height}, ascent={metrics.ascent}, descent={metrics.descent}')
      dprint(f'Layout baseline = {layout.get_baseline()}')
      (log, ink) = layout.get_extents()
      dprint(f"extents: ({log.x}, {log.y}, {log.width}, {log.height}), ({ink.x}, {ink.y}, {ink.width}, {ink.height})")

      return f.scale * ink.width


  def textPath(self, s: str,  w: float, f: Font, alignment: Alignment = Alignment.CENTERED):
    font_family = self.getFamily(f.family)
    dprint(f"textPath for '{s}' in '{font_family}'")

    x_min, y_min, x_max, y_max = [v * f.scale for v in self.measure(s, f.family, f.bold, f.italic)]
    dprint(f'measured: ({x_min},{y_min},{x_max-x_min},{y_max-y_min})')

    x_scale = 0
    y_scale = 0
    x_offset = 0

    desc = Pango.FontDescription()
    desc.set_family(font_family)
    # Always render fonts at a large size so we don't trigger low-resolution hinting.
    desc.set_size(self.INITIAL_SIZE)
    desc.set_style(Pango.Style.ITALIC if f.italic else Pango.Style.NORMAL)
    desc.set_weight(Pango.Weight.BOLD if f.bold else Pango.Weight.NORMAL)

    with io.BytesIO() as result, cairo.SVGSurface(result, w / f.scale, f.height / f.scale) as surface:
      ctx = cairo.Context(surface)
      layout = PangoCairo.create_layout(ctx)
      layout.set_text(s)

      pctx = layout.get_context()
      pctx.set_font_map(self.font_map)
      pctx.set_font_description(desc)
      metrics = pctx.get_metrics()
      dprint(f'metrics: height={metrics.height}, ascent={metrics.ascent}, descent={metrics.descent}')
      dprint(f'font\'s metrics: height={f.metrics.height}, ascent={f.metrics.ascent}, descent={f.metrics.descent}')
      dprint(f'scaled metrics: height={f.scale * metrics.height}, ascent={f.scale * metrics.ascent}, descent={f.scale * metrics.descent}')
      font = self.font_map.load_font(pctx, desc)
      if font:
        face = font.get_face()
        if face:
          family_name = face.get_family().get_name()
          dprint(f"Font is family '{family_name}', face '{face.get_face_name()}'")

      dprint(f'Layout baseline = {layout.get_baseline()}')
      (log, ink) = layout.get_extents()
      dprint(f"extents: ({log.x}, {log.y}, {log.width}, {log.height}), ({ink.x}, {ink.y}, {ink.width}, {ink.height})")

      y_scale = f.scale
      dprint(f'{y_scale=}; scaled ink height = {y_scale * ink.height}')
      x_scale = y_scale
      scaled_width = x_scale * ink.width
      dprint(f'{scaled_width=}')

      if scaled_width > w or alignment >= Alignment.STRETCH:
        x_scale *= (w / scaled_width)
        scaled_width = w
      else:
        scaled_width = x_scale * ink.width
      
      dprint(f'{x_scale=}')
      dprint(f'scaled width -> {scaled_width}')

      if alignment == Alignment.CENTERED:
        x_offset = (w - scaled_width) / 2
        dprint(f'centered: x_offset = ({w} - {scaled_width}) / 2 = {x_offset}')
      elif alignment == Alignment.RIGHT:
        dprint(f'right: x_offset = {w} - {scaled_width} = {x_offset}')
        x_offset = w - scaled_width

      dprint(f'w = {w}')
      dprint(f'x_offset = {x_offset}')

      # adjust for Pango's scaling
      x_scale *= Pango.SCALE
      y_scale *= Pango.SCALE

      def px(x):
        "Process an x coordinate"
        result = x_offset + x_scale * x
        # dprint(f'x:{x} -> {result}')
        return result
      
      def py(y):
        "Process a y coordinate"
        result = y_scale * y
        # dprint(f'y:{y} -> {result}')
        return result

      # Process an even / odd-numbered coordinate
      fs = [px, py]
      
      def pc(*coords):
        "Process a list of alternating x and y coordinates"
        return list([fs[i % 2](t) for (i, t) in enumerate(coords)])

      def describe(element) -> str:
        type, points = element
        if type == cairo.PATH_MOVE_TO:
          x, y = pc(*points)
          return f'M {x} {y}'
        elif type == cairo.PATH_LINE_TO:
          x, y = pc(*points)
          return f'L {x} {y}'
        elif type == cairo.PATH_CURVE_TO:
          x1, y1, x2, y2, x3, y3 = pc(*points)
          return f'C {x1} {y1} {x2} {y2} {x3} {y3}'
        elif type == cairo.PATH_CLOSE_PATH:
          return 'Z'
        else:
          return ''

      ctx.move_to(0, 0)
      PangoCairo.layout_path(ctx, layout)
      return (1, 1, ' '.join(list([describe(element) for element in ctx.copy_path()])))


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

if __name__ == "__main__":
  set_debug(True)
  sample()
