#!/usr/bin/env python

from dataclasses import dataclass, field
from rect import *
from util import *
from view import *

# The pitch-bend and modulation wheels are approximately:
# r = 40mm
# centered 26mm below the surface,
# giving an above-surface arc of approximately 99 degrees,
# with 500 ridges around the perimeter,,
# and a divot, 2mm deep and 10mm along, approximately a cutout from
# a circle with r=7.25mm, with its center 5.25mm outside the wheel,
# corresponding to approximately 14 degrees of the wheel's arc,
# giving a range of motion (wanting to keeo the divot always above the surface)
# of (99 - 14) = 85 degrees.
# width 7mm, within an aperture:
#   10 mm wide on the inside and 13 on the outside so with a border 1.5 mm thick, 
#   and an outside height of 66 mm.
# The figure is a line drawing with a white line 0.5 mm wide, 4 mm wide, 
# 4 mm to the right of the border.
# The pitch-bend wheel has a 1.5mm dot in the centre.
# The entire space is 108mm wide;
# the spacing is: 29.5mm <pitchbend=13mm> 23mm <modwheel=13mm> 29.5mm.
# Vertically the length is 122mm, from top to bottom 26mm <wheel=66mm> 30mm
# Patch selects are horizontally from the left, 6mm <psel=9mm> 6mm <psel=9mm>,
# vertically from the top 2mm <psel=12mm>
# with text 'Patch\nSelect' to the right near the bottom of the right psel button.
#
# Decorative line is 7mm below the lower edge of the wheel borders, 1.5mm thick,
# broken just before the left edge of each wheel border/
# Text is 'Pitch' and 'Mod' respectively.
#
# Full panel vertical:
# From the back of the keyboard to the panel is 32mm.
# Space above the display glass is 8mm, above the sliders is 15mm,
# button tops are at 22 42 62 82mm, decorative line at 102 1.5mm thick,
# space below is 18mm for a total of 121.5mm tall.
# below that, 27mm flat black, 5mm steep angled, black, then the keys 138mm,
# then 11mm black belot the keys.
# Cart slot is aligned with top buttons, 27mm outside, 24 inside.
# Text 'Cartridge' just above its top left.
# 
# Horizontal: Sliders start at 121mm.
# Then as already measured for the panel. 
# // TODO: re-measure!
# Right buttons to cartridge is 35mm, width outside 56 inside 53.
#
# Bottom of wheel area is aligned with bottom of keys.
# Above the wheel area is 26mm angled flat, then 11mm steep floppy front.
# Then 24mm black flat, 98mm angled floppy storage, 54mm to the very back of the keyboard.
#
# Back of keyboard markings:
# Lightning warning triangle at top left, 1mm in from edges, 10mm wide.
# Top of text if 10mm (except 'Aux. Out' and 'Main Out' which is 6mm)
# Labels laterally:
# 97-107: Power
# 131-139: Line
# 167-175: Fuse
# Line below text from 477-564
# Above the line, centered: MIDI
# Below the line: 480-488: Thru
#                 518-526: Out
#                 558-562: In
# 640-652: 'Ft.Sw'
# 663-680: 'Pedal•CV'
# 
# Line below text from 690-728
# above the line: 692-700: 'Left'
#                 717-727: 'Right
# Below the line, centered: "Mono"
# Above 'Left'&'Right', centered: "Aux. Out"
# Repeat this, offset by 51mm, and with the text 'Main Out' above instead
# 790-805: 'Phones'
#
# Horizontally from edge of keyboard via wheel area:
# 20 flat black
# 5 flat black, 7 steep black
# wheel area
# 7 steep black, 5 flat black
# keys/panel
# 20 flat black

