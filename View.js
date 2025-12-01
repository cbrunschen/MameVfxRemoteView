function standardize_color(color) {
  var ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = color;
  return ctx.fillStyle;
}

Colors = {
  "VFX": "#299ca3",
  "SD1": "#db5f6a",
  "TRANSPARENT": "#00000000",
  "WHITE": "#ffffff",
  "BLACK": "#000000",
  "PANEL": "#333333",
  "GLASS": "#000000",
  "SCREWHEAD": "#383838",
  "BODY": "#202020",
  "BODY_DOWN": "#101010",
  "BODY_DOWN_SHALLOW": "#181818",
  "BODY_UP": "#303030",
  "BODY_UP_SHALLOW": "#282828",
  "KEY_WHITE": "#f2f2e6",
  "KEY_WHITE_VELOCITY_MIN": "#2c44ad",
  "KEY_WHITE_VELOCITY_MAX": "#19a14d",
  "KEY_WHITE_PRESSURE_MIN": "#e6ce48",
  "KEY_WHITE_PRESSURE_MAX": "#ce3f06",
  "KEY_BLACK": "#141414",
  "KEY_BLACK_VELOCITY_MIN": "#2c44ad",
  "KEY_BLACK_VELOCITY_MAX": "#19a14d",
  "KEY_BLACK_PRESSURE_MIN": "#e6ce48",
  "KEY_BLACK_PRESSURE_MAX": "#ce3f06",
  "KEYBOARD_BACKGROUND": "#555555",
  "LIGHT_OFF": "#112211",
  "LIGHT_ON": "#22ff22",
  "BLACK_PLASTIC": "#444444",
  "BLACK_PLASTIC_ACTIVE": "#777777",
  "BLACK_PLASTIC_LIGHT": "#555555",
  "BLACK_PLASTIC_SHADE": "#333333",
  "BLACK_PLASTIC_DARK": "#2a2a2a",
  "BLACK_PLASTIC_DARKER": "#222222",
  "BUTTON_LIGHT": "#bbbbbb",
  "BUTTON_MEDIUM": "#777777",
  "BUTTON_DARK": "#111111",
  "BUTTON_SCREEN": "#2a2a2a",
  "BUTTON_PRESSED": "#ffffff",
  "VFD_OFF": "#0f1f1a",
  "VFD_ON": "#73fff2",
  "HALO": "#666666",
  "TEXT": "#ffffff",
  "SYMBOL": "#ffffff",
  "PLUGIN_WARNING": "#bb2c2c",
  "PLUGIN_WARNING_BACKGROUND": "#b2b2b2"
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
    if (!this.isPressed) {
      this.isPressed = true;
      this.showPressed(true);

      if (this.onPress != undefined) {
        this.onPress(this);
      }
    }
  }

  release(e) {
    if (this.isPressed) {
      this.isPressed = false;
      this.showPressed(false);

      if (this.onRelease != undefined) {
        this.onRelease(this);
      }
    }
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

    this.group.addEventListener("mousedown", function(e) { that.press(e); }, true);
    this.group.addEventListener("mouseout", function(e) { that.release(e); }, true);
    this.group.addEventListener("mouseup", function(e) { that.release(e); }, true);

    this.group.setAttribute("class", "button");

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
    if (!this.isPressed) {
      console.log(`Button ${this.value} Press`)
      this.isPressed = true;
      this.showPressed(true);

      if (this.onPress != undefined) {
        this.onPress(this);
      }
    } else {
      console.log(`Button ${this.value} Repeat Press`)
    }
  }

  release(e) {
    if (this.isPressed) {
      console.log(`Button ${this.value} Release`)
      this.isPressed = false;
      this.showPressed(false);

      if (this.onRelease != undefined) {
        this.onRelease(this);
      }
    } else {
      console.log(`Button ${this.value} Repeat Release`)
    }
  }
}

class Light {
  constructor(x, y, w, h, number) {
    this.rect = new Rect(x, y, w, h);

    this.number = number;
    this.state = LightState.OFF;
    this.isOn = false;
    this.blinkPhase = 0;

    this.group = createElement("g");

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

class TouchPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static center(touches) {
    console.log(`TouchPoint.center(${touches}) of ${touches.size} touches:`)
    var n = touches.size;
    if (n <= 0) {
      return null;
    }
    var x = 0;
    var y = 0;

    for (var touch of touches.values()) {
      console.log(`   (${touch.clientX}, ${touch.clientY})`)
      x += touch.clientX;
      y += touch.clientY;
    }

    console.log(`=> (${x / n}, ${y / n})`)

    return new TouchPoint(x / n, y / n);
  }
}

class Key {
  constructor(x, y, number, black, path) {
    this.x = x;
    this.y = y;
    this.number = number;
    this.black = black;
    this.path = path;

    this.velocity = 0;
    this.pressure = 0;

    var translation = "translate(" + x + "," + y + ")";
    this.element = createElement("path");
    this.element.setAttribute("transform", translation);
    this.element.setAttribute("class", "key");
    this.element.setAttribute("d", path);
    if (this.black) {
      this.color = Colors.KEY_BLACK;
      this.color_velocity_min = Colors.KEY_BLACK_VELOCITY_MIN;
      this.color_velocity_max = Colors.KEY_BLACK_VELOCITY_MAX;
      this.color_pressure_min = Colors.KEY_BLACK_PRESSURE_MIN;
      this.color_pressure_max = Colors.KEY_BLACK_PRESSURE_MAX;
    } else {
      this.color = Colors.KEY_WHITE;
      this.color_velocity_min = Colors.KEY_WHITE_VELOCITY_MIN;
      this.color_velocity_max = Colors.KEY_WHITE_VELOCITY_MAX;
      this.color_pressure_min = Colors.KEY_WHITE_PRESSURE_MIN;
      this.color_pressure_max = Colors.KEY_WHITE_PRESSURE_MAX;
    }
    this.element.setAttribute("fill", this.color);

    let that = this;
    this.element.addEventListener("touchstart", function(e) { that.touchstart(e); }, true);
    this.element.addEventListener("touchmove", function(e) { that.touchmove(e); }, true);
    this.element.addEventListener("touchend", function(e) { that.touchend(e); }, true);
    this.element.addEventListener("touchcancel", function(e) { that.touchend(e); }, true);

    this.element.addEventListener(
      "mousedown", 
      function(e) { that.grab(e); },
      { capture: false, passive: false }
    );
    this.element.addEventListener(
      "mouseenter", 
      function(e) { that.drag(e); },
      { capture: false, passive: true }
    );
    this.element.addEventListener(
      "mousemove", 
      function(e) { that.drag(e); },
      { capture: false, passive: true }
    );
    this.element.addEventListener(
      "mouseup",
      function(e) { that.release(); },
      { capture: false, passive: true }
    );
    this.element.addEventListener(
      "mouseleave",
      function(e) { that.release(); },
      { capture: false, passive: true }
    );
  }

  updateColor() {
    if (this.pressure > 0) {
      let map = 100.0 * ((this.pressure - 1) / 126.0);
      let mip = 100.0 - map; 
      this.element.setAttribute("fill", 
        `color-mix(in srgb, ${this.color_pressure_min} ${mip}%, ${this.color_pressure_max} ${map}%)`);
    } else if (this.velocity > 0) {
      let map = 100.0 * ((this.velocity - 1) / 126.0);
      let mip = 100.0 - map; 
      this.element.setAttribute("fill", 
        `color-mix(in srgb, ${this.color_velocity_min} ${mip}%, ${this.color_velocity_max} ${map}%)`);
    } else {
      this.element.setAttribute("fill", this.color);
    }
  }

  grab(e) {
    if (this.velocity == 0) {
      // first touch/mouse down
      this.velocity = 64;
      this.updateColor();
    } else {
      // subsequent multi-touch added or removed
      this.updateColor();
    }
    // console.log("Grabbing with handleY=" + this.handleY + ", p.y=" + p.y + " => dragOffset=" + this.dragOffset);
  }

  drag(e) {
    if (e.buttons != 0) {
      if (this.velocity == 0) {
        this.grab(e);
      } else {
        this.pressure = 64;
        this.updateColor();
      }
    }
  }

  release(e) {
    this.pressure = 0;
    this.velocity = 0;
    this.updateColor();
  }

  touchstart(e) {
    e.preventDefault();
    
    for (var i = 0; i < e.targetTouches.length; i++) {
      var touch = e.targetTouches.item(i);
      this.activeTouches.set(touch.identifier, touch);
    }

    center = TouchPoint.center(this.activeTouches);
    if (center != null) {
      this.grab(center.x, center.y);
    }
  }

  touchmove(e) {
    e.preventDefault();
    
    for (var i = 0; i < e.changedTouches.length; i++) {
      var touch = e.changedTouches.item(i);
      if (this.activeTouches.has(touch.identifier)) {
        this.activeTouches.set(touch.identifier, touch);
      }
    }
    center = TouchPoint.center(this.activeTouches);
    if (center != null) {
      this.drag(center.x, center.y);
    }
  }

  touchend(e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      var touch = e.changedTouches.item(i);
      this.activeTouches.delete(touch.identifier)
    }
    if (this.activeTouches.size == 0) {
      this.release();
    } else {
      center = TouchPoint.center(this.activeTouches);
      if (center != null) {
        this.grab(center.x, center.y);
      }
    }
  }
}

class Keyboard {
  octave_shift = 164.5
  w_white = 22.5
  f_white = w_white / (w_white + 1)
  l_black = 88
  l_white = 138
  y_12 = (l_black + 2) / l_white
  y_12_0 = l_black / l_white

  strike_both_bottom = l_black - 3
  strike_both_top = l_black - 43

  strike_white_low_bottom = l_white - 3
  strike_white_low_top = l_white - 43

  strike_white_break = (strike_both_bottom + strike_white_low_top) / 2

  pressure_length = 25
  pressure_hysteresis = 3

  // The ranges where we can find the tops of the 12 keys within an octave
  k12 = [
    { key:0,  x0:0,            x1:79027/1000000, black:false, l:l_white },
    { key:1,  x0:1769/20000,   x1:807/5000,      black:true,  l:l_black },
    { key:2,  x0:8541/50000,   x1:4997/20000,    black:false, l:l_white },
    { key:3,  x0:25927/100000, x1:16611/50000,   black:true,  l:l_black },
    { key:4,  x0:8541/25000,   x1:42067/100000,  black:false, l:l_white },
    { key:5,  x0:1707/4000,    x1:4997/10000,    black:false, l:l_white },
    { key:6,  x0:1591/3125,    x1:58207/100000,  black:true,  l:l_black },
    { key:7,  x0:59149/100000, x1:16611/25000,   black:false, l:l_white },
    { key:8,  x0:33693/50000,  x1:74681/100000,  black:true,  l:l_black },
    { key:9,  x0:75623/100000, x1:41459/50000,   black:false, l:l_white },
    { key:10, x0:4193/5000,    x1:18231/20000,   black:true,  l:l_black },
    { key:11, x0:92097/100000, x1:3106/3125,     black:false, l:l_white },
  ];

  // 85 equally sized ranges that each contain exactly one key, and the key
  // thaty they contain, so we can check for being outside the edge
  x_to_k12 = [
    k12[1], k12[1], k12[1], k12[1], k12[1], k12[1], k12[1],
    k12[2], k12[2], k12[2], k12[2], k12[2], k12[2], k12[2],
    k12[3], k12[3], k12[3], k12[3], k12[3], k12[3], k12[3], k12[3],
    k12[4], k12[4], k12[4], k12[4], k12[4], k12[4], k12[4],
    k12[5], k12[5], k12[5], k12[5], k12[5], k12[5], k12[5],
    k12[6], k12[6], k12[6], k12[6], k12[6], k12[6], k12[6],
    k12[7], k12[7], k12[7], k12[7], k12[7], k12[7], k12[7],
    k12[8], k12[8], k12[8], k12[8], k12[8], k12[8], k12[8],
    k12[9], k12[9], k12[9], k12[9], k12[9], k12[9], k12[9],
    k12[10], k12[10], k12[10], k12[10], k12[10], k12[10], k12[10],
    k12[11], k12[11], k12[11], k12[11], k12[11], k12[11], k12[11],
    k12[12], k12[12], k12[12], k12[12], k12[12], k12[12], k12[12],
  ];

  static makeFindKey(n_octaves) {
    let octaves_width = n_octaves * octave_shift;
    let full_width = octaves_width + w_white;

    function find_12_key(x, y, w, h) {
      if (x > octaves_width) {
        return 12 * n_octaves;
      }

      let octave, kx = math.modf((x / w) * (full_width / octave_shift))
      if (octave == n_octaves) {
        return 12 * octave;
      }

      let ki = math.floor(85 * kx);
      let candidate = x_to_k12[ki + 1];
      if (candidate == null)
        return null;
      
      let ci = 12 * octave + candidate.key;
      if (candidate.x0 <= kx && kx <= candidate.x1) {
        if (candidate.black) {
          rel_y = y / h;
          if (rel_y <= y_12_0) {
            return ci;
          } else {
            return null;
          }
        } else {
          return ci;
        }
      } else {
        return null;
      }
    }

    function find_7_key(x, w) {
      let octave, kx = math.modf((x / w) * (full_width / octave_shift));
      let ki, kkx = math.modf(7 * kx);
      if (kkx <= f_white) {
        if (ki < 3) {
          return 12 * octave + 2 * ki;
        } else {
          return 12 * octave + 2 * ki - 1;
        }
      }
      return null;
    }

    return function (x, y, w, h) {
      rel_y = y / h;
      if (rel_y < 0 || 1 < rel_y) {
        return null;
      } else if (rel_y < y_12) {
        return find_12_key(x, y, w, h);
      } else {
        return find_7_key(x, w);
      }
    }
  }

  constructor(x, y, w, h, keys) {
    
    // Bind the gesture handlers to this instance.
    this.gestureStart = this.gestureStart.bind(this);
    this.gestureMove = this.gestureMove.bind(this);
    this.gestureEnd = this.gestureEnd.bind(this);
    this.gestureCancel = this.gestureCancel.bind(this);

    // Now set the event handlers:
    // Check if pointer events are supported.
    // if (window.PointerEvent) {
    //   console.log("Adding Pointer Event handlers");
    //   // Pointer events are supported, use those.
    //   // Add Pointer Event Listener
    //   this.addEventListener('pointerdown', this.gestureStart, { capture: true, passive: false });
    //   this.addEventListener('pointermove', this.gestureMove, { capture: true, passive: false });
    //   this.addEventListener('pointerup', this.gestureEnd, { capture: true, passive: false });
    //   this.addEventListener('pointercancel', this.gestureCancel, { capture: true, passive: false });
    // } else {
      console.log("Adding Touch and Mouse Event handlers");
      // Pointer events are _not_ supported, use touch and mouse events instead.
      // Add Touch Listener
      this.addEventListener('touchstart', this.gestureStart, { capture: true, passive: false });
      this.addEventListener('touchmove', this.gestureMove, { capture: true, passive: false });
      this.addEventListener('touchend', this.gestureEnd, { capture: true, passive: false });
      this.addEventListener('touchcancel', this.gestureEnd, { capture: true, passive: false });
      this.addEventListener('touchmove', this.gestureMove, { capture: true, passive: false });
      this.addEventListener('touchend', this.gestureEnd, { capture: true, passive: false });
      this.addEventListener('touchcancel', this.gestureEnd, { capture: true, passive: false });

      // Add Mouse Listener
      this.addEventListener('mousedown', this.gestureStart, { capture: true, passive: false });
    // }
  }


