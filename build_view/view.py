
#!/usr/bin/env python

from dataclasses import dataclass, field
from rect import *
from util import *
from os import path

ABOVE = 1
CENTERED = 2
BELOW = CENTERED
ABOVE_CENTERED = ABOVE | CENTERED

@dataclass
class Shade:
  name: str
  color: str
  pressed_color: str

SHADE_LIGHT = Shade('light', "#bbbbbb", "#ffffff")
SHADE_MEDIUM = Shade('medium', "#777777", "#ffffff")
SHADE_DARK = Shade('dark', "#333333", '#ffffff')

class ViewItem:
  def accept(self, visitor: 'ViewVisitor') -> None:
    pass

class ViewVisitor:
  def defaultFontSize(self):
    return 3.5
  
  def load(self, fname):
    p = path.join(path.dirname(path.realpath(__file__)), fname)
    with open(p, "rt") as f:
      return f.read(-1)
  
  def visitView(self, view: 'View'):
    self.visitContext(view)

  def visitContext(self, context: 'Context'):
    self.visitItems(context.items)

  def visitItems(self, items: list[ViewItem]):
    for i in items:
      dprint(f"visitItems() calling item {i}.accept(self)")
      i.accept(self)

  def visitConditional(self, conditional: 'Conditional'):
    pass

  def visitAccentColor(self, color: 'AccentColor'):
    pass

  def visitDisplay(self, display: 'Display'):
    pass

  def visitButton(self, button: 'Button'):
    pass

  def visitLight(self, light: 'Light'):
    pass

  def visitLabel(self, label: 'Label'):
    pass

  def visitSlider(self, slider: 'Slider'):
    pass

  def visitRectangle(self, rectangle: 'Rectangle'):
    pass

  def visitSymbol(self, symbol: 'Symbol'):
    pass

  def visitPatchSelectButton(self, patchSelectButton: 'PatchSelectButton'):
    pass

  def visitGroup(self, group: 'Group'):
    pass

@dataclass
class AccentColor(ViewItem):
  rgb: str

  def accept(self, visitor: ViewVisitor):
    visitor.visitAccentColor(self)

@dataclass
class Display(ViewItem):
  bounds: Rect

  def accept(self, visitor: ViewVisitor):
    visitor.visitDisplay(self)

@dataclass
class PatchSelectButton(ViewItem):
  bounds: Rect
  number: int

  def accept(self, visitor):
    visitor.visitPatchSelectButton(self)

@dataclass
class Button(ViewItem):
  bounds: Rect
  label: str
  number: int
  shade: Shade
  light: 'Light|None' = None

  def accept(self, visitor):
    visitor.visitButton(self)

@dataclass
class Light(ViewItem):
  bounds: Rect
  number: int

  def accept(self, visitor):
    visitor.visitLight(self)

@dataclass
class Slider(ViewItem):
  bounds: Rect
  channel: int
  name: str

  def accept(self, visitor):
    visitor.visitSlider(self)

@dataclass
class Label(ViewItem):
  bounds: Rect
  text: str
  fontSize: float
  bold: bool
  italic: bool
  centered: bool

  def accept(self, visitor):
    visitor.visitLabel(self)

@dataclass
class Rectangle(ViewItem):
  bounds: Rect
  color: str
    
  def accept(self, visitor):
    visitor.visitRectangle(self)

@dataclass
class Symbol(ViewItem):
  bounds: Rect
  name: str
  color: str

  def accept(self, visitor):
    visitor.visitSymbol(self)

class Context(ViewItem):
  def __init__(self):
    self._bounds = None
    self._items = list()

  @property
  def items(self) -> list[ViewItem]:
    return self._items
  
  def add_item(self, item: ViewItem):
    self.items.append(item)
    self._bounds = None
  
  @property
  def bounds(self):
    if self._bounds is None:
      bounds = Rect(0,0,0,0)
      for i in self.items:
        # dprint(f"{type(self)}:{bounds} -> ", end='')
        bounds = bounds.enclose(i)
        # dprint(f"{bounds}")
      self._bounds = bounds
    return self._bounds
  
  @bounds.setter
  def bounds(self, b):
    self._bounds = b
    
  def end(self):
    pass

@dataclass
class Conditional(Context):
  condition: str
  ifTrue: list[ViewItem] = field(default_factory=list)
  ifFalse: list[ViewItem] = field(default_factory=list)

  def __post_init__(self):
    super().__init__()

  def isTrue(self) -> bool:
    self._items = self.ifTrue
    return True

  def isFalse(self) -> bool:
    self._items = self.ifFalse
    return True
  
  def end(self):
    self._items = []

  @property
  def bounds(self):
    if self._bounds is None:
      bounds = Rect(0,0,0,0)
      for i in self.ifTrue + self.ifFalse:
        # dprint(f"{type(self)}:{bounds} -> ", end='')
        bounds = bounds.enclose(i)
        # dprint(f"{bounds}")
      self._bounds = bounds
    return self._bounds

  def accept(self, visitor):
    visitor.visitConditional(self)

@dataclass
class Group(Context):
  id: str
  _offset: Offset
  _intrinsic_bounds: Rect|None = None

  def __post_init__(self):
    super().__init__()
  
  def add_item(self, item: ViewItem):
    super().add_item(item)
    self._intrinsic_bounds = None

  @property
  def intrinsic_bounds(self):
    if self._intrinsic_bounds is None:
      bounds = Rect(0,0,0,0)
      for i in self.items:
        # dprint(f"{type(self)}:{bounds} -> ", end='')
        bounds = bounds.enclose(i)
        # dprint(f"{bounds}")
      self._intrinsic_bounds = bounds
    return self._intrinsic_bounds

  @property
  def bounds(self):
    if self._bounds is None:
      self._bounds = self.intrinsic_bounds + self._offset
    return self._bounds
  
  @property
  def offset(self):
    return self._offset
  
  @offset.setter
  def offset(self, o: Offset):
    self._offset = o
    self._bounds = None

  def accept(self, visitor: ViewVisitor):
    visitor.visitGroup(self)


# An entire View
@dataclass
class View(Context):
  name: str

  def __post_init__(self):
    super().__init__()
  
  def accept(self, visitor: ViewVisitor):
    visitor.visitView(self)
