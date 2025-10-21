#!/usr/bin/env python

from dataclasses import dataclass, field
from rect import *
from util import *
from os import path
from view import *

@dataclass
class ViewBuilder:
  fontSize: float
  # these are all internal variables really
  background: Rectangle|None = None
  contexts: list[Context] = field(default_factory=list)

  color_vfx = "#299ca3"
  color_sd1 = "#db5f6a"

  def __post_init__(self):
    self.view = View("")
    self.contexts.append(self.view)

  def build(self):
    return self.view

  @property
  def context(self):
    return self.contexts[-1]

  def add(self, e: ViewItem):
    self.context.add_item(e)
  
  def setAccentColor(self, rgb):
    self.add(AccentColor(rgb))
  
  def addLabel(self, x, y, w, fontSize, label, bold = False, italic = False, centered = False):      
    self.add(Label(Rect(x, y, w, fontSize), label, fontSize, bold, italic, centered))
  
  def addPatchSelectButton(self, x, y, w, h, number):
    self.add(PatchSelectButton(Rect(x, y, w, h), number))
  
  def addButton(self, x, y, w, h, label, labelPosition, value, shade, multiPage = False, lightId = -1):
    button = Button(Rect(x, y, w, h), label, value, shade)
    self.add(button)

    if not label.startswith("#"):
      labelLines = label.split("\n")
      nLines = len(labelLines)
      y0 = h if labelPosition == BELOW else -nLines * self.fontSize
      centered = ((labelPosition & CENTERED) != 0)
      
      for i in range(nLines):
        line = labelLines[i]
        self.addLabel(x, y + y0 + i * self.fontSize, w, self.fontSize, line, bold=False, italic=True, centered=centered)
    
    if lightId >= 0:
      # Light bounds are relative to button bounds
      button.light = Light(Rect(w/3, h/25, w/3, h/3), lightId)

  def addButtonBelowDisplay(self, x, y, label, value, shade):
    self.addButton(x, y, 15, 10, label, BELOW, value, shade, False, -1)
  
  def addButtonWithLightBelowDisplay(self, x, y, label, value, shade, lightId):
    self.addButton(x, y, 15, 10, label, BELOW, value, shade, False, lightId)
  
  def addLargeButton(self, x, y, label, value, shade, multiPage=False):
    self.addButton(x, y, 15, 10, label, ABOVE, value, shade, False, -1)
  
  def addLargeButtonWithLight(self, x, y, label, value, shade, lightId, centered=False):
    self.addButton(x, y, 15, 10, label, ABOVE_CENTERED if centered else ABOVE, value, shade, False, lightId)

  def addSmallButton(self, x, y, label, value, shade, multiPage):
    self.addButton(x, y, 15, 5, label, ABOVE, value, shade, multiPage, -1)
  
  def addIncDecButton(self, x, y, label, value, shade, multiPage):
    self.addButton(x, y, 15, 5, label, ABOVE_CENTERED, value, shade, multiPage, -1)
  
  def addSlider(self, x, y, channel, name):
    self.add(Slider(Rect(x, y, 20, 60), channel, name)) # always 20 wide, 60 tall

  def addAccentColoredLine(self, x, y, w, h):
    self.add(Rectangle(Rect(x, y, w, h), "accent"))

  def addWhiteLine(self, x, y, w, h):
    self.add(Rectangle(Rect(x, y, w, h), "#ffffff"))

  def addUpTriangle(self, x, y, w, h):
    self.add(Symbol(Rect(x, y, w, h), 'triangle_up', "#ffffff"))

  def addDownTriangle(self, x, y, w, h):
    self.add(Symbol(Rect(x, y, w, h), 'triangle_down', "#ffffff"))

  def onCondition(self, condition):
    conditional = Conditional(condition)
    self.add(conditional)
    self.contexts.append(conditional)
  
  def isTrue(self):
    if isinstance(self.context, Conditional):
      return self.context.isTrue()
    else:
      raise ValueError(f"isTrue() but context is {type(self.context)}")

  def isFalse(self):
    if isinstance(self.context, Conditional):
      return self.context.isFalse()
    else:
      raise ValueError(f"isFalse() but context is {type(self.context)}")

  def endCondition(self):
    if isinstance(self.context, Conditional):
      self.context.end()
      self.contexts.pop()
    else:
      raise ValueError(f"endCondition() but context is {type(self.context)}")
  
  def beginGroup(self, name: str, offset: Offset|None):
    group = Group(name, Offset(0,0) if offset is None else offset)
    self.context.items.append(group)
    self.contexts.append(group)
    return group
  
  def placeGroup(self, offset: Offset):
    if isinstance(self.context, Group):
      self.context.offset = offset
      return self.context
    else:
      raise ValueError(f"placeGroup() but context is {type(self.context)}")
  
  def endGroup(self):
    if isinstance(self.context, Group):
      group = self.context
      self.context.end()
      self.contexts.pop()
      return group
    else:
      raise ValueError(f"endGroup() but context is {type(self.context)}")
  
  def end(self):
    if self.context == self:
      raise ValueError(f"end() but context is {type(self.context)}")
    self.context.end()
    self.contexts.pop()

  def addSliders(self, offset: Offset|None = None):
    self.beginGroup("Sliders", offset)

    # Volume slider
    self.addSlider(0, 0, 5, "volume")

    # Increment and Decrement
    self.addIncDecButton(47.5, 45, "#decrement", 63, SHADE_DARK, False)
    self.addIncDecButton(47.5, 20, "#increment", 62, SHADE_DARK, False)

    self.addDownTriangle(52.5, 40, 5, 2.5)
    self.addUpTriangle(52.5, 15, 5, 2.5)

    # Value slider
    self.addSlider(70, 0, 3, "data_entry")

    # The colored line along the base:
    self.addAccentColoredLine(0, 82.5, 90, 0.5)
    # And the labels above it:
    self.addLabel(0, 77.5, 35, self.fontSize, "Volume", bold=True)
    self.addLabel(47.5, 77.5, 35, self.fontSize, "Data Entry", bold=True)

    return self.endGroup()

  def addDisplayArea(self, offset: Offset|None = None):
    self.beginGroup("DisplayAndButtons", offset)

    self.add(Rectangle(Rect(0, 0, 230, 67.5), '#000000'))
    self.add(Display(Rect(12.5, 27.7, 205, 17.1)))

    # Display buttons - approximate:
    self.addSmallButton(55, 57.5, "#display_below_left", 50, SHADE_DARK, False)
    self.addSmallButton(112.5, 57.5, "#display_below_middle", 44, SHADE_DARK, False)
    self.addSmallButton(175, 57.5, "#display_below_right", 45, SHADE_DARK, False)

    self.addSmallButton(55,  5, "#display_above_left", 58, SHADE_DARK, False)
    self.addSmallButton(112.5,  5, "#diplay_above_center", 42, SHADE_DARK, False)
    self.addSmallButton(175,  5, "#display_above_right", 43, SHADE_DARK, False)

    self.addButtonWithLightBelowDisplay(0, 77.5, "#CartBankSet", 52, SHADE_LIGHT, 0xf)
    
    self.onCondition('isSd1')
    if self.isTrue():
      self.addLabel(0, 92.5, 15, self.fontSize, "BankSet", bold=True, centered=True)
    if self.isFalse():
      self.addLabel(0, 92.5, 15, self.fontSize, "Cart", bold=True, centered=True)
    self.endCondition()

    self.addButtonWithLightBelowDisplay(15, 77.5, "#Sounds",   53, SHADE_LIGHT, 0xd)
    self.addLabel(15, 92.5, 15, self.fontSize, "Sounds", bold=True, centered=True)

    self.addButtonWithLightBelowDisplay(30, 77.5, "#Presets",  54, SHADE_LIGHT, 0x7)
    self.addLabel(30, 92.5, 15, self.fontSize, "Presets", bold=True, centered=True)

    # When the keyboard has a sequencer:
    self.onCondition("hasSeq")
    if self.isTrue():
      self.addButtonBelowDisplay     (45, 77.5, "#Seq",      51, SHADE_LIGHT)
      self.addLabel(45, 92.5, 15, self.fontSize, "Seq", centered=True, bold=True)
    self.endCondition()

    self.addButtonWithLightBelowDisplay(80, 77.5, "#0", 55, SHADE_MEDIUM, 0xe)
    self.addButtonWithLightBelowDisplay(95, 77.5, "#1", 56, SHADE_MEDIUM, 0x6)
    self.addButtonWithLightBelowDisplay(110, 77.5, "#2", 57, SHADE_MEDIUM, 0x4)
    self.addButtonWithLightBelowDisplay(125, 77.5, "#3", 46, SHADE_MEDIUM, 0xc)
    self.addButtonWithLightBelowDisplay(140, 77.5, "#4", 47, SHADE_MEDIUM, 0x3)
    self.addButtonWithLightBelowDisplay(155, 77.5, "#5", 48, SHADE_MEDIUM, 0xb)
    self.addButtonWithLightBelowDisplay(170, 77.5, "#6", 49, SHADE_MEDIUM, 0x2)
    self.addButtonWithLightBelowDisplay(185, 77.5, "#7", 35, SHADE_MEDIUM, 0xa)
    self.addButtonWithLightBelowDisplay(200, 77.5, "#8", 34, SHADE_MEDIUM, 0x1)
    self.addButtonWithLightBelowDisplay(215, 77.5, "#9", 25, SHADE_MEDIUM, 0x9)

    self.addLabel(80, 92.5, 15, self.fontSize, "0", bold=True, centered=True)
    self.addLabel(95, 92.5, 15, self.fontSize, "1", bold=True, centered=True)
    self.addLabel(110, 92.5, 15, self.fontSize, "2", bold=True, centered=True)
    self.addLabel(125, 92.5, 15, self.fontSize, "3", bold=True, centered=True)
    self.addLabel(140, 92.5, 15, self.fontSize, "4", bold=True, centered=True)
    self.addLabel(155, 92.5, 15, self.fontSize, "5", bold=True, centered=True)
    self.addLabel(170, 92.5, 15, self.fontSize, "6", bold=True, centered=True)
    self.addLabel(185, 92.5, 15, self.fontSize, "7", bold=True, centered=True)
    self.addLabel(200, 92.5, 15, self.fontSize, "8", bold=True, centered=True)
    self.addLabel(215, 92.5, 15, self.fontSize, "9", bold=True, centered=True)

    # The colored line along the base:
    self.addAccentColoredLine(0, 97.5, 230, 0.5)

    return self.endGroup()

  def addButtonArea(self, offset: Offset|None = None):
    self.beginGroup("Buttons", offset)

    # Large buttons on the main panel part
    self.addLargeButton         (0, 72.5, "Replace\nProgram", 29, SHADE_MEDIUM)

    self.addLargeButton         (115, 72.5, "Select\nVoice", 5, SHADE_MEDIUM)
    self.addLargeButton         (130, 72.5, "Copy",          9, SHADE_MEDIUM)
    self.addLargeButton         (145, 72.5, "Write",         3, SHADE_MEDIUM)
    self.addLargeButtonWithLight(160, 72.5, "Compare",       8, SHADE_MEDIUM, 0x5)

    # Small buttons, main panel
    # -- Performance:
    self.addSmallButton(0, 50, "Patch\nSelect",   26, SHADE_DARK, True)
    self.addSmallButton(15, 50, "MIDI",            27, SHADE_DARK, True)
    self.addSmallButton(30, 50, "Effects",         28, SHADE_DARK, True)

    self.addSmallButton(0, 32.5, "Key\nZone",       39, SHADE_DARK, False)
    self.addSmallButton(15, 32.5, "Trans-\npose",    40, SHADE_DARK, False)
    self.addSmallButton(30, 32.5, "Release",         41, SHADE_DARK, False)

    self.addSmallButton(0,  15, "Volume",          36, SHADE_DARK, False)
    self.addSmallButton(15,  15, "Pan",             37, SHADE_DARK, False)
    self.addSmallButton(30,  15, "Timbre",          38, SHADE_DARK, False)
    
    # -- Programming:
    self.addSmallButton(115, 50, "Wave",             4, SHADE_DARK, False)
    self.addSmallButton(130, 50, "Mod\nMixer",       6, SHADE_DARK, False)
    self.addSmallButton(145, 50, "Program\nControl", 2, SHADE_DARK, False)
    self.addSmallButton(160, 50, "Effects",          7, SHADE_DARK, True)

    self.addSmallButton(115, 32.5, "Pitch",           11, SHADE_DARK, False)
    self.addSmallButton(130, 32.5, "Pitch\nMod",      13, SHADE_DARK, False)
    self.addSmallButton(145, 32.5, "Filters",         15, SHADE_DARK, True)
    self.addSmallButton(160, 32.5, "Output",          17, SHADE_DARK, True)

    self.addSmallButton(115,  15, "LFO",             10, SHADE_DARK, True)
    self.addSmallButton(130,  15, "Env1",            12, SHADE_DARK, True)
    self.addSmallButton(145,  15, "Env2",            14, SHADE_DARK, True)
    self.addSmallButton(160,  15, "Env3",            16, SHADE_DARK, True)

    # When the keyboard has a sequencer:
    self.onCondition("hasSeq")
    if self.isTrue():
      self.addWhiteLine(15, 72.5 - 1.5 * self.fontSize - 0.05, 7.5, 0.25)
      self.addLabel(22.5, 72.5 - 2 * self.fontSize, 15, self.fontSize, "Tracks", centered=True)
      self.addWhiteLine(37.5, 72.5 - 1.5 * self.fontSize - 0.05, 7.5, 0.25)
      self.addLargeButtonWithLight(15, 72.5, "1-6",              30, SHADE_MEDIUM, 0x0, centered=True)
      self.addLargeButtonWithLight(30, 72.5, "7-12",             31, SHADE_MEDIUM, 0x8, centered=True)
      
      # The 'Master', 'Storage' and 'MIDI Control' buttons are small & at the top,
      # the sequencer buttons are big and at the bottom.
      self.addLargeButton(57.5, 72.5, "Rec",           19, SHADE_MEDIUM)
      self.addLargeButton(72.5, 72.5, "Stop\n/Cont",   22, SHADE_MEDIUM)
      self.addLargeButton(87.5, 72.5, "Play",          23, SHADE_MEDIUM)

      self.addSmallButton(57.5, 50, "Click",         32, SHADE_DARK, False)
      self.addSmallButton(72.5, 50, "Seq\nControl",  18, SHADE_DARK, True)
      self.addSmallButton(87.5, 50, "Locate",        33, SHADE_DARK, True)

      self.addSmallButton(57.5, 32.5, "Song",          60, SHADE_DARK, False)
      self.addSmallButton(72.5, 32.5, "Seq",           59, SHADE_DARK, False)
      self.addSmallButton(87.5, 32.5, "Track",         61, SHADE_DARK, False)

      self.addSmallButton(57.5,  15, "Master",        20, SHADE_LIGHT, True)
      self.addSmallButton(72.5,  15, "Storage",       21, SHADE_LIGHT, False)
      self.addSmallButton(87.5,  15, "MIDI\nControl", 24, SHADE_LIGHT, True)

      self.addWhiteLine(57.5, 32.5 - 1.5 * self.fontSize - 0.05, 17.5, 0.25)
      self.addLabel(75, 32.5 - 2 * self.fontSize, 10, self.fontSize, "Edit", centered=True)
      self.addWhiteLine(85, 32.5 - 1.5 * self.fontSize - 0.05, 17.5, 0.25)

      self.addLabel(57.5, 5-(0.5 + self.fontSize), 35, self.fontSize, "System", bold=True)
      self.addAccentColoredLine(57.5, 5-0.5, 55, 0.5)
      self.addLabel(57.5, 87.5, 25, self.fontSize, "Sequencer", bold=True)

    # When there is no sequencer:
    if self.isFalse():
      self.addWhiteLine(15, 72.5 - 1.5 * self.fontSize - 0.05, 10, 0.1)
      self.addLabel(25, 72.5 - 2 * self.fontSize, 10, self.fontSize, "Multi", centered=True)
      self.addWhiteLine(35, 72.5 - 1.5 * self.fontSize - 0.05, 10, 0.1)
      self.addLargeButtonWithLight(15, 72.5, "A",              30, SHADE_MEDIUM, 0x0, centered=True)
      self.addLargeButtonWithLight(30, 72.5, "B",              31, SHADE_MEDIUM, 0x8, centered=True)

      # The 'Master', 'Storage' and 'MIDI Control' buttons are large & at the bottom,
      # and there are no sequencer buttons
      self.addLargeButton(57.5, 72.5, "Master",        20, SHADE_LIGHT, True)
      self.addLargeButton(72.5, 72.5, "Storage",       21, SHADE_LIGHT, False)
      self.addLargeButton(87.5, 72.5, "MIDI\nControl", 24, SHADE_LIGHT, True)

      self.addLabel(57.5, 87.5, 35, self.fontSize, "System", bold=True)
    self.endCondition()

    # The colored lines along the base:
    self.addAccentColoredLine(0, 92.5, 55, 0.5)
    self.addAccentColoredLine(57.5, 92.5, 55, 0.5)
    self.addAccentColoredLine(115, 92.5, 60, 0.5)

    # And the labels just above it:
    self.addLabel(0, 87.5, 35, self.fontSize, "Performance", bold=True)
    self.addLabel(115, 87.5, 35, self.fontSize, "Programming", bold=True)

    return self.endGroup()


