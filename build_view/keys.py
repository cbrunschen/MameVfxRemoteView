#!/usr/bin/env python3

from math import floor, modf, lcm
from fractions import Fraction
from itertools import accumulate
from dataclasses import dataclass, field
from rect import *
from util import *
from view import *
from sys import stdout, stderr
from textwrap import indent, dedent

def dprint(*args, **kwargs):
  return print(*args, **kwargs, file=stderr)

# measured:
# width of the 61 keys, from edge of white key to edge of white key,
# not including space outside the keys but including the 'kerf' between the keys
w_61 = 845

# the length of the black keys
l_black = 88

# the length of the white keys
l_white = 138

# the horizontal space, kerf, between two adjacent white keys
kerf_x_ww = 1

# the vertical space between the lower end of a black key and the upper end of the surrounding white keys
kerf_y = 2

# the number of octaves on the measured keyboard
octaves = 5

# calculate the width of each white key
w_white = ((w_61 + kerf_x_ww) / (7 * octaves + 1)) - kerf_x_ww

# measured
w_black = 12.0

# Measured widths of the tops of the white keys:
# 13  13  13  12  12  12  12
# Remaining space for each black key becomes:
space_black = ((w_white * 7 - (3 * 13 + 4 * 12)) / 5) - kerf_x_ww

# So the kerf between a black and a white key can now be calculated:
kerf_x_bw = ((7 * w_white + 5 * kerf_x_ww) - (3 * 13 + 4 * 12) - 5 * w_black) / 10

# dprint(f'{kerf_x_bw=}')

top_widths = [
  13, w_black, 13, w_black, 13, 
  12, w_black, 12, w_black, 12, w_black, 12
]

key_black = [ 
  False, True, False, True, False, 
  False, True, False, True, False, True, False
]

top_kerfs = [ kerf_x_bw if key_black[i] != key_black[(i+1) % 12] else kerf_x_ww for i in range(12) ]

tls = list(accumulate([w+k for w,k in zip(top_widths, top_kerfs)]))

octave_shift = 7 * (w_white + kerf_x_ww)

# dprint(f'top_widths = {top_widths}')
# dprint(f'top_kerfs = {top_kerfs}')
# dprint(f"sum of top widths and kerfs = {sum(top_kerfs) + sum(top_widths)}")
# dprint(f'tls = {tls}')

top_intervals = []
relative_intervals = []
tl = 0
for i in range(12):
   top_intervals.append((tl, tl + top_widths[i]))
   relative_intervals.append((tl / octave_shift, (tl + top_widths[i]) / octave_shift))
   tl += (top_widths[i] + top_kerfs[i])

# dprint(f"{top_intervals=}")
# dprint(f"{relative_intervals=}")


# calculate the width a number of octaves,
# _not_ including an extra 'C' above or any surrounding kerf
def w_oct(i):
  return (w_white + 2 * kerf_x_ww) * (7 * i) - kerf_x_ww

def overlap(a, b):
  return a[1] > b[0] and a[0] < b[1]

def tf(v):
  return Fraction(f'{fnum(v)}')

def pf(f:Fraction, lcm:int):
  m = lcm / f.denominator
  return int(f.numerator * m)

def print_overlaps(n, overlaps):
  m = n
  for os in overlaps:
    for o in os:
      m = lcm(m, *[f.denominator for f in o[1]])

  dprint(f"n = {n}:")
  for i, os in enumerate(overlaps):
    if len(os) == 0:
      dprint(f"{i} ({pf(Fraction(i,n), m)} .. {pf(Fraction(i+1,n), m)}) --")
    else:
      oss = ";  ".join([f"{o[0]}: {pf(o[1][0], m)} .. {pf(o[1][1], m)}" for o in os])
      dprint(f"{i} ({pf(Fraction(i,n), m)} .. {pf(Fraction(i+1,n), m)}) => {oss}")

def make_overlaps(actual_intervals, n, verbose=False):
  even_intervals = [(i, (Fraction(i, n), Fraction(i+1, n))) for i in range(n)]
  overlaps = []
  for e in even_intervals:
    these = []
    overlaps.append(these)
    for a in actual_intervals:
      if overlap(a[1], e[1]):
        if verbose:
          # dprint(f'interval {e} contains key {a}')
          pass
        these.append(a)
    if len(these) == 0 and verbose:
      # dprint(f"-- interval {e} contains no key(s)")
      pass

  return overlaps

@dataclass
class KeyShape:
  bounds: Rect
  path: str
  number: int

  @property
  def black(self): 
    return self.number in { 1, 3, 6, 8, 10 }

  @property
  def origin(self):
    return self.bounds.origin
  
  def offset(self, offset: Vector):
    return KeyShape(self.bounds + offset, self.path, self.number)

