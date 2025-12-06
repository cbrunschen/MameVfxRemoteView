#!/usr/bin/env python3

from textwrap import dedent

from dataclasses import dataclass, field
from math import tan, radians
from rect import *
from view import *
from view_builders import ViewBuilder
from myxml import *
from mysvg import *
from colors import Color, get_color, color_name
from vfd import segment_paths_led14seg_order
from render_harfbuzz import TextRenderer

@dataclass
class MameLayoutDestination:
  name:        str = ''
  bounds:      Rect = field(default_factory=lambda: Rect(0,0,0,0))
  decorations: list[Element] = field(default_factory=list)
  texts:       list[Element] = field(default_factory=list)
  buttons:     list[Element] = field(default_factory=list)
  lights:      list[Element] = field(default_factory=list)
  sliders:     list[Element] = field(default_factory=list)
  vfds:        list[Element] = field(default_factory=list)
  keys:        list[Element] = field(default_factory=list)
  groups:      list[Element] = field(default_factory=list)
  warnings:    list[Element] = field(default_factory=list)

  @property
  def items(self):
    result = list()
    result.extend(self.decorations)
    result.extend(self.texts)
    result.extend(self.buttons)
    result.extend(self.lights)
    result.extend(self.sliders)
    result.extend(self.vfds)
    result.extend(self.keys)
    result.extend(self.groups)
    return result

