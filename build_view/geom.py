#!/usr/bin/env python3

from dataclasses import dataclass
from math import sin, cos, sqrt, atan2, isclose
from typing import cast

epsilon = 2 ** -36

@dataclass(frozen=True)
class Point:
  """A Point / Vector in 2 dimensions, standard cartesian coordinates."""
  
  x: float
  y: float
  
  @staticmethod
  def fromComplex(c: complex):
    return Point(c.real, c.imag)
  
  def at(self, t):
    return self
  
  def radial(self, radius: float, angle: float):
    return Point(self.x + radius * cos(angle), self.y + radius * sin(angle))

  def squareLength(self):
    return self.x * self.x + self.y * self.y
  
  def length(self):
    return sqrt(self.squareLength())

  def __mul__(self, v):
    return Point(self.x * v, self.y * v)

  __rmul__ = __mul__

  def __truediv__(self, v):
    return Point(self.x / v, self.y / v)
    
  __div__ = __truediv__  # backward compatibility?
  
  def __add__(self, p):
    return Point(self.x + p.x, self.y + p.y)
    
  __radd__ = __add__
  
  def __sub__(self, p: 'Point'):
    return Point(self.x - p.x, self.y - p.y)
  
  def __neg__(self):
    return Point(-self.x, -self.y)
  
  __invert__ = __neg__

  def __pos__(self):
    return self
  
  def abs(self):
    return self.length()
  
  def __complex__(self):
    return complex(self.x, self.y)
    
  def unit(self):
    ln = self.length()
    return Point(self.x / ln, self.y / ln) if ln != 0 else Point(0, 0)
  
  def angle(self):
    return atan2(self.y, self.x)
    
  def cross(self, p: 'Point'):
    return self.x * p.y - self.y * p.x
  
  def dot(self, p: 'Point'):
    return self.x * p.x + self.y * p.y
  
  def selfDot(self):
    return self.x * self.x + self.y * self.y
  
  def isclose(self, p: 'Point', rel_tol: float = epsilon, abs_tol: float = 0.0):
    return isclose(self.x, p.x, rel_tol=rel_tol) and isclose(self.y, p.y, rel_tol=rel_tol, abs_tol=abs_tol)
    
  def __str__(self):
    return f"P({self.x}, {self.y})"
  
  def __iter__(self):
    return iter([self.x, self.y])


def cross(p: Point, q: Point):
  return p.cross(q)


def dot(p: Point, q: Point):
  return p.dot(q)


@dataclass
class Matrix:
  """An affine transformation matrix."""
  xx: float = 1
  xy: float = 0
  yx: float = 0
  yy: float = 1
  tx: float = 0
  ty: float = 0
  
  @staticmethod
  def identity():
    return Matrix(xx=1, xy=0, yx=0, yy=1, tx=0, ty=0)
  
  @staticmethod
  def translation(tx: float, ty: float|None = None) -> 'Matrix':
    return Matrix(xx=1, xy=0, yx=0, yy=1, tx=tx, ty=tx if ty is None else ty)

  @staticmethod
  def scaling(dx: float, dy: float|None = None) -> 'Matrix':
    return Matrix(xx=dx, xy=0, yx=0, yy=dx if dy is None else dy, tx=0, ty=0)
  
  @staticmethod 
  def rotationSinCos(sa: float, ca: float) -> 'Matrix':
    return Matrix(xx = ca, xy = -sa, yx = sa, yy = ca, tx = 0, ty = 0)

  @staticmethod
  def rotation(a: float) -> 'Matrix':
    return Matrix.rotationSinCos(sin(a), cos(a))
  
  @staticmethod
  def shearing(xy: float = 0, yx: float = 0) -> 'Matrix':
    return Matrix(xx = 1, xy = xy, yx = yx, yy = 1, tx = 0, ty = 0)
  
  def __matmul__(self, other) -> 'Matrix|Point|tuple[float,float]|None':
    if isinstance(other, Point):
      p = other
      return Point(
        self.xx * p.x + self.yx * p.y + self.tx,
        self.xy * p.x + self.yy * p.y + self.ty
        )
    elif isinstance(other, tuple):
      x, y = other
      return (
        self.xx * x + self.yx * y + self.tx,
        self.xy * x + self.yy * y + self.ty
        )
        
    elif isinstance(other, Matrix):
      m = other
      return Matrix(
        xx = self.xx * m.xx + self.xy * m.yx,
        xy = self.xx * m.xy + self.xy * m.yy,

        yx = self.yx * m.xx + self.yy * m.yx,
        yy = self.yx * m.xy + self.yy * m.yy,

        tx = self.xx * m.tx + self.xy * m.ty + self.tx,
        ty = self.yx * m.tx + self.yy * m.ty + self.ty
        )
  
  def translate(self, tx: float, ty: float|None = None) -> 'Matrix':
    m = Matrix.translation(tx, ty)
    # print(f"translating matrix by {tx},{ty} == {m}")
    return cast(Matrix, m @ self)

  def rotate(self, alpha: float) -> 'Matrix':
    m = Matrix.rotation(alpha)
    # print(f"rotating matrix by {alpha} == {m}")
    return cast(Matrix, m @ self)

  def scale(self, dx: float, dy: float|None = None) -> 'Matrix':
    m = Matrix.scaling(dx, dy)
    # print(f"scaling matrix by {dx},{dy} == {m}")
    return cast(Matrix, m @ self)
  
  def shear(self, xy: float = 0, yx: float = 0) -> 'Matrix':
    m = Matrix.shearing(xy=xy, yx=yx)
    return cast(Matrix, m @ self)

  def transform(self, p) -> Point|tuple[float,float]:
    if isinstance(p, Point):
      return Point(
        self.xx * p.x + self.yx * p.y + self.tx,
        self.xy * p.x + self.yy * p.y + self.ty
        )
    else:
      x, y = p
      return (
        self.xx * x + self.yx * y + self.tx,
        self.xy * x + self.yy * y + self.ty
        )
