#!/usr/bin/env python3

from textwrap import indent, dedent, wrap
from dataclasses import dataclass, field
from colors import colors
from view import *
from render import TextRenderer

@dataclass
class HTMLJSView:
  name: str
  code: list[str] = field(default_factory=list)

class HTMLJSVisitor(ViewVisitor):

  def __init__(
      self,
      text_paths: bool = False
    ):
    self.text_paths = text_paths
    self.indent = '    '
    self.views: list[HTMLJSView] = []
    self.offset: Vector = Vector(0, 0)
    self.text_renderer = TextRenderer()

  
  @property
  def code(self):
    if self.views is None or len(self.views) == 0:
      raise ValueError("attempting to access code with no view!")
    return self.views[-1].code
  
  def iin(self):
    self.indent = '  ' + self.indent
  
  def iout(self):
    self.indent = self.indent.removeprefix('  ')
  
  def defaultFontSize(self):
    if self.text_paths:
      return 4.3
    return 3.6

  def append(self, s):
    self.code.append(indent(s, self.indent))
  
  def extend(self, s):
    self.code.extend([indent(l, self.indent) for l in s])
  
  def visitView(self, view: View):
    self.offset = Vector(0, 0)
    self.views.append(HTMLJSView(view.name))
    super().visitView(view)
    bounds = view.bounds
    viewBox = f"{bounds.x} {bounds.y} {bounds.w} {bounds.h}"
    self.append(f'this.root.setAttribute("x", "0mm");')
    self.append(f'this.root.setAttribute("y", "0mm");')
    self.append(f'this.root.setAttribute("width", "{bounds.w}mm");')
    self.append(f'this.root.setAttribute("height", "{bounds.h}mm");')
    self.append(f'this.root.setAttribute("viewBox", "{viewBox}");')
  
  def visitAccentColor(self, accent: AccentColor):
    self.append(f'this.accentColor = Colors.{snake_to_upper_snake_case(accent.color)};')
  
  def visitConditional(self, conditional: Conditional):
    self.append(f'if ({conditional.condition}) {{')
    self.iin()
    for i in conditional.ifTrue:
      i.accept(self)
    self.iout()
    self.append(f'}} else {{ // not {conditional.condition}')
    self.iin()
    for i in conditional.ifFalse:
      i.accept(self)
    self.iout()
    self.append('}')
  
  def visitGroup(self, group: Group):
    self.offset = self.offset + group.offset
    self.append(f"// Starting group '{group.id}' at offset {self.offset.x},{self.offset.y}")

    for i in group.items:
      i.accept(self)

    self.append(f"// Ending group '{group.id}'")

    self.offset -= group.offset

  def visitDisplay(self, display: 'Display'):
    bounds = display.bounds + self.offset
    self.append(dedent(f'''
      this.displayContainer = createElement("svg");
      this.display = new Display(this.displayContainer, 2, 40);
      this.displayContainer.setAttribute("preserveAspectRatio", "xMidYMid meet");
      this.displayContainer.setAttribute("x", {bounds.x});
      this.displayContainer.setAttribute("y", {bounds.y});
      this.displayContainer.setAttribute("width", {bounds.w});
      this.displayContainer.setAttribute("height", {bounds.h});
      this.root.appendChild(this.displayContainer);
    '''))

  def visitPatchSelectButton(self, button: 'PatchSelectButton'):
    bounds = button.bounds + self.offset
    self.append(f'this.addPatchSelectButton({bounds.coords()}, {button.number});')

  def visitButton(self, button: 'Button'):
    bounds = button.bounds + self.offset
    color = snake_to_upper_snake_case(button.shade.color)
    addButton = f'this.addButton({bounds.coords()}, {button.number}, Colors.{color})'
    if button.light:
      light = button.light
      bounds = light.bounds
      self.append(f'{addButton}.addLight(this.addLight({bounds.coords()}, {light.number}));')
    else:
      self.append(f'{addButton};')

  def visitLight(self, light: 'Light'):
    bounds = light.bounds + self.offset
    self.append(f'this.addLight({bounds.coords()}, {light.number});')

  def visitLabel(self, label: 'Label'):
    color = 'this.accentColor' if label.color == 'accent' else f'Colors.{snake_to_upper_snake_case(label.color)}' if label.color else 'null'
    bounds = label.bounds + self.offset
    if self.text_paths:
      if color == 'null':
        color = 'white'
      x, y, w = bounds.x, bounds.y, bounds.w
      tp = self.text_renderer.textPath(label.text, w, label.font, label.alignment)
      self.append(f'this.addPath({x}, {y}, "{tp}", "{color}")')
    else:
      x, y, w = label.x + self.offset.x, label.y + self.offset.y, label.w
      bold = 'true' if label.font.bold else 'false'
      italic = 'true' if label.font.italic else 'false'
      centered = 'true' if label.alignment == Alignment.CENTERED else 'false'
      stretched = 'true' if label.alignment >= Alignment.STRETCH else 'false'
      self.append(f'this.addLabel({x}, {y}, {w}, "{label.text}", {label.font.size}, {bold}, {italic}, {centered}, {stretched}, {color});')

  def visitSlider(self, slider: 'Slider'):
    bounds = slider.bounds + self.offset
    self.append(f'this.addSlider({bounds.coords()}, {slider.channel}, 0.5);')

  def visitWheel(self, wheel: 'Wheel'):
    bounds = wheel.bounds + self.offset
    self.append(f'this.addWheel({bounds.coords()}, {wheel.channel}, 0.5, {"true" if wheel.autocenter else "false"});')

  def visitRectangle(self, rectangle: 'Rectangle'):
    bounds = rectangle.bounds + self.offset
    color = 'this.accentColor' if rectangle.color == 'accent' else f'Colors.{snake_to_upper_snake_case(rectangle.color)}'
    self.append(f'this.addRectangle({bounds.coords()}, {color});')
  
  def visitEllipse(self, ellipse: 'Ellipse'):
    dprint(f'visitEllipse({ellipse})')
    bounds = ellipse.bounds + self.offset
    color = 'this.accentColor' if ellipse.color == 'accent' else f'Colors.{snake_to_upper_snake_case(ellipse.color)}'
    self.append(f'this.addEllipse({bounds.coords()}, {color});')

  def visitKey(self, key: 'Key'):
    bounds = key.bounds + self.offset
    black = 'true' if key.black else 'false'
    self.append(f'this.addKey({bounds.coords()}, {key.number}, {black}, "{key.shape.path}");')

  def visitKeyboard(self, keyboard: 'Keyboard'):
    offset = self.offset
    self.offset = self.offset + keyboard.bounds.origin
    x, y = self.offset.x, self.offset.y
    w, h = keyboard.bounds.w, keyboard.bounds.h

    self.append(f'this.addKeyboard({x}, {y}, {w}, {h}, Colors.KEYBOARD_BACKGROUND)')

    for key in keyboard.items:
      key.accept(self)

    self.offset = offset

  def visitShowDrawing(self, show: ShowDrawing):
    drawing = show.drawing
    bounds = show.bounds.offset(self.offset)
    self.append(f'this.addDrawing({bounds.coords()},')
    self.append(f'  "{drawing.bounds.x} {drawing.bounds.y} {drawing.bounds.w} {drawing.bounds.h}",')
    self.append(f'  [')
    element = drawing.toSvgElement(show.colors)
    for child in element.children:
      if isinstance(child, Element):
        self.append('    {')
        self.append(f'      tag: "{child.tag}",')
        for attr, value in child.attrs.items():
          self.append(f'      "{attr}": `{value}`,')
        self.append('    },')

    self.append('  ]);')
  
  def visitMultiPageChevrons(self, chevrons: MultiPageChevrons):
    # For now at least, generate font metrics ourselves ...
    labels = chevrons.labels
    nLines = len(labels)
    label = labels[-1]
    bottom_x = self.text_renderer.textWidth(label.text, label.font) + 0.5
    if nLines > 1:
      above = labels[-2]
      top_x = self.text_renderer.textWidth(above.text, label.font) + 0.5
    else:
      top_x = max(0, bottom_x - 7)
    
    bounds = label.bounds.copy()

    x = bounds.x + top_x
    y = bounds.y - 1.5
    w = (bottom_x - top_x) + 1.25 + (bounds.h + 1.5) * tan(radians(12))
    h = label.font.baseline + 1.5

    drawing = SVGDrawing(Rect(0, 0, w, h), "no_name") \
      .addItem('path', SVGPath(MultiPageChevrons.svgPath(w, h).strip(), stroke_width="0.25", stroke=True, fill=False))
    showDrawing = ShowDrawing(Rect(x, y, w, h), drawing, {'path':'white'})
    self.visitShowDrawing(showDrawing)
    
  def visitWhiteLineAround(self, line: 'WhiteLineAround'):
    bounds = line.label.bounds.copy()
    eprint(f'visiting white line around \'{line.label.text}\' in {bounds}')
    # For now at least, generate font metrics ourselves ...
    tw = self.text_renderer.textWidth(line.label.text, line.label.font) + 2
    eprint(f'text width is {tw}')
    x0 = bounds.x
    w = (bounds.w - tw) / 2
    eprint(f'({bounds.w} - {tw}) / 2 = {w}')
    x1 = bounds.x + (bounds.w + tw) / 2
    h = line.thickness
    y = bounds.y + 0.5 * (bounds.h - h)

    r0 = Rect(x0, y, w, h)
    r1 = Rect(x1, y, w, h)
    eprint(f'drawing white rectangles {r0} and {r1}')
    self.visitRectangle(Rectangle(r0, 'white'))
    self.visitRectangle(Rectangle(r1, 'white'))

  def __str__(self):
    template = self.load("View.js")

    functions = []
    dispatcher = ["  populateView(view, hasSeq, isSd1, isSd132) {"]
    options = [indent(dedent('''\
      populateViewOptions(select) {
        while (select.lastChild) {
          select.removeChild(select.lastChild);
        }
        var option;
      '''), '  ')]

    for i, v in enumerate(self.views):
      camel_parts = [x.capitalize() for x in v.name.lower().split("_")]
      name = "".join(camel_parts)
      display_name = " ".join(camel_parts)

      functions.append(f"  populate{name}View(hasSeq, isSd1, isSd132) {{")
      functions.extend(v.code)
      functions.append("  }")

      dispatcher.append(f"    if (view == {i}) return this.populate{name}View(hasSeq, isSd1, isSd132);")

      options.extend([
        "    option = document.createElement('option');",
        f'    option.text = "{display_name}";',
        f"    option.value = {i};"
        "    select.appendChild(option);"
      ])
    options.append("  }")
    dispatcher.append("  }")

    colordefs = ',\n'.join([f'  "{snake_to_upper_snake_case(c.name)}": "{c.hex}"' for c in colors])
    code = '\n'.join(options + functions + dispatcher)

    return template.replace("//COLORS//", colordefs).replace('//CODE//', code)
