#!/usr/bin/env python3

from sys import stderr
from util import dprint
from importlib import import_module
from abc import ABCMeta, abstractmethod
from util import Alignment
from dataclasses import dataclass, field
from renderutil import Metrics


@dataclass
class Font:
  family: str
  size: float
  metrics: Metrics
  bold: bool = field(kw_only=True, default=False)
  italic: bool = field(kw_only=True, default=False)

  def __post_init__(self):
    dprint(f'Created: {str(self)}')

  @property
  def scale(self) -> float:
    return self.metrics.scale

  @property
  def text_height(self) -> float:
    return self.metrics.text_height

  @property
  def text_up(self) -> float:
    return self.metrics.text_up

  @property
  def above_text(self) -> float:
    return self.metrics.above_text

  @property
  def ascent(self) -> float:
    return self.metrics.ascent

  @property
  def descent(self) -> float:
    return self.metrics.descent

  @property
  def top(self) -> float:
    return self.metrics.top

  @property
  def height(self) -> float:
    return self.metrics.height

  @property
  def baseline(self) -> float:
    return self.metrics.baseline  

  def scaleFor(self, get, target: float) -> float:
    return self.metrics.scaleFor(get, target)
  
  @abstractmethod
  def scaledTo(self, get, target: float) -> Font:
    scale = self.scaleFor(get, target)
    return Font(self.family, self.size * scale, self.metrics * scale, bold=self.bold, italic=self.italic)

  def scaleTo(self, get, target:float) -> Font:
    scale = self.scaleFor(get, target)
    self.size = self.size * scale
    self.metrics = self.metrics * scale
    return self

  def scaledToHeight(self, height: float) -> Font:
    return self.scaledTo('height', height)

  def scaledToCapHeight(self, cap_height) -> Font:
    return self.scaledTo('cap_height', cap_height)

  def scaledToTextHeight(self, text_height) -> Font:
    return self.scaledTo('text_height', text_height)

  def scaledToAscent(self, ascent) -> Font:
    return self.scaledTo('ascent', ascent)


class TextRenderer(metaclass=ABCMeta):
  @abstractmethod
  def getFamily(self, font_family: str) -> str:
    raise NotImplementedError

  @abstractmethod
  def getFont(self, family: str, bold: bool = False, italic: bool = False) -> Font:
    raise NotImplementedError

  @abstractmethod
  def textWidth(self, s: str, f: Font) -> float:
    raise NotImplementedError

  @abstractmethod
  def textPath(self, s: str,  w: float, f: Font, alignment: Alignment = Alignment.CENTERED) -> tuple[float, float, str]:
    raise NotImplementedError


choices = ['harfbuzz', 'pango']

def make_text_renderer(renderer='harfbuzz'):
  module = import_module(f'render_{renderer}')
  return module.TextRenderer()
