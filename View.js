Colors = {
  "VFX": "#299ca3",
  "SD1": "#db5f6a",
  "TRANSPARENT": "#00000000",
  "WHITE": "#ffffff",
  "BLACK": "#000000",
  "PANEL": "#222222",
  "GLASS": "#000000",
  "BODY": "#080808",
  "BODY_DOWN": "#040404",
  "BODY_UP": "#0c0c0c",
  "KEY_WHITE": "#f2f2e6",
  "KEY_WHITE_ACTIVE": "#f2f2e6",
  "KEY_BLACK": "#141414",
  "KEY_BLACK_ACTIVE": "#4c4c99",
  "LIGHT_OFF": "#112211",
  "LIGHT_ON": "#22ff22",
  "BLACK_PLASTIC": "#333333",
  "BLACK_PLASTIC_ACTIVE": "#666666",
  "BLACK_PLASTIC_LIGHT": "#444444",
  "BLACK_PLASTIC_SHADE": "#222222",
  "BUTTON_LIGHT": "#bbbbbb",
  "BUTTON_MEDIUM": "#777777",
  "BUTTON_DARK": "#333333",
  "BUTTON_PRESSED": "#ffffff",
  "VFD_OFF": "#0f1f1a",
  "VFD_ON": "#73fff2",
  "HALO": "#666666",
  "TEXT": "#ffffff",
  "SYMBOL": "#ffffff"
};

LabelPosition = {
  ABOVE: 1,
  ABOVE_CENTERED: 2,
  BELOW: 3
};

LightState = {
  OFF: 0,
  ON: 1,
  BLINK: 2
};

DisplayBlinkState = {
  OFF: 0,
  UNDERLINE: 1,
  CHAR: 2
};

Keyboard = {
  VFX: 'VFX',
  VFX_SD: 'VFX-SD',
  SD1: 'SD-1',
  SD1_32: 'SD-1/32'
}

segmentPaths = [
  "M1053 705 c-43 19 -57 47 -43 89 23 70 87 106 189 106 38 0 70 8 106 25 79 39 111 41 183 11 80 -34 119 -33 205 6 68 31 78 33 192 33 116 0 123 -1 195 -35 67 -31 87 -35 182 -40 101 -5 108 -7 137 -34 40 -38 50 -89 25 -118 -11 -11 -37 -29 -59 -39 -37 -17 -79 -19 -660 -18 -505 0 -626 2 -652 14z",
  "M2519 963 c-20 13 -46 47 -63 81 -28 53 -31 69 -37 199 -7 155 -20 211 -75 319 -50 99 -68 199 -54 301 23 167 52 217 126 217 37 0 47 -5 77 -40 53 -63 74 -151 97 -410 5 -63 16 -167 24 -230 42 -326 45 -374 21 -419 -24 -47 -63 -54 -116 -18z",
  "M2144 1089 c-59 43 -88 78 -135 161 -23 41 -75 112 -115 156 -108 119 -132 188 -136 386 -3 107 -1 118 17 132 11 9 28 16 37 16 25 0 92 -63 154 -145 29 -39 100 -129 158 -200 58 -72 113 -144 121 -162 19 -40 32 -106 41 -214 5 -68 3 -91 -9 -116 -28 -52 -74 -57 -133 -14z",
  "M1515 1089 c-70 43 -69 41 -77 285 -3 121 -11 259 -18 306 -6 47 -13 142 -17 211 -6 141 5 183 54 195 78 20 124 -53 135 -216 13 -192 26 -274 61 -385 77 -245 76 -359 -3 -400 -39 -20 -99 -19 -135 4z",
  "M1108 1087 c-32 36 -42 71 -50 163 -5 52 -11 122 -14 156 -6 55 -1 75 41 200 53 152 59 165 87 183 16 10 24 9 44 -4 31 -20 43 -51 55 -135 5 -36 17 -97 26 -137 14 -63 15 -81 3 -145 -37 -205 -43 -222 -88 -271 -30 -32 -80 -37 -104 -10z",
  "M797 938 c-32 36 -44 102 -67 377 -19 222 -30 337 -42 428 -17 138 12 277 67 313 55 36 123 -6 173 -109 52 -106 54 -167 12 -292 -27 -78 -30 -102 -30 -205 0 -79 7 -147 20 -210 11 -51 20 -111 20 -133 0 -123 -97 -231 -153 -169z",
  "M1940 2120 c-14 4 -56 8 -94 9 -80 1 -141 26 -181 73 -32 38 -32 78 1 118 48 56 84 67 249 74 146 7 151 7 195 -17 52 -27 99 -89 100 -130 0 -33 -31 -81 -63 -98 -27 -15 -125 -38 -157 -38 -14 1 -36 5 -50 9z",
  "M1099 2129 c-51 10 -110 43 -132 73 -28 37 -16 88 32 138 36 38 41 40 95 40 64 0 115 -22 159 -68 32 -34 46 -97 28 -130 -23 -43 -109 -68 -182 -53z",
  "M2279 2467 c-56 50 -69 80 -80 186 -6 51 -16 127 -24 169 -14 83 -10 123 25 213 36 95 44 146 31 203 -14 66 -14 205 -1 254 12 41 70 98 100 98 52 0 75 -100 100 -435 6 -77 22 -241 36 -364 28 -255 27 -268 -37 -325 -54 -49 -94 -49 -150 1z",
  "M1701 2579 c-24 24 -40 122 -44 261 -2 95 1 112 27 178 15 41 44 94 63 119 19 25 57 92 84 149 58 121 94 164 137 164 38 0 78 -32 90 -73 19 -60 22 -181 7 -238 -20 -77 -116 -277 -180 -376 -30 -46 -66 -106 -80 -133 -35 -69 -69 -86 -104 -51z",
  "M1372 2456 c-40 28 -52 66 -52 166 0 92 -27 323 -55 468 -21 108 -19 246 3 290 21 44 59 65 96 56 47 -12 123 -92 146 -152 28 -77 28 -203 -1 -281 -21 -55 -22 -62 -10 -218 6 -88 14 -178 16 -201 6 -54 -11 -110 -38 -129 -28 -19 -76 -19 -105 1z",
  "M1067 2721 c-19 11 -122 161 -156 228 -42 81 -51 129 -51 276 0 113 3 147 18 175 39 80 102 35 199 -141 28 -52 56 -112 62 -134 6 -22 11 -114 11 -205 0 -134 -3 -170 -16 -188 -16 -24 -39 -27 -67 -11z",
  "M695 2447 c-45 23 -76 54 -91 90 -8 18 -18 101 -24 190 -18 298 -21 328 -52 516 -26 164 -29 194 -18 235 23 91 68 107 130 44 46 -45 59 -86 71 -217 5 -55 13 -143 18 -195 11 -120 37 -199 101 -302 48 -78 50 -85 50 -153 0 -95 -15 -143 -60 -187 -42 -42 -75 -48 -125 -21z",
  "M1550 3539 c-14 5 -57 24 -97 44 -107 54 -134 56 -218 12 -79 -42 -105 -41 -170 3 -35 23 -53 28 -145 33 -131 8 -181 24 -194 62 -14 39 9 78 54 94 49 17 1278 18 1315 1 51 -23 42 -87 -18 -132 -21 -15 -48 -21 -115 -26 -77 -4 -94 -9 -140 -38 -85 -55 -195 -76 -272 -53z",
  "M2619 3393 c-19 12 -45 43 -59 67 -36 65 -36 183 0 255 48 93 136 107 207 33 60 -61 76 -152 48 -257 -17 -63 -45 -97 -94 -111 -52 -14 -64 -13 -102 13z",
  "M512 4422 c-38 8 -46 15 -63 51 -37 83 -18 153 51 181 36 14 127 16 863 16 642 0 827 -3 847 -13 16 -8 31 -31 44 -64 16 -46 17 -57 5 -94 -8 -24 -26 -51 -42 -63 -28 -21 -34 -21 -845 -23 -501 0 -834 3 -860 9z",
];
charWidth = 342;
charHeight = 572;
segmentScale = 0.1;

