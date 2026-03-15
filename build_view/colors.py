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

    # dprint(f"Creating color '{self.name}' with hex {self._hex}, rgb {self._rgb}")

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

  @staticmethod
  def for_hex(hexrgb: str):
    if hexrgb in colors_by_value:
      return colors_by_value[hexrgb]
    hexrgb = hexrgb.lower()
    eprint(f"!! Unknown color with hex '{hexrgb} !!!")
    return Color(hexrgb, hexrgb)

Color('vfx', '#299ca3')
Color('sd1', '#db5f6a')
Color('transparent', '#00000000')
Color('white', '#ffffff')
Color('black', '#000000')

Color('panel', '#333333')
Color('glass', 'black')
Color('screwhead', '#383838')

Color('body', '#202020')
Color('body_down', '#101010')
Color('body_down_shallow', '#181818')
Color('body_up', '#303030')
Color('body_up_shallow', '#282828')

Color('key_white', '#f2f2e6')
Color('key_white_velocity_min', "#2c44ad")
Color('key_white_velocity_max', "#19a14d")
Color('key_white_pressure_min', "#e6ce48")
Color('key_white_pressure_max', "#ce3f06")
Color('key_black', '#141414')
Color('key_black_velocity_min', "#2c44ad")
Color('key_black_velocity_max', "#19a14d")
Color('key_black_pressure_min', "#e6ce48")
Color('key_black_pressure_max', "#ce3f06")
Color('keyboard_background', '#555555')

Color('light_off', '#112211')
Color('light_on', '#22ff22')

Color('black_plastic', '#444444')
Color('black_plastic_active', '#777777')
Color('black_plastic_light', '#555555')
Color('black_plastic_shade', '#333333')
Color('black_plastic_dark', '#2a2a2a')
Color('black_plastic_darker', '#222222')

Color('button_light', '#bbbbbb')
Color('button_medium', '#777777')
Color('button_dark', '#111111')
Color('button_screen', '#2a2a2a') # a bit lighter for contrast against the glass

Color('button_pressed', 'white')

Color('vfd_off', '#0f1f1a')
Color('vfd_on', '#73fff2')

Color('halo', '#666666')
Color('text', 'white')
Color('symbol', 'white')

Color('plugin_warning', '#bb2c2c')
Color('plugin_warning_background', '#b2b2b2')

Color('floppy_body', '#024d96')
Color('floppy_label', '#bbbbbb')

Color('cartridge_body', 'black_plastic')
Color('cartridge_cavity', '#020202')
Color('cartridge_label', '#bbbbbb')


def get_color(s):
  if s in colors_by_name:
    return colors_by_name[s]
  return s

def color_name(s):
  if s in colors_by_value:
    return colors_by_value[s]
  return s.removeprefix('#')

def hex_for_color(color: str|Color) -> str:
  if isinstance(color, str):
    if color.startswith("#"):
      return color
    else:
      return Color.get(color).hex
  elif isinstance(color, Color):
    return color.hex
  else:
    return color
