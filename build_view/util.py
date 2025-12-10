#!/usr/bin/env python

import re
from re import sub
from textwrap import indent, dedent, wrap
from sys import stderr
from enum import Enum

DEBUG = False

leading_spaces = re.compile(r'^(  )+', re.M)

def to_tabs(m: re.Match):
  f, t = m.span(0)
  return '\t' * int((t - f) / 2)

def redent(s, n_tabs):
  s = dedent(s)    
  return indent(leading_spaces.sub(to_tabs, dedent(s)), n_tabs * '\t')

def set_debug(debug: bool = False):
  global DEBUG
  DEBUG = debug

def to_id(s):
  """Merge multiple lines (trimming hyphenation),
     then replace sequences of non-identifier characters with '_',
     finally case-fold."""
  return sub(r'[^a-zA-Z0-9]+', '_', s.replace('-\n','')).casefold()

def clean(d: dict[str, str|None]) -> dict[str, str]:
  return { k : v for (k, v) in d.items() if v != None }

def eprint(*args, **kwargs):
  print(*args, file=stderr, **kwargs)

def dprint(*args, **kwargs):
  global DEBUG
  if DEBUG:
    print(*args, file=stderr, **kwargs)

def snake_parts(s: str):
  return s.lower().split("_")

def snake_to_upper_camel_case(s: str) -> str:
  return ''.join(i.capitalize() for i in snake_parts(s))

def snake_to_lower_camel_case(s: str) -> str:
  p = snake_parts(s)
  return ''.join([p[0]] + [i.capitalize() for i in p[1:]])

def snake_to_title_case(s: str) -> str:
  return ' '.join(i.capitalize() for i in snake_parts(s))

def snake_to_upper_snake_case(s: str) -> str:
  return '_'.join(i.upper() for i in snake_parts(s))

def fnum(v, decimals=5):
  s = f'{v:.{decimals}f}'
  return sub(r'\.?0+$', '', s)

class LabelPosition(int, Enum):
  __str__ = Enum.__str__
  ABOVE = 1
  CENTERED = 2
  ABOVE_CENTERED = ABOVE | CENTERED

class Alignment(int, Enum):
  __str__ = Enum.__str__
  CENTERED = 0
  LEFT = 1
  RIGHT = 2
  STRETCH = 3
