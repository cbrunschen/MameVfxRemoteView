#!/usr/bin/env python

from dataclasses import dataclass, field
from rect import *
from util import *
from view import *
from keys import *
from typing import cast
from render import make_text_renderer

# The pitch-bend and modulation wheels are approxi  mately:
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
#
# Keyboard logo starts at 13 in, 17 up from botttom-left corner of panel
# main text if 27mm tall
# SD-1/32 has extra bar "32 VOICE", bar 7mm text 5mm, then 3mm space, then 'SD-1' above
# VFX-SD has extra text 'SD', 11mm tall
# 'SD-1' is 67 wide, 'VFX' 73, 'SD' 19, total 92;
# equivalent VFX only would be 34 mm tall, 92 wide.


@dataclass
class ViewBuilder:
  name: str
  # these are all internal variables really
  panel_background: Rectangle|None = None
  contexts: list[Context] = field(default_factory=list)

  def __post_init__(self):
    self.text_renderer = make_text_renderer()
    self.button_font = self.text_renderer.getFont('Panel', italic=True).scaledToTextHeight(3.6)
    self.back_panel_font = self.button_font
    self.small_font = self.text_renderer.getFont('Panel', bold=True).scaledToAscent(2.5)
    self.accent_line_font = self.text_renderer.getFont('Panel', bold=True).scaledToTextHeight(3.6)

    self.view = View(self.name)
    self.contexts.append(self.view)
    self.accent_line_y = 102
    self.text_top_below = 0.5 - self.button_font.top
    self.baseline_above = 1.5
    self.baseline_above_back_panel = 1.0
    self.accent_line_label_y = self.accent_line_y - self.baseline_above
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
  
  def addLabel(self, x:float, y:float, w:float, label:str, font:Font, alignment:Alignment = Alignment.LEFT, color = None):      
    return self.add(Label(x, y, w, label, font, alignment, color))
  
  def addLabelAbove(self, x:float, item, w:float, label:str, font:Font, alignment = Alignment.LEFT, color = None): 
    return self.add(Label(x, item.bounds.y - self.baseline_above, w, label, font, alignment, color))

  def addLabelJustAbove(self, x:float, item, w:float, label:str, font:Font, alignment = Alignment.LEFT, color = None): 
    return self.add(Label(x, item.bounds.y - self.baseline_above_back_panel, w, label, font, alignment, color))

  def addLabelBelow(self, x:float, item, w:float, label:str, font:Font, alignment = Alignment.LEFT, color = None): 
    return self.add(Label(x, item.bounds.y + item.bounds.h + self.text_top_below + font.text_height, w, label, font, alignment, color))

  def addPatchSelectButton(self, x:float, y:float, w:float, h:float, number):
    return self.add(PatchSelectButton(Rect(x, y, w, h), number))
  
  def addButton(self, x:float, y:float, w:float, h:float, label:str, labelPosition: LabelPosition, value:int, shade, multiPage = False, lightId = -1):
    button = Button(Rect(x, y, w, h), label, value, shade)
    self.add(button)

    if not label.startswith("#"):
      labelLines = label.split("\n")
      nLines = len(labelLines)
      y0 = -nLines * self.button_font.text_height + self.button_font.baseline - 1.6
      alignment = Alignment.CENTERED if ((labelPosition & LabelPosition.CENTERED) != 0) else Alignment.LEFT
      
      labels = []
      for i in range(nLines):
        line = labelLines[i]
        labels.append(self.addLabel(x, y + y0 + i * self.button_font.text_height, w, line, self.button_font, alignment=alignment))
      
      if multiPage:
        self.addMultiPageChevrons(labels)
    
    if lightId >= 0:
      # Light bounds are relative to button bounds
      button.light = Light(Rect(w/3, h/25, w/3, h/3), lightId)
    
    return button

  def addButtonBelowDisplay(self, x, y, label, value, shade):
    return self.addButton(x, y, 15.8, 10, label, LabelPosition.CENTERED, value, shade, False, -1)
  
  def addButtonWithLightBelowDisplay(self, x, y, label, value, shade, lightId):
    return self.addButton(x, y, 15.8, 10, label, LabelPosition.CENTERED, value, shade, False, lightId)
  
  def addLargeButton(self, x, y, label, value, shade, multiPage=False):
    return self.addButton(x, y, 15.8, 10, label, LabelPosition.ABOVE, value, shade, False, -1)
  
  def addLargeButtonWithLight(self, x, y, label, value, shade, lightId, alignment=Alignment.LEFT):
    return self.addButton(x, y, 15.8, 10, label, LabelPosition.ABOVE_CENTERED if alignment == Alignment.CENTERED else LabelPosition.ABOVE, value, shade, False, lightId)

  def addSmallButton(self, x, y, label, value, shade, multiPage):
    return self.addButton(x, y, 15.8, 5, label, LabelPosition.ABOVE, value, shade, multiPage, -1)
  
  def addIncDecButton(self, x, y, label, value, shade, multiPage):
    return self.addButton(x, y, 15.8, 5, label, LabelPosition.ABOVE_CENTERED, value, shade, multiPage, -1)
  
  def addLight(self, x, y, w, h, number):
    return self.add(Light(Rect(x, y, w, h), number))

  def addSlider(self, x, y, channel, name):
    return self.add(Slider(Rect(x, y, 20, 60), channel, name)) # always 20 wide, 60 tall

  def addWheel(self, x, y, channel, name, autocenter=False):
    return self.add(Wheel(Rect(x, y, 13, 66), channel, name, autocenter)) # always 13 wide, 66 tall

  def addAccentColoredLine(self, x, y, w, h):
    return self.addRectangle(x, y, w, h, "accent")

  def addWhiteLine(self, x, y, w, h):
    return self.addRectangle(x, y, w, h, 'white')

  def addTriangleUp(self, x, y, w, h):
    return self.addShowDrawing(x, y, w, h, Drawings.TriangleUp, colors = {'all':'white'})

  def addTriangleDown(self, x, y, w, h):
    return self.addShowDrawing(x, y, w, h, Drawings.TriangleDown, colors = {'all':'white'})

  def addRectangle(self, x, y, w, h, color):
    return self.add(Rectangle(Rect(x, y, w, h), color))

  def addEllipse(self, x, y, w, h, color):
    return self.add(Ellipse(Rect(x, y, w, h), color))

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
  
  def beginGroup(self, name: str, offset: Vector|None):
    group = Group(name, Vector(0,0) if offset is None else offset)
    self.context.items.append(group)
    self.contexts.append(group)
    return group
  
  def placeGroup(self, offset: Vector):
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

  def addSliders(self, offset: Vector|None = None):
    self.beginGroup("Sliders", offset)

    # Volume slider
    self.addSlider(0, 15, 5, "volume")

    # Increment and Decrement
    self.addIncDecButton(47.5, 60, "#decrement", 63, SHADE_DARK, False)
    self.addIncDecButton(47.5, 35, "#increment", 62, SHADE_DARK, False)

    self.addTriangleDown(52.5, 55, 5, 2.5)
    self.addTriangleUp(52.5, 30, 5, 2.5)

    # Value slider
    self.addSlider(70, 15, 3, "data_entry")

    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 90, 1.2)
    # And the labels above it:
    self.addLabel(0, self.accent_line_label_y, 35, "Volume", self.accent_line_font)
    self.addLabel(47.5, self.accent_line_label_y, 35, "Data Entry", self.accent_line_font)

    return self.endGroup()
  
  def addDisplayOnly(self, offset: Vector|None = None):
    self.beginGroup("DisplayOnly", offset)

    glassRect = Rect(0, 8, 245, 67.5)
    roughDisplayRect = glassRect.inset(12, 18)
    charRect = Rect(0, 0, 342, 572)
    charsRect = Rect(0, 0, 40 * charRect.w, 2 * charRect.h)
    displayRect = charsRect.fitWithin(roughDisplayRect)

    paddingRect = Rect(displayRect.x-1, displayRect.y-1.75, displayRect.w+2, displayRect.h+2)

    self.add(Rectangle(paddingRect, 'glass'))
    self.add(Display(displayRect))

    return self.endGroup()

  def addDisplayArea(self, offset: Vector|None = None):
    self.beginGroup("DisplayAndButtons", offset)

    glassRect = Rect(0, 8, 245, 67.5)
    roughDisplayRect = glassRect.inset(12, 18)
    charRect = Rect(0, 0, 342, 572)
    charsRect = Rect(0, 0, 40 * charRect.w, 2 * charRect.h)
    displayRect = charsRect.fitWithin(roughDisplayRect)
    self.add(Rectangle(glassRect, 'glass'))
    self.add(Display(displayRect))

    # Display buttons - approximate:
    self.addSmallButton(60, 65.5, "#display_below_left", 50, SHADE_SCREEN, False)
    self.addSmallButton(126, 65.5, "#display_below_middle", 44, SHADE_SCREEN, False)
    self.addSmallButton(192, 65.5, "#display_below_right", 45, SHADE_SCREEN, False)

    self.addSmallButton(60,  13, "#display_above_left", 58, SHADE_SCREEN, False)
    self.addSmallButton(126, 13, "#diplay_above_center", 42, SHADE_SCREEN, False)
    self.addSmallButton(193, 13, "#display_above_right", 43, SHADE_SCREEN, False)

    self.addButtonWithLightBelowDisplay(0, 82, "#CartBankSet", 52, SHADE_LIGHT, 0xf)
    
    self.onCondition('isSd1')
    if self.isTrue():
      self.addLabel(0, self.accent_line_label_y, 15.8, "BankSet", self.accent_line_font, alignment=Alignment.CENTERED)
    if self.isFalse():
      self.addLabel(0, self.accent_line_label_y, 15.8, "Cart", self.accent_line_font, alignment=Alignment.CENTERED)
    self.endCondition()

    self.addButtonWithLightBelowDisplay(15.8, 82, "#Sounds",   53, SHADE_LIGHT, 0xd)
    self.addLabel(15.8, self.accent_line_label_y, 15.8, "Sounds", self.accent_line_font, alignment=Alignment.CENTERED)

    self.addButtonWithLightBelowDisplay(31.6, 82, "#Presets",  54, SHADE_LIGHT, 0x7)
    self.addLabel(31.6, self.accent_line_label_y, 15.8, "Presets", self.accent_line_font, alignment=Alignment.CENTERED)

    # When the keyboard has a sequencer:
    self.onCondition("hasSeq")
    if self.isTrue():
      self.addButtonBelowDisplay     (47.4, 82, "#Seq",      51, SHADE_LIGHT)
      self.addLabel(47.4, self.accent_line_label_y, 15.8,  "Seq", self.accent_line_font, alignment=Alignment.CENTERED)
    self.endCondition()

    self.addButtonWithLightBelowDisplay(87.0, 82, "#0", 55, SHADE_MEDIUM, 0xe)
    self.addButtonWithLightBelowDisplay(102.8, 82, "#1", 56, SHADE_MEDIUM, 0x6)
    self.addButtonWithLightBelowDisplay(118.6, 82, "#2", 57, SHADE_MEDIUM, 0x4)
    self.addButtonWithLightBelowDisplay(134.4, 82, "#3", 46, SHADE_MEDIUM, 0xc)
    self.addButtonWithLightBelowDisplay(150.2, 82, "#4", 47, SHADE_MEDIUM, 0x3)
    self.addButtonWithLightBelowDisplay(166.0, 82, "#5", 48, SHADE_MEDIUM, 0xb)
    self.addButtonWithLightBelowDisplay(181.8, 82, "#6", 49, SHADE_MEDIUM, 0x2)
    self.addButtonWithLightBelowDisplay(197.6, 82, "#7", 35, SHADE_MEDIUM, 0xa)
    self.addButtonWithLightBelowDisplay(213.4, 82, "#8", 34, SHADE_MEDIUM, 0x1)
    self.addButtonWithLightBelowDisplay(229.2, 82, "#9", 25, SHADE_MEDIUM, 0x9)

    self.addLabel(87.0,  self.accent_line_label_y, 15.8, "0", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(102.8, self.accent_line_label_y, 15.8, "1", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(118.6, self.accent_line_label_y, 15.8, "2", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(134.4, self.accent_line_label_y, 15.8, "3", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(150.2, self.accent_line_label_y, 15.8, "4", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(166.0, self.accent_line_label_y, 15.8, "5", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(181.8, self.accent_line_label_y, 15.8, "6", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(197.6, self.accent_line_label_y, 15.8, "7", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(213.4, self.accent_line_label_y, 15.8, "8", self.accent_line_font, alignment=Alignment.CENTERED)
    self.addLabel(229.2, self.accent_line_label_y, 15.8, "9", self.accent_line_font, alignment=Alignment.CENTERED)

    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 245, 1.2)

    return self.endGroup()

  def addButtonArea(self, offset: Vector|None = None):
    group = self.beginGroup("Buttons", offset)

    # Large buttons on the main panel part
    self.addLargeButton         (0, 82, "Replace\nProgram", 29, SHADE_MEDIUM)

    self.addLargeButton         (120, 82, "Select\nVoice", 5, SHADE_MEDIUM)
    self.addLargeButton         (135.8, 82, "Copy",          9, SHADE_MEDIUM)
    self.addLargeButton         (151.6, 82, "Write",         3, SHADE_MEDIUM)
    self.addLargeButtonWithLight(167.4, 82, "Compare",       8, SHADE_MEDIUM, 0x5)

    # Small buttons, main panel
    # -- Performance:
    self.addSmallButton(0, 62, "Patch\nSelect",   26, SHADE_DARK, True)
    self.addSmallButton(15.8, 62, "MIDI",            27, SHADE_DARK, True)
    self.addSmallButton(31.6, 62, "Effects",         28, SHADE_DARK, True)

    self.addSmallButton(0, 42, "Key\nZone",       39, SHADE_DARK, False)
    self.addSmallButton(15.8, 42, "Trans-\npose",    40, SHADE_DARK, False)
    self.addSmallButton(31.6, 42, "Release",         41, SHADE_DARK, False)

    self.addSmallButton(0,  22, "Volume",          36, SHADE_DARK, False)
    self.addSmallButton(15.8,  22, "Pan",             37, SHADE_DARK, False)
    self.addSmallButton(31.6,  22, "Timbre",          38, SHADE_DARK, False)
    
    # -- Programming:
    self.addSmallButton(120, 62, "Wave",             4, SHADE_DARK, False)
    self.addSmallButton(135.8, 62, "Mod\nMixer",       6, SHADE_DARK, False)
    self.addSmallButton(151.6, 62, "Program\nControl", 2, SHADE_DARK, False)
    self.addSmallButton(167.4, 62, "Effects",          7, SHADE_DARK, True)

    self.addSmallButton(120, 42, "Pitch",           11, SHADE_DARK, False)
    self.addSmallButton(135.8, 42, "Pitch\nMod",      13, SHADE_DARK, False)
    self.addSmallButton(151.6, 42, "Filters",         15, SHADE_DARK, True)
    self.addSmallButton(167.4, 42, "Output",          17, SHADE_DARK, True)

    self.addSmallButton(120,  22, "LFO",             10, SHADE_DARK, True)
    self.addSmallButton(135.8,  22, "Env1",            12, SHADE_DARK, True)
    self.addSmallButton(151.6,  22, "Env2",            14, SHADE_DARK, True)
    self.addSmallButton(167.4,  22, "Env3",            16, SHADE_DARK, True)

    # When the keyboard has a sequencer:
    self.onCondition("hasSeq")

    if self.isTrue():
      label = self.addLabel(15.8, 82 - 1.5 * self.button_font.text_height, 2 * 15.8, "Tracks", self.small_font, alignment=Alignment.CENTERED)
      self.addWhiteLineAround(cast(Label, label), 0.25)
      self.addLargeButtonWithLight(15.8, 82, "1-6",              30, SHADE_MEDIUM, 0x0, alignment=Alignment.CENTERED)
      self.addLargeButtonWithLight(31.6, 82, "7-12",             31, SHADE_MEDIUM, 0x8, alignment=Alignment.CENTERED)
      
      # The 'Master', 'Storage' and 'MIDI Control' buttons are small & at the top,
      # the sequencer buttons are big and at the bottom.
      self.addLargeButton(60.0, 82, "Rec",           19, SHADE_MEDIUM)
      self.addLargeButton(75.8, 82, "Stop\n/Cont",   22, SHADE_MEDIUM)
      self.addLargeButton(91.6, 82, "Play",          23, SHADE_MEDIUM)

      self.addSmallButton(60.0, 62, "Click",         32, SHADE_DARK, False)
      self.addSmallButton(75.8, 62, "Seq\nControl",  18, SHADE_DARK, True)
      self.addSmallButton(91.6, 62, "Locate",        33, SHADE_DARK, True)

      self.addSmallButton(60.0, 42, "Song",          60, SHADE_DARK, False)
      self.addSmallButton(75.8, 42, "Seq",           59, SHADE_DARK, False)
      self.addSmallButton(91.6, 42, "Track",         61, SHADE_DARK, False)

      self.addSmallButton(60.0,  22, "Master",        20, SHADE_LIGHT, True)
      self.addSmallButton(75.8,  22, "Storage",       21, SHADE_LIGHT, False)
      self.addSmallButton(91.690,  22, "MIDI\nControl", 24, SHADE_LIGHT, True)

      label = self.addLabel(60.0, 42 - 1.5 * self.button_font.text_height, 3 * 15.8, "Edit", self.small_font, alignment=Alignment.CENTERED)
      self.addWhiteLineAround(cast(Label, label), 0.25)

      self.addLabel(60, 11-(0.5 + self.accent_line_font.descent), 35, "System", self.accent_line_font)
      self.addAccentColoredLine(60, 11, 60 - 1.5, 0.5)
      self.addLabel(60, self.accent_line_label_y, 35, "Sequencer", self.accent_line_font)

    # When there is no sequencer:
    if self.isFalse():
      label = self.addLabel(15.8, 82 - 1.5 * self.button_font.text_height, 2 * 15.8, "Multi", self.small_font, alignment=Alignment.CENTERED)
      self.addWhiteLineAround(cast(Label, label), 0.25)
      self.addLargeButtonWithLight(15.8, 82, "A",              30, SHADE_MEDIUM, 0x0, alignment=Alignment.CENTERED)
      self.addLargeButtonWithLight(31.6, 82, "B",              31, SHADE_MEDIUM, 0x8, alignment=Alignment.CENTERED)

      # The 'Master', 'Storage' and 'MIDI Control' buttons are large & at the bottom,
      # and there are no sequencer buttons
      self.addLargeButton(60, 82, "Master",        20, SHADE_LIGHT, True)
      self.addLargeButton(75.8, 82, "Storage",       21, SHADE_LIGHT, False)
      self.addLargeButton(91.6, 82, "MIDI\nControl", 24, SHADE_LIGHT, True)

      self.addLabel(60, self.accent_line_label_y, 35, "System", font=self.accent_line_font)
      
      # There's no 'System' label at the top, but make sure we use the same amount of space.
      group.addExtra(Rect(60, 11-(self.button_font.text_height), 35, self.button_font.text_height))
    self.endCondition()

    # The colored lines along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 60 - 1.5, 1.2)
    self.addAccentColoredLine(60, self.accent_line_y, 60 - 1.5, 1.2)
    self.addAccentColoredLine(120, self.accent_line_y, 4 * 15.8, 1.2)

    # And the labels just above it:
    self.addLabel(0, self.accent_line_label_y, 35, "Performance", font=self.accent_line_font)
    self.addLabel(120, self.accent_line_label_y, 35, "Programming", font=self.accent_line_font)

    return self.endGroup()

  def addBackPanel(self, offset: Vector|None):
    self.beginGroup("BackPanel", offset)
    self.addRectangle(0, 0, 845, 32, 'body')
    y = 10 + self.back_panel_font.baseline
    self.addLabel(97, y, 10, "Power", font=self.back_panel_font)
    self.addLabel(131, y, 8, "Line", font=self.back_panel_font)
    self.addLabel(165, y, 10, "Fuse", font=self.back_panel_font)
    
    line = self.addWhiteLine(477, y + self.back_panel_font.descent, 87, 0.25)
    self.addLabel(477, y, 87, "MIDI", font=self.back_panel_font, alignment=Alignment.CENTERED)
    self.addLabelBelow(480, line, 8, "Thru", font=self.back_panel_font)
    self.addLabelBelow(518, line, 8, "Out", font=self.back_panel_font)
    self.addLabelBelow(558, line, 4, "In", font=self.back_panel_font)

    self.addLabel(640, y, 12, "Ft. Sw.", font=self.back_panel_font)
    self.addLabel(663, y, 17, "Pedal•CV", font=self.back_panel_font)

    self.onCondition("hasSeq")
    if self.isTrue():
      line = self.addWhiteLine(690, y + self.back_panel_font.descent, 38, 0.25)
      left = self.addLabel(692, y, 8, "Left", font=self.back_panel_font)
      self.addLabel(717, y, 10, "Right", font=self.back_panel_font)
      self.addLabelBelow(690, line, 38, "Mono", font=self.back_panel_font, alignment=Alignment.CENTERED)
      self.addLabelAbove(690, left, 38, "Aux. Out", font=self.back_panel_font, alignment=Alignment.CENTERED)

      line = self.addWhiteLine(740, y + self.back_panel_font.descent, 38, 0.25)
      left = self.addLabel(742, y, 8, "Left", font=self.back_panel_font)
      self.addLabel(767, y, 10, "Right", font=self.back_panel_font)
      self.addLabelBelow(740, line, 38, "Mono", font=self.back_panel_font, alignment=Alignment.CENTERED)
      self.addLabelAbove(740, left, 38, "Main Out", font=self.back_panel_font, alignment=Alignment.CENTERED)

    if self.isFalse():
      line = self.addWhiteLine(740, y + self.back_panel_font.descent, 38, 0.25)
      left = self.addLabel(742, y, 8, "Left", font=self.back_panel_font)
      self.addLabel(767, y, 10, "Right", font=self.back_panel_font)
      self.addLabelBelow(740, line, 38, "Mono", font=self.back_panel_font, alignment=Alignment.CENTERED)
      self.addLabelAbove(740, left, 38, "Main Out", font=self.back_panel_font, alignment=Alignment.CENTERED)

    self.endCondition()

    self.addLabel(790, y, 15, "Phones", font=self.back_panel_font)

    self.addEllipse(2, 18, 6, 6, 'screwhead')    
    self.addEllipse(837, 18, 6, 6, 'screwhead')    

    return self.endGroup()

  def addWheelArea(self, offset: Vector|None):
    self.beginGroup("WheelArea", offset)
    self.addRectangle(0, 0, 108, 122, 'panel')

    self.addPatchSelectButton(6, 2, 9, 12, 1)
    self.addPatchSelectButton(21, 2, 9, 12, 0)
    self.addLabel(31, 14 - self.button_font.text_height, 15, "Patch", font=self.button_font)
    self.addLabel(31, 14, 15, "Select", font=self.button_font)

    # pitch bend
    self.addWheel(29.5, 26, 0, 'pitch_bend', autocenter=True)
    self.addShowDrawing(46.5, 26, 4, 66, Drawings.PitchBend, colors={'all':'white', 'dot':'white'})

    # modulation
    self.addWheel(66.5, 26, 2, "mod_wheel")
    self.addShowDrawing(83.5, 26, 4, 66, Drawings.Modulation, colors={'all':'white'})

    # decorative line
    self.addAccentColoredLine(0, 99, 28, 1.2)
    
    line = self.addAccentColoredLine(29.5, 99, 35.5, 1.2)
    self.addLabelAbove(29.5, line, 15, "Pitch", font=self.accent_line_font)

    line = self.addAccentColoredLine(66.5, 99, 41.5, 1.2)
    self.addLabelAbove(66.5, line, 15, "Mod", font=self.accent_line_font)

    return self.endGroup()
  
  def addNarrowWheelArea(self, offset: Vector|None):
    self.beginGroup("NarrowWheelArea", offset)
    self.addRectangle(0, 0, 86, 122, 'panel')

    self.addPatchSelectButton(6, 2, 9, 12, 1)
    self.addPatchSelectButton(21, 2, 9, 12, 0)
    self.addLabel(31, 14 - self.button_font.text_height, 15, "Patch", self.button_font)
    self.addLabel(31, 14, 15, "Select", self.button_font)

    # pitch bend
    self.addWheel(20, 26, 0, 'pitch_bend', autocenter=True)
    self.addShowDrawing(37, 26, 4, 66, Drawings.PitchBend, colors={'all':'white', 'dot':'white'})

    # modulation
    self.addWheel(53, 26, 2, "mod_wheel")
    self.addShowDrawing(70, 26, 4, 66, Drawings.Modulation, colors={'all':'white'})

    # decorative line
    self.addAccentColoredLine(0, 99, 18.5, 1.2)
    
    line = self.addAccentColoredLine(20, 99, 31.5, 1.2)
    self.addLabelAbove(20, line, 15, "Pitch", self.accent_line_font)

    line = self.addAccentColoredLine(53, 99, 33, 1.2)
    self.addLabelAbove(53, line, 15, "Mod", self.accent_line_font)

    return self.endGroup()
  
  def addKeyboard(self, name:str, offset: Vector, from_octave: int, n_octaves: int) -> Keyboard:
    from_key = 12 * from_octave
    octave_keys = 12 * n_octaves

    keyboard = Keyboard(name, offset, from_octave, n_octaves)
    self.contexts.append(keyboard)
    ks = KeyShaper()
    shapes = ks.key_shapes()
    octave_shift = ks.octave_shift()
    # Always start on a C
    first_offset = shapes[0].origin

    for k in range(from_key, from_key + octave_keys):
      octave = (k - from_key) // 12
      shape = shapes[k % 12]
      octave_offset = Vector(octave * octave_shift, 0)
      offset = octave_offset - first_offset
      # dprint(f"Adding key {k}, {octave} octaves up from first, first = {first_offset}, octave_offset={octave_offset}")
      key = Key(shape.bounds.offset(offset), keyboard, k - from_key, shape, k)
      self.add(key)

    # and now the top key
    shape = shapes[12]
    octave_offset = Vector(n_octaves * octave_shift, 0)
    top_key = Key(shape.bounds.offset(octave_offset), keyboard, octave_keys, shape, from_key + octave_keys)
    self.add(top_key)

    self.contexts.pop()
    self.add(keyboard)
    return keyboard

  def addShowDrawing(self, x:float, y:float, w:float, h:float, drawing: SVGDrawing, colors: dict[str, str]|None = None):
    return self.add(ShowDrawing(Rect(x, y, w, h), drawing, dict() if colors is None else colors))

  def addMultiPageChevrons(self, labels:list[Label]):
    return self.add(MultiPageChevrons(labels))
  
  def addWhiteLineAround(self, label:Label, thickness:float = 0.25):
    return self.add(WhiteLineAround(label, thickness))


class DisplayOnlyViewBuilder(ViewBuilder):
  def __post_init__(self):
    super().__post_init__()
    self.view.is_interactive = False

  def build(self):
    self.addDisplayOnly()
    return self.view


class PanelViewBuilder(ViewBuilder):
  def build(self):
    self.onCondition('isSd1')
    if self.isTrue():
      self.setAccentColor('sd1')
    if self.isFalse():
      self.setAccentColor('vfx')
    self.endCondition()

    self.panel_background = Rectangle(Rect(0,0,0,0), 'panel')
    self.add(self.panel_background)

    self.addSliders(Vector(-90, -13))

    # The colored line along the base between sliders area and display area, ensuring a little overlap:
    self.addAccentColoredLine(-1, self.accent_line_y - 13, 27, 1.2)

    self.addDisplayArea(Vector(25, -13))

    # The colored line along the base between display area and buttons area:
    self.addAccentColoredLine(269, self.accent_line_y - 13, 26 - 1.5, 1.2)

    self.addButtonArea(Vector(295, -13))

    # Give us a bit of a margin
    self.view.bounds = self.view.bounds.outset(5, 5)
    # Update the background bounds to match ours.
    self.panel_background.bounds = self.view.bounds

    return self.view


class TabletViewBuilder(ViewBuilder):
  def build(self):
    self.onCondition('isSd1')
    if self.isTrue():
      self.setAccentColor('sd1')
    if self.isFalse():
      self.setAccentColor('vfx')
    self.endCondition()

    self.panel_background = Rectangle(Rect(0,0,0,0), 'panel')
    self.add(self.panel_background)

    # Volume slider
    self.beginGroup("CompactVolumeSlider", Vector(0, -13))

    self.addSlider(0, 15, 5, "volume")
    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 30, 1.2)
    # And the label above it:
    self.addLabel(0, self.accent_line_label_y, 35, "Volume", font=self.accent_line_font)

    self.endGroup()

    displayArea = self.addDisplayArea(Vector(30, -13))

    y0 = displayArea.bounds.getY(1.0) + 10

    buttonArea = self.addButtonArea(Vector(0, y0 - 13))
    buttonArea.offset.x = displayArea.bounds.getX(1.0) - buttonArea.intrinsic_bounds.w

    x1 = buttonArea.bounds.x

    self.beginGroup("PatchSelects", Vector(0, y0 - 13))
    self.addPatchSelectButton(0, 55, 9, 12, 1)
    self.addPatchSelectButton(15, 55, 9, 12, 0)

    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, 40, 1.2)
    # And the labels above it:
    self.addLabel(0, self.accent_line_label_y, 35, "Patch Select", font=self.accent_line_font)
    self.endGroup()

    self.beginGroup("CompactValueSlider", Vector(32, y0 - 13))

    # Value slider
    self.addSlider(20, 15, 3, "data_entry")

    # Increment and Decrement
    self.addIncDecButton(0, 60, "#decrement", 63, SHADE_DARK, False)
    self.addIncDecButton(0, 35, "#increment", 62, SHADE_DARK, False)

    self.addTriangleDown(5.4, 55, 5, 2.5)
    self.addTriangleUp(5.4, 30, 5, 2.5)

    # The colored line along the base:
    self.addAccentColoredLine(0, self.accent_line_y, x1 - 32, 1.2)
    # And the labels above it:
    self.addLabel(0, self.accent_line_label_y, 35, "Data Entry", font=self.accent_line_font)

    self.endGroup()

    # Give us a bit of a margin
    self.view.bounds = self.view.bounds.outset(5, 5)
    # Update the background bounds to match ours.
    self.panel_background.bounds = self.view.bounds

    return self.view

class FullViewBuilder(ViewBuilder):
  def build(self):
    background = Rectangle(Rect(0, 0, 0, 0), 'black')
    self.add(background)

    self.onCondition('isSd1')
    if self.isTrue():
      self.setAccentColor('sd1')
    if self.isFalse():
      self.setAccentColor('vfx')
    self.endCondition()

    self.panel_background = Rectangle(Rect(0,0,845,121.5), 'panel')
    self.add(self.panel_background)

    self.addSliders(Vector(120, 0))

    # The colored line along the base between sliders area and display area:
    self.addAccentColoredLine(209, self.accent_line_y, 27, 1.2)

    self.addDisplayArea(Vector(235, 0))

    # The colored line along the base between display area and buttons area:
    self.addAccentColoredLine(479, self.accent_line_y, 26 - 1.5, 1.2)

    self.addButtonArea(Vector(505, 0))

    cart_outside = Rect(720, 22, 57, 28)
    cart_inside = cart_outside.inset(2, 2)
    cart = self.add(Rectangle(cart_outside, 'body_down'))
    self.add(Media(
      cart_inside, 'cartridge', ':cart', 0, 
      present=Drawings.Cartridge, 
      absent=Drawings.CartridgeSlotCover, 
      colors = {
        'slot' : 'body_down',
        'body' : 'cartridge_body',
        'label': 'cartridge_label',
        'cover': 'body_up',
      }))
    self.addLabelAbove(cart_outside.x, cart, cart_outside.w, "Cartridge", font=self.button_font)

    self.addBackPanel(Vector(0, -32))

    self.addRectangle(0, 121.5, 845, 32 + 138, 'body')

    font = self.text_renderer.getFont('Panel').scaledToTextHeight(self.button_font.text_height)
    self.onCondition("hasSeq")
    if self.isTrue():
      self.addLabel(13, 7 + font.baseline, 88, "MUSIC PRODUCTION SYNTHESIZER", font, alignment=Alignment.STRETCH)
    if self.isFalse():
      self.addLabel(13, 7 + font.baseline, 88, "DYNAMIC COMPONENT SYNTHESIZER", font, alignment=Alignment.STRETCH)
    self.endCondition();

    y_bottom = 121.5 - 17
    eb = Drawings.EnsoniqLogo.bounds

    if self.real_logos:

      def addLogo(logo: SVGDrawing):
        b = logo.bounds
        x = 13
        y = y_bottom - b.h
        self.addShowDrawing(x, y, b.w, b.h, logo)

      self.onCondition('isSd1')
      if self.isTrue():
        self.onCondition('isSd132')
        if self.isTrue():
          addLogo(Drawings.SD132)
        if self.isFalse():
          addLogo(Drawings.SD1)
        self.endCondition()
      if self.isFalse():
        self.onCondition('hasSeq')
        if self.isTrue():
          addLogo(Drawings.VFXSD)
        if self.isFalse():
          addLogo(Drawings.VFX)
        self.endCondition()
      self.endCondition()

      self.addShowDrawing(760, y_bottom - eb.h, eb.w, eb.h, Drawings.EnsoniqLogo)

    else:
      font = self.text_renderer.getFont('Panel').scaledToTextHeight(eb.h - 1)
      self.addShowDrawing(760, y_bottom - eb.h, eb.w, eb.h, Drawings.FakeEnsoniqLogo)
      self.add(Label(762, y_bottom - eb.h + font.baseline - font.above_text + 0.5, eb.w - 2, "ensoniq", font=font, alignment=Alignment.STRETCH))

      self.onCondition('isSd1')
      if self.isTrue():
        sd1Font = self.text_renderer.getFont('Panel').scaledToCapHeight(27)
        self.onCondition('isSd132')
        if self.isTrue():
          # SD-1/32:
          voiceFont = self.text_renderer.getFont('Panel').scaledToCapHeight(5)

          self.addRectangle(13, y_bottom - 7, 67, 7, 'accent')
          self.addLabel(14, y_bottom - 1, 65, "3      2      -      V      O      I      C      E", voiceFont, alignment=Alignment.STRETCH, color = 'panel')
          self.addLabel(13, y_bottom - 10, 67, "SD-1", sd1Font, alignment=Alignment.STRETCH)
        if self.isFalse():
          # SD-1 (21)
          self.addLabel(13, y_bottom, 67, "SD-1", sd1Font, alignment=Alignment.STRETCH)

        self.endCondition()
    
      if self.isFalse():

        self.onCondition('hasSeq')
        if self.isTrue():
          # VFX-SD
          b = Drawings.VFXSD.bounds
          font = self.text_renderer.getFont('Panel').scaledToCapHeight(b.h)
          self.addLabel(13, y_bottom, b.w, "VFX-SD", font, alignment=Alignment.STRETCH)

        if self.isFalse():
          # VFX
          b = Drawings.VFX.bounds
          font = self.text_renderer.getFont('Panel').scaledToCapHeight(b.h)
          self.addLabel(13, y_bottom, b.w, "VFX", font, alignment=Alignment.STRETCH)

        self.endCondition()
      self.endCondition()

    left = 20 + 5 + 7 + 108 + 7 + 5 + 2 + 2
    h_total = 32 + 121.5 + 32 + 138 + 11
    self.addRectangle(-left, -32, 20, h_total, 'body')
    self.addRectangle(845 + 2, -32, 20, h_total, 'body')

    self.addRectangle(-(5 + 7 + 108 + 7 + 5 + 2), -32, 5 + 7 + 108 + 7 + 5, h_total, 'body')

    self.addShowDrawing(-127, 13, 118, 96, Drawings.StorageCutout, colors = {
      'top': 'body_down', 
      'left': 'body_down', 
      'right': 'body_up', 
      'bottom': 'body_up_shallow', 
    })

    self.addShowDrawing(-127, 129.5, 118, 162, Drawings.WheelAndFloppyDriveArea, colors = {
      'left': 'body_down', 
      'right': 'body_up', 
      'back': 'body_down', 
    })

    self.onCondition('hasSeq')
    if self.isTrue():
      floppy_colors = {
        'top': 'black_plastic', 
        'front': 'black_plastic_shade', 
        'slot_outer': 'black_plastic_dark', 
        'slot_inner': 'black_plastic_darker', 
        'disk': 'floppy_body',
        'label': 'floppy_label',
        'button': 'black_plastic', 
        'led': 'light_off', 
      }
      floppy_media = self.add(Media(
        Rect(-119, 129.5, 102, 13), 'floppy', ':wd1772:0:35dd', 1, 
        Drawings.FloppyDriveWithDisk, 
        Drawings.FloppyDriveEmpty,
        colors = floppy_colors))
      floppy_factor = cast(Media, floppy_media).bounds.h / Drawings.FloppyDriveWithDisk.bounds.h 
      self.addLight(-56, 129.5 + floppy_factor * 22.5, 5, floppy_factor * 2.0, 16)
    self.endCondition()

    self.addWheelArea(Vector(-122, 121.5 + 32 + 138 - 122))

    self.addKeyboard("full_keyboard", Vector(0, 121.5 + 32), 3, 5)

    self.addEllipse(2, 121.5 + 8, 6, 6, 'screwhead')    
    self.addEllipse(845 - 8, 121.5 + 8, 6, 6, 'screwhead')

    background.bounds = self.view.bounds

    return self.view


class CompactViewBuilder(ViewBuilder):
  def build(self):
    self.onCondition('isSd1')
    if self.isTrue():
      self.setAccentColor('sd1')
    if self.isFalse():
      self.setAccentColor('vfx')
    self.endCondition()

    # First, the standard panel
    self.panel_background = Rectangle(Rect(0,0,0,0), 'panel')
    self.add(self.panel_background)

    self.addSliders(Vector(-90, -13))

    # The colored line along the base between sliders area and display area:
    self.addAccentColoredLine(-1, self.accent_line_y - 13, 27, 1.2)

    self.addDisplayArea(Vector(25, -13))

    # The colored line along the base between display area and buttons area:
    self.addAccentColoredLine(269, self.accent_line_y - 13, 26 - 1.5, 1.2)

    self.addButtonArea(Vector(295, -13))

    # Give us a bit of a margin
    self.view.bounds = self.view.bounds.outset(5, 5)
    # Update the panel background bounds to match what we have so far.
    self.panel_background.bounds = self.view.bounds

    y1 = self.view.bounds.getY(1.0)
    x0 = self.view.bounds.getX(0.0)
    x1 = self.view.bounds.getX(1.0)
    yw = y1 + 32

    # reset the bounds as we add more things
    self.view.bounds = None

    # Now add the Wheen area, below on the left
    wheelArea = self.addNarrowWheelArea(Vector(x0, yw))

    kb_left = wheelArea.bounds.getX(1.0)
    kb_bottom = wheelArea.bounds.getY(1.0)
    kb_space = x1 - kb_left

    # And a reduced keyboard, aligned right
    keyboard = self.addKeyboard("compact_keyboard", Vector(0, 0), 4, 3)
    # dprint(f"keyboard bounds were: {keyboard.bounds}")

    kbb = keyboard.bounds
    scale = kb_space / kbb.w 
    kb_h = kbb.h * scale
    keyboard.bounds = Rect(kb_left, kb_bottom - kb_h, kb_space, kb_h)
    # dprint(f"keyboard bounds are now: {keyboard.bounds}")

    return self.view
