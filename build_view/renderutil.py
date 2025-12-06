from math import sqrt, modf
from util import dprint
from dataclasses import dataclass, field
import re

class Quadratic:
  def __init__(self, v0: float, v1: float, v2: float):
    self.v0 = v0
    self.v1 = v1
    self.v2 = v2

    # pseudo-derivative bernstein coefficients
    self.d0 = v1 - v0
    self.d1 = v2 - v1

    # pseudo-derivative in canonical polynomial form
    self.da0 = self.d0
    self.da1 = -self.d0 + self.d1
  
  def at(self, t):
    if t <= 0.0:
      return self.v0
    elif 1.0 <= t:
      return self.v2
    else:
      t1 = 1.0 - t
      a0 = t1 * self.v0 + t * self.v1
      a1 = t1 * self.v1 + t * self.v2
      return t1 * a0 + t * a1
  
  def extremes(self):
    v_min = min(self.v0, self.v2)
    v_max = max(self.v0, self.v2)

    def u(t):
      nonlocal v_min, v_max
      if 0 < t and t < 1:
        dprint(f"extreme at t={t}")
        vt = self.at(t)
        v_min = min(v_min, vt)
        v_max = max(v_max, vt)

    # solve da0 + t da1 == 0
    a = self.da1
    b = self.da0

    if a != 0:
      t = -b / a
      u(t)

    return (v_min, v_max)


class Cubic:
  def __init__(self, v0: float, v1: float, v2: float, v3: float):
    self.v0 = v0
    self.v1 = v1
    self.v2 = v2
    self.v3 = v3

    # pseudo-derivative bernstein coefficients
    self.d0 = v1 - v0
    self.d1 = v2 - v1
    self.d2 = v3 - v2

    # pseudo-derivative in canonical polynomial form
    self.da0 = self.d0
    self.da1 = -2 * self.d0 + 2 * self.d1
    self.da2 = self.d0 - 2 * self.d1 + self.d2
  
  def at(self, t):
    if t <= 0.0:
      return self.v0
    elif 1.0 <= t:
      return self.v3
    else:
      t1 = 1.0 - t
      a0 = t1 * self.v0 + t * self.v1
      a1 = t1 * self.v1 + t * self.v2
      a2 = t1 * self.v2 + t * self.v3
      b0 = t1 * a0 + t * a1
      b1 = t1 * a1 + t * a2
      return t1 * b0 + t * b1
  
  def extremes(self):
    v_min = min(self.v0, self.v3)
    v_max = max(self.v0, self.v3)

    def u(t):
      nonlocal v_min, v_max
      if 0 < t and t < 1:
        dprint(f"extreme at t={t}")
        vt = self.at(t)
        v_min = min(v_min, vt)
        v_max = max(v_max, vt)

    # solve da0 + t da1 + t^2 da2 == 0
    a = self.da2
    b = self.da1
    c = self.da0

    dprint(f"[extremes with quadratic {a},{b},{c}]")

    m = max(abs(b), abs(c))
    a_rel = abs(a) / m if m > 0 else a
    if a_rel < (1.0 / (1 << 40)):
      # The derivative is not really a quadratic curve, more of a line;
      # treat it as such.
      dprint(f"[quadratic {a},{b},{c} is really a line...]")
      if b != 0:
        t = -c / b
        u(t)

    else:
      discriminant = b * b - 4 * a * c

      if discriminant == 0.0:
        t = -b / (2 * a)
        u(t)

      elif discriminant > 0.0:
        rt = sqrt(discriminant)
        t1 = (-b - rt) / (2 * a)
        u(t1)
        t2 = (-b + rt) / (2 * a)
        u(t2)

    return (v_min, v_max)