@dataclass
class ViewBuilder:
  fontSize: float
  # these are all internal variables really
  background: Rectangle|None = None
  contexts: list[Context] = field(default_factory=list)

  def __post_init__(self):
    self.view = View("")
    self.contexts.append(self.view)
    self.accent_line_y = 102
    self.label_y = self.accent_line_y - self.fontSize
    self.accent_line_thickness = 1.2
    self.real_logos = False
  
  def withRealLogos(self, real_logos):
    self.real_logos = real_logos
    return self

  def build(self):
    return self.view

  @property
  def context(self):
    return self.contexts[-1]

  def add(self, e: ViewItem):
    return self.context.add_item(e)
  
  def setAccentColor(self, rgb):
    return self.add(AccentColor(rgb))
  
  def addLabel(self, x, y, w, fontSize, label, bold = False, italic = False, centered = False):      
    return self.add(Label(Rect(x, y, w, fontSize), label, fontSize, bold, italic, centered))
  
  def addLabelAbove(self, x, item, w, fontSize, label, bold = False, italic = False, centered = False): 
    return self.add(Label(Rect(x, item.bounds.y - fontSize, w, fontSize), label, fontSize, bold, italic, centered))

  def addLabelBelow(self, x, item, w, fontSize, label, bold = False, italic = False, centered = False): 
    return self.add(Label(Rect(x, item.bounds.y + item.bounds.h, w, fontSize), label, fontSize, bold, italic, centered))

  def addPatchSelectButton(self, x, y, w, h, number):
    return self.add(PatchSelectButton(Rect(x, y, w, h), number))
  
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
    
    return button

  def addButtonBelowDisplay(self, x, y, label, value, shade):
    return self.addButton(x, y, 15, 10, label, BELOW, value, shade, False, -1)
  
  def addButtonWithLightBelowDisplay(self, x, y, label, value, shade, lightId):
    return self.addButton(x, y, 15, 10, label, BELOW, value, shade, False, lightId)
  
  def addLargeButton(self, x, y, label, value, shade, multiPage=False):
    return self.addButton(x, y, 15, 10, label, ABOVE, value, shade, False, -1)
  
  def addLargeButtonWithLight(self, x, y, label, value, shade, lightId, centered=False):
    return self.addButton(x, y, 15, 10, label, ABOVE_CENTERED if centered else ABOVE, value, shade, False, lightId)

  def addSmallButton(self, x, y, label, value, shade, multiPage):
    return self.addButton(x, y, 15, 5, label, ABOVE, value, shade, multiPage, -1)
  
  def addIncDecButton(self, x, y, label, value, shade, multiPage):
    return self.addButton(x, y, 15, 5, label, ABOVE_CENTERED, value, shade, multiPage, -1)
  
  def addSlider(self, x, y, channel, name):
    return self.add(Slider(Rect(x, y, 20, 60), channel, name)) # always 20 wide, 60 tall

  def addWheel(self, x, y, channel, name, autocenter=False):
    return self.add(Wheel(Rect(x, y, 13, 66), channel, name, autocenter)) # always 13 wide, 66 tall

  def addAccentColoredLine(self, x, y, w, h):
    return self.addRectangle(x, y, w, h, "accent")

  def addWhiteLine(self, x, y, w, h):
    return self.addRectangle(x, y, w, h, 'white')

  def addUpTriangle(self, x, y, w, h):
    return self.add(Symbol(Rect(x, y, w, h), 'triangle_up', 'white'))

  def addDownTriangle(self, x, y, w, h):
    return self.add(Symbol(Rect(x, y, w, h), 'triangle_down', 'white'))

  def addRectangle(self, x, y, w, h, color):
    return self.add(Rectangle(Rect(x, y, w, h), color))

  def onCondition(self, condition):
    conditional = Conditional(condition)
    self.add(conditional)
    self.contexts.append(conditional)
    return conditional
  
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
    self.addSlider(0, 15, 5, "volume")

    # Increment and Decrement
    self.addIncDecButton(47.5, 60, "#decrement", 63, SHADE_DARK, False)
    self.addIncDecButton(47.5, 35, "#increment", 62, SHADE_DARK, False)

    self.addDownTriangle(52.5, 55, 5, 2.5)
    self.addUpTriangle(52.5, 30, 5, 2.5)

    # Value slider
    self.addSlider(70, 15, 3, "data_entry")

    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 90, 1.2)
    # And the labels above it:
    self.addLabel(0, self.label_y, 35, self.fontSize, "Volume", bold=True)
    self.addLabel(47.5, self.label_y, 35, self.fontSize, "Data Entry", bold=True)

    return self.endGroup()

  def addDisplayArea(self, offset: Offset|None = None):
    self.beginGroup("DisplayAndButtons", offset)

    glassRect = Rect(0, 8, 245, 67.5)
    roughDisplayRect = glassRect.inset(12, 18)
    charRect = Rect(0, 0, 342, 572)
    charsRect = Rect(0, 0, 40 * charRect.w, 2 * charRect.h)
    displayRect = charsRect.fitWithin(roughDisplayRect)
    self.add(Rectangle(glassRect, 'glass'))
    self.add(Display(displayRect))

    # Display buttons - approximate:
    self.addSmallButton(60, 65.5, "#display_below_left", 50, SHADE_DARK, False)
    self.addSmallButton(126, 65.5, "#display_below_middle", 44, SHADE_DARK, False)
    self.addSmallButton(192, 65.5, "#display_below_right", 45, SHADE_DARK, False)

    self.addSmallButton(60,  13, "#display_above_left", 58, SHADE_DARK, False)
    self.addSmallButton(126, 13, "#diplay_above_center", 42, SHADE_DARK, False)
    self.addSmallButton(193, 13, "#display_above_right", 43, SHADE_DARK, False)

    self.addButtonWithLightBelowDisplay(0, 82, "#CartBankSet", 52, SHADE_LIGHT, 0xf)
    
    self.onCondition('isSd1')
    if self.isTrue():
      self.addLabel(0, self.label_y, 15, self.fontSize, "BankSet", bold=True, centered=True)
    if self.isFalse():
      self.addLabel(0, self.label_y, 15, self.fontSize, "Cart", bold=True, centered=True)
    self.endCondition()

    self.addButtonWithLightBelowDisplay(15, 82, "#Sounds",   53, SHADE_LIGHT, 0xd)
    self.addLabel(15, self.label_y, 15, self.fontSize, "Sounds", bold=True, centered=True)

    self.addButtonWithLightBelowDisplay(30, 82, "#Presets",  54, SHADE_LIGHT, 0x7)
    self.addLabel(30, self.label_y, 15, self.fontSize, "Presets", bold=True, centered=True)

    # When the keyboard has a sequencer:
    self.onCondition("hasSeq")
    if self.isTrue():
      self.addButtonBelowDisplay     (45, 82, "#Seq",      51, SHADE_LIGHT)
      self.addLabel(45, self.label_y, 15, self.fontSize, "Seq", centered=True, bold=True)
    self.endCondition()

    self.addButtonWithLightBelowDisplay(95, 82, "#0", 55, SHADE_MEDIUM, 0xe)
    self.addButtonWithLightBelowDisplay(110, 82, "#1", 56, SHADE_MEDIUM, 0x6)
    self.addButtonWithLightBelowDisplay(125, 82, "#2", 57, SHADE_MEDIUM, 0x4)
    self.addButtonWithLightBelowDisplay(140, 82, "#3", 46, SHADE_MEDIUM, 0xc)
    self.addButtonWithLightBelowDisplay(155, 82, "#4", 47, SHADE_MEDIUM, 0x3)
    self.addButtonWithLightBelowDisplay(170, 82, "#5", 48, SHADE_MEDIUM, 0xb)
    self.addButtonWithLightBelowDisplay(185, 82, "#6", 49, SHADE_MEDIUM, 0x2)
    self.addButtonWithLightBelowDisplay(200, 82, "#7", 35, SHADE_MEDIUM, 0xa)
    self.addButtonWithLightBelowDisplay(215, 82, "#8", 34, SHADE_MEDIUM, 0x1)
    self.addButtonWithLightBelowDisplay(230, 82, "#9", 25, SHADE_MEDIUM, 0x9)

    self.addLabel(95, self.label_y, 15, self.fontSize, "0", bold=True, centered=True)
    self.addLabel(110, self.label_y, 15, self.fontSize, "1", bold=True, centered=True)
    self.addLabel(125, self.label_y, 15, self.fontSize, "2", bold=True, centered=True)
    self.addLabel(140, self.label_y, 15, self.fontSize, "3", bold=True, centered=True)
    self.addLabel(155, self.label_y, 15, self.fontSize, "4", bold=True, centered=True)
    self.addLabel(170, self.label_y, 15, self.fontSize, "5", bold=True, centered=True)
    self.addLabel(185, self.label_y, 15, self.fontSize, "6", bold=True, centered=True)
    self.addLabel(200, self.label_y, 15, self.fontSize, "7", bold=True, centered=True)
    self.addLabel(215, self.label_y, 15, self.fontSize, "8", bold=True, centered=True)
    self.addLabel(230, self.label_y, 15, self.fontSize, "9", bold=True, centered=True)

    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 245, 1.2)

    return self.endGroup()

  def addButtonArea(self, offset: Offset|None = None):
    self.beginGroup("Buttons", offset)

    # Large buttons on the main panel part
    self.addLargeButton         (0, 82, "Replace\nProgram", 29, SHADE_MEDIUM)

    self.addLargeButton         (120, 82, "Select\nVoice", 5, SHADE_MEDIUM)
    self.addLargeButton         (135, 82, "Copy",          9, SHADE_MEDIUM)
    self.addLargeButton         (150, 82, "Write",         3, SHADE_MEDIUM)
    self.addLargeButtonWithLight(165, 82, "Compare",       8, SHADE_MEDIUM, 0x5)

    # Small buttons, main panel
    # -- Performance:
    self.addSmallButton(0, 62, "Patch\nSelect",   26, SHADE_DARK, True)
    self.addSmallButton(15, 62, "MIDI",            27, SHADE_DARK, True)
    self.addSmallButton(30, 62, "Effects",         28, SHADE_DARK, True)

    self.addSmallButton(0, 42, "Key\nZone",       39, SHADE_DARK, False)
    self.addSmallButton(15, 42, "Trans-\npose",    40, SHADE_DARK, False)
    self.addSmallButton(30, 42, "Release",         41, SHADE_DARK, False)

    self.addSmallButton(0,  22, "Volume",          36, SHADE_DARK, False)
    self.addSmallButton(15,  22, "Pan",             37, SHADE_DARK, False)
    self.addSmallButton(30,  22, "Timbre",          38, SHADE_DARK, False)
    
    # -- Programming:
    self.addSmallButton(120, 62, "Wave",             4, SHADE_DARK, False)
    self.addSmallButton(135, 62, "Mod\nMixer",       6, SHADE_DARK, False)
    self.addSmallButton(150, 62, "Program\nControl", 2, SHADE_DARK, False)
    self.addSmallButton(165, 62, "Effects",          7, SHADE_DARK, True)

    self.addSmallButton(120, 42, "Pitch",           11, SHADE_DARK, False)
    self.addSmallButton(135, 42, "Pitch\nMod",      13, SHADE_DARK, False)
    self.addSmallButton(150, 42, "Filters",         15, SHADE_DARK, True)
    self.addSmallButton(165, 42, "Output",          17, SHADE_DARK, True)

    self.addSmallButton(120,  22, "LFO",             10, SHADE_DARK, True)
    self.addSmallButton(135,  22, "Env1",            12, SHADE_DARK, True)
    self.addSmallButton(150,  22, "Env2",            14, SHADE_DARK, True)
    self.addSmallButton(165,  22, "Env3",            16, SHADE_DARK, True)

    # When the keyboard has a sequencer:
    self.onCondition("hasSeq")
    if self.isTrue():
      self.addWhiteLine(15, 82 - 1.5 * self.fontSize - 0.05, 7.5, 0.25)
      self.addLabel(22.5, 82 - 2 * self.fontSize, 15, self.fontSize, "Tracks", centered=True)
      self.addWhiteLine(37.5, 82 - 1.5 * self.fontSize - 0.05, 7.5, 0.25)
      self.addLargeButtonWithLight(15, 82, "1-6",              30, SHADE_MEDIUM, 0x0, centered=True)
      self.addLargeButtonWithLight(30, 82, "7-12",             31, SHADE_MEDIUM, 0x8, centered=True)
      
      # The 'Master', 'Storage' and 'MIDI Control' buttons are small & at the top,
      # the sequencer buttons are big and at the bottom.
      self.addLargeButton(60, 82, "Rec",           19, SHADE_MEDIUM)
      self.addLargeButton(75, 82, "Stop\n/Cont",   22, SHADE_MEDIUM)
      self.addLargeButton(90, 82, "Play",          23, SHADE_MEDIUM)

      self.addSmallButton(60, 62, "Click",         32, SHADE_DARK, False)
      self.addSmallButton(75, 62, "Seq\nControl",  18, SHADE_DARK, True)
      self.addSmallButton(90, 62, "Locate",        33, SHADE_DARK, True)

      self.addSmallButton(60, 42, "Song",          60, SHADE_DARK, False)
      self.addSmallButton(75, 42, "Seq",           59, SHADE_DARK, False)
      self.addSmallButton(90, 42, "Track",         61, SHADE_DARK, False)

      self.addSmallButton(60,  22, "Master",        20, SHADE_LIGHT, True)
      self.addSmallButton(75,  22, "Storage",       21, SHADE_LIGHT, False)
      self.addSmallButton(90,  22, "MIDI\nControl", 24, SHADE_LIGHT, True)

      self.addWhiteLine(60, 44 - 1.5 * self.fontSize - 0.05, 17.5, 0.25)
      self.addLabel(77.5, 42 - 2 * self.fontSize, 10, self.fontSize, "Edit", centered=True)
      self.addWhiteLine(87.5, 42 - 1.5 * self.fontSize - 0.05, 17.5, 0.25)

      self.addLabel(60, 13-(0.5 + self.fontSize), 35, self.fontSize, "System", bold=True)
      self.addAccentColoredLine(60, 13-0.5, 55, 0.5)
      self.addLabel(60, self.label_y, 25, self.fontSize, "Sequencer", bold=True)

    # When there is no sequencer:
    if self.isFalse():
      self.addWhiteLine(15, 82 - 1.5 * self.fontSize - 0.05, 10, 0.1)
      self.addLabel(25, 82 - 2 * self.fontSize, 10, self.fontSize, "Multi", centered=True)
      self.addWhiteLine(35, 82 - 1.5 * self.fontSize - 0.05, 10, 0.1)
      self.addLargeButtonWithLight(15, 82, "A",              30, SHADE_MEDIUM, 0x0, centered=True)
      self.addLargeButtonWithLight(30, 82, "B",              31, SHADE_MEDIUM, 0x8, centered=True)

      # The 'Master', 'Storage' and 'MIDI Control' buttons are large & at the bottom,
      # and there are no sequencer buttons
      self.addLargeButton(60, 82, "Master",        20, SHADE_LIGHT, True)
      self.addLargeButton(75, 82, "Storage",       21, SHADE_LIGHT, False)
      self.addLargeButton(90, 82, "MIDI\nControl", 24, SHADE_LIGHT, True)

      self.addLabel(60, 87.5, 35, self.fontSize, "System", bold=True)
    self.endCondition()

    # The colored lines along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 55, 1.2)
    self.addAccentColoredLine(60, self.accent_line_y, 55, 1.2)
    self.addAccentColoredLine(120, self.accent_line_y, 60, 1.2)

    # And the labels just above it:
    self.addLabel(0, self.label_y, 35, self.fontSize, "Performance", bold=True)
    self.addLabel(120, self.label_y, 35, self.fontSize, "Programming", bold=True)

    return self.endGroup()

  def addBackPanel(self, offset: Offset|None):
    self.beginGroup("BackPanel", offset)
    self.addRectangle(0, 0, 845, 32, 'body')
    y = 10
    self.addLabel(97, y, 10, self.fontSize, "Power", italic=True)
    self.addLabel(131, y, 8, self.fontSize, "Line", italic=True)
    self.addLabel(165, y, 10, self.fontSize, "Fuse", italic=True)
    
    line = self.addWhiteLine(477, y + self.fontSize, 87, 0.25)
    self.addLabel(477, y, 87, self.fontSize, "MIDI", italic=True, centered=True)
    self.addLabelBelow(480, line, 8, self.fontSize, "Thru", italic=True)
    self.addLabelBelow(518, line, 8, self.fontSize, "Out", italic=True)
    self.addLabelBelow(558, line, 4, self.fontSize, "In", italic=True)

    self.addLabel(640, y, 12, self.fontSize, "Ft. Sw.", italic=True)
    self.addLabel(663, y, 17, self.fontSize, "Pedal•CV", italic=True)

    self.onCondition("hasSeq")
    if self.isTrue():
      line = self.addWhiteLine(690, y + self.fontSize, 38, 0.25)
      left = self.addLabel(692, y, 8, self.fontSize, "Left", italic=True)
      self.addLabel(717, y, 10, self.fontSize, "Right", italic=True)
      self.addLabelBelow(690, line, 38, self.fontSize, "Mono", italic=True, centered=True)
      self.addLabelAbove(690, left, 38, self.fontSize, "Aux. Out", italic=True, centered=True)

      line = self.addWhiteLine(740, y + self.fontSize, 38, 0.25)
      left = self.addLabel(742, y, 8, self.fontSize, "Left", italic=True)
      self.addLabel(767, y, 10, self.fontSize, "Right", italic=True)
      self.addLabelBelow(740, line, 38, self.fontSize, "Mono", italic=True, centered=True)
      self.addLabelAbove(740, left, 38, self.fontSize, "Main Out", italic=True, centered=True)

    if self.isFalse():
      line = self.addWhiteLine(740, y + self.fontSize, 38, 0.25)
      left = self.addLabel(742, y, 8, self.fontSize, "Left", italic=True)
      self.addLabel(767, y, 10, self.fontSize, "Right", italic=True)
      self.addLabelBelow(740, line, 38, self.fontSize, "Mono", italic=True, centered=True)
      self.addLabelAbove(740, left, 38, self.fontSize, "Main Out", italic=True, centered=True)

    self.endCondition()

    self.addLabel(790, y, 15, self.fontSize, "Phones", italic=True)
    return self.endGroup()

  def addWheelArea(self, offset: Offset|None):
    self.beginGroup("WheelArea", offset)
    self.addRectangle(0, 0, 108, 122, 'panel')

    self.addPatchSelectButton(6, 2, 9, 12, 1)
    self.addPatchSelectButton(21, 2, 9, 12, 0)
    self.addLabel(31, 14 - 2 * self.fontSize, 15, self.fontSize, "Patch", italic=True)
    self.addLabel(31, 14 - 1 * self.fontSize, 15, self.fontSize, "Select", italic=True)

    # pitch bend
    self.addWheel(29.5, 26, 0, 'pitch_bend', autocenter=True)

    # modulation
    self.addWheel(66.5, 26, 2, "mod_wheel")

    # decorative line
    self.addAccentColoredLine(0, 99, 28, 1.2)
    
    line = self.addAccentColoredLine(29.5, 99, 34.5, 1.2)
    self.addLabelAbove(29.5, line, 15, self.fontSize, "Pitch", bold=True)

    line = self.addAccentColoredLine(66.5, 99, 29.5, 1.2)
    self.addLabelAbove(66.5, line, 15, self.fontSize, "Mod", bold=True)

    return self.endGroup()