@dataclass
class KeyShaper:
  # measurements

  def __post_init__(self):

    self.top_widths = [
      13, w_black, 13, w_black, 13, 
      12, w_black, 12, w_black, 12, w_black, 12
    ]

  def octave_shift(self):
    return 7 * (w_white + kerf_x_ww)
  
  def key_shapes(self, r = 1.0) -> list[KeyShape]:
    lw = l_white
    lb = l_black
    dx = kerf_x_ww # ???
    dy = kerf_y
    yw = lb + dy
    ww = w_white
    wb = w_black
    d = 2*r

    aw = ww + dx

    def wtl(i, wi):
      if i < 2:
        return (0, self.top_widths[0])
      tl = tls[i - 1] - wi * aw
      return (tl, tl + self.top_widths[i])
    
    def btl(i):
      return tls[i - 1]

    keys = []

    llc = f"a {fnum(r)} {fnum(r)} 0 0 0 {fnum(r)} {fnum(r)}"
    lrc = f"a {fnum(r)} {fnum(r)} 0 0 0 {fnum(r)} {fnum(-r)}"

    bw = f"V {fnum(lw-r)} {llc} h {fnum(ww-d)} {lrc}"
    b = f"M 0 0 V {fnum(lb-r)} {llc} h {fnum(wb-d)} {lrc} V 0  Z"

    (tl, tr) = wtl(0, 0)
    keys.append(KeyShape(Rect(0 * aw, 0, ww, lw), f"M 0 0 {bw} V {fnum(yw)} H {fnum(tr)} V 0 Z", 0))

    keys.append(KeyShape(Rect(btl(1), 0, wb, lb), b, 1))

    (tl, tr) = wtl(2, 1)
    keys.append(KeyShape(Rect(1 * aw, 0, ww, lw), f"M {fnum(tl)} 0 V {fnum(yw)} H 0 {bw} V {fnum(yw)} H {fnum(tr)} V 0 Z", 2))

    keys.append(KeyShape(Rect(btl(3), 0, wb, lb), b, 3))

    (tl, tr) = wtl(4, 2)
    keys.append(KeyShape(Rect(2 * aw, 0, ww, lw), f"M {fnum(tl)} 0 V {fnum(yw)} H 0 {bw} V 0 Z", 4))
    
    (tl, tr) = wtl(5, 3)
    keys.append(KeyShape(Rect(3 * aw, 0, ww, lw), f"M 0 0 {bw} V {fnum(yw)} H {fnum(tr)} V 0 Z", 5))

    keys.append(KeyShape(Rect(btl(6), 0, wb, lb), b, 6))

    (tl, tr) = wtl(7, 4)
    keys.append(KeyShape(Rect(4 * aw, 0, ww, lw), f"M {fnum(tl)} 0 V {fnum(yw)} H 0 {bw} V {fnum(yw)} H {fnum(tr)} V 0 Z", 7))

    keys.append(KeyShape(Rect(btl(8), 0, wb, lb), b, 8))

    (tl, tr) = wtl(9, 5)
    keys.append(KeyShape(Rect(5 * aw, 0, ww, lw), f"M {fnum(tl)} 0 V {fnum(yw)} H 0 {bw} V {fnum(yw)} H {fnum(tr)} V 0 Z", 9))

    keys.append(KeyShape(Rect(btl(10), 0, wb, lb), b, 10))

    (tl, tr) = wtl(11, 6)
    keys.append(KeyShape(Rect(6 * aw, 0, ww, lw), f"M {fnum(tl)} 0 V {fnum(yw)} H 0 {bw} V 0 Z", 11))

    # and finally the finishing top key
    keys.append(KeyShape(Rect(0 * aw, 0, ww, lw), f"M 0 0 {bw} V 0 Z", 12))

    # dprint(f'Returning keys: {keys}')
    return keys
  
  def pk(self, r = 1.0, file=stdout):
    print('\n'.join([str(ks) for ks in self.key_shapes(r)]), file=file)

  def ps(self, r = 1.0, file=stdout):
    w = 7 * w_white + 6 * kerf_x_ww
    h = l_white
    print(f'<svg version="1.1" width="{fnum(w)} mm" height="{fnum(h)} mm" viewBox="0 0 {fnum(w)} {fnum(h)}" xmlns="http://www.w3.org/2000/svg">', file=file)
    for i, ks in enumerate(self.key_shapes(r)):
      color = 'red' if ks.black else 'green'
      print(f'<path transform="translate({fnum(ks.bounds.x)} {fnum(ks.bounds.y)})" fill="{color}" d="{ks.path}" />', file=file)
    print("</svg>", file=file)
  
  def make_intervals(self, breakpoints, total):
    left = [0] + [t + i + 1 for i, t in enumerate([tf(x) for x in accumulate(breakpoints)])]
    right = [t + i for i, t in enumerate([tf(x) for x in accumulate(breakpoints)])]
    return [
      (i, (Fraction(l, total), Fraction(r, total))) for i, (l, r) in enumerate(zip(left, right))
    ]
  
  def make_find_key_lua(self):
    # dprint(f'octave_shift={tf(self.octave_shift())}')

    actual_12_intervals = [(i, (tf(a), tf(b))) for i,(a,b) in enumerate(relative_intervals)]
    # dprint(f'{actual_12_intervals=}')

    n_intervals = self.find_n_for_unique_intervals()
    # dprint(f'{n_intervals=}')

    overlaps_12 = make_overlaps(actual_12_intervals, n_intervals)
    # dprint(f"{overlaps_12=}")

    code = []

    code.append("local k12 = {")
    for key, (start, end) in actual_12_intervals:
      code.append(f"  {{ key={key}, x0={start}, x1={end} }},")
    code.append("}")

    code.append("local x_to_k12 = {")
    prev = -1
    line = []
    for actuals in overlaps_12:
      key, (_, _) = actuals[0]
      if key != prev:
        if len(line) > 0:
          code.append("  " + " ".join(line))
        line = []
      line.append(f"k12[{key+1}],")
      prev = key
    if len(line) > 0:
      code.append("  " + " ".join(line))
    code.append("}")

    code.append('')

    code.append("function find_key(n_octaves)")
    code.append(indent(dedent(
      f'''\
      local octave_shift = {self.octave_shift()}
      local octave_width = octave_shift - {kerf_x_ww}
      local w_white = {w_white}
      local f_white = w_white / (w_white + {kerf_x_ww})
      local l_black = {l_black}
      local l_white = {l_white}
      local y_12 = (l_black + {kerf_y}) / l_white
      local full_width = n_octaves * octave_shift + w_white
      '''
    ), '  '))

    code.append(indent(dedent(
      f'''\
      local function find_12_key(x, w)
        local octave, kx = math.modf((x / w) * (full_width / octave_shift))
        local ki = math.floor({n_intervals} * kx)
        candidate = x_to_k12[ki + 1]
        if candidate.x0 <= kx and kx <= candidate.x1 then
          return 12 * octave + candidate.key
        else
          return nil
        end
      end
      '''), '  '))

    code.append(indent(dedent(
      '''\
      local function find_7_key(x, w)
        local octave, kx = math.modf((x / w) * (full_width / octave_shift))
        local ki, kkx = math.modf(7 * kx)
        if kkx <= w_white then
          if ki < 3 then
            return 12 * octave + 2 * ki
          else
            return 12 * octave + 2 * ki - 1
          end
        end
        return nil
      end
      '''), '  '))
    
    code.append(indent(dedent(
      '''\
      return function (x, y, w, h)
        rel_y = y / h
        if rel_y < y_12 then
          return find_12_key(x, w)
        else
          return find_7_key(x, w)
        end
      end
      '''
    ), '  '))

    code.append("end")

    return '\n'.join(code)

  def find_n_for_unique_intervals(self):
    actual_intervals = [(i, (tf(a), tf(b))) for i,(a,b) in enumerate(relative_intervals)]

    n = 1
    while n < 10000:
      # dprint(f"==== Checking {n}")
      overlaps = make_overlaps(actual_intervals, n, False)

      if max([len(o) for o in overlaps]) == 1:
        # dprint_overlaps(n, overlaps)
        return n
      else:
        n = n + 1

  def make_and_print_overlaps(self, n):
    octave_shift = tf(self.octave_shift())

    actual_intervals = [(i, (tf(a), tf(b))) for i,(a,b) in enumerate(relative_intervals)]

    print_overlaps(n, make_overlaps(actual_intervals, n, True))

# @dataclass
# class Keyboard(ViewItem):
#   octaves: int
#   # this will be populated
#   keys: list[Key] = field(default_factory=list)

#   def accept(self, visitor: ViewVisitor):
#     visitor.visitKeyboard(self)

#   @property
#   def bounds(self) -> Rect:
#     b = Rect(0, 0, 0, 0)
#     for k in self.keys:
#       b = b.union(k.bounds)

#     # b is now the rectangle of all the keys with internal kerf, but no external space.
#     # Add 2.5mm laterally and 5.0 mm below.
#     b = Rect(b.x - 2.5, b.y, b.w + 5.0, b.h + 5.0)
#     return b

#   def __post_init__(self):
#     pass

if __name__ == '__main__':
  ks = KeyShaper()
  # ecode.append(f"wb = {ks.w_black}, ww = {ks.w_white}")
  # ks.pk(file=stderr)
  # ks.ps(2.0)
  # explore(1, 300)
  n = ks.find_n_for_unique_intervals()
  ks.make_and_print_overlaps(n)
  print(ks.make_find_key_lua())

