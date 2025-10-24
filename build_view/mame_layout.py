#!/usr/bin/env python3

from textwrap import dedent

from dataclasses import dataclass, field
from rect import *
from view import *
from view_builders import ViewBuilder
from myxml import *
from colors import Color, get_color, color_name

@dataclass
class MameLayoutDestination:
  name:        str = ''
  decorations: list[Element] = field(default_factory=list)
  texts:       list[Element] = field(default_factory=list)
  buttons:     list[Element] = field(default_factory=list)
  lights:      list[Element] = field(default_factory=list)
  sliders:     list[Element] = field(default_factory=list)
  vfds:        list[Element] = field(default_factory=list)
  groups:      list[Element] = field(default_factory=list)

  @property
  def items(self):
    result = list()
    result.extend(self.decorations)
    result.extend(self.texts)
    result.extend(self.buttons)
    result.extend(self.lights)
    result.extend(self.sliders)
    result.extend(self.vfds)
    result.extend(self.groups)
    return result

class MameLayoutVisitor(ViewVisitor):
  def __init__(self, keyboard: str, io: str = '', real_logos: bool = False):
    self.io = io

    self.keyboard = keyboard
    self.conditions = {
      'hasSeq': keyboard.find('sd') >= 0,
      'isSd1': keyboard.find('sd1') >= 0,
      'isSd132': keyboard.find('sd132') >= 0,
    }

    self.views = []
    self.destinations = []

    self.colored_rects = {}
    self.button_shapes = {}
    self.text_definitions = {}
    self.group_definitions = {}
    self.light_definitions = []

    sliderKnobTop    = Rect(0, 0,    6.5, 4).offset(0.75, 0.75)
    sliderKnobBottom = Rect(0, 18.5, 6.5, 4).offset(0.75, 0.75)

    wheelKnobTop    = Rect(3, 5,    7, 10)
    wheelKnobBottom = Rect(3, 51,   7, 10)

    self.slider_definitions = [
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
          self.layout_bounds(wheelKnobTop, state='1023'),
          self.layout_bounds(wheelKnobBottom, state='0'),
        ]),
      ]),
    ]

    self.vfd_definitions = [
      Comment('The VFD elements'),
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
        self.layout_element(ref='underline', name='~input~', bounds=Rect(43, 411, 183, 25)),
      ]),

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
    ]

    self.decoration_definitions = [
      self.layout_element(name='triangle_up', contents=[
        self.layout_svg_image(svg=dedent('''\
          <svg width="2" height="1" viewBox="0 0 2 1">
          \t<path stroke="none" fill="#ffffff" d="M0 1H2L 1 0Z" />
          </svg>
          '''))
      ]),

      self.layout_element(name='triangle_down', contents=[
        self.layout_svg_image(svg=dedent('''\
          <svg width="2" height="1" viewBox="0 0 2 1">
          \t<path stroke="none" fill="#ffffff" d="M0 0H2L1 1Z" />
          </svg>
          '''))
      ]),

      self.layout_element(name='logo', contents=[
        self.layout_svg_image(svg=dedent('''\
          <svg width="72" height="13" viewBox="0 0 72 13">
          \t<rect x="0.5" y="0.5" width="71" height="12" rx="1" stroke-width="1" stroke="white" />
          </svg>
          '''))
      ]),
    ]

    self.slider_code = dict()

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

  def layout_bounds(self, bounds: Rect, state=None):
    return Element('bounds', clean({
      'x': f'{bounds.x:.5g}',
      'y': f'{bounds.y:.5g}',
      'width': f'{bounds.w:.5g}',
      'height':f'{bounds.h:.5g}',
      'state':state,
      }), [])


  def layout_color(self, color, **kwargs):
    if isinstance(color, str):
      if color.startswith("#"):
        rgb = rgb_components(color)
      else:
        rgb = Color.get(color).rgb
    elif isinstance(color, Color):
      rgb = color.rgb
    else:
      rgb = color

    return Element('color', clean({
        **kwargs,
        'red': f'{rgb[0]:.3g}',
        'green': f'{rgb[1]:.3g}',
        'blue': f'{rgb[2]:.3g}',
        'alpha': f'{rgb[3]:.3g}' if len(rgb) == 4 else None,
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
    if (color != None):
      e.append(self.layout_color(color))
    if bounds != None:
      e.append(self.layout_bounds(bounds))
    e.extend(contents)
    return e

  def layout_svg_image(self, svg, name=None, color=None, state=None, statemask=None):
    e = Element('image', clean({
      'name': name,
      'state': state,
      'statemask': statemask
    }), [])
    if color != None:
      e.append(self.layout_color(color))
    data = Element('data');
    data.append(CDATA(svg))
    e.append(data)
    return e

  def layout_text(self, s, name=None, color=None, align=None, attr={}):
    e = Element('text', clean({
      'name': name,
      'string': s,
      'align': align,
      **attr,
    }), [])
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
    if group.id not in self.group_definitions:
      # Add a definition for this group
      destination = MameLayoutDestination()
      self.group_definitions[group.id] = destination
      self.destinations.append(destination)

      for i in group.items:
        i.accept(self)

      self.destinations.pop()

    # use the group, in its calculated bounds
    self.destination.groups.append(self.layout_group(ref=group.id, bounds=group.bounds))

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
    shape_name = f'psel_{w}_{h}'

    if shape_name not in self.button_shapes:
      rect = Rect(0, 0, w, h)
      svg = f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">{str(rect.toPath(fill="white")).rstrip()}</svg>'
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
    shape_name = f'button_{w}_{h}_{shade.name}'

    if shape_name not in self.button_shapes:
      rect = Rect(0, 0, w, h).inset(0.25, 0.25)
      svg = f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">{str(rect.toPath(r=1.25, fill="white")).rstrip()}</svg>'
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
      light = button.light
      bit = 1 << light.number
      maskval = f'0x{bit:04x}'

      self.light_definitions.append(self.layout_element(contents=[
        self.layout_rect(state='0', statemask=maskval, color='light_off'),
        self.layout_rect(state=maskval, statemask=maskval, color='light_on'),
      ],name=f'light_{light.number}',))

      self.lights.extend([
        self.layout_element(ref=f'light_{light.number}', name='lights', bounds=light.bounds.offset(x, y))
      ])

  def visitLabel(self, label: 'Label'):
    dprint(f'visitLabel({label})')
    align = None if label.centered else '1'
    alignment = '' if label.centered else 'L_'

    id = f'{alignment}{to_id(label.text)}'

    defattr = {}
    useattr = {}

    if id not in self.text_definitions:
      self.text_definitions[id] = self.layout_element(
        name=f'text_{id}',
        contents=self.layout_text(
          label.text,
          align=align,
          attr=defattr
        ))

    self.texts.append(
      self.layout_element(
        ref=f'text_{id}',
        bounds=label.bounds,
        **useattr
        ))

  def visitSlider(self, slider: 'Slider'):
    dprint(f'visitSlider({slider})')
    self.sliders.extend([
      self.layout_param('slider_id', slider.name),
      self.layout_param('port_name', self.ioport(f'analog_{slider.name}')),
      self.layout_group(ref='slider', bounds=slider.bounds)
    ])
    ioport = self.ioport(f'analog_{slider.name}')
    if self.view.name not in self.slider_code:
      self.slider_code[self.view.name] = list()
    self.slider_code[self.view.name].append(
      f'\t\t\tadd_vertical_slider(view, "slider_{slider.name}", "slider_knob_{slider.name}", "{ioport}")')

  def visitWheel(self, wheel: 'Wheel'):
    dprint(f'visitWheel({wheel})')
    self.sliders.extend([
      self.layout_param('wheel_id', wheel.name),
      self.layout_param('port_name', self.ioport(f'analog_{wheel.name}')),
      self.layout_group(ref='wheel', bounds=wheel.bounds)
    ])
    ioport = self.ioport(f'analog_{wheel.name}')
    if self.view.name not in self.slider_code:
      self.slider_code[self.view.name] = list()
    self.slider_code[self.view.name].append(
      f'\t\t\tadd_vertical_slider(view, "wheel_{wheel.name}", "wheel_knob_{wheel.name}", "{ioport}", {"true" if wheel.autocenter else "false"})')

  def visitRectangle(self, rectangle: 'Rectangle'):
    dprint(f'visitRectangle({rectangle})')
    if rectangle.color == 'accent':
      color = self.accent_color
    else:
      color = rectangle.color
    rect_id = f'rect_{color.removeprefix('#')}'
    if rect_id not in self.colored_rects:
      self.colored_rects[rect_id] = self.layout_element(name=rect_id, contents=[
        self.layout_rect(color=color)
      ])
    self.decorations.append(self.layout_element(ref=rect_id, bounds=rectangle.bounds))

  def visitSymbol(self, symbol: 'Symbol'):
    dprint(f'visitSymbol({symbol})')
    self.decorations.append(
      self.layout_element(ref=symbol.name, bounds=symbol.bounds)
    )
  
  def visitView(self, view: View):
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

  def ioport(self, port):
    return f'{self.io}{port}'

  def __str__(self):
    layout = Element('mamelayout', {'version':'2'})

    layout.append(Space())
    layout.append(Comment('Decoration definitions'))
    layout.extend(self.decoration_definitions)
    layout.extend(self.colored_rects.values())

    layout.append(Space())
    layout.append(Comment('VFD'))
    layout.extend(self.vfd_definitions)

    layout.append(Space())
    layout.append(Comment('Text items'))
    layout.extend([d for (k, d) in self.text_definitions.items()])

    layout.append(Comment('Button shapes'))
    layout.extend([shape for (k, shape) in self.button_shapes.items()])

    layout.append(Space())
    layout.append(Comment('Light items'))
    layout.extend(self.light_definitions)

    layout.append(Space())
    layout.append(Comment('Slider definitions'))
    layout.extend(self.slider_definitions)

    layout.append(Space())
    layout.append(Comment('Group definitions'))
    for id, destination in self.group_definitions.items():
      group = Element('group', {'name': id})
      group.extend(destination.decorations)
      group.extend(destination.texts)
      group.extend(destination.vfds)
      group.extend(destination.buttons)
      group.extend(destination.lights)
      group.extend(destination.sliders)
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
      view_element.extend(view.groups)
      layout.append(view_element)

    (preamble, postamble) = self.load('mame_layout_script.lua').split('--CODE--')
    slider_code = []
    for view, lines in self.slider_code.items():
      slider_code.append(f'if view.unqualified_name == "{view}" then')
      slider_code.extend([indent(line, '\t') for line in lines])
      slider_code.append("end")

    script = Element('script', {}, [
      CDATA('\n'.join([preamble] + slider_code + [postamble]))
    ])
    layout.append(script)

    document = Document(layout)

    return str(document)