function createElement(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function showElement(e) {
  e.removeAttribute("display");
}

function hideElement(e) {
  e.setAttribute("display", "none");
}

var _svg = null;
function svg() {
  if (_svg == null) {
    _svg = document.getElementsByTagName('svg')[0];
  }
  return _svg;
}

var _pt = null;
function pt() {
  if (_pt == null) {
    _pt = svg().createSVGPoint();
  }
  return _pt;
}

function pointIn(el, x, y) {
  var p = pt();
  p.x = x; p.y = y;
  return p.matrixTransform(el.getScreenCTM().inverse());
}

class Display {
  constructor(parent, rows, cols) {
    this.cells = new Array();
    this.width = charWidth * cols;
    this.height = charHeight * rows;
    this.blinkPhase = true;

    var templateCell = createElement("g");
    templateCell.setAttribute('transform', 'scale(' + segmentScale + ',' + segmentScale + ')');
    for (var i = 0; i < segmentPaths.length; i++) {
      var segmentPath = createElement("path");
      segmentPath.setAttribute('d', segmentPaths[i]);
      templateCell.appendChild(segmentPath);
    }

    for (var row = 0; row < 2; row++) {
      this.cells[row] = new Array();
      for (var col = 0; col < 40; col++) {
        this.cells[row][col] = {
          char: ' ',
          blink: false,
          underline: false,
          segments: new Array(),
        };
        var charCell = templateCell.cloneNode(true);
        var ctm = "translate(" + col * charWidth + ", " + row * charHeight + ") " + charCell.getAttribute("transform");
        charCell.setAttribute("transform", ctm);
        parent.appendChild(charCell);

        var segs = charCell.getElementsByTagName("path");
        for (var cc = 0; cc < segs.length; cc++) {
          this.cells[row][col].segments[cc] = segs[cc];
        }
      }
    }
    parent.setAttribute("viewBox", "0 0 " + this.width + " " + this.height);
  }

  static segmentsByCharacter = [
    0x0000, //  0000 0000 0000 0000 SPACE
    0x7927, //  0011 1001 0010 0111 '0.'
    0x0028, //  0000 0000 0010 1000 '"'
    0x4408, //  0000 0100 0000 1000 '1.'
    0x25e9, //  0010 0101 1110 1001 '$'
    0x70c3, //  0011 0000 1100 0011 '2.'
    0x0000, //  0000 0000 0000 0000 '&'
    0x0010, //  0000 0000 0001 0000 '''
    0x61c3, //  0010 0001 1100 0011 '3.'
    0x41e2, //  0000 0001 1110 0010 '4.'
    0x0edc, //  0000 1110 1101 1100 '*'
    0x04c8, //  0000 0100 1100 1000 '+'
    0x0000, //  0000 0000 0000 0000 ','
    0x00c0, //  0000 0000 1100 0000 '-'
    0x4000, //  0100 0000 0000 0000 '.'
    0x0804, //  0000 1000 0000 0100 '/'
    0x3927, //  0011 1001 0010 0111 '0'
    0x0408, //  0000 0100 0000 1000 '1'
    0x30c3, //  0011 0000 1100 0011 '2'
    0x21c3, //  0010 0001 1100 0011 '3'
    0x01e2, //  0000 0001 1110 0010 '4'
    0x21e1, //  0010 0001 1110 0001 '5'
    0x31e1, //  0011 0001 1110 0001 '6'
    0x0103, //  0000 0001 0000 0011 '7'
    0x31e3, //  0011 0001 1110 0011 '8'
    0x21e3, //  0010 0001 1110 0011 '9'
    0x0000, //  0000 0000 0000 0000 ':'
    0x71e1, //  0011 0001 1110 0001 '6.'
    0x0204, //  0000 0010 0000 0100 '('
    0x20c0, //  0010 0000 1100 0000 '='
    0x0810, //  0000 1000 0001 0000 ')'
    0x0000, //  0000 0000 0000 0000 '?'
    0x3583, //  0011 0101 1000 0011 '@'
    0x11e3, //  0001 0001 1110 0011 'A'
    0x254b, //  0010 0101 0100 1011 'B'
    0x3021, //  0011 0000 0010 0001 'C'
    0x250b, //  0010 0101 0000 1011 'D'
    0x30e1, //  0011 0000 1110 0001 'E'
    0x10e1, //  0001 0000 1110 0001 'F'
    0x3161, //  0011 0001 0110 0001 'G'
    0x11e2, //  0001 0001 1110 0010 'H'
    0x2409, //  0010 0100 0000 1001 'I'
    0x3102, //  0011 0001 0000 0010 'J'
    0x12a4, //  0001 0010 1010 0100 'K'
    0x3020, //  0011 0000 0010 0000 'L'
    0x1136, //  0001 0001 0011 0110 'M'
    0x1332, //  0001 0011 0011 0010 'N'
    0x3123, //  0011 0001 0010 0011 'O'
    0x10e3, //  0001 0000 1110 0011 'P'
    0x3323, //  0011 0011 0010 0011 'Q'
    0x12e3, //  0001 0010 1110 0011 'R'
    0x21e1, //  0010 0001 1110 0001 'S'
    0x0409, //  0000 0100 0000 1001 'T'
    0x3122, //  0011 0001 0010 0010 'U'
    0x1824, //  0001 1000 0010 0100 'V'
    0x1b22, //  0001 1011 0010 0010 'W'
    0x0a14, //  0000 1010 0001 0100 'X'
    0x0414, //  0000 0100 0001 0100 'Y'
    0x2805, //  0010 1000 0000 0101 'Z'
    0x3021, //  0011 0000 0010 0001 '['
    0x71e3, //  0011 0001 1110 0011 '8.'
    0x2103, //  0010 0001 0000 0011 ']'
    0x0a00, //  0000 1010 0000 0000 '^'
    0x2000, //  0010 0000 0000 0000 '_'
    0x0010, //  0000 0000 0001 0000 '`'
    0x11e3, //  0001 0001 1110 0011 'a'
    0x254b, //  0010 0101 0100 1011 'b'
    0x3021, //  0011 0000 0010 0001 'c'
    0x250b, //  0010 0101 0000 1011 'd'
    0x30e1, //  0011 0000 1110 0001 'e'
    0x10e1, //  0001 0000 1110 0001 'f'
    0x3161, //  0011 0001 0110 0001 'g'
    0x11e2, //  0001 0001 1110 0010 'h'
    0x2409, //  0010 0100 0000 1001 'i'
    0x3102, //  0011 0001 0000 0010 'j'
    0x12a4, //  0001 0010 1010 0100 'k'
    0x3020, //  0011 0000 0010 0000 'l'
    0x1136, //  0001 0001 0011 0110 'm'
    0x1332, //  0001 0011 0011 0010 'n'
    0x3123, //  0011 0001 0010 0011 'o'
    0x10e3, //  0001 0000 1110 0011 'p'
    0x3323, //  0011 0011 0010 0011 'q'
    0x12e3, //  0001 0010 1110 0011 'r'
    0x21e1, //  0010 0001 1110 0001 's'
    0x0409, //  0000 0100 0000 1001 't'
    0x3122, //  0011 0001 0010 0010 'u'
    0x1824, //  0001 1000 0010 0100 'v'
    0x1b22, //  0001 1011 0010 0010 'w'
    0x0a14, //  0000 1010 0001 0100 'x'
    0x0414, //  0000 0100 0001 0100 'y'
    0x2805, //  0010 1000 0000 0101 'z'
    0x3021, //  0011 0000 0010 0001 '{'
    0x0408, //  0000 0100 0000 1000 '|'
    0x2103, //  0010 0001 0000 0011 '}'
    0x0a00, //  0000 1010 0000 0000 '~'
    0x0000, //  0000 0000 0000 0000 DEL
  ];

  static colorOn = Colors.VFD_ON;
  static colorOff = Colors.VFD_OFF;
  static overdraw = 0;

  showSegments(segments, lit) {
    // debugger;
    var mask = 1;
    var i;
    for (var i = 0; i < 16; i++) {
      var on = (lit & mask) != 0;
      segments[i].setAttribute("fill", on ? Display.colorOn : Display.colorOff);
      if (Display.overdraw) {
        segments[i].setAttribute("stroke-width", Display.overdraw);
        if (on) {
          segments[i].setAttribute("stroke", Display.colorOn);
        } else {
          segments[i].setAttribute("stroke", "none");
        }
      } else {
        segments[i].setAttribute("stroke", "none");
      }
      mask <<= 1;
    }
  }

  static segmentsForCharacter(c, underline, blink, blinkPhase) {
    var lit = (c < 0x20 || 0x7f < c) ? 0 : Display.segmentsByCharacter[c - 0x20];
    if (blink && !blinkPhase) {
      if (underline) {
        return lit;
      } else {
        return 0;
      }
    } else {
      if (underline) {
        return lit | 0x8000;
      } else {
        return lit;
      }
    }
  }

  setChar(y, x, c, underline, blink) {
    // console.log(`display.setChar(${y}, ${x}, "${c}", ul=${underline}, bl=${blink}`);
    var cell = this.cells[y][x];
    cell.char = c;
    cell.underline = underline;
    cell.blink = blink;

    this.showSegments(cell.segments, Display.segmentsForCharacter(c, underline, blink, this.blinkPhase));
  }

  showString(y, x, s) {
    for (var i = 0; i < s.length; i++) {
      this.setChar(y, x, s.charCodeAt(i), false, false);
      x++;
      if (x >= this.cells[y].length) {
        x = 0;
        y++;
      }
      if (y >= this.cells.length) {
        y = 0;
      }
    }
  }

  clear() {
    for (var row = 0; row < this.cells.length; row++) {
      var line = this.cells[row];
      for (var col = 0; col < line.length; col++) {
        this.setChar(row, col, ' ', false, false);
      }
    }
  }

  blink(y, x) {
    return this.cells[y][x].blink;
  }

  underline(y, x) {
    return this.cells[y][x].underline;
  }

  setBlinkPhase(phase) {
    this.blinkPhase = phase;
    for (var row = 0; row < this.cells.length; row++) {
      var line = this.cells[row];
      for (var col = 0; col < line.length; col++) {
        var cell = line[col];
        if (cell.blink) {
          this.showSegments(cell.segments,
            Display.segmentsForCharacter(cell.char, cell.underline, cell.blink, this.blinkPhase));
        }
      }
    }
  }
}

class Rect { 
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  static from(e) {
    let x = parseFloat(e.getAttribute('x'));
    let y = parseFloat(e.getAttribute('y'));
    let w = parseFloat(e.getAttribute('width'));
    let h = parseFloat(e.getAttribute('height'));
    return new Rect(x, y, w, h);
  }

  static fromViewBox(e) {
    let parts = e.getAttribute('viewBox').split(' ');
    let x = parseFloat(parts[0]);
    let y = parseFloat(parts[1]);
    let w = parseFloat(parts[2]);
    let h = parseFloat(parts[3]);
    return new Rect(x, y, w, h);
  }

  toString() {
    return `Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
  }

  union(other) {
    if (this.w == 0 || this.h == 0) {
      return other;
    } else if (other.w == 0 || other.h == 0) {
      return this;
    } else {
      let minX = Math.min(this.x, other.x);
      let maxX = Math.max(this.x+this.w, other.x+other.w);
      let minY = Math.min(this.y, other.y);
      let maxY = Math.max(this.y+this.h, other.y+other.h);
      return new Rect(minX, minY, maxX-minX, maxY-minY);
    }
  }

  inset(dx, dy) {
    return new Rect(this.x + dx, this.y + dy, this.w - 2*dx, this.h - 2*dy);
  }

  outset(dx, dy) {
    return new Rect(this.x - dx, this.y - dy, this.w + 2*dx, this.h + 2*dy);
  }

  offset(dx, dy) {
    return new Rect(this.x+dx, this.y+dy, this.w, this.h);
  }

  toPath(r) {
    var rect = createElement("rect");
    rect.setAttribute("x", this.x);
    rect.setAttribute("y", this.y);
    rect.setAttribute("width", this.w);
    rect.setAttribute("height", this.h);
    if (r != null) {
      rect.setAttribute("rx", r);
      rect.setAttribute("ry", r);
    }
    return rect;
  }

  getX(d) {
    return this.x + d * this.w;
  }

  getY(d) {
    return this.y + d * this.h;
  }

  viewBox() {
    return `${this.x} ${this.y} ${this.w} ${this.h}`
  }

  applyTo(e) {
    e.setAttribute('x', `${this.x}`);
    e.setAttribute('y', `${this.y}`);
    e.setAttribute('width', `${this.w}`);
    e.setAttribute('height', `${this.h}`);
  }
}

displayRect = new Rect(37.5, 16.25, 205, 30);
displayGlassRect = new Rect(25, -5, 230, 67.5);

class PatchSelectButton {
  constructor(x, y, w, h, number) {
    var that = this;
    this.rect = new Rect(x, y, w, h);

    var rect = this.rect.inset(0.25, 0.25);
    var translation = "translate(" + x + "," + y + ")";
    this.halo = rect.toPath(1.25);
    this.halo.setAttribute("stroke", Colors.HALO);
    this.halo.setAttribute("stroke-width", "5");
    this.halo.setAttribute("fill", "none");
    hideElement(this.halo);

    rect = rect.offset(-rect.x, -rect.y)
    this.outline = rect.toPath(0.0);
    this.outline.setAttribute("fill", Colors.BUTTON_LIGHT);
    this.outline.setAttribute("stroke", "none");

    this.group = createElement("g");
    this.group.setAttribute("transform", translation);
    this.group.appendChild(this.outline);

    this.value = number;
    this.color = Colors.BUTTON_LIGHT;

    this.group.addEventListener("touchstart", function(e) { that.press(e); }, true);
    this.group.addEventListener("touchend", function(e) { that.release(e); }, true);
    this.group.addEventListener("mousedown", function(e) { that.press(e); }, true);
    this.group.addEventListener("mouseout", function(e) { that.release(e); }, true);
    this.group.addEventListener("mouseup", function(e) { that.release(e); }, true);

    this.isPressed = false;

    this.onPress = undefined;
    this.onRelease = undefined;
  }

  showPressed(isPressed) {
    if (isPressed) {
      showElement(this.halo);
    } else {
      hideElement(this.halo);
    }
  }

  press(e) {
    e.preventDefault();

    if (!this.isPressed) {
      this.isPressed = true;
      this.showPressed(true);

      if (this.onPress != undefined) {
        this.onPress(this);
      }
    }

    return false;
  }

  release(e) {
    e.preventDefault();

    if (this.isPressed) {
      this.isPressed = false;
      this.showPressed(false);

      if (this.onRelease != undefined) {
        this.onRelease(this);
      }
    }

    return false;
  }
}

class Button {
  constructor(x, y, w, h, number, color) {
    var that = this;
    this.rect = new Rect(x, y, w, h);

    var rect = this.rect.inset(0.25, 0.25);
    var translation = "translate(" + x + "," + y + ")";
    this.halo = rect.toPath(1.25);
    this.halo.setAttribute("stroke", Colors.HALO);
    this.halo.setAttribute("stroke-width", "5");
    this.halo.setAttribute("fill", "none");
    hideElement(this.halo);

    rect = rect.offset(-rect.x, -rect.y)
    this.outline = rect.toPath(1.25);
    this.outline.setAttribute("fill", color);
    this.outline.setAttribute("stroke", "none");

    this.group = createElement("g");
    this.group.setAttribute("transform", translation);
    this.group.appendChild(this.outline);

    this.value = number;
    this.color = color;

    this.group.addEventListener("touchstart", function(e) { that.press(e); }, true);
    this.group.addEventListener("touchend", function(e) { that.release(e); }, true);
    this.group.addEventListener("mousedown", function(e) { that.press(e); }, true);
    this.group.addEventListener("mouseout", function(e) { that.release(e); }, true);
    this.group.addEventListener("mouseup", function(e) { that.release(e); }, true);

    this.isPressed = false;

    this.onPress = undefined;
    this.onRelease = undefined;
  }

  addLight(light) {
    this.group.appendChild(light.group);
  }

  showPressed(isPressed) {
    if (isPressed) {
      showElement(this.halo);
    } else {
      hideElement(this.halo);
    }
  }

  press(e) {
    e.preventDefault();

    if (!this.isPressed) {
      this.isPressed = true;
      this.showPressed(true);

      if (this.onPress != undefined) {
        this.onPress(this);
      }
    }

    return false;
  }

  release(e) {
    e.preventDefault();

    if (this.isPressed) {
      this.isPressed = false;
      this.showPressed(false);

      if (this.onRelease != undefined) {
        this.onRelease(this);
      }
    }

    return false;
  }
}

class Light {
  constructor(x, y, w, h, number) {
    this.rect = new Rect(x, y, w, h);

    this.number = number;
    this.state = LightState.OFF;
    this.isOn = false;
    this.blinkPhase = 0;

    this.group = createElement("g")

    this.lightOn = this.rect.toPath();
    this.lightOff = this.lightOn.cloneNode(true);
    this.lightOn.setAttribute("fill", Colors.LIGHT_ON);
    this.lightOff.setAttribute("fill", Colors.LIGHT_OFF);
    hideElement(this.lightOn);

    this.group.appendChild(this.lightOn);
    this.group.appendChild(this.lightOff);
  }

  update() {
    var on = this.state == LightState.ON || (this.blinkPhase && this.state == LightState.BLINK);
    if (on != this.isOn) {
      hideElement(this.isOn ? this.lightOn : this.lightOff);
      this.isOn = on;
      showElement(this.isOn ? this.lightOn : this.lightOff);
    }
  }

  setState(state) {
    this.state = state;
    this.update();
  }

  setBlinkPhase(phase) {
    this.blinkPhase = phase;
    this.update();
  }
}

class Touch {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static makeTouch(e) {
    return new Touch(e.clientX, e.clientY);
  }
}

function makeRectPath(x, y, w, h, color) {
  let path = new Rect(x, y, w, h).toPath();
  path.setAttribute("fill", color);
  return path;
}

class Slideable {
  constructor(x, y, w, h, channel, value) {
    var that = this;
    this.channel = channel;
    this.value = value;

    this.rect = new Rect(x, y, w, h);
    var rect = this.rect.offset(-x, -y);
    var translation = "translate(" + x + "," + y + ")";
    this.group = createElement("g");
    this.group.setAttribute("transform", translation);

    this.populate(rect);

    this.setValue(value);

    this.handle.addEventListener("touchstart", function(e) { that.touchstart(e); }, true);
    this.group.addEventListener("touchmove", function(e) { that.touchmove(e); }, true);
    this.group.addEventListener("touchend", function(e) { that.touchend(e); }, true);
    this.group.addEventListener("touchcancel", function(e) { that.touchend(e); }, true);

    this.handle.addEventListener("mousedown", function(e) { that.grab(e.clientX, e.clientY); }, true);
    this.group.addEventListener("mousemove", function(e) { that.drag(e.clientX, e.clientY); }, true);
    this.group.addEventListener("mouseup", function(e) { that.release(); }, true);

    this.onValueChanged = undefined;
    this.isGrabbed = false;
    this.activeTouches = new Map();
  }

  setValue(value) {
    this.value = Math.max(0.0, Math.min((1.0, value)));
    this.handleY = Math.max(this.handleMinY, 
      Math.min(this.handleMaxY, 
        this.handleMinY + (1.0 - value) * (this.handleMaxY - this.handleMinY)
      ));
    this.handle.setAttribute("transform", "translate(" + this.handleX + "," + this.handleY + ")");
  }

  setHandleY(handleY) {
    this.handleY = Math.max(this.handleMinY, Math.min(this.handleMaxY, handleY));
    // console.log("Setting handleY to " + handleY + " => " + this.handleY);
    this.value = 1.0 - (this.handleY - this.handleMinY) / (this.handleMaxY - this.handleMinY);
    this.handle.setAttribute("transform", "translate(" + this.handleX + "," + this.handleY + ")");
  }

  grab(x, y) {
    this.isGrabbed = true;
    this.frame.setAttribute("stroke", this.frameActiveColor);
    var p = pointIn(this.group, x, y);
    this.dragOffset = p.y - this.handleY;
    // console.log("Grabbing with handleY=" + this.handleY + ", p.y=" + p.y + " => dragOffset=" + this.dragOffset);
  }

  drag(x, y) {
    if (this.isGrabbed) {
      var p = pointIn(this.group, x, y);
      var newHandleY = p.y - this.dragOffset;
      // console.log("Dragged with p.y=" + p.y + ", dragOffset=" + this.dragOffset + " => new handleY=" + newHandleY);
      this.setHandleY(newHandleY);
      if (this.onValueChanged != null) {
        this.onValueChanged(this);
      }
    }
  }

  release(e) {
    this.isGrabbed = false;
    this.frame.setAttribute("stroke", this.frameColor);
  }

  activeTouchCenter() {
    var n = this.activeTouches.size;
    if (n <= 0) {
      return undefined;
    }
    var x = 0;
    var y = 0;

    for (var touch of this.activeTouches.values()) {
      x += touch.x;
      y += touch.y;
    }

    return new Touch(x / n, y / n);
  }

  touchstart(e) {
    e.preventDefault();

    var wasEmpty = this.activeTouches.size == 0;
    for (var i = 0; i < e.targetTouches.length; i++) {
      var touch = e.targetTouches.item(i);
      this.activeTouches.set(touch.identifier, makeTouch(touch));
    }

    center = this.activeTouchCenter();
    if (center != null) {
      this.grab(center.x, center.y);
    }

    return false;
  }

  touchmove(e) {
    e.preventDefault();

    for (var i = 0; i < e.changedTouches.length; i++) {
      var touch = e.changedTouches.item(i);
      if (this.activeTouches.has(touch.identifier)) {
        this.activeTouches.set(touch.identifier, makeTouch(touch));
      }
    }
    center = this.activeTouchCenter();
    if (center != null) {
      this.drag(center.x, center.y);
    }

    return false;
  }

  touchend(e) {
    e.preventDefault();

    for (var i = 0; i < e.changedTouches.length; i++) {
      var touch = e.changedTouches.item(i);
      this.activeTouches.delete(touch.identifier)
    }
    if (this.activeTouches.size == 0) {
      this.release();
    } else {
      center = this.activeTouchCenter();
      if (center != null) {
        this.grab(center.x, center.y);
      }
    }

    return false;
  }
}

class Slider extends Slideable {
  constructor(x, y, w, h, channel, value) {
    super(x, y, w, h, channel, value);
  }

  populate(rect) {
    this.frameColor = Colors.BLACK_PLASTIC;
    this.frameActiveColor = Colors.BLACK_PLASTIC_ACTIVE;
    this.frame = rect.inset(0.625, 0.625).toPath();
    this.frame.setAttribute("stroke", this.frameColor);
    this.frame.setAttribute("stroke-width", "1.25");
    this.group.appendChild(this.frame);

    this.handleX = 1.875;
    this.handleW = rect.w - 3.75;
    this.handleH = 10;
    this.handleMinY = 2.875;
    this.handleMaxY = rect.h - 3.75 - this.handleH;

    this.handle = createElement("g");
    this.handle.appendChild(makeRectPath(0, 0, this.handleW, this.handleH, Colors.BLACK_PLASTIC));
    this.handle.appendChild(makeRectPath(0, 0, this.handleW, 1.875, Colors.BLACK_PLASTIC_LIGHT));
    this.handle.appendChild(makeRectPath(0, 4.375, this.handleW, 0.625, Colors.BLACK_PLASTIC_SHADE));
    this.handle.appendChild(makeRectPath(0, 5, this.handleW, 0.625, Colors.BLACK_PLASTIC_LIGHT));
    this.handle.appendChild(makeRectPath(0, 8.175, this.handleW, 1.875, Colors.BLACK_PLASTIC_SHADE));
    this.group.appendChild(this.handle);
  }
}

class Wheel extends Slideable {
  constructor(x, y, w, h, channel, value, autocenter = false) {
    super(x, y, w, h, channel, value);
    this.autocenter = autocenter;
    console.log(`constructing Wheel(${x},${y},${w},${h}, ${channel},${value}, ${autocenter})`)
  }

  populate(rect) {
    this.frameColor = Colors.BLACK_PLASTIC;
    this.frameActiveColor = Colors.BLACK_PLASTIC_ACTIVE;
    this.frame = rect.inset(0.625, 0.625).toPath();
    this.frame.setAttribute("stroke", this.frameColor);
    this.frame.setAttribute("stroke-width", "1.25");
    this.group.appendChild(this.frame);

    let body = makeRectPath(3, 5, rect.w - 6, rect.h - 10, Colors.BLACK_PLASTIC);
    this.group.appendChild(body);

    this.handleX = 3;
    this.handleW = rect.w - 6
    this.handleH = 10;
    this.handleMinY = 5;
    this.handleMaxY = rect.h - 5 - this.handleH;

    this.handle = createElement("g");
    this.handle.appendChild(makeRectPath(0, 0, this.handleW, 3, Colors.BLACK_PLASTIC_SHADE));
    this.handle.appendChild(makeRectPath(0, 3, this.handleW, 4, Colors.BLACK_PLASTIC));
    this.handle.appendChild(makeRectPath(0, 7, this.handleW, 3, Colors.BLACK_PLASTIC_LIGHT));
    this.group.appendChild(this.handle);
  }

  release(e) {
    super.release(e)
    if (this.autocenter) {
      this.setValue(0.5);
    }
  }
}

class Connector {
  constructor(serverUrl, keyboard, version) {
    this.serverUrl = serverUrl;
    this.keyboard = keyboard;
    this.version = version;
    this.reconnect = true;

    this.patchSelectStatus = 0;

    this.root = createElement("svg");
    this.root.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.root.setAttribute("width", "800");
    this.root.setAttribute("height", "600");
    this.root.setAttribute("overflow", "scroll");

    this.startConnection();
  }

  setBlinkPhase(blinkPhase) {
    this.blinkPhase = blinkPhase % 4;
    this.display.setBlinkPhase(this.blinkPhase & 2);
    var lightPhase = (this.blinkPhase & 1) == 0;
    for (var i = 0; i < this.lights.length; i++) {
      if (typeof(this.lights[i] != 'undefined')) {
       this.lights[i].setBlinkPhase(lightPhase);
      }
    }
  }

  showMessage(message) {
    this.serverMessage = message;
    this.messageText.replaceChildren(document.createTextNode(message));
    if (message != null && message.length == 0) {
      hideElement(this.messageBox);
    } else {
      showElement(this.messageBox);
    }
  }

  connect() {
    var that = this;
    var view = this;
    var reconnect = function() {
      that.connect();
    }

    this.socket = new WebSocket(this.serverUrl);

    this.socket.onopen = function(event) {
      // console.log("opened: {event}");
      // clear our 'connecting' message
      view.showMessage('');
      view.sendString("I"); // Request server information
    };

    this.socket.onmessage = function(event) {
      var data = event.data;
      var c = data[0];
      var rest = data.slice(1).trim();

      // console.log(`Handling message '${data}'`);

      if (c == 'A') {
        // console.log("handling analog value")
        view.handleAnalogValue(rest);
      } else if (c == 'B') {
        // console.log("handling button state")
        view.handleButtonState(rest);
      } else if (c == 'D') {
        // console.log("handling display data")
        view.handleDisplayData(rest);
      } else if (c == 'L') {
        // console.log("handling Light state")
        view.handleLightState(rest);
      } else if (c == 'P') {
        // console.log("handling blink Phase")
        view.handleBlinkPhase(rest);
      } else if (c == 'I') {
        // console.log("handling server information");
        view.handleServerInformation(rest);
      } else if (c == 'M') {
        // console.log("handling server message");
        view.handleServerMessage(rest);
      }
    };

    this.socket.onclose = function(event) {
      // console.log("closed: ", event);
      if (view.reconnect) {
        view.showMessage("Reconnecting to server ...");
        view.needRefresh = true;
        // reconnect after 1 second
        setTimeout(reconnect, 1000);
      } else {
        // console.log("not reconnecting.")
      }
    };

    this.socket.onerror = function(event) {
      console.log("web socket error: ", event);
    };
  }

  disconnect() {
    this.reconnect = false;
    this.socket.close();
  }

  addPatchSelectButton(x, y, w, h, number) {
    var that = this;
    var button = new PatchSelectButton(x, y, w, h, number);
    this.haloContainer.appendChild(button.halo);

    this.mainContainer.appendChild(button.group);
    this.buttons[number] = button;

    button.onPress = function(b) {
      that.onPatchSelectButtonPressed(b);
    }
    button.onRelease = function(b) {
      that.onPatchSelectButtonReleased(b);
    }

    return button;
  }

  addButton(x, y, w, h, number, color) {
    var that = this;
    var button = new Button(x, y, w, h, number, color);
    this.haloContainer.appendChild(button.halo);

    this.mainContainer.appendChild(button.group);
    this.buttons[number] = button;

    button.onPress = function(b) {
      that.onButtonPressed(b);
    }
    button.onRelease = function(b) {
      that.onButtonReleased(b);
    }

    return button;
  }

  addLabel(x, y, w, h, label, fontSize, bold = false, italic = false, centered = False) {
    var labelText = createElement("text");
    labelText.setAttribute('fill', 'white');
    labelText.setAttribute('stroke', 'none');
    labelText.setAttribute('font-size', fontSize);
    labelText.setAttribute('font-family', 'Helvetica');
    if (bold) {
      labelText.setAttribute('font-weight', 'bold');
    }
    if (italic) {
      labelText.setAttribute('font-style', 'italic');
    }
    labelText.setAttribute('y', y + 0.7 * fontSize);
    if (centered) {
      labelText.setAttribute('x', x + w/2);
      labelText.setAttribute('text-anchor', 'middle');
    } else {
      labelText.setAttribute('x', x);
    }
    labelText.setAttribute("style", "pointer-events:none");
    labelText.appendChild(document.createTextNode(label));
    this.labelContainer.appendChild(labelText);
  }

  addLight(x, y, w, h, number) {
    var light = new Light(x, y, w, h, number);
    let old = this.lights[number];
    if (old !== undefined) {
      light.setState(old.state);
      light.setBlinkPhase(old.blinkPhase);
    }
    this.lights[number] = light;
    return light;
  }

  addSlider(x, y, w, h, channel, value) {
    var that = this;
    var slider = new Slider(x, y, w, h, channel, value);

    this.mainContainer.appendChild(slider.group);
    this.analogControls[channel] = slider;

    slider.onValueChanged = function(s) {
      that.onAnalogValueChanged(s);
    }

    return slider;
  }

  addWheel(x, y, w, h, channel, value, autocenter = false) {
    var that = this;
    var wheel = new Wheel(x, y, w, h, channel, value, autocenter);

    this.mainContainer.appendChild(wheel.group);
    this.analogControls[channel] = wheel;

    wheel.onValueChanged = function(s) {
      that.onAnalogValueChanged(s);
    }

    return wheel;
  }

  addRectangle(x, y, w, h, color) {
    let rectangle = createElement("rect");
    rectangle.setAttribute("x", x);
    rectangle.setAttribute("y", y);
    rectangle.setAttribute("width", w);
    rectangle.setAttribute("height", h);
    rectangle.setAttribute("fill", color);
    this.decorationsContainer.appendChild(rectangle);
  }

  makeFilledPath(path, color) {
    let element = createElement("path")
    element.setAttribute("stroke", "none");
    element.setAttribute("fill", color);
    element.setAttribute("d", path);
    return element;
  }

  addFilledPath(path, color) {
    this.decorationsContainer.appendChild(this.makeFilledPath(path, color));
  }

  addSymbol(x, y, w, h, symbolName) {
    if (symbolName == 'triangle_up') {
      this.addFilledPath(`M${x} ${y+h}h${w}l${-w/2} ${-h}z`, Colors.SYMBOL);
    } else if (symbolName == 'triangle_down') {
      this.addFilledPath(`M${x} ${y}h${w}l${-w/2} ${h}z`, Colors.SYMBOL);
    } else if (symbolName == "logo") {
      let rect = new Rect(x, y, w, h).inset(0.5, 0.5).toPath(1.0);
      rect.setAttribute("name", "LOGO");
      rect.setAttribute("fill", "none");
      rect.setAttribute("stroke", Colors.SYMBOL);
      rect.setAttribute("stroke-width", "1");
      this.decorationsContainer.appendChild(rect);
      console.log(`Adding Logo:`);
      console.log(rect);
    }
  }
 
  selectView(view) {
    var oldDisplay = this.display;
    var oldLights = this.lights;

    this.populate(this.keyboard, view);

    if (this.serverMessage != null) {
      this.showMessage(this.serverMessage);
    }

    if (oldDisplay != null
      && this.display != null 
      && this.display.cells.length == oldDisplay.cells.length 
      && this.display.cells[0].length == oldDisplay.cells[0].length) {
      for (let row = 0; row < oldDisplay.cells.length; row++) {
        const cellrow = oldDisplay.cells[row];
        for (let col = 0; col < cellrow.length; col++) {
          const c = cellrow[col];
          this.display.setChar(row, col, c.char, c.underline, c.blink);
        }
      }
    }

    if (oldLights != null && this.lights != null) {
      for (let i = 0; i < this.lights.length; i++) {
        this.lights[i].state = oldLights[i].state;
        this.lights[i].blinkPhase = oldLights[i].blinkPhase;
        this.lights[i].isOn = null; //  != true and != false!
        this.lights[i].update(); // this calculates what .isOn should be and compares
                                 // by setting isOn to null, that will always differ,
                                 // and thus the update will always happen.
      }
    }
  }

  populate(keyboard, view) {
    // Remove all existing children
    while (this.root.lastChild) {
      this.root.removeChild(this.root.lastChild);
    }

    // Note the current keyboard and view
    this.keyboard = keyboard;
    this.view = view;

    // and (re-)populate the root.
    this.decorationsContainer = createElement("g");
    this.root.appendChild(this.decorationsContainer);

    this.haloContainer = createElement("g");
    this.root.appendChild(this.haloContainer);

    this.labelContainer = createElement("g");
    this.root.appendChild(this.labelContainer);

    this.mainContainer = createElement("g");
    this.root.appendChild(this.mainContainer);

    if (typeof(this.buttons) === 'undefined') {
      this.buttons = new Array();
    }
    if (typeof(this.lights) === 'undefined') {
      this.lights = new Array();
    }
    if (typeof(this.analogControls) === 'undefined') {
      this.analogControls = new Array();
    }

    this.blinkPhase = 0;

    var hasSeq = false;
    var isSd1 = false;
    var isSd132 = false

    keyboard = keyboard.toLowerCase();
    if (keyboard.indexOf('sd') != -1) {
      hasSeq = true;

      if (keyboard.indexOf('1') != -1) {
        isSd1 = true;
        if (keyboard.indexOf('32') != -1) {
          isSd132 = true;
        }
      }
    }

    this.populateView(this.view, hasSeq, isSd1, isSd132);

    let messageRect = Rect.from(this.displayContainer);

    this.messageBox = createElement('svg');
    messageRect.applyTo(this.messageBox);
    hideElement(this.messageBox);

    let messageBackground = createElement('rect');
    this.messageBox.appendChild(messageBackground);
    messageBackground.setAttribute('width', '100%');
    messageBackground.setAttribute('height', '100%');
    messageBackground.setAttribute('fill', '#000000aa');

    this.messageText = createElement('text');
    this.messageBox.appendChild(this.messageText);

    this.messageText.setAttribute('fill', "#aaaaaaff");
    this.messageText.setAttribute('stroke', 'none');
    this.messageText.setAttribute('font-size', `${messageRect.h}`);
    this.messageText.setAttribute('font-family', 'Helvetica');
    this.messageText.setAttribute('font-style', 'italic');
    this.messageText.setAttribute('text-anchor', 'middle');
    this.messageText.setAttribute('dominant-baseline', 'middle');
    this.messageText.setAttribute('x', '50%');
    this.messageText.setAttribute('y', '50%');

    this.root.appendChild(this.messageBox);
  }

  startConnection() {
    this.needRefresh = true;
    try {
      this.connect();
    } catch (e) {
      console.log("Unable to connect to '" + serverUrl + "': " + e);
    }
  }

  sendString(s) {
    if (this.socket != undefined && this.socket.readyState == WebSocket.OPEN) {
      // console.log(`Sending '${s}'`);
      this.socket.send(s);
    }
  }

  sendPatchSelectStatus() {
    const status = "A 1 " + 250 * this.patchSelectStatus;
    console.log(`Sending patch select status '${status}'`);
    this.sendString(status);
  }

  onPatchSelectButtonPressed(button) {
    this.patchSelectStatus |= (1 << button.value);
    console.log(`patch select button ${button.value} pressed: status = ${this.patchSelectStatus}`)
    this.sendPatchSelectStatus();
  }

  onPatchSelectButtonReleased(button) {
    this.patchSelectStatus &= ~(1 << button.value);
    console.log(`patch select button ${button.value} released: status = ${this.patchSelectStatus}`)
    this.sendPatchSelectStatus();
  }

  onButtonPressed(button) {
    this.sendString("BD " + button.value);
  }

  onButtonReleased(button) {
    this.sendString("BU " + button.value);
  }

  onAnalogValueChanged(slider) {
    // 0.05 == 0; 0.95 == 760
    var value = (slider.value - 0.05) / 0.9;
    value = 760 * value;
    value = Math.round(Math.max(0, Math.min(1023, value)));
    var s = "A " + slider.channel + " " + value;

    console.log(`sending analog value: ${s}`);
    this.sendString(s);
  }

  handleDisplayData(data) {
    var c = data[0];
    if (c == 'X') {
      // Clear the screen
      // console.log("Clearing the screen");
      this.display.clear();
    } else if (c == 'C') {
      // Character data
      var s = data.slice(1).trim();
      // console.log(`Displaying characters: '${s}'`);
      var parts = s.split(" ");
      // console.log(`Have ${parts.length} parts`);
      if (parts.length >= 2) {
        let row = parseInt(parts[0]);
        let column = parseInt(parts[1]);
        // console.log(`Starting at ${row},${column}`);
        for (var i = 2; i < parts.length - 1; i+= 2) {
          let ch = parseInt(parts[i], 16);
          let attr = parseInt(parts[i+1], 16);
          let underline = (attr & 0x01) != 0;
          let blink = (attr & 0x02) != 0;
          this.display.setChar(row, column, ch, underline, blink);
          column += 1;
          if (column >= 40) {
            column = 0;
            row += 1;
            if (row >= 2) {
              row = 0;
            }
          }
        }
      }
    } else {
      console.log("Unknown display message '" + data + "'");
    }
  }

  handleLightState(data) {
    var s = data.trim();
    var parts = s.split(" ");
    if ((parts.length % 2) == 0) {
      for (var i = 0; i < parts.length; i+= 2) {
        let whichLight = parseInt(parts[i]);
        let state = parseInt(parts[i+1]);
        var light = this.lights[whichLight];
        if (light != null && light instanceof Light) {
          if (state == 2) {
            light.setState(LightState.ON);
          } else if (state == 3) {
            light.setState(LightState.BLINK);
          } else {
            light.setState(LightState.OFF);
          }
        }
      }
    }
  }

  handleBlinkPhase(data) {
    var s = data.trim();
    let phase = parseInt(s);
    this.setBlinkPhase(phase);
  }

  handleAnalogValue(data) {
    var s = data.trim();
    console.log("Handling analog value: '" + s + "'");
    var parts = s.split(" ");
    if ((parts.length % 2) == 0) {
      for (var i = 0; i < parts.length - 1; i += 2) {
        var channel = parseInt(parts[i]);
        var value = parseInt(parts[i+1]);

        var analogControl = this.analogControls[channel];
        if (analogControl != null) {
          if (analogControl instanceof Slider) {
            // 0.05 == 0; 0.95 == 760
            let position = value / 760.0;
            position = 0.05 + 0.9 * position;
            console.log(`Setting channel ${channel} value ${value} => position ${position}`);
            analogControl.setValue(position);
          }
        }
      }
    }
  }

  handleButtonState(data) {
    var s = data.trim();
    var pressed = s[0] == 'D';

    var parts = s.substring(1).trim().split(" ");
    for (var i = 0; i < parts.length; i++) {
      var number = parseInt(parts[i]);
      var button = this.buttons[number];
      if (button != null && button instanceof Button) {
        button.showPressed(pressed);
      }
    }
  }

  handleServerInformation(data) {
    var s = data.trim();
    if (s == "") return;

    var parts = s.split(",");
    if (parts.length != 2) return;

    var keyboard = parts[0];
    var version = parseInt(parts[1]);
    console.log(`Server information message '${s}' -> keyboard '${keyboard}' version '${version}'`);
    if (version != this.version) {
      // we need to reload, forcing a refresh from the server.
      // console.log(`keyboard '${keyboard}' vs '${this.keyboard}', version '${version}' vs '${this.version}', would reload`);

      // For debugging purposes:
      // If this goes into a loop of reloading over and over,
      // increasing reload_timeout may let you catch the javascript console log
      // (which gets cleared by reloading the page).
      const reload_timeout = 0;
      setTimeout(function() { document.location.reload(true); }, reload_timeout); // immediately reload
    } else if (keyboard != this.keyboard) {
      // we need to rebuild the panel, but can stay on the same software, no need to reload.
      console.log("Rebuilding the panel in place");
      this.populate(keyboard, this.view);
      this.sendString("CA0B0L0D0"); // Send me nothing
      this.sendString("CA1B1L1D1"); // Send me analog data, buttons, and display data - ie refresh everything
    } else {
      // console.log(`needRefresh = ${this.needRefresh}`);
      // same keyboard type and version - proceed!
      if (this.needRefresh) {
        // console.log("Requesting refresh");
        this.sendString("CA0B0L0D0"); // Send me nothing
        this.sendString("CA1B1L1D1"); // Send me analog data, buttons, and display data
        this.needRefresh = false; // presuming the refresh succeeds
      }
    }
  }

  handleServerMessage(data) {
    // console.log(`Handling server message: '${data}'`);
    this.showMessage(data);
  }

  populateViewOptions(select) {
    while (select.lastChild) {
      select.removeChild(select.lastChild);
    }
    var option;

    option = document.createElement('option');
    option.text = "Panel";
    option.value = 0;    select.appendChild(option);
    option = document.createElement('option');
    option.text = "Square Panel";
    option.value = 1;    select.appendChild(option);
    option = document.createElement('option');
    option.text = "Full Panel";
    option.value = 2;    select.appendChild(option);
  }
  populatePanelView(hasSeq, isSd1, isSd132) {
    if (isSd1) {
      this.accentColor = Colors.SD1;
    } else { // not isSd1
      this.accentColor = Colors.VFX;
    }
    this.addRectangle(-95, -10, 575, 105.2, Colors.PANEL);
    // Starting group 'Sliders' at offset -90,-13
    this.addSlider(-90, 2, 20, 60, 5, 0.5);
    this.addButton(-42.5, 47, 15, 5, 63, Colors.BUTTON_DARK);
    this.addButton(-42.5, 22, 15, 5, 62, Colors.BUTTON_DARK);
    this.addSymbol(-37.5, 42, 5, 2.5, "triangle_down");
    this.addSymbol(-37.5, 17, 5, 2.5, "triangle_up");
    this.addSlider(-20, 2, 20, 60, 3, 0.5);
    this.addRectangle(-90, 89, 90, 1.2, this.accentColor);
    this.addLabel(-90, 85.5, 35, 3.5, "Volume", 3.5, true, false, false);
    this.addLabel(-42.5, 85.5, 35, 3.5, "Data Entry", 3.5, true, false, false);
    // Ending group 'Sliders'
    this.addRectangle(0, 89, 25, 1.2, this.accentColor);
    // Starting group 'DisplayAndButtons' at offset 25,-13
    this.addRectangle(25, -5, 245, 67.5, Colors.GLASS);

    this.displayContainer = createElement("svg");
    this.display = new Display(this.displayContainer, 2, 40);
    this.displayContainer.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.displayContainer.setAttribute("x", 37.0);
    this.displayContainer.setAttribute("y", 19.509356725146198);
    this.displayContainer.setAttribute("width", 221.0);
    this.displayContainer.setAttribute("height", 18.481286549707605);
    this.root.appendChild(this.displayContainer);

    this.addButton(85, 52.5, 15, 5, 50, Colors.BUTTON_DARK);
    this.addButton(151, 52.5, 15, 5, 44, Colors.BUTTON_DARK);
    this.addButton(217, 52.5, 15, 5, 45, Colors.BUTTON_DARK);
    this.addButton(85, 0, 15, 5, 58, Colors.BUTTON_DARK);
    this.addButton(151, 0, 15, 5, 42, Colors.BUTTON_DARK);
    this.addButton(218, 0, 15, 5, 43, Colors.BUTTON_DARK);
    this.addButton(25, 69, 15, 10, 52, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 15));
    if (isSd1) {
      this.addLabel(25, 85.5, 15, 3.5, "BankSet", 3.5, true, false, true);
    } else { // not isSd1
      this.addLabel(25, 85.5, 15, 3.5, "Cart", 3.5, true, false, true);
    }
    this.addButton(40, 69, 15, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 13));
    this.addLabel(40, 85.5, 15, 3.5, "Sounds", 3.5, true, false, true);
    this.addButton(55, 69, 15, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 7));
    this.addLabel(55, 85.5, 15, 3.5, "Presets", 3.5, true, false, true);
    if (hasSeq) {
      this.addButton(70, 69, 15, 10, 51, Colors.BUTTON_LIGHT);
      this.addLabel(70, 85.5, 15, 3.5, "Seq", 3.5, true, false, true);
    } else { // not hasSeq
    }
    this.addButton(120, 69, 15, 10, 55, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 14));
    this.addButton(135, 69, 15, 10, 56, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 6));
    this.addButton(150, 69, 15, 10, 57, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 4));
    this.addButton(165, 69, 15, 10, 46, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 12));
    this.addButton(180, 69, 15, 10, 47, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 3));
    this.addButton(195, 69, 15, 10, 48, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 11));
    this.addButton(210, 69, 15, 10, 49, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 2));
    this.addButton(225, 69, 15, 10, 35, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 10));
    this.addButton(240, 69, 15, 10, 34, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 1));
    this.addButton(255, 69, 15, 10, 25, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 9));
    this.addLabel(120, 85.5, 15, 3.5, "0", 3.5, true, false, true);
    this.addLabel(135, 85.5, 15, 3.5, "1", 3.5, true, false, true);
    this.addLabel(150, 85.5, 15, 3.5, "2", 3.5, true, false, true);
    this.addLabel(165, 85.5, 15, 3.5, "3", 3.5, true, false, true);
    this.addLabel(180, 85.5, 15, 3.5, "4", 3.5, true, false, true);
    this.addLabel(195, 85.5, 15, 3.5, "5", 3.5, true, false, true);
    this.addLabel(210, 85.5, 15, 3.5, "6", 3.5, true, false, true);
    this.addLabel(225, 85.5, 15, 3.5, "7", 3.5, true, false, true);
    this.addLabel(240, 85.5, 15, 3.5, "8", 3.5, true, false, true);
    this.addLabel(255, 85.5, 15, 3.5, "9", 3.5, true, false, true);
    this.addRectangle(25, 89, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    this.addRectangle(270, 89, 22.5, 1.2, this.accentColor);
    // Starting group 'Buttons' at offset 295,-13
    this.addButton(295, 69, 15, 10, 29, Colors.BUTTON_MEDIUM);
    this.addLabel(295, 62, 15, 3.5, "Replace", 3.5, false, true, false);
    this.addLabel(295, 65.5, 15, 3.5, "Program", 3.5, false, true, false);
    this.addButton(415, 69, 15, 10, 5, Colors.BUTTON_MEDIUM);
    this.addLabel(415, 62, 15, 3.5, "Select", 3.5, false, true, false);
    this.addLabel(415, 65.5, 15, 3.5, "Voice", 3.5, false, true, false);
    this.addButton(430, 69, 15, 10, 9, Colors.BUTTON_MEDIUM);
    this.addLabel(430, 65.5, 15, 3.5, "Copy", 3.5, false, true, false);
    this.addButton(445, 69, 15, 10, 3, Colors.BUTTON_MEDIUM);
    this.addLabel(445, 65.5, 15, 3.5, "Write", 3.5, false, true, false);
    this.addButton(460, 69, 15, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 5));
    this.addLabel(460, 65.5, 15, 3.5, "Compare", 3.5, false, true, false);
    this.addButton(295, 49, 15, 5, 26, Colors.BUTTON_DARK);
    this.addLabel(295, 42, 15, 3.5, "Patch", 3.5, false, true, false);
    this.addLabel(295, 45.5, 15, 3.5, "Select", 3.5, false, true, false);
    this.addButton(310, 49, 15, 5, 27, Colors.BUTTON_DARK);
    this.addLabel(310, 45.5, 15, 3.5, "MIDI", 3.5, false, true, false);
    this.addButton(325, 49, 15, 5, 28, Colors.BUTTON_DARK);
    this.addLabel(325, 45.5, 15, 3.5, "Effects", 3.5, false, true, false);
    this.addButton(295, 29, 15, 5, 39, Colors.BUTTON_DARK);
    this.addLabel(295, 22, 15, 3.5, "Key", 3.5, false, true, false);
    this.addLabel(295, 25.5, 15, 3.5, "Zone", 3.5, false, true, false);
    this.addButton(310, 29, 15, 5, 40, Colors.BUTTON_DARK);
    this.addLabel(310, 22, 15, 3.5, "Trans-", 3.5, false, true, false);
    this.addLabel(310, 25.5, 15, 3.5, "pose", 3.5, false, true, false);
    this.addButton(325, 29, 15, 5, 41, Colors.BUTTON_DARK);
    this.addLabel(325, 25.5, 15, 3.5, "Release", 3.5, false, true, false);
    this.addButton(295, 9, 15, 5, 36, Colors.BUTTON_DARK);
    this.addLabel(295, 5.5, 15, 3.5, "Volume", 3.5, false, true, false);
    this.addButton(310, 9, 15, 5, 37, Colors.BUTTON_DARK);
    this.addLabel(310, 5.5, 15, 3.5, "Pan", 3.5, false, true, false);
    this.addButton(325, 9, 15, 5, 38, Colors.BUTTON_DARK);
    this.addLabel(325, 5.5, 15, 3.5, "Timbre", 3.5, false, true, false);
    this.addButton(415, 49, 15, 5, 4, Colors.BUTTON_DARK);
    this.addLabel(415, 45.5, 15, 3.5, "Wave", 3.5, false, true, false);
    this.addButton(430, 49, 15, 5, 6, Colors.BUTTON_DARK);
    this.addLabel(430, 42, 15, 3.5, "Mod", 3.5, false, true, false);
    this.addLabel(430, 45.5, 15, 3.5, "Mixer", 3.5, false, true, false);
    this.addButton(445, 49, 15, 5, 2, Colors.BUTTON_DARK);
    this.addLabel(445, 42, 15, 3.5, "Program", 3.5, false, true, false);
    this.addLabel(445, 45.5, 15, 3.5, "Control", 3.5, false, true, false);
    this.addButton(460, 49, 15, 5, 7, Colors.BUTTON_DARK);
    this.addLabel(460, 45.5, 15, 3.5, "Effects", 3.5, false, true, false);
    this.addButton(415, 29, 15, 5, 11, Colors.BUTTON_DARK);
    this.addLabel(415, 25.5, 15, 3.5, "Pitch", 3.5, false, true, false);
    this.addButton(430, 29, 15, 5, 13, Colors.BUTTON_DARK);
    this.addLabel(430, 22, 15, 3.5, "Pitch", 3.5, false, true, false);
    this.addLabel(430, 25.5, 15, 3.5, "Mod", 3.5, false, true, false);
    this.addButton(445, 29, 15, 5, 15, Colors.BUTTON_DARK);
    this.addLabel(445, 25.5, 15, 3.5, "Filters", 3.5, false, true, false);
    this.addButton(460, 29, 15, 5, 17, Colors.BUTTON_DARK);
    this.addLabel(460, 25.5, 15, 3.5, "Output", 3.5, false, true, false);
    this.addButton(415, 9, 15, 5, 10, Colors.BUTTON_DARK);
    this.addLabel(415, 5.5, 15, 3.5, "LFO", 3.5, false, true, false);
    this.addButton(430, 9, 15, 5, 12, Colors.BUTTON_DARK);
    this.addLabel(430, 5.5, 15, 3.5, "Env1", 3.5, false, true, false);
    this.addButton(445, 9, 15, 5, 14, Colors.BUTTON_DARK);
    this.addLabel(445, 5.5, 15, 3.5, "Env2", 3.5, false, true, false);
    this.addButton(460, 9, 15, 5, 16, Colors.BUTTON_DARK);
    this.addLabel(460, 5.5, 15, 3.5, "Env3", 3.5, false, true, false);
    if (hasSeq) {
      this.addRectangle(310, 63.7, 7.5, 0.25, Colors.WHITE);
      this.addLabel(317.5, 62, 15, 3.5, "Tracks", 3.5, false, false, true);
      this.addRectangle(332.5, 63.7, 7.5, 0.25, Colors.WHITE);
      this.addButton(310, 69, 15, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 0));
      this.addLabel(310, 65.5, 15, 3.5, "1-6", 3.5, false, true, true);
      this.addButton(325, 69, 15, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 8));
      this.addLabel(325, 65.5, 15, 3.5, "7-12", 3.5, false, true, true);
      this.addButton(355, 69, 15, 10, 19, Colors.BUTTON_MEDIUM);
      this.addLabel(355, 65.5, 15, 3.5, "Rec", 3.5, false, true, false);
      this.addButton(370, 69, 15, 10, 22, Colors.BUTTON_MEDIUM);
      this.addLabel(370, 62, 15, 3.5, "Stop", 3.5, false, true, false);
      this.addLabel(370, 65.5, 15, 3.5, "/Cont", 3.5, false, true, false);
      this.addButton(385, 69, 15, 10, 23, Colors.BUTTON_MEDIUM);
      this.addLabel(385, 65.5, 15, 3.5, "Play", 3.5, false, true, false);
      this.addButton(355, 49, 15, 5, 32, Colors.BUTTON_DARK);
      this.addLabel(355, 45.5, 15, 3.5, "Click", 3.5, false, true, false);
      this.addButton(370, 49, 15, 5, 18, Colors.BUTTON_DARK);
      this.addLabel(370, 42, 15, 3.5, "Seq", 3.5, false, true, false);
      this.addLabel(370, 45.5, 15, 3.5, "Control", 3.5, false, true, false);
      this.addButton(385, 49, 15, 5, 33, Colors.BUTTON_DARK);
      this.addLabel(385, 45.5, 15, 3.5, "Locate", 3.5, false, true, false);
      this.addButton(355, 29, 15, 5, 60, Colors.BUTTON_DARK);
      this.addLabel(355, 25.5, 15, 3.5, "Song", 3.5, false, true, false);
      this.addButton(370, 29, 15, 5, 59, Colors.BUTTON_DARK);
      this.addLabel(370, 25.5, 15, 3.5, "Seq", 3.5, false, true, false);
      this.addButton(385, 29, 15, 5, 61, Colors.BUTTON_DARK);
      this.addLabel(385, 25.5, 15, 3.5, "Track", 3.5, false, true, false);
      this.addButton(355, 9, 15, 5, 20, Colors.BUTTON_LIGHT);
      this.addLabel(355, 5.5, 15, 3.5, "Master", 3.5, false, true, false);
      this.addButton(370, 9, 15, 5, 21, Colors.BUTTON_LIGHT);
      this.addLabel(370, 5.5, 15, 3.5, "Storage", 3.5, false, true, false);
      this.addButton(385, 9, 15, 5, 24, Colors.BUTTON_LIGHT);
      this.addLabel(385, 2, 15, 3.5, "MIDI", 3.5, false, true, false);
      this.addLabel(385, 5.5, 15, 3.5, "Control", 3.5, false, true, false);
      this.addRectangle(355, 25.7, 17.5, 0.25, Colors.WHITE);
      this.addLabel(372.5, 22, 10, 3.5, "Edit", 3.5, false, false, true);
      this.addRectangle(382.5, 23.7, 17.5, 0.25, Colors.WHITE);
      this.addLabel(355, -4, 35, 3.5, "System", 3.5, true, false, false);
      this.addRectangle(355, -0.5, 55, 0.5, this.accentColor);
      this.addLabel(355, 85.5, 25, 3.5, "Sequencer", 3.5, true, false, false);
    } else { // not hasSeq
      this.addRectangle(310, 63.7, 10, 0.1, Colors.WHITE);
      this.addLabel(320, 62, 10, 3.5, "Multi", 3.5, false, false, true);
      this.addRectangle(330, 63.7, 10, 0.1, Colors.WHITE);
      this.addButton(310, 69, 15, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 0));
      this.addLabel(310, 65.5, 15, 3.5, "A", 3.5, false, true, true);
      this.addButton(325, 69, 15, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 8));
      this.addLabel(325, 65.5, 15, 3.5, "B", 3.5, false, true, true);
      this.addButton(355, 69, 15, 10, 20, Colors.BUTTON_LIGHT);
      this.addLabel(355, 65.5, 15, 3.5, "Master", 3.5, false, true, false);
      this.addButton(370, 69, 15, 10, 21, Colors.BUTTON_LIGHT);
      this.addLabel(370, 65.5, 15, 3.5, "Storage", 3.5, false, true, false);
      this.addButton(385, 69, 15, 10, 24, Colors.BUTTON_LIGHT);
      this.addLabel(385, 62, 15, 3.5, "MIDI", 3.5, false, true, false);
      this.addLabel(385, 65.5, 15, 3.5, "Control", 3.5, false, true, false);
      this.addLabel(355, 74.5, 35, 3.5, "System", 3.5, true, false, false);
    }
    this.addRectangle(295, 89, 55, 1.2, this.accentColor);
    this.addRectangle(355, 89, 55, 1.2, this.accentColor);
    this.addRectangle(415, 89, 60, 1.2, this.accentColor);
    this.addLabel(295, 85.5, 35, 3.5, "Performance", 3.5, true, false, false);
    this.addLabel(415, 85.5, 35, 3.5, "Programming", 3.5, true, false, false);
    // Ending group 'Buttons'
    this.root.setAttribute("x", "0mm");
    this.root.setAttribute("y", "0mm");
    this.root.setAttribute("width", "575mm");
    this.root.setAttribute("height", "105.2mm");
    this.root.setAttribute("viewBox", "-95 -10 575 105.2");
  }
  populateSquarePanelView(hasSeq, isSd1, isSd132) {
    if (isSd1) {
      this.accentColor = Colors.SD1;
    } else { // not isSd1
      this.accentColor = Colors.VFX;
    }
    this.addRectangle(-5, -10, 285, 205.4, Colors.PANEL);
    // Starting group 'CompactVolumeSlider' at offset 0,-13
    this.addSlider(0, 2, 20, 60, 5, 0.5);
    this.addRectangle(0, 89, 30, 1.2, this.accentColor);
    this.addLabel(0, 85.5, 35, 3.5, "Volume", 3.5, true, false, false);
    // Ending group 'CompactVolumeSlider'
    // Starting group 'DisplayAndButtons' at offset 30,-13
    this.addRectangle(30, -5, 245, 67.5, Colors.GLASS);

    this.displayContainer = createElement("svg");
    this.display = new Display(this.displayContainer, 2, 40);
    this.displayContainer.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.displayContainer.setAttribute("x", 42.0);
    this.displayContainer.setAttribute("y", 19.509356725146198);
    this.displayContainer.setAttribute("width", 221.0);
    this.displayContainer.setAttribute("height", 18.481286549707605);
    this.root.appendChild(this.displayContainer);

    this.addButton(90, 52.5, 15, 5, 50, Colors.BUTTON_DARK);
    this.addButton(156, 52.5, 15, 5, 44, Colors.BUTTON_DARK);
    this.addButton(222, 52.5, 15, 5, 45, Colors.BUTTON_DARK);
    this.addButton(90, 0, 15, 5, 58, Colors.BUTTON_DARK);
    this.addButton(156, 0, 15, 5, 42, Colors.BUTTON_DARK);
    this.addButton(223, 0, 15, 5, 43, Colors.BUTTON_DARK);
    this.addButton(30, 69, 15, 10, 52, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 15));
    if (isSd1) {
      this.addLabel(30, 85.5, 15, 3.5, "BankSet", 3.5, true, false, true);
    } else { // not isSd1
      this.addLabel(30, 85.5, 15, 3.5, "Cart", 3.5, true, false, true);
    }
    this.addButton(45, 69, 15, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 13));
    this.addLabel(45, 85.5, 15, 3.5, "Sounds", 3.5, true, false, true);
    this.addButton(60, 69, 15, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 7));
    this.addLabel(60, 85.5, 15, 3.5, "Presets", 3.5, true, false, true);
    if (hasSeq) {
      this.addButton(75, 69, 15, 10, 51, Colors.BUTTON_LIGHT);
      this.addLabel(75, 85.5, 15, 3.5, "Seq", 3.5, true, false, true);
    } else { // not hasSeq
    }
    this.addButton(125, 69, 15, 10, 55, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 14));
    this.addButton(140, 69, 15, 10, 56, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 6));
    this.addButton(155, 69, 15, 10, 57, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 4));
    this.addButton(170, 69, 15, 10, 46, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 12));
    this.addButton(185, 69, 15, 10, 47, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 3));
    this.addButton(200, 69, 15, 10, 48, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 11));
    this.addButton(215, 69, 15, 10, 49, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 2));
    this.addButton(230, 69, 15, 10, 35, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 10));
    this.addButton(245, 69, 15, 10, 34, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 1));
    this.addButton(260, 69, 15, 10, 25, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 9));
    this.addLabel(125, 85.5, 15, 3.5, "0", 3.5, true, false, true);
    this.addLabel(140, 85.5, 15, 3.5, "1", 3.5, true, false, true);
    this.addLabel(155, 85.5, 15, 3.5, "2", 3.5, true, false, true);
    this.addLabel(170, 85.5, 15, 3.5, "3", 3.5, true, false, true);
    this.addLabel(185, 85.5, 15, 3.5, "4", 3.5, true, false, true);
    this.addLabel(200, 85.5, 15, 3.5, "5", 3.5, true, false, true);
    this.addLabel(215, 85.5, 15, 3.5, "6", 3.5, true, false, true);
    this.addLabel(230, 85.5, 15, 3.5, "7", 3.5, true, false, true);
    this.addLabel(245, 85.5, 15, 3.5, "8", 3.5, true, false, true);
    this.addLabel(260, 85.5, 15, 3.5, "9", 3.5, true, false, true);
    this.addRectangle(30, 89, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    // Starting group 'Buttons' at offset 95.0,87.2
    this.addButton(95, 169.2, 15, 10, 29, Colors.BUTTON_MEDIUM);
    this.addLabel(95, 162.2, 15, 3.5, "Replace", 3.5, false, true, false);
    this.addLabel(95, 165.7, 15, 3.5, "Program", 3.5, false, true, false);
    this.addButton(215, 169.2, 15, 10, 5, Colors.BUTTON_MEDIUM);
    this.addLabel(215, 162.2, 15, 3.5, "Select", 3.5, false, true, false);
    this.addLabel(215, 165.7, 15, 3.5, "Voice", 3.5, false, true, false);
    this.addButton(230, 169.2, 15, 10, 9, Colors.BUTTON_MEDIUM);
    this.addLabel(230, 165.7, 15, 3.5, "Copy", 3.5, false, true, false);
    this.addButton(245, 169.2, 15, 10, 3, Colors.BUTTON_MEDIUM);
    this.addLabel(245, 165.7, 15, 3.5, "Write", 3.5, false, true, false);
    this.addButton(260, 169.2, 15, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 5));
    this.addLabel(260, 165.7, 15, 3.5, "Compare", 3.5, false, true, false);
    this.addButton(95, 149.2, 15, 5, 26, Colors.BUTTON_DARK);
    this.addLabel(95, 142.2, 15, 3.5, "Patch", 3.5, false, true, false);
    this.addLabel(95, 145.7, 15, 3.5, "Select", 3.5, false, true, false);
    this.addButton(110, 149.2, 15, 5, 27, Colors.BUTTON_DARK);
    this.addLabel(110, 145.7, 15, 3.5, "MIDI", 3.5, false, true, false);
    this.addButton(125, 149.2, 15, 5, 28, Colors.BUTTON_DARK);
    this.addLabel(125, 145.7, 15, 3.5, "Effects", 3.5, false, true, false);
    this.addButton(95, 129.2, 15, 5, 39, Colors.BUTTON_DARK);
    this.addLabel(95, 122.2, 15, 3.5, "Key", 3.5, false, true, false);
    this.addLabel(95, 125.7, 15, 3.5, "Zone", 3.5, false, true, false);
    this.addButton(110, 129.2, 15, 5, 40, Colors.BUTTON_DARK);
    this.addLabel(110, 122.2, 15, 3.5, "Trans-", 3.5, false, true, false);
    this.addLabel(110, 125.7, 15, 3.5, "pose", 3.5, false, true, false);
    this.addButton(125, 129.2, 15, 5, 41, Colors.BUTTON_DARK);
    this.addLabel(125, 125.7, 15, 3.5, "Release", 3.5, false, true, false);
    this.addButton(95, 109.2, 15, 5, 36, Colors.BUTTON_DARK);
    this.addLabel(95, 105.7, 15, 3.5, "Volume", 3.5, false, true, false);
    this.addButton(110, 109.2, 15, 5, 37, Colors.BUTTON_DARK);
    this.addLabel(110, 105.7, 15, 3.5, "Pan", 3.5, false, true, false);
    this.addButton(125, 109.2, 15, 5, 38, Colors.BUTTON_DARK);
    this.addLabel(125, 105.7, 15, 3.5, "Timbre", 3.5, false, true, false);
    this.addButton(215, 149.2, 15, 5, 4, Colors.BUTTON_DARK);
    this.addLabel(215, 145.7, 15, 3.5, "Wave", 3.5, false, true, false);
    this.addButton(230, 149.2, 15, 5, 6, Colors.BUTTON_DARK);
    this.addLabel(230, 142.2, 15, 3.5, "Mod", 3.5, false, true, false);
    this.addLabel(230, 145.7, 15, 3.5, "Mixer", 3.5, false, true, false);
    this.addButton(245, 149.2, 15, 5, 2, Colors.BUTTON_DARK);
    this.addLabel(245, 142.2, 15, 3.5, "Program", 3.5, false, true, false);
    this.addLabel(245, 145.7, 15, 3.5, "Control", 3.5, false, true, false);
    this.addButton(260, 149.2, 15, 5, 7, Colors.BUTTON_DARK);
    this.addLabel(260, 145.7, 15, 3.5, "Effects", 3.5, false, true, false);
    this.addButton(215, 129.2, 15, 5, 11, Colors.BUTTON_DARK);
    this.addLabel(215, 125.7, 15, 3.5, "Pitch", 3.5, false, true, false);
    this.addButton(230, 129.2, 15, 5, 13, Colors.BUTTON_DARK);
    this.addLabel(230, 122.2, 15, 3.5, "Pitch", 3.5, false, true, false);
    this.addLabel(230, 125.7, 15, 3.5, "Mod", 3.5, false, true, false);
    this.addButton(245, 129.2, 15, 5, 15, Colors.BUTTON_DARK);
    this.addLabel(245, 125.7, 15, 3.5, "Filters", 3.5, false, true, false);
    this.addButton(260, 129.2, 15, 5, 17, Colors.BUTTON_DARK);
    this.addLabel(260, 125.7, 15, 3.5, "Output", 3.5, false, true, false);
    this.addButton(215, 109.2, 15, 5, 10, Colors.BUTTON_DARK);
    this.addLabel(215, 105.7, 15, 3.5, "LFO", 3.5, false, true, false);
    this.addButton(230, 109.2, 15, 5, 12, Colors.BUTTON_DARK);
    this.addLabel(230, 105.7, 15, 3.5, "Env1", 3.5, false, true, false);
    this.addButton(245, 109.2, 15, 5, 14, Colors.BUTTON_DARK);
    this.addLabel(245, 105.7, 15, 3.5, "Env2", 3.5, false, true, false);
    this.addButton(260, 109.2, 15, 5, 16, Colors.BUTTON_DARK);
    this.addLabel(260, 105.7, 15, 3.5, "Env3", 3.5, false, true, false);
    if (hasSeq) {
      this.addRectangle(110, 163.9, 7.5, 0.25, Colors.WHITE);
      this.addLabel(117.5, 162.2, 15, 3.5, "Tracks", 3.5, false, false, true);
      this.addRectangle(132.5, 163.9, 7.5, 0.25, Colors.WHITE);
      this.addButton(110, 169.2, 15, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 0));
      this.addLabel(110, 165.7, 15, 3.5, "1-6", 3.5, false, true, true);
      this.addButton(125, 169.2, 15, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 8));
      this.addLabel(125, 165.7, 15, 3.5, "7-12", 3.5, false, true, true);
      this.addButton(155, 169.2, 15, 10, 19, Colors.BUTTON_MEDIUM);
      this.addLabel(155, 165.7, 15, 3.5, "Rec", 3.5, false, true, false);
      this.addButton(170, 169.2, 15, 10, 22, Colors.BUTTON_MEDIUM);
      this.addLabel(170, 162.2, 15, 3.5, "Stop", 3.5, false, true, false);
      this.addLabel(170, 165.7, 15, 3.5, "/Cont", 3.5, false, true, false);
      this.addButton(185, 169.2, 15, 10, 23, Colors.BUTTON_MEDIUM);
      this.addLabel(185, 165.7, 15, 3.5, "Play", 3.5, false, true, false);
      this.addButton(155, 149.2, 15, 5, 32, Colors.BUTTON_DARK);
      this.addLabel(155, 145.7, 15, 3.5, "Click", 3.5, false, true, false);
      this.addButton(170, 149.2, 15, 5, 18, Colors.BUTTON_DARK);
      this.addLabel(170, 142.2, 15, 3.5, "Seq", 3.5, false, true, false);
      this.addLabel(170, 145.7, 15, 3.5, "Control", 3.5, false, true, false);
      this.addButton(185, 149.2, 15, 5, 33, Colors.BUTTON_DARK);
      this.addLabel(185, 145.7, 15, 3.5, "Locate", 3.5, false, true, false);
      this.addButton(155, 129.2, 15, 5, 60, Colors.BUTTON_DARK);
      this.addLabel(155, 125.7, 15, 3.5, "Song", 3.5, false, true, false);
      this.addButton(170, 129.2, 15, 5, 59, Colors.BUTTON_DARK);
      this.addLabel(170, 125.7, 15, 3.5, "Seq", 3.5, false, true, false);
      this.addButton(185, 129.2, 15, 5, 61, Colors.BUTTON_DARK);
      this.addLabel(185, 125.7, 15, 3.5, "Track", 3.5, false, true, false);
      this.addButton(155, 109.2, 15, 5, 20, Colors.BUTTON_LIGHT);
      this.addLabel(155, 105.7, 15, 3.5, "Master", 3.5, false, true, false);
      this.addButton(170, 109.2, 15, 5, 21, Colors.BUTTON_LIGHT);
      this.addLabel(170, 105.7, 15, 3.5, "Storage", 3.5, false, true, false);
      this.addButton(185, 109.2, 15, 5, 24, Colors.BUTTON_LIGHT);
      this.addLabel(185, 102.2, 15, 3.5, "MIDI", 3.5, false, true, false);
      this.addLabel(185, 105.7, 15, 3.5, "Control", 3.5, false, true, false);
      this.addRectangle(155, 125.9, 17.5, 0.25, Colors.WHITE);
      this.addLabel(172.5, 122.2, 10, 3.5, "Edit", 3.5, false, false, true);
      this.addRectangle(182.5, 123.9, 17.5, 0.25, Colors.WHITE);
      this.addLabel(155, 96.2, 35, 3.5, "System", 3.5, true, false, false);
      this.addRectangle(155, 99.7, 55, 0.5, this.accentColor);
      this.addLabel(155, 185.7, 25, 3.5, "Sequencer", 3.5, true, false, false);
    } else { // not hasSeq
      this.addRectangle(110, 163.9, 10, 0.1, Colors.WHITE);
      this.addLabel(120, 162.2, 10, 3.5, "Multi", 3.5, false, false, true);
      this.addRectangle(130, 163.9, 10, 0.1, Colors.WHITE);
      this.addButton(110, 169.2, 15, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 0));
      this.addLabel(110, 165.7, 15, 3.5, "A", 3.5, false, true, true);
      this.addButton(125, 169.2, 15, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 8));
      this.addLabel(125, 165.7, 15, 3.5, "B", 3.5, false, true, true);
      this.addButton(155, 169.2, 15, 10, 20, Colors.BUTTON_LIGHT);
      this.addLabel(155, 165.7, 15, 3.5, "Master", 3.5, false, true, false);
      this.addButton(170, 169.2, 15, 10, 21, Colors.BUTTON_LIGHT);
      this.addLabel(170, 165.7, 15, 3.5, "Storage", 3.5, false, true, false);
      this.addButton(185, 169.2, 15, 10, 24, Colors.BUTTON_LIGHT);
      this.addLabel(185, 162.2, 15, 3.5, "MIDI", 3.5, false, true, false);
      this.addLabel(185, 165.7, 15, 3.5, "Control", 3.5, false, true, false);
      this.addLabel(155, 174.7, 35, 3.5, "System", 3.5, true, false, false);
    }
    this.addRectangle(95, 189.2, 55, 1.2, this.accentColor);
    this.addRectangle(155, 189.2, 55, 1.2, this.accentColor);
    this.addRectangle(215, 189.2, 60, 1.2, this.accentColor);
    this.addLabel(95, 185.7, 35, 3.5, "Performance", 3.5, true, false, false);
    this.addLabel(215, 185.7, 35, 3.5, "Programming", 3.5, true, false, false);
    // Ending group 'Buttons'
    // Starting group 'PatchSelects' at offset 0.0,87.2
    this.addPatchSelectButton(0, 142.2, 9, 12, 1);
    this.addPatchSelectButton(15, 142.2, 9, 12, 0);
    this.addRectangle(0, 189.2, 40, 1.2, this.accentColor);
    this.addLabel(0, 185.7, 35, 3.5, "Patch Select", 3.5, true, false, false);
    // Ending group 'PatchSelects'
    // Starting group 'CompactValueSlider' at offset 32.0,87.2
    this.addSlider(52, 102.2, 20, 60, 3, 0.5);
    this.addButton(32, 147.2, 15, 5, 63, Colors.BUTTON_DARK);
    this.addButton(32, 122.2, 15, 5, 62, Colors.BUTTON_DARK);
    this.addSymbol(37, 142.2, 5, 2.5, "triangle_down");
    this.addSymbol(37, 117.2, 5, 2.5, "triangle_up");
    this.addRectangle(32, 189.2, 63, 1.2, this.accentColor);
    this.addLabel(32, 185.7, 35, 3.5, "Data Entry", 3.5, true, false, false);
    // Ending group 'CompactValueSlider'
    this.root.setAttribute("x", "0mm");
    this.root.setAttribute("y", "0mm");
    this.root.setAttribute("width", "285mm");
    this.root.setAttribute("height", "205.4mm");
    this.root.setAttribute("viewBox", "-5 -10 285 205.4");
  }
  populateFullPanelView(hasSeq, isSd1, isSd132) {
    if (isSd1) {
      this.accentColor = Colors.SD1;
    } else { // not isSd1
      this.accentColor = Colors.VFX;
    }
    this.addRectangle(0, 0, 845, 121.5, Colors.PANEL);
    // Starting group 'Sliders' at offset 120.0,0.0
    this.addSlider(120, 15, 20, 60, 5, 0.5);
    this.addButton(167.5, 60, 15, 5, 63, Colors.BUTTON_DARK);
    this.addButton(167.5, 35, 15, 5, 62, Colors.BUTTON_DARK);
    this.addSymbol(172.5, 55, 5, 2.5, "triangle_down");
    this.addSymbol(172.5, 30, 5, 2.5, "triangle_up");
    this.addSlider(190, 15, 20, 60, 3, 0.5);
    this.addRectangle(120, 102, 90, 1.2, this.accentColor);
    this.addLabel(120, 98.5, 35, 3.5, "Volume", 3.5, true, false, false);
    this.addLabel(167.5, 98.5, 35, 3.5, "Data Entry", 3.5, true, false, false);
    // Ending group 'Sliders'
    this.addRectangle(210, 102, 25, 1.2, this.accentColor);
    // Starting group 'DisplayAndButtons' at offset 235.0,0.0
    this.addRectangle(235, 8, 245, 67.5, Colors.GLASS);

    this.displayContainer = createElement("svg");
    this.display = new Display(this.displayContainer, 2, 40);
    this.displayContainer.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.displayContainer.setAttribute("x", 247.0);
    this.displayContainer.setAttribute("y", 32.5093567251462);
    this.displayContainer.setAttribute("width", 221.0);
    this.displayContainer.setAttribute("height", 18.481286549707605);
    this.root.appendChild(this.displayContainer);

    this.addButton(295, 65.5, 15, 5, 50, Colors.BUTTON_DARK);
    this.addButton(361, 65.5, 15, 5, 44, Colors.BUTTON_DARK);
    this.addButton(427, 65.5, 15, 5, 45, Colors.BUTTON_DARK);
    this.addButton(295, 13, 15, 5, 58, Colors.BUTTON_DARK);
    this.addButton(361, 13, 15, 5, 42, Colors.BUTTON_DARK);
    this.addButton(428, 13, 15, 5, 43, Colors.BUTTON_DARK);
    this.addButton(235, 82, 15, 10, 52, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 15));
    if (isSd1) {
      this.addLabel(235, 98.5, 15, 3.5, "BankSet", 3.5, true, false, true);
    } else { // not isSd1
      this.addLabel(235, 98.5, 15, 3.5, "Cart", 3.5, true, false, true);
    }
    this.addButton(250, 82, 15, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 13));
    this.addLabel(250, 98.5, 15, 3.5, "Sounds", 3.5, true, false, true);
    this.addButton(265, 82, 15, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5, 0.4, 5, 3.3333, 7));
    this.addLabel(265, 98.5, 15, 3.5, "Presets", 3.5, true, false, true);
    if (hasSeq) {
      this.addButton(280, 82, 15, 10, 51, Colors.BUTTON_LIGHT);
      this.addLabel(280, 98.5, 15, 3.5, "Seq", 3.5, true, false, true);
    } else { // not hasSeq
    }
    this.addButton(330, 82, 15, 10, 55, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 14));
    this.addButton(345, 82, 15, 10, 56, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 6));
    this.addButton(360, 82, 15, 10, 57, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 4));
    this.addButton(375, 82, 15, 10, 46, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 12));
    this.addButton(390, 82, 15, 10, 47, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 3));
    this.addButton(405, 82, 15, 10, 48, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 11));
    this.addButton(420, 82, 15, 10, 49, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 2));
    this.addButton(435, 82, 15, 10, 35, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 10));
    this.addButton(450, 82, 15, 10, 34, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 1));
    this.addButton(465, 82, 15, 10, 25, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 9));
    this.addLabel(330, 98.5, 15, 3.5, "0", 3.5, true, false, true);
    this.addLabel(345, 98.5, 15, 3.5, "1", 3.5, true, false, true);
    this.addLabel(360, 98.5, 15, 3.5, "2", 3.5, true, false, true);
    this.addLabel(375, 98.5, 15, 3.5, "3", 3.5, true, false, true);
    this.addLabel(390, 98.5, 15, 3.5, "4", 3.5, true, false, true);
    this.addLabel(405, 98.5, 15, 3.5, "5", 3.5, true, false, true);
    this.addLabel(420, 98.5, 15, 3.5, "6", 3.5, true, false, true);
    this.addLabel(435, 98.5, 15, 3.5, "7", 3.5, true, false, true);
    this.addLabel(450, 98.5, 15, 3.5, "8", 3.5, true, false, true);
    this.addLabel(465, 98.5, 15, 3.5, "9", 3.5, true, false, true);
    this.addRectangle(235, 102, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    this.addRectangle(480, 102, 22.5, 1.2, this.accentColor);
    // Starting group 'Buttons' at offset 505.0,0.0
    this.addButton(505, 82, 15, 10, 29, Colors.BUTTON_MEDIUM);
    this.addLabel(505, 75, 15, 3.5, "Replace", 3.5, false, true, false);
    this.addLabel(505, 78.5, 15, 3.5, "Program", 3.5, false, true, false);
    this.addButton(625, 82, 15, 10, 5, Colors.BUTTON_MEDIUM);
    this.addLabel(625, 75, 15, 3.5, "Select", 3.5, false, true, false);
    this.addLabel(625, 78.5, 15, 3.5, "Voice", 3.5, false, true, false);
    this.addButton(640, 82, 15, 10, 9, Colors.BUTTON_MEDIUM);
    this.addLabel(640, 78.5, 15, 3.5, "Copy", 3.5, false, true, false);
    this.addButton(655, 82, 15, 10, 3, Colors.BUTTON_MEDIUM);
    this.addLabel(655, 78.5, 15, 3.5, "Write", 3.5, false, true, false);
    this.addButton(670, 82, 15, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 5));
    this.addLabel(670, 78.5, 15, 3.5, "Compare", 3.5, false, true, false);
    this.addButton(505, 62, 15, 5, 26, Colors.BUTTON_DARK);
    this.addLabel(505, 55, 15, 3.5, "Patch", 3.5, false, true, false);
    this.addLabel(505, 58.5, 15, 3.5, "Select", 3.5, false, true, false);
    this.addButton(520, 62, 15, 5, 27, Colors.BUTTON_DARK);
    this.addLabel(520, 58.5, 15, 3.5, "MIDI", 3.5, false, true, false);
    this.addButton(535, 62, 15, 5, 28, Colors.BUTTON_DARK);
    this.addLabel(535, 58.5, 15, 3.5, "Effects", 3.5, false, true, false);
    this.addButton(505, 42, 15, 5, 39, Colors.BUTTON_DARK);
    this.addLabel(505, 35, 15, 3.5, "Key", 3.5, false, true, false);
    this.addLabel(505, 38.5, 15, 3.5, "Zone", 3.5, false, true, false);
    this.addButton(520, 42, 15, 5, 40, Colors.BUTTON_DARK);
    this.addLabel(520, 35, 15, 3.5, "Trans-", 3.5, false, true, false);
    this.addLabel(520, 38.5, 15, 3.5, "pose", 3.5, false, true, false);
    this.addButton(535, 42, 15, 5, 41, Colors.BUTTON_DARK);
    this.addLabel(535, 38.5, 15, 3.5, "Release", 3.5, false, true, false);
    this.addButton(505, 22, 15, 5, 36, Colors.BUTTON_DARK);
    this.addLabel(505, 18.5, 15, 3.5, "Volume", 3.5, false, true, false);
    this.addButton(520, 22, 15, 5, 37, Colors.BUTTON_DARK);
    this.addLabel(520, 18.5, 15, 3.5, "Pan", 3.5, false, true, false);
    this.addButton(535, 22, 15, 5, 38, Colors.BUTTON_DARK);
    this.addLabel(535, 18.5, 15, 3.5, "Timbre", 3.5, false, true, false);
    this.addButton(625, 62, 15, 5, 4, Colors.BUTTON_DARK);
    this.addLabel(625, 58.5, 15, 3.5, "Wave", 3.5, false, true, false);
    this.addButton(640, 62, 15, 5, 6, Colors.BUTTON_DARK);
    this.addLabel(640, 55, 15, 3.5, "Mod", 3.5, false, true, false);
    this.addLabel(640, 58.5, 15, 3.5, "Mixer", 3.5, false, true, false);
    this.addButton(655, 62, 15, 5, 2, Colors.BUTTON_DARK);
    this.addLabel(655, 55, 15, 3.5, "Program", 3.5, false, true, false);
    this.addLabel(655, 58.5, 15, 3.5, "Control", 3.5, false, true, false);
    this.addButton(670, 62, 15, 5, 7, Colors.BUTTON_DARK);
    this.addLabel(670, 58.5, 15, 3.5, "Effects", 3.5, false, true, false);
    this.addButton(625, 42, 15, 5, 11, Colors.BUTTON_DARK);
    this.addLabel(625, 38.5, 15, 3.5, "Pitch", 3.5, false, true, false);
    this.addButton(640, 42, 15, 5, 13, Colors.BUTTON_DARK);
    this.addLabel(640, 35, 15, 3.5, "Pitch", 3.5, false, true, false);
    this.addLabel(640, 38.5, 15, 3.5, "Mod", 3.5, false, true, false);
    this.addButton(655, 42, 15, 5, 15, Colors.BUTTON_DARK);
    this.addLabel(655, 38.5, 15, 3.5, "Filters", 3.5, false, true, false);
    this.addButton(670, 42, 15, 5, 17, Colors.BUTTON_DARK);
    this.addLabel(670, 38.5, 15, 3.5, "Output", 3.5, false, true, false);
    this.addButton(625, 22, 15, 5, 10, Colors.BUTTON_DARK);
    this.addLabel(625, 18.5, 15, 3.5, "LFO", 3.5, false, true, false);
    this.addButton(640, 22, 15, 5, 12, Colors.BUTTON_DARK);
    this.addLabel(640, 18.5, 15, 3.5, "Env1", 3.5, false, true, false);
    this.addButton(655, 22, 15, 5, 14, Colors.BUTTON_DARK);
    this.addLabel(655, 18.5, 15, 3.5, "Env2", 3.5, false, true, false);
    this.addButton(670, 22, 15, 5, 16, Colors.BUTTON_DARK);
    this.addLabel(670, 18.5, 15, 3.5, "Env3", 3.5, false, true, false);
    if (hasSeq) {
      this.addRectangle(520, 76.7, 7.5, 0.25, Colors.WHITE);
      this.addLabel(527.5, 75, 15, 3.5, "Tracks", 3.5, false, false, true);
      this.addRectangle(542.5, 76.7, 7.5, 0.25, Colors.WHITE);
      this.addButton(520, 82, 15, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 0));
      this.addLabel(520, 78.5, 15, 3.5, "1-6", 3.5, false, true, true);
      this.addButton(535, 82, 15, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 8));
      this.addLabel(535, 78.5, 15, 3.5, "7-12", 3.5, false, true, true);
      this.addButton(565, 82, 15, 10, 19, Colors.BUTTON_MEDIUM);
      this.addLabel(565, 78.5, 15, 3.5, "Rec", 3.5, false, true, false);
      this.addButton(580, 82, 15, 10, 22, Colors.BUTTON_MEDIUM);
      this.addLabel(580, 75, 15, 3.5, "Stop", 3.5, false, true, false);
      this.addLabel(580, 78.5, 15, 3.5, "/Cont", 3.5, false, true, false);
      this.addButton(595, 82, 15, 10, 23, Colors.BUTTON_MEDIUM);
      this.addLabel(595, 78.5, 15, 3.5, "Play", 3.5, false, true, false);
      this.addButton(565, 62, 15, 5, 32, Colors.BUTTON_DARK);
      this.addLabel(565, 58.5, 15, 3.5, "Click", 3.5, false, true, false);
      this.addButton(580, 62, 15, 5, 18, Colors.BUTTON_DARK);
      this.addLabel(580, 55, 15, 3.5, "Seq", 3.5, false, true, false);
      this.addLabel(580, 58.5, 15, 3.5, "Control", 3.5, false, true, false);
      this.addButton(595, 62, 15, 5, 33, Colors.BUTTON_DARK);
      this.addLabel(595, 58.5, 15, 3.5, "Locate", 3.5, false, true, false);
      this.addButton(565, 42, 15, 5, 60, Colors.BUTTON_DARK);
      this.addLabel(565, 38.5, 15, 3.5, "Song", 3.5, false, true, false);
      this.addButton(580, 42, 15, 5, 59, Colors.BUTTON_DARK);
      this.addLabel(580, 38.5, 15, 3.5, "Seq", 3.5, false, true, false);
      this.addButton(595, 42, 15, 5, 61, Colors.BUTTON_DARK);
      this.addLabel(595, 38.5, 15, 3.5, "Track", 3.5, false, true, false);
      this.addButton(565, 22, 15, 5, 20, Colors.BUTTON_LIGHT);
      this.addLabel(565, 18.5, 15, 3.5, "Master", 3.5, false, true, false);
      this.addButton(580, 22, 15, 5, 21, Colors.BUTTON_LIGHT);
      this.addLabel(580, 18.5, 15, 3.5, "Storage", 3.5, false, true, false);
      this.addButton(595, 22, 15, 5, 24, Colors.BUTTON_LIGHT);
      this.addLabel(595, 15, 15, 3.5, "MIDI", 3.5, false, true, false);
      this.addLabel(595, 18.5, 15, 3.5, "Control", 3.5, false, true, false);
      this.addRectangle(565, 38.7, 17.5, 0.25, Colors.WHITE);
      this.addLabel(582.5, 35, 10, 3.5, "Edit", 3.5, false, false, true);
      this.addRectangle(592.5, 36.7, 17.5, 0.25, Colors.WHITE);
      this.addLabel(565, 9, 35, 3.5, "System", 3.5, true, false, false);
      this.addRectangle(565, 12.5, 55, 0.5, this.accentColor);
      this.addLabel(565, 98.5, 25, 3.5, "Sequencer", 3.5, true, false, false);
    } else { // not hasSeq
      this.addRectangle(520, 76.7, 10, 0.1, Colors.WHITE);
      this.addLabel(530, 75, 10, 3.5, "Multi", 3.5, false, false, true);
      this.addRectangle(540, 76.7, 10, 0.1, Colors.WHITE);
      this.addButton(520, 82, 15, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 0));
      this.addLabel(520, 78.5, 15, 3.5, "A", 3.5, false, true, true);
      this.addButton(535, 82, 15, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5, 0.4, 5, 3.3333, 8));
      this.addLabel(535, 78.5, 15, 3.5, "B", 3.5, false, true, true);
      this.addButton(565, 82, 15, 10, 20, Colors.BUTTON_LIGHT);
      this.addLabel(565, 78.5, 15, 3.5, "Master", 3.5, false, true, false);
      this.addButton(580, 82, 15, 10, 21, Colors.BUTTON_LIGHT);
      this.addLabel(580, 78.5, 15, 3.5, "Storage", 3.5, false, true, false);
      this.addButton(595, 82, 15, 10, 24, Colors.BUTTON_LIGHT);
      this.addLabel(595, 75, 15, 3.5, "MIDI", 3.5, false, true, false);
      this.addLabel(595, 78.5, 15, 3.5, "Control", 3.5, false, true, false);
      this.addLabel(565, 87.5, 35, 3.5, "System", 3.5, true, false, false);
    }
    this.addRectangle(505, 102, 55, 1.2, this.accentColor);
    this.addRectangle(565, 102, 55, 1.2, this.accentColor);
    this.addRectangle(625, 102, 60, 1.2, this.accentColor);
    this.addLabel(505, 98.5, 35, 3.5, "Performance", 3.5, true, false, false);
    this.addLabel(625, 98.5, 35, 3.5, "Programming", 3.5, true, false, false);
    // Ending group 'Buttons'
    this.addRectangle(720, 22, 56, 27, Colors.BODY_DOWN);
    this.addRectangle(721.5, 23.5, 53, 24, Colors.BODY_UP);
    this.addLabel(720, 18.5, 56, 3.5, "Cartridge", 3.5, false, true, false);
    // Starting group 'BackPanel' at offset 0.0,-32.0
    this.addRectangle(0, -32, 845, 32, Colors.BODY);
    this.addLabel(97, -22, 10, 3.5, "Power", 3.5, false, true, false);
    this.addLabel(131, -22, 8, 3.5, "Line", 3.5, false, true, false);
    this.addLabel(165, -22, 10, 3.5, "Fuse", 3.5, false, true, false);
    this.addRectangle(477, -18.5, 87, 0.25, Colors.WHITE);
    this.addLabel(477, -22, 87, 3.5, "MIDI", 3.5, false, true, true);
    this.addLabel(480, -18.25, 8, 3.5, "Thru", 3.5, false, true, false);
    this.addLabel(518, -18.25, 8, 3.5, "Out", 3.5, false, true, false);
    this.addLabel(558, -18.25, 4, 3.5, "In", 3.5, false, true, false);
    this.addLabel(640, -22, 12, 3.5, "Ft. Sw.", 3.5, false, true, false);
    this.addLabel(663, -22, 17, 3.5, "Pedal•CV", 3.5, false, true, false);
    if (hasSeq) {
      this.addRectangle(690, -18.5, 38, 0.25, Colors.WHITE);
      this.addLabel(692, -22, 8, 3.5, "Left", 3.5, false, true, false);
      this.addLabel(717, -22, 10, 3.5, "Right", 3.5, false, true, false);
      this.addLabel(690, -18.25, 38, 3.5, "Mono", 3.5, false, true, true);
      this.addLabel(690, -25.5, 38, 3.5, "Aux. Out", 3.5, false, true, true);
      this.addRectangle(740, -18.5, 38, 0.25, Colors.WHITE);
      this.addLabel(742, -22, 8, 3.5, "Left", 3.5, false, true, false);
      this.addLabel(767, -22, 10, 3.5, "Right", 3.5, false, true, false);
      this.addLabel(740, -18.25, 38, 3.5, "Mono", 3.5, false, true, true);
      this.addLabel(740, -25.5, 38, 3.5, "Main Out", 3.5, false, true, true);
    } else { // not hasSeq
      this.addRectangle(740, -18.5, 38, 0.25, Colors.WHITE);
      this.addLabel(742, -22, 8, 3.5, "Left", 3.5, false, true, false);
      this.addLabel(767, -22, 10, 3.5, "Right", 3.5, false, true, false);
      this.addLabel(740, -18.25, 38, 3.5, "Mono", 3.5, false, true, true);
      this.addLabel(740, -25.5, 38, 3.5, "Main Out", 3.5, false, true, true);
    }
    this.addLabel(790, -22, 15, 3.5, "Phones", 3.5, false, true, false);
    // Ending group 'BackPanel'
    if (hasSeq) {
      this.addLabel(13, 7, 200, 3.5, "MUSIC PRODUCTION SYNTHESIZER", 3.5, false, false, false);
    } else { // not hasSeq
      this.addLabel(13, 7, 200, 3.5, "DYNAMIC COMPONENT SYNTHESIZER", 3.5, false, false, false);
    }
    this.addSymbol(760, 90, 72, 13, "logo");
    this.addRectangle(-152, -32, 152, 334.5, Colors.BODY);
    this.addRectangle(854, -32, 20, 334.5, Colors.BODY);
    // Starting group 'WheelArea' at offset -120.0,169.5
    this.addRectangle(-120, 169.5, 108, 122, Colors.PANEL);
    this.addPatchSelectButton(-114, 171.5, 9, 12, 1);
    this.addPatchSelectButton(-99, 171.5, 9, 12, 0);
    this.addLabel(-89, 176.5, 15, 3.5, "Patch", 3.5, false, true, false);
    this.addLabel(-89, 180, 15, 3.5, "Select", 3.5, false, true, false);
    this.addWheel(-90.5, 195.5, 13, 66, 0, 0.5, true);
    this.addWheel(-53.5, 195.5, 13, 66, 2, 0.5, false);
    this.addRectangle(-120, 268.5, 28, 1.2, this.accentColor);
    this.addRectangle(-90.5, 268.5, 34.5, 1.2, this.accentColor);
    this.addLabel(-90.5, 265, 15, 3.5, "Pitch", 3.5, true, false, false);
    this.addRectangle(-53.5, 268.5, 29.5, 1.2, this.accentColor);
    this.addLabel(-53.5, 265, 15, 3.5, "Mod", 3.5, true, false, false);
    // Ending group 'WheelArea'
    this.root.setAttribute("x", "0mm");
    this.root.setAttribute("y", "0mm");
    this.root.setAttribute("width", "1026mm");
    this.root.setAttribute("height", "334.5mm");
    this.root.setAttribute("viewBox", "-152 -32 1026 334.5");
  }
  populateView(view, hasSeq, isSd1, isSd132) {
    if (view == 0) return this.populatePanelView(hasSeq, isSd1, isSd132);
    if (view == 1) return this.populateSquarePanelView(hasSeq, isSd1, isSd132);
    if (view == 2) return this.populateFullPanelView(hasSeq, isSd1, isSd132);
  }

}



