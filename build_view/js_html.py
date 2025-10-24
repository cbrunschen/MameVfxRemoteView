#!/usr/bin/env python3

from textwrap import indent, dedent, wrap
from dataclasses import dataclass, field
from colors import Color, colors

from view import *

@dataclass
class HTMLJSView:
  name: str
  code: list[str] = field(default_factory=list)

class HTMLJSVisitor(ViewVisitor):

  def __init__(self, real_logos: bool = False):
    self.indent = '    '
    self.views: list[HTMLJSView] = []
    self.offset: Offset = Offset(0, 0)
  
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
    return 3.5

  def append(self, s):
    self.code.append(indent(s, self.indent))
  
  def extend(self, s):
    self.code.extend([indent(l, self.indent) for l in s])
  
  def visitView(self, view: View):
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
    self.offset += group.offset
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

  def visitLabel(self, label: 'Label'):
    bounds = label.bounds + self.offset
    bold = 'true' if label.bold else 'false'
    italic = 'true' if label.italic else 'false'
    centered = 'true' if label.centered else 'false'
    self.append(f'this.addLabel({bounds.coords()}, "{label.text}", {label.fontSize}, {bold}, {italic}, {centered});')

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

  def visitSymbol(self, symbol: 'Symbol'):
    bounds = symbol.bounds + self.offset
    self.append(f'this.addSymbol({bounds.coords()}, "{symbol.name}");')
  
  def visitKey(self, key: 'Key'):
    bounds = key.bounds + self.offset
    self.append(f'this.addKey({bounds.coords()}, {key.number}, {key.black});')

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
