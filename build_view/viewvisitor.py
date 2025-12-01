#!/usr/bin/env python3

from os import path
from view import *

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

  def visitItems(self, items: list['ViewItem']):
    for i in items:
      dprint(f"visitItems() calling item {i}.accept(self)")
      i.accept(self)

  def visitConditional(self, conditional: 'Conditional'):
    pass

  def visitAccentColor(self, accent: 'AccentColor'):
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

  def visitWheel(self, wheel: 'Wheel'):
    pass

  def visitRectangle(self, rectangle: 'Rectangle'):
    pass

  def visitEllipse(self, ellipse: 'Ellipse'):
    pass

  def visitPatchSelectButton(self, button: 'PatchSelectButton'):
    pass

  def visitGroup(self, group: 'Group'):
    pass

  def visitKey(self, key: 'Key'):
    pass

  def visitKeyboard(self, keyboard: 'Keyboard'):
    pass

  def visitShowDrawing(self, show: 'ShowDrawing'):
    pass

  def visitMultiPageChevrons(self, chevrons: 'MultiPageChevrons'):
    pass

  def visitWhiteLineAround(self, line: 'WhiteLineAround'):
    pass
