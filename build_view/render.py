#!/usr/bin/env python3

from sys import stderr
from util import dprint
from importlib import import_module

TextRenderer = None
Font = None

choices = ['harfbuzz', 'pango']

def configure(choice='harfbuzz'):
  global TextRenderer, Font
  module = import_module(f'render_{choice}')
  TextRenderer = module.TextRenderer
  Font = module.Font

def make_text_renderer():
  if TextRenderer is None:
    raise ValueError("No text renderer chosen!")
  return TextRenderer()