class SVGPathParser:
  """Bezier paths only (no arcs)"""

  MOVE_TO = 'M'
  R_MOVE_TO = 'm'
  LINE_TO = 'L'
  R_LINE_TO = 'l'
  CURVE_TO = 'C'
  R_CURVE_TO = 'c'
  QUAD_TO = 'Q'
  R_QUAD_TO = 'q'
  CLOSE = 'Z'
  R_CLOSE = 'z'

  CMDS = {
    MOVE_TO,
    LINE_TO,
    R_LINE_TO,
    CURVE_TO,
    R_CURVE_TO,
    QUAD_TO,
    R_QUAD_TO,
    CLOSE,
    R_CLOSE,
  }

  match_cmd = re.compile(r'\s*([MmLlCcQqZz])')
  match_num = re.compile(r'\s*,?\s*([+-]?\d*\.?\d*([eE][+-]?\d+)?)')

  @staticmethod
  def parts(s):
    while len(s) > 0:
      if match := SVGPathParser.match_cmd.match(s):
        s = s[match.end():]
        dprint(f'cmd {match}, remaining={s}')
        yield match.group(1) 
      if match := SVGPathParser.match_num.match(s):
        if len(match.group()) > 0:
          s = s[match.end():]
          dprint(f'num {match} with groups {match.groups()}, remaining={s}')
          v = float(match.group(1))
          fractional, integral = modf(v)
          if fractional == 0.0:
            dprint(f'- {v} represents an integer, {fractional=}')
            yield int(integral)
          else:
            dprint(f'- {v} is a float, {fractional=}')
            yield v

  @staticmethod  
  def want(cmd):
    relative = cmd.islower()
    cmd = cmd.lower()
    if cmd == 'm' or cmd == 'l':
      return (1, cmd, relative)
    elif cmd == 'q':
      return (2, cmd, relative)
    elif cmd == 'c':
      return (3, cmd, relative)
    elif cmd == 'z':
      return (0, cmd, relative)
    else:
      return (-1, None, False)
  

  @staticmethod
  def parse(s):
    s = s.strip()
    parts = list(SVGPathParser.parts(s))

    cmd = parts[0]
    n_points, cmd, relative = SVGPathParser.want(cmd)
    parts = parts[1:]
    
    while cmd is not None and len(parts) > 0:
      if parts[0] in SVGPathParser.CMDS:
        cmd = parts[0]
        n_points, cmd, relative = SVGPathParser.want(cmd)
        parts = parts[1:]
        
      if n_points < 0:
        raise ValueError

      points = list()
      for _ in range(n_points):
        if isinstance(parts[0], (int, float)) and isinstance(parts[1], (int, float)):
          points.append((parts[0], parts[1]))
          parts = parts[2:]
        else:
          raise ValueError

      if cmd == 'm':
        print(f'Move {relative=} {points}')
        # the next command after a move is a line.
        cmd = 'l'
      elif cmd == 'l':
        print(f'Line {relative=} {points}')
      elif cmd == 'q':
        print(f'Quad {relative=} {points}')
      elif cmd == 'c':
        print(f'Cubic {relative=} {points}')
      elif cmd == 'z':
        print(f'Close {relative=} {points}')
      else:
        raise ValueError


def ti(v):
  if abs(v % 1.0) < (1.0 / (1024 * 1024)):
    return int(v)
  else:
    return v