class MameLayoutVisitor(ViewVisitor):
  def __init__(self, keyboard: str, io: str = '', 
               fonts: bool = False, 
               hexcolors: bool = False,
               text_paths: bool = False,
               segment_paths: bool = False):
    self.io = io
    self.fonts = fonts
    self.hexcolors = hexcolors
    self.text_paths = text_paths
    self.text_renderer = TextRenderer()
    self.segment_paths = segment_paths

    self.keyboard = keyboard
    self.conditions = {
      'hasSeq': keyboard.find('sd') >= 0,
      'isSd1': keyboard.find('sd1') >= 0,
      'isSd132': keyboard.find('sd132') >= 0,
    }

    self.views = []
    self.destinations = []

    self.colored_shapes = {}
    self.button_shapes = {}
    self.text_definitions = {}
    self.group_definitions = {}
    self.light_definitions = {}

    sliderKnobTop    = Rect(0, 0,    6.5, 4).offset(0.75, 0.75)
    sliderKnobBottom = Rect(0, 18.5, 6.5, 4).offset(0.75, 0.75)

    wheelKnobTop    = Rect(3, 5,    7, 10)
    wheelKnobBottom = Rect(3, 51,   7, 10)

    self.slider_definitions = { e.attrs['name'] : e for e in [
      self.layout_element(name='invisible_rect', contents=[
        self.layout_rect(color='transparent'),
      ]),
      self.layout_element(name='slider_frame', contents=[
        self.layout_rect(color='black_plastic', bounds=Rect(0, 0, 8, 24)),
        self.layout_rect(color='black', bounds=Rect(0.5, 0.5, 7, 23))
      ]),
      self.layout_element(name='slider_knob', contents=[
        self.layout_rect(color='black_plastic', bounds=sliderKnobTop),
        self.layout_rect(color='black_plastic_light', bounds=Rect(0, 0,    6.5, 0.75).offset(0.75, 0.75)),
        self.layout_rect(color='black_plastic_shade', bounds=Rect(0, 1.75, 6.5, 0.25).offset(0.75, 0.75)),
        self.layout_rect(color='black_plastic_light', bounds=Rect(0, 2,    6.5, 0.25).offset(0.75, 0.75)),
        self.layout_rect(color='black_plastic_shade', bounds=Rect(0, 3.25, 6.5, 0.75).offset(0.75, 0.75)),
      ]),
      self.layout_group(name='slider', contents=[
        self.layout_element(ref='slider_frame', bounds=Rect(0, 0, 8, 24)),
        self.layout_element(id='slider_~slider_id~', ref='invisible_rect', bounds=Rect(0.75, 0.75, 6.5, 22.5)),
        self.layout_element(ref='slider_knob', id='slider_knob_~slider_id~', contents=[
          self.layout_tag('animate', inputtag='~port_name~', inputmask='0x7f'),
          self.layout_bounds(sliderKnobTop, state='1023'),
          self.layout_bounds(sliderKnobBottom, state='0'),
        ]),
      ]),

      self.layout_element(name='wheel_frame', contents=[
        self.layout_rect(color='black_plastic', bounds=Rect(0, 0, 13, 66)),
        self.layout_rect(color='black', bounds=Rect(1.5, 1.5, 10, 63)),
      ]),
      self.layout_element(name='wheel_body', contents=[
        self.layout_rect(color='black_plastic', bounds=Rect(3, 5, 7, 56)),
      ]),
      self.layout_element(name='wheel_knob', contents=[
        self.layout_rect(color='black_plastic_shade', bounds=Rect(3, 5, 7, 3)),
        self.layout_rect(color='black_plastic', bounds=Rect(3, 8, 7, 4)),
        self.layout_rect(color='black_plastic_light', bounds=Rect(3, 12, 7, 3)),
      ]),
      self.layout_group(name='wheel', contents=[
        self.layout_element(ref='wheel_frame', bounds=Rect(0, 0, 13, 66)),
        self.layout_element(ref="wheel_body", bounds=Rect(3, 5, 7, 56)),
        self.layout_element(id='wheel_~wheel_id~', ref='invisible_rect', bounds=Rect(2, 2, 9, 62)),
        self.layout_element(ref='wheel_knob', id='wheel_knob_~wheel_id~', contents=[
          self.layout_tag('animate', inputtag='~port_name~', inputmask='0x7f'),
          self.layout_bounds(wheelKnobTop, state='0'),
          self.layout_bounds(wheelKnobBottom, state='1023'),
        ]),
      ]),
    ]}

    vfd_definitions = []
    if self.segment_paths:
      def seg(i, color, statemask, state):
        return self.layout_svg_image(
          str(SVGDrawing(
            bounds, 
            f'segment{i}', 
            {'path': SVGPath(segment_paths_led14seg_order[i])}
          ).toSvgElement()),
          bounds=bounds,
          color=color,
          state=state,
          statemask=statemask,
        )

      bounds = Rect(0, 0, 3420, 5720)
      vfd_definitions.extend([
        self.layout_element(name=f'segment{i}', defstate='0', contents=[
          seg(i, 'vfd_off', statemask=f'0x{(1 << i):04x}', state='0'),
          seg(i, 'vfd_on', statemask=f'0x{(1 << i):04x}', state=f'0x{(1 << i):04x}')
        ])
        for i in range(16)
      ])
      vfd_definitions.extend([
        self.layout_group(name='vfd_cell', bounds=Rect(0, 0, 3420, 5720), contents=[
          self.layout_element(ref=f'segment{i}', name='~input~', bounds=bounds) for i in range(16)
        ]),
      ])
    else:
      vfd_definitions.extend([
        self.layout_element(name='segments', defstate='0', contents=[
          self.layout_tag('led14seg', color='vfd_on')
        ]),
        self.layout_element(name='dot', defstate='0', contents=[
          self.layout_tag('disk', statemask='0x4000', state='0', color='vfd_off'),
          self.layout_tag('disk', statemask='0x4000', state='0x4000', color='vfd_on')
        ]),
        self.layout_element(name='underline', defstate='0', contents=[
          self.layout_rect(statemask='0x8000', state='0', color='vfd_off'),
          self.layout_rect(statemask='0x8000', state='0x8000', color='vfd_on')
        ]),
        self.layout_group(name='vfd_cell', bounds=Rect(0, 0, 342, 572), contents=[
          self.layout_element(ref='segments', name='~input~', bounds=Rect(50, 69, 214, 311)),
          self.layout_element(ref='dot', name='~input~', bounds=Rect(253, 337, 42, 42)),
          self.layout_element(ref='underline', name='~input~', bounds=Rect(43, 444, 183, 25)),
        ]),
      ])
      
    vfd_definitions.extend([
      self.layout_element(name='vfd_background', contents=[
        self.layout_rect(color='black')
      ]),

      self.layout_group(name='vfd', contents=[
        self.layout_element(ref='vfd_background', bounds=Rect(0, 0, 13680, 1144)),
        Comment('VFDs'),
        self.layout_tag('repeat', count=2, contents=[
          self.layout_increment('s', '0', '40'),
          self.layout_increment('y', '0', '572'),
          self.layout_tag('repeat', count=40, contents=[
            self.layout_increment('n', '~s~', '1'),
            self.layout_increment('x', '0', '342'),
            Space(),
            self.layout_param('input', 'vfd~n~'),
            self.layout_group(ref='vfd_cell', contents=[
              self.layout_tag('bounds', x='~x~', y='~y~', width='342', height='572')
            ])
          ]),
        ]),
      ])
    ])

    self.vfd_definitions = { e.attrs['name'] : e for e in vfd_definitions }

    self.decoration_definitions = { }

    self.warning_definitions = { e.attrs['name'] : e for e in [
      self.layout_element(
        name='plugin_warning',
        defstate="1",
        contents=[
          self.layout_rect(color=Color.get('plugin_warning_background'), state="1"),
          self.layout_text(
            "This view requires the layout plugin.",
            align="0",
            state="1",
            color=Color.get('plugin_warning')
          ),
        ])
    ]}

    self.keyshape_definitions = dict()
    self.init_code = dict()

  @property
  def destination(self):
    return self.destinations[-1]

  @property
  def buttons(self):
    return self.destination.buttons

  @property
  def texts(self):
    return self.destination.texts

  @property
  def lights(self):
    return self.destination.lights

  @property
  def sliders(self):
    return self.destination.sliders

  @property
  def decorations(self):
    return self.destination.decorations

  @property
  def vfds(self):
    return self.destination.vfds

  @property
  def groups(self):
    return self.destination.groups

  @property
  def keys(self):
    return self.destination.keys

  @property
  def warnings(self):
    return self.destination.warnings

  def layout_bounds(self, bounds: Rect, state=None):
    return Element('bounds', clean({
      'x': f'{bounds.x:.5g}',
      'y': f'{bounds.y:.5g}',
      'width': f'{bounds.w:.5g}',
      'height':f'{bounds.h:.5g}',
      'state':state,
      }), [])


  def layout_color(self, col, **kwargs):
    if isinstance(col, str):
      if col.startswith("#"):
        color = Color.for_hex(col)
      else:
        color = Color.get(col)
    elif isinstance(col, Color):
      color = col
    else:
      raise ValueError("'color' is neither a String nor a Color")

    if self.hexcolors:
      return Element('color', clean({
          **kwargs,
          'hex': color.hex.removeprefix('#')
          }),
        []
      )
    else:
      rgb = color.rgb
      return Element('color', clean({
          **kwargs,
          'red': f'{rgb[0]:.5g}',
          'green': f'{rgb[1]:.5g}',
          'blue': f'{rgb[2]:.5g}',
          'alpha': f'{rgb[3]:.5g}' if len(rgb) == 4 else None,
          }),
        []
      )

  def layout_tag(self, tag, contents=None, bounds=None, color=None, name=None, ref=None, id=None, **kwargs):
    e = Element(tag, clean({
      'name': name,
      'ref': ref,
      'id': id,
      **kwargs,
    }), [])

    if (bounds != None):
      e.append(self.layout_bounds(bounds))

    if (color != None):
      e.append(self.layout_color(color))

    if (contents != None):
      if isinstance(contents, list):
        for i in contents:
          e.append(i)
      else:
        e.append(contents)
    return e

  def layout_element(self, **kwargs):
    return self.layout_tag('element', **kwargs)

  def layout_group(self, **kwargs):
    return self.layout_tag('group', **kwargs)

  def layout_rect(self, name=None, ref=None, color=None, state=None, statemask=None, bounds=None, contents=[]):
    e = Element('rect', clean({
      'name': name,
      'ref': ref,
      'state': state,
      'statemask': statemask
    }), [])
    if color != None:
      e.append(self.layout_color(color))
    if bounds != None:
      e.append(self.layout_bounds(bounds))
    e.extend(contents)
    return e

  def layout_disk(self, name=None, ref=None, color=None, state=None, statemask=None, bounds=None, contents=[]):
    e = Element('disk', clean({
      'name': name,
      'ref': ref,
      'state': state,
      'statemask': statemask
    }), [])
    if color != None:
      e.append(self.layout_color(color))
    if bounds != None:
      e.append(self.layout_bounds(bounds))
    e.extend(contents)
    return e

  def layout_svg_image(self, svg, bounds=None, name=None, color=None, state=None, statemask=None, contents=list()):
    e = Element('image', clean({
      'name': name,
      'state': state,
      'statemask': statemask
    }), contents)
    if color != None:
      e.append(self.layout_color(color))
    if bounds != None:
      e.append(self.layout_bounds(bounds))
    data = Element('data');
    data.append(CDATA(svg))
    e.append(data)
    return e

  def layout_text(self, s, name=None, font=None, color=None, align=None, state=None, attrs=dict(), contents=list()):
    e = Element('text', clean({
      'name': name,
      'string': s,
      'font': font if self.fonts else None,
      'align': align,
      'state': state,
      **attrs,
    }), contents)
    if color != None:
      e.append(self.layout_color(color))
    return e

  def layout_param(self, k, v):
    return Element('param', {'name':k, 'value':v}, [])

  def layout_increment(self, n, s, i):
    return Element('param', {'name':n, 'start':s, 'increment': i}, [])

  def defaultFontSize(self):
    return 4.3

  def visitAccentColor(self, accent: AccentColor):
    dprint(f'visitAccentColor({accent})')
    self.accent_color = accent.color

  def visitConditional(self, conditional: Conditional):
    dprint(f'visitConditional({conditional})')
    items = conditional.ifTrue if self.conditions[conditional.condition] else conditional.ifFalse
    for i in items:
      i.accept(self)

  def visitGroup(self, group: Group):
    dprint(f'visitGroup({group})')

    destination = MameLayoutDestination()
    self.destinations.append(destination)

    for i in group.items:
      i.accept(self)

    destination.bounds = group.intrinsic_bounds

    self.destinations.pop()

    if group.id not in self.group_definitions:
      # Add a definition for this group
      self.group_definitions[group.id] = destination
    # else, just drop it, should be identical to what's already there!

    # use the group, in its calculated bounds
    self.groups.append(self.layout_group(ref=group.id, bounds=group.bounds))

  def visitDisplay(self, display: 'Display'):
    dprint(f'visitDisplay({display})')
    self.vfds.append(self.layout_group(ref='vfd', bounds=display.bounds))

  def visitPatchSelectButton(self, button: 'PatchSelectButton'):
    dprint(f'visitPatchSelectButton({button})')
    x = button.bounds.x
    y = button.bounds.y
    w = button.bounds.w
    h = button.bounds.h
    shade = button.shade

    # Ensure that there's a reusable button shape
    shape_name = to_id(f'psel_{w}x{h}')

    if shape_name not in self.button_shapes:
      rect = Rect(0, 0, w, h)
      svg = f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">{str(SVGRect(rect).toSvgElement(fill="white")).rstrip()}</svg>'
      definition = self.layout_element(contents=[
        self.layout_svg_image(svg, state='0', color=shade.color),
        self.layout_svg_image(svg, state='1', color=shade.pressed_color)
      ], name=shape_name)
      self.button_shapes[shape_name] = definition

    inputtag = self.ioport('patch_select')
    mask = 1 << button.number
    inputmask = f'0x{mask:x}'

    button_id = f'patch_select_{button.number}'

    self.buttons.append(
      self.layout_element(
        ref=shape_name,
        id=button_id,
        bounds=button.bounds,
        inputtag=inputtag, inputmask=inputmask,
      )
    )

  def visitButton(self, button: 'Button'):
    dprint(f'visitButton({button})')
    x = button.bounds.x
    y = button.bounds.y
    w = button.bounds.w
    h = button.bounds.h

    # Ensure that there's a reusable button shape
    shade = button.shade
    shape_name = to_id(f'button_{w}x{h}_{shade.name}')

    if shape_name not in self.button_shapes:
      rect = Rect(0, 0, w, h).inset(0.25, 0.25)
      svg = f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">{str(SVGRect(rect).toSvgElement(r=1.25, fill="white")).rstrip()}</svg>'
      definition = self.layout_element(contents=[
        self.layout_svg_image(svg, state='0', color=shade.color),
        self.layout_svg_image(svg, state='1', color=shade.pressed_color)
      ], name=shape_name)
      self.button_shapes[shape_name] = definition

    inputtag = self.ioport('buttons_0' if button.number < 32 else 'buttons_32')
    mask = 1 << (button.number % 32)
    inputmask = f'0x{mask:08x}'

    button_id = f'button_{button.number}_{to_id(button.label)}'

    self.buttons.append(
      self.layout_element(
        ref=shape_name,
        id=button_id,
        bounds=button.bounds,
        inputtag=inputtag, inputmask=inputmask,
      )
    )

    if button.light:
      button.light.bounds = button.light.bounds.offset(button.bounds.origin)
      button.light.accept(self)
  
  def visitLight(self, light: 'Light'):
    bit = 1 << light.number
    maskval = f'0x{bit:04x}'

    name = f'light_{light.number}'
    if name not in self.light_definitions:
      self.light_definitions[name] = self.layout_element(contents=[
        self.layout_rect(state='0', statemask=maskval, color='light_off'),
        self.layout_rect(state=maskval, statemask=maskval, color='light_on'),
      ],name=name)

    self.lights.append(
      self.layout_element(ref=f'light_{light.number}', name='lights', bounds=light.bounds)
    )

  def visitMedia(self, media: 'Media'):
    bit = 1 << media.number
    maskval = f'0x{bit:04x}'

    name = f'media_{to_id(media.name)}'
    if name not in self.decoration_definitions:
      contents = list()
      if media.absent:
        contents.append(self.layout_svg_image(str(media.absent.toSvgElement(media.colors)), state='0', statemask=maskval))
      contents.append(self.layout_svg_image(str(media.present.toSvgElement(media.colors)), state=maskval, statemask=maskval))
      self.decoration_definitions[name] = self.layout_element(name=name, contents=contents)

    self.decorations.append(
      self.layout_element(ref=name, name='media', bounds=media.bounds)
    )

  def visitLabel(self, label: 'Label'):
    if label.color == 'accent':
      color = self.accent_color
    else:
      color = label.color

    align = int(label.alignment)
    if align >= Alignment.STRETCH.value:
      align = Alignment.STRETCH.value
    alignment = [ '', 'L_', 'R_', 'S_' ][align]
    if align == 0:
      align = None

    if self.fonts or self.text_paths:
      if label.font.bold:
        if label.font.italic:
          font = '~f_bold_italic~'
          style = 'BI_'
        else:
          font = '~f_bold~'
          style = 'B_'
      elif label.font.italic:
        font = '~f_italic~'
        style = 'I_'
      else:
        font = '~f_regular~'
        style = ''
    else:
      font = None
      style = ''

    id = f'{alignment}{style}{to_id(label.text)}'

    defattrs = {}
    useattrs = {}

    if id not in self.text_definitions:
      if self.text_paths:
        w, h = label.bounds.w, label.bounds.h
        sx, sy, tp = self.text_renderer.textPath(label.text, w, label.font, label.alignment)
        svg = f'<svg width="{w}" height="{h}" viewBox="0 0 {w/sx} {h/sy}">{str(SVGPath(tp, fill="white").toSvgElement()).rstrip()}</svg>'
        lt = self.layout_element(
          name=f'text_{id}',
          contents=self.layout_svg_image(
            bounds=Rect(0, 0, label.bounds.w, label.bounds.h),
            svg=svg
        ))
      else:
        lt = self.layout_element(
          name=f'text_{id}',
          contents=self.layout_text(
            label.text,
            name=None,
            color=None,
            align=align,
            font=font,
            attrs=defattrs,
          ))
      self.text_definitions[id] = lt

    self.texts.append(
      self.layout_element(
        ref=f'text_{id}',
        bounds=label.bounds,
        color=color,
        **useattrs
        ))

  def visitSlider(self, slider: 'Slider'):
    dprint(f'visitSlider({slider})')
    self.sliders.extend([
      self.layout_param('slider_id', slider.name),
      self.layout_param('port_name', self.ioport(f'analog_{slider.name}')),
      self.layout_group(ref='slider', bounds=slider.bounds)
    ])
    ioport = self.ioport(f'analog_{slider.name}')
    dprint(f"Adding slider '{slider.name}' to view '{self.visiting}'")
    self.init_code[self.visiting].append(
      f'manager:addHandler(SliderHandler:create(view, "slider_{slider.name}", "slider_knob_{slider.name}", "{ioport}"))')

  def visitWheel(self, wheel: 'Wheel'):
    dprint(f'visitWheel({wheel})')
    self.sliders.extend([
      self.layout_param('wheel_id', wheel.name),
      self.layout_param('port_name', self.ioport(f'analog_{wheel.name}')),
      self.layout_group(ref='wheel', bounds=wheel.bounds)
    ])
    ioport = self.ioport(f'analog_{wheel.name}')
    dprint(f"Adding wheel '{wheel.name}' to view '{self.visiting}'")
    self.init_code[self.visiting].append(
      f'manager:addHandler(SliderHandler:create(view, "wheel_{wheel.name}", "wheel_knob_{wheel.name}", "{ioport}", true, {"true" if wheel.autocenter else "false"}))')

  def visitRectangle(self, rectangle: 'Rectangle'):
    dprint(f'visitRectangle({rectangle})')
    if rectangle.color == 'accent':
      color = self.accent_color
    else:
      color = rectangle.color
    rect_id = f'rect_{color.removeprefix('#')}'
    if rect_id not in self.colored_shapes:
      self.colored_shapes[rect_id] = self.layout_element(name=rect_id, contents=[
        self.layout_rect(color=color)
      ])
    self.decorations.append(self.layout_element(ref=rect_id, bounds=rectangle.bounds))

  def visitEllipse(self, ellipse: 'Ellipse'):
    dprint(f'visitEllipse({ellipse})')
    if ellipse.color == 'accent':
      color = self.accent_color
    else:
      color = ellipse.color
    id = f'ellipse_{color.removeprefix('#')}'
    if id not in self.colored_shapes:
      self.colored_shapes[id] = self.layout_element(name=id, contents=[
        self.layout_disk(color=color)
      ])
    self.decorations.append(self.layout_element(ref=id, bounds=ellipse.bounds))
  
  def visitKey(self, key: Key):
    dprint(f'visitKey({key})')
    id = f'{key.keyboard.id}_key_{key.idx}'
    shape_id = f'keyshape_{key.shape.number}'
    if shape_id not in self.keyshape_definitions:
      w = key.shape.bounds.w
      h = key.shape.bounds.h
      svg = f'<svg width="{w}" height="{h}" viewBox="{0} {0} {w} {h}">{str(SVGPath(key.shape.path).toSvgElement(fill="white")).rstrip()}</svg>'

      self.keyshape_definitions[shape_id] = self.layout_element(name=shape_id, contents=[
        self.layout_svg_image(svg)
      ])

    self.keys.append(self.layout_element(
      id=id,
      ref=shape_id,
      bounds=key.bounds,
      clickthrough='no',
      contents=[
        self.layout_color(col='key_black' if key.black else 'key_white', state="0"),
        self.layout_color(col='key_black_velocity_min' if key.black else 'key_white_velocity_min', state="1"),
        self.layout_color(col='key_black_velocity_max' if key.black else 'key_white_velocity_max', state="127"),
        self.layout_color(col='key_black_pressure_min' if key.black else 'key_white_pressure_min', state="128"),
        self.layout_color(col='key_black_pressure_max' if key.black else 'key_white_pressure_max', state="255"),
      ]
      ))

  def visitKeyboard(self, keyboard: Keyboard):
    dprint(f'visitKeyboard({keyboard})')

    destination = MameLayoutDestination()
    self.destinations.append(destination)

    # First the white keys
    for key in keyboard.white_keys:
      key.accept(self)

    # Then the black keys, because their bounds will overlap the bounds of the white ones,
    # and we want to be able to not click through from the black keys
    # to the white keys below.
    for key in keyboard.black_keys:
      key.accept(self)

    self.destinations.pop()

    background_id = f'{keyboard.id}_background'
    # If it's not already in the definitions, define it, using its intrinsic bounds
    if keyboard.id not in self.group_definitions:
      w = keyboard.intrinsic_bounds.w
      h = keyboard.intrinsic_bounds.h
      if background_id not in self.colored_shapes:
        r = 2
        self.colored_shapes[background_id] = self.layout_element(name=background_id, contents=[
          self.layout_svg_image(svg=f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}"><rect width="{w}" height="{h}" rx="{r}" ry="{r}" fill="white" stroke="none"/></svg>')
        ])
      destination.decorations.append(self.layout_element(ref=background_id, id=background_id, bounds=Rect(0, 0, w, h), color='keyboard_background'))
      destination.bounds = keyboard.intrinsic_bounds
      # Add a definition for this group
      self.group_definitions[keyboard.id] = destination

    # else, just drop it, should be identical to what's already there!

    # use the group, in its calculated bounds
    self.groups.append(self.layout_group(ref=keyboard.id, id=keyboard.id, bounds=keyboard.bounds))

    dprint(f"Adding keyboard '{keyboard.id}' to view '{self.visiting}'")
    ioport_prefix = self.ioport("key_")
    self.init_code[self.visiting].append(
      f'manager:addHandler(KeyboardHandler:create(view, "{background_id}", "{keyboard.id}_key_", "{ioport_prefix}", {keyboard.from_octave}, {keyboard.n_octaves}))'
    )

  def visitView(self, view: View):
    self.visiting = view.name
    self.init_code[view.name] = list()    
    dprint(f"MameLayoutVisitor visiting view '{self.visiting}'")
    self.view = view
    dprint(f'visitView({view})')
    if len(self.destinations) > 1:
      eprint(f'have more than one active destination when visiting a view!')
    elif len(self.destinations) == 1:
      dprint(f'replacing current destination {self.destinations[0]} with a new View destination')
    destination = MameLayoutDestination(view.name)
    self.views.append(destination)
    self.destinations = [destination]
    dprint(f'visiting view {view}, items = {view.items}')
    super().visitView(view)

    # Also add the warning about the need for the layout plugin.
    vb = view.bounds
    w = vb.w / 1.5
    h = w / 15
    warning_bounds = Rect(vb.x + (vb.w - w) / 2, vb.y + (vb.h - h) / 2, w, h)
    self.warnings.append(self.layout_element(
      ref='plugin_warning',
      id='plugin_warning',
      bounds=warning_bounds,
    ))

  def visitShowDrawing(self, show: ShowDrawing):
    drawing = show.drawing
    name = f'drawing_{drawing.name}'
    if name not in self.decoration_definitions:
      self.decoration_definitions[name] = self.layout_element(name=name, contents=[
        self.layout_svg_image(svg=str(drawing.toSvgElement(show.colors)), bounds=drawing.bounds)
      ])
    
    self.decorations.append(self.layout_element(ref=name, bounds=show.bounds))
  
  def visitMultiPageChevrons(self, chevrons: MultiPageChevrons):
    labels = chevrons.labels
    nLines = len(labels)
    label = labels[-1]
    bottom_x = self.text_renderer.textWidth(label.text, label.font) + 0.5
    if nLines > 1:
      above = labels[-2]
      top_x = self.text_renderer.textWidth(above.text, above.font) + 0.5
    else:
      top_x = max(0, bottom_x - 7)
  
    x = label.bounds.x + top_x
    y = label.bounds.y - 1.5
    w = (bottom_x - top_x) + 1.25 + (label.bounds.h + 1.5) * tan(radians(12))
    h = label.font.baseline + 1.5
    
    name = to_id(f'multipage_{bottom_x - top_x}_x_{label.bounds.h}')
    if not name in self.decoration_definitions:
      drawing = SVGDrawing(Rect(0, 0, w, h), name) \
        .addItem('path', SVGPath(MultiPageChevrons.svgPath(w, h).strip(), stroke_width="0.25", stroke=True, fill=False))

      self.decoration_definitions[name] = self.layout_element(name=name, contents=[
        self.layout_svg_image(svg=str(drawing.toSvgElement({'path':'white'})), bounds=drawing.bounds)
      ])

    self.decorations.append(self.layout_element(ref=name, bounds=Rect(x, y, w, h)))

  def visitWhiteLineAround(self, line: 'WhiteLineAround'):
    bounds = line.label.bounds.copy()
    dprint(f'visiting white line around \'{line.label.text}\' in {bounds}')
    # For now at least, generate font metrics ourselves ...
    tw = self.text_renderer.textWidth(line.label.text, line.label.font) + 2
    dprint(f'text width is {tw}')
    x0 = bounds.x
    w = (bounds.w - tw) / 2
    dprint(f'({bounds.w} - {tw}) / 2 = {w}')
    x1 = bounds.x + (bounds.w + tw) / 2
    h = line.thickness
    y = bounds.y + 0.5 * (bounds.h - h)

    r0 = Rect(x0, y, w, h)
    r1 = Rect(x1, y, w, h)
    dprint(f'drawing white rectangles {r0} and {r1}')
    self.visitRectangle(Rectangle(r0, 'white'))
    self.visitRectangle(Rectangle(r1, 'white'))

  def ioport(self, port):
    return f'{self.io}{port}'

  def __str__(self):
    layout = Element('mamelayout', {'version':'2'})

    if self.fonts:
      layout.append(self.layout_param('f_regular', 'sans-serif|Regular,default'))
      layout.append(self.layout_param('f_bold', 'sans-serif|Bold,default'))
      layout.append(self.layout_param('f_italic', 'sans-serif|Italic,default'))
      layout.append(self.layout_param('f_bold_italic', 'sans-serif|BoldItalic,default'))

    layout.append(Space())
    layout.append(Comment('Decoration definitions'))
    layout.extend(list(self.decoration_definitions.values()))
    layout.extend(list(self.colored_shapes.values()))

    layout.append(Space())
    layout.append(Comment('VFD definitions'))
    layout.extend(list(self.vfd_definitions.values()))

    layout.append(Space())
    layout.append(Comment('Text items'))
    layout.extend(list(self.text_definitions.values()))

    layout.append(Space())
    layout.extend(list(self.warning_definitions.values()))

    layout.append(Comment('Button shapes'))
    layout.extend(list(self.button_shapes.values()))

    layout.append(Space())
    layout.append(Comment('Light items'))
    layout.extend(list(self.light_definitions.values()))

    layout.append(Space())
    layout.append(Comment('Slider definitions'))
    layout.extend(list(self.slider_definitions.values()))

    layout.append(Space())
    layout.append(Comment('Key Shape definitions'))
    layout.extend(list(self.keyshape_definitions.values()))

    layout.append(Space())
    layout.append(Comment('Group definitions'))
    for id, destination in self.group_definitions.items():
      b = destination.bounds
      group = Element('group', {'name': id})
      group.append(Element('bounds', { 'x': b.x, 'y': b.y, 'width': b.w, 'height' : b.h }))
      group.extend(destination.decorations)
      group.extend(destination.texts)
      group.extend(destination.vfds)
      group.extend(destination.buttons)
      group.extend(destination.lights)
      group.extend(destination.sliders)
      group.extend(destination.keys)
      group.extend(destination.groups)
      layout.append(group)

    layout.append(Space())
    for view in self.views:
      view_element = Element('view', {'name':view.name})
      view_element.extend(view.decorations)
      view_element.extend(view.texts)
      view_element.extend(view.vfds)
      view_element.extend(view.buttons)
      view_element.extend(view.lights)
      view_element.extend(view.sliders)
      view_element.extend(view.keys)
      view_element.extend(view.groups)
      view_element.extend(view.warnings)
      layout.append(view_element)

    template = self.load('mame_layout_script.lua')
    init_code = []
    for view, lines in self.init_code.items():
      dprint(f"Generating init code for view '{view}' ({len(lines)} lines)")
      init_code.extend([
        '',
        f'\t\t\tif view.unqualified_name == "{view}" then',
      ])
      init_code.extend([indent(line, '\t\t\t\t') for line in lines])
      init_code.extend([
        '\t\t\tend',
      ])
    
    code = '\n'.join(init_code)

    script = Element('script', {}, [
      CDATA(template.replace('--CODE--', code))
    ])
    layout.append(script)

    document = Document(layout)

    return str(document)