  gestureStart(e) {
    console.log(`gestureStart(${e})`)
    e.preventDefault();

    let first = (e.touches == null) || (e.touches.length == 1);

    if (first) {
      // Add the move and end listeners
      // if (window.PointerEvent) {
      //   e.target.setPointerCapture(e.pointerId);
      //   console.log(`- capturing pointer ${e.pointerId}`)
      // } else {
        // Add Mouse Listeners
        document.addEventListener('mousemove', this.gestureMove, true);
        document.addEventListener('mouseup', this.gestureEnd, true);
      // }
    }

    if (e.touches) {
      for (var i = 0; i < e.targetTouches.length; i++) {
        var touch = e.targetTouches.item(i);
        this.activeTouches.set(touch.identifier, touch);
      }

      let center = TouchPoint.center(this.activeTouches);
      if (center != null) {
        this.grab(center.x, center.y);
      }
    } else {
      this.grab(e.clientX, e.clientY);
    }
  }

  gestureMove(e) {
    console.log(`gestureMove(${e})`)
    e.preventDefault();

    if (e.touches) {
      for (var i = 0; i < e.changedTouches.length; i++) {
        var touch = e.changedTouches.item(i);
        if (this.activeTouches.has(touch.identifier)) {
          this.activeTouches.set(touch.identifier, touch);
        }
      }
      let center = TouchPoint.center(this.activeTouches);
      if (center != null) {
        this.drag(center.x, center.y);
      }
    } else {
      this.drag(e.clientX, e.clientY);
    }
  }

  gestureEnd(e) {
    console.log(`gestureEnd(${e})`)
    e.preventDefault();

    let last = (e.touches == null) || (e.touches.length == 0);

    if (last) {
      // Remove Event Listeners
      // if (window.PointerEvent) {
      //   console.log(`- releasing pointer ${e.pointerId}`)
      //   e.target.releasePointerCapture(e.pointerId);
      // } else {
        // Remove Mouse Listeners
        document.removeEventListener('mousemove', this.gestureMove, true);
        document.removeEventListener('mouseup', this.gestureEnd, true);
      // }
    }

    if (e.touches) {
      for (var i = 0; i < e.changedTouches.length; i++) {
        var touch = e.changedTouches.item(i);
        this.activeTouches.delete(touch.identifier)
      }
      if (this.activeTouches.size > 0) {
        let center = TouchPoint.center(this.activeTouches);
        if (center != null) {
          this.grab(center.x, center.y);
        }
      } else {
        this.release();
      }
    } else {
      this.release();
    }
  }

  gestureCancel(e) {
    console.log(`gestureCancel(${e})`)
    e.preventDefault();

    this.gestureEnd(e);
  }

}

function makeRectPath(x, y, w, h, color) {
  let path = new Rect(x, y, w, h).toPath();
  path.setAttribute("fill", color);
  return path;
}

class Slideable {
  constructor(x, y, w, h, channel, value) {
    this.channel = channel;
    this.value = value;

    this.rect = new Rect(x, y, w, h);
    var rect = this.rect.offset(-x, -y);
    var translation = "translate(" + x + "," + y + ")";
    this.group = createElement("g");
    this.group.setAttribute("transform", translation);
    this.group.setAttribute("class", "slider");

    this.populate(rect);

    this.setValue(value);
    this.onValueChanged = undefined;
    this.isGrabbed = false;
    this.activeTouches = new Map();

    // Bind the gesture handlers to this instance.
    this.gestureStart = this.gestureStart.bind(this);
    this.gestureMove = this.gestureMove.bind(this);
    this.gestureEnd = this.gestureEnd.bind(this);
    this.gestureCancel = this.gestureCancel.bind(this);

    // Now set the event handlers:
    // Check if pointer events are supported.
    // if (window.PointerEvent) {
    //   console.log("Adding Pointer Event handlers");
    //   // Pointer events are supported, use those.
    //   // Add Pointer Event Listener
    //   this.handle.addEventListener('pointerdown', this.gestureStart, { capture: true, passive: false });
    //   this.handle.addEventListener('pointermove', this.gestureMove, { capture: true, passive: false });
    //   this.handle.addEventListener('pointerup', this.gestureEnd, { capture: true, passive: false });
    //   this.handle.addEventListener('pointercancel', this.gestureCancel, { capture: true, passive: false });
    // } else {
      console.log("Adding Touch and Mouse Event handlers");
      // Pointer events are _not_ supported, use touch and mouse events instead.
      // Add Touch Listener
      this.handle.addEventListener('touchstart', this.gestureStart, { capture: true, passive: false });
      this.handle.addEventListener('touchmove', this.gestureMove, { capture: true, passive: false });
      this.handle.addEventListener('touchend', this.gestureEnd, { capture: true, passive: false });
      this.handle.addEventListener('touchcancel', this.gestureEnd, { capture: true, passive: false });
      this.group.addEventListener('touchmove', this.gestureMove, { capture: true, passive: false });
      this.group.addEventListener('touchend', this.gestureEnd, { capture: true, passive: false });
      this.group.addEventListener('touchcancel', this.gestureEnd, { capture: true, passive: false });

      // Add Mouse Listener
      this.handle.addEventListener('mousedown', this.gestureStart, { capture: true, passive: false });
    // }
  }

  gestureStart(e) {
    console.log(`gestureStart(${e})`)
    e.preventDefault();

    let first = (e.touches == null) || (e.touches.length == 1);

    if (first) {
      // Add the move and end listeners
      // if (window.PointerEvent) {
      //   e.target.setPointerCapture(e.pointerId);
      //   console.log(`- capturing pointer ${e.pointerId}`)
      // } else {
        // Add Mouse Listeners
        document.addEventListener('mousemove', this.gestureMove, true);
        document.addEventListener('mouseup', this.gestureEnd, true);
      // }
    }

    if (e.touches) {
      for (var i = 0; i < e.targetTouches.length; i++) {
        var touch = e.targetTouches.item(i);
        this.activeTouches.set(touch.identifier, touch);
      }

      let center = TouchPoint.center(this.activeTouches);
      if (center != null) {
        this.grab(center.x, center.y);
      }
    } else {
      this.grab(e.clientX, e.clientY);
    }
  }

  gestureMove(e) {
    console.log(`gestureMove(${e})`)
    e.preventDefault();

    if (e.touches) {
      for (var i = 0; i < e.changedTouches.length; i++) {
        var touch = e.changedTouches.item(i);
        if (this.activeTouches.has(touch.identifier)) {
          this.activeTouches.set(touch.identifier, touch);
        }
      }
      let center = TouchPoint.center(this.activeTouches);
      if (center != null) {
        this.drag(center.x, center.y);
      }
    } else {
      this.drag(e.clientX, e.clientY);
    }
  }

  gestureEnd(e) {
    console.log(`gestureEnd(${e})`)
    e.preventDefault();

    let last = (e.touches == null) || (e.touches.length == 0);

    if (last) {
      // Remove Event Listeners
      // if (window.PointerEvent) {
      //   console.log(`- releasing pointer ${e.pointerId}`)
      //   e.target.releasePointerCapture(e.pointerId);
      // } else {
        // Remove Mouse Listeners
        document.removeEventListener('mousemove', this.gestureMove, true);
        document.removeEventListener('mouseup', this.gestureEnd, true);
      // }
    }

    if (e.touches) {
      for (var i = 0; i < e.changedTouches.length; i++) {
        var touch = e.changedTouches.item(i);
        this.activeTouches.delete(touch.identifier)
      }
      if (this.activeTouches.size > 0) {
        let center = TouchPoint.center(this.activeTouches);
        if (center != null) {
          this.grab(center.x, center.y);
        }
      } else {
        this.release();
      }
    } else {
      this.release();
    }
  }

  gestureCancel(e) {
    console.log(`gestureCancel(${e})`)
    e.preventDefault();

    this.gestureEnd(e);
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
    console.log("Grabbing with handleY=" + this.handleY + ", p.y=" + p.y + " => dragOffset=" + this.dragOffset);
  }

