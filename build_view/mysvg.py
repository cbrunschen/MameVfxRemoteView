#!/usr/bin/env python3

from dataclasses import dataclass
from rect import *
from util import clean
from myxml import Element
from colors import hex_for_color, get_color, Color

class SVGPathElement:

  def overrideColor(self, selfColor:str|bool|None, overrideSpecific:str|None, overrideGeneric:str|None=None):
    if overrideSpecific is None:
      if overrideGeneric is None:
        if isinstance(selfColor, str):
          color = get_color(selfColor)
          if isinstance(color, Color):
            return color.hex
          return selfColor
        elif selfColor is not None and selfColor:
          return 'white'
        else:
          return 'none'
      else:
        if isinstance(selfColor, str) or selfColor is not None and selfColor:
          return overrideGeneric
        else:
          return 'none'
    else:
      return overrideSpecific
    
  def toSvgElement(self, r:float|None = None, fill:str|None = None, fill_rule:str|None = None, stroke:str|None = None, stroke_width:str|None = None, color:str|None = None) -> Element:
   raise NotImplementedError()


@dataclass
class SVGRect(SVGPathElement):
  rect: Rect
  r: float = 0.0
  fill: str|bool|None = None
  stroke: str|bool|None = None
  stroke_width: str|None = None
  
  def toSvgElement(self, r:float|None=None, fill:str|None=None, fill_rule:str|None = None, stroke:str|None=None, stroke_width:str|None=None, color:str|None=None):
    rr = r if r is not None else self.r
    rx = f"{fnum(rr)}"
    return Element('rect', clean({
      'x': f"{fnum(self.rect.x)}", 
      'y': f"{fnum(self.rect.y)}", 
      'width': f"{fnum(self.rect.w)}", 
      'height': f"{fnum(self.rect.h)}",
      'rx': rx,
      'fill': self.overrideColor(self.fill, fill, color),
      'stroke': self.overrideColor(self.stroke, stroke, color),
      'stroke-width': stroke_width if stroke_width is not None else self.stroke_width
    }), [])

@dataclass
class SVGCircle(SVGPathElement):
  center: Vector
  r: float = 0.0
  fill: str|bool|None = None
  stroke: str|bool|None = None
  stroke_width: str|None = None
  
  def toSvgElement(self, r:float|None=None, fill:str|None=None, fill_rule:str|None = None, stroke:str|None=None, stroke_width:str|None=None, color:str|None=None):
    rr = r if r is not None else self.r
    rx = f"{fnum(rr)}"
    return Element('circle', clean({
      'cx': f"{fnum(self.center.x)}", 
      'cy': f"{fnum(self.center.y)}",
      'r': f"{fnum(self.r)}",
      'fill': self.overrideColor(self.fill, fill, color),
      'stroke': self.overrideColor(self.stroke, stroke, color),
      'stroke-width': stroke_width if stroke_width is not None else self.stroke_width
    }), [])


@dataclass
class SVGPath(SVGPathElement):
  data: str                   # the SVG path string, the 'd' attribute of an SVG path
  fill: bool|str = True
  fill_rule: str|None = None
  stroke: bool|str = False
  stroke_width: str|None = None

  def addAttr(self, l, attr:str, val:str|bool|None):
    if isinstance(val, bool) and val == True:
      val = 'white'
    if isinstance(val, str):
      l.append(f'{attr}="{val}"')
  
  def toSvgElement(self, r: float|None = None, 
                   fill: str|None = None, fill_rule: str|None = None, 
                   stroke: str|None = None, stroke_width: str|None = None, 
                   color: str|None = None):
    return Element('path', clean({
      'd': self.data,
      'fill': self.overrideColor(self.fill, fill, color),
      'fill-rule': fill_rule if fill_rule is not None else self.fill_rule,
      'stroke': self.overrideColor(self.stroke, stroke, color),
      'stroke-width': stroke_width if stroke_width is not None else self.stroke_width
    }), [])

@dataclass
class SVGDrawing:
  bounds: Rect
  name: str
  items: dict[str, SVGPathElement] = field(default_factory=dict)

  def withItems(self, items: Sequence[tuple[str, SVGPathElement]]):
    for k, v in items:
      self.items[k] = v
    return self

  def addItem(self, name: str, item: SVGPathElement):
    self.items[name] = item
    return self
  
  def get_color(self, part: str, colors:dict[str,str]|None) -> str|None:
    if colors is None:
      return None
    if part in colors:
      return hex_for_color(colors[part])
    return None
  
  def toSvgElement(self, colors: dict[str,str]|None = None):
    return Element('svg', {
      'x': f'{fnum(self.bounds.x)}',
      'y': f'{fnum(self.bounds.y)}',
      'width': f'{fnum(self.bounds.w)}',
      'height': f'{fnum(self.bounds.h)}',
      'viewBox': f'{fnum(self.bounds.x)} {fnum(self.bounds.y)} {fnum(self.bounds.w)} {fnum(self.bounds.h)}',
    }).extend([
      item.toSvgElement(color=self.get_color(part, colors)) for part, item in self.items.items()
    ])
  
