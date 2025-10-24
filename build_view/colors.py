#!/usr/bin/env python3

from dataclasses import dataclass
from textwrap import wrap
from util import eprint, dprint

colors: list['Color'] = []
colors_by_name: dict[str,'Color'] = dict()
colors_by_value: dict[str,'Color'] = dict()

def rgb_components(rgb):
  return [int(c, 16) / 255.0 for c in wrap(rgb.removeprefix('#'), 2)]

@dataclass
class Color:
  name: str
  _hex: str|None = None
  _rgb: list[float]|None = None

  def __post_init__(self):
    primary = True

    if self._hex is None:
      if self._rgb is None:
        raise ValueError("Must specify either hex or (r,g,b)")
      self._hex = '#' + ''.join([f'{round(255 * v):02x}' for v in self._rgb])
    elif self._rgb is None:
      while self._hex in colors_by_name:
        self._hex = colors_by_name[self._hex].hex
        primary = False
      self._rgb = rgb_components(self._hex)

    colors.append(self)

    dprint(f"Creating color '{self.name}' with hex {self._hex}, rgb {self._rgb}")

    colors_by_name[self.name] = self
    if primary and self._hex is not None:
      colors_by_value[self._hex] = self
  
  @property
  def hex(self) -> str:
    if self._hex is None:
      raise ValueError(f"No hex value in {self}")
    return self._hex
  
  @property
  def rgb(self):
    if self._rgb is None:
      raise ValueError(f"No (r,g,b) value in {self}")
    return self._rgb

  @staticmethod
  def get(name: str):
    if name in colors_by_name:
      return colors_by_name[name]
    eprint(f"!!! Unknown color '{name}' !!!")
    raise ValueError(f"!!! Unknown color '{name}' !!!")
    return Color(name, '#ff10f0')

  @staticmethod
  def for_hex(hexrgb: str):
    if hexrgb in colors_by_value:
      return colors_by_value[hexrgb]
    eprint(f"!! Unknown color with hex '{hexrgb} !!!")
    raise ValueError(f"!! Unknown color with hex '{hexrgb} !!!")
    return Color(f"Unknown_{hexrgb.removeprefix('#')}", hexrgb)

Color('vfx', '#299ca3')
Color('sd1', '#db5f6a')
Color('transparent', '#00000000')
Color('white', '#ffffff')
Color('black', '#000000')

Color('panel', '#222222')
Color('glass', 'black')

Color('body', '#080808')
Color('body_down', '#040404')
Color('body_up', '#0c0c0c')

Color('key_white', '#f2f2e6')
Color('key_white_active', '#f2f2e6')
Color('key_black', '#141414')
Color('key_black_active', '#4c4c99')

Color('light_off', '#112211')
Color('light_on', '#22ff22')

Color('black_plastic', '#333333')
Color('black_plastic_active', '#666666')
Color('black_plastic_light', '#444444')
Color('black_plastic_shade', '#222222')

Color('button_light', '#bbbbbb')
Color('button_medium', '#777777')
Color('button_dark', '#333333')

Color('button_pressed', 'white')

Color('vfd_off', '#0f1f1a')
Color('vfd_on', '#73fff2')

Color('halo', '#666666')
Color('text', 'white')
Color('symbol', 'white')


def get_color(s):
  if s in colors_by_name:
    return colors_by_name[s]
  return s

def color_name(s):
  if s in colors_by_value:
    return colors_by_value[s]
  return s.removeprefix('#')
