#!/usr/bin/env python

from typing import overload, reveal_type
from dataclasses import dataclass
from copy import copy, replace

from myxml import *
from util import *

@dataclass
class Vector:
  x: float
  y: float

  def __add__(self, o: 'Vector'):
    return Vector(self.x + o.x, self.y + o.y)

  def __iadd__(self, o: 'Vector'):
    self.x += o.x
    self.y += o.y
    return self

  def __sub__(self, o: 'Vector'):
    return Vector(self.x - o.x, self.y - o.y)

  def __isub__(self, o: 'Vector'):
    self.x -= o.x
    self.y -= o.y
    return self

  def __str__(self):
    return f'({fnum(self.x)},{fnum(self.y)})'


@dataclass
class Rect:
  x: float
  y: float
  w: float
  h: float

  def copy(self):
    return copy(self)

  @property
  def origin(self):
    return Vector(self.x, self.y)
  
  @property
  def extent(self):
    return Vector(self.w, self.h)

  def assign(self, r: 'Rect|None'):
    if r is not None and r.w > 0 and r.h > 0:
      self.x = r.x
      self.y = r.y
      self.w = r.w
      self.h = r.h
    return self
  
  def union(self, other):
    if other is None or not isinstance(other, Rect):
      return self
    
    if (self.w == 0 or self.h == 0):
      return other
    elif (other.w == 0 or other.h == 0):
      return self
    else:
      minX = min(self.x, other.x)
      maxX = max(self.x+self.w, other.x+other.w)
      minY = min(self.y, other.y)
      maxY = max(self.y+self.h, other.y+other.h)
      return Rect(minX, minY, maxX-minX, maxY-minY)
  
  def extend(self, other):
    return self.assign(self.union(other))
    
  def enclosing(self, o):
    if hasattr(o, 'bounds'):
      return self.union(o.bounds)
    else:
      return self
  
  def enclose(self, o):
    return self.assign(self.enclosing(o))
    
  def inset(self, dx, dy):
    return Rect(self.x + dx, self.y + dy, self.w - 2*dx, self.h - 2*dy)
  
  def outset(self, dx, dy):
    return Rect(self.x - dx, self.y - dy, self.w + 2*dx, self.h + 2*dy)
  
  @overload
  def offset(self, a: float|int, b: float|int) -> 'Rect': ...

  @overload
  def offset(self, a: Vector) -> 'Rect': ...

  def offset(self, a: float|int|Vector, b: float|int|None=None) -> 'Rect':
    if isinstance(a, (float, int)) and isinstance(b, (float, int)):
      return Rect(self.x + a, self.y + b, self.w, self.h)
    elif isinstance(a, Vector) and b is None:
      return Rect(self.x + a.x, self.y + a.y, self.w, self.h)
    else:
      raise TypeError("Inconsistent arguments to offset(): aither an Offset, or two floats, please")
  
  def __add__(self, o: Vector) -> 'Rect':
    return self.offset(o.x, o.y)
  
  def __sub__(self, o: Vector) -> 'Rect':
    return self.offset(-o.x, -o.y)
  
  def getX(self, d):
    return self.x + d * self.w

  def getY(self, d):
    return self.y + d * self.h
  
  def fitWithin(self, enclosing):
    xscale = enclosing.w / self.w
    yscale = enclosing.h / self.h
    scale = min(xscale, yscale)

    dx = (enclosing.w - (self.w * scale)) / 2
    dy = (enclosing.h - (self.h * scale)) / 2

    return Rect(enclosing.x + dx, enclosing.y + dy, self.w * scale, self.h * scale)

  def coords(self, separator=', '):
    return separator.join([f'{fnum(v)}' for v in [self.x, self.y, self.w, self.h]])

  def __str__(self):
    return f'({fnum(self.x)},{fnum(self.y)},{fnum(self.w)},{fnum(self.h)})'
  
  def viewBox(self):
    return self.coords(' ')