class Path:

  class Step:
    def end(self) -> tuple[int|float, int|float]:
      return (0,0)
    
    def a(self, v:int|float, sv:float, dv:float):
      return ti(dv + sv * v)

    def r(self, v:int|float, pv:int|float, sv:float):
      return ti(sv * (v - pv))

    def tf(self, sx:float, sy:float, dx:float, dy:float):
      return Path.Step()
    
    def svg(self, prev: 'Path.Step', sx:float=1, sy:float=1, dx:float=0, dy:float=0) -> str:
      return ''


  @dataclass
  class MoveTo(Step):
    x: int|float
    y: int|float

    def end(self):
      return (self.x, self.y)
    
    def tf(self, sx:float, sy:float, dx:float, dy:float):
      return Path.MoveTo(self.a(self.x,sx,dx), self.a(self.y,sy,dy))

    def svg(self, prev, sx:float=1, sy:float=1, dx:float=0, dy:float=0):
      return f'M{self.a(self.x,sx,dx)},{self.a(self.y,sy,dy)}'


  @dataclass
  class LineTo(Step):
    x: int|float
    y: int|float

    def end(self):
      return (self.x, self.y)
    
    def tf(self, sx:float, sy:float, dx:float, dy:float):
      return Path.LineTo(self.a(self.x,sx,dx), self.a(self.y,sy,dy))

    def svg(self, prev, sx:float=1, sy:float=1, dx:float=0, dy:float=0):
      px, py = prev.end()
      return f'l{self.r(self.x,px,sx)},{self.r(self.y,py,sy)}'
    
    
  @dataclass
  class QuadTo(Step):
    x1: int|float
    y1: int|float
    x2: int|float
    y2: int|float

    def end(self):
      return (self.x2, self.y2)

    def tf(self, sx:float, sy:float, dx:float, dy:float):
      return Path.QuadTo(self.a(self.x1,sx,dx), self.a(self.y1,sy,dy),
                         self.a(self.x2,sx,dx), self.a(self.y2,sy,dy))

    def svg(self, prev, sx:float=1, sy:float=1, dx:float=0, dy:float=0):
      px, py = prev.end()
      dprint(f'QuadTo.svg(): [{px},{py}], ({self.x1},{self.y1}), ({self.x2},{self.y2})')
      dprint(f'    {sx=},{sy=}; {dx=},{dy=}')
      dprint(f' -> {self.r(self.x1,px,sx)},{self.r(self.y1,py,sy)} {self.r(self.x2,px,sx)},{self.r(self.y2,py,sy)}')
      return f'q{self.r(self.x1,px,sx)},{self.r(self.y1,py,sy)} {self.r(self.x2,px,sx)},{self.r(self.y2,py,sy)}'


  @dataclass
  class CubicTo(Step):
    x1: int|float
    y1: int|float
    x2: int|float
    y2: int|float
    x3: int|float
    y3: int|float

    def end(self):
      return (self.x3, self.y3)

    def tf(self, sx:float, sy:float, dx:float, dy:float):
      return Path.CubicTo(self.a(self.x1,sx,dx), self.a(self.y1,sy,dy),
                          self.a(self.x2,sx,dx), self.a(self.y2,sy,dy),
                          self.a(self.x3,sx,dx), self.a(self.y3,sy,dy))

    def svg(self, prev, sx:float=1, sy:float=1, dx:float=0, dy:float=0):
      px, py = prev.end()
      return f'q{self.r(self.x1,px,sx)},{self.r(self.y1,py,sy)} {self.r(self.x2,px,sx)},{self.r(self.y2,py,sy)} {self.r(self.x3,px,sx)},{self.r(self.y3,py,sy)}'


  @dataclass
  class Close(Step):
    def end(self):
      return (0, 0)

    def tf(self, sx:float, sy:float, dx:float, dy:float):
      return Path.Close()

    def svg(self, prev, sx:float=1, sy:float=1, dx:float=0, dy:float=0):
      return 'z'


  def __init__(self, steps:list[Step]|None=None):
    self.steps = steps if steps is not None else list()
  
  def svg(self, sx:float=1, sy:float=1, dx:float=0, dy:float=0):
    prev = Path.Step()
    parts = []
    for step in self.steps:
      parts.append(step.svg(prev, sx=sx, sy=sy, dx=dx, dy=dy))
      prev = step
    return ''.join(parts)
  
  def bbox(self):
    cy = 0
    y_min = float('inf')
    y_max = float('-inf')
    cx = 0
    x_min = float('inf')
    x_max = float('-inf')

    def m(x, y):
      nonlocal cx, cy
      cx, cy = x, y

    def ux(x):
      nonlocal cx, x_min, x_max
      x_min = min(x_min, cx, x)
      x_max = max(x_max, cx, x)
      cx = x

    def uy(y):
      nonlocal cy, y_min, y_max
      y_min = min(y_min, cy, y)
      y_max = max(y_max, cy, y)
      cy = y

    def u(x, y):
      ux(x)
      uy(y)

    for step in self.steps:
      if isinstance(step, Path.MoveTo):
        m(step.x, step.y)
      elif isinstance(step, Path.LineTo):
        u(step.x, step.y)
      elif isinstance(step, Path.QuadTo):
        for x in Quadratic(cx, step.x1, step.x2).extremes():
          ux(x)
        for y in Quadratic(cy, step.y1, step.y2).extremes():
          uy(y)
      elif isinstance(step, Path.CubicTo):
        for x in Cubic(cx, step.x1, step.x2, step.x3).extremes():
          ux(x)
        for y in Cubic(cy, step.y1, step.y2, step.y3).extremes():
          uy(y)
    
    return (x_min, y_min, x_max, y_max)
  
  def tf(self, sx:float, sy:float, dx:float, dy:float):
    return Path(list(step.tf(sx, sy, dx, dy) for step in self.steps))