  drag(x, y) {
    if (this.isGrabbed) {
      var p = pointIn(this.group, x, y);
      var newHandleY = p.y - this.dragOffset;
      console.log("Dragged with p.y=" + p.y + ", dragOffset=" + this.dragOffset + " => new handleY=" + newHandleY);
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
      if (this.onValueChanged) {
        this.onValueChanged(this);
      }
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

  makeLabelText(fontSize, bold = false, italic = false) {
    let factor = this.fontSizeFactors[bold ? (italic ? 'bold_italic' : 'bold') : (italic ? 'italic' : '')];
    var labelText = createElement("text");
    labelText.setAttribute('font-size', `${fontSize * factor}`);
    labelText.setAttribute('font-family', 'Panel');
    if (bold) {
      labelText.setAttribute('font-weight', 'bold');
    }
    if (italic) {
      labelText.setAttribute('font-style', 'italic');
    }
    return labelText;
  }

  fontSizeFactor(bold = false, italic = false) {
    let canvas = document.getElementById("measure");

    let scale = 10000;
    let font = `${scale}px`;
    if (bold) font = `${font} bold`;
    if (italic) font = `${font} italic`;
    font = `${font} Panel`;

    let ctx = canvas.getContext("2d");
    ctx.textBaseline = "alphabetic";
    ctx.font = font;
   
    let m = ctx.measureText("Mlj");
    
    let ascent = m.fontBoundingBoxAscent;
    let descent = m.fontBoundingBoxDescent;
    let text_up = m.actualBoundingBoxAscent;
    let text_down = m.actualBoundingBoxDescent;

    console.log(`Measuring '${font}': ascent=${ascent}, descent=${descent}, up=${text_up}, down=${text_down}`);

    let factor = scale / (text_up + text_down);

    console.log(`font size factor for '${font} = ${factor}`);
    return factor;
  }

  addLabel(x, y, w, label, fontSize, bold = false, italic = false, centered = False, stretched = False, color = null) {
    if (color == null) {
      color = 'white'
    }
    let labelText = this.makeLabelText(fontSize, bold, italic);
    labelText.setAttribute('fill', color);
    labelText.setAttribute('stroke', 'none');
    labelText.setAttribute('y', y + 0.01 * fontSize);
    if (centered) {
      labelText.setAttribute('x', x + w/2);
      labelText.setAttribute('text-anchor', 'middle');
    } else if (stretched) {
      labelText.setAttribute('x', x);
      labelText.setAttribute('textLength', w);
      labelText.setAttribute('lengthAdjust', 'spacingAndGlyphs');
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
      that.onSliderChanged(s);
    }

    return slider;
  }

  addWheel(x, y, w, h, channel, value, autocenter = false) {
    var that = this;
    var wheel = new Wheel(x, y, w, h, channel, value, autocenter);

    this.mainContainer.appendChild(wheel.group);
    this.analogControls[channel] = wheel;

    wheel.onValueChanged = function(s) {
      that.onWheelChanged(s);
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

  addEllipse(x, y, w, h, color) {
    let ellipse = createElement("ellipse");
    ellipse.setAttribute("cx", x + w/2);
    ellipse.setAttribute("cy", y + h/2);
    ellipse.setAttribute("rx", w / 2);
    ellipse.setAttribute("ry", h / 2);
    ellipse.setAttribute("fill", color);
    this.decorationsContainer.appendChild(ellipse);
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

  addKeyboard(x, y, w, h, color) {
    let rectangle = createElement("rect");
    rectangle.setAttribute("x", x);
    rectangle.setAttribute("y", y);
    rectangle.setAttribute("width", w);
    rectangle.setAttribute("height", h);
    rectangle.setAttribute("rx", 2);
    rectangle.setAttribute("fill", color);
    this.decorationsContainer.appendChild(rectangle);
  }

  addKey(x, y, w, h, keyNumber, black, path) {
    let key = new Key(x, y, keyNumber, black, path)
    this.mainContainer.appendChild(key.element);
  }

  addPath(x, y, d, fill=null, stroke=null, stroke_width=null) {
    const path = createElement("path");
    path.setAttribute("transform", `translate(${x} ${y})`);
    path.setAttribute("y", y);
    path.setAttribute("d", d);
    if (fill != null) path.setAttribute("fill", fill);
    if (stroke != null) path.setAttribute("stroke", stroke);
    if (stroke_width != null) path.setAttribute("stroke-width", stroke_width);
    this.decorationsContainer.appendChild(path);
  }

  addDrawing(x, y, w, h, viewBox, contents) {
    const svg = createElement("svg");
    svg.setAttribute("x", x);
    svg.setAttribute("y", y);
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("preserveAspectRatio", "none");

    for (var i = 0; i < contents.length; i++) {
      const part = contents[i];
      const element = createElement(part.tag);
      for (const [k, v] of Object.entries(part)) {
        if (k != 'tag') {
          element.setAttribute(k, v);
        }
      }

      svg.appendChild(element);
    }
    this.decorationsContainer.appendChild(svg);
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

    console.log("Getting font size factors:");
    this.fontSizeFactors = {
      '': this.fontSizeFactor(false, false),
      'bold' : this.fontSizeFactor(true, false),
      'italic': this.fontSizeFactor(false, true),
      'bold,italic': this.fontSizeFactor(true, true),
    };
    
    this.fontSizeFactor(true, false);
    this.fontSizeFactor(false, true);
    this.fontSizeFactor(true, true);

    // Now (re-)populate the root.
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
    this.messageText.setAttribute('font-family', 'Panel');
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

  onSliderChanged(slider) {
    // 0.05 == 0; 0.95 == 760
    var value = (slider.value - 0.05) / 0.9;
    value = 760 * value;
    value = Math.round(Math.max(0, Math.min(1023, value)));
    var s = "A " + slider.channel + " " + value;

    console.log(`sending slider value: ${s}`);
    this.sendString(s);
  }

  onWheelChanged(wheel) {
    let value = Math.round(Math.max(0, Math.min(1023, 1023 * (1.0 - wheel.value))));
    var s = "A " + wheel.channel + " " + value;

    console.log(`sending wheel value: ${s}`);
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
    option.text = "Full";
    option.value = 0;    select.appendChild(option);
    option = document.createElement('option');
    option.text = "Compact";
    option.value = 1;    select.appendChild(option);
    option = document.createElement('option');
    option.text = "Panel";
    option.value = 2;    select.appendChild(option);
    option = document.createElement('option');
    option.text = "Tablet";
    option.value = 3;    select.appendChild(option);
  }
  populateFullView(hasSeq, isSd1, isSd132) {
    this.addRectangle(-156, -32, 1023, 334.5, Colors.BLACK);
    if (isSd1) {
      this.accentColor = Colors.SD1;
    } else { // not isSd1
      this.accentColor = Colors.VFX;
    }
    this.addRectangle(0, 0, 845, 121.5, Colors.PANEL);
    // Starting group 'Sliders' at offset 120,0
    this.addSlider(120, 15, 20, 60, 5, 0.5);
    this.addButton(167.5, 60, 15.8, 5, 63, Colors.BUTTON_DARK);
    this.addButton(167.5, 35, 15.8, 5, 62, Colors.BUTTON_DARK);
    this.addDrawing(172.5, 55, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          "d": `M0 0H2L1 1Z`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addDrawing(172.5, 30, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          "d": `M0 1H2L 1 0Z`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addSlider(190, 15, 20, 60, 3, 0.5);
    this.addRectangle(120, 102, 90, 1.2, this.accentColor);
    this.addLabel(120, 100.5, 35, "Volume", 3.6, true, false, false, false, null);
    this.addLabel(167.5, 100.5, 35, "Data Entry", 3.6, true, false, false, false, null);
    // Ending group 'Sliders'
    this.addRectangle(209, 102, 27, 1.2, this.accentColor);
    // Starting group 'DisplayAndButtons' at offset 235,0
    this.addRectangle(235, 8, 245, 67.5, Colors.GLASS);

    this.displayContainer = createElement("svg");
    this.display = new Display(this.displayContainer, 2, 40);
    this.displayContainer.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.displayContainer.setAttribute("x", 247.0);
    this.displayContainer.setAttribute("y", 32.5093567251462);
    this.displayContainer.setAttribute("width", 221.0);
    this.displayContainer.setAttribute("height", 18.481286549707605);
    this.root.appendChild(this.displayContainer);

    this.addButton(295, 65.5, 15.8, 5, 50, Colors.BUTTON_SCREEN);
    this.addButton(361, 65.5, 15.8, 5, 44, Colors.BUTTON_SCREEN);
    this.addButton(427, 65.5, 15.8, 5, 45, Colors.BUTTON_SCREEN);
    this.addButton(295, 13, 15.8, 5, 58, Colors.BUTTON_SCREEN);
    this.addButton(361, 13, 15.8, 5, 42, Colors.BUTTON_SCREEN);
    this.addButton(428, 13, 15.8, 5, 43, Colors.BUTTON_SCREEN);
    this.addButton(235, 82, 15.8, 10, 52, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 15));
    if (isSd1) {
      this.addLabel(235, 100.5, 15.8, "BankSet", 3.6, true, false, true, false, null);
    } else { // not isSd1
      this.addLabel(235, 100.5, 15.8, "Cart", 3.6, true, false, true, false, null);
    }
    this.addButton(250.8, 82, 15.8, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 13));
    this.addLabel(250.8, 100.5, 15.8, "Sounds", 3.6, true, false, true, false, null);
    this.addButton(266.6, 82, 15.8, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 7));
    this.addLabel(266.6, 100.5, 15.8, "Presets", 3.6, true, false, true, false, null);
    if (hasSeq) {
      this.addButton(282.4, 82, 15.8, 10, 51, Colors.BUTTON_LIGHT);
      this.addLabel(282.4, 100.5, 15.8, "Seq", 3.6, true, false, true, false, null);
    } else { // not hasSeq
    }
    this.addButton(322, 82, 15.8, 10, 55, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 14));
    this.addButton(337.8, 82, 15.8, 10, 56, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 6));
    this.addButton(353.6, 82, 15.8, 10, 57, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 4));
    this.addButton(369.4, 82, 15.8, 10, 46, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 12));
    this.addButton(385.2, 82, 15.8, 10, 47, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 3));
    this.addButton(401, 82, 15.8, 10, 48, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 11));
    this.addButton(416.8, 82, 15.8, 10, 49, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 2));
    this.addButton(432.6, 82, 15.8, 10, 35, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 10));
    this.addButton(448.4, 82, 15.8, 10, 34, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 1));
    this.addButton(464.2, 82, 15.8, 10, 25, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 9));
    this.addLabel(322.0, 100.5, 15.8, "0", 3.6, true, false, true, false, null);
    this.addLabel(337.8, 100.5, 15.8, "1", 3.6, true, false, true, false, null);
    this.addLabel(353.6, 100.5, 15.8, "2", 3.6, true, false, true, false, null);
    this.addLabel(369.4, 100.5, 15.8, "3", 3.6, true, false, true, false, null);
    this.addLabel(385.2, 100.5, 15.8, "4", 3.6, true, false, true, false, null);
    this.addLabel(401.0, 100.5, 15.8, "5", 3.6, true, false, true, false, null);
    this.addLabel(416.8, 100.5, 15.8, "6", 3.6, true, false, true, false, null);
    this.addLabel(432.6, 100.5, 15.8, "7", 3.6, true, false, true, false, null);
    this.addLabel(448.4, 100.5, 15.8, "8", 3.6, true, false, true, false, null);
    this.addLabel(464.2, 100.5, 15.8, "9", 3.6, true, false, true, false, null);
    this.addRectangle(235, 102, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    this.addRectangle(479, 102, 24.5, 1.2, this.accentColor);
    // Starting group 'Buttons' at offset 505,0
    this.addButton(505, 82, 15.8, 10, 29, Colors.BUTTON_MEDIUM);
    this.addLabel(505, 76.82275193988802, 15.8, "Replace", 3.6, false, true, false, false, null);
    this.addLabel(505, 80.42275193988802, 15.8, "Program", 3.6, false, true, false, false, null);
    this.addButton(625, 82, 15.8, 10, 5, Colors.BUTTON_MEDIUM);
    this.addLabel(625, 76.82275193988802, 15.8, "Select", 3.6, false, true, false, false, null);
    this.addLabel(625, 80.42275193988802, 15.8, "Voice", 3.6, false, true, false, false, null);
    this.addButton(640.8, 82, 15.8, 10, 9, Colors.BUTTON_MEDIUM);
    this.addLabel(640.8, 80.42275193988803, 15.8, "Copy", 3.6, false, true, false, false, null);
    this.addButton(656.6, 82, 15.8, 10, 3, Colors.BUTTON_MEDIUM);
    this.addLabel(656.6, 80.42275193988803, 15.8, "Write", 3.6, false, true, false, false, null);
    this.addButton(672.4, 82, 15.8, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 5));
    this.addLabel(672.4, 80.42275193988803, 15.8, "Compare", 3.6, false, true, false, false, null);
    this.addButton(505, 62, 15.8, 5, 26, Colors.BUTTON_DARK);
    this.addLabel(505, 56.82275193988802, 15.8, "Patch", 3.6, false, true, false, false, null);
    this.addLabel(505, 60.42275193988802, 15.8, "Select", 3.6, false, true, false, false, null);
    this.addDrawing(515.39, 55.3, 3.3728, 5.1228,
      "0 0 3.372798843337143 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 2.247798843337143 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 2.035242281667121 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(520.8, 62, 15.8, 5, 27, Colors.BUTTON_DARK);
    this.addLabel(520.8, 60.42275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
    this.addDrawing(522.46, 55.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(536.6, 62, 15.8, 5, 28, Colors.BUTTON_DARK);
    this.addLabel(536.6, 60.42275193988802, 15.8, "Effects", 3.6, false, true, false, false, null);
    this.addDrawing(541.92, 55.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(505, 42, 15.8, 5, 39, Colors.BUTTON_DARK);
    this.addLabel(505, 36.82275193988802, 15.8, "Key", 3.6, false, true, false, false, null);
    this.addLabel(505, 40.42275193988802, 15.8, "Zone", 3.6, false, true, false, false, null);
    this.addButton(520.8, 42, 15.8, 5, 40, Colors.BUTTON_DARK);
    this.addLabel(520.8, 36.82275193988802, 15.8, "Trans-", 3.6, false, true, false, false, null);
    this.addLabel(520.8, 40.42275193988802, 15.8, "pose", 3.6, false, true, false, false, null);
    this.addButton(536.6, 42, 15.8, 5, 41, Colors.BUTTON_DARK);
    this.addLabel(536.6, 40.42275193988802, 15.8, "Release", 3.6, false, true, false, false, null);
    this.addButton(505, 22, 15.8, 5, 36, Colors.BUTTON_DARK);
    this.addLabel(505, 20.422751939888027, 15.8, "Volume", 3.6, false, true, false, false, null);
    this.addButton(520.8, 22, 15.8, 5, 37, Colors.BUTTON_DARK);
    this.addLabel(520.8, 20.422751939888027, 15.8, "Pan", 3.6, false, true, false, false, null);
    this.addButton(536.6, 22, 15.8, 5, 38, Colors.BUTTON_DARK);
    this.addLabel(536.6, 20.422751939888027, 15.8, "Timbre", 3.6, false, true, false, false, null);
    this.addButton(625, 62, 15.8, 5, 4, Colors.BUTTON_DARK);
    this.addLabel(625, 60.42275193988802, 15.8, "Wave", 3.6, false, true, false, false, null);
    this.addButton(640.8, 62, 15.8, 5, 6, Colors.BUTTON_DARK);
    this.addLabel(640.8, 56.82275193988802, 15.8, "Mod", 3.6, false, true, false, false, null);
    this.addLabel(640.8, 60.42275193988802, 15.8, "Mixer", 3.6, false, true, false, false, null);
    this.addButton(656.6, 62, 15.8, 5, 2, Colors.BUTTON_DARK);
    this.addLabel(656.6, 56.82275193988802, 15.8, "Program", 3.6, false, true, false, false, null);
    this.addLabel(656.6, 60.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
    this.addButton(672.4, 62, 15.8, 5, 7, Colors.BUTTON_DARK);
    this.addLabel(672.4, 60.42275193988802, 15.8, "Effects", 3.6, false, true, false, false, null);
    this.addDrawing(677.72, 55.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(625, 42, 15.8, 5, 11, Colors.BUTTON_DARK);
    this.addLabel(625, 40.42275193988802, 15.8, "Pitch", 3.6, false, true, false, false, null);
    this.addButton(640.8, 42, 15.8, 5, 13, Colors.BUTTON_DARK);
    this.addLabel(640.8, 36.82275193988802, 15.8, "Pitch", 3.6, false, true, false, false, null);
    this.addLabel(640.8, 40.42275193988802, 15.8, "Mod", 3.6, false, true, false, false, null);
    this.addButton(656.6, 42, 15.8, 5, 15, Colors.BUTTON_DARK);
    this.addLabel(656.6, 40.42275193988802, 15.8, "Filters", 3.6, false, true, false, false, null);
    this.addDrawing(660.63, 35.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(672.4, 42, 15.8, 5, 17, Colors.BUTTON_DARK);
    this.addLabel(672.4, 40.42275193988802, 15.8, "Output", 3.6, false, true, false, false, null);
    this.addDrawing(677.51, 35.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(625, 22, 15.8, 5, 10, Colors.BUTTON_DARK);
    this.addLabel(625, 20.422751939888027, 15.8, "LFO", 3.6, false, true, false, false, null);
    this.addDrawing(626.02, 15.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(640.8, 22, 15.8, 5, 12, Colors.BUTTON_DARK);
    this.addLabel(640.8, 20.422751939888027, 15.8, "Env1", 3.6, false, true, false, false, null);
    this.addDrawing(643.11, 15.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(656.6, 22, 15.8, 5, 14, Colors.BUTTON_DARK);
    this.addLabel(656.6, 20.422751939888027, 15.8, "Env2", 3.6, false, true, false, false, null);
    this.addDrawing(658.91, 15.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(672.4, 22, 15.8, 5, 16, Colors.BUTTON_DARK);
    this.addLabel(672.4, 20.422751939888027, 15.8, "Env3", 3.6, false, true, false, false, null);
    this.addDrawing(674.71, 15.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    if (hasSeq) {
      this.addLabel(520.8, 76.6, 31.6, "Tracks", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(520.8, 75.472, 10.419, 0.25, Colors.WHITE);
      this.addRectangle(541.98, 75.472, 10.419, 0.25, Colors.WHITE);
      this.addButton(520.8, 82, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addLabel(520.8, 80.42275193988803, 15.8, "1-6", 3.6, false, true, true, false, null);
      this.addButton(536.6, 82, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addLabel(536.6, 80.42275193988803, 15.8, "7-12", 3.6, false, true, true, false, null);
      this.addButton(565, 82, 15.8, 10, 19, Colors.BUTTON_MEDIUM);
      this.addLabel(565.0, 80.42275193988803, 15.8, "Rec", 3.6, false, true, false, false, null);
      this.addButton(580.8, 82, 15.8, 10, 22, Colors.BUTTON_MEDIUM);
      this.addLabel(580.8, 76.82275193988802, 15.8, "Stop", 3.6, false, true, false, false, null);
      this.addLabel(580.8, 80.42275193988802, 15.8, "/Cont", 3.6, false, true, false, false, null);
      this.addButton(596.6, 82, 15.8, 10, 23, Colors.BUTTON_MEDIUM);
      this.addLabel(596.6, 80.42275193988803, 15.8, "Play", 3.6, false, true, false, false, null);
      this.addButton(565, 62, 15.8, 5, 32, Colors.BUTTON_DARK);
      this.addLabel(565.0, 60.42275193988802, 15.8, "Click", 3.6, false, true, false, false, null);
      this.addButton(580.8, 62, 15.8, 5, 18, Colors.BUTTON_DARK);
      this.addLabel(580.8, 56.82275193988802, 15.8, "Seq", 3.6, false, true, false, false, null);
      this.addLabel(580.8, 60.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addDrawing(588.18, 55.3, 8.1026, 5.1228,
        "0 0 8.102550341225367 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 6.977550341225367 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 6.764993779555345 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(596.6, 62, 15.8, 5, 33, Colors.BUTTON_DARK);
      this.addLabel(596.6, 60.42275193988802, 15.8, "Locate", 3.6, false, true, false, false, null);
      this.addDrawing(601.71, 55.3, 9.5128, 5.1228,
        "0 0 9.512844025539286 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(565, 42, 15.8, 5, 60, Colors.BUTTON_DARK);
      this.addLabel(565.0, 40.42275193988802, 15.8, "Song", 3.6, false, true, false, false, null);
      this.addButton(580.8, 42, 15.8, 5, 59, Colors.BUTTON_DARK);
      this.addLabel(580.8, 40.42275193988802, 15.8, "Seq", 3.6, false, true, false, false, null);
      this.addButton(596.6, 42, 15.8, 5, 61, Colors.BUTTON_DARK);
      this.addLabel(596.6, 40.42275193988802, 15.8, "Track", 3.6, false, true, false, false, null);
      this.addButton(565, 22, 15.8, 5, 20, Colors.BUTTON_LIGHT);
      this.addLabel(565.0, 20.422751939888027, 15.8, "Master", 3.6, false, true, false, false, null);
      this.addDrawing(570.31, 15.3, 9.5128, 5.1228,
        "0 0 9.512844025539286 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(580.8, 22, 15.8, 5, 21, Colors.BUTTON_LIGHT);
      this.addLabel(580.8, 20.422751939888027, 15.8, "Storage", 3.6, false, true, false, false, null);
      this.addButton(596.69, 22, 15.8, 5, 24, Colors.BUTTON_LIGHT);
      this.addLabel(596.69, 16.822751939888025, 15.8, "MIDI", 3.6, false, true, false, false, null);
      this.addLabel(596.69, 20.422751939888027, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addDrawing(605.35, 15.3, 6.8239, 5.1228,
        "0 0 6.823933309499605 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 5.698933309499605 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 5.486376747829583 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addLabel(565.0, 36.6, 47.400000000000006, "Edit", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(565, 35.472, 20.087, 0.25, Colors.WHITE);
      this.addRectangle(592.31, 35.472, 20.087, 0.25, Colors.WHITE);
      this.addLabel(565, 9.681537913760927, 35, "System", 3.6, true, false, false, false, null);
      this.addRectangle(565, 11, 58.5, 0.5, this.accentColor);
      this.addLabel(565, 100.5, 35, "Sequencer", 3.6, true, false, false, false, null);
    } else { // not hasSeq
      this.addLabel(520.8, 76.6, 31.6, "Multi", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(520.8, 75.472, 11.576, 0.25, Colors.WHITE);
      this.addRectangle(540.82, 75.472, 11.576, 0.25, Colors.WHITE);
      this.addButton(520.8, 82, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addLabel(520.8, 80.42275193988803, 15.8, "A", 3.6, false, true, true, false, null);
      this.addButton(536.6, 82, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addLabel(536.6, 80.42275193988803, 15.8, "B", 3.6, false, true, true, false, null);
      this.addButton(565, 82, 15.8, 10, 20, Colors.BUTTON_LIGHT);
      this.addLabel(565, 80.42275193988803, 15.8, "Master", 3.6, false, true, false, false, null);
      this.addButton(580.8, 82, 15.8, 10, 21, Colors.BUTTON_LIGHT);
      this.addLabel(580.8, 80.42275193988803, 15.8, "Storage", 3.6, false, true, false, false, null);
      this.addButton(596.6, 82, 15.8, 10, 24, Colors.BUTTON_LIGHT);
      this.addLabel(596.6, 76.82275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
      this.addLabel(596.6, 80.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addLabel(565, 100.5, 35, "System", 3.6, true, false, false, false, null);
    }
    this.addRectangle(505, 102, 58.5, 1.2, this.accentColor);
    this.addRectangle(565, 102, 58.5, 1.2, this.accentColor);
    this.addRectangle(625, 102, 63.2, 1.2, this.accentColor);
    this.addLabel(505, 100.5, 35, "Performance", 3.6, true, false, false, false, null);
    this.addLabel(625, 100.5, 35, "Programming", 3.6, true, false, false, false, null);
    // Ending group 'Buttons'
    this.addRectangle(720, 22, 56, 27, Colors.BODY_DOWN);
    this.addRectangle(721.5, 23.5, 53, 24, Colors.BODY_UP);
    this.addLabel(720, 20.5, 56, "Cartridge", 3.6, false, true, false, false, null);
    // Starting group 'BackPanel' at offset 0,-32
    this.addRectangle(0, -32, 845, 32, Colors.BODY);
    this.addLabel(97, -18.377248060111974, 10, "Power", 3.6, false, true, false, false, null);
    this.addLabel(131, -18.377248060111974, 8, "Line", 3.6, false, true, false, false, null);
    this.addLabel(165, -18.377248060111974, 10, "Fuse", 3.6, false, true, false, false, null);
    this.addRectangle(477, -17.559, 87, 0.25, Colors.WHITE);
    this.addLabel(477, -18.377248060111974, 87, "MIDI", 3.6, false, true, true, false, null);
    this.addLabel(480, -14.05, 8, "Thru", 3.6, false, true, false, false, null);
    this.addLabel(518, -14.05, 8, "Out", 3.6, false, true, false, false, null);
    this.addLabel(558, -14.05, 4, "In", 3.6, false, true, false, false, null);
    this.addLabel(640, -18.377248060111974, 12, "Ft. Sw.", 3.6, false, true, false, false, null);
    this.addLabel(663, -18.377248060111974, 17, "Pedal•CV", 3.6, false, true, false, false, null);
    if (hasSeq) {
      this.addRectangle(690, -17.559, 38, 0.25, Colors.WHITE);
      this.addLabel(692, -18.377248060111974, 8, "Left", 3.6, false, true, false, false, null);
      this.addLabel(717, -18.377248060111974, 10, "Right", 3.6, false, true, false, false, null);
      this.addLabel(690, -14.05, 38, "Mono", 3.6, false, true, true, false, null);
      this.addLabel(690, -23.5, 38, "Aux. Out", 3.6, false, true, true, false, null);
      this.addRectangle(740, -17.559, 38, 0.25, Colors.WHITE);
      this.addLabel(742, -18.377248060111974, 8, "Left", 3.6, false, true, false, false, null);
      this.addLabel(767, -18.377248060111974, 10, "Right", 3.6, false, true, false, false, null);
      this.addLabel(740, -14.05, 38, "Mono", 3.6, false, true, true, false, null);
      this.addLabel(740, -23.5, 38, "Main Out", 3.6, false, true, true, false, null);
    } else { // not hasSeq
      this.addRectangle(740, -17.559, 38, 0.25, Colors.WHITE);
      this.addLabel(742, -18.377248060111974, 8, "Left", 3.6, false, true, false, false, null);
      this.addLabel(767, -18.377248060111974, 10, "Right", 3.6, false, true, false, false, null);
      this.addLabel(740, -14.05, 38, "Mono", 3.6, false, true, true, false, null);
      this.addLabel(740, -23.5, 38, "Main Out", 3.6, false, true, true, false, null);
    }
    this.addLabel(790, -18.377248060111974, 15, "Phones", 3.6, false, true, false, false, null);
    this.addEllipse(2, -14, 6, 6, Colors.SCREWHEAD);
    this.addEllipse(837, -14, 6, 6, Colors.SCREWHEAD);
    // Ending group 'BackPanel'
    this.addRectangle(0, 121.5, 845, 170, Colors.BODY);
    if (hasSeq) {
      this.addLabel(13, 10.622751939888026, 88, "MUSIC PRODUCTION SYNTHESIZER", 3.6, false, false, false, true, null);
    } else { // not hasSeq
      this.addLabel(13, 10.622751939888026, 88, "DYNAMIC COMPONENT SYNTHESIZER", 3.6, false, false, false, true, null);
    }
    this.addDrawing(760, 90, 72, 13,
      "0 0 72 13",
      [
        {
          tag: "rect",
          "x": `0.5`,
          "y": `0.5`,
          "width": `71`,
          "height": `12`,
          "rx": `1`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `1`,
        },
      ]);
    this.addLabel(762, 100.24974216678125, 68, "ensoniq", 12.0, false, false, false, true, null);
    if (isSd1) {
      if (isSd132) {
        this.addRectangle(13, 97.5, 67, 7, this.accentColor);
        this.addLabel(14, 103.5, 65, "3      2      -      V      O      I      C      E", 6.15400889312011, false, false, false, true, Colors.PANEL);
        this.addLabel(13, 94.5, 67, "SD-1", 33.231648022848596, false, false, false, true, null);
      } else { // not isSd132
        this.addLabel(13, 104.5, 67, "SD-1", 33.231648022848596, false, false, false, true, null);
      }
    } else { // not isSd1
      if (hasSeq) {
        this.addLabel(13, 104.5, 67, "VFX-SD", 27.800060679611654, false, false, false, true, null);
      } else { // not hasSeq
        this.addLabel(13, 104.5, 92, "VFX", 44.274170711974115, false, false, false, true, null);
      }
    }
    this.addRectangle(-156, -32, 20, 334.5, Colors.BODY);
    this.addRectangle(847, -32, 20, 334.5, Colors.BODY);
    this.addRectangle(-134, -32, 132, 334.5, Colors.BODY);
    this.addDrawing(-127, 13, 118, 96,
      "0 0 118 96",
      [
        {
          tag: "path",
          "d": `M 0 0 H 118 L 108 10 H 10 Z`,
          "fill": `#101010`,
          "stroke": `none`,
        },
        {
          tag: "path",
          "d": `M 0 0 V 96 L 10 10 Z`,
          "fill": `#101010`,
          "stroke": `none`,
        },
        {
          tag: "path",
          "d": `M 118 0 V 96 L 108 10 Z`,
          "fill": `#303030`,
          "stroke": `none`,
        },
        {
          tag: "path",
          "d": `M 0 96 H 119 L 108 10 H 10 Z`,
          "fill": `#282828`,
          "stroke": `none`,
        },
      ]);
    this.addDrawing(-127, 129.5, 118, 162,
      "0 0 118 161",
      [
        {
          tag: "rect",
          "x": `0`,
          "y": `0`,
          "width": `5`,
          "height": `161`,
          "rx": `0`,
          "fill": `#101010`,
          "stroke": `none`,
        },
        {
          tag: "rect",
          "x": `113`,
          "y": `0`,
          "width": `5`,
          "height": `161`,
          "rx": `0`,
          "fill": `#303030`,
          "stroke": `none`,
        },
        {
          tag: "path",
          "d": `M 0 0 H 118 L 113 13 H 5 Z`,
          "fill": `#101010`,
          "stroke": `none`,
        },
      ]);
    if (hasSeq) {
      this.addDrawing(-119, 129.5, 102, 13,
        "0 0 102 36",
        [
          {
            tag: "rect",
            "x": `0`,
            "y": `0`,
            "width": `102`,
            "height": `5`,
            "rx": `0`,
            "fill": `#444444`,
            "stroke": `none`,
          },
          {
            tag: "rect",
            "x": `0`,
            "y": `5`,
            "width": `102`,
            "height": `31`,
            "rx": `0`,
            "fill": `#333333`,
            "stroke": `none`,
          },
          {
            tag: "path",
            "d": `M 3 6 H 74 V 3 H 99 V 20 H 74 V 16 H 3 Z`,
            "fill": `#2a2a2a`,
            "stroke": `none`,
          },
          {
            tag: "path",
            "d": `M 5 9 H 97 V 13 H 5 Z`,
            "fill": `#222222`,
            "stroke": `none`,
          },
          {
            tag: "path",
            "d": `M 63 22.5 H 68 V 24.5 H 63 Z`,
            "fill": `#112211`,
            "stroke": `none`,
          },
          {
            tag: "path",
            "d": `M 74 21 h 25 v 26 H 74 Z`,
            "fill": `#2a2a2a`,
            "stroke": `none`,
          },
        ]);
      this.addLight(-56, 137.62, 5, 0.72222, 16);
    } else { // not hasSeq
    }
    // Starting group 'WheelArea' at offset -122,169.5
    this.addRectangle(-122, 169.5, 108, 122, Colors.PANEL);
    this.addPatchSelectButton(-116, 171.5, 9, 12, 1);
    this.addPatchSelectButton(-101, 171.5, 9, 12, 0);
    this.addLabel(-91, 179.9, 15, "Patch", 3.6, false, true, false, false, null);
    this.addLabel(-91, 183.5, 15, "Select", 3.6, false, true, false, false, null);
    this.addWheel(-92.5, 195.5, 13, 66, 0, 0.5, true);
    this.addDrawing(-75.5, 195.5, 4, 66,
      "0 0 4 66",
      [
        {
          tag: "path",
          "d": `M 0.25 0.25 H 3.5 L 2 30 Z M 0.25 65.75 H 3.5 L 2 36 Z`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.5`,
        },
        {
          tag: "circle",
          "cx": `2`,
          "cy": `33`,
          "r": `1`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addWheel(-55.5, 195.5, 13, 66, 2, 0.5, false);
    this.addDrawing(-38.5, 195.5, 4, 66,
      "0 0 4 66",
      [
        {
          tag: "path",
          "d": `M 0.25 0.25 H 3 L 2 65.75 Z`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.5`,
        },
      ]);
    this.addRectangle(-122, 268.5, 28, 1.2, this.accentColor);
    this.addRectangle(-92.5, 268.5, 35.5, 1.2, this.accentColor);
    this.addLabel(-92.5, 267.0, 15, "Pitch", 3.6, true, false, false, false, null);
    this.addRectangle(-55.5, 268.5, 41.5, 1.2, this.accentColor);
    this.addLabel(-55.5, 267.0, 15, "Mod", 3.6, true, false, false, false, null);
    // Ending group 'WheelArea'
    this.addKeyboard(0.0, 153.5, 845.0, 138, Colors.KEYBOARD_BACKGROUND)
    this.addKey(0, 153.5, 22.5, 138, 36, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 13 V 0 Z");
    this.addKey(14.55, 153.5, 12, 88, 37, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(23.5, 153.5, 22.5, 138, 38, false, "M 4.6 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 17.6 V 0 Z");
    this.addKey(42.65, 153.5, 12, 88, 39, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(47, 153.5, 22.5, 138, 40, false, "M 9.2 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(70.5, 153.5, 22.5, 138, 41, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 11.7 V 0 Z");
    this.addKey(83.75, 153.5, 12, 88, 42, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(94, 153.5, 22.5, 138, 43, false, "M 3.3 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 15.3 V 0 Z");
    this.addKey(110.85, 153.5, 12, 88, 44, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(117.5, 153.5, 22.5, 138, 45, false, "M 6.9 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 18.9 V 0 Z");
    this.addKey(137.95, 153.5, 12, 88, 46, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(141, 153.5, 22.5, 138, 47, false, "M 10.5 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(164.5, 153.5, 22.5, 138, 48, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 13 V 0 Z");
    this.addKey(179.05, 153.5, 12, 88, 49, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(188, 153.5, 22.5, 138, 50, false, "M 4.6 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 17.6 V 0 Z");
    this.addKey(207.15, 153.5, 12, 88, 51, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(211.5, 153.5, 22.5, 138, 52, false, "M 9.2 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(235, 153.5, 22.5, 138, 53, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 11.7 V 0 Z");
    this.addKey(248.25, 153.5, 12, 88, 54, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(258.5, 153.5, 22.5, 138, 55, false, "M 3.3 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 15.3 V 0 Z");
    this.addKey(275.35, 153.5, 12, 88, 56, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(282, 153.5, 22.5, 138, 57, false, "M 6.9 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 18.9 V 0 Z");
    this.addKey(302.45, 153.5, 12, 88, 58, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(305.5, 153.5, 22.5, 138, 59, false, "M 10.5 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(329, 153.5, 22.5, 138, 60, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 13 V 0 Z");
    this.addKey(343.55, 153.5, 12, 88, 61, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(352.5, 153.5, 22.5, 138, 62, false, "M 4.6 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 17.6 V 0 Z");
    this.addKey(371.65, 153.5, 12, 88, 63, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(376, 153.5, 22.5, 138, 64, false, "M 9.2 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(399.5, 153.5, 22.5, 138, 65, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 11.7 V 0 Z");
    this.addKey(412.75, 153.5, 12, 88, 66, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(423, 153.5, 22.5, 138, 67, false, "M 3.3 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 15.3 V 0 Z");
    this.addKey(439.85, 153.5, 12, 88, 68, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(446.5, 153.5, 22.5, 138, 69, false, "M 6.9 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 18.9 V 0 Z");
    this.addKey(466.95, 153.5, 12, 88, 70, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(470, 153.5, 22.5, 138, 71, false, "M 10.5 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(493.5, 153.5, 22.5, 138, 72, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 13 V 0 Z");
    this.addKey(508.05, 153.5, 12, 88, 73, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(517, 153.5, 22.5, 138, 74, false, "M 4.6 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 17.6 V 0 Z");
    this.addKey(536.15, 153.5, 12, 88, 75, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(540.5, 153.5, 22.5, 138, 76, false, "M 9.2 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(564, 153.5, 22.5, 138, 77, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 11.7 V 0 Z");
    this.addKey(577.25, 153.5, 12, 88, 78, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(587.5, 153.5, 22.5, 138, 79, false, "M 3.3 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 15.3 V 0 Z");
    this.addKey(604.35, 153.5, 12, 88, 80, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(611, 153.5, 22.5, 138, 81, false, "M 6.9 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 18.9 V 0 Z");
    this.addKey(631.45, 153.5, 12, 88, 82, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(634.5, 153.5, 22.5, 138, 83, false, "M 10.5 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(658, 153.5, 22.5, 138, 84, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 13 V 0 Z");
    this.addKey(672.55, 153.5, 12, 88, 85, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(681.5, 153.5, 22.5, 138, 86, false, "M 4.6 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 17.6 V 0 Z");
    this.addKey(700.65, 153.5, 12, 88, 87, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(705, 153.5, 22.5, 138, 88, false, "M 9.2 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(728.5, 153.5, 22.5, 138, 89, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 11.7 V 0 Z");
    this.addKey(741.75, 153.5, 12, 88, 90, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(752, 153.5, 22.5, 138, 91, false, "M 3.3 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 15.3 V 0 Z");
    this.addKey(768.85, 153.5, 12, 88, 92, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(775.5, 153.5, 22.5, 138, 93, false, "M 6.9 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 18.9 V 0 Z");
    this.addKey(795.95, 153.5, 12, 88, 94, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(799, 153.5, 22.5, 138, 95, false, "M 10.5 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(822.5, 153.5, 22.5, 138, 96, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addEllipse(2, 129.5, 6, 6, Colors.SCREWHEAD);
    this.addEllipse(837, 129.5, 6, 6, Colors.SCREWHEAD);
    this.root.setAttribute("x", "0mm");
    this.root.setAttribute("y", "0mm");
    this.root.setAttribute("width", "1023mm");
    this.root.setAttribute("height", "334.5mm");
    this.root.setAttribute("viewBox", "-156 -32 1023 334.5");
  }
  populateCompactView(hasSeq, isSd1, isSd132) {
    if (isSd1) {
      this.accentColor = Colors.SD1;
    } else { // not isSd1
      this.accentColor = Colors.VFX;
    }
    this.addRectangle(-95, -11.941, 578.2, 107.14, Colors.PANEL);
    // Starting group 'Sliders' at offset -90,-13
    this.addSlider(-90, 2, 20, 60, 5, 0.5);
    this.addButton(-42.5, 47, 15.8, 5, 63, Colors.BUTTON_DARK);
    this.addButton(-42.5, 22, 15.8, 5, 62, Colors.BUTTON_DARK);
    this.addDrawing(-37.5, 42, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          "d": `M0 0H2L1 1Z`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addDrawing(-37.5, 17, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          "d": `M0 1H2L 1 0Z`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addSlider(-20, 2, 20, 60, 3, 0.5);
    this.addRectangle(-90, 89, 90, 1.2, this.accentColor);
    this.addLabel(-90, 87.5, 35, "Volume", 3.6, true, false, false, false, null);
    this.addLabel(-42.5, 87.5, 35, "Data Entry", 3.6, true, false, false, false, null);
    // Ending group 'Sliders'
    this.addRectangle(-1, 89, 27, 1.2, this.accentColor);
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

    this.addButton(85, 52.5, 15.8, 5, 50, Colors.BUTTON_SCREEN);
    this.addButton(151, 52.5, 15.8, 5, 44, Colors.BUTTON_SCREEN);
    this.addButton(217, 52.5, 15.8, 5, 45, Colors.BUTTON_SCREEN);
    this.addButton(85, 0, 15.8, 5, 58, Colors.BUTTON_SCREEN);
    this.addButton(151, 0, 15.8, 5, 42, Colors.BUTTON_SCREEN);
    this.addButton(218, 0, 15.8, 5, 43, Colors.BUTTON_SCREEN);
    this.addButton(25, 69, 15.8, 10, 52, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 15));
    if (isSd1) {
      this.addLabel(25, 87.5, 15.8, "BankSet", 3.6, true, false, true, false, null);
    } else { // not isSd1
      this.addLabel(25, 87.5, 15.8, "Cart", 3.6, true, false, true, false, null);
    }
    this.addButton(40.8, 69, 15.8, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 13));
    this.addLabel(40.8, 87.5, 15.8, "Sounds", 3.6, true, false, true, false, null);
    this.addButton(56.6, 69, 15.8, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 7));
    this.addLabel(56.6, 87.5, 15.8, "Presets", 3.6, true, false, true, false, null);
    if (hasSeq) {
      this.addButton(72.4, 69, 15.8, 10, 51, Colors.BUTTON_LIGHT);
      this.addLabel(72.4, 87.5, 15.8, "Seq", 3.6, true, false, true, false, null);
    } else { // not hasSeq
    }
    this.addButton(112, 69, 15.8, 10, 55, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 14));
    this.addButton(127.8, 69, 15.8, 10, 56, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 6));
    this.addButton(143.6, 69, 15.8, 10, 57, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 4));
    this.addButton(159.4, 69, 15.8, 10, 46, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 12));
    this.addButton(175.2, 69, 15.8, 10, 47, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 3));
    this.addButton(191, 69, 15.8, 10, 48, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 11));
    this.addButton(206.8, 69, 15.8, 10, 49, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 2));
    this.addButton(222.6, 69, 15.8, 10, 35, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 10));
    this.addButton(238.4, 69, 15.8, 10, 34, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 1));
    this.addButton(254.2, 69, 15.8, 10, 25, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 9));
    this.addLabel(112.0, 87.5, 15.8, "0", 3.6, true, false, true, false, null);
    this.addLabel(127.8, 87.5, 15.8, "1", 3.6, true, false, true, false, null);
    this.addLabel(143.6, 87.5, 15.8, "2", 3.6, true, false, true, false, null);
    this.addLabel(159.4, 87.5, 15.8, "3", 3.6, true, false, true, false, null);
    this.addLabel(175.2, 87.5, 15.8, "4", 3.6, true, false, true, false, null);
    this.addLabel(191.0, 87.5, 15.8, "5", 3.6, true, false, true, false, null);
    this.addLabel(206.8, 87.5, 15.8, "6", 3.6, true, false, true, false, null);
    this.addLabel(222.6, 87.5, 15.8, "7", 3.6, true, false, true, false, null);
    this.addLabel(238.4, 87.5, 15.8, "8", 3.6, true, false, true, false, null);
    this.addLabel(254.2, 87.5, 15.8, "9", 3.6, true, false, true, false, null);
    this.addRectangle(25, 89, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    this.addRectangle(269, 89, 24.5, 1.2, this.accentColor);
    // Starting group 'Buttons' at offset 295,-13
    this.addButton(295, 69, 15.8, 10, 29, Colors.BUTTON_MEDIUM);
    this.addLabel(295, 63.82275193988802, 15.8, "Replace", 3.6, false, true, false, false, null);
    this.addLabel(295, 67.42275193988802, 15.8, "Program", 3.6, false, true, false, false, null);
    this.addButton(415, 69, 15.8, 10, 5, Colors.BUTTON_MEDIUM);
    this.addLabel(415, 63.82275193988802, 15.8, "Select", 3.6, false, true, false, false, null);
    this.addLabel(415, 67.42275193988802, 15.8, "Voice", 3.6, false, true, false, false, null);
    this.addButton(430.8, 69, 15.8, 10, 9, Colors.BUTTON_MEDIUM);
    this.addLabel(430.8, 67.42275193988803, 15.8, "Copy", 3.6, false, true, false, false, null);
    this.addButton(446.6, 69, 15.8, 10, 3, Colors.BUTTON_MEDIUM);
    this.addLabel(446.6, 67.42275193988803, 15.8, "Write", 3.6, false, true, false, false, null);
    this.addButton(462.4, 69, 15.8, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 5));
    this.addLabel(462.4, 67.42275193988803, 15.8, "Compare", 3.6, false, true, false, false, null);
    this.addButton(295, 49, 15.8, 5, 26, Colors.BUTTON_DARK);
    this.addLabel(295, 43.82275193988802, 15.8, "Patch", 3.6, false, true, false, false, null);
    this.addLabel(295, 47.42275193988802, 15.8, "Select", 3.6, false, true, false, false, null);
    this.addDrawing(305.39, 42.3, 3.3728, 5.1228,
      "0 0 3.372798843337143 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 2.247798843337143 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 2.035242281667121 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(310.8, 49, 15.8, 5, 27, Colors.BUTTON_DARK);
    this.addLabel(310.8, 47.42275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
    this.addDrawing(312.46, 42.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(326.6, 49, 15.8, 5, 28, Colors.BUTTON_DARK);
    this.addLabel(326.6, 47.42275193988802, 15.8, "Effects", 3.6, false, true, false, false, null);
    this.addDrawing(331.92, 42.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(295, 29, 15.8, 5, 39, Colors.BUTTON_DARK);
    this.addLabel(295, 23.822751939888022, 15.8, "Key", 3.6, false, true, false, false, null);
    this.addLabel(295, 27.422751939888023, 15.8, "Zone", 3.6, false, true, false, false, null);
    this.addButton(310.8, 29, 15.8, 5, 40, Colors.BUTTON_DARK);
    this.addLabel(310.8, 23.822751939888022, 15.8, "Trans-", 3.6, false, true, false, false, null);
    this.addLabel(310.8, 27.422751939888023, 15.8, "pose", 3.6, false, true, false, false, null);
    this.addButton(326.6, 29, 15.8, 5, 41, Colors.BUTTON_DARK);
    this.addLabel(326.6, 27.422751939888023, 15.8, "Release", 3.6, false, true, false, false, null);
    this.addButton(295, 9, 15.8, 5, 36, Colors.BUTTON_DARK);
    this.addLabel(295, 7.422751939888027, 15.8, "Volume", 3.6, false, true, false, false, null);
    this.addButton(310.8, 9, 15.8, 5, 37, Colors.BUTTON_DARK);
    this.addLabel(310.8, 7.422751939888027, 15.8, "Pan", 3.6, false, true, false, false, null);
    this.addButton(326.6, 9, 15.8, 5, 38, Colors.BUTTON_DARK);
    this.addLabel(326.6, 7.422751939888027, 15.8, "Timbre", 3.6, false, true, false, false, null);
    this.addButton(415, 49, 15.8, 5, 4, Colors.BUTTON_DARK);
    this.addLabel(415, 47.42275193988802, 15.8, "Wave", 3.6, false, true, false, false, null);
    this.addButton(430.8, 49, 15.8, 5, 6, Colors.BUTTON_DARK);
    this.addLabel(430.8, 43.82275193988802, 15.8, "Mod", 3.6, false, true, false, false, null);
    this.addLabel(430.8, 47.42275193988802, 15.8, "Mixer", 3.6, false, true, false, false, null);
    this.addButton(446.6, 49, 15.8, 5, 2, Colors.BUTTON_DARK);
    this.addLabel(446.6, 43.82275193988802, 15.8, "Program", 3.6, false, true, false, false, null);
    this.addLabel(446.6, 47.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
    this.addButton(462.4, 49, 15.8, 5, 7, Colors.BUTTON_DARK);
    this.addLabel(462.4, 47.42275193988802, 15.8, "Effects", 3.6, false, true, false, false, null);
    this.addDrawing(467.72, 42.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(415, 29, 15.8, 5, 11, Colors.BUTTON_DARK);
    this.addLabel(415, 27.422751939888023, 15.8, "Pitch", 3.6, false, true, false, false, null);
    this.addButton(430.8, 29, 15.8, 5, 13, Colors.BUTTON_DARK);
    this.addLabel(430.8, 23.822751939888022, 15.8, "Pitch", 3.6, false, true, false, false, null);
    this.addLabel(430.8, 27.422751939888023, 15.8, "Mod", 3.6, false, true, false, false, null);
    this.addButton(446.6, 29, 15.8, 5, 15, Colors.BUTTON_DARK);
    this.addLabel(446.6, 27.422751939888023, 15.8, "Filters", 3.6, false, true, false, false, null);
    this.addDrawing(450.63, 22.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(462.4, 29, 15.8, 5, 17, Colors.BUTTON_DARK);
    this.addLabel(462.4, 27.422751939888023, 15.8, "Output", 3.6, false, true, false, false, null);
    this.addDrawing(467.51, 22.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(415, 9, 15.8, 5, 10, Colors.BUTTON_DARK);
    this.addLabel(415, 7.422751939888027, 15.8, "LFO", 3.6, false, true, false, false, null);
    this.addDrawing(416.02, 2.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(430.8, 9, 15.8, 5, 12, Colors.BUTTON_DARK);
    this.addLabel(430.8, 7.422751939888027, 15.8, "Env1", 3.6, false, true, false, false, null);
    this.addDrawing(433.11, 2.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(446.6, 9, 15.8, 5, 14, Colors.BUTTON_DARK);
    this.addLabel(446.6, 7.422751939888027, 15.8, "Env2", 3.6, false, true, false, false, null);
    this.addDrawing(448.91, 2.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(462.4, 9, 15.8, 5, 16, Colors.BUTTON_DARK);
    this.addLabel(462.4, 7.422751939888027, 15.8, "Env3", 3.6, false, true, false, false, null);
    this.addDrawing(464.71, 2.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    if (hasSeq) {
      this.addLabel(310.8, 63.599999999999994, 31.6, "Tracks", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(310.8, 62.472, 10.419, 0.25, Colors.WHITE);
      this.addRectangle(331.98, 62.472, 10.419, 0.25, Colors.WHITE);
      this.addButton(310.8, 69, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addLabel(310.8, 67.42275193988803, 15.8, "1-6", 3.6, false, true, true, false, null);
      this.addButton(326.6, 69, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addLabel(326.6, 67.42275193988803, 15.8, "7-12", 3.6, false, true, true, false, null);
      this.addButton(355, 69, 15.8, 10, 19, Colors.BUTTON_MEDIUM);
      this.addLabel(355.0, 67.42275193988803, 15.8, "Rec", 3.6, false, true, false, false, null);
      this.addButton(370.8, 69, 15.8, 10, 22, Colors.BUTTON_MEDIUM);
      this.addLabel(370.8, 63.82275193988802, 15.8, "Stop", 3.6, false, true, false, false, null);
      this.addLabel(370.8, 67.42275193988802, 15.8, "/Cont", 3.6, false, true, false, false, null);
      this.addButton(386.6, 69, 15.8, 10, 23, Colors.BUTTON_MEDIUM);
      this.addLabel(386.6, 67.42275193988803, 15.8, "Play", 3.6, false, true, false, false, null);
      this.addButton(355, 49, 15.8, 5, 32, Colors.BUTTON_DARK);
      this.addLabel(355.0, 47.42275193988802, 15.8, "Click", 3.6, false, true, false, false, null);
      this.addButton(370.8, 49, 15.8, 5, 18, Colors.BUTTON_DARK);
      this.addLabel(370.8, 43.82275193988802, 15.8, "Seq", 3.6, false, true, false, false, null);
      this.addLabel(370.8, 47.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addDrawing(378.18, 42.3, 8.1026, 5.1228,
        "0 0 8.102550341225367 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 6.977550341225367 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 6.764993779555345 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(386.6, 49, 15.8, 5, 33, Colors.BUTTON_DARK);
      this.addLabel(386.6, 47.42275193988802, 15.8, "Locate", 3.6, false, true, false, false, null);
      this.addDrawing(391.71, 42.3, 9.5128, 5.1228,
        "0 0 9.512844025539286 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(355, 29, 15.8, 5, 60, Colors.BUTTON_DARK);
      this.addLabel(355.0, 27.422751939888023, 15.8, "Song", 3.6, false, true, false, false, null);
      this.addButton(370.8, 29, 15.8, 5, 59, Colors.BUTTON_DARK);
      this.addLabel(370.8, 27.422751939888023, 15.8, "Seq", 3.6, false, true, false, false, null);
      this.addButton(386.6, 29, 15.8, 5, 61, Colors.BUTTON_DARK);
      this.addLabel(386.6, 27.422751939888023, 15.8, "Track", 3.6, false, true, false, false, null);
      this.addButton(355, 9, 15.8, 5, 20, Colors.BUTTON_LIGHT);
      this.addLabel(355.0, 7.422751939888027, 15.8, "Master", 3.6, false, true, false, false, null);
      this.addDrawing(360.31, 2.3, 9.5128, 5.1228,
        "0 0 9.512844025539286 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(370.8, 9, 15.8, 5, 21, Colors.BUTTON_LIGHT);
      this.addLabel(370.8, 7.422751939888027, 15.8, "Storage", 3.6, false, true, false, false, null);
      this.addButton(386.69, 9, 15.8, 5, 24, Colors.BUTTON_LIGHT);
      this.addLabel(386.69, 3.8227519398880254, 15.8, "MIDI", 3.6, false, true, false, false, null);
      this.addLabel(386.69, 7.422751939888027, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addDrawing(395.35, 2.3, 6.8239, 5.1228,
        "0 0 6.823933309499605 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 5.698933309499605 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 5.486376747829583 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addLabel(355.0, 23.6, 47.400000000000006, "Edit", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(355, 22.472, 20.087, 0.25, Colors.WHITE);
      this.addRectangle(382.31, 22.472, 20.087, 0.25, Colors.WHITE);
      this.addLabel(355, -3.318462086239073, 35, "System", 3.6, true, false, false, false, null);
      this.addRectangle(355, -2, 58.5, 0.5, this.accentColor);
      this.addLabel(355, 87.5, 35, "Sequencer", 3.6, true, false, false, false, null);
    } else { // not hasSeq
      this.addLabel(310.8, 63.599999999999994, 31.6, "Multi", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(310.8, 62.472, 11.576, 0.25, Colors.WHITE);
      this.addRectangle(330.82, 62.472, 11.576, 0.25, Colors.WHITE);
      this.addButton(310.8, 69, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addLabel(310.8, 67.42275193988803, 15.8, "A", 3.6, false, true, true, false, null);
      this.addButton(326.6, 69, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addLabel(326.6, 67.42275193988803, 15.8, "B", 3.6, false, true, true, false, null);
      this.addButton(355, 69, 15.8, 10, 20, Colors.BUTTON_LIGHT);
      this.addLabel(355, 67.42275193988803, 15.8, "Master", 3.6, false, true, false, false, null);
      this.addButton(370.8, 69, 15.8, 10, 21, Colors.BUTTON_LIGHT);
      this.addLabel(370.8, 67.42275193988803, 15.8, "Storage", 3.6, false, true, false, false, null);
      this.addButton(386.6, 69, 15.8, 10, 24, Colors.BUTTON_LIGHT);
      this.addLabel(386.6, 63.82275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
      this.addLabel(386.6, 67.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addLabel(355, 87.5, 35, "System", 3.6, true, false, false, false, null);
    }
    this.addRectangle(295, 89, 58.5, 1.2, this.accentColor);
    this.addRectangle(355, 89, 58.5, 1.2, this.accentColor);
    this.addRectangle(415, 89, 63.2, 1.2, this.accentColor);
    this.addLabel(295, 87.5, 35, "Performance", 3.6, true, false, false, false, null);
    this.addLabel(415, 87.5, 35, "Programming", 3.6, true, false, false, false, null);
    // Ending group 'Buttons'
    // Starting group 'NarrowWheelArea' at offset -95.0,127.2
    this.addRectangle(-95, 127.2, 86, 122, Colors.PANEL);
    this.addPatchSelectButton(-89, 129.2, 9, 12, 1);
    this.addPatchSelectButton(-74, 129.2, 9, 12, 0);
    this.addLabel(-64.0, 137.6, 15, "Patch", 3.6, false, true, false, false, null);
    this.addLabel(-64.0, 141.2, 15, "Select", 3.6, false, true, false, false, null);
    this.addWheel(-75, 153.2, 13, 66, 0, 0.5, true);
    this.addDrawing(-58, 153.2, 4, 66,
      "0 0 4 66",
      [
        {
          tag: "path",
          "d": `M 0.25 0.25 H 3.5 L 2 30 Z M 0.25 65.75 H 3.5 L 2 36 Z`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.5`,
        },
        {
          tag: "circle",
          "cx": `2`,
          "cy": `33`,
          "r": `1`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addWheel(-42, 153.2, 13, 66, 2, 0.5, false);
    this.addDrawing(-25, 153.2, 4, 66,
      "0 0 4 66",
      [
        {
          tag: "path",
          "d": `M 0.25 0.25 H 3 L 2 65.75 Z`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.5`,
        },
      ]);
    this.addRectangle(-95, 226.2, 18.5, 1.2, this.accentColor);
    this.addRectangle(-75, 226.2, 31.5, 1.2, this.accentColor);
    this.addLabel(-75.0, 224.7, 15, "Pitch", 3.6, true, false, false, false, null);
    this.addRectangle(-42, 226.2, 33, 1.2, this.accentColor);
    this.addLabel(-42.0, 224.7, 15, "Mod", 3.6, true, false, false, false, null);
    // Ending group 'NarrowWheelArea'
    this.addKeyboard(-9.0, 117.56511627906974, 492.20000000000005, 131.63488372093025, Colors.KEYBOARD_BACKGROUND)
    this.addKey(-9, 117.57, 22.5, 138, 48, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 13 V 0 Z");
    this.addKey(5.55, 117.57, 12, 88, 49, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(14.5, 117.57, 22.5, 138, 50, false, "M 4.6 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 17.6 V 0 Z");
    this.addKey(33.65, 117.57, 12, 88, 51, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(38, 117.57, 22.5, 138, 52, false, "M 9.2 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(61.5, 117.57, 22.5, 138, 53, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 11.7 V 0 Z");
    this.addKey(74.75, 117.57, 12, 88, 54, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(85, 117.57, 22.5, 138, 55, false, "M 3.3 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 15.3 V 0 Z");
    this.addKey(101.85, 117.57, 12, 88, 56, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(108.5, 117.57, 22.5, 138, 57, false, "M 6.9 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 18.9 V 0 Z");
    this.addKey(128.95, 117.57, 12, 88, 58, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(132, 117.57, 22.5, 138, 59, false, "M 10.5 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(155.5, 117.57, 22.5, 138, 60, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 13 V 0 Z");
    this.addKey(170.05, 117.57, 12, 88, 61, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(179, 117.57, 22.5, 138, 62, false, "M 4.6 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 17.6 V 0 Z");
    this.addKey(198.15, 117.57, 12, 88, 63, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(202.5, 117.57, 22.5, 138, 64, false, "M 9.2 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(226, 117.57, 22.5, 138, 65, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 11.7 V 0 Z");
    this.addKey(239.25, 117.57, 12, 88, 66, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(249.5, 117.57, 22.5, 138, 67, false, "M 3.3 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 15.3 V 0 Z");
    this.addKey(266.35, 117.57, 12, 88, 68, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(273, 117.57, 22.5, 138, 69, false, "M 6.9 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 18.9 V 0 Z");
    this.addKey(293.45, 117.57, 12, 88, 70, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(296.5, 117.57, 22.5, 138, 71, false, "M 10.5 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(320, 117.57, 22.5, 138, 72, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 13 V 0 Z");
    this.addKey(334.55, 117.57, 12, 88, 73, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(343.5, 117.57, 22.5, 138, 74, false, "M 4.6 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 17.6 V 0 Z");
    this.addKey(362.65, 117.57, 12, 88, 75, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(367, 117.57, 22.5, 138, 76, false, "M 9.2 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(390.5, 117.57, 22.5, 138, 77, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 11.7 V 0 Z");
    this.addKey(403.75, 117.57, 12, 88, 78, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(414, 117.57, 22.5, 138, 79, false, "M 3.3 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 15.3 V 0 Z");
    this.addKey(430.85, 117.57, 12, 88, 80, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(437.5, 117.57, 22.5, 138, 81, false, "M 6.9 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 90 H 18.9 V 0 Z");
    this.addKey(457.95, 117.57, 12, 88, 82, true, "M 0 0 V 87 a 1 1 0 0 0 1 1 h 10 a 1 1 0 0 0 1 -1 V 0  Z");
    this.addKey(461, 117.57, 22.5, 138, 83, false, "M 10.5 0 V 90 H 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.addKey(484.5, 117.57, 22.5, 138, 84, false, "M 0 0 V 137 a 1 1 0 0 0 1 1 h 20.5 a 1 1 0 0 0 1 -1 V 0 Z");
    this.root.setAttribute("x", "0mm");
    this.root.setAttribute("y", "0mm");
    this.root.setAttribute("width", "578.2mm");
    this.root.setAttribute("height", "261.1412140261271mm");
    this.root.setAttribute("viewBox", "-95 -11.9412140261271 578.2 261.1412140261271");
  }
  populatePanelView(hasSeq, isSd1, isSd132) {
    if (isSd1) {
      this.accentColor = Colors.SD1;
    } else { // not isSd1
      this.accentColor = Colors.VFX;
    }
    this.addRectangle(-95, -11.941, 578.2, 107.14, Colors.PANEL);
    // Starting group 'Sliders' at offset -90,-13
    this.addSlider(-90, 2, 20, 60, 5, 0.5);
    this.addButton(-42.5, 47, 15.8, 5, 63, Colors.BUTTON_DARK);
    this.addButton(-42.5, 22, 15.8, 5, 62, Colors.BUTTON_DARK);
    this.addDrawing(-37.5, 42, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          "d": `M0 0H2L1 1Z`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addDrawing(-37.5, 17, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          "d": `M0 1H2L 1 0Z`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addSlider(-20, 2, 20, 60, 3, 0.5);
    this.addRectangle(-90, 89, 90, 1.2, this.accentColor);
    this.addLabel(-90, 87.5, 35, "Volume", 3.6, true, false, false, false, null);
    this.addLabel(-42.5, 87.5, 35, "Data Entry", 3.6, true, false, false, false, null);
    // Ending group 'Sliders'
    this.addRectangle(-1, 89, 27, 1.2, this.accentColor);
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

    this.addButton(85, 52.5, 15.8, 5, 50, Colors.BUTTON_SCREEN);
    this.addButton(151, 52.5, 15.8, 5, 44, Colors.BUTTON_SCREEN);
    this.addButton(217, 52.5, 15.8, 5, 45, Colors.BUTTON_SCREEN);
    this.addButton(85, 0, 15.8, 5, 58, Colors.BUTTON_SCREEN);
    this.addButton(151, 0, 15.8, 5, 42, Colors.BUTTON_SCREEN);
    this.addButton(218, 0, 15.8, 5, 43, Colors.BUTTON_SCREEN);
    this.addButton(25, 69, 15.8, 10, 52, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 15));
    if (isSd1) {
      this.addLabel(25, 87.5, 15.8, "BankSet", 3.6, true, false, true, false, null);
    } else { // not isSd1
      this.addLabel(25, 87.5, 15.8, "Cart", 3.6, true, false, true, false, null);
    }
    this.addButton(40.8, 69, 15.8, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 13));
    this.addLabel(40.8, 87.5, 15.8, "Sounds", 3.6, true, false, true, false, null);
    this.addButton(56.6, 69, 15.8, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 7));
    this.addLabel(56.6, 87.5, 15.8, "Presets", 3.6, true, false, true, false, null);
    if (hasSeq) {
      this.addButton(72.4, 69, 15.8, 10, 51, Colors.BUTTON_LIGHT);
      this.addLabel(72.4, 87.5, 15.8, "Seq", 3.6, true, false, true, false, null);
    } else { // not hasSeq
    }
    this.addButton(112, 69, 15.8, 10, 55, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 14));
    this.addButton(127.8, 69, 15.8, 10, 56, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 6));
    this.addButton(143.6, 69, 15.8, 10, 57, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 4));
    this.addButton(159.4, 69, 15.8, 10, 46, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 12));
    this.addButton(175.2, 69, 15.8, 10, 47, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 3));
    this.addButton(191, 69, 15.8, 10, 48, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 11));
    this.addButton(206.8, 69, 15.8, 10, 49, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 2));
    this.addButton(222.6, 69, 15.8, 10, 35, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 10));
    this.addButton(238.4, 69, 15.8, 10, 34, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 1));
    this.addButton(254.2, 69, 15.8, 10, 25, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 9));
    this.addLabel(112.0, 87.5, 15.8, "0", 3.6, true, false, true, false, null);
    this.addLabel(127.8, 87.5, 15.8, "1", 3.6, true, false, true, false, null);
    this.addLabel(143.6, 87.5, 15.8, "2", 3.6, true, false, true, false, null);
    this.addLabel(159.4, 87.5, 15.8, "3", 3.6, true, false, true, false, null);
    this.addLabel(175.2, 87.5, 15.8, "4", 3.6, true, false, true, false, null);
    this.addLabel(191.0, 87.5, 15.8, "5", 3.6, true, false, true, false, null);
    this.addLabel(206.8, 87.5, 15.8, "6", 3.6, true, false, true, false, null);
    this.addLabel(222.6, 87.5, 15.8, "7", 3.6, true, false, true, false, null);
    this.addLabel(238.4, 87.5, 15.8, "8", 3.6, true, false, true, false, null);
    this.addLabel(254.2, 87.5, 15.8, "9", 3.6, true, false, true, false, null);
    this.addRectangle(25, 89, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    this.addRectangle(269, 89, 24.5, 1.2, this.accentColor);
    // Starting group 'Buttons' at offset 295,-13
    this.addButton(295, 69, 15.8, 10, 29, Colors.BUTTON_MEDIUM);
    this.addLabel(295, 63.82275193988802, 15.8, "Replace", 3.6, false, true, false, false, null);
    this.addLabel(295, 67.42275193988802, 15.8, "Program", 3.6, false, true, false, false, null);
    this.addButton(415, 69, 15.8, 10, 5, Colors.BUTTON_MEDIUM);
    this.addLabel(415, 63.82275193988802, 15.8, "Select", 3.6, false, true, false, false, null);
    this.addLabel(415, 67.42275193988802, 15.8, "Voice", 3.6, false, true, false, false, null);
    this.addButton(430.8, 69, 15.8, 10, 9, Colors.BUTTON_MEDIUM);
    this.addLabel(430.8, 67.42275193988803, 15.8, "Copy", 3.6, false, true, false, false, null);
    this.addButton(446.6, 69, 15.8, 10, 3, Colors.BUTTON_MEDIUM);
    this.addLabel(446.6, 67.42275193988803, 15.8, "Write", 3.6, false, true, false, false, null);
    this.addButton(462.4, 69, 15.8, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 5));
    this.addLabel(462.4, 67.42275193988803, 15.8, "Compare", 3.6, false, true, false, false, null);
    this.addButton(295, 49, 15.8, 5, 26, Colors.BUTTON_DARK);
    this.addLabel(295, 43.82275193988802, 15.8, "Patch", 3.6, false, true, false, false, null);
    this.addLabel(295, 47.42275193988802, 15.8, "Select", 3.6, false, true, false, false, null);
    this.addDrawing(305.39, 42.3, 3.3728, 5.1228,
      "0 0 3.372798843337143 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 2.247798843337143 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 2.035242281667121 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(310.8, 49, 15.8, 5, 27, Colors.BUTTON_DARK);
    this.addLabel(310.8, 47.42275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
    this.addDrawing(312.46, 42.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(326.6, 49, 15.8, 5, 28, Colors.BUTTON_DARK);
    this.addLabel(326.6, 47.42275193988802, 15.8, "Effects", 3.6, false, true, false, false, null);
    this.addDrawing(331.92, 42.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(295, 29, 15.8, 5, 39, Colors.BUTTON_DARK);
    this.addLabel(295, 23.822751939888022, 15.8, "Key", 3.6, false, true, false, false, null);
    this.addLabel(295, 27.422751939888023, 15.8, "Zone", 3.6, false, true, false, false, null);
    this.addButton(310.8, 29, 15.8, 5, 40, Colors.BUTTON_DARK);
    this.addLabel(310.8, 23.822751939888022, 15.8, "Trans-", 3.6, false, true, false, false, null);
    this.addLabel(310.8, 27.422751939888023, 15.8, "pose", 3.6, false, true, false, false, null);
    this.addButton(326.6, 29, 15.8, 5, 41, Colors.BUTTON_DARK);
    this.addLabel(326.6, 27.422751939888023, 15.8, "Release", 3.6, false, true, false, false, null);
    this.addButton(295, 9, 15.8, 5, 36, Colors.BUTTON_DARK);
    this.addLabel(295, 7.422751939888027, 15.8, "Volume", 3.6, false, true, false, false, null);
    this.addButton(310.8, 9, 15.8, 5, 37, Colors.BUTTON_DARK);
    this.addLabel(310.8, 7.422751939888027, 15.8, "Pan", 3.6, false, true, false, false, null);
    this.addButton(326.6, 9, 15.8, 5, 38, Colors.BUTTON_DARK);
    this.addLabel(326.6, 7.422751939888027, 15.8, "Timbre", 3.6, false, true, false, false, null);
    this.addButton(415, 49, 15.8, 5, 4, Colors.BUTTON_DARK);
    this.addLabel(415, 47.42275193988802, 15.8, "Wave", 3.6, false, true, false, false, null);
    this.addButton(430.8, 49, 15.8, 5, 6, Colors.BUTTON_DARK);
    this.addLabel(430.8, 43.82275193988802, 15.8, "Mod", 3.6, false, true, false, false, null);
    this.addLabel(430.8, 47.42275193988802, 15.8, "Mixer", 3.6, false, true, false, false, null);
    this.addButton(446.6, 49, 15.8, 5, 2, Colors.BUTTON_DARK);
    this.addLabel(446.6, 43.82275193988802, 15.8, "Program", 3.6, false, true, false, false, null);
    this.addLabel(446.6, 47.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
    this.addButton(462.4, 49, 15.8, 5, 7, Colors.BUTTON_DARK);
    this.addLabel(462.4, 47.42275193988802, 15.8, "Effects", 3.6, false, true, false, false, null);
    this.addDrawing(467.72, 42.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(415, 29, 15.8, 5, 11, Colors.BUTTON_DARK);
    this.addLabel(415, 27.422751939888023, 15.8, "Pitch", 3.6, false, true, false, false, null);
    this.addButton(430.8, 29, 15.8, 5, 13, Colors.BUTTON_DARK);
    this.addLabel(430.8, 23.822751939888022, 15.8, "Pitch", 3.6, false, true, false, false, null);
    this.addLabel(430.8, 27.422751939888023, 15.8, "Mod", 3.6, false, true, false, false, null);
    this.addButton(446.6, 29, 15.8, 5, 15, Colors.BUTTON_DARK);
    this.addLabel(446.6, 27.422751939888023, 15.8, "Filters", 3.6, false, true, false, false, null);
    this.addDrawing(450.63, 22.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(462.4, 29, 15.8, 5, 17, Colors.BUTTON_DARK);
    this.addLabel(462.4, 27.422751939888023, 15.8, "Output", 3.6, false, true, false, false, null);
    this.addDrawing(467.51, 22.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(415, 9, 15.8, 5, 10, Colors.BUTTON_DARK);
    this.addLabel(415, 7.422751939888027, 15.8, "LFO", 3.6, false, true, false, false, null);
    this.addDrawing(416.02, 2.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(430.8, 9, 15.8, 5, 12, Colors.BUTTON_DARK);
    this.addLabel(430.8, 7.422751939888027, 15.8, "Env1", 3.6, false, true, false, false, null);
    this.addDrawing(433.11, 2.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(446.6, 9, 15.8, 5, 14, Colors.BUTTON_DARK);
    this.addLabel(446.6, 7.422751939888027, 15.8, "Env2", 3.6, false, true, false, false, null);
    this.addDrawing(448.91, 2.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(462.4, 9, 15.8, 5, 16, Colors.BUTTON_DARK);
    this.addLabel(462.4, 7.422751939888027, 15.8, "Env3", 3.6, false, true, false, false, null);
    this.addDrawing(464.71, 2.3, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    if (hasSeq) {
      this.addLabel(310.8, 63.599999999999994, 31.6, "Tracks", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(310.8, 62.472, 10.419, 0.25, Colors.WHITE);
      this.addRectangle(331.98, 62.472, 10.419, 0.25, Colors.WHITE);
      this.addButton(310.8, 69, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addLabel(310.8, 67.42275193988803, 15.8, "1-6", 3.6, false, true, true, false, null);
      this.addButton(326.6, 69, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addLabel(326.6, 67.42275193988803, 15.8, "7-12", 3.6, false, true, true, false, null);
      this.addButton(355, 69, 15.8, 10, 19, Colors.BUTTON_MEDIUM);
      this.addLabel(355.0, 67.42275193988803, 15.8, "Rec", 3.6, false, true, false, false, null);
      this.addButton(370.8, 69, 15.8, 10, 22, Colors.BUTTON_MEDIUM);
      this.addLabel(370.8, 63.82275193988802, 15.8, "Stop", 3.6, false, true, false, false, null);
      this.addLabel(370.8, 67.42275193988802, 15.8, "/Cont", 3.6, false, true, false, false, null);
      this.addButton(386.6, 69, 15.8, 10, 23, Colors.BUTTON_MEDIUM);
      this.addLabel(386.6, 67.42275193988803, 15.8, "Play", 3.6, false, true, false, false, null);
      this.addButton(355, 49, 15.8, 5, 32, Colors.BUTTON_DARK);
      this.addLabel(355.0, 47.42275193988802, 15.8, "Click", 3.6, false, true, false, false, null);
      this.addButton(370.8, 49, 15.8, 5, 18, Colors.BUTTON_DARK);
      this.addLabel(370.8, 43.82275193988802, 15.8, "Seq", 3.6, false, true, false, false, null);
      this.addLabel(370.8, 47.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addDrawing(378.18, 42.3, 8.1026, 5.1228,
        "0 0 8.102550341225367 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 6.977550341225367 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 6.764993779555345 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(386.6, 49, 15.8, 5, 33, Colors.BUTTON_DARK);
      this.addLabel(386.6, 47.42275193988802, 15.8, "Locate", 3.6, false, true, false, false, null);
      this.addDrawing(391.71, 42.3, 9.5128, 5.1228,
        "0 0 9.512844025539286 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(355, 29, 15.8, 5, 60, Colors.BUTTON_DARK);
      this.addLabel(355.0, 27.422751939888023, 15.8, "Song", 3.6, false, true, false, false, null);
      this.addButton(370.8, 29, 15.8, 5, 59, Colors.BUTTON_DARK);
      this.addLabel(370.8, 27.422751939888023, 15.8, "Seq", 3.6, false, true, false, false, null);
      this.addButton(386.6, 29, 15.8, 5, 61, Colors.BUTTON_DARK);
      this.addLabel(386.6, 27.422751939888023, 15.8, "Track", 3.6, false, true, false, false, null);
      this.addButton(355, 9, 15.8, 5, 20, Colors.BUTTON_LIGHT);
      this.addLabel(355.0, 7.422751939888027, 15.8, "Master", 3.6, false, true, false, false, null);
      this.addDrawing(360.31, 2.3, 9.5128, 5.1228,
        "0 0 9.512844025539286 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(370.8, 9, 15.8, 5, 21, Colors.BUTTON_LIGHT);
      this.addLabel(370.8, 7.422751939888027, 15.8, "Storage", 3.6, false, true, false, false, null);
      this.addButton(386.69, 9, 15.8, 5, 24, Colors.BUTTON_LIGHT);
      this.addLabel(386.69, 3.8227519398880254, 15.8, "MIDI", 3.6, false, true, false, false, null);
      this.addLabel(386.69, 7.422751939888027, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addDrawing(395.35, 2.3, 6.8239, 5.1228,
        "0 0 6.823933309499605 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 5.698933309499605 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 5.486376747829583 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addLabel(355.0, 23.6, 47.400000000000006, "Edit", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(355, 22.472, 20.087, 0.25, Colors.WHITE);
      this.addRectangle(382.31, 22.472, 20.087, 0.25, Colors.WHITE);
      this.addLabel(355, -3.318462086239073, 35, "System", 3.6, true, false, false, false, null);
      this.addRectangle(355, -2, 58.5, 0.5, this.accentColor);
      this.addLabel(355, 87.5, 35, "Sequencer", 3.6, true, false, false, false, null);
    } else { // not hasSeq
      this.addLabel(310.8, 63.599999999999994, 31.6, "Multi", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(310.8, 62.472, 11.576, 0.25, Colors.WHITE);
      this.addRectangle(330.82, 62.472, 11.576, 0.25, Colors.WHITE);
      this.addButton(310.8, 69, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addLabel(310.8, 67.42275193988803, 15.8, "A", 3.6, false, true, true, false, null);
      this.addButton(326.6, 69, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addLabel(326.6, 67.42275193988803, 15.8, "B", 3.6, false, true, true, false, null);
      this.addButton(355, 69, 15.8, 10, 20, Colors.BUTTON_LIGHT);
      this.addLabel(355, 67.42275193988803, 15.8, "Master", 3.6, false, true, false, false, null);
      this.addButton(370.8, 69, 15.8, 10, 21, Colors.BUTTON_LIGHT);
      this.addLabel(370.8, 67.42275193988803, 15.8, "Storage", 3.6, false, true, false, false, null);
      this.addButton(386.6, 69, 15.8, 10, 24, Colors.BUTTON_LIGHT);
      this.addLabel(386.6, 63.82275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
      this.addLabel(386.6, 67.42275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addLabel(355, 87.5, 35, "System", 3.6, true, false, false, false, null);
    }
    this.addRectangle(295, 89, 58.5, 1.2, this.accentColor);
    this.addRectangle(355, 89, 58.5, 1.2, this.accentColor);
    this.addRectangle(415, 89, 63.2, 1.2, this.accentColor);
    this.addLabel(295, 87.5, 35, "Performance", 3.6, true, false, false, false, null);
    this.addLabel(415, 87.5, 35, "Programming", 3.6, true, false, false, false, null);
    // Ending group 'Buttons'
    this.root.setAttribute("x", "0mm");
    this.root.setAttribute("y", "0mm");
    this.root.setAttribute("width", "578.2mm");
    this.root.setAttribute("height", "107.1412140261271mm");
    this.root.setAttribute("viewBox", "-95 -11.9412140261271 578.2 107.1412140261271");
  }
  populateTabletView(hasSeq, isSd1, isSd132) {
    if (isSd1) {
      this.accentColor = Colors.SD1;
    } else { // not isSd1
      this.accentColor = Colors.VFX;
    }
    this.addRectangle(-5, -10, 285, 205.4, Colors.PANEL);
    // Starting group 'CompactVolumeSlider' at offset 0,-13
    this.addSlider(0, 2, 20, 60, 5, 0.5);
    this.addRectangle(0, 89, 30, 1.2, this.accentColor);
    this.addLabel(0, 87.5, 35, "Volume", 3.6, true, false, false, false, null);
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

    this.addButton(90, 52.5, 15.8, 5, 50, Colors.BUTTON_SCREEN);
    this.addButton(156, 52.5, 15.8, 5, 44, Colors.BUTTON_SCREEN);
    this.addButton(222, 52.5, 15.8, 5, 45, Colors.BUTTON_SCREEN);
    this.addButton(90, 0, 15.8, 5, 58, Colors.BUTTON_SCREEN);
    this.addButton(156, 0, 15.8, 5, 42, Colors.BUTTON_SCREEN);
    this.addButton(223, 0, 15.8, 5, 43, Colors.BUTTON_SCREEN);
    this.addButton(30, 69, 15.8, 10, 52, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 15));
    if (isSd1) {
      this.addLabel(30, 87.5, 15.8, "BankSet", 3.6, true, false, true, false, null);
    } else { // not isSd1
      this.addLabel(30, 87.5, 15.8, "Cart", 3.6, true, false, true, false, null);
    }
    this.addButton(45.8, 69, 15.8, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 13));
    this.addLabel(45.8, 87.5, 15.8, "Sounds", 3.6, true, false, true, false, null);
    this.addButton(61.6, 69, 15.8, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 7));
    this.addLabel(61.6, 87.5, 15.8, "Presets", 3.6, true, false, true, false, null);
    if (hasSeq) {
      this.addButton(77.4, 69, 15.8, 10, 51, Colors.BUTTON_LIGHT);
      this.addLabel(77.4, 87.5, 15.8, "Seq", 3.6, true, false, true, false, null);
    } else { // not hasSeq
    }
    this.addButton(117, 69, 15.8, 10, 55, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 14));
    this.addButton(132.8, 69, 15.8, 10, 56, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 6));
    this.addButton(148.6, 69, 15.8, 10, 57, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 4));
    this.addButton(164.4, 69, 15.8, 10, 46, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 12));
    this.addButton(180.2, 69, 15.8, 10, 47, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 3));
    this.addButton(196, 69, 15.8, 10, 48, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 11));
    this.addButton(211.8, 69, 15.8, 10, 49, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 2));
    this.addButton(227.6, 69, 15.8, 10, 35, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 10));
    this.addButton(243.4, 69, 15.8, 10, 34, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 1));
    this.addButton(259.2, 69, 15.8, 10, 25, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 9));
    this.addLabel(117.0, 87.5, 15.8, "0", 3.6, true, false, true, false, null);
    this.addLabel(132.8, 87.5, 15.8, "1", 3.6, true, false, true, false, null);
    this.addLabel(148.6, 87.5, 15.8, "2", 3.6, true, false, true, false, null);
    this.addLabel(164.4, 87.5, 15.8, "3", 3.6, true, false, true, false, null);
    this.addLabel(180.2, 87.5, 15.8, "4", 3.6, true, false, true, false, null);
    this.addLabel(196.0, 87.5, 15.8, "5", 3.6, true, false, true, false, null);
    this.addLabel(211.8, 87.5, 15.8, "6", 3.6, true, false, true, false, null);
    this.addLabel(227.6, 87.5, 15.8, "7", 3.6, true, false, true, false, null);
    this.addLabel(243.4, 87.5, 15.8, "8", 3.6, true, false, true, false, null);
    this.addLabel(259.2, 87.5, 15.8, "9", 3.6, true, false, true, false, null);
    this.addRectangle(30, 89, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    // Starting group 'Buttons' at offset 91.79999999999998,87.2
    this.addButton(91.8, 169.2, 15.8, 10, 29, Colors.BUTTON_MEDIUM);
    this.addLabel(91.79999999999998, 164.02275193988802, 15.8, "Replace", 3.6, false, true, false, false, null);
    this.addLabel(91.79999999999998, 167.62275193988802, 15.8, "Program", 3.6, false, true, false, false, null);
    this.addButton(211.8, 169.2, 15.8, 10, 5, Colors.BUTTON_MEDIUM);
    this.addLabel(211.79999999999998, 164.02275193988802, 15.8, "Select", 3.6, false, true, false, false, null);
    this.addLabel(211.79999999999998, 167.62275193988802, 15.8, "Voice", 3.6, false, true, false, false, null);
    this.addButton(227.6, 169.2, 15.8, 10, 9, Colors.BUTTON_MEDIUM);
    this.addLabel(227.6, 167.62275193988802, 15.8, "Copy", 3.6, false, true, false, false, null);
    this.addButton(243.4, 169.2, 15.8, 10, 3, Colors.BUTTON_MEDIUM);
    this.addLabel(243.39999999999998, 167.62275193988802, 15.8, "Write", 3.6, false, true, false, false, null);
    this.addButton(259.2, 169.2, 15.8, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 5));
    this.addLabel(259.2, 167.62275193988802, 15.8, "Compare", 3.6, false, true, false, false, null);
    this.addButton(91.8, 149.2, 15.8, 5, 26, Colors.BUTTON_DARK);
    this.addLabel(91.79999999999998, 144.02275193988802, 15.8, "Patch", 3.6, false, true, false, false, null);
    this.addLabel(91.79999999999998, 147.62275193988802, 15.8, "Select", 3.6, false, true, false, false, null);
    this.addDrawing(102.19, 142.5, 3.3728, 5.1228,
      "0 0 3.372798843337143 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 2.247798843337143 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 2.035242281667121 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(107.6, 149.2, 15.8, 5, 27, Colors.BUTTON_DARK);
    this.addLabel(107.59999999999998, 147.62275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
    this.addDrawing(109.26, 142.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(123.4, 149.2, 15.8, 5, 28, Colors.BUTTON_DARK);
    this.addLabel(123.39999999999998, 147.62275193988802, 15.8, "Effects", 3.6, false, true, false, false, null);
    this.addDrawing(128.72, 142.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(91.8, 129.2, 15.8, 5, 39, Colors.BUTTON_DARK);
    this.addLabel(91.79999999999998, 124.02275193988802, 15.8, "Key", 3.6, false, true, false, false, null);
    this.addLabel(91.79999999999998, 127.62275193988802, 15.8, "Zone", 3.6, false, true, false, false, null);
    this.addButton(107.6, 129.2, 15.8, 5, 40, Colors.BUTTON_DARK);
    this.addLabel(107.59999999999998, 124.02275193988802, 15.8, "Trans-", 3.6, false, true, false, false, null);
    this.addLabel(107.59999999999998, 127.62275193988802, 15.8, "pose", 3.6, false, true, false, false, null);
    this.addButton(123.4, 129.2, 15.8, 5, 41, Colors.BUTTON_DARK);
    this.addLabel(123.39999999999998, 127.62275193988802, 15.8, "Release", 3.6, false, true, false, false, null);
    this.addButton(91.8, 109.2, 15.8, 5, 36, Colors.BUTTON_DARK);
    this.addLabel(91.79999999999998, 107.62275193988803, 15.8, "Volume", 3.6, false, true, false, false, null);
    this.addButton(107.6, 109.2, 15.8, 5, 37, Colors.BUTTON_DARK);
    this.addLabel(107.59999999999998, 107.62275193988803, 15.8, "Pan", 3.6, false, true, false, false, null);
    this.addButton(123.4, 109.2, 15.8, 5, 38, Colors.BUTTON_DARK);
    this.addLabel(123.39999999999998, 107.62275193988803, 15.8, "Timbre", 3.6, false, true, false, false, null);
    this.addButton(211.8, 149.2, 15.8, 5, 4, Colors.BUTTON_DARK);
    this.addLabel(211.79999999999998, 147.62275193988802, 15.8, "Wave", 3.6, false, true, false, false, null);
    this.addButton(227.6, 149.2, 15.8, 5, 6, Colors.BUTTON_DARK);
    this.addLabel(227.6, 144.02275193988802, 15.8, "Mod", 3.6, false, true, false, false, null);
    this.addLabel(227.6, 147.62275193988802, 15.8, "Mixer", 3.6, false, true, false, false, null);
    this.addButton(243.4, 149.2, 15.8, 5, 2, Colors.BUTTON_DARK);
    this.addLabel(243.39999999999998, 144.02275193988802, 15.8, "Program", 3.6, false, true, false, false, null);
    this.addLabel(243.39999999999998, 147.62275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
    this.addButton(259.2, 149.2, 15.8, 5, 7, Colors.BUTTON_DARK);
    this.addLabel(259.2, 147.62275193988802, 15.8, "Effects", 3.6, false, true, false, false, null);
    this.addDrawing(264.52, 142.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(211.8, 129.2, 15.8, 5, 11, Colors.BUTTON_DARK);
    this.addLabel(211.79999999999998, 127.62275193988802, 15.8, "Pitch", 3.6, false, true, false, false, null);
    this.addButton(227.6, 129.2, 15.8, 5, 13, Colors.BUTTON_DARK);
    this.addLabel(227.6, 124.02275193988802, 15.8, "Pitch", 3.6, false, true, false, false, null);
    this.addLabel(227.6, 127.62275193988802, 15.8, "Mod", 3.6, false, true, false, false, null);
    this.addButton(243.4, 129.2, 15.8, 5, 15, Colors.BUTTON_DARK);
    this.addLabel(243.39999999999998, 127.62275193988802, 15.8, "Filters", 3.6, false, true, false, false, null);
    this.addDrawing(247.43, 122.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(259.2, 129.2, 15.8, 5, 17, Colors.BUTTON_DARK);
    this.addLabel(259.2, 127.62275193988802, 15.8, "Output", 3.6, false, true, false, false, null);
    this.addDrawing(264.31, 122.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(211.8, 109.2, 15.8, 5, 10, Colors.BUTTON_DARK);
    this.addLabel(211.79999999999998, 107.62275193988803, 15.8, "LFO", 3.6, false, true, false, false, null);
    this.addDrawing(212.82, 102.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(227.6, 109.2, 15.8, 5, 12, Colors.BUTTON_DARK);
    this.addLabel(227.6, 107.62275193988803, 15.8, "Env1", 3.6, false, true, false, false, null);
    this.addDrawing(229.91, 102.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(243.4, 109.2, 15.8, 5, 14, Colors.BUTTON_DARK);
    this.addLabel(243.39999999999998, 107.62275193988803, 15.8, "Env2", 3.6, false, true, false, false, null);
    this.addDrawing(245.71, 102.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    this.addButton(259.2, 109.2, 15.8, 5, 16, Colors.BUTTON_DARK);
    this.addLabel(259.2, 107.62275193988803, 15.8, "Env3", 3.6, false, true, false, false, null);
    this.addDrawing(261.51, 102.5, 9.5128, 5.1228,
      "0 0 9.512844025539286 5.122751939888026",
      [
        {
          tag: "path",
          "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
          "fill": `none`,
          "stroke": `#ffffff`,
          "stroke-width": `0.25`,
        },
      ]);
    if (hasSeq) {
      this.addLabel(107.59999999999998, 163.8, 31.6, "Tracks", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(107.6, 162.67, 10.419, 0.25, Colors.WHITE);
      this.addRectangle(128.78, 162.67, 10.419, 0.25, Colors.WHITE);
      this.addButton(107.6, 169.2, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addLabel(107.59999999999998, 167.62275193988802, 15.8, "1-6", 3.6, false, true, true, false, null);
      this.addButton(123.4, 169.2, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addLabel(123.39999999999998, 167.62275193988802, 15.8, "7-12", 3.6, false, true, true, false, null);
      this.addButton(151.8, 169.2, 15.8, 10, 19, Colors.BUTTON_MEDIUM);
      this.addLabel(151.79999999999998, 167.62275193988802, 15.8, "Rec", 3.6, false, true, false, false, null);
      this.addButton(167.6, 169.2, 15.8, 10, 22, Colors.BUTTON_MEDIUM);
      this.addLabel(167.59999999999997, 164.02275193988802, 15.8, "Stop", 3.6, false, true, false, false, null);
      this.addLabel(167.59999999999997, 167.62275193988802, 15.8, "/Cont", 3.6, false, true, false, false, null);
      this.addButton(183.4, 169.2, 15.8, 10, 23, Colors.BUTTON_MEDIUM);
      this.addLabel(183.39999999999998, 167.62275193988802, 15.8, "Play", 3.6, false, true, false, false, null);
      this.addButton(151.8, 149.2, 15.8, 5, 32, Colors.BUTTON_DARK);
      this.addLabel(151.79999999999998, 147.62275193988802, 15.8, "Click", 3.6, false, true, false, false, null);
      this.addButton(167.6, 149.2, 15.8, 5, 18, Colors.BUTTON_DARK);
      this.addLabel(167.59999999999997, 144.02275193988802, 15.8, "Seq", 3.6, false, true, false, false, null);
      this.addLabel(167.59999999999997, 147.62275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addDrawing(174.98, 142.5, 8.1026, 5.1228,
        "0 0 8.102550341225367 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 6.977550341225367 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 6.764993779555345 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(183.4, 149.2, 15.8, 5, 33, Colors.BUTTON_DARK);
      this.addLabel(183.39999999999998, 147.62275193988802, 15.8, "Locate", 3.6, false, true, false, false, null);
      this.addDrawing(188.51, 142.5, 9.5128, 5.1228,
        "0 0 9.512844025539286 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(151.8, 129.2, 15.8, 5, 60, Colors.BUTTON_DARK);
      this.addLabel(151.79999999999998, 127.62275193988802, 15.8, "Song", 3.6, false, true, false, false, null);
      this.addButton(167.6, 129.2, 15.8, 5, 59, Colors.BUTTON_DARK);
      this.addLabel(167.59999999999997, 127.62275193988802, 15.8, "Seq", 3.6, false, true, false, false, null);
      this.addButton(183.4, 129.2, 15.8, 5, 61, Colors.BUTTON_DARK);
      this.addLabel(183.39999999999998, 127.62275193988802, 15.8, "Track", 3.6, false, true, false, false, null);
      this.addButton(151.8, 109.2, 15.8, 5, 20, Colors.BUTTON_LIGHT);
      this.addLabel(151.79999999999998, 107.62275193988803, 15.8, "Master", 3.6, false, true, false, false, null);
      this.addDrawing(157.11, 102.5, 9.5128, 5.1228,
        "0 0 9.512844025539286 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 8.387844025539286 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 8.175287463869264 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addButton(167.6, 109.2, 15.8, 5, 21, Colors.BUTTON_LIGHT);
      this.addLabel(167.59999999999997, 107.62275193988803, 15.8, "Storage", 3.6, false, true, false, false, null);
      this.addButton(183.49, 109.2, 15.8, 5, 24, Colors.BUTTON_LIGHT);
      this.addLabel(183.48999999999998, 104.02275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
      this.addLabel(183.48999999999998, 107.62275193988803, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addDrawing(192.15, 102.5, 6.8239, 5.1228,
        "0 0 6.823933309499605 5.122751939888026",
        [
          {
            tag: "path",
            "d": `M 1 0.125 l 5.698933309499605 0 -0.7700396961260015 3.622751939888026       M 0 1.125 l 5.486376747829583 0 -0.7700396961260015 3.622751939888026`,
            "fill": `none`,
            "stroke": `#ffffff`,
            "stroke-width": `0.25`,
          },
        ]);
      this.addLabel(151.79999999999998, 123.80000000000001, 47.400000000000006, "Edit", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(151.8, 122.67, 20.087, 0.25, Colors.WHITE);
      this.addRectangle(179.11, 122.67, 20.087, 0.25, Colors.WHITE);
      this.addLabel(151.79999999999998, 96.88153791376092, 35, "System", 3.6, true, false, false, false, null);
      this.addRectangle(151.8, 98.2, 58.5, 0.5, this.accentColor);
      this.addLabel(151.79999999999998, 187.7, 35, "Sequencer", 3.6, true, false, false, false, null);
    } else { // not hasSeq
      this.addLabel(107.59999999999998, 163.8, 31.6, "Multi", 2.5740796925566345, true, false, true, false, null);
      this.addRectangle(107.6, 162.67, 11.576, 0.25, Colors.WHITE);
      this.addRectangle(127.62, 162.67, 11.576, 0.25, Colors.WHITE);
      this.addButton(107.6, 169.2, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addLabel(107.59999999999998, 167.62275193988802, 15.8, "A", 3.6, false, true, true, false, null);
      this.addButton(123.4, 169.2, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addLabel(123.39999999999998, 167.62275193988802, 15.8, "B", 3.6, false, true, true, false, null);
      this.addButton(151.8, 169.2, 15.8, 10, 20, Colors.BUTTON_LIGHT);
      this.addLabel(151.79999999999998, 167.62275193988802, 15.8, "Master", 3.6, false, true, false, false, null);
      this.addButton(167.6, 169.2, 15.8, 10, 21, Colors.BUTTON_LIGHT);
      this.addLabel(167.59999999999997, 167.62275193988802, 15.8, "Storage", 3.6, false, true, false, false, null);
      this.addButton(183.4, 169.2, 15.8, 10, 24, Colors.BUTTON_LIGHT);
      this.addLabel(183.39999999999998, 164.02275193988802, 15.8, "MIDI", 3.6, false, true, false, false, null);
      this.addLabel(183.39999999999998, 167.62275193988802, 15.8, "Control", 3.6, false, true, false, false, null);
      this.addLabel(151.79999999999998, 187.7, 35, "System", 3.6, true, false, false, false, null);
    }
    this.addRectangle(91.8, 189.2, 58.5, 1.2, this.accentColor);
    this.addRectangle(151.8, 189.2, 58.5, 1.2, this.accentColor);
    this.addRectangle(211.8, 189.2, 63.2, 1.2, this.accentColor);
    this.addLabel(91.79999999999998, 187.7, 35, "Performance", 3.6, true, false, false, false, null);
    this.addLabel(211.79999999999998, 187.7, 35, "Programming", 3.6, true, false, false, false, null);
    // Ending group 'Buttons'
    // Starting group 'PatchSelects' at offset 0.0,87.2
    this.addPatchSelectButton(0, 142.2, 9, 12, 1);
    this.addPatchSelectButton(15, 142.2, 9, 12, 0);
    this.addRectangle(0, 189.2, 40, 1.2, this.accentColor);
    this.addLabel(0.0, 187.7, 35, "Patch Select", 3.6, true, false, false, false, null);
    // Ending group 'PatchSelects'
    // Starting group 'CompactValueSlider' at offset 32.0,87.2
    this.addSlider(52, 102.2, 20, 60, 3, 0.5);
    this.addButton(32, 147.2, 15.8, 5, 63, Colors.BUTTON_DARK);
    this.addButton(32, 122.2, 15.8, 5, 62, Colors.BUTTON_DARK);
    this.addDrawing(37.4, 142.2, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          "d": `M0 0H2L1 1Z`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addDrawing(37.4, 117.2, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          "d": `M0 1H2L 1 0Z`,
          "fill": `#ffffff`,
          "stroke": `none`,
        },
      ]);
    this.addRectangle(32, 189.2, 59.8, 1.2, this.accentColor);
    this.addLabel(32.0, 187.7, 35, "Data Entry", 3.6, true, false, false, false, null);
    // Ending group 'CompactValueSlider'
    this.root.setAttribute("x", "0mm");
    this.root.setAttribute("y", "0mm");
    this.root.setAttribute("width", "285mm");
    this.root.setAttribute("height", "205.4mm");
    this.root.setAttribute("viewBox", "-5 -10 285 205.4");
  }
  populateView(view, hasSeq, isSd1, isSd132) {
    if (view == 0) return this.populateFullView(hasSeq, isSd1, isSd132);
    if (view == 1) return this.populateCompactView(hasSeq, isSd1, isSd132);
    if (view == 2) return this.populatePanelView(hasSeq, isSd1, isSd132);
    if (view == 3) return this.populateTabletView(hasSeq, isSd1, isSd132);
  }

}