@dataclass
class PanelBuilder(ViewBuilder):
  def build(self):
    self.view.name = "panel"
    self.onCondition('isSd1')
    if self.isTrue():
      self.setAccentColor(self.color_sd1)
    if self.isFalse():
      self.setAccentColor(self.color_vfx)
    self.endCondition()

    self.background = Rectangle(Rect(0,0,0,0), '#222222')
    self.add(self.background)

    self.addSliders(Offset(-90, 10))

    # The colored line along the base between sliders area and display area:
    self.addAccentColoredLine(0, 92.5, 25, 0.5)

    self.addDisplayArea(Offset(25, -5))

    # The colored line along the base between display area and buttons area:
    self.addAccentColoredLine(255, 92.5, 15, 0.5)

    self.addButtonArea(Offset(270, 0))

    # Give us a bit of a margin
    self.view.bounds = self.view.bounds.outset(5, 5)
    # Update the background bounds to match ours.
    self.background.bounds = self.view.bounds

    return self.view


class SquarePanelBuilder(ViewBuilder):
  def build(self):
    self.view.name = "square_panel"
    self.onCondition('isSd1')
    if self.isTrue():
      self.setAccentColor(self.color_sd1)
    if self.isFalse():
      self.setAccentColor(self.color_vfx)
    self.endCondition()

    self.background = Rectangle(Rect(0,0,0,0), '#222222')
    self.add(self.background)

    # Volume slider
    self.beginGroup("CompactVolumeSlider", Offset(0, 10))

    self.addSlider(0, 0, 5, "volume")
    # The colored line along the base:
    self.addAccentColoredLine(0, 82.5, 30, 0.5)
    # And the label above it:
    self.addLabel(0, 77.5, 35, self.fontSize, "Volume", bold=True)

    self.endGroup()

    displayArea = self.addDisplayArea(Offset(30, -5))

    y0 = displayArea.bounds.getY(1.0) + 10

    buttonArea = self.addButtonArea()
    buttonArea.offset = Offset(displayArea.bounds.getX(1.0) - buttonArea.intrinsic_bounds.w, y0)

    x1 = buttonArea.bounds.x

    self.beginGroup("PatchSelects", Offset(0, y0))
    self.addPatchSelectButton(0, 0, 9, 12, 1)
    self.addPatchSelectButton(15, 0, 9, 12, 0)

    # The colored line along the base:
    self.addAccentColoredLine(0, 92.5, 40, 0.5)
    # And the labels above it:
    self.addLabel(0, 87.5, 35, self.fontSize, "Patch Select", bold=True)
    self.endGroup()

    self.beginGroup("CompactValueSlider", Offset(32, y0 + 10))

    # Value slider
    self.addSlider(20, 0, 3, "data_entry")

    # Increment and Decrement
    self.addIncDecButton(0, 45, "#decrement", 63, SHADE_DARK, False)
    self.addIncDecButton(0, 20, "#increment", 62, SHADE_DARK, False)

    self.addDownTriangle(5, 40, 5, 2.5)
    self.addUpTriangle(5, 15, 5, 2.5)

    # The colored line along the base:
    self.addAccentColoredLine(0, 82.5, x1 - 32, 0.5)
    # And the labels above it:
    self.addLabel(0, 77.5, 35, self.fontSize, "Data Entry", bold=True)

    self.endGroup()

    # Give us a bit of a margin
    self.view.bounds = self.view.bounds.outset(5, 5)
    # Update the background bounds to match ours.
    self.background.bounds = self.view.bounds

    return self.view