class PathBuilder:
  
  def __init__(self):
    self.cx = 0
    self.cy = 0
    self.ox = 0
    self.oy = 0
    self.path = None

  def setOffset(self, x, y):
    self.ox, self.oy = x, y
  
  def advance(self, dx, dy):
    self.ox += dx
    self.oy += dy

  def addStep(self, step: Path.Step):
    if self.path is None:
      self.path = Path()
    self.path.steps.append(step)

  def moveTo(self, x, y, userdata=None): 
    x,y = ti(x+self.ox), ti(y+self.oy)
    dprint(f'move(({x},{y}))')
    self.addStep(Path.MoveTo(x, y))
    self.cx, self.cy = x, y

  def lineTo(self, x, y, userdata=None): 
    x,y = ti(x+self.ox), ti(y+self.oy)
    dprint(f'lineTo({x},{y})')
    self.addStep(Path.LineTo(x, y))
    self.cx, self.cy = x, y

  def quadTo(self, x1, y1, x2, y2, userdata=None): 
    x1,y1,x2,y2 = ti(x1+self.ox), ti(y1+self.oy), ti(x2+self.ox), ti(y2+self.oy)
    dprint(f'quadTo({x1},{y1}; {x2},{y2})')
    self.addStep(Path.QuadTo(x1, y1, x2, y2))
    self.cx, self.cy = x2, y2

  def cubicTo(self, x1, y1, x2, y2, x3, y3, userdata=None): 
    x1,y1,x2,y2,x3,y3 = ti(x1+self.ox), ti(y1+self.oy), ti(x2+self.ox), ti(y2+self.oy), ti(x3+self.ox), ti(y3+self.oy)
    dprint(f'cubicTo({x1},{y1}; {x2},{y2}; {x3},{y3})')
    self.addStep(Path.CubicTo(x1, y1, x2, y2, x3, y3))
    self.cx, self.cy = x3, y3
  
  def close(self, userdata=None):
    dprint(f'close()')
    self.addStep(Path.Close())
    self.cx, self.cy = 0, 0

  def build(self):
    try:
      return self.path if self.path is not None else Path()
    finally:
      self.cx = 0
      self.cy = 0
      self.ox = 0
      self.oy = 0
      self.path = None


@dataclass
class Metrics:
  height: float
  text_up: float
  text_down: float
  above_text: float
  ascent: float
  descent: float
  cap_height: float
  scale: float = field(default=1.0, kw_only=True)

  def __post_init__(self):
    dprint(f'Created: {str(self)}')

  @property
  def text_height(self):
    return self.text_up + self.text_down
  
  @property
  def top(self):
    return self.height - self.text_height
  
  @property
  def baseline(self):
    return self.height - self.descent
  
  def get(self, att: str):
    return getattr(self, att)
  
  def __mul__(self, scale):
    return Metrics(
      self.height * scale, 
      self.text_up * scale, 
      self.text_down * scale, 
      self.above_text * scale, 
      self.ascent * scale, 
      self.descent * scale,
      self.cap_height * scale,
      scale = self.scale * scale)
    
  def __imul__(self, scale):
    self.height     *= scale
    self.text_up    *= scale
    self.text_down  *= scale
    self.above_text *= scale
    self.ascent     *= scale
    self.descent    *= scale
    self.cap_height *= scale
    self.scale      *= scale
    dprint(f'Multiplied: {str(self)}')
    return self
    
  def __div__(self, scale):
    return Metrics(
      self.height / scale, 
      self.text_up / scale, 
      self.text_down / scale, 
      self.above_text / scale, 
      self.ascent / scale, 
      self.descent / scale,
      self.cap_height / scale,
      scale = self.scale / scale)

  def __idiv__(self, scale):
    self.height     /= scale
    self.text_up    /= scale
    self.text_down  /= scale
    self.above_text /= scale
    self.ascent     /= scale
    self.descent    /= scale
    self.cap_height /= scale
    self.scale      /= scale
    dprint(f'Divided: {str(self)}')
    return self
  
  def scaleFor(self, get, target: float):
    if isinstance(get, str):
      current = getattr(self, get)
    elif hasattr(get, '__call__'):
      current = get.__call__(self)
    else:
      raise ValueError('need an attribute or function')
    return target / current

  def scaledTo(self, get, target:float):
    return self * self.scaleFor(get, target)
  
  def scaleTo(self, get, target:float):  
    self *= self.scaleFor(get, target)
    return self

  def scaledToHeight(self, height: float):
    return self.scaledTo('height', height)

  def scaledToCapHeight(self, cap_height):
    return self.scaledTo('cap_height', cap_height)

  def scaledToTextHeight(self, text_height):
    return self.scaledTo('text_height', text_height)

  def scaledToAscent(self, ascent):
    return self.scaledTo('ascent', ascent)
