#!/usr/bin/env python3

from sys import argv, stderr, exit
from argparse import ArgumentParser, BooleanOptionalAction

from view import *
from view_builders import *
from mame_layout import *
from util import set_debug, fnum
import render
from myxml import *
from textwrap import indent

color_bg = Element('color', attrs={
  'red': '0',
  'green': '0',
  'blue': '0'
})

color_off = Element('color', attrs={
  'red': '0.06',
  'green': '0.12',
  'blue': '0.10'
})

color_off = Element('color', attrs={
  'red': '0.12',
  'green': '0.24',
  'blue': '0.20'
})

color_on = Element('color', attrs={
  'red': '0.45',
  'green': '1.00',
  'blue': '0.95'
})


def bounds(x, y, w, h):
  return Element('bounds', attrs={
    'x':fnum(x),
    'y':fnum(y),
    'width':fnum(w),
    'height':fnum(h)
  })


class Word:
  def __init__(self, s:str, inverse:bool=False):
    self.s = s
    self.inverse = inverse
  
  def name(self):
    if self.inverse:
      return f'text_{self.s}_i'
    else:
      return f'text_{self.s}'
  
  def definition_bits(self) -> list['Element|CDATA|Space|Comment']:
    if self.inverse:
      return [
        Element('rect', attrs={'state':'0'}, children=[color_off]),
        Element('rect', attrs={'state':'1'}, children=[color_on]),
        Element('text', attrs={'string':self.s}, children=[color_bg])
      ]
    else:
      return [
        Element('text', attrs={'string':self.s, 'state':'0'}, children=[color_off]),
        Element('text', attrs={'string':self.s, 'state':'1'}, children=[color_on])
      ]
  
  def definition(self):
    return Element('element', attrs={'name': self.name()}, children=self.definition_bits())
  
  def use(self, x, y, w, h):
    return Element('element', attrs={'ref': self.name()}, children=[bounds(x, y, w, h)])


class Line:
  def __init__(self, left:list[Word], right:list[Word]):
    self.left = left
    self.right = right

words = [
  Line(
    [Word('LOAD',True), Word('INST'), Word('MIDI'), Word('SYSTEM'), Word('LAYER')],
    [Word('ENV'), Word('ODUB',True), Word('REC',True), Word('PLAY'), Word('STOP')],
  ),
  Line(
    [Word('CMD',True), Word('SEQ'), Word('SONG'), Word('PITCH'), Word('FILTER')],
    [Word('AMP'), Word('SONG'), Word('SEQ'), Word('STEP'), Word('REP')],
  ),
  Line(
    [Word('EDIT',True), Word('MACRO'), Word('BANK'), Word('LFO'), Word('WAVE')],
    [Word('TRACK'), Word('BAR'), Word('BEAT'), Word('CLOCK')],
  ),
]


def main():
  parser = ArgumentParser()
  parser.add_argument('-D', '--debug', action='store_true', default=False)
  parser.add_argument('-tr', '--text-renderer', choices=render.choices, default=render.choices[0])
  # parser.add_argument('-fs', '--fontsize', default=1.4)

  args = parser.parse_args()
  set_debug(args.debug)

  renderer = render.make_text_renderer(args.text_renderer);

  text_height = 3.5
  spacing_y = 0.2
  advance_y = text_height + spacing_y

  extra_width = 0
  spacing_x = 1

  font = renderer.getFont('Arimo', italic=True).scaledToAscent(text_height)

  definitions = {}
  uses = []

  y = 1
  for line in words:
    x = 1
    for word in line.left:
      name = word.name()
      if name not in definitions:
        definitions[name] = word.definition()
      width = renderer.textWidth(word.s, font) + extra_width
      uses.append(word.use(x, y, width, text_height))
      x += width + spacing_x

    x = 121

    for word in reversed(line.right):
      name = word.name()
      if name not in definitions:
        definitions[name] = word.definition()
      width = renderer.textWidth(word.s, font) + extra_width
      uses.append(word.use(x-width, y, width, text_height))
      x -= width + spacing_x
    
    y += advance_y

  print("<!-- Definitions -->")
  for name, definition in definitions.items():
    print(indent(format(definition, 's'), '\t'), end='')
  
  print()
  print("<!-- Uses -->")
  for use in uses:
    print(indent(format(use, 's'), '\t\t'), end='')
  print()


if __name__ == '__main__':
  exit(main())