@dataclass
class PanelBuilder(ViewBuilder):
  def build(self):
    self.view.name = "panel"
    self.onCondition('isSd1')
    if self.isTrue():
      self.setAccentColor('sd1')
    if self.isFalse():
      self.setAccentColor('vfx')
    self.endCondition()

    self.background = Rectangle(Rect(0,0,0,0), 'panel')
    self.add(self.background)

    self.addSliders(Offset(-90, -13))

    # The colored line along the base between sliders area and display area:
    self.addAccentColoredLine(0, self.accent_line_y - 13, 25, 1.2)

    self.addDisplayArea(Offset(25, -13))

    # The colored line along the base between display area and buttons area:
    self.addAccentColoredLine(270, self.accent_line_y - 13, 25 - 2.5, 1.2)

    self.addButtonArea(Offset(295, -13))

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
      self.setAccentColor('sd1')
    if self.isFalse():
      self.setAccentColor('vfx')
    self.endCondition()

    self.background = Rectangle(Rect(0,0,0,0), 'panel')
    self.add(self.background)

    # Volume slider
    self.beginGroup("CompactVolumeSlider", Offset(0, -13))

    self.addSlider(0, 15, 5, "volume")
    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 30, 1.2)
    # And the label above it:
    self.addLabel(0, self.label_y, 35, self.fontSize, "Volume", bold=True)

    self.endGroup()

    displayArea = self.addDisplayArea(Offset(30, -13))

    y0 = displayArea.bounds.getY(1.0) + 10

    buttonArea = self.addButtonArea(Offset(0, y0 - 13))
    buttonArea.offset.x = displayArea.bounds.getX(1.0) - buttonArea.intrinsic_bounds.w

    x1 = buttonArea.bounds.x

    self.beginGroup("PatchSelects", Offset(0, y0 - 13))
    self.addPatchSelectButton(0, 55, 9, 12, 1)
    self.addPatchSelectButton(15, 55, 9, 12, 0)

    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 40, 1.2)
    # And the labels above it:
    self.addLabel(0, self.label_y, 35, self.fontSize, "Patch Select", bold=True)
    self.endGroup()

    self.beginGroup("CompactValueSlider", Offset(32, y0 - 13))

    # Value slider
    self.addSlider(20, 15, 3, "data_entry")

    # Increment and Decrement
    self.addIncDecButton(0, 60, "#decrement", 63, SHADE_DARK, False)
    self.addIncDecButton(0, 35, "#increment", 62, SHADE_DARK, False)

    self.addDownTriangle(5, 55, 5, 2.5)
    self.addUpTriangle(5, 30, 5, 2.5)

    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, x1 - 32, 1.2)
    # And the labels above it:
    self.addLabel(0, self.label_y, 35, self.fontSize, "Data Entry", bold=True)

    self.endGroup()

    # Give us a bit of a margin
    self.view.bounds = self.view.bounds.outset(5, 5)
    # Update the background bounds to match ours.
    self.background.bounds = self.view.bounds

    return self.view

