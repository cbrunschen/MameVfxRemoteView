#!/usr/bin/env python

from re import sub
from textwrap import wrap
from sys import stderr

DEBUG = False

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