class FullViewBuilder(ViewBuilder):
  def build(self):
    self.view.name = "full_panel"
    self.onCondition('isSd1')
    if self.isTrue():
      self.setAccentColor('sd1')
    if self.isFalse():
      self.setAccentColor('vfx')
    self.endCondition()

    self.background = Rectangle(Rect(0,0,845,121.5), 'panel')
    self.add(self.background)

    self.addSliders(Offset(120, 0))

    # The colored line along the base between sliders area and display area:
    self.addAccentColoredLine(210, self.accent_line_y, 25, 1.2)

    self.addDisplayArea(Offset(235, 0))

    # The colored line along the base between display area and buttons area:
    self.addAccentColoredLine(480, self.accent_line_y, 25 - 2.5, 1.2)

    self.addButtonArea(Offset(505, 0))

    cart_outside = Rect(720, 22, 56, 27)
    cart_inside = cart_outside.inset(1.5, 1.5)
    cart = self.add(Rectangle(cart_outside, 'body_down'))
    self.add(Rectangle(cart_inside, 'body_up'))
    self.addLabelAbove(cart_outside.x, cart, cart_outside.w, self.fontSize, "Cartridge", italic=True)

    self.addBackPanel(Offset(0, -32))

    self.onCondition("hasSeq")
    if self.isTrue():
      self.addLabel(13, 7, 200, self.fontSize, "MUSIC PRODUCTION SYNTHESIZER")
    if self.isFalse():
      self.addLabel(13, 7, 200, self.fontSize, "DYNAMIC COMPONENT SYNTHESIZER")
    self.endCondition();

    self.add(Symbol(Rect(760, 90, 72, 13), "logo", 'white'))

    left = 20 + 5 + 7 + 108 + 7 + 5
    h_total = 32 + 121.5 + 32 + 138 + 11
    self.addRectangle(-left, -32, left, h_total, 'body')
    self.addRectangle(854, -32, 20, h_total, 'body')

    self.addWheelArea(Offset(-120, 121.5 + 32 + 138 - 122))

    return self.view
