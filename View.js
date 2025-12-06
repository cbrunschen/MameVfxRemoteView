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
  "PLUGIN_WARNING_BACKGROUND": "#b2b2b2",
  "FLOPPY_BODY": "#024d96",
  "FLOPPY_LABEL": "#bbbbbb",
  "CARTRIDGE_BODY": "#444444",
  "CARTRIDGE_CAVITY": "#020202",
  "CARTRIDGE_LABEL": "#bbbbbb"
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


function createElement(tag, attrs = null) {
  let el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  if (attrs != null)
    for (const [a, v] of Object.entries(attrs)) {
      if ((typeof v == 'boolean') && v) {
        el.setAttribute(a, a);
      } else if (v != null) {
        el.setAttribute(a, v);
      }
    }
  return el;
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

    var templateCell = createElement("g", {
      transform: `scale(${segmentScale}, ${segmentScale})`
    });
    for (var i = 0; i < segmentPaths.length; i++) {
      templateCell.appendChild(createElement("path", {d:segmentPaths[i]}));
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

  toPath(attrs={}) {
    return createElement("rect", Object.assign({
      x: this.x,
      y: this.y,
      width: this.w,
      height: this.h,
    }, attrs));
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
    this.halo = rect.toPath({
      rx:'1.25',
      stroke: Colors.HALO,
      'stroke-width': "5",
      fill: 'none'
    });
    hideElement(this.halo);

    rect = rect.offset(-rect.x, -rect.y)
    this.outline = rect.toPath({fill:Colors.BUTTON_LIGHT, stroke:'none'});
    console.log(`PatchSelect outline:`);
    console.log(this.outline);

    this.group = createElement("g", {transform:translation});
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
    this.halo = rect.toPath({
      rx:1.25,
      stroke: Colors.HALO,
      'stroke-width': 5,
      fill: 'none'
    });
    hideElement(this.halo);

    rect = rect.offset(-rect.x, -rect.y)
    this.outline = rect.toPath({
      rx:'1.25',
      fill:color,
      stroke:'none',
    });

    this.group = createElement("g", {transform:translation});
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

class Media {
  constructor(x, y, w, h, number, present, absent=null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.number = number;
    this.present = present;
    this.absent = absent;
    this.setState(false);
  }

  setState(state) {
    this.state = state;
    if (state) {
      if (this.absent) hideElement(this.absent);
      showElement(this.present);
    } else {
      hideElement(this.present);
      if (this.absent) showElement(this.absent);
    }
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
    var translation = "translate(" + x + "," + y + ")";
    this.element = createElement("path", {
      transform: translation,
      class: 'key',
      d: path,
      fill: this.color
    });

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
    this.group = createElement("g", {transform:translation, class:'slider'});

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

    this.root = createElement("svg", {
      preserveAspectRatio: "xMidYMid meet",
      width: "800",
      height: "600",
      overflow: "scroll"
    });

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
    var labelText = createElement("text", {
      'font-size': `${fontSize * factor}`,
      'font-family': 'Panel',
      'font-weight': bold ? 'bold' : null,
      'font-style': italic ? 'italic' : null
    });
    return labelText;
  }

  fontSizeFactor(bold = false, italic = false) {
    let canvas = document.getElementById("measure");

    let scale = (1 << 10);
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
    let rectangle = createElement("rect", {
      x: x,
      y: y,
      width: w,
      height: h,
      fill: color
    });
    this.decorationsContainer.appendChild(rectangle);
    return rectangle;
  }

  addEllipse(x, y, w, h, color) {
    let ellipse = createElement("ellipse", {
      cx: x + w/2,
      cy: y + h/2,
      rx: w/2,
      ry: h/2,
      fill: color
    });
    this.decorationsContainer.appendChild(ellipse);
    return ellipse;
  }

  addKeyboard(x, y, w, h, color) {
    let rectangle = createElement("rect", {
      x: x,
      y: y,
      width: w,
      height: h,
      rx: 2,
      fill: color
    });
    this.decorationsContainer.appendChild(rectangle);
    return rectangle;
  }

  addKey(x, y, w, h, keyNumber, black, path) {
    let key = new Key(x, y, keyNumber, black, path)
    this.mainContainer.appendChild(key.element);
    return key;
  }

  defPath(id, sx, sy, d, fill=null, stroke=null, stroke_width=null) {
    const path = createElement("path", {
      id: id,
      d: d,
    });
    if (sx != 1.0 || sy != 1.0) path.setAttribute("transform", `scale(${sx} ${sy})`);
    if (fill != null) path.setAttribute("fill", fill);
    if (stroke != null) path.setAttribute("stroke", stroke);
    if (stroke_width != null) path.setAttribute("stroke-width", stroke_width);
    this.definitions.appendChild(path);
    return path;
  }

  addUse(id, x, y) {
    const use = createElement("use", {
      href: `#${id}`,
      x: x,
      y: y,
    });
    this.decorationsContainer.appendChild(use);
    return use;
  }

  svgForDrawing(x, y, w, h, viewBox, contents) {
    const svg = createElement("svg", {
      x: x,
      y: y,
      width: w,
      height: h,
      viewBox: viewBox,
      preserveAspectRatio: 'none',
    });

    for (var i = 0; i < contents.length; i++) {
      svg.appendChild(createElement(contents[i].tag, contents[i].attrs));
    }

    return svg;
  }

  addDrawing(x, y, w, h, viewBox, contents) {
    this.decorationsContainer.appendChild(this.svgForDrawing(x, y, w, h, viewBox, contents));
    return svg;
  }

  addMedia(x, y, w, h, viewBox, number, present=[], absent=null) {
    var media = new Media(
      x, y, w, h, number, 
      this.svgForDrawing(x, y, w, h, viewBox, present),
      absent == null ? null : this.svgForDrawing(x, y, w, h, viewBox, absent));
    
    this.decorationsContainer.appendChild(media.present);
    if (media.absent) {
      this.decorationsContainer.appendChild(media.absent);
    }

    let old = this.media[number];
    if (old !== undefined) {
      media.setState(old.state);
    }
    this.media[number] = media;
    return media;
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
    this.definitions = createElement("defs");
    this.root.appendChild(this.definitions);

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
    if (typeof(this.media) === 'undefined') {
      this.media = new Array();
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

    this.populateDefinitions();
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

  populateDefinitions() {
    this.defPath("L_B_volume", 0.0018858, 0.0018858, "M1352,512l-518,1409l-299,0l-521,-1409l308,0l290,905q14,44 32.5,110.5q18.5,66.5 41.5,155.5q33,-125 47.5,-181q14.5,-56 24.5,-85l289,-905l305,0zM2385,1379q0,263 -146,412.5q-146,149.5 -404,149.5q-253,0 -397,-150q-144,-150 -144,-412q0,-261 144,-410.5q144,-149.5 403,-149.5q265,0 404.5,144.5q139.5,144.5 139.5,415.5zM2091,1379q0,-193 -63,-280q-63,-87 -183,-87q-128,0 -192,91.5q-64,91.5 -64,275.5q0,181 62.5,275.5q62.5,94.5 180.5,94.5q130,0 194.5,-92.5q64.5,-92.5 64.5,-277.5zM2889,437l0,1484l-281,0l0,-1484l281,0zM3865,1706q-56,123 -142.5,179q-86.5,56 -205.5,56q-172,0 -264,-105.5q-92,-105.5 -92,-309.5l0,-687l281,0l0,607q0,142 48,213.5q48,71.5 144,71.5q102,0 164.5,-87.5q62.5,-87.5 62.5,-224.5l0,-580l281,0l0,840q0,69 2,129.5q2,60.5 6,112.5l-268,0q-6,-72 -9,-126q-3,-54 -3,-89l-5,0zM4709,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q52,-124 129.5,-180q77.5,-56 185.5,-56q124,0 199.5,59q75.5,59 101.5,177l6,0q55,-126 132,-181q77,-55 196,-55q158,0 241,107.5q83,107.5 83,308.5l0,687l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-82,0 -137,79.5q-55,79.5 -55,219.5l0,593l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-85,0 -138.5,87q-53.5,87 -53.5,225zM6481,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM6903,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0z", "white")
    this.defPath("L_B_data_entry", 0.0018858, 0.0018858, "M1393,1206q0,226 -87.5,386q-87.5,160 -242,244.5q-154.5,84.5 -356.5,84.5l-570,0l0,-1409l510,0q356,0 551,179.5q195,179.5 195,514.5zM1096,1206q0,-227 -118,-346.5q-118,-119.5 -337,-119.5l-209,0l0,953l250,0q127,0 219.5,-59.5q92.5,-59.5 143.5,-168.5q51,-109 51,-259zM1872,1941q-157,0 -245,-85.5q-88,-85.5 -88,-240.5q0,-168 109.5,-255q109.5,-87 317.5,-91l233,-4l0,-55q0,-106 -37,-157.5q-37,-51.5 -121,-51.5q-78,0 -114.5,35.5q-36.5,35.5 -45.5,117.5l-293,-14q55,-321 465,-321q205,0 316,101q111,101 111,287l0,394q0,91 20.5,125.5q20.5,34.5 68.5,34.5q32,0 62,-6l0,152q-52,13 -89,19.5q-37,6.5 -91,6.5q-106,0 -156.5,-52q-50.5,-52 -60.5,-153l-6,0q-59,106 -148,159.5q-89,53.5 -208,53.5zM2199,1420l-144,2q-99,5 -139,21q-41,18 -62.5,54q-21.5,36 -21.5,96q0,77 35.5,114.5q35.5,37.5 94.5,37.5q66,0 121,-36q54,-36 85,-99.5q31,-63.5 31,-134.5l0,-55zM3275,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174zM3693,1941q-157,0 -245,-85.5q-88,-85.5 -88,-240.5q0,-168 109.5,-255q109.5,-87 317.5,-91l233,-4l0,-55q0,-106 -37,-157.5q-37,-51.5 -121,-51.5q-78,0 -114.5,35.5q-36.5,35.5 -45.5,117.5l-293,-14q55,-321 465,-321q205,0 316,101q111,101 111,287l0,394q0,91 20.5,125.5q20.5,34.5 68.5,34.5q32,0 62,-6l0,152q-52,13 -89,19.5q-37,6.5 -91,6.5q-106,0 -156.5,-52q-50.5,-52 -60.5,-153l-6,0q-59,106 -148,159.5q-89,53.5 -208,53.5zM4020,1420l-144,2q-99,5 -139,21q-41,18 -62.5,54q-21.5,36 -21.5,96q0,77 35.5,114.5q35.5,37.5 94.5,37.5q66,0 121,-36q54,-36 85,-99.5q31,-63.5 31,-134.5l0,-55zM6294,1693l0,228l-1149,0l0,-1409l1108,0l0,228l-813,0l0,354l752,0l0,228l-752,0l0,371l854,0zM6798,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q57,-124 143,-180q86,-56 205,-56q172,0 264,106q92,106 92,310l0,687l-280,0l0,-607q0,-143 -48,-214q-48,-71 -145,-71q-102,0 -164.5,87.5q-62.5,87.5 -62.5,224.5zM8282,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174zM8731,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252zM9387,2346q-103,0 -177,-13l0,-200q56,8 97,8q98,0 146.5,-53q48.5,-53 94.5,-178l-428,-1071l297,0l170,507q20,55 45,138q25,83 56,196q23,-92 44,-170q21,-78 46,-160l160,-511l294,0l-428,1139q-26,69 -55,122q-29,53 -59,94q-61,83 -133,117.5q-72,34.5 -170,34.5z", "white")
    this.defPath("B_bankset", 0.0018858, 0.0018858, "M1477.6944444444443,1519q0,192 -144,297q-144,105 -400,105l-705,0l0,-1409l645,0q258,0 390.5,89.5q132.5,89.5 132.5,264.5q0,120 -66.5,202.5q-66.5,82.5 -202.5,111.5q171,20 260.5,107.5q89.5,87.5 89.5,231.5zM1099.6944444444443,906q0,-95 -60.5,-135q-60.5,-40 -179.5,-40l-336,0l0,349l338,0q125,0 181.5,-43.5q56.5,-43.5 56.5,-130.5zM1181.6944444444443,1496q0,-198 -284,-198l-374,0l0,404l385,0q142,0 207.5,-51.5q65.5,-51.5 65.5,-154.5zM1963.6944444444443,1941q-157,0 -245,-85.5q-88,-85.5 -88,-240.5q0,-168 109.5,-255q109.5,-87 317.5,-91l233,-4l0,-55q0,-106 -37,-157.5q-37,-51.5 -121,-51.5q-78,0 -114.5,35.5q-36.5,35.5 -45.5,117.5l-293,-14q55,-321 465,-321q205,0 316,101q111,101 111,287l0,394q0,91 20.5,125.5q20.5,34.5 68.5,34.5q32,0 62,-6l0,152q-52,13 -89,19.5q-37,6.5 -91,6.5q-106,0 -156.5,-52q-50.5,-52 -60.5,-153l-6,0q-59,106 -148,159.5q-89,53.5 -208,53.5zM2290.6944444444443,1420l-144,2q-99,5 -139,21q-41,18 -62.5,54q-21.5,36 -21.5,96q0,77 35.5,114.5q35.5,37.5 94.5,37.5q66,0 121,-36q54,-36 85,-99.5q31,-63.5 31,-134.5l0,-55zM3133.6944444444443,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q57,-124 143,-180q86,-56 205,-56q172,0 264,106q92,106 92,310l0,687l-280,0l0,-607q0,-143 -48,-214q-48,-71 -145,-71q-102,0 -164.5,87.5q-62.5,87.5 -62.5,224.5zM4384.694444444444,1515l0,406l-281,0l0,-1484l281,0l0,850l386,-448l302,0l-380,422l409,660l-307,0l-289,-490l-121,84zM6385.694444444444,1515q0,207 -153.5,316.5q-153.5,109.5 -450.5,109.5q-535,0 -623,-387l285,-47q29,112 113,162.5q84,50.5 233,50.5q155,0 232,-47q77,-47 77,-141q0,-60 -35,-99q-35,-39 -100,-65q-32,-13 -94,-28.5q-62,-15.5 -154,-34.5q-106,-25 -166,-42.5q-60,-17.5 -96,-34q-36,-16.5 -70,-36.5q-75,-45 -117,-120q-42,-75 -42,-187q0,-191 143.5,-292.5q143.5,-101.5 417.5,-101.5q262,0 393.5,82q131.5,82 169.5,271l-286,39q-22,-91 -89.5,-137q-67.5,-46 -193.5,-46q-134,0 -201,42q-67,42 -67,126q0,55 28.5,90q28.5,35 84.5,60q53,24 227,61q101,22 174,41.5q73,19.5 117,37.5q44,19 78.5,40q34.5,21 59.5,45q51,49 78,116.5q27,67.5 27,155.5zM6840.694444444444,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM7262.694444444444,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM8261.694444444445,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174z", "white")
    this.defPath("B_cart", 0.0018858, 0.0018858, "M2935.6944444444443,1709q268,0 371,-268l257,97q-83,204 -243.5,303.5q-160.5,99.5 -384.5,99.5q-226,0 -385,-86.5q-159,-86.5 -242.5,-250.5q-83.5,-164 -83.5,-394q0,-232 80,-392q80,-160 236,-243.5q156,-83.5 382,-83.5q248,0 404,99.5q156,99.5 219,292.5l-260,71q-33,-106 -129.5,-168.5q-96.5,-62.5 -227.5,-62.5q-200,0 -303.5,124q-103.5,124 -103.5,363q0,162 47.5,273q47.5,111 140,168.5q92.5,57.5 226.5,57.5zM4012.6944444444443,1941q-157,0 -245,-85.5q-88,-85.5 -88,-240.5q0,-168 109.5,-255q109.5,-87 317.5,-91l233,-4l0,-55q0,-106 -37,-157.5q-37,-51.5 -121,-51.5q-78,0 -114.5,35.5q-36.5,35.5 -45.5,117.5l-293,-14q55,-321 465,-321q205,0 316,101q111,101 111,287l0,394q0,91 20.5,125.5q20.5,34.5 68.5,34.5q32,0 62,-6l0,152q-52,13 -89,19.5q-37,6.5 -91,6.5q-106,0 -156.5,-52q-50.5,-52 -60.5,-153l-6,0q-59,106 -148,159.5q-89,53.5 -208,53.5zM4339.694444444444,1420l-144,2q-99,5 -139,21q-41,18 -62.5,54q-21.5,36 -21.5,96q0,77 35.5,114.5q35.5,37.5 94.5,37.5q66,0 121,-36q54,-36 85,-99.5q31,-63.5 31,-134.5l0,-55zM5182.694444444444,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252zM6212.694444444444,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174z", "white")
    this.defPath("B_sounds", 0.0018858, 0.0018858, "M1720.6944444444441,1515q0,207 -153.5,316.5q-153.5,109.5 -450.5,109.5q-535,0 -623,-387l285,-47q29,112 113,162.5q84,50.5 233,50.5q155,0 232,-47q77,-47 77,-141q0,-60 -35,-99q-35,-39 -100,-65q-32,-13 -94,-28.5q-62,-15.5 -154,-34.5q-106,-25 -166,-42.5q-60,-17.5 -96,-34q-36,-16.5 -70,-36.5q-75,-45 -117,-120q-42,-75 -42,-187q0,-191 143.5,-292.5q143.5,-101.5 417.5,-101.5q262,0 393.5,82q131.5,82 169.5,271l-286,39q-22,-91 -89.5,-137q-67.5,-46 -193.5,-46q-134,0 -201,42q-67,42 -67,126q0,55 28.5,90q28.5,35 84.5,60q53,24 227,61q101,22 174,41.5q73,19.5 117,37.5q44,19 78.5,40q34.5,21 59.5,45q51,49 78,116.5q27,67.5 27,155.5zM2971.6944444444443,1379q0,263 -146,412.5q-146,149.5 -404,149.5q-253,0 -397,-150q-144,-150 -144,-412q0,-261 144,-410.5q144,-149.5 403,-149.5q265,0 404.5,144.5q139.5,144.5 139.5,415.5zM2677.6944444444443,1379q0,-193 -63,-280q-63,-87 -183,-87q-128,0 -192,91.5q-64,91.5 -64,275.5q0,181 62.5,275.5q62.5,94.5 180.5,94.5q130,0 194.5,-92.5q64.5,-92.5 64.5,-277.5zM3882.6944444444443,1706q-56,123 -142.5,179q-86.5,56 -205.5,56q-172,0 -264,-105.5q-92,-105.5 -92,-309.5l0,-687l281,0l0,607q0,142 48,213.5q48,71.5 144,71.5q102,0 164.5,-87.5q62.5,-87.5 62.5,-224.5l0,-580l281,0l0,840q0,69 2,129.5q2,60.5 6,112.5l-268,0q-6,-72 -9,-126q-3,-54 -3,-89l-5,0zM4726.694444444444,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q57,-124 143,-180q86,-56 205,-56q172,0 264,106q92,106 92,310l0,687l-280,0l0,-607q0,-143 -48,-214q-48,-71 -145,-71q-102,0 -164.5,87.5q-62.5,87.5 -62.5,224.5zM6397.694444444444,1921q-2,-10 -6,-42q-4,-32 -6.5,-70q-2.5,-38 -2.5,-64l-4,0q-46,98 -132,147q-86,49 -214,49q-189,0 -292,-147.5q-103,-147.5 -103,-412.5q0,-269 108.5,-415.5q108.5,-146.5 307.5,-146.5q115,0 198.5,48q83.5,48 128.5,143l2,0l-2,-178l0,-395l281,0l0,1248q0,50 2,109q2,59 6,127l-272,0zM5930.694444444444,1381q0,184 55.5,276q55.5,92 165.5,92q111,0 172,-97.5q61,-97.5 61,-277.5q0,-175 -58.5,-269.5q-58.5,-94.5 -172.5,-94.5q-113,0 -168,91.5q-55,91.5 -55,279.5zM7859.694444444444,1605q0,157 -128.5,246.5q-128.5,89.5 -355.5,89.5q-223,0 -341.5,-70.5q-118.5,-70.5 -157.5,-219.5l247,-37q21,77 72.5,109q51.5,32 179.5,32q118,0 172,-30q54,-30 54,-94q0,-52 -43.5,-82.5q-43.5,-30.5 -147.5,-51.5q-79,-16 -141.5,-31q-62.5,-15 -107,-29.5q-44.5,-14.5 -72.5,-27.5q-83,-41 -126.5,-105q-43.5,-64 -43.5,-158q0,-155 119.5,-241.5q119.5,-86.5 338.5,-86.5q193,0 310.5,75q117.5,75 146.5,217l-249,26q-12,-66 -59,-98.5q-47,-32.5 -149,-32.5q-100,0 -150,25.5q-50,25.5 -50,85.5q0,47 38.5,74.5q38.5,27.5 129.5,45.5q127,26 225.5,53.5q98.5,27.5 158.5,65.5q59,38 94.5,97.5q35.5,59.5 35.5,152.5z", "white")
    this.defPath("B_presets", 0.0018858, 0.0018858, "M1784.6944444444443,958q0,137 -62.5,242.5q-62.5,105.5 -177.5,165q-115,59.5 -274,59.5l-350,0l0,496l-295,0l0,-1409l633,0q253,0 389.5,116.5q136.5,116.5 136.5,329.5zM1487.6944444444443,963q0,-222 -262,-222l-305,0l0,457l313,0q122,0 188,-60.5q66,-60.5 66,-174.5zM2278.6944444444443,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252zM3026.6944444444443,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM3448.6944444444443,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM4845.694444444444,1605q0,157 -128.5,246.5q-128.5,89.5 -355.5,89.5q-223,0 -341.5,-70.5q-118.5,-70.5 -157.5,-219.5l247,-37q21,77 72.5,109q51.5,32 179.5,32q118,0 172,-30q54,-30 54,-94q0,-52 -43.5,-82.5q-43.5,-30.5 -147.5,-51.5q-79,-16 -141.5,-31q-62.5,-15 -107,-29.5q-44.5,-14.5 -72.5,-27.5q-83,-41 -126.5,-105q-43.5,-64 -43.5,-158q0,-155 119.5,-241.5q119.5,-86.5 338.5,-86.5q193,0 310.5,75q117.5,75 146.5,217l-249,26q-12,-66 -59,-98.5q-47,-32.5 -149,-32.5q-100,0 -150,25.5q-50,25.5 -50,85.5q0,47 38.5,74.5q38.5,27.5 129.5,45.5q127,26 225.5,53.5q98.5,27.5 158.5,65.5q59,38 94.5,97.5q35.5,59.5 35.5,152.5zM5304.694444444444,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM5726.694444444444,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM6725.694444444444,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174zM7805.694444444444,1605q0,157 -128.5,246.5q-128.5,89.5 -355.5,89.5q-223,0 -341.5,-70.5q-118.5,-70.5 -157.5,-219.5l247,-37q21,77 72.5,109q51.5,32 179.5,32q118,0 172,-30q54,-30 54,-94q0,-52 -43.5,-82.5q-43.5,-30.5 -147.5,-51.5q-79,-16 -141.5,-31q-62.5,-15 -107,-29.5q-44.5,-14.5 -72.5,-27.5q-83,-41 -126.5,-105q-43.5,-64 -43.5,-158q0,-155 119.5,-241.5q119.5,-86.5 338.5,-86.5q193,0 310.5,75q117.5,75 146.5,217l-249,26q-12,-66 -59,-98.5q-47,-32.5 -149,-32.5q-100,0 -150,25.5q-50,25.5 -50,85.5q0,47 38.5,74.5q38.5,27.5 129.5,45.5q127,26 225.5,53.5q98.5,27.5 158.5,65.5q59,38 94.5,97.5q35.5,59.5 35.5,152.5z", "white")
    this.defPath("B_seq", 0.0018858, 0.0018858, "M3597.1944444444443,1515q0,207 -153.5,316.5q-153.5,109.5 -450.5,109.5q-535,0 -623,-387l285,-47q29,112 113,162.5q84,50.5 233,50.5q155,0 232,-47q77,-47 77,-141q0,-60 -35,-99q-35,-39 -100,-65q-32,-13 -94,-28.5q-62,-15.5 -154,-34.5q-106,-25 -166,-42.5q-60,-17.5 -96,-34q-36,-16.5 -70,-36.5q-75,-45 -117,-120q-42,-75 -42,-187q0,-191 143.5,-292.5q143.5,-101.5 417.5,-101.5q262,0 393.5,82q131.5,82 169.5,271l-286,39q-22,-91 -89.5,-137q-67.5,-46 -193.5,-46q-134,0 -201,42q-67,42 -67,126q0,55 28.5,90q28.5,35 84.5,60q53,24 227,61q101,22 174,41.5q73,19.5 117,37.5q44,19 78.5,40q34.5,21 59.5,45q51,49 78,116.5q27,67.5 27,155.5zM4052.1944444444443,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM4474.194444444444,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM4900.194444444444,1381q0,-268 109.5,-415.5q109.5,-147.5 308.5,-147.5q118,0 199.5,48.5q81.5,48.5 127.5,146.5q0,-31 2.5,-67.5q2.5,-36.5 6.5,-66.5q4,-30 6,-40l270,0q-3,54 -4.5,116q-1.5,62 -1.5,133l0,1258l-279,0l0,-450l5,-155l-2,0q-46,100 -134.5,150q-88.5,50 -218.5,50q-189,0 -292,-147.5q-103,-147.5 -103,-412.5zM5647.194444444444,1375q0,-173 -58,-268.5q-58,-95.5 -171,-95.5q-112,0 -168.5,92.5q-56.5,92.5 -56.5,277.5q0,184 55.5,276q55.5,92 167.5,92q110,0 170.5,-97.5q60.5,-97.5 60.5,-276.5z", "white")
    this.defPath("B_0", 0.0018858, 0.0018858, "M4674.694444444443,1216q0,357 -122.5,541q-122.5,184 -367.5,184q-242,0 -363,-181.5q-121,-181.5 -121,-543.5q0,-371 115.5,-548q115.5,-177 376.5,-177q250,0 366,181q116,181 116,544zM4392.694444444443,1216q0,-190 -17,-300.5q-17,-110.5 -61,-157.5q-44,-47 -124,-47q-85,0 -130.5,47.5q-45.5,47.5 -62,158q-16.5,110.5 -16.5,299.5q0,189 17.5,299.5q17.5,110.5 62,157.5q44.5,47 125.5,47q120,0 163,-116q43,-116 43,-388z", "white")
    this.defPath("B_1", 0.0018858, 0.0018858, "M4701.694444444443,1712l0,209l-953,0l0,-209l349,0l0,-961l-338,211l0,-221l353,-229l266,0l0,1200l323,0z", "white")
    this.defPath("B_2", 0.0018858, 0.0018858, "M4676.694444444443,1690l0,231l-986,0l0,-195q37,-81 94,-158.5q57,-77.5 136.5,-156q79.5,-78.5 181.5,-161.5q74,-60 126,-109.5q52,-49.5 81,-88.5q30,-39 45,-77.5q15,-38.5 15,-75.5q0,-92 -46.5,-138q-46.5,-46 -138.5,-46q-90,0 -137.5,48.5q-47.5,48.5 -61.5,145.5l-283,-16q24,-196 146.5,-299q122.5,-103 333.5,-103q228,0 350,104q122,104 122,292q0,106 -44,190q-44,84 -112,155q-56,61 -126.5,116q-70.5,55 -136.5,107q-70,56 -127.5,113q-57.5,57 -85.5,122l654,0z", "white")
    this.defPath("B_3", 0.0018858, 0.0018858, "M4684.694444444443,1530q0,198 -130,306q-130,108 -370,108q-227,0 -361,-104.5q-134,-104.5 -157,-301.5l286,-25q27,203 231,203q101,0 157,-50q56,-50 56,-153q0,-94 -68,-144q-68,-50 -202,-50l-98,0l0,-227l92,0q121,0 182,-49.5q61,-49.5 61,-141.5q0,-87 -48.5,-136.5q-48.5,-49.5 -141.5,-49.5q-87,0 -140.5,48q-53.5,48 -61.5,136l-281,-20q22,-182 151,-285q129,-103 337,-103q221,0 345.5,99.5q124.5,99.5 124.5,275.5q0,132 -77.5,217q-77.5,85 -223.5,113l0,4q162,19 249.5,106.5q87.5,87.5 87.5,223.5z", "white")
    this.defPath("B_4", 0.0018858, 0.0018858, "M4559.694444444443,1634l0,287l-268,0l0,-287l-641,0l0,-211l595,-911l314,0l0,913l188,0l0,209l-188,0zM3879.694444444444,1425l412,0l0,-461q0,-54 3.5,-117q3.5,-63 5.5,-81q-13,28 -36.5,68.5q-23.5,40.5 -57.5,93.5l-327,497z", "white")
    this.defPath("B_5", 0.0018858, 0.0018858, "M4701.694444444443,1452q0,224 -139.5,356.5q-139.5,132.5 -382.5,132.5q-212,0 -339.5,-95.5q-127.5,-95.5 -157.5,-276.5l281,-23q22,90 78,131q56,41 141,41q105,0 167.5,-67q62.5,-67 62.5,-193q0,-111 -59,-177.5q-59,-66.5 -165,-66.5q-58,0 -106,22.5q-48,22.5 -85,68.5l-274,0l49,-793l847,0l0,209l-592,0l-23,356q102,-90 255,-90q134,0 233.5,56.5q99.5,56.5 154,160.5q54.5,104 54.5,248z", "white")
    this.defPath("B_6", 0.0018858, 0.0018858, "M4684.694444444443,1460q0,225 -126,353q-126,128 -348,128q-249,0 -382.5,-174.5q-133.5,-174.5 -133.5,-517.5q0,-377 135.5,-567.5q135.5,-190.5 387.5,-190.5q179,0 282.5,79q103.5,79 146.5,245l-265,37q-37,-139 -170,-139q-113,0 -177.5,113q-64.5,113 -64.5,343q45,-75 125,-115q80,-40 181,-40q189,0 299,120q110,120 110,326zM4402.694444444443,1468q0,-120 -55.5,-183.5q-55.5,-63.5 -152.5,-63.5q-93,0 -149,59.5q-56,59.5 -56,157.5q0,82 26.5,146q26.5,64 74.5,101q48,37 111,37q95,0 148,-67.5q53,-67.5 53,-186.5z", "white")
    this.defPath("B_7", 0.0018858, 0.0018858, "M4668.694444444443,735q-95,150 -179.5,290.5q-84.5,140.5 -147.5,283.5q-63,142 -99.5,293q-36.5,151 -36.5,319l-293,0q0,-161 35,-305.5q35,-144.5 111,-304.5q50,-104 132,-238q82,-134 217,-330l-700,0l0,-231l961,0l0,223z", "white")
    this.defPath("B_8", 0.0018858, 0.0018858, "M4695.694444444443,1524q0,198 -131,307.5q-131,109.5 -374,109.5q-241,0 -373.5,-109q-132.5,-109 -132.5,-306q0,-135 78,-227.5q78,-92.5 209,-114.5l0,-4q-114,-25 -184,-113q-70,-88 -70,-203q0,-173 122.5,-273q122.5,-100 346.5,-100q229,0 351.5,97.5q122.5,97.5 122.5,277.5q0,115 -69.5,202q-69.5,87 -186.5,110l0,4q136,22 213.5,111.5q77.5,89.5 77.5,230.5zM4371.694444444443,881q0,-193 -185,-193q-182,0 -182,193q0,101 46,151.5q46,50.5 138,50.5q92,0 137.5,-47q45.5,-47 45.5,-155zM4404.694444444443,1501q0,-110 -55,-165.5q-55,-55.5 -165,-55.5q-102,0 -156.5,58q-54.5,58 -54.5,167q0,124 54,181q54,57 165,57q109,0 160.5,-57q51.5,-57 51.5,-185z", "white")
    this.defPath("B_9", 0.0018858, 0.0018858, "M4682.694444444443,1194q0,375 -137,561q-137,186 -389,186q-186,0 -291.5,-79.5q-105.5,-79.5 -149.5,-251.5l264,-37q39,147 180,147q118,0 181.5,-113q63.5,-113 65.5,-335q-38,75 -124.5,117.5q-86.5,42.5 -186.5,42.5q-124,0 -215,-57.5q-91,-57.5 -140.5,-162.5q-49.5,-105 -49.5,-249q0,-222 128.5,-347q128.5,-125 363.5,-125q253,0 376.5,175.5q123.5,175.5 123.5,527.5zM4385.694444444443,997q0,-131 -57.5,-208.5q-57.5,-77.5 -152.5,-77.5q-93,0 -146.5,67.5q-53.5,67.5 -53.5,186.5q0,117 53,187.5q53,70.5 148,70.5q60,0 107,-28q47,-28 74.5,-79q27.5,-51 27.5,-119z", "white")
    this.defPath("L_I_replace", 0.0018858, 0.0018858, "M367,1336l-113,585l-191,0l273,-1409l612,0q153,0 264,54q97,46 150.5,127.5q53.5,81.5 53.5,188.5q0,188 -108,298q-108,110 -319,139l268,602l-206,0l-243,-585l-441,0zM857,1185q181,0 273,-75.5q92,-75.5 92,-212.5q0,-112 -74.5,-172q-74.5,-60 -222.5,-60l-427,0l-101,520l460,0zM1735,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM1759,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM3172,1941q-123,0 -200.5,-52q-77.5,-52 -109.5,-146l-5,0q0,5 -2,21.5q-2,16.5 -6,43.5q-4,27 -30,161.5q-26,134.5 -73,376.5l-179,0l249,-1286q5,-24 9.5,-48q4.5,-24 8.5,-48q5,-32 9,-63q4,-31 8,-62l167,0q0,18 -3,50.5q-3,32.5 -7,63.5q-4,31 -7,47l4,0q73,-95 154,-138q81,-43 200,-43q157,0 244.5,94.5q87.5,94.5 87.5,259.5q0,204 -61,393q-61,190 -173,282.5q-112,92.5 -285,92.5zM3307,958q-99,0 -169.5,40.5q-70.5,40.5 -119.5,121.5q-32,54 -56,129q-24,75 -36.5,152.5q-12.5,77.5 -12.5,142.5q0,125 63.5,194.5q63.5,69.5 176.5,69.5q124,0 196,-76q36,-38 64.5,-101q28.5,-63 48.5,-138.5q20,-75.5 30.5,-151q10.5,-75.5 10.5,-136.5q0,-123 -47,-185q-47,-62 -149,-62zM4258,437l-289,1484l-179,0l288,-1484l180,0zM5139,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM4449,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM5820,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM6631,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM6655,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_program", 0.0018858, 0.0018858, "M852,512q231,0 366,104q135,104 135,285q0,146 -69,252q-69,106 -196.5,162.5q-127.5,56.5 -303.5,56.5l-424,0l-106,549l-191,0l273,-1409l516,0zM390,1221l387,0q191,0 286.5,-78q95.5,-78 95.5,-233q0,-119 -79,-182q-79,-63 -233,-63l-349,0l-108,556zM2084,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM3122,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2936,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3584,2346q-169,0 -267.5,-63q-98.5,-63 -125.5,-189l163,-42q34,157 234,157q142,0 220,-73.5q78,-73.5 110,-241.5q8,-44 17,-87.5q9,-43.5 17,-86.5l-2,0q-61,88 -109,128q-48,39 -107.5,60q-59.5,21 -136.5,21q-153,0 -246.5,-100.5q-93.5,-100.5 -93.5,-266.5q0,-89 17,-189q17,-100 48.5,-193q31.5,-93 74.5,-161q65,-102 158,-150.5q93,-48.5 220,-48.5q121,0 204.5,57q83.5,57 107.5,147l2,0q5,-25 15,-66.5q10,-41.5 20,-77q10,-35.5 13,-41.5l171,0l-19,82l-30,142l-161,827q-48,242 -172,349q-124,107 -342,107zM3446,1548q0,248 207,248q108,0 196,-79q88,-78 136.5,-215q48.5,-137 48.5,-285q0,-125 -64,-194.5q-64,-69.5 -176,-69.5q-90,0 -150,37q-60,37 -101,116q-27,52 -49,130.5q-22,78.5 -35,161.5q-13,83 -13,150zM5044,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM5935,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM5245,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM6807,1921l124,-634q25,-122 25,-174q0,-75 -38,-114.5q-38,-39.5 -124,-39.5q-116,0 -202.5,99q-86.5,99 -113.5,259l-118,604l-179,0l166,-851q20,-95 39,-231l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q73,-114 146.5,-159q73.5,-45 175.5,-45q248,0 277,232q83,-130 163.5,-181q80.5,-51 184.5,-51q135,0 207.5,73q72.5,73 72.5,211q0,63 -21,164l-127,653l-178,0l124,-634q25,-122 25,-174q0,-75 -38,-114.5q-38,-39.5 -124,-39.5q-116,0 -202,97.5q-86,97.5 -114,257.5l-118,607l-178,0z", "white")
    this.defPath("L_I_select", 0.0018858, 0.0018858, "M616,1941q-249,0 -386.5,-88.5q-137.5,-88.5 -171.5,-269.5l177,-37q27,129 120,187q93,58 275,58q219,0 320,-65.5q101,-65.5 101,-200.5q0,-67 -29,-107.5q-29,-40.5 -99,-73.5q-35,-16 -95,-36q-60,-20 -146,-44q-168,-46 -255,-97q-85,-50 -128.5,-119.5q-43.5,-69.5 -43.5,-167.5q0,-122 69.5,-209q69.5,-87 197.5,-133.5q128,-46.5 302,-46.5q220,0 353,76q133,76 167,222l-173,51q-33,-105 -118.5,-155q-85.5,-50 -229.5,-50q-188,0 -282,59q-94,59 -94,177q0,60 26,97.5q26,37.5 84,66.5q29,14 87,33.5q58,19.5 145,42.5q98,27 168,53q70,26 113,51q86,50 131,121.5q45,71.5 45,176.5q0,206 -155,317q-155,111 -475,111zM1622,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM1646,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM3006,437l-289,1484l-179,0l288,-1484l180,0zM3216,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3240,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM4568,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM5398,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24z", "white")
    this.defPath("L_I_voice", 0.0018858, 0.0018858, "M1525,512l-848,1409l-198,0l-302,-1409l194,0l198,992q9,62 17.5,124.5q8.5,62.5 17.5,124.5q33,-62 66.5,-124.5q33.5,-62.5 66.5,-124.5l580,-992l208,0zM2364,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2178,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM2930,437l-34,172l-180,0l34,-172l180,0zM2852,839l-211,1082l-179,0l210,-1082l180,0zM3353,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM4164,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM4188,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_copy", 0.0018858, 0.0018858, "M1215,1495l143,89q-126,188 -286,272.5q-160,84.5 -372,84.5q-181,0 -314,-73q-133,-72 -203,-206q-70,-134 -70,-310q0,-246 105,-445q105,-199 291.5,-307.5q186.5,-108.5 416.5,-108.5q217,0 366.5,90.5q149.5,90.5 197.5,254.5l-180,55q-36,-112 -139.5,-178q-103.5,-66 -254.5,-66q-185,0 -324,88q-140,88 -215,249q-75,161 -75,371q0,200 109,315.5q109,115.5 302,115.5q148,0 276,-73.5q128,-73.5 226,-217.5zM2553,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2367,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3172,1941q-123,0 -200.5,-52q-77.5,-52 -109.5,-146l-5,0q0,5 -2,21.5q-2,16.5 -6,43.5q-4,27 -30,161.5q-26,134.5 -73,376.5l-179,0l249,-1286q5,-24 9.5,-48q4.5,-24 8.5,-48q5,-32 9,-63q4,-31 8,-62l167,0q0,18 -3,50.5q-3,32.5 -7,63.5q-4,31 -7,47l4,0q73,-95 154,-138q81,-43 200,-43q157,0 244.5,94.5q87.5,94.5 87.5,259.5q0,204 -61,393q-61,190 -173,282.5q-112,92.5 -285,92.5zM3307,958q-99,0 -169.5,40.5q-70.5,40.5 -119.5,121.5q-32,54 -56,129q-24,75 -36.5,152.5q-12.5,77.5 -12.5,142.5q0,125 63.5,194.5q63.5,69.5 176.5,69.5q124,0 196,-76q36,-38 64.5,-101q28.5,-63 48.5,-138.5q20,-75.5 30.5,-151q10.5,-75.5 10.5,-136.5q0,-123 -47,-185q-47,-62 -149,-62zM3773,2346q-70,0 -132,-14l31,-134q48,8 77,8q95,0 167.5,-64q72.5,-64 142.5,-186l27,-47l-217,-1070l183,0l112,598q8,40 15,84.5q7,44.5 13,86q6,41.5 10,72.5q4,31 4,45q5,-11 11.5,-24.5q6.5,-13.5 14.5,-29.5l122,-225l331,-607l199,0l-626,1082q-112,195 -178,270q-67,78 -141,116.5q-74,38.5 -166,38.5z", "white")
    this.defPath("L_I_write", 0.0018858, 0.0018858, "M961,1026l-419,895l-223,0l-142,-1409l197,0l79,895q6,77 10,164q4,87 6,182q40,-94 72.5,-169.5q32.5,-75.5 58.5,-132.5l443,-939l183,0l75,877q7,77 11.5,168q4.5,91 5.5,196q38,-83 58.5,-134q20.5,-51 35.5,-85l481,-1022l201,0l-688,1409l-223,0l-71,-895q-7,-137 -11,-218q-4,-81 -5,-106q-38,100 -72,181q-34,81 -63,143zM2651,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM3116,437l-34,172l-180,0l34,-172l180,0zM3038,839l-211,1082l-179,0l210,-1082l180,0zM3345,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM3895,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3919,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_compare", 0.0018758, 0.0018858, "M1215,1495l143,89q-126,188 -286,272.5q-160,84.5 -372,84.5q-181,0 -314,-73q-133,-72 -203,-206q-70,-134 -70,-310q0,-246 105,-445q105,-199 291.5,-307.5q186.5,-108.5 416.5,-108.5q217,0 366.5,90.5q149.5,90.5 197.5,254.5l-180,55q-36,-112 -139.5,-178q-103.5,-66 -254.5,-66q-185,0 -324,88q-140,88 -215,249q-75,161 -75,371q0,200 109,315.5q109,115.5 302,115.5q148,0 276,-73.5q128,-73.5 226,-217.5zM2553,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2367,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3278,1921l124,-634q25,-122 25,-174q0,-75 -38,-114.5q-38,-39.5 -124,-39.5q-116,0 -202.5,99q-86.5,99 -113.5,259l-118,604l-179,0l166,-851q20,-95 39,-231l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q73,-114 146.5,-159q73.5,-45 175.5,-45q248,0 277,232q83,-130 163.5,-181q80.5,-51 184.5,-51q135,0 207.5,73q72.5,73 72.5,211q0,63 -21,164l-127,653l-178,0l124,-634q25,-122 25,-174q0,-75 -38,-114.5q-38,-39.5 -124,-39.5q-116,0 -202,97.5q-86,97.5 -114,257.5l-118,607l-178,0zM4878,1941q-123,0 -200.5,-52q-77.5,-52 -109.5,-146l-5,0q0,5 -2,21.5q-2,16.5 -6,43.5q-4,27 -30,161.5q-26,134.5 -73,376.5l-179,0l249,-1286q5,-24 9.5,-48q4.5,-24 8.5,-48q5,-32 9,-63q4,-31 8,-62l167,0q0,18 -3,50.5q-3,32.5 -7,63.5q-4,31 -7,47l4,0q73,-95 154,-138q81,-43 200,-43q157,0 244.5,94.5q87.5,94.5 87.5,259.5q0,204 -61,393q-61,190 -173,282.5q-112,92.5 -285,92.5zM5013,958q-99,0 -169.5,40.5q-70.5,40.5 -119.5,121.5q-32,54 -56,129q-24,75 -36.5,152.5q-12.5,77.5 -12.5,142.5q0,125 63.5,194.5q63.5,69.5 176.5,69.5q124,0 196,-76q36,-38 64.5,-101q28.5,-63 48.5,-138.5q20,-75.5 30.5,-151q10.5,-75.5 10.5,-136.5q0,-123 -47,-185q-47,-62 -149,-62zM6390,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM5700,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM7320,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM7540,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM7564,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_patch", 0.0018858, 0.0018858, "M852,512q231,0 366,104q135,104 135,285q0,146 -69,252q-69,106 -196.5,162.5q-127.5,56.5 -303.5,56.5l-424,0l-106,549l-191,0l273,-1409l516,0zM390,1221l387,0q191,0 286.5,-78q95.5,-78 95.5,-233q0,-119 -79,-182q-79,-63 -233,-63l-349,0l-108,556zM2293,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM1603,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM2780,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM3543,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM4481,1024q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5l-118,606l-179,0l288,-1484l180,0l-75,386q-9,50 -21,100.5q-12,50.5 -26,100.5l3,0z", "white")
    this.defPath("L_I_midi", 0.0018858, 0.0018858, "M433,880l-200,1041l-170,0l273,-1409l236,0l189,977q4,19 12,70.5q8,51.5 20,134.5q26,-53 52,-106.5q26,-53.5 52,-106.5l553,-969l256,0l-273,1409l-172,0l180,-928q18,-92 34.5,-167q16.5,-75 30.5,-133q-30,63 -56.5,115q-26.5,52 -48.5,93q-22,41 -40,72l-548,948l-124,0l-185,-948q-3,-14 -13.5,-84.5q-10.5,-70.5 -27.5,-195.5q-4,30 -11.5,76.5q-7.5,46.5 -18.5,110.5zM2252,512l-274,1409l-191,0l274,-1409l191,0zM3019,512q208,0 358,74.5q150,74.5 230.5,212.5q80.5,138 80.5,331q0,237 -103,413q-103,177 -296.5,277.5q-193.5,100.5 -438.5,100.5l-512,0l273,-1409l408,0zM2558,1768l284,0q196,0 344,-78q149,-77 228.5,-222.5q79.5,-145.5 79.5,-339.5q0,-219 -126,-341q-126,-122 -353,-122l-242,0l-215,1103zM4300,512l-274,1409l-191,0l274,-1409l191,0z", "white")
    this.defPath("L_I_effects", 0.0018858, 0.0018858, "M1183,1765l-30,156l-1090,0l273,-1409l1049,0l-30,156l-858,0l-88,452l798,0l-30,154l-798,0l-95,491l899,0zM1800,970l-185,951l-180,0l185,-951l-152,0l26,-131l152,0l23,-122q22,-110 61,-168q38,-56 99.5,-84q61.5,-28 158.5,-28q75,0 124,12l-26,137q-11,-2 -22.5,-3.5q-11.5,-1.5 -22.5,-2.5q-11,-1 -23,-1.5q-12,-0.5 -23,-0.5q-64,0 -97,32.5q-33,32.5 -53,131.5l-19,97l211,0l-26,131l-211,0zM2369,970l-185,951l-180,0l185,-951l-152,0l26,-131l152,0l23,-122q22,-110 61,-168q38,-56 99.5,-84q61.5,-28 158.5,-28q75,0 124,12l-26,137q-11,-2 -22.5,-3.5q-11.5,-1.5 -22.5,-2.5q-11,-1 -23,-1.5q-12,-0.5 -23,-0.5q-64,0 -97,32.5q-33,32.5 -53,131.5l-19,97l211,0l-26,131l-211,0zM2760,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM2784,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM4112,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM4942,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM6143,1604q0,162 -124,249.5q-124,87.5 -358,87.5q-174,0 -276.5,-58.5q-102.5,-58.5 -143.5,-184.5l147,-56q33,88 102.5,128q69.5,40 186.5,40q291,0 291,-190q0,-62 -51,-104q-52,-41 -216,-92q-129,-43 -192,-82q-64,-40 -98,-93.5q-34,-53.5 -34,-124.5q0,-145 116,-223.5q116,-78.5 327,-78.5q177,0 276.5,63.5q99.5,63.5 121.5,191.5l-163,25q-22,-79 -83,-114q-61,-35 -164,-35q-124,0 -190.5,39.5q-66.5,39.5 -66.5,111.5q0,42 21,70.5q21,28.5 61,51.5q40,23 182,68q128,40 192,81q65,41 100.5,97q35.5,56 35.5,132z", "white")
    this.defPath("L_I_key", 0.0018858, 0.0018858, "M360,1376l-106,545l-191,0l273,-1409l191,0l-136,691l140,-129l665,-562l245,0l-750,630l557,779l-226,0l-472,-674l-190,129zM1622,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM1646,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM2521,2346q-70,0 -132,-14l31,-134q48,8 77,8q95,0 167.5,-64q72.5,-64 142.5,-186l27,-47l-217,-1070l183,0l112,598q8,40 15,84.5q7,44.5 13,86q6,41.5 10,72.5q4,31 4,45q5,-11 11.5,-24.5q6.5,-13.5 14.5,-29.5l122,-225l331,-607l199,0l-626,1082q-112,195 -178,270q-67,78 -141,116.5q-74,38.5 -166,38.5z", "white")
    this.defPath("L_I_zone", 0.0018858, 0.0018858, "M1112,1765l-30,156l-1122,0l27,-143l1054,-1110l-765,0l30,-156l1002,0l-27,139l-1054,1114l885,0zM2325,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2139,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM2722,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM3785,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3809,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_trans_", 0.0018858, 0.0018858, "M858,668l-244,1253l-190,0l244,-1253l-484,0l30,-156l1158,0l-30,156l-484,0zM1817,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM2708,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM2018,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM3252,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM4966,1604q0,162 -124,249.5q-124,87.5 -358,87.5q-174,0 -276.5,-58.5q-102.5,-58.5 -143.5,-184.5l147,-56q33,88 102.5,128q69.5,40 186.5,40q291,0 291,-190q0,-62 -51,-104q-52,-41 -216,-92q-129,-43 -192,-82q-64,-40 -98,-93.5q-34,-53.5 -34,-124.5q0,-145 116,-223.5q116,-78.5 327,-78.5q177,0 276.5,63.5q99.5,63.5 121.5,191.5l-163,25q-22,-79 -83,-114q-61,-35 -164,-35q-124,0 -190.5,39.5q-66.5,39.5 -66.5,111.5q0,42 21,70.5q21,28.5 61,51.5q40,23 182,68q128,40 192,81q65,41 100.5,97q35.5,56 35.5,132zM5719,1297l-31,160l-500,0l31,-160l500,0z", "white")
    this.defPath("L_I_pose", 0.0018858, 0.0018858, "M554,1941q-123,0 -200.5,-52q-77.5,-52 -109.5,-146l-5,0q0,5 -2,21.5q-2,16.5 -6,43.5q-4,27 -30,161.5q-26,134.5 -73,376.5l-179,0l249,-1286q5,-24 9.5,-48q4.5,-24 8.5,-48q5,-32 9,-63q4,-31 8,-62l167,0q0,18 -3,50.5q-3,32.5 -7,63.5q-4,31 -7,47l4,0q73,-95 154,-138q81,-43 200,-43q157,0 244.5,94.5q87.5,94.5 87.5,259.5q0,204 -61,393q-61,190 -173,282.5q-112,92.5 -285,92.5zM689,958q-99,0 -169.5,40.5q-70.5,40.5 -119.5,121.5q-32,54 -56,129q-24,75 -36.5,152.5q-12.5,77.5 -12.5,142.5q0,125 63.5,194.5q63.5,69.5 176.5,69.5q124,0 196,-76q36,-38 64.5,-101q28.5,-63 48.5,-138.5q20,-75.5 30.5,-151q10.5,-75.5 10.5,-136.5q0,-123 -47,-185q-47,-62 -149,-62zM2213,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2027,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3185,1604q0,162 -124,249.5q-124,87.5 -358,87.5q-174,0 -276.5,-58.5q-102.5,-58.5 -143.5,-184.5l147,-56q33,88 102.5,128q69.5,40 186.5,40q291,0 291,-190q0,-62 -51,-104q-52,-41 -216,-92q-129,-43 -192,-82q-64,-40 -98,-93.5q-34,-53.5 -34,-124.5q0,-145 116,-223.5q116,-78.5 327,-78.5q177,0 276.5,63.5q99.5,63.5 121.5,191.5l-163,25q-22,-79 -83,-114q-61,-35 -164,-35q-124,0 -190.5,39.5q-66.5,39.5 -66.5,111.5q0,42 21,70.5q21,28.5 61,51.5q40,23 182,68q128,40 192,81q65,41 100.5,97q35.5,56 35.5,132zM3558,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3582,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_release", 0.0018858, 0.0018858, "M367,1336l-113,585l-191,0l273,-1409l612,0q153,0 264,54q97,46 150.5,127.5q53.5,81.5 53.5,188.5q0,188 -108,298q-108,110 -319,139l268,602l-206,0l-243,-585l-441,0zM857,1185q181,0 273,-75.5q92,-75.5 92,-212.5q0,-112 -74.5,-172q-74.5,-60 -222.5,-60l-427,0l-101,520l460,0zM1735,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM1759,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM3119,437l-289,1484l-179,0l288,-1484l180,0zM3329,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3353,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM5139,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM4449,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM6258,1604q0,162 -124,249.5q-124,87.5 -358,87.5q-174,0 -276.5,-58.5q-102.5,-58.5 -143.5,-184.5l147,-56q33,88 102.5,128q69.5,40 186.5,40q291,0 291,-190q0,-62 -51,-104q-52,-41 -216,-92q-129,-43 -192,-82q-64,-40 -98,-93.5q-34,-53.5 -34,-124.5q0,-145 116,-223.5q116,-78.5 327,-78.5q177,0 276.5,63.5q99.5,63.5 121.5,191.5l-163,25q-22,-79 -83,-114q-61,-35 -164,-35q-124,0 -190.5,39.5q-66.5,39.5 -66.5,111.5q0,42 21,70.5q21,28.5 61,51.5q40,23 182,68q128,40 192,81q65,41 100.5,97q35.5,56 35.5,132zM6631,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM6655,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_volume", 0.0018858, 0.0018858, "M1525,512l-848,1409l-198,0l-302,-1409l194,0l198,992q9,62 17.5,124.5q8.5,62.5 17.5,124.5q33,-62 66.5,-124.5q33.5,-62.5 66.5,-124.5l580,-992l208,0zM2364,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2178,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM2930,437l-289,1484l-179,0l288,-1484l180,0zM3632,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0zM4683,1921l124,-634q25,-122 25,-174q0,-75 -38,-114.5q-38,-39.5 -124,-39.5q-116,0 -202.5,99q-86.5,99 -113.5,259l-118,604l-179,0l166,-851q20,-95 39,-231l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q73,-114 146.5,-159q73.5,-45 175.5,-45q248,0 277,232q83,-130 163.5,-181q80.5,-51 184.5,-51q135,0 207.5,73q72.5,73 72.5,211q0,63 -21,164l-127,653l-178,0l124,-634q25,-122 25,-174q0,-75 -38,-114.5q-38,-39.5 -124,-39.5q-116,0 -202,97.5q-86,97.5 -114,257.5l-118,607l-178,0zM5985,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM6009,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_pan", 0.0018858, 0.0018858, "M852,512q231,0 366,104q135,104 135,285q0,146 -69,252q-69,106 -196.5,162.5q-127.5,56.5 -303.5,56.5l-424,0l-106,549l-191,0l273,-1409l516,0zM390,1221l387,0q191,0 286.5,-78q95.5,-78 95.5,-233q0,-119 -79,-182q-79,-63 -233,-63l-349,0l-108,556zM2293,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM1603,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM2837,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5z", "white")
    this.defPath("L_I_timbre", 0.0018858, 0.0018858, "M858,668l-244,1253l-190,0l244,-1253l-484,0l30,-156l1158,0l-30,156l-484,0zM1734,437l-34,172l-180,0l34,-172l180,0zM1656,839l-211,1082l-179,0l210,-1082l180,0zM2348,1921l124,-634q25,-122 25,-174q0,-75 -38,-114.5q-38,-39.5 -124,-39.5q-116,0 -202.5,99q-86.5,99 -113.5,259l-118,604l-179,0l166,-851q20,-95 39,-231l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q73,-114 146.5,-159q73.5,-45 175.5,-45q248,0 277,232q83,-130 163.5,-181q80.5,-51 184.5,-51q135,0 207.5,73q72.5,73 72.5,211q0,63 -21,164l-127,653l-178,0l124,-634q25,-122 25,-174q0,-75 -38,-114.5q-38,-39.5 -124,-39.5q-116,0 -202,97.5q-86,97.5 -114,257.5l-118,607l-178,0zM4138,819q157,0 244.5,94.5q87.5,94.5 87.5,259.5q0,101 -15,199.5q-15,98.5 -46,193.5q-61,190 -173,282.5q-112,92.5 -285,92.5q-123,0 -200,-52q-77,-52 -109,-146l-3,0q-4,21 -11.5,55q-7.5,34 -15.5,64q-6,24 -10.5,40.5q-4.5,16.5 -5.5,18.5l-173,0q5,-15 19.5,-82q14.5,-67 29.5,-141l245,-1261l180,0l-83,423q-4,23 -12.5,58q-8.5,35 -21.5,82l4,0q73,-95 154,-138q81,-43 200,-43zM4086,958q-191,0 -289,162q-29,49 -50.5,113.5q-21.5,64.5 -35.5,132.5q-19,100 -19,178q0,125 63.5,194.5q63.5,69.5 176.5,69.5q124,0 196,-76q36,-38 64.5,-101q28.5,-63 48.5,-138.5q20,-75.5 30.5,-151q10.5,-75.5 10.5,-136.5q0,-123 -47,-185q-47,-62 -149,-62zM5251,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM5471,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM5495,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_wave", 0.0018858, 0.0018858, "M961,1026l-419,895l-223,0l-142,-1409l197,0l79,895q6,77 10,164q4,87 6,182q40,-94 72.5,-169.5q32.5,-75.5 58.5,-132.5l443,-939l183,0l75,877q7,77 11.5,168q4.5,91 5.5,196q38,-83 58.5,-134q20.5,-51 35.5,-85l481,-1022l201,0l-688,1409l-223,0l-71,-895q-7,-137 -11,-218q-4,-81 -5,-106q-38,100 -72,181q-34,81 -63,143zM2823,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM2133,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM4157,839l-615,1082l-213,0l-182,-1082l187,0l101,704q3,22 6,50.5q3,28.5 6.5,61.5q3.5,33 6.5,72l4,53l26,-53q23,-47 46,-92.5q23,-45.5 47,-89.5l384,-706l196,0zM4315,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM4339,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_mod", 0.0018858, 0.0018858, "M433,880l-200,1041l-170,0l273,-1409l236,0l189,977q4,19 12,70.5q8,51.5 20,134.5q26,-53 52,-106.5q26,-53.5 52,-106.5l553,-969l256,0l-273,1409l-172,0l180,-928q18,-92 34.5,-167q16.5,-75 30.5,-133q-30,63 -56.5,115q-26.5,52 -48.5,93q-22,41 -40,72l-548,948l-124,0l-185,-948q-3,-14 -13.5,-84.5q-10.5,-70.5 -27.5,-195.5q-4,30 -11.5,76.5q-7.5,46.5 -18.5,110.5zM2780,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2594,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3246,1942q-157,0 -244.5,-94.5q-87.5,-94.5 -87.5,-259.5q0,-202 62,-394q62,-191 173,-282.5q111,-91.5 284,-91.5q123,0 200.5,52q77.5,52 109.5,146l5,0q7,-41 14,-81.5q7,-40.5 14,-80.5l82,-419l180,0l-245,1261q-14,70 -23.5,126q-9.5,56 -14.5,97l-172,0q0,-51 21,-160l-5,0q-73,95 -154,138q-81,43 -199,43zM3298,1803q192,0 289,-163q33,-54 56.5,-128.5q23.5,-74.5 36,-152.5q12.5,-78 12.5,-142q0,-125 -63.5,-194.5q-63.5,-69.5 -176.5,-69.5q-122,0 -193,72q-47,48 -82.5,141q-35.5,93 -55,198.5q-19.5,105.5 -19.5,191.5q0,123 47,185q47,62 149,62z", "white")
    this.defPath("L_I_mixer", 0.0018858, 0.0018858, "M433,880l-200,1041l-170,0l273,-1409l236,0l189,977q4,19 12,70.5q8,51.5 20,134.5q26,-53 52,-106.5q26,-53.5 52,-106.5l553,-969l256,0l-273,1409l-172,0l180,-928q18,-92 34.5,-167q16.5,-75 30.5,-133q-30,63 -56.5,115q-26.5,52 -48.5,93q-22,41 -40,72l-548,948l-124,0l-185,-948q-3,-14 -13.5,-84.5q-10.5,-70.5 -27.5,-195.5q-4,30 -11.5,76.5q-7.5,46.5 -18.5,110.5zM2207,437l-34,172l-180,0l34,-172l180,0zM2129,839l-211,1082l-179,0l210,-1082l180,0zM2658,1477l-380,444l-199,0l492,-556l-264,-526l189,0l193,421l350,-421l206,0l-469,524l281,558l-190,0l-209,-444zM3441,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3465,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM5042,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150z", "white")
    this.defPath("L_I_control", 0.0018858, 0.0018858, "M1215,1495l143,89q-126,188 -286,272.5q-160,84.5 -372,84.5q-181,0 -314,-73q-133,-72 -203,-206q-70,-134 -70,-310q0,-246 105,-445q105,-199 291.5,-307.5q186.5,-108.5 416.5,-108.5q217,0 366.5,90.5q149.5,90.5 197.5,254.5l-180,55q-36,-112 -139.5,-178q-103.5,-66 -254.5,-66q-185,0 -324,88q-140,88 -215,249q-75,161 -75,371q0,200 109,315.5q109,115.5 302,115.5q148,0 276,-73.5q128,-73.5 226,-217.5zM2553,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2367,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM2950,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM4032,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM5044,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM6082,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM5896,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM6648,437l-289,1484l-179,0l288,-1484l180,0z", "white")
    this.defPath("L_I_pitch", 0.0018858, 0.0018858, "M852,512q231,0 366,104q135,104 135,285q0,146 -69,252q-69,106 -196.5,162.5q-127.5,56.5 -303.5,56.5l-424,0l-106,549l-191,0l273,-1409l516,0zM390,1221l387,0q191,0 286.5,-78q95.5,-78 95.5,-233q0,-119 -79,-182q-79,-63 -233,-63l-349,0l-108,556zM1867,437l-34,172l-180,0l34,-172l180,0zM1789,839l-211,1082l-179,0l210,-1082l180,0zM2096,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM2859,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM3797,1024q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5l-118,606l-179,0l288,-1484l180,0l-75,386q-9,50 -21,100.5q-12,50.5 -26,100.5l3,0z", "white")
    this.defPath("L_I_filters", 0.0018858, 0.0018858, "M364,1350l-110,571l-191,0l273,-1409l1011,0l-30,156l-820,0l-102,524l796,0l-31,158l-796,0zM1752,437l-34,172l-180,0l34,-172l180,0zM1674,839l-211,1082l-179,0l210,-1082l180,0zM2207,437l-289,1484l-179,0l288,-1484l180,0zM2436,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM2986,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3010,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM4587,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM5458,1604q0,162 -124,249.5q-124,87.5 -358,87.5q-174,0 -276.5,-58.5q-102.5,-58.5 -143.5,-184.5l147,-56q33,88 102.5,128q69.5,40 186.5,40q291,0 291,-190q0,-62 -51,-104q-52,-41 -216,-92q-129,-43 -192,-82q-64,-40 -98,-93.5q-34,-53.5 -34,-124.5q0,-145 116,-223.5q116,-78.5 327,-78.5q177,0 276.5,63.5q99.5,63.5 121.5,191.5l-163,25q-22,-79 -83,-114q-61,-35 -164,-35q-124,0 -190.5,39.5q-66.5,39.5 -66.5,111.5q0,42 21,70.5q21,28.5 61,51.5q40,23 182,68q128,40 192,81q65,41 100.5,97q35.5,56 35.5,132z", "white")
    this.defPath("L_I_output", 0.0018858, 0.0018858, "M938,491q185,0 319,71q134,71 206.5,201q72.5,130 72.5,307q-4,266 -112,463q-107,196 -293,302q-186,106 -422,106q-201,0 -340,-81q-125,-71 -191.5,-202q-66.5,-131 -66.5,-310q0,-240 106,-440q105,-200 294,-308.5q189,-108.5 427,-108.5zM929,645q-199,0 -339,89q-93,59 -157,160q-64,101 -97.5,222q-33.5,121 -33.5,242q0,209 106.5,318.5q106.5,109.5 309.5,109.5q197,0 336,-87q92,-58 157,-155.5q65,-97.5 99.5,-219.5q34.5,-122 34.5,-250q0,-207 -108.5,-318q-108.5,-111 -307.5,-111zM2341,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0zM3007,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM3855,1941q-123,0 -200.5,-52q-77.5,-52 -109.5,-146l-5,0q0,5 -2,21.5q-2,16.5 -6,43.5q-4,27 -30,161.5q-26,134.5 -73,376.5l-179,0l249,-1286q5,-24 9.5,-48q4.5,-24 8.5,-48q5,-32 9,-63q4,-31 8,-62l167,0q0,18 -3,50.5q-3,32.5 -7,63.5q-4,31 -7,47l4,0q73,-95 154,-138q81,-43 200,-43q157,0 244.5,94.5q87.5,94.5 87.5,259.5q0,204 -61,393q-61,190 -173,282.5q-112,92.5 -285,92.5zM3990,958q-99,0 -169.5,40.5q-70.5,40.5 -119.5,121.5q-32,54 -56,129q-24,75 -36.5,152.5q-12.5,77.5 -12.5,142.5q0,125 63.5,194.5q63.5,69.5 176.5,69.5q124,0 196,-76q36,-38 64.5,-101q28.5,-63 48.5,-138.5q20,-75.5 30.5,-151q10.5,-75.5 10.5,-136.5q0,-123 -47,-185q-47,-62 -149,-62zM5188,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0zM5854,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24z", "white")
    this.defPath("L_I_lfo", 0.0018858, 0.0018858, "M996,1765l-30,156l-903,0l273,-1409l191,0l-243,1253l712,0zM1503,1350l-110,571l-191,0l273,-1409l1011,0l-30,156l-820,0l-102,524l796,0l-31,158l-796,0zM3328,491q185,0 319,71q134,71 206.5,201q72.5,130 72.5,307q-4,266 -112,463q-107,196 -293,302q-186,106 -422,106q-201,0 -340,-81q-125,-71 -191.5,-202q-66.5,-131 -66.5,-310q0,-240 106,-440q105,-200 294,-308.5q189,-108.5 427,-108.5zM3319,645q-199,0 -339,89q-93,59 -157,160q-64,101 -97.5,222q-33.5,121 -33.5,242q0,209 106.5,318.5q106.5,109.5 309.5,109.5q197,0 336,-87q92,-58 157,-155.5q65,-97.5 99.5,-219.5q34.5,-122 34.5,-250q0,-207 -108.5,-318q-108.5,-111 -307.5,-111z", "white")
    this.defPath("L_I_env1", 0.0018858, 0.0018858, "M1183,1765l-30,156l-1090,0l273,-1409l1049,0l-30,156l-858,0l-88,452l798,0l-30,154l-798,0l-95,491l899,0zM1698,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM3627,839l-615,1082l-213,0l-182,-1082l187,0l101,704q3,22 6,50.5q3,28.5 6.5,61.5q3.5,33 6.5,72l4,53l26,-53q23,-47 46,-92.5q23,-45.5 47,-89.5l384,-706l196,0zM4495,1768l-30,153l-883,0l30,-153l359,0l208,-1070l-361,223l35,-180l377,-229l166,0l-244,1256l343,0z", "white")
    this.defPath("L_I_env2", 0.0018858, 0.0018858, "M1183,1765l-30,156l-1090,0l273,-1409l1049,0l-30,156l-858,0l-88,452l798,0l-30,154l-798,0l-95,491l899,0zM1698,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM3627,839l-615,1082l-213,0l-182,-1082l187,0l101,704q3,22 6,50.5q3,28.5 6.5,61.5q3.5,33 6.5,72l4,53l26,-53q23,-47 46,-92.5q23,-45.5 47,-89.5l384,-706l196,0zM4478,1768l-29,153l-932,0l24,-127q55,-93 123,-166q68,-73 142,-133q50,-40 100.5,-74.5q50.5,-34.5 100.5,-66.5q50,-32 98,-62q71,-45 133.5,-90q62.5,-45 109.5,-96q47,-51 74,-111.5q27,-60.5 27,-136.5q0,-98 -62.5,-158.5q-62.5,-60.5 -168.5,-60.5q-109,0 -190,59.5q-81,59.5 -118,178.5l-170,-37q54,-170 178,-259.5q124,-89.5 311,-89.5q122,0 214,44.5q92,44.5 143.5,124q51.5,79.5 51.5,183.5q0,105 -51,203q-34,64 -89.5,124q-55.5,60 -145,127q-89.5,67 -227.5,154q-147,93 -237.5,169q-90.5,76 -136.5,148l727,0z", "white")
    this.defPath("L_I_env3", 0.0018858, 0.0018858, "M1183,1765l-30,156l-1090,0l273,-1409l1049,0l-30,156l-858,0l-88,452l798,0l-30,154l-798,0l-95,491l899,0zM1698,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM3627,839l-615,1082l-213,0l-182,-1082l187,0l101,704q3,22 6,50.5q3,28.5 6.5,61.5q3.5,33 6.5,72l4,53l26,-53q23,-47 46,-92.5q23,-45.5 47,-89.5l384,-706l196,0zM4095,1126q183,0 273.5,-73q90.5,-73 90.5,-213q0,-93 -60.5,-147q-60.5,-54 -161.5,-54q-119,0 -204.5,61q-85.5,61 -119.5,172l-178,-14q58,-186 191.5,-276.5q133.5,-90.5 320.5,-90.5q187,0 295,92q108,92 108,252q0,153 -96.5,249.5q-96.5,96.5 -271.5,119.5l-1,4q131,26 204,104.5q73,78.5 73,201.5q0,124 -60,222q-61,97 -175.5,151q-114.5,54 -267.5,54q-127,0 -226,-44q-201,-91 -252,-314l164,-48q30,116 118,186.5q88,70.5 211,70.5q141,0 220.5,-74.5q79.5,-74.5 79.5,-200.5q0,-112 -75,-173.5q-75,-61.5 -204,-61.5l-124,0l30,-156l98,0z", "white")
    this.defPath("B_tracks", 0.0013484, 0.0013484, "M9244.78,740l0,1181l-295,0l0,-1181l-455,0l0,-228l1206,0l0,228l-456,0zM10033.78,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252zM10799.78,1941q-157,0 -245,-85.5q-88,-85.5 -88,-240.5q0,-168 109.5,-255q109.5,-87 317.5,-91l233,-4l0,-55q0,-106 -37,-157.5q-37,-51.5 -121,-51.5q-78,0 -114.5,35.5q-36.5,35.5 -45.5,117.5l-293,-14q55,-321 465,-321q205,0 316,101q111,101 111,287l0,394q0,91 20.5,125.5q20.5,34.5 68.5,34.5q32,0 62,-6l0,152q-52,13 -89,19.5q-37,6.5 -91,6.5q-106,0 -156.5,-52q-50.5,-52 -60.5,-153l-6,0q-59,106 -148,159.5q-89,53.5 -208,53.5zM11126.78,1420l-144,2q-99,5 -139,21q-41,18 -62.5,54q-21.5,36 -21.5,96q0,77 35.5,114.5q35.5,37.5 94.5,37.5q66,0 121,-36q54,-36 85,-99.5q31,-63.5 31,-134.5l0,-55zM12139.78,1941q-246,0 -380,-146.5q-134,-146.5 -134,-408.5q0,-268 135,-417.5q135,-149.5 383,-149.5q191,0 316,96q125,96 157,265l-283,14q-12,-83 -60,-132.5q-48,-49.5 -136,-49.5q-109,0 -163,90.5q-54,90.5 -54,272.5q0,187 55.5,280.5q55.5,93.5 165.5,93.5q80,0 134,-50.5q54,-50.5 67,-150.5l282,13q-15,114 -80.5,199.5q-65.5,85.5 -169.5,133q-104,47.5 -235,47.5zM13108.78,1515l0,406l-281,0l0,-1484l281,0l0,850l386,-448l302,0l-380,422l409,660l-307,0l-289,-490l-121,84zM14878.78,1605q0,157 -128.5,246.5q-128.5,89.5 -355.5,89.5q-223,0 -341.5,-70.5q-118.5,-70.5 -157.5,-219.5l247,-37q21,77 72.5,109q51.5,32 179.5,32q118,0 172,-30q54,-30 54,-94q0,-52 -43.5,-82.5q-43.5,-30.5 -147.5,-51.5q-79,-16 -141.5,-31q-62.5,-15 -107,-29.5q-44.5,-14.5 -72.5,-27.5q-83,-41 -126.5,-105q-43.5,-64 -43.5,-158q0,-155 119.5,-241.5q119.5,-86.5 338.5,-86.5q193,0 310.5,75q117.5,75 146.5,217l-249,26q-12,-66 -59,-98.5q-47,-32.5 -149,-32.5q-100,0 -150,25.5q-50,25.5 -50,85.5q0,47 38.5,74.5q38.5,27.5 129.5,45.5q127,26 225.5,53.5q98.5,27.5 158.5,65.5q59,38 94.5,97.5q35.5,59.5 35.5,152.5z", "white")
    this.defPath("I_1_6", 0.0018858, 0.0018858, "M3675.194444444444,1768l-30,153l-883,0l30,-153l359,0l208,-1070l-361,223l35,-180l377,-229l166,0l-244,1256l343,0zM4484.194444444443,1297l-31,160l-500,0l31,-160l500,0zM5064.194444444443,1941q-128,0 -222.5,-61q-94.5,-61 -145.5,-170q-51,-109 -51,-253q0,-242 84,-477q83,-236 228,-362.5q145,-126.5 334,-126.5q150,0 246.5,71.5q96.5,71.5 131.5,207.5l-166,36q-25,-81 -82,-125q-57,-44 -138,-44q-164,0 -279,146q-115,146 -167,412q60,-90 151.5,-137.5q91.5,-47.5 204.5,-47.5q115,0 201,48q86,48 134.5,133q48.5,85 48.5,197q0,152 -66,280q-67,129 -184.5,201q-117.5,72 -262.5,72zM4818.194444444443,1500q0,131 68,213.5q68,82.5 182,82.5q93,0 166,-51.5q73,-51.5 115,-141.5q42,-90 42,-204q0,-115 -59.5,-182.5q-59.5,-67.5 -171.5,-67.5q-93,0 -171,42q-79,43 -125,121q-46,78 -46,188z", "white")
    this.defPath("I_7_12", 0.0018858, 0.0018858, "M2574.694444444444,1921l-188,0q20,-102 51.5,-199q31.5,-97 73.5,-189q42,-92 90.5,-179.5q48.5,-87.5 117,-185.5q68.5,-98 167,-220q98.5,-122 239.5,-283l-774,0l29,-153l961,0l-28,146q-112,131 -188.5,224q-76.5,93 -119.5,148q-43,55 -81,108.5q-38,53.5 -72,105.5q-34,52 -64.5,104.5q-30.5,52.5 -56.5,105.5q-53,106 -92.5,222.5q-39.5,116.5 -64.5,244.5zM3914.694444444444,1297l-31,160l-500,0l31,-160l500,0zM4926.694444444443,1768l-30,153l-883,0l30,-153l359,0l208,-1070l-361,223l35,-180l377,-229l166,0l-244,1256l343,0zM6048.694444444443,1768l-29,153l-932,0l24,-127q55,-93 123,-166q68,-73 142,-133q50,-40 100.5,-74.5q50.5,-34.5 100.5,-66.5q50,-32 98,-62q71,-45 133.5,-90q62.5,-45 109.5,-96q47,-51 74,-111.5q27,-60.5 27,-136.5q0,-98 -62.5,-158.5q-62.5,-60.5 -168.5,-60.5q-109,0 -190,59.5q-81,59.5 -118,178.5l-170,-37q54,-170 178,-259.5q124,-89.5 311,-89.5q122,0 214,44.5q92,44.5 143.5,124q51.5,79.5 51.5,183.5q0,105 -51,203q-34,64 -89.5,124q-55.5,60 -145,127q-89.5,67 -227.5,154q-147,93 -237.5,169q-90.5,76 -136.5,148l727,0z", "white")
    this.defPath("L_I_rec", 0.0018858, 0.0018858, "M367,1336l-113,585l-191,0l273,-1409l612,0q153,0 264,54q97,46 150.5,127.5q53.5,81.5 53.5,188.5q0,188 -108,298q-108,110 -319,139l268,602l-206,0l-243,-585l-441,0zM857,1185q181,0 273,-75.5q92,-75.5 92,-212.5q0,-112 -74.5,-172q-74.5,-60 -222.5,-60l-427,0l-101,520l460,0zM1735,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM1759,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM3087,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267z", "white")
    this.defPath("L_I_stop", 0.0018858, 0.0018858, "M616,1941q-249,0 -386.5,-88.5q-137.5,-88.5 -171.5,-269.5l177,-37q27,129 120,187q93,58 275,58q219,0 320,-65.5q101,-65.5 101,-200.5q0,-67 -29,-107.5q-29,-40.5 -99,-73.5q-35,-16 -95,-36q-60,-20 -146,-44q-168,-46 -255,-97q-85,-50 -128.5,-119.5q-43.5,-69.5 -43.5,-167.5q0,-122 69.5,-209q69.5,-87 197.5,-133.5q128,-46.5 302,-46.5q220,0 353,76q133,76 167,222l-173,51q-33,-105 -118.5,-155q-85.5,-50 -229.5,-50q-188,0 -282,59q-94,59 -94,177q0,60 26,97.5q26,37.5 84,66.5q29,14 87,33.5q58,19.5 145,42.5q98,27 168,53q70,26 113,51q86,50 131,121.5q45,71.5 45,176.5q0,206 -155,317q-155,111 -475,111zM1641,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM3009,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2823,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3628,1941q-123,0 -200.5,-52q-77.5,-52 -109.5,-146l-5,0q0,5 -2,21.5q-2,16.5 -6,43.5q-4,27 -30,161.5q-26,134.5 -73,376.5l-179,0l249,-1286q5,-24 9.5,-48q4.5,-24 8.5,-48q5,-32 9,-63q4,-31 8,-62l167,0q0,18 -3,50.5q-3,32.5 -7,63.5q-4,31 -7,47l4,0q73,-95 154,-138q81,-43 200,-43q157,0 244.5,94.5q87.5,94.5 87.5,259.5q0,204 -61,393q-61,190 -173,282.5q-112,92.5 -285,92.5zM3763,958q-99,0 -169.5,40.5q-70.5,40.5 -119.5,121.5q-32,54 -56,129q-24,75 -36.5,152.5q-12.5,77.5 -12.5,142.5q0,125 63.5,194.5q63.5,69.5 176.5,69.5q124,0 196,-76q36,-38 64.5,-101q28.5,-63 48.5,-138.5q20,-75.5 30.5,-151q10.5,-75.5 10.5,-136.5q0,-123 -47,-185q-47,-62 -149,-62z", "white")
    this.defPath("L_I__cont", 0.0018858, 0.0018858, "M745,437l-700,1504l-161,0l703,-1504l158,0zM1784,1495l143,89q-126,188 -286,272.5q-160,84.5 -372,84.5q-181,0 -314,-73q-133,-72 -203,-206q-70,-134 -70,-310q0,-246 105,-445q105,-199 291.5,-307.5q186.5,-108.5 416.5,-108.5q217,0 366.5,90.5q149.5,90.5 197.5,254.5l-180,55q-36,-112 -139.5,-178q-103.5,-66 -254.5,-66q-185,0 -324,88q-140,88 -215,249q-75,161 -75,371q0,200 109,315.5q109,115.5 302,115.5q148,0 276,-73.5q128,-73.5 226,-217.5zM3122,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2936,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3519,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM4601,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24z", "white")
    this.defPath("L_I_play", 0.0018858, 0.0018858, "M852,512q231,0 366,104q135,104 135,285q0,146 -69,252q-69,106 -196.5,162.5q-127.5,56.5 -303.5,56.5l-424,0l-106,549l-191,0l273,-1409l516,0zM390,1221l387,0q191,0 286.5,-78q95.5,-78 95.5,-233q0,-119 -79,-182q-79,-63 -233,-63l-349,0l-108,556zM1867,437l-289,1484l-179,0l288,-1484l180,0zM2748,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM2058,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM2976,2346q-70,0 -132,-14l31,-134q48,8 77,8q95,0 167.5,-64q72.5,-64 142.5,-186l27,-47l-217,-1070l183,0l112,598q8,40 15,84.5q7,44.5 13,86q6,41.5 10,72.5q4,31 4,45q5,-11 11.5,-24.5q6.5,-13.5 14.5,-29.5l122,-225l331,-607l199,0l-626,1082q-112,195 -178,270q-67,78 -141,116.5q-74,38.5 -166,38.5z", "white")
    this.defPath("L_I_click", 0.0018858, 0.0018858, "M1215,1495l143,89q-126,188 -286,272.5q-160,84.5 -372,84.5q-181,0 -314,-73q-133,-72 -203,-206q-70,-134 -70,-310q0,-246 105,-445q105,-199 291.5,-307.5q186.5,-108.5 416.5,-108.5q217,0 366.5,90.5q149.5,90.5 197.5,254.5l-180,55q-36,-112 -139.5,-178q-103.5,-66 -254.5,-66q-185,0 -324,88q-140,88 -215,249q-75,161 -75,371q0,200 109,315.5q109,115.5 302,115.5q148,0 276,-73.5q128,-73.5 226,-217.5zM1980,437l-289,1484l-179,0l288,-1484l180,0zM2435,437l-34,172l-180,0l34,-172l180,0zM2357,839l-211,1082l-179,0l210,-1082l180,0zM2858,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM3698,1543l-72,378l-179,0l288,-1484l180,0l-179,917l204,-190l361,-325l222,0l-530,465l336,617l-195,0l-268,-502l-168,124z", "white")
    this.defPath("L_I_seq", 0.0018858, 0.0018858, "M616,1941q-249,0 -386.5,-88.5q-137.5,-88.5 -171.5,-269.5l177,-37q27,129 120,187q93,58 275,58q219,0 320,-65.5q101,-65.5 101,-200.5q0,-67 -29,-107.5q-29,-40.5 -99,-73.5q-35,-16 -95,-36q-60,-20 -146,-44q-168,-46 -255,-97q-85,-50 -128.5,-119.5q-43.5,-69.5 -43.5,-167.5q0,-122 69.5,-209q69.5,-87 197.5,-133.5q128,-46.5 302,-46.5q220,0 353,76q133,76 167,222l-173,51q-33,-105 -118.5,-155q-85.5,-50 -229.5,-50q-188,0 -282,59q-94,59 -94,177q0,60 26,97.5q26,37.5 84,66.5q29,14 87,33.5q58,19.5 145,42.5q98,27 168,53q70,26 113,51q86,50 131,121.5q45,71.5 45,176.5q0,206 -155,317q-155,111 -475,111zM1622,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM1646,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM2906,1942q-157,0 -244.5,-94.5q-87.5,-94.5 -87.5,-259.5q0,-202 62,-394q62,-191 173,-282.5q111,-91.5 284,-91.5q123,0 200.5,52q77.5,52 109.5,146l5,0q8,-36 17.5,-78q9.5,-42 18.5,-75q9,-33 13,-40l173,0q-11,39 -27.5,112.5q-16.5,73.5 -37.5,182.5q-59,306 -119,613q-60,307 -119,613l-180,0l85,-439l32,-146l-4,0q-73,95 -154,138q-81,43 -200,43zM2958,1803q99,0 169.5,-40.5q70.5,-40.5 119.5,-122.5q33,-54 56.5,-128.5q23.5,-74.5 36,-152.5q12.5,-78 12.5,-142q0,-125 -63.5,-194.5q-63.5,-69.5 -176.5,-69.5q-122,0 -193,72q-47,48 -82.5,141q-35.5,93 -55,198.5q-19.5,105.5 -19.5,191.5q0,123 47,185q47,62 149,62z", "white")
    this.defPath("L_I_locate", 0.0018858, 0.0018858, "M996,1765l-30,156l-903,0l273,-1409l191,0l-243,1253l712,0zM2213,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2027,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM2747,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM4229,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM3539,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM4716,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM5266,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM5290,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_song", 0.0018858, 0.0018858, "M616,1941q-249,0 -386.5,-88.5q-137.5,-88.5 -171.5,-269.5l177,-37q27,129 120,187q93,58 275,58q219,0 320,-65.5q101,-65.5 101,-200.5q0,-67 -29,-107.5q-29,-40.5 -99,-73.5q-35,-16 -95,-36q-60,-20 -146,-44q-168,-46 -255,-97q-85,-50 -128.5,-119.5q-43.5,-69.5 -43.5,-167.5q0,-122 69.5,-209q69.5,-87 197.5,-133.5q128,-46.5 302,-46.5q220,0 353,76q133,76 167,222l-173,51q-33,-105 -118.5,-155q-85.5,-50 -229.5,-50q-188,0 -282,59q-94,59 -94,177q0,60 26,97.5q26,37.5 84,66.5q29,14 87,33.5q58,19.5 145,42.5q98,27 168,53q70,26 113,51q86,50 131,121.5q45,71.5 45,176.5q0,206 -155,317q-155,111 -475,111zM2440,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2254,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM2837,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM4041,2346q-169,0 -267.5,-63q-98.5,-63 -125.5,-189l163,-42q34,157 234,157q142,0 220,-73.5q78,-73.5 110,-241.5q8,-44 17,-87.5q9,-43.5 17,-86.5l-2,0q-61,88 -109,128q-48,39 -107.5,60q-59.5,21 -136.5,21q-153,0 -246.5,-100.5q-93.5,-100.5 -93.5,-266.5q0,-89 17,-189q17,-100 48.5,-193q31.5,-93 74.5,-161q65,-102 158,-150.5q93,-48.5 220,-48.5q121,0 204.5,57q83.5,57 107.5,147l2,0q5,-25 15,-66.5q10,-41.5 20,-77q10,-35.5 13,-41.5l171,0l-19,82l-30,142l-161,827q-48,242 -172,349q-124,107 -342,107zM3903,1548q0,248 207,248q108,0 196,-79q88,-78 136.5,-215q48.5,-137 48.5,-285q0,-125 -64,-194.5q-64,-69.5 -176,-69.5q-90,0 -150,37q-60,37 -101,116q-27,52 -49,130.5q-22,78.5 -35,161.5q-13,83 -13,150z", "white")
    this.defPath("L_I_track", 0.0018858, 0.0018858, "M858,668l-244,1253l-190,0l244,-1253l-484,0l30,-156l1158,0l-30,156l-484,0zM1817,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM2708,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM2018,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM3389,1799q103,0 175,-57.5q72,-57.5 114,-172.5l156,49q-122,323 -449,323q-192,0 -295,-109q-103,-109 -103,-306q0,-201 73,-372q72,-172 191.5,-253.5q119.5,-81.5 293.5,-81.5q169,0 267.5,85q98.5,85 108.5,233l-177,25q-6,-97 -60,-149.5q-54,-52.5 -145,-52.5q-147,0 -227.5,91.5q-80.5,91.5 -120.5,282.5q-10,49 -15,99.5q-5,50.5 -5,98.5q0,267 218,267zM4229,1543l-72,378l-179,0l288,-1484l180,0l-179,917l204,-190l361,-325l222,0l-530,465l336,617l-195,0l-268,-502l-168,124z", "white")
    this.defPath("L_I_master", 0.0018858, 0.0018858, "M433,880l-200,1041l-170,0l273,-1409l236,0l189,977q4,19 12,70.5q8,51.5 20,134.5q26,-53 52,-106.5q26,-53.5 52,-106.5l553,-969l256,0l-273,1409l-172,0l180,-928q18,-92 34.5,-167q16.5,-75 30.5,-133q-30,63 -56.5,115q-26.5,52 -48.5,93q-22,41 -40,72l-548,948l-124,0l-185,-948q-3,-14 -13.5,-84.5q-10.5,-70.5 -27.5,-195.5q-4,30 -11.5,76.5q-7.5,46.5 -18.5,110.5zM2633,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM1943,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM3752,1604q0,162 -124,249.5q-124,87.5 -358,87.5q-174,0 -276.5,-58.5q-102.5,-58.5 -143.5,-184.5l147,-56q33,88 102.5,128q69.5,40 186.5,40q291,0 291,-190q0,-62 -51,-104q-52,-41 -216,-92q-129,-43 -192,-82q-64,-40 -98,-93.5q-34,-53.5 -34,-124.5q0,-145 116,-223.5q116,-78.5 327,-78.5q177,0 276.5,63.5q99.5,63.5 121.5,191.5l-163,25q-22,-79 -83,-114q-61,-35 -164,-35q-124,0 -190.5,39.5q-66.5,39.5 -66.5,111.5q0,42 21,70.5q21,28.5 61,51.5q40,23 182,68q128,40 192,81q65,41 100.5,97q35.5,56 35.5,132zM4144,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM4694,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM4718,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM6295,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150z", "white")
    this.defPath("L_I_storage", 0.0018858, 0.0018858, "M616,1941q-249,0 -386.5,-88.5q-137.5,-88.5 -171.5,-269.5l177,-37q27,129 120,187q93,58 275,58q219,0 320,-65.5q101,-65.5 101,-200.5q0,-67 -29,-107.5q-29,-40.5 -99,-73.5q-35,-16 -95,-36q-60,-20 -146,-44q-168,-46 -255,-97q-85,-50 -128.5,-119.5q-43.5,-69.5 -43.5,-167.5q0,-122 69.5,-209q69.5,-87 197.5,-133.5q128,-46.5 302,-46.5q220,0 353,76q133,76 167,222l-173,51q-33,-105 -118.5,-155q-85.5,-50 -229.5,-50q-188,0 -282,59q-94,59 -94,177q0,60 26,97.5q26,37.5 84,66.5q29,14 87,33.5q58,19.5 145,42.5q98,27 168,53q70,26 113,51q86,50 131,121.5q45,71.5 45,176.5q0,206 -155,317q-155,111 -475,111zM1641,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM3009,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2823,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3792,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM4683,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM3993,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM5292,2346q-169,0 -267.5,-63q-98.5,-63 -125.5,-189l163,-42q34,157 234,157q142,0 220,-73.5q78,-73.5 110,-241.5q8,-44 17,-87.5q9,-43.5 17,-86.5l-2,0q-61,88 -109,128q-48,39 -107.5,60q-59.5,21 -136.5,21q-153,0 -246.5,-100.5q-93.5,-100.5 -93.5,-266.5q0,-89 17,-189q17,-100 48.5,-193q31.5,-93 74.5,-161q65,-102 158,-150.5q93,-48.5 220,-48.5q121,0 204.5,57q83.5,57 107.5,147l2,0q5,-25 15,-66.5q10,-41.5 20,-77q10,-35.5 13,-41.5l171,0l-19,82l-30,142l-161,827q-48,242 -172,349q-124,107 -342,107zM5154,1548q0,248 207,248q108,0 196,-79q88,-78 136.5,-215q48.5,-137 48.5,-285q0,-125 -64,-194.5q-64,-69.5 -176,-69.5q-90,0 -150,37q-60,37 -101,116q-27,52 -49,130.5q-22,78.5 -35,161.5q-13,83 -13,150zM6290,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM6314,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("B_edit", 0.0013484, 0.0013484, "M16927.920000000006,1693l0,228l-1149,0l0,-1409l1108,0l0,228l-813,0l0,354l752,0l0,228l-752,0l0,371l854,0zM17851.920000000006,1921q-2,-10 -6,-42q-4,-32 -6.5,-70q-2.5,-38 -2.5,-64l-4,0q-46,98 -132,147q-86,49 -214,49q-189,0 -292,-147.5q-103,-147.5 -103,-412.5q0,-269 108.5,-415.5q108.5,-146.5 307.5,-146.5q115,0 198.5,48q83.5,48 128.5,143l2,0l-2,-178l0,-395l281,0l0,1248q0,50 2,109q2,59 6,127l-272,0zM17384.920000000006,1381q0,184 55.5,276q55.5,92 165.5,92q111,0 172,-97.5q61,-97.5 61,-277.5q0,-175 -58.5,-269.5q-58.5,-94.5 -172.5,-94.5q-113,0 -168,91.5q-55,91.5 -55,279.5zM18682.920000000006,437l0,207l-281,0l0,-207l281,0zM18682.920000000006,839l0,1082l-281,0l0,-1082l281,0zM19484.920000000006,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174z", "white")
    this.defPath("L_B_system", 0.0018858, 0.0018858, "M1286,1515q0,207 -153.5,316.5q-153.5,109.5 -450.5,109.5q-535,0 -623,-387l285,-47q29,112 113,162.5q84,50.5 233,50.5q155,0 232,-47q77,-47 77,-141q0,-60 -35,-99q-35,-39 -100,-65q-32,-13 -94,-28.5q-62,-15.5 -154,-34.5q-106,-25 -166,-42.5q-60,-17.5 -96,-34q-36,-16.5 -70,-36.5q-75,-45 -117,-120q-42,-75 -42,-187q0,-191 143.5,-292.5q143.5,-101.5 417.5,-101.5q262,0 393.5,82q131.5,82 169.5,271l-286,39q-22,-91 -89.5,-137q-67.5,-46 -193.5,-46q-134,0 -201,42q-67,42 -67,126q0,55 28.5,90q28.5,35 84.5,60q53,24 227,61q101,22 174,41.5q73,19.5 117,37.5q44,19 78.5,40q34.5,21 59.5,45q51,49 78,116.5q27,67.5 27,155.5zM1649,2346q-103,0 -177,-13l0,-200q56,8 97,8q98,0 146.5,-53q48.5,-53 94.5,-178l-428,-1071l297,0l170,507q20,55 45,138q25,83 56,196q23,-92 44,-170q21,-78 46,-160l160,-511l294,0l-428,1139q-26,69 -55,122q-29,53 -59,94q-61,83 -133,117.5q-72,34.5 -170,34.5zM3560,1605q0,157 -128.5,246.5q-128.5,89.5 -355.5,89.5q-223,0 -341.5,-70.5q-118.5,-70.5 -157.5,-219.5l247,-37q21,77 72.5,109q51.5,32 179.5,32q118,0 172,-30q54,-30 54,-94q0,-52 -43.5,-82.5q-43.5,-30.5 -147.5,-51.5q-79,-16 -141.5,-31q-62.5,-15 -107,-29.5q-44.5,-14.5 -72.5,-27.5q-83,-41 -126.5,-105q-43.5,-64 -43.5,-158q0,-155 119.5,-241.5q119.5,-86.5 338.5,-86.5q193,0 310.5,75q117.5,75 146.5,217l-249,26q-12,-66 -59,-98.5q-47,-32.5 -149,-32.5q-100,0 -150,25.5q-50,25.5 -50,85.5q0,47 38.5,74.5q38.5,27.5 129.5,45.5q127,26 225.5,53.5q98.5,27.5 158.5,65.5q59,38 94.5,97.5q35.5,59.5 35.5,152.5zM4301,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174zM4701,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM5123,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM5889,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q52,-124 129.5,-180q77.5,-56 185.5,-56q124,0 199.5,59q75.5,59 101.5,177l6,0q55,-126 132,-181q77,-55 196,-55q158,0 241,107.5q83,107.5 83,308.5l0,687l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-82,0 -137,79.5q-55,79.5 -55,219.5l0,593l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-85,0 -138.5,87q-53.5,87 -53.5,225z", "white")
    this.defPath("L_B_sequencer", 0.0018858, 0.0018858, "M1286,1515q0,207 -153.5,316.5q-153.5,109.5 -450.5,109.5q-535,0 -623,-387l285,-47q29,112 113,162.5q84,50.5 233,50.5q155,0 232,-47q77,-47 77,-141q0,-60 -35,-99q-35,-39 -100,-65q-32,-13 -94,-28.5q-62,-15.5 -154,-34.5q-106,-25 -166,-42.5q-60,-17.5 -96,-34q-36,-16.5 -70,-36.5q-75,-45 -117,-120q-42,-75 -42,-187q0,-191 143.5,-292.5q143.5,-101.5 417.5,-101.5q262,0 393.5,82q131.5,82 169.5,271l-286,39q-22,-91 -89.5,-137q-67.5,-46 -193.5,-46q-134,0 -201,42q-67,42 -67,126q0,55 28.5,90q28.5,35 84.5,60q53,24 227,61q101,22 174,41.5q73,19.5 117,37.5q44,19 78.5,40q34.5,21 59.5,45q51,49 78,116.5q27,67.5 27,155.5zM1741,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM2163,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM2589,1381q0,-268 109.5,-415.5q109.5,-147.5 308.5,-147.5q118,0 199.5,48.5q81.5,48.5 127.5,146.5q0,-31 2.5,-67.5q2.5,-36.5 6.5,-66.5q4,-30 6,-40l270,0q-3,54 -4.5,116q-1.5,62 -1.5,133l0,1258l-279,0l0,-450l5,-155l-2,0q-46,100 -134.5,150q-88.5,50 -218.5,50q-189,0 -292,-147.5q-103,-147.5 -103,-412.5zM3336,1375q0,-173 -58,-268.5q-58,-95.5 -171,-95.5q-112,0 -168.5,92.5q-56.5,92.5 -56.5,277.5q0,184 55.5,276q55.5,92 167.5,92q110,0 170.5,-97.5q60.5,-97.5 60.5,-276.5zM4587,1706q-56,123 -142.5,179q-86.5,56 -205.5,56q-172,0 -264,-105.5q-92,-105.5 -92,-309.5l0,-687l281,0l0,607q0,142 48,213.5q48,71.5 144,71.5q102,0 164.5,-87.5q62.5,-87.5 62.5,-224.5l0,-580l281,0l0,840q0,69 2,129.5q2,60.5 6,112.5l-268,0q-6,-72 -9,-126q-3,-54 -3,-89l-5,0zM5382,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM5804,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM6570,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q57,-124 143,-180q86,-56 205,-56q172,0 264,106q92,106 92,310l0,687l-280,0l0,-607q0,-143 -48,-214q-48,-71 -145,-71q-102,0 -164.5,87.5q-62.5,87.5 -62.5,224.5zM7991,1941q-246,0 -380,-146.5q-134,-146.5 -134,-408.5q0,-268 135,-417.5q135,-149.5 383,-149.5q191,0 316,96q125,96 157,265l-283,14q-12,-83 -60,-132.5q-48,-49.5 -136,-49.5q-109,0 -163,90.5q-54,90.5 -54,272.5q0,187 55.5,280.5q55.5,93.5 165.5,93.5q80,0 134,-50.5q54,-50.5 67,-150.5l282,13q-15,114 -80.5,199.5q-65.5,85.5 -169.5,133q-104,47.5 -235,47.5zM8911,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM9333,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM10099,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252z", "white")
    this.defPath("B_multi", 0.0013484, 0.0013484, "M9727.780000000002,1067l0,854l-262,0l0,-1409l395,0l252,788q17,66 35,132.5q18,66.5 35,132.5q11,-38 21,-75.5q10,-37.5 20.5,-75.5q10.5,-38 21.5,-75l259,-827l393,0l0,1409l-262,0l0,-854q0,-29 2.5,-116.5q2.5,-87.5 7.5,-190.5q-35,134 -61.5,228q-26.5,94 -43.5,147l-254,786l-210,0l-254,-786l-107,-375q6,116 9,192.5q3,76.5 3,114.5zM11865.780000000002,1706q-56,123 -142.5,179q-86.5,56 -205.5,56q-172,0 -264,-105.5q-92,-105.5 -92,-309.5l0,-687l281,0l0,607q0,142 48,213.5q48,71.5 144,71.5q102,0 164.5,-87.5q62.5,-87.5 62.5,-224.5l0,-580l281,0l0,840q0,69 2,129.5q2,60.5 6,112.5l-268,0q-6,-72 -9,-126q-3,-54 -3,-89l-5,0zM12709.780000000002,437l0,1484l-281,0l0,-1484l281,0zM13511.780000000002,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174zM13960.780000000002,437l0,207l-281,0l0,-207l281,0zM13960.780000000002,839l0,1082l-281,0l0,-1082l281,0z", "white")
    this.defPath("I_a", 0.0018858, 0.0018858, "M3853.1944444444443,1509l-240,412l-208,0l848,-1409l217,0l292,1409l-195,0l-75,-412l-639,0zM4336.194444444444,656q-7,13 -16,30q-9,17 -21,39l-362,635l527,0l-102,-553q-7,-38 -13,-76q-6,-38 -13,-75z", "white")
    this.defPath("I_b", 0.0018858, 0.0018858, "M4753.194444444444,1482q0,213 -156,326q-156,113 -433,113l-595,0l273,-1409l510,0q209,0 329.5,86.5q120.5,86.5 120.5,235.5q0,285 -339,344q138,23 214,104.5q76,81.5 76,199.5zM3917.1944444444443,1111l331,0q178,0 266.5,-64.5q88.5,-64.5 88.5,-193.5q0,-94 -67,-141q-67,-47 -201,-47l-331,0l-87,446zM3789.1944444444443,1768l368,0q210,0 307.5,-73.5q97.5,-73.5 97.5,-215.5q0,-107 -79.5,-163q-79.5,-56 -228.5,-56l-366,0l-99,508z", "white")
    this.defPath("L_B_performance", 0.0018858, 0.0018858, "M1296,958q0,137 -62.5,242.5q-62.5,105.5 -177.5,165q-115,59.5 -274,59.5l-350,0l0,496l-295,0l0,-1409l633,0q253,0 389.5,116.5q136.5,116.5 136.5,329.5zM999,963q0,-222 -262,-222l-305,0l0,457l313,0q122,0 188,-60.5q66,-60.5 66,-174.5zM1741,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM2163,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM2929,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252zM3775,1029l0,892l-280,0l0,-892l-158,0l0,-190l158,0l0,-113q0,-147 78,-218q78,-71 237,-71q82,0 178,16l0,181q-40,-9 -82,-9q-72,0 -101.5,28.5q-29.5,28.5 -29.5,100.5l0,85l213,0l0,190l-213,0zM5155,1379q0,263 -146,412.5q-146,149.5 -404,149.5q-253,0 -397,-150q-144,-150 -144,-412q0,-261 144,-410.5q144,-149.5 403,-149.5q265,0 404.5,144.5q139.5,144.5 139.5,415.5zM4861,1379q0,-193 -63,-280q-63,-87 -183,-87q-128,0 -192,91.5q-64,91.5 -64,275.5q0,181 62.5,275.5q62.5,94.5 180.5,94.5q130,0 194.5,-92.5q64.5,-92.5 64.5,-277.5zM5659,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252zM6456,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q52,-124 129.5,-180q77.5,-56 185.5,-56q124,0 199.5,59q75.5,59 101.5,177l6,0q55,-126 132,-181q77,-55 196,-55q158,0 241,107.5q83,107.5 83,308.5l0,687l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-82,0 -137,79.5q-55,79.5 -55,219.5l0,593l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-85,0 -138.5,87q-53.5,87 -53.5,225zM8246,1941q-157,0 -245,-85.5q-88,-85.5 -88,-240.5q0,-168 109.5,-255q109.5,-87 317.5,-91l233,-4l0,-55q0,-106 -37,-157.5q-37,-51.5 -121,-51.5q-78,0 -114.5,35.5q-36.5,35.5 -45.5,117.5l-293,-14q55,-321 465,-321q205,0 316,101q111,101 111,287l0,394q0,91 20.5,125.5q20.5,34.5 68.5,34.5q32,0 62,-6l0,152q-52,13 -89,19.5q-37,6.5 -91,6.5q-106,0 -156.5,-52q-50.5,-52 -60.5,-153l-6,0q-59,106 -148,159.5q-89,53.5 -208,53.5zM8573,1420l-144,2q-99,5 -139,21q-41,18 -62.5,54q-21.5,36 -21.5,96q0,77 35.5,114.5q35.5,37.5 94.5,37.5q66,0 121,-36q54,-36 85,-99.5q31,-63.5 31,-134.5l0,-55zM9416,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q57,-124 143,-180q86,-56 205,-56q172,0 264,106q92,106 92,310l0,687l-280,0l0,-607q0,-143 -48,-214q-48,-71 -145,-71q-102,0 -164.5,87.5q-62.5,87.5 -62.5,224.5zM10837,1941q-246,0 -380,-146.5q-134,-146.5 -134,-408.5q0,-268 135,-417.5q135,-149.5 383,-149.5q191,0 316,96q125,96 157,265l-283,14q-12,-83 -60,-132.5q-48,-49.5 -136,-49.5q-109,0 -163,90.5q-54,90.5 -54,272.5q0,187 55.5,280.5q55.5,93.5 165.5,93.5q80,0 134,-50.5q54,-50.5 67,-150.5l282,13q-15,114 -80.5,199.5q-65.5,85.5 -169.5,133q-104,47.5 -235,47.5zM11757,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM12179,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0z", "white")
    this.defPath("L_B_programming", 0.0018858, 0.0018858, "M1296,958q0,137 -62.5,242.5q-62.5,105.5 -177.5,165q-115,59.5 -274,59.5l-350,0l0,496l-295,0l0,-1409l633,0q253,0 389.5,116.5q136.5,116.5 136.5,329.5zM999,963q0,-222 -262,-222l-305,0l0,457l313,0q122,0 188,-60.5q66,-60.5 66,-174.5zM1790,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252zM3334,1379q0,263 -146,412.5q-146,149.5 -404,149.5q-253,0 -397,-150q-144,-150 -144,-412q0,-261 144,-410.5q144,-149.5 403,-149.5q265,0 404.5,144.5q139.5,144.5 139.5,415.5zM3040,1379q0,-193 -63,-280q-63,-87 -183,-87q-128,0 -192,91.5q-64,91.5 -64,275.5q0,181 62.5,275.5q62.5,94.5 180.5,94.5q130,0 194.5,-92.5q64.5,-92.5 64.5,-277.5zM4010,2355q-198,0 -318.5,-75.5q-120.5,-75.5 -148.5,-215.5l281,-33q15,65 64.5,102q49.5,37 129.5,37q117,0 171,-72q54,-72 54,-214l2,-164l-2,0q-46,100 -133,149.5q-87,49.5 -215,49.5q-189,0 -293,-142q-104,-142 -104,-406q0,-265 107,-409q107,-144 311,-144q118,0 199.5,48.5q81.5,48.5 127.5,146.5l5,0q0,-24 2,-60q2,-36 5.5,-69q3.5,-33 6.5,-45l266,0q-6,108 -6,250l0,799q0,231 -131,349q-131,118 -381,118zM4245,1365q0,-167 -59.5,-260.5q-59.5,-93.5 -169.5,-93.5q-112,0 -168.5,90q-56.5,90 -56.5,270q0,176 55.5,264.5q55.5,88.5 167.5,88.5q112,0 171.5,-93.5q59.5,-93.5 59.5,-265.5zM5089,1390l0,531l-281,0l0,-828q0,-89 -2.5,-148.5q-2.5,-59.5 -5.5,-105.5l268,0q2,9 4,40q2,31 4,69.5q2,38.5 3.5,72.5q1.5,34 1.5,49l4,0q40,-112 73,-161q32,-47 76,-69q44,-22 110,-22q54,0 87,15l0,235q-67,-15 -120,-15q-105,0 -163.5,85q-58.5,85 -58.5,252zM5855,1941q-157,0 -245,-85.5q-88,-85.5 -88,-240.5q0,-168 109.5,-255q109.5,-87 317.5,-91l233,-4l0,-55q0,-106 -37,-157.5q-37,-51.5 -121,-51.5q-78,0 -114.5,35.5q-36.5,35.5 -45.5,117.5l-293,-14q55,-321 465,-321q205,0 316,101q111,101 111,287l0,394q0,91 20.5,125.5q20.5,34.5 68.5,34.5q32,0 62,-6l0,152q-52,13 -89,19.5q-37,6.5 -91,6.5q-106,0 -156.5,-52q-50.5,-52 -60.5,-153l-6,0q-59,106 -148,159.5q-89,53.5 -208,53.5zM6182,1420l-144,2q-99,5 -139,21q-41,18 -62.5,54q-21.5,36 -21.5,96q0,77 35.5,114.5q35.5,37.5 94.5,37.5q66,0 121,-36q54,-36 85,-99.5q31,-63.5 31,-134.5l0,-55zM7025,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q52,-124 129.5,-180q77.5,-56 185.5,-56q124,0 199.5,59q75.5,59 101.5,177l6,0q55,-126 132,-181q77,-55 196,-55q158,0 241,107.5q83,107.5 83,308.5l0,687l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-82,0 -137,79.5q-55,79.5 -55,219.5l0,593l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-85,0 -138.5,87q-53.5,87 -53.5,225zM8846,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q52,-124 129.5,-180q77.5,-56 185.5,-56q124,0 199.5,59q75.5,59 101.5,177l6,0q55,-126 132,-181q77,-55 196,-55q158,0 241,107.5q83,107.5 83,308.5l0,687l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-82,0 -137,79.5q-55,79.5 -55,219.5l0,593l-279,0l0,-607q0,-143 -41,-214q-41,-71 -123,-71q-85,0 -138.5,87q-53.5,87 -53.5,225zM10667,437l0,207l-281,0l0,-207l281,0zM10667,839l0,1082l-281,0l0,-1082l281,0zM11236,1341l0,580l-281,0l0,-840q0,-87 -2.5,-142.5q-2.5,-55.5 -5.5,-99.5l268,0q2,12 5,56.5q3,44.5 5.5,91q2.5,46.5 2.5,67.5l4,0q57,-124 143,-180q86,-56 205,-56q172,0 264,106q92,106 92,310l0,687l-280,0l0,-607q0,-143 -48,-214q-48,-71 -145,-71q-102,0 -164.5,87.5q-62.5,87.5 -62.5,224.5zM12659,2355q-198,0 -318.5,-75.5q-120.5,-75.5 -148.5,-215.5l281,-33q15,65 64.5,102q49.5,37 129.5,37q117,0 171,-72q54,-72 54,-214l2,-164l-2,0q-46,100 -133,149.5q-87,49.5 -215,49.5q-189,0 -293,-142q-104,-142 -104,-406q0,-265 107,-409q107,-144 311,-144q118,0 199.5,48.5q81.5,48.5 127.5,146.5l5,0q0,-24 2,-60q2,-36 5.5,-69q3.5,-33 6.5,-45l266,0q-6,108 -6,250l0,799q0,231 -131,349q-131,118 -381,118zM12894,1365q0,-167 -59.5,-260.5q-59.5,-93.5 -169.5,-93.5q-112,0 -168.5,90q-56.5,90 -56.5,270q0,176 55.5,264.5q55.5,88.5 167.5,88.5q112,0 171.5,-93.5q59.5,-93.5 59.5,-265.5z", "white")
    this.defPath("L_I_cartridge", 0.0018858, 0.0018858, "M1215,1495l143,89q-126,188 -286,272.5q-160,84.5 -372,84.5q-181,0 -314,-73q-133,-72 -203,-206q-70,-134 -70,-310q0,-246 105,-445q105,-199 291.5,-307.5q186.5,-108.5 416.5,-108.5q217,0 366.5,90.5q149.5,90.5 197.5,254.5l-180,55q-36,-112 -139.5,-178q-103.5,-66 -254.5,-66q-185,0 -324,88q-140,88 -215,249q-75,161 -75,371q0,200 109,315.5q109,115.5 302,115.5q148,0 276,-73.5q128,-73.5 226,-217.5zM2406,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM1716,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM3336,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM3575,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM4587,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM5052,437l-34,172l-180,0l34,-172l180,0zM4974,839l-211,1082l-179,0l210,-1082l180,0zM5407,1942q-157,0 -244.5,-94.5q-87.5,-94.5 -87.5,-259.5q0,-202 62,-394q62,-191 173,-282.5q111,-91.5 284,-91.5q123,0 200.5,52q77.5,52 109.5,146l5,0q7,-41 14,-81.5q7,-40.5 14,-80.5l82,-419l180,0l-245,1261q-14,70 -23.5,126q-9.5,56 -14.5,97l-172,0q0,-51 21,-160l-5,0q-73,95 -154,138q-81,43 -199,43zM5459,1803q192,0 289,-163q33,-54 56.5,-128.5q23.5,-74.5 36,-152.5q12.5,-78 12.5,-142q0,-125 -63.5,-194.5q-63.5,-69.5 -176.5,-69.5q-122,0 -193,72q-47,48 -82.5,141q-35.5,93 -55,198.5q-19.5,105.5 -19.5,191.5q0,123 47,185q47,62 149,62zM6542,2346q-169,0 -267.5,-63q-98.5,-63 -125.5,-189l163,-42q34,157 234,157q142,0 220,-73.5q78,-73.5 110,-241.5q8,-44 17,-87.5q9,-43.5 17,-86.5l-2,0q-61,88 -109,128q-48,39 -107.5,60q-59.5,21 -136.5,21q-153,0 -246.5,-100.5q-93.5,-100.5 -93.5,-266.5q0,-89 17,-189q17,-100 48.5,-193q31.5,-93 74.5,-161q65,-102 158,-150.5q93,-48.5 220,-48.5q121,0 204.5,57q83.5,57 107.5,147l2,0q5,-25 15,-66.5q10,-41.5 20,-77q10,-35.5 13,-41.5l171,0l-19,82l-30,142l-161,827q-48,242 -172,349q-124,107 -342,107zM6404,1548q0,248 207,248q108,0 196,-79q88,-78 136.5,-215q48.5,-137 48.5,-285q0,-125 -64,-194.5q-64,-69.5 -176,-69.5q-90,0 -150,37q-60,37 -101,116q-27,52 -49,130.5q-22,78.5 -35,161.5q-13,83 -13,150zM7540,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM7564,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_power", 0.0017227, 0.0018858, "M852,512q231,0 366,104q135,104 135,285q0,146 -69,252q-69,106 -196.5,162.5q-127.5,56.5 -303.5,56.5l-424,0l-106,549l-191,0l273,-1409l516,0zM390,1221l387,0q191,0 286.5,-78q95.5,-78 95.5,-233q0,-119 -79,-182q-79,-63 -233,-63l-349,0l-108,556zM2440,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM2254,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3267,1118l-360,803l-208,0l-92,-1082l178,0l40,735q2,49 4,98.5q2,49.5 3,99.5q20,-47 40.5,-95q20.5,-48 40.5,-95l341,-743l193,0l44,743q3,54 4.5,101.5q1.5,47.5 1.5,88.5q7,-15 26.5,-60q19.5,-45 52.5,-118l342,-755l176,0l-521,1082l-209,0l-37,-698l-6,-236q-15,37 -28.5,70q-13.5,33 -25.5,61zM4240,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM4264,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM5841,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150z", "white")
    this.defPath("L_I_line", 0.0018858, 0.0018858, "M996,1765l-30,156l-903,0l273,-1409l191,0l-243,1253l712,0zM1640,437l-34,172l-180,0l34,-172l180,0zM1562,839l-211,1082l-179,0l210,-1082l180,0zM1926,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM2989,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3013,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("L_I_fuse", 0.0018858, 0.0018858, "M364,1350l-110,571l-191,0l273,-1409l1011,0l-30,156l-820,0l-102,524l796,0l-31,158l-796,0zM1999,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0zM3297,1604q0,162 -124,249.5q-124,87.5 -358,87.5q-174,0 -276.5,-58.5q-102.5,-58.5 -143.5,-184.5l147,-56q33,88 102.5,128q69.5,40 186.5,40q291,0 291,-190q0,-62 -51,-104q-52,-41 -216,-92q-129,-43 -192,-82q-64,-40 -98,-93.5q-34,-53.5 -34,-124.5q0,-145 116,-223.5q116,-78.5 327,-78.5q177,0 276.5,63.5q99.5,63.5 121.5,191.5l-163,25q-22,-79 -83,-114q-61,-35 -164,-35q-124,0 -190.5,39.5q-66.5,39.5 -66.5,111.5q0,42 21,70.5q21,28.5 61,51.5q40,23 182,68q128,40 192,81q65,41 100.5,97q35.5,56 35.5,132zM3670,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM3694,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5z", "white")
    this.defPath("I_midi", 0.0018858, 0.0018858, "M21338.583333333332,880l-200,1041l-170,0l273,-1409l236,0l189,977q4,19 12,70.5q8,51.5 20,134.5q26,-53 52,-106.5q26,-53.5 52,-106.5l553,-969l256,0l-273,1409l-172,0l180,-928q18,-92 34.5,-167q16.5,-75 30.5,-133q-30,63 -56.5,115q-26.5,52 -48.5,93q-22,41 -40,72l-548,948l-124,0l-185,-948q-3,-14 -13.5,-84.5q-10.5,-70.5 -27.5,-195.5q-4,30 -11.5,76.5q-7.5,46.5 -18.5,110.5zM23157.583333333332,512l-274,1409l-191,0l274,-1409l191,0zM23924.583333333332,512q208,0 358,74.5q150,74.5 230.5,212.5q80.5,138 80.5,331q0,237 -103,413q-103,177 -296.5,277.5q-193.5,100.5 -438.5,100.5l-512,0l273,-1409l408,0zM23463.583333333332,1768l284,0q196,0 344,-78q149,-77 228.5,-222.5q79.5,-145.5 79.5,-339.5q0,-219 -126,-341q-126,-122 -353,-122l-242,0l-215,1103zM25205.583333333332,512l-274,1409l-191,0l274,-1409l191,0z", "white")
    this.defPath("L_I_thru", 0.0018858, 0.0018858, "M858,668l-244,1253l-190,0l244,-1253l-484,0l30,-156l1158,0l-30,156l-484,0zM1634,1024q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5l-118,606l-179,0l288,-1484l180,0l-75,386q-9,50 -21,100.5q-12,50.5 -26,100.5l3,0zM3108,983q-42,-13 -90,-13q-70,0 -132,50.5q-62,50.5 -107,137.5q-45,87 -65,199l-110,564l-180,0l162,-830q6,-35 12.5,-69.5q6.5,-34.5 12.5,-68.5q5,-29 9.5,-57.5q4.5,-28.5 8.5,-56.5l170,0l-27,169l-8,52l4,0q66,-133 130,-187q64,-54 148,-54q44,0 95,14l-33,150zM3820,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0z", "white")
    this.defPath("L_I_out", 0.0018858, 0.0018858, "M938,491q185,0 319,71q134,71 206.5,201q72.5,130 72.5,307q-4,266 -112,463q-107,196 -293,302q-186,106 -422,106q-201,0 -340,-81q-125,-71 -191.5,-202q-66.5,-131 -66.5,-310q0,-240 106,-440q105,-200 294,-308.5q189,-108.5 427,-108.5zM929,645q-199,0 -339,89q-93,59 -157,160q-64,101 -97.5,222q-33.5,121 -33.5,242q0,209 106.5,318.5q106.5,109.5 309.5,109.5q197,0 336,-87q92,-58 157,-155.5q65,-97.5 99.5,-219.5q34.5,-122 34.5,-250q0,-207 -108.5,-318q-108.5,-111 -307.5,-111zM2341,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0zM3007,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24z", "white")
    this.defPath("L_I_in", 0.0018858, 0.0018858, "M546,512l-274,1409l-191,0l274,-1409l191,0zM901,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5z", "white")
    this.defPath("L_I_ft_sw_", 0.0018858, 0.0018858, "M364,1350l-110,571l-191,0l273,-1409l1011,0l-30,156l-820,0l-102,524l796,0l-31,158l-796,0zM1526,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24zM2138,1702l-43,219l-195,0l43,-219l195,0zM3574,1941q-249,0 -386.5,-88.5q-137.5,-88.5 -171.5,-269.5l177,-37q27,129 120,187q93,58 275,58q219,0 320,-65.5q101,-65.5 101,-200.5q0,-67 -29,-107.5q-29,-40.5 -99,-73.5q-35,-16 -95,-36q-60,-20 -146,-44q-168,-46 -255,-97q-85,-50 -128.5,-119.5q-43.5,-69.5 -43.5,-167.5q0,-122 69.5,-209q69.5,-87 197.5,-133.5q128,-46.5 302,-46.5q220,0 353,76q133,76 167,222l-173,51q-33,-105 -118.5,-155q-85.5,-50 -229.5,-50q-188,0 -282,59q-94,59 -94,177q0,60 26,97.5q26,37.5 84,66.5q29,14 87,33.5q58,19.5 145,42.5q98,27 168,53q70,26 113,51q86,50 131,121.5q45,71.5 45,176.5q0,206 -155,317q-155,111 -475,111zM5086,1118l-360,803l-208,0l-92,-1082l178,0l40,735q2,49 4,98.5q2,49.5 3,99.5q20,-47 40.5,-95q20.5,-48 40.5,-95l341,-743l193,0l44,743q3,54 4.5,101.5q1.5,47.5 1.5,88.5q7,-15 26.5,-60q19.5,-45 52.5,-118l342,-755l176,0l-521,1082l-209,0l-37,-698l-6,-236q-15,37 -28.5,70q-13.5,33 -25.5,61zM6008,1702l-43,219l-195,0l43,-219l195,0z", "white")
    this.defPath("L_I_pedal_cv", 0.0018858, 0.0018858, "M852,512q231,0 366,104q135,104 135,285q0,146 -69,252q-69,106 -196.5,162.5q-127.5,56.5 -303.5,56.5l-424,0l-106,549l-191,0l273,-1409l516,0zM390,1221l387,0q191,0 286.5,-78q95.5,-78 95.5,-233q0,-119 -79,-182q-79,-63 -233,-63l-349,0l-108,556zM1622,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM1646,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM2906,1942q-157,0 -244.5,-94.5q-87.5,-94.5 -87.5,-259.5q0,-202 62,-394q62,-191 173,-282.5q111,-91.5 284,-91.5q123,0 200.5,52q77.5,52 109.5,146l5,0q7,-41 14,-81.5q7,-40.5 14,-80.5l82,-419l180,0l-245,1261q-14,70 -23.5,126q-9.5,56 -14.5,97l-172,0q0,-51 21,-160l-5,0q-73,95 -154,138q-81,43 -199,43zM2958,1803q192,0 289,-163q33,-54 56.5,-128.5q23.5,-74.5 36,-152.5q12.5,-78 12.5,-142q0,-125 -63.5,-194.5q-63.5,-69.5 -176.5,-69.5q-122,0 -193,72q-47,48 -82.5,141q-35.5,93 -55,198.5q-19.5,105.5 -19.5,191.5q0,123 47,185q47,62 149,62zM4571,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM3881,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM5284,437l-289,1484l-179,0l288,-1484l180,0zM5890,1239q0,78 -38.5,141.5q-38.5,63.5 -102.5,101.5q-64,38 -140,38q-74,0 -136.5,-38q-62.5,-38 -100,-101.5q-37.5,-63.5 -37.5,-141.5q0,-77 37.5,-139q37.5,-62 100,-98.5q62.5,-36.5 136.5,-36.5q77,0 140.5,36.5q63.5,36.5 102,98.5q38.5,62 38.5,139zM7170,1495l143,89q-126,188 -286,272.5q-160,84.5 -372,84.5q-181,0 -314,-73q-133,-72 -203,-206q-70,-134 -70,-310q0,-246 105,-445q105,-199 291.5,-307.5q186.5,-108.5 416.5,-108.5q217,0 366.5,90.5q149.5,90.5 197.5,254.5l-180,55q-36,-112 -139.5,-178q-103.5,-66 -254.5,-66q-185,0 -324,88q-140,88 -215,249q-75,161 -75,371q0,200 109,315.5q109,115.5 302,115.5q148,0 276,-73.5q128,-73.5 226,-217.5zM8959,512l-848,1409l-198,0l-302,-1409l194,0l198,992q9,62 17.5,124.5q8.5,62.5 17.5,124.5q33,-62 66.5,-124.5q33.5,-62.5 66.5,-124.5l580,-992l208,0z", "white")
    this.defPath("L_I_left", 0.0018858, 0.0018858, "M996,1765l-30,156l-903,0l273,-1409l191,0l-243,1253l712,0zM1395,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM1419,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM2712,970l-185,951l-180,0l185,-951l-152,0l26,-131l152,0l23,-122q22,-110 61,-168q38,-56 99.5,-84q61.5,-28 158.5,-28q75,0 124,12l-26,137q-11,-2 -22.5,-3.5q-11.5,-1.5 -22.5,-2.5q-11,-1 -23,-1.5q-12,-0.5 -23,-0.5q-64,0 -97,32.5q-33,32.5 -53,131.5l-19,97l211,0l-26,131l-211,0zM3122,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24z", "white")
    this.defPath("L_I_right", 0.0018858, 0.0018858, "M367,1336l-113,585l-191,0l273,-1409l612,0q153,0 264,54q97,46 150.5,127.5q53.5,81.5 53.5,188.5q0,188 -108,298q-108,110 -319,139l268,602l-206,0l-243,-585l-441,0zM857,1185q181,0 273,-75.5q92,-75.5 92,-212.5q0,-112 -74.5,-172q-74.5,-60 -222.5,-60l-427,0l-101,520l460,0zM1980,437l-34,172l-180,0l34,-172l180,0zM1902,839l-211,1082l-179,0l210,-1082l180,0zM2331,2346q-169,0 -267.5,-63q-98.5,-63 -125.5,-189l163,-42q34,157 234,157q142,0 220,-73.5q78,-73.5 110,-241.5q8,-44 17,-87.5q9,-43.5 17,-86.5l-2,0q-61,88 -109,128q-48,39 -107.5,60q-59.5,21 -136.5,21q-153,0 -246.5,-100.5q-93.5,-100.5 -93.5,-266.5q0,-89 17,-189q17,-100 48.5,-193q31.5,-93 74.5,-161q65,-102 158,-150.5q93,-48.5 220,-48.5q121,0 204.5,57q83.5,57 107.5,147l2,0q5,-25 15,-66.5q10,-41.5 20,-77q10,-35.5 13,-41.5l171,0l-19,82l-30,142l-161,827q-48,242 -172,349q-124,107 -342,107zM2193,1548q0,248 207,248q108,0 196,-79q88,-78 136.5,-215q48.5,-137 48.5,-285q0,-125 -64,-194.5q-64,-69.5 -176,-69.5q-90,0 -150,37q-60,37 -101,116q-27,52 -49,130.5q-22,78.5 -35,161.5q-13,83 -13,150zM3456,1024q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5l-118,606l-179,0l288,-1484l180,0l-75,386q-9,50 -21,100.5q-12,50.5 -26,100.5l3,0zM4487,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24z", "white")
    this.defPath("I_mono", 0.0018858, 0.0018858, "M7946.777777777777,880l-200,1041l-170,0l273,-1409l236,0l189,977q4,19 12,70.5q8,51.5 20,134.5q26,-53 52,-106.5q26,-53.5 52,-106.5l553,-969l256,0l-273,1409l-172,0l180,-928q18,-92 34.5,-167q16.5,-75 30.5,-133q-30,63 -56.5,115q-26.5,52 -48.5,93q-22,41 -40,72l-548,948l-124,0l-185,-948q-3,-14 -13.5,-84.5q-10.5,-70.5 -27.5,-195.5q-4,30 -11.5,76.5q-7.5,46.5 -18.5,110.5zM10293.777777777777,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM10107.777777777777,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM10690.777777777777,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM12571.777777777777,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM12385.777777777777,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5z", "white")
    this.defPath("I_aux_out", 0.0018858, 0.0018858, "M6438.2777777777765,1509l-240,412l-208,0l848,-1409l217,0l292,1409l-195,0l-75,-412l-639,0zM6921.2777777777765,656q-7,13 -16,30q-9,17 -21,39l-362,635l527,0l-102,-553q-7,-38 -13,-76q-6,-38 -13,-75zM8205.277777777777,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0zM9093.277777777777,1477l-380,444l-199,0l492,-556l-264,-526l189,0l193,421l350,-421l206,0l-469,524l281,558l-190,0l-209,-444zM9938.277777777777,1702l-43,219l-195,0l43,-219l195,0zM11696.277777777777,491q185,0 319,71q134,71 206.5,201q72.5,130 72.5,307q-4,266 -112,463q-107,196 -293,302q-186,106 -422,106q-201,0 -340,-81q-125,-71 -191.5,-202q-66.5,-131 -66.5,-310q0,-240 106,-440q105,-200 294,-308.5q189,-108.5 427,-108.5zM11687.277777777777,645q-199,0 -339,89q-93,59 -157,160q-64,101 -97.5,222q-33.5,121 -33.5,242q0,209 106.5,318.5q106.5,109.5 309.5,109.5q197,0 336,-87q92,-58 157,-155.5q65,-97.5 99.5,-219.5q34.5,-122 34.5,-250q0,-207 -108.5,-318q-108.5,-111 -307.5,-111zM13099.277777777777,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0zM13765.277777777777,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24z", "white")
    this.defPath("I_main_out", 0.0018858, 0.0018858, "M6353.7777777777765,880l-200,1041l-170,0l273,-1409l236,0l189,977q4,19 12,70.5q8,51.5 20,134.5q26,-53 52,-106.5q26,-53.5 52,-106.5l553,-969l256,0l-273,1409l-172,0l180,-928q18,-92 34.5,-167q16.5,-75 30.5,-133q-30,63 -56.5,115q-26.5,52 -48.5,93q-22,41 -40,72l-548,948l-124,0l-185,-948q-3,-14 -13.5,-84.5q-10.5,-70.5 -27.5,-195.5q-4,30 -11.5,76.5q-7.5,46.5 -18.5,110.5zM8553.777777777777,1931q-93,0 -135.5,-38.5q-42.5,-38.5 -42.5,-114.5q0,-16 2,-32q2,-16 3,-32l-6,0q-83,126 -172,176.5q-89,50.5 -215,50.5q-140,0 -227.5,-84q-87.5,-84 -87.5,-214q0,-185 132.5,-280q132.5,-95 422.5,-99l232,-3q19,-95 19,-127q0,-91 -53,-134.5q-53,-43.5 -147,-43.5q-119,0 -180,42.5q-61,42.5 -88,129.5l-178,-29q45,-147 156.5,-213.5q111.5,-66.5 299.5,-66.5q171,0 270.5,80q99.5,80 99.5,215q0,66 -19,157l-74,378q-11,50 -11,88q0,37 20.5,55q20.5,18 60.5,18q29,0 60,-7l-14,112q-33,8 -65,12q-32,4 -63,4zM7863.7777777777765,1635q0,75 48.5,122q48.5,47 125.5,47q97,0 175,-42q78,-41 129,-108q51,-67 67,-144l27,-125l-199,4q-119,3 -186.5,21q-67.5,18 -105.5,47q-37,28 -59,72q-22,44 -22,106zM9266.777777777777,437l-34,172l-180,0l34,-172l180,0zM9188.777777777777,839l-211,1082l-179,0l210,-1082l180,0zM9552.777777777777,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM11866.777777777777,491q185,0 319,71q134,71 206.5,201q72.5,130 72.5,307q-4,266 -112,463q-107,196 -293,302q-186,106 -422,106q-201,0 -340,-81q-125,-71 -191.5,-202q-66.5,-131 -66.5,-310q0,-240 106,-440q105,-200 294,-308.5q189,-108.5 427,-108.5zM11857.777777777777,645q-199,0 -339,89q-93,59 -157,160q-64,101 -97.5,222q-33.5,121 -33.5,242q0,209 106.5,318.5q106.5,109.5 309.5,109.5q197,0 336,-87q92,-58 157,-155.5q65,-97.5 99.5,-219.5q34.5,-122 34.5,-250q0,-207 -108.5,-318q-108.5,-111 -307.5,-111zM13269.777777777777,1736q-83,115 -166.5,159.5q-83.5,44.5 -198.5,44.5q-148,0 -222.5,-73q-74.5,-73 -74.5,-211q0,-22 2.5,-47q2.5,-25 7,-54.5q4.5,-29.5 11.5,-62.5l127,-653l181,0l-126,645q-18,88 -18,150q0,167 179,167q84,0 155.5,-43.5q71.5,-43.5 122.5,-123.5q51,-80 72,-189l118,-606l180,0l-166,851q-10,47 -19.5,105q-9.5,58 -19.5,126l-170,0q0,-8 5,-42q5,-34 12,-75q7,-41 11,-68l-3,0zM13935.777777777777,1941q-85,0 -133.5,-51q-48.5,-51 -48.5,-135q0,-55 15,-130l126,-655l-125,0l26,-131l127,0l105,-242l120,0l-47,242l200,0l-26,131l-200,0l-125,645q-12,60 -12,95q0,44 22.5,66q22.5,22 67.5,22q39,0 100,-14l-19,133q-99,24 -173,24z", "white")
    this.defPath("L_I_phones", 0.0018858, 0.0018858, "M852,512q231,0 366,104q135,104 135,285q0,146 -69,252q-69,106 -196.5,162.5q-127.5,56.5 -303.5,56.5l-424,0l-106,549l-191,0l273,-1409l516,0zM390,1221l387,0q191,0 286.5,-78q95.5,-78 95.5,-233q0,-119 -79,-182q-79,-63 -233,-63l-349,0l-108,556zM1749,1024q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5l-118,606l-179,0l288,-1484l180,0l-75,386q-9,50 -21,100.5q-12,50.5 -26,100.5l3,0zM3579,1238q0,130 -40,270q-40,140 -114,238q-75,97 -183,146q-108,49 -246,49q-196,0 -310,-118q-114,-118 -114,-321q5,-207 74,-362q70,-158 194,-239q124,-81 307,-81q210,0 321,109.5q111,109.5 111,308.5zM3393,1238q0,-286 -248,-286q-135,0 -216,69q-54,46 -92.5,126.5q-38.5,80.5 -59,175q-20.5,94.5 -20.5,182.5q0,148 64,225.5q64,77.5 186,77.5q103,0 165.5,-35q62.5,-35 109.5,-108q47,-74 76.5,-187.5q29.5,-113.5 34.5,-239.5zM3976,1315l-118,606l-180,0l166,-851q10,-47 19.5,-105q9.5,-58 19.5,-126l170,0q0,7 -5,41.5q-5,34.5 -11.5,75q-6.5,40.5 -11.5,68.5l3,0q83,-115 166.5,-159.5q83.5,-44.5 198.5,-44.5q148,0 222.5,73q74.5,73 74.5,211q0,32 -5,73q-5,41 -16,91l-127,653l-181,0l126,-645q18,-89 18,-150q0,-167 -179,-167q-84,0 -155.5,43.5q-71.5,43.5 -122,123q-50.5,79.5 -72.5,189.5zM5039,1418q-6,34 -9,113q0,133 66.5,204q66.5,71 200.5,71q97,0 176,-48q79,-48 123,-131l138,63q-73,131 -185.5,191q-112.5,60 -272.5,60q-201,0 -312.5,-111.5q-111.5,-111.5 -111.5,-313.5q0,-199 71,-361q71,-159 200,-247.5q129,-88.5 290,-88.5q205,0 319,103q114,103 114,291q0,104 -24,205l-783,0zM5063,1280l600,0l4,-72q0,-124 -64.5,-190q-64.5,-66 -185.5,-66q-134,0 -225.5,85.5q-91.5,85.5 -128.5,242.5zM6829,1604q0,162 -124,249.5q-124,87.5 -358,87.5q-174,0 -276.5,-58.5q-102.5,-58.5 -143.5,-184.5l147,-56q33,88 102.5,128q69.5,40 186.5,40q291,0 291,-190q0,-62 -51,-104q-52,-41 -216,-92q-129,-43 -192,-82q-64,-40 -98,-93.5q-34,-53.5 -34,-124.5q0,-145 116,-223.5q116,-78.5 327,-78.5q177,0 276.5,63.5q99.5,63.5 121.5,191.5l-163,25q-22,-79 -83,-114q-61,-35 -164,-35q-124,0 -190.5,39.5q-66.5,39.5 -66.5,111.5q0,42 21,70.5q21,28.5 61,51.5q40,23 182,68q128,40 192,81q65,41 100.5,97q35.5,56 35.5,132z", "white")
    this.defPath("S_music_production_synthesizer", 0.0024552, 0.0018858, "M338,981l0,940l-170,0l0,-1409l251,0l375,977q20,59 38.5,126.5q18.5,67.5 24.5,97.5q6,-27 20,-74.5q14,-47.5 28,-91.5q14,-44 20,-58l368,-977l245,0l0,1409l-172,0l0,-940q0,-78 2.5,-153q2.5,-75 6.5,-147q-25,89 -46.5,159.5q-21.5,70.5 -41.5,120.5l-364,960l-134,0l-369,-960l-89,-280q2,75 4.5,150q2.5,75 2.5,150zM2437,1941q-173,0 -302,-64q-129,-64 -200,-183q-71,-119 -71,-285l0,-897l191,0l0,881q0,193 98,293q98,100 283,100q190,0 295.5,-103.5q105.5,-103.5 105.5,-302.5l0,-868l190,0l0,879q0,171 -72.5,294q-72.5,123 -205,189.5q-132.5,66.5 -312.5,66.5zM4457,1532q0,195 -152.5,302q-152.5,107 -429.5,107q-515,0 -597,-358l185,-37q32,127 136,186.5q104,59.5 283,59.5q185,0 285.5,-63.5q100.5,-63.5 100.5,-186.5q0,-69 -31.5,-112q-31.5,-43 -88.5,-71q-57,-28 -136,-47q-79,-19 -175,-41q-111,-25 -185.5,-49q-74.5,-24 -122.5,-50.5q-48,-26.5 -82,-56.5q-50,-46 -76.5,-107q-26.5,-61 -26.5,-140q0,-181 138.5,-279q138.5,-98 396.5,-98q240,0 367,73.5q127,73.5 178,250.5l-188,33q-31,-112 -118,-162.5q-87,-50.5 -241,-50.5q-169,0 -258,56q-89,56 -89,167q0,65 34.5,107.5q34.5,42.5 99.5,71.5q61,29 259,73q81,19 160,39.5q79,20.5 149,51.5q41,17 78.5,41.5q37.5,24.5 65.5,56.5q38,42 59.5,99q21.5,57 21.5,134zM4931,512l0,1409l-191,0l0,-1409l191,0zM5920,1784q296,0 445,-293l156,78q-87,182 -244.5,277q-157.5,95 -365.5,95q-214,0 -368,-89q-154,-89 -236.5,-253.5q-82.5,-164.5 -82.5,-388.5q0,-225 82,-386q82,-161 236,-247q154,-86 368,-86q225,0 376,88q151,88 222,261l-181,60q-49,-123 -157.5,-188q-108.5,-65 -257.5,-65q-234,0 -364,150.5q-130,150.5 -130,412.5q0,172 61.5,301.5q61.5,129.5 174,201q112.5,71.5 266.5,71.5zM8426,936q0,133 -59,231q-59,98 -167.5,151.5q-108.5,53.5 -258.5,53.5l-414,0l0,549l-191,0l0,-1409l593,0q237,0 367,111q130,111 130,313zM8234,938q0,-273 -328,-273l-379,0l0,556l387,0q160,0 240,-70.5q80,-70.5 80,-212.5zM8893,1336l0,585l-191,0l0,-1409l663,0q238,0 367.5,106.5q129.5,106.5 129.5,296.5q0,157 -91.5,264q-91.5,107 -252.5,135l400,607l-220,0l-366,-585l-439,0zM9670,917q0,-123 -83.5,-187.5q-83.5,-64.5 -240.5,-64.5l-453,0l0,520l461,0q151,0 233.5,-70.5q82.5,-70.5 82.5,-197.5zM11508,1210q0,226 -85.5,390q-85.5,164 -242.5,252.5q-157,88.5 -372,88.5q-216,0 -372.5,-88q-156.5,-88 -241,-252q-84.5,-164 -84.5,-391q0,-226 83.5,-386.5q83.5,-160.5 240,-246.5q156.5,-86 376.5,-86q216,0 372.5,85q156.5,85 241,245.5q84.5,160.5 84.5,388.5zM11313,1210q0,-263 -131.5,-413q-131.5,-150 -371.5,-150q-242,0 -374,148q-132,148 -132,415q0,176 60,305.5q60,129.5 173,200q113,70.5 271,70.5q244,0 374.5,-150.5q130.5,-150.5 130.5,-425.5zM12987,1202q0,223 -86.5,384q-86.5,161 -241,248q-154.5,87 -358.5,87l-527,0l0,-1409l466,0q358,0 552.5,179.5q194.5,179.5 194.5,510.5zM12795,1202q0,-262 -143.5,-399.5q-143.5,-137.5 -415.5,-137.5l-271,0l0,1103l314,0q157,0 272.5,-69q115.5,-69 179.5,-196q64,-127 64,-301zM13816,1941q-173,0 -302,-64q-129,-64 -200,-183q-71,-119 -71,-285l0,-897l191,0l0,881q0,193 98,293q98,100 283,100q190,0 295.5,-103.5q105.5,-103.5 105.5,-302.5l0,-868l190,0l0,879q0,171 -72.5,294q-72.5,123 -205,189.5q-132.5,66.5 -312.5,66.5zM15364,1784q296,0 445,-293l156,78q-87,182 -244.5,277q-157.5,95 -365.5,95q-214,0 -368,-89q-154,-89 -236.5,-253.5q-82.5,-164.5 -82.5,-388.5q0,-225 82,-386q82,-161 236,-247q154,-86 368,-86q225,0 376,88q151,88 222,261l-181,60q-49,-123 -157.5,-188q-108.5,-65 -257.5,-65q-234,0 -364,150.5q-130,150.5 -130,412.5q0,172 61.5,301.5q61.5,129.5 174,201q112.5,71.5 266.5,71.5zM16763,668l0,1253l-190,0l0,-1253l-484,0l0,-156l1158,0l0,156l-484,0zM17674,512l0,1409l-191,0l0,-1409l191,0zM19358,1210q0,226 -85.5,390q-85.5,164 -242.5,252.5q-157,88.5 -372,88.5q-216,0 -372.5,-88q-156.5,-88 -241,-252q-84.5,-164 -84.5,-391q0,-226 83.5,-386.5q83.5,-160.5 240,-246.5q156.5,-86 376.5,-86q216,0 372.5,85q156.5,85 241,245.5q84.5,160.5 84.5,388.5zM19163,1210q0,-263 -131.5,-413q-131.5,-150 -371.5,-150q-242,0 -374,148q-132,148 -132,415q0,176 60,305.5q60,129.5 173,200q113,70.5 271,70.5q244,0 374.5,-150.5q130.5,-150.5 130.5,-425.5zM19794,985l0,936l-170,0l0,-1409l222,0l762,1208q-12,-197 -12,-284l0,-924l172,0l0,1409l-230,0l-754,-1200q2,66 6,132q4,66 4,132zM22776,1532q0,195 -152.5,302q-152.5,107 -429.5,107q-515,0 -597,-358l185,-37q32,127 136,186.5q104,59.5 283,59.5q185,0 285.5,-63.5q100.5,-63.5 100.5,-186.5q0,-69 -31.5,-112q-31.5,-43 -88.5,-71q-57,-28 -136,-47q-79,-19 -175,-41q-111,-25 -185.5,-49q-74.5,-24 -122.5,-50.5q-48,-26.5 -82,-56.5q-50,-46 -76.5,-107q-26.5,-61 -26.5,-140q0,-181 138.5,-279q138.5,-98 396.5,-98q240,0 367,73.5q127,73.5 178,250.5l-188,33q-31,-112 -118,-162.5q-87,-50.5 -241,-50.5q-169,0 -258,56q-89,56 -89,167q0,65 34.5,107.5q34.5,42.5 99.5,71.5q61,29 259,73q81,19 160,39.5q79,20.5 149,51.5q41,17 78.5,41.5q37.5,24.5 65.5,56.5q38,42 59.5,99q21.5,57 21.5,134zM23647,1337l0,584l-190,0l0,-584l-542,-825l210,0l429,671l427,-671l210,0l-544,825zM24574,985l0,936l-170,0l0,-1409l222,0l762,1208q-12,-197 -12,-284l0,-924l172,0l0,1409l-230,0l-754,-1200q2,66 6,132q4,66 4,132zM26435,668l0,1253l-190,0l0,-1253l-484,0l0,-156l1158,0l0,156l-484,0zM27325,1268l0,653l-191,0l0,-1409l191,0l0,596l762,0l0,-596l191,0l0,1409l-191,0l0,-653l-762,0zM29723,1765l0,156l-1110,0l0,-1409l1069,0l0,156l-878,0l0,452l818,0l0,154l-818,0l0,491l919,0zM31083,1532q0,195 -152.5,302q-152.5,107 -429.5,107q-515,0 -597,-358l185,-37q32,127 136,186.5q104,59.5 283,59.5q185,0 285.5,-63.5q100.5,-63.5 100.5,-186.5q0,-69 -31.5,-112q-31.5,-43 -88.5,-71q-57,-28 -136,-47q-79,-19 -175,-41q-111,-25 -185.5,-49q-74.5,-24 -122.5,-50.5q-48,-26.5 -82,-56.5q-50,-46 -76.5,-107q-26.5,-61 -26.5,-140q0,-181 138.5,-279q138.5,-98 396.5,-98q240,0 367,73.5q127,73.5 178,250.5l-188,33q-31,-112 -118,-162.5q-87,-50.5 -241,-50.5q-169,0 -258,56q-89,56 -89,167q0,65 34.5,107.5q34.5,42.5 99.5,71.5q61,29 259,73q81,19 160,39.5q79,20.5 149,51.5q41,17 78.5,41.5q37.5,24.5 65.5,56.5q38,42 59.5,99q21.5,57 21.5,134zM31557,512l0,1409l-191,0l0,-1409l191,0zM32933,1765l0,156l-1122,0l0,-143l858,-1110l-785,0l0,-156l1002,0l0,139l-858,1114l905,0zM34275,1765l0,156l-1110,0l0,-1409l1069,0l0,156l-878,0l0,452l818,0l0,154l-818,0l0,491l919,0zM34722,1336l0,585l-191,0l0,-1409l663,0q238,0 367.5,106.5q129.5,106.5 129.5,296.5q0,157 -91.5,264q-91.5,107 -252.5,135l400,607l-220,0l-366,-585l-439,0zM35499,917q0,-123 -83.5,-187.5q-83.5,-64.5 -240.5,-64.5l-453,0l0,520l461,0q151,0 233.5,-70.5q82.5,-70.5 82.5,-197.5z", "white")
    this.defPath("S_dynamic_component_synthesizer", 0.002304, 0.0018858, "M1381,1202q0,223 -86.5,384q-86.5,161 -241,248q-154.5,87 -358.5,87l-527,0l0,-1409l466,0q358,0 552.5,179.5q194.5,179.5 194.5,510.5zM1189,1202q0,-262 -143.5,-399.5q-143.5,-137.5 -415.5,-137.5l-271,0l0,1103l314,0q157,0 272.5,-69q115.5,-69 179.5,-196q64,-127 64,-301zM2256,1337l0,584l-190,0l0,-584l-542,-825l210,0l429,671l427,-671l210,0l-544,825zM3183,985l0,936l-170,0l0,-1409l222,0l762,1208q-12,-197 -12,-284l0,-924l172,0l0,1409l-230,0l-754,-1200q2,66 6,132q4,66 4,132zM4688,1509l-162,412l-198,0l575,-1409l217,0l566,1409l-195,0l-161,-412l-642,0zM5009,656q-17,56 -40.5,124.5q-23.5,68.5 -43.5,120.5l-179,459l527,0l-181,-465q-14,-35 -37,-99q-23,-64 -46,-140zM6028,981l0,940l-170,0l0,-1409l251,0l375,977q20,59 38.5,126.5q18.5,67.5 24.5,97.5q6,-27 20,-74.5q14,-47.5 28,-91.5q14,-44 20,-58l368,-977l245,0l0,1409l-172,0l0,-940q0,-78 2.5,-153q2.5,-75 6.5,-147q-25,89 -46.5,159.5q-21.5,70.5 -41.5,120.5l-364,960l-134,0l-369,-960l-89,-280q2,75 4.5,150q2.5,75 2.5,150zM7776,512l0,1409l-191,0l0,-1409l191,0zM8765,1784q296,0 445,-293l156,78q-87,182 -244.5,277q-157.5,95 -365.5,95q-214,0 -368,-89q-154,-89 -236.5,-253.5q-82.5,-164.5 -82.5,-388.5q0,-225 82,-386q82,-161 236,-247q154,-86 368,-86q225,0 376,88q151,88 222,261l-181,60q-49,-123 -157.5,-188q-108.5,-65 -257.5,-65q-234,0 -364,150.5q-130,150.5 -130,412.5q0,172 61.5,301.5q61.5,129.5 174,201q112.5,71.5 266.5,71.5zM10813,1784q296,0 445,-293l156,78q-87,182 -244.5,277q-157.5,95 -365.5,95q-214,0 -368,-89q-154,-89 -236.5,-253.5q-82.5,-164.5 -82.5,-388.5q0,-225 82,-386q82,-161 236,-247q154,-86 368,-86q225,0 376,88q151,88 222,261l-181,60q-49,-123 -157.5,-188q-108.5,-65 -257.5,-65q-234,0 -364,150.5q-130,150.5 -130,412.5q0,172 61.5,301.5q61.5,129.5 174,201q112.5,71.5 266.5,71.5zM12987,1210q0,226 -85.5,390q-85.5,164 -242.5,252.5q-157,88.5 -372,88.5q-216,0 -372.5,-88q-156.5,-88 -241,-252q-84.5,-164 -84.5,-391q0,-226 83.5,-386.5q83.5,-160.5 240,-246.5q156.5,-86 376.5,-86q216,0 372.5,85q156.5,85 241,245.5q84.5,160.5 84.5,388.5zM12792,1210q0,-263 -131.5,-413q-131.5,-150 -371.5,-150q-242,0 -374,148q-132,148 -132,415q0,176 60,305.5q60,129.5 173,200q113,70.5 271,70.5q244,0 374.5,-150.5q130.5,-150.5 130.5,-425.5zM13423,981l0,940l-170,0l0,-1409l251,0l375,977q20,59 38.5,126.5q18.5,67.5 24.5,97.5q6,-27 20,-74.5q14,-47.5 28,-91.5q14,-44 20,-58l368,-977l245,0l0,1409l-172,0l0,-940q0,-78 2.5,-153q2.5,-75 6.5,-147q-25,89 -46.5,159.5q-21.5,70.5 -41.5,120.5l-364,960l-134,0l-369,-960l-89,-280q2,75 4.5,150q2.5,75 2.5,150zM16049,936q0,133 -59,231q-59,98 -167.5,151.5q-108.5,53.5 -258.5,53.5l-414,0l0,549l-191,0l0,-1409l593,0q237,0 367,111q130,111 130,313zM15857,938q0,-273 -328,-273l-379,0l0,556l387,0q160,0 240,-70.5q80,-70.5 80,-212.5zM17652,1210q0,226 -85.5,390q-85.5,164 -242.5,252.5q-157,88.5 -372,88.5q-216,0 -372.5,-88q-156.5,-88 -241,-252q-84.5,-164 -84.5,-391q0,-226 83.5,-386.5q83.5,-160.5 240,-246.5q156.5,-86 376.5,-86q216,0 372.5,85q156.5,85 241,245.5q84.5,160.5 84.5,388.5zM17457,1210q0,-263 -131.5,-413q-131.5,-150 -371.5,-150q-242,0 -374,148q-132,148 -132,415q0,176 60,305.5q60,129.5 173,200q113,70.5 271,70.5q244,0 374.5,-150.5q130.5,-150.5 130.5,-425.5zM18088,985l0,936l-170,0l0,-1409l222,0l762,1208q-12,-197 -12,-284l0,-924l172,0l0,1409l-230,0l-754,-1200q2,66 6,132q4,66 4,132zM20507,1765l0,156l-1110,0l0,-1409l1069,0l0,156l-878,0l0,452l818,0l0,154l-818,0l0,491l919,0zM20933,985l0,936l-170,0l0,-1409l222,0l762,1208q-12,-197 -12,-284l0,-924l172,0l0,1409l-230,0l-754,-1200q2,66 6,132q4,66 4,132zM22794,668l0,1253l-190,0l0,-1253l-484,0l0,-156l1158,0l0,156l-484,0zM25129,1532q0,195 -152.5,302q-152.5,107 -429.5,107q-515,0 -597,-358l185,-37q32,127 136,186.5q104,59.5 283,59.5q185,0 285.5,-63.5q100.5,-63.5 100.5,-186.5q0,-69 -31.5,-112q-31.5,-43 -88.5,-71q-57,-28 -136,-47q-79,-19 -175,-41q-111,-25 -185.5,-49q-74.5,-24 -122.5,-50.5q-48,-26.5 -82,-56.5q-50,-46 -76.5,-107q-26.5,-61 -26.5,-140q0,-181 138.5,-279q138.5,-98 396.5,-98q240,0 367,73.5q127,73.5 178,250.5l-188,33q-31,-112 -118,-162.5q-87,-50.5 -241,-50.5q-169,0 -258,56q-89,56 -89,167q0,65 34.5,107.5q34.5,42.5 99.5,71.5q61,29 259,73q81,19 160,39.5q79,20.5 149,51.5q41,17 78.5,41.5q37.5,24.5 65.5,56.5q38,42 59.5,99q21.5,57 21.5,134zM26000,1337l0,584l-190,0l0,-584l-542,-825l210,0l429,671l427,-671l210,0l-544,825zM26927,985l0,936l-170,0l0,-1409l222,0l762,1208q-12,-197 -12,-284l0,-924l172,0l0,1409l-230,0l-754,-1200q2,66 6,132q4,66 4,132zM28788,668l0,1253l-190,0l0,-1253l-484,0l0,-156l1158,0l0,156l-484,0zM29678,1268l0,653l-191,0l0,-1409l191,0l0,596l762,0l0,-596l191,0l0,1409l-191,0l0,-653l-762,0zM32076,1765l0,156l-1110,0l0,-1409l1069,0l0,156l-878,0l0,452l818,0l0,154l-818,0l0,491l919,0zM33436,1532q0,195 -152.5,302q-152.5,107 -429.5,107q-515,0 -597,-358l185,-37q32,127 136,186.5q104,59.5 283,59.5q185,0 285.5,-63.5q100.5,-63.5 100.5,-186.5q0,-69 -31.5,-112q-31.5,-43 -88.5,-71q-57,-28 -136,-47q-79,-19 -175,-41q-111,-25 -185.5,-49q-74.5,-24 -122.5,-50.5q-48,-26.5 -82,-56.5q-50,-46 -76.5,-107q-26.5,-61 -26.5,-140q0,-181 138.5,-279q138.5,-98 396.5,-98q240,0 367,73.5q127,73.5 178,250.5l-188,33q-31,-112 -118,-162.5q-87,-50.5 -241,-50.5q-169,0 -258,56q-89,56 -89,167q0,65 34.5,107.5q34.5,42.5 99.5,71.5q61,29 259,73q81,19 160,39.5q79,20.5 149,51.5q41,17 78.5,41.5q37.5,24.5 65.5,56.5q38,42 59.5,99q21.5,57 21.5,134zM33910,512l0,1409l-191,0l0,-1409l191,0zM35286,1765l0,156l-1122,0l0,-143l858,-1110l-785,0l0,-156l1002,0l0,139l-858,1114l905,0zM36628,1765l0,156l-1110,0l0,-1409l1069,0l0,156l-878,0l0,452l818,0l0,154l-818,0l0,491l919,0zM37075,1336l0,585l-191,0l0,-1409l663,0q238,0 367.5,106.5q129.5,106.5 129.5,296.5q0,157 -91.5,264q-91.5,107 -252.5,135l400,607l-220,0l-366,-585l-439,0zM37852,917q0,-123 -83.5,-187.5q-83.5,-64.5 -240.5,-64.5l-453,0l0,520l461,0q151,0 233.5,-70.5q82.5,-70.5 82.5,-197.5z", "white")
    this.defPath("L_B_pitch", 0.0018858, 0.0018858, "M1296,958q0,137 -62.5,242.5q-62.5,105.5 -177.5,165q-115,59.5 -274,59.5l-350,0l0,496l-295,0l0,-1409l633,0q253,0 389.5,116.5q136.5,116.5 136.5,329.5zM999,963q0,-222 -262,-222l-305,0l0,457l313,0q122,0 188,-60.5q66,-60.5 66,-174.5zM1790,437l0,207l-281,0l0,-207l281,0zM1790,839l0,1082l-281,0l0,-1082l281,0zM2592,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174zM3211,1941q-246,0 -380,-146.5q-134,-146.5 -134,-408.5q0,-268 135,-417.5q135,-149.5 383,-149.5q191,0 316,96q125,96 157,265l-283,14q-12,-83 -60,-132.5q-48,-49.5 -136,-49.5q-109,0 -163,90.5q-54,90.5 -54,272.5q0,187 55.5,280.5q55.5,93.5 165.5,93.5q80,0 134,-50.5q54,-50.5 67,-150.5l282,13q-15,114 -80.5,199.5q-65.5,85.5 -169.5,133q-104,47.5 -235,47.5zM4176,1055q57,-124 143,-180q86,-56 205,-56q172,0 264,106q92,106 92,310l0,686l-280,0l0,-606q0,-143 -48,-214q-48,-71 -145,-71q-102,0 -164.5,87.5q-62.5,87.5 -62.5,224.5l0,579l-281,0l0,-1484l281,0l0,405q0,36 -1,72q-1,36 -2.5,71q-1.5,35 -4.5,70l4,0z", "white")
    this.defPath("L_B_mod", 0.0018858, 0.0018858, "M399,1067l0,854l-262,0l0,-1409l395,0l252,788q17,66 35,132.5q18,66.5 35,132.5q11,-38 21,-75.5q10,-37.5 20.5,-75.5q10.5,-38 21.5,-75l259,-827l393,0l0,1409l-262,0l0,-854q0,-29 2.5,-116.5q2.5,-87.5 7.5,-190.5q-35,134 -61.5,228q-26.5,94 -43.5,147l-254,786l-210,0l-254,-786l-107,-375q6,116 9,192.5q3,76.5 3,114.5zM2877,1379q0,263 -146,412.5q-146,149.5 -404,149.5q-253,0 -397,-150q-144,-150 -144,-412q0,-261 144,-410.5q144,-149.5 403,-149.5q265,0 404.5,144.5q139.5,144.5 139.5,415.5zM2583,1379q0,-193 -63,-280q-63,-87 -183,-87q-128,0 -192,91.5q-64,91.5 -64,275.5q0,181 62.5,275.5q62.5,94.5 180.5,94.5q130,0 194.5,-92.5q64.5,-92.5 64.5,-277.5zM3801,1921q-2,-10 -6,-42q-4,-32 -6.5,-70q-2.5,-38 -2.5,-64l-4,0q-46,98 -132,147q-86,49 -214,49q-189,0 -292,-147.5q-103,-147.5 -103,-412.5q0,-269 108.5,-415.5q108.5,-146.5 307.5,-146.5q115,0 198.5,48q83.5,48 128.5,143l2,0l-2,-178l0,-395l281,0l0,1248q0,50 2,109q2,59 6,127l-272,0zM3334,1381q0,184 55.5,276q55.5,92 165.5,92q111,0 172,-97.5q61,-97.5 61,-277.5q0,-175 -58.5,-269.5q-58.5,-94.5 -172.5,-94.5q-113,0 -168,91.5q-55,91.5 -55,279.5z", "white")
    this.defPath("L_B_patch_select", 0.0018858, 0.0018858, "M1296,958q0,137 -62.5,242.5q-62.5,105.5 -177.5,165q-115,59.5 -274,59.5l-350,0l0,496l-295,0l0,-1409l633,0q253,0 389.5,116.5q136.5,116.5 136.5,329.5zM999,963q0,-222 -262,-222l-305,0l0,457l313,0q122,0 188,-60.5q66,-60.5 66,-174.5zM1759,1941q-157,0 -245,-85.5q-88,-85.5 -88,-240.5q0,-168 109.5,-255q109.5,-87 317.5,-91l233,-4l0,-55q0,-106 -37,-157.5q-37,-51.5 -121,-51.5q-78,0 -114.5,35.5q-36.5,35.5 -45.5,117.5l-293,-14q55,-321 465,-321q205,0 316,101q111,101 111,287l0,394q0,91 20.5,125.5q20.5,34.5 68.5,34.5q32,0 62,-6l0,152q-52,13 -89,19.5q-37,6.5 -91,6.5q-106,0 -156.5,-52q-50.5,-52 -60.5,-153l-6,0q-59,106 -148,159.5q-89,53.5 -208,53.5zM2086,1420l-144,2q-99,5 -139,21q-41,18 -62.5,54q-21.5,36 -21.5,96q0,77 35.5,114.5q35.5,37.5 94.5,37.5q66,0 121,-36q54,-36 85,-99.5q31,-63.5 31,-134.5l0,-55zM3162,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174zM3781,1941q-246,0 -380,-146.5q-134,-146.5 -134,-408.5q0,-268 135,-417.5q135,-149.5 383,-149.5q191,0 316,96q125,96 157,265l-283,14q-12,-83 -60,-132.5q-48,-49.5 -136,-49.5q-109,0 -163,90.5q-54,90.5 -54,272.5q0,187 55.5,280.5q55.5,93.5 165.5,93.5q80,0 134,-50.5q54,-50.5 67,-150.5l282,13q-15,114 -80.5,199.5q-65.5,85.5 -169.5,133q-104,47.5 -235,47.5zM4746,1055q57,-124 143,-180q86,-56 205,-56q172,0 264,106q92,106 92,310l0,686l-280,0l0,-606q0,-143 -48,-214q-48,-71 -145,-71q-102,0 -164.5,87.5q-62.5,87.5 -62.5,224.5l0,579l-281,0l0,-1484l281,0l0,405q0,36 -1,72q-1,36 -2.5,71q-1.5,35 -4.5,70l4,0zM7432,1515q0,207 -153.5,316.5q-153.5,109.5 -450.5,109.5q-535,0 -623,-387l285,-47q29,112 113,162.5q84,50.5 233,50.5q155,0 232,-47q77,-47 77,-141q0,-60 -35,-99q-35,-39 -100,-65q-32,-13 -94,-28.5q-62,-15.5 -154,-34.5q-106,-25 -166,-42.5q-60,-17.5 -96,-34q-36,-16.5 -70,-36.5q-75,-45 -117,-120q-42,-75 -42,-187q0,-191 143.5,-292.5q143.5,-101.5 417.5,-101.5q262,0 393.5,82q131.5,82 169.5,271l-286,39q-22,-91 -89.5,-137q-67.5,-46 -193.5,-46q-134,0 -201,42q-67,42 -67,126q0,55 28.5,90q28.5,35 84.5,60q53,24 227,61q101,22 174,41.5q73,19.5 117,37.5q44,19 78.5,40q34.5,21 59.5,45q51,49 78,116.5q27,67.5 27,155.5zM7887,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM8309,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM9075,437l0,1484l-281,0l0,-1484l281,0zM9595,1434q0,158 58.5,238.5q58.5,80.5 166.5,80.5q74,0 121.5,-32.5q47.5,-32.5 66.5,-96.5l265,23q-115,294 -467,294q-244,0 -375,-144.5q-131,-144.5 -131,-421.5q0,-268 133,-412q133,-144 377,-144q233,0 356,154.5q123,154.5 123,452.5l0,8l-694,0zM10017,1258q-8,-131 -63,-196.5q-55,-65.5 -148,-65.5q-99,0 -152.5,69q-53.5,69 -56.5,193l420,0zM10953,1941q-246,0 -380,-146.5q-134,-146.5 -134,-408.5q0,-268 135,-417.5q135,-149.5 383,-149.5q191,0 316,96q125,96 157,265l-283,14q-12,-83 -60,-132.5q-48,-49.5 -136,-49.5q-109,0 -163,90.5q-54,90.5 -54,272.5q0,187 55.5,280.5q55.5,93.5 165.5,93.5q80,0 134,-50.5q54,-50.5 67,-150.5l282,13q-15,114 -80.5,199.5q-65.5,85.5 -169.5,133q-104,47.5 -235,47.5zM12155,1905q-102,34 -237,34q-124,0 -191,-67.5q-67,-67.5 -67,-204.5l0,-638l-137,0l0,-190l151,0l88,-254l176,0l0,254l205,0l0,190l-205,0l0,562q0,79 30,116.5q30,37.5 93,37.5q30,0 94,-14l0,174z", "white")
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
          attrs: {
            "d": "M0 0H2L1 1Z",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addDrawing(172.5, 30, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          attrs: {
            "d": "M0 1H2L 1 0Z",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addSlider(190, 15, 20, 60, 3, 0.5);
    this.addRectangle(120, 102, 90, 1.2, this.accentColor);
    this.addUse("L_B_volume", 120, 96.877);
    this.addUse("L_B_data_entry", 167.5, 96.877);
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
      this.addUse("B_bankset", 235, 96.877);
    } else { // not isSd1
      this.addUse("B_cart", 235, 96.877);
    }
    this.addButton(250.8, 82, 15.8, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 13));
    this.addUse("B_sounds", 250.8, 96.877);
    this.addButton(266.6, 82, 15.8, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 7));
    this.addUse("B_presets", 266.6, 96.877);
    if (hasSeq) {
      this.addButton(282.4, 82, 15.8, 10, 51, Colors.BUTTON_LIGHT);
      this.addUse("B_seq", 282.4, 96.877);
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
    this.addUse("B_0", 322, 96.877);
    this.addUse("B_1", 337.8, 96.877);
    this.addUse("B_2", 353.6, 96.877);
    this.addUse("B_3", 369.4, 96.877);
    this.addUse("B_4", 385.2, 96.877);
    this.addUse("B_5", 401, 96.877);
    this.addUse("B_6", 416.8, 96.877);
    this.addUse("B_7", 432.6, 96.877);
    this.addUse("B_8", 448.4, 96.877);
    this.addUse("B_9", 464.2, 96.877);
    this.addRectangle(235, 102, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    this.addRectangle(479, 102, 24.5, 1.2, this.accentColor);
    // Starting group 'Buttons' at offset 505,0
    this.addButton(505, 82, 15.8, 10, 29, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_replace", 505, 73.2);
    this.addUse("L_I_program", 505, 76.8);
    this.addButton(625, 82, 15.8, 10, 5, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_select", 625, 73.2);
    this.addUse("L_I_voice", 625, 76.8);
    this.addButton(640.8, 82, 15.8, 10, 9, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_copy", 640.8, 76.8);
    this.addButton(656.6, 82, 15.8, 10, 3, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_write", 656.6, 76.8);
    this.addButton(672.4, 82, 15.8, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 5));
    this.addUse("L_I_compare", 672.4, 76.8);
    this.addButton(505, 62, 15.8, 5, 26, Colors.BUTTON_DARK);
    this.addUse("L_I_patch", 505, 53.2);
    this.addUse("L_I_select", 505, 56.8);
    this.addDrawing(515.38, 55.3, 3.3709, 5.1226,
      "0 0 3.3709 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 2.245853978093533 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 2.033297416423511 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(520.8, 62, 15.8, 5, 27, Colors.BUTTON_DARK);
    this.addUse("L_I_midi", 520.8, 56.8);
    this.addDrawing(522.45, 55.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(536.6, 62, 15.8, 5, 28, Colors.BUTTON_DARK);
    this.addUse("L_I_effects", 536.6, 56.8);
    this.addDrawing(541.91, 55.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(505, 42, 15.8, 5, 39, Colors.BUTTON_DARK);
    this.addUse("L_I_key", 505, 33.2);
    this.addUse("L_I_zone", 505, 36.8);
    this.addButton(520.8, 42, 15.8, 5, 40, Colors.BUTTON_DARK);
    this.addUse("L_I_trans_", 520.8, 33.2);
    this.addUse("L_I_pose", 520.8, 36.8);
    this.addButton(536.6, 42, 15.8, 5, 41, Colors.BUTTON_DARK);
    this.addUse("L_I_release", 536.6, 36.8);
    this.addButton(505, 22, 15.8, 5, 36, Colors.BUTTON_DARK);
    this.addUse("L_I_volume", 505, 16.8);
    this.addButton(520.8, 22, 15.8, 5, 37, Colors.BUTTON_DARK);
    this.addUse("L_I_pan", 520.8, 16.8);
    this.addButton(536.6, 22, 15.8, 5, 38, Colors.BUTTON_DARK);
    this.addUse("L_I_timbre", 536.6, 16.8);
    this.addButton(625, 62, 15.8, 5, 4, Colors.BUTTON_DARK);
    this.addUse("L_I_wave", 625, 56.8);
    this.addButton(640.8, 62, 15.8, 5, 6, Colors.BUTTON_DARK);
    this.addUse("L_I_mod", 640.8, 53.2);
    this.addUse("L_I_mixer", 640.8, 56.8);
    this.addButton(656.6, 62, 15.8, 5, 2, Colors.BUTTON_DARK);
    this.addUse("L_I_program", 656.6, 53.2);
    this.addUse("L_I_control", 656.6, 56.8);
    this.addButton(672.4, 62, 15.8, 5, 7, Colors.BUTTON_DARK);
    this.addUse("L_I_effects", 672.4, 56.8);
    this.addDrawing(677.71, 55.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(625, 42, 15.8, 5, 11, Colors.BUTTON_DARK);
    this.addUse("L_I_pitch", 625, 36.8);
    this.addButton(640.8, 42, 15.8, 5, 13, Colors.BUTTON_DARK);
    this.addUse("L_I_pitch", 640.8, 33.2);
    this.addUse("L_I_mod", 640.8, 36.8);
    this.addButton(656.6, 42, 15.8, 5, 15, Colors.BUTTON_DARK);
    this.addUse("L_I_filters", 656.6, 36.8);
    this.addDrawing(660.61, 35.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(672.4, 42, 15.8, 5, 17, Colors.BUTTON_DARK);
    this.addUse("L_I_output", 672.4, 36.8);
    this.addDrawing(677.49, 35.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(625, 22, 15.8, 5, 10, Colors.BUTTON_DARK);
    this.addUse("L_I_lfo", 625, 16.8);
    this.addDrawing(626.01, 15.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(640.8, 22, 15.8, 5, 12, Colors.BUTTON_DARK);
    this.addUse("L_I_env1", 640.8, 16.8);
    this.addDrawing(643.1, 15.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(656.6, 22, 15.8, 5, 14, Colors.BUTTON_DARK);
    this.addUse("L_I_env2", 656.6, 16.8);
    this.addDrawing(658.9, 15.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(672.4, 22, 15.8, 5, 16, Colors.BUTTON_DARK);
    this.addUse("L_I_env3", 672.4, 16.8);
    this.addDrawing(674.7, 15.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    if (hasSeq) {
      this.addUse("B_tracks", 520.8, 74.01);
      this.addRectangle(520.8, 75.472, 10.424, 0.25, Colors.WHITE);
      this.addRectangle(541.98, 75.472, 10.424, 0.25, Colors.WHITE);
      this.addButton(520.8, 82, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addUse("I_1_6", 520.8, 76.8);
      this.addButton(536.6, 82, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addUse("I_7_12", 536.6, 76.8);
      this.addButton(565, 82, 15.8, 10, 19, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_rec", 565, 76.8);
      this.addButton(580.8, 82, 15.8, 10, 22, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_stop", 580.8, 73.2);
      this.addUse("L_I__cont", 580.8, 76.8);
      this.addButton(596.6, 82, 15.8, 10, 23, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_play", 596.6, 76.8);
      this.addButton(565, 62, 15.8, 5, 32, Colors.BUTTON_DARK);
      this.addUse("L_I_click", 565, 56.8);
      this.addButton(580.8, 62, 15.8, 5, 18, Colors.BUTTON_DARK);
      this.addUse("L_I_seq", 580.8, 53.2);
      this.addUse("L_I_control", 580.8, 56.8);
      this.addDrawing(588.17, 55.3, 8.091, 5.1226,
        "0 0 8.091 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 6.966021605123393 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 6.753465043453371 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(596.6, 62, 15.8, 5, 33, Colors.BUTTON_DARK);
      this.addUse("L_I_locate", 596.6, 56.8);
      this.addDrawing(601.7, 55.3, 9.5128, 5.1226,
        "0 0 9.5128 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(565, 42, 15.8, 5, 60, Colors.BUTTON_DARK);
      this.addUse("L_I_song", 565, 36.8);
      this.addButton(580.8, 42, 15.8, 5, 59, Colors.BUTTON_DARK);
      this.addUse("L_I_seq", 580.8, 36.8);
      this.addButton(596.6, 42, 15.8, 5, 61, Colors.BUTTON_DARK);
      this.addUse("L_I_track", 596.6, 36.8);
      this.addButton(565, 22, 15.8, 5, 20, Colors.BUTTON_LIGHT);
      this.addUse("L_I_master", 565, 16.8);
      this.addDrawing(570.3, 15.3, 9.5128, 5.1226,
        "0 0 9.5128 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(580.8, 22, 15.8, 5, 21, Colors.BUTTON_LIGHT);
      this.addUse("L_I_storage", 580.8, 16.8);
      this.addButton(596.69, 22, 15.8, 5, 24, Colors.BUTTON_LIGHT);
      this.addUse("L_I_midi", 596.69, 13.2);
      this.addUse("L_I_control", 596.69, 16.8);
      this.addDrawing(605.34, 15.3, 6.8106, 5.1226,
        "0 0 6.8106 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 5.685560630791281 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 5.473004069121259 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addUse("B_edit", 565, 34.01);
      this.addRectangle(565, 35.472, 20.092, 0.25, Colors.WHITE);
      this.addRectangle(592.31, 35.472, 20.092, 0.25, Colors.WHITE);
      this.addUse("L_B_system", 565, 6.0589);
      this.addRectangle(565, 11, 58.5, 0.5, this.accentColor);
      this.addUse("L_B_sequencer", 565, 96.877);
    } else { // not hasSeq
      this.addUse("B_multi", 520.8, 74.01);
      this.addRectangle(520.8, 75.472, 11.579, 0.25, Colors.WHITE);
      this.addRectangle(540.82, 75.472, 11.579, 0.25, Colors.WHITE);
      this.addButton(520.8, 82, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addUse("I_a", 520.8, 76.8);
      this.addButton(536.6, 82, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addUse("I_b", 536.6, 76.8);
      this.addButton(565, 82, 15.8, 10, 20, Colors.BUTTON_LIGHT);
      this.addUse("L_I_master", 565, 76.8);
      this.addButton(580.8, 82, 15.8, 10, 21, Colors.BUTTON_LIGHT);
      this.addUse("L_I_storage", 580.8, 76.8);
      this.addButton(596.6, 82, 15.8, 10, 24, Colors.BUTTON_LIGHT);
      this.addUse("L_I_midi", 596.6, 73.2);
      this.addUse("L_I_control", 596.6, 76.8);
      this.addUse("L_B_system", 565, 96.877);
    }
    this.addRectangle(505, 102, 58.5, 1.2, this.accentColor);
    this.addRectangle(565, 102, 58.5, 1.2, this.accentColor);
    this.addRectangle(625, 102, 63.2, 1.2, this.accentColor);
    this.addUse("L_B_performance", 505, 96.877);
    this.addUse("L_B_programming", 625, 96.877);
    // Ending group 'Buttons'
    this.addRectangle(720, 22, 57, 28, Colors.BODY_DOWN);
    this.addMedia(722, 24, 53, 24, "0 0 53 24", 0, [
      {
        tag: "rect",
        attrs: {
          "x": `0`,
          "y": `0`,
          "width": `53`,
          "height": `24`,
          "rx": `0`,
          "fill": `#101010`,
          "stroke": `none`,
        }
      },
      {
        tag: "path",
        attrs: {
          "d": `M1.5 14l1 10h48l1 -10 -1 -9h-48z`,
          "fill": `#444444`,
          "stroke": `none`,
        }
      },
      {
        tag: "rect",
        attrs: {
          "x": `10.5`,
          "y": `14`,
          "width": `32`,
          "height": `10`,
          "rx": `0`,
          "fill": `#bbbbbb`,
          "stroke": `none`,
        }
      },
    ], [
      {
        tag: "rect",
        attrs: {
          "x": `0`,
          "y": `0`,
          "width": `53`,
          "height": `24`,
          "rx": `0`,
          "fill": `#303030`,
          "stroke": `none`,
        }
      },
    ]);
    this.addUse("L_I_cartridge", 720, 16.877);
    // Starting group 'BackPanel' at offset 0,-32
    this.addRectangle(0, -32, 845, 32, Colors.BODY);
    this.addUse("L_I_power", 97, -22);
    this.addUse("L_I_line", 131, -22);
    this.addUse("L_I_fuse", 165, -22);
    this.addRectangle(477, -17.559, 87, 0.25, Colors.WHITE);
    this.addUse("I_midi", 477, -22);
    this.addUse("L_I_thru", 480, -17.673);
    this.addUse("L_I_out", 518, -17.673);
    this.addUse("L_I_in", 558, -17.673);
    this.addUse("L_I_ft_sw_", 640, -22);
    this.addUse("L_I_pedal_cv", 663, -22);
    if (hasSeq) {
      this.addRectangle(690, -17.559, 38, 0.25, Colors.WHITE);
      this.addUse("L_I_left", 692, -22);
      this.addUse("L_I_right", 717, -22);
      this.addUse("I_mono", 690, -17.673);
      this.addUse("I_aux_out", 690, -27.123);
      this.addRectangle(740, -17.559, 38, 0.25, Colors.WHITE);
      this.addUse("L_I_left", 742, -22);
      this.addUse("L_I_right", 767, -22);
      this.addUse("I_mono", 740, -17.673);
      this.addUse("I_main_out", 740, -27.123);
    } else { // not hasSeq
      this.addRectangle(740, -17.559, 38, 0.25, Colors.WHITE);
      this.addUse("L_I_left", 742, -22);
      this.addUse("L_I_right", 767, -22);
      this.addUse("I_mono", 740, -17.673);
      this.addUse("I_main_out", 740, -27.123);
    }
    this.addUse("L_I_phones", 790, -22);
    this.addEllipse(2, -14, 6, 6, Colors.SCREWHEAD);
    this.addEllipse(837, -14, 6, 6, Colors.SCREWHEAD);
    // Ending group 'BackPanel'
    this.addRectangle(0, 121.5, 845, 170, Colors.BODY);
    if (hasSeq) {
      this.addUse("S_music_production_synthesizer", 13, 7);
    } else { // not hasSeq
      this.addUse("S_dynamic_component_synthesizer", 13, 7);
    }
    if (isSd1) {
      if (isSd132) {
        this.addDrawing(13, 67.353, 67.001, 37.147,
          "0 0 67.001 37.147",
          [
            {
              tag: "path",
              attrs: {
                "d": `
                  M 9.5094971 0
                  C 6.7161371 -1.42109e-14 4.530091 0.70830413 2.951241 2.1244181
                  C 1.396681 3.5156781 0.61960042 5.2047958 0.61960042 7.1923258
                  C 0.61960042 8.5090558 0.86243912 9.6268963 1.3482381 10.546126
                  C 1.8340381 11.440526 2.4778164 12.148744 3.2793864 12.670544
                  C 4.0809564 13.192244 4.9308883 13.602244 5.8296183 13.900444
                  C 6.7283483 14.198544 7.894486 14.521577 9.327596 14.869377
                  C 10.542126 15.167477 11.537811 15.440565 12.315011 15.688965
                  C 13.092311 15.912565 13.80895 16.223191 14.46475 16.620691
                  C 15.12055 17.018191 15.64298 17.53997 16.03158 18.18597
                  C 16.42028 18.83187 16.61449 19.61443 16.61449 20.53363
                  C 16.61449 22.12363 16.055923 23.452684 14.938623 24.520984
                  C 13.821223 25.564384 12.15711 26.086263 9.9466797 26.086263
                  C 7.7848697 26.086263 6.0359215 25.564384 4.6999715 24.520984
                  C 3.3640215 23.477484 2.5988244 21.81319 2.4045044 19.52749
                  L 0 19.52749
                  C 0 22.33489 0.8742207 24.496449 2.6230957 26.011849
                  C 4.3719757 27.502549 6.6675671 28.247888 9.5094971 28.247888
                  C 12.521447 28.247888 14.865626 27.564284 16.541626 26.197884
                  C 18.241926 24.806584 19.091858 22.881609 19.091858 20.422009
                  C 19.091858 19.055609 18.84902 17.912578 18.36322 16.993278
                  C 17.87732 16.074078 17.221698 15.353353 16.395898 14.831653
                  C 15.569998 14.285053 14.707676 13.875571 13.808976 13.602271
                  C 12.910176 13.304171 11.719835 12.993444 10.238135 12.670544
                  C 9.1208448 12.422044 8.209895 12.198484 7.505485 11.999784
                  C 6.801075 11.800984 6.133013 11.539886 5.501473 11.216886
                  C 4.869933 10.869086 4.3356901 10.447147 3.8984701 9.950297
                  C 3.4855401 9.453417 3.2184186 8.8321749 3.0969686 8.0868449
                  C 3.0483886 7.8135649 3.0241048 7.5523769 3.0241048 7.3039469
                  C 3.0241048 5.8878269 3.570748 4.6829405 4.663798 3.6891805
                  C 5.756848 2.6705805 7.3719671 2.1616252 9.5094971 2.1616252
                  C 11.331237 2.1616252 12.861631 2.6582135 14.100431 3.6519735
                  C 15.339231 4.6208935 15.958716 6.0746008 15.958716 8.0124308
                  L 18.327047 8.0124308
                  C 18.327047 5.7019308 17.56188 3.7887363 16.03158 2.2732463
                  C 14.50128 0.75775926 12.327137 -1.3159844e-14 9.5094971 0
                  z

                  M 23.646102 0.70796712
                  L 23.646102 27.539404
                  L 32.609379 27.539404
                  C 34.625479 27.539404 36.398751 27.315744 37.928951 26.868644
                  C 39.483551 26.396544 40.807185 25.527118 41.900285 24.260018
                  C 43.017585 23.017818 43.818989 21.502742 44.304789 19.714042
                  C 44.814889 17.925242 45.070117 16.049179 45.070117 14.086479
                  C 45.070117 13.117579 44.997226 12.111558 44.851526 11.068058
                  C 44.705826 10.024658 44.462988 8.98095 44.122888 7.9375
                  C 43.807088 6.89405 43.35765 5.9127237 42.77465 4.9934937
                  C 42.21595 4.0742637 41.523674 3.3165074 40.697774 2.7202474
                  C 39.580474 1.9003974 38.39055 1.3662012 37.12745 1.1177612
                  C 35.88865 0.84447923 34.382579 0.70796712 32.609379 0.70796712
                  L 23.646102 0.70796712
                  z

                  M 63.964054 0.87074788
                  L 60.631958 4.2023275
                  L 63.964054 4.2023275
                  L 63.964054 27.608651
                  L 67.000045 27.608651
                  L 67.000045 0.87074788
                  L 63.964054 0.87074788
                  z

                  M 26.123987 2.8695923
                  L 32.062642 2.8695923
                  C 33.350042 2.8695923 34.491856 2.9437745 35.487756 3.0928345
                  C 36.507956 3.2170545 37.370279 3.4782224 38.074679 3.8757324
                  C 38.949079 4.3477624 39.677592 4.9561408 40.260592 5.7014608
                  C 40.867792 6.4467808 41.341694 7.279236 41.681694 8.198466
                  C 42.021794 9.092856 42.252758 10.037051 42.374158 11.030851
                  C 42.519958 12.024551 42.592749 13.042979 42.592749 14.086479
                  C 42.592749 15.105079 42.519958 16.098792 42.374158 17.067692
                  C 42.252758 18.036592 42.021794 18.980877 41.681694 19.900077
                  C 41.365994 20.819277 40.916355 21.651783 40.333455 22.397083
                  C 39.750455 23.117583 39.046306 23.701197 38.220406 24.148397
                  C 37.297406 24.645297 36.362193 24.980637 35.414893 25.154537
                  C 34.467593 25.303637 33.350042 25.378296 32.062642 25.378296
                  L 26.123987 25.378296
                  L 26.123987 2.8695923
                  z
                `,
                "fill": "#ffffff",
                "stroke": "none",
              }
            },
            {
              tag: "path",
              attrs: {
                "d": `
                  M 42.539522 0.87074788
                  L 51.016524 9.9378947
                  L 59.493009 0.87074788
                  L 42.539522 0.87074788
                  z

                  M -0.00051676432 30.14648
                  L -0.00051676432 37.14657
                  L 16.759184 37.14657
                  L 19.49235 34.223751
                  L 22.224483 37.14657
                  L 67.000045 37.14657
                  L 67.000045 30.14648
                  L -0.00051676432 30.14648
                  z

                  M 37.541895 30.971753
                  C 37.721395 30.971753 37.879284 31.011959 38.016284 31.092159
                  C 38.156584 31.172359 38.278787 31.283455 38.383187 31.424955
                  C 38.487587 31.561755 38.57597 31.719628 38.64777 31.898828
                  C 38.71957 32.078128 38.776936 32.266485 38.819336 32.464685
                  C 38.865036 32.662785 38.897404 32.863299 38.917004 33.066199
                  C 38.936604 33.268999 38.945943 33.462525 38.945943 33.646525
                  C 38.945943 33.830525 38.936404 34.024051 38.917004 34.226851
                  C 38.897404 34.429751 38.865036 34.630265 38.819336 34.828365
                  C 38.776936 35.026565 38.71957 35.214922 38.64777 35.394222
                  C 38.57597 35.573422 38.487587 35.73383 38.383187 35.87533
                  C 38.278787 36.01213 38.156584 36.120691 38.016284 36.200891
                  C 37.879284 36.281091 37.721395 36.321297 37.541895 36.321297
                  C 37.362495 36.321297 37.203154 36.281091 37.062854 36.200891
                  C 36.925854 36.120691 36.804485 36.01213 36.700085 35.87533
                  C 36.595685 35.73383 36.508236 35.573422 36.436536 35.394222
                  C 36.364736 35.214922 36.305502 35.026565 36.259802 34.828365
                  C 36.217402 34.630265 36.186385 34.429751 36.166785 34.226851
                  C 36.147185 34.024051 36.137846 33.830525 36.137846 33.646525
                  C 36.137846 33.462525 36.147385 33.268999 36.166785 33.066199
                  C 36.186385 32.863299 36.217402 32.662785 36.259802 32.464685
                  C 36.305502 32.266485 36.364736 32.078128 36.436536 31.898828
                  C 36.508336 31.719628 36.595685 31.561755 36.700085 31.424955
                  C 36.804485 31.283455 36.925854 31.172359 37.062854 31.092159
                  C 37.203154 31.011959 37.362495 30.971753 37.541895 30.971753
                  z

                  M 55.128935 30.971753
                  C 55.314835 30.971753 55.477594 31.019046 55.617794 31.113346
                  C 55.758094 31.207646 55.877078 31.332817 55.974878 31.488517
                  C 56.072778 31.639417 56.149855 31.816434 56.205355 32.019234
                  C 56.260855 32.217334 56.296542 32.422401 56.312842 32.634701
                  L 55.936637 32.634701
                  C 55.907237 32.413001 55.861178 32.233549 55.799178 32.096749
                  C 55.737178 31.955249 55.667155 31.847204 55.588855 31.771704
                  C 55.513855 31.696304 55.435744 31.646576 55.354244 31.622876
                  C 55.272644 31.594576 55.197435 31.580501 55.128935 31.580501
                  C 54.998435 31.580501 54.876132 31.622625 54.762032 31.707625
                  C 54.647832 31.792525 54.546275 31.920231 54.458175 32.090031
                  C 54.373375 32.255131 54.30667 32.46475 54.25767 32.71945
                  C 54.20867 32.96945 54.18429 33.262016 54.18429 33.596916
                  C 54.18429 33.894116 54.200265 34.172607 54.232865 34.432007
                  C 54.265465 34.691507 54.320029 34.915617 54.395129 35.104317
                  C 54.470129 35.292917 54.567952 35.441268 54.688652 35.549768
                  C 54.809352 35.658268 54.959353 35.712549 55.138753 35.712549
                  C 55.200753 35.712549 55.272644 35.695939 55.354244 35.662939
                  C 55.439044 35.625139 55.519857 35.556884 55.598157 35.457784
                  C 55.676457 35.358684 55.748447 35.219438 55.813647 35.040238
                  C 55.882147 34.856238 55.932459 34.616035 55.965059 34.318835
                  L 56.342814 34.318835
                  C 56.316714 34.639535 56.270655 34.910522 56.205355 35.132222
                  C 56.143355 35.353922 56.071464 35.540461 55.989864 35.691361
                  C 55.908364 35.837561 55.821748 35.95311 55.730448 36.03811
                  C 55.639048 36.12301 55.551282 36.186813 55.466382 36.229313
                  C 55.381582 36.271813 55.304922 36.297428 55.236422 36.306828
                  C 55.167922 36.315828 55.115742 36.321297 55.079842 36.321297
                  C 54.916742 36.321297 54.756368 36.271569 54.599768 36.172469
                  C 54.443168 36.073369 54.30499 35.917514 54.18429 35.705314
                  C 54.06359 35.488314 53.965251 35.21034 53.890251 34.87074
                  C 53.818451 34.52644 53.782764 34.108603 53.782764 33.618103
                  C 53.782764 33.226503 53.813781 32.870751 53.875781 32.549951
                  C 53.937781 32.224451 54.025648 31.94596 54.139848 31.71486
                  C 54.254048 31.47906 54.394711 31.29759 54.561011 31.17019
                  C 54.727411 31.03819 54.916835 30.971753 55.128935 30.971753
                  z

                  M 26.688293 31.106628
                  L 27.123926 31.106628
                  L 27.950749 35.436597
                  L 28.767753 31.106628
                  L 29.208553 31.106628
                  L 28.156938 36.186938
                  L 27.740942 36.186938
                  L 26.688293 31.106628
                  z

                  M 46.159456 31.106628
                  L 46.550647 31.106628
                  L 46.550647 36.186938
                  L 46.159456 36.186938
                  L 46.159456 31.106628
                  z

                  M 63.544958 31.106628
                  L 65.639404 31.106628
                  L 65.639404 31.71486
                  L 63.932015 31.71486
                  L 63.932015 33.271354
                  L 65.51228 33.271354
                  L 65.51228 33.880103
                  L 63.932015 33.880103
                  L 63.932015 35.57819
                  L 65.66886 35.57819
                  L 65.66886 36.186938
                  L 63.544958 36.186938
                  L 63.544958 31.106628
                  z

                  M 2.3094198 31.212048
                  L 2.3094198 31.212565
                  C 2.4464298 31.212565 2.5686724 31.245784 2.6763224 31.311784
                  C 2.7839824 31.377884 2.8751675 31.469836 2.9502075 31.587736
                  C 3.0252375 31.700936 3.0826333 31.837647 3.1217733 31.998047
                  C 3.1609133 32.158447 3.1801676 32.332829 3.1801676 32.521529
                  C 3.1801676 32.681929 3.1689112 32.821175 3.1460612 32.939075
                  C 3.1232212 33.057075 3.0940913 33.158549 3.0582113 33.243449
                  C 3.0223413 33.323649 2.982809 33.38947 2.940389 33.44137
                  C 2.897979 33.49327 2.8575726 33.528823 2.8184326 33.547823
                  L 2.8184326 33.561776
                  C 2.9554426 33.641976 3.0677997 33.771599 3.1558797 33.950899
                  C 3.2439697 34.130099 3.2881714 34.387528 3.2881714 34.722428
                  C 3.2881714 34.925328 3.2684003 35.123307 3.2292603 35.316707
                  C 3.1933903 35.510107 3.1346036 35.682055 3.0530436 35.832955
                  C 2.9714836 35.979255 2.8657236 36.097338 2.7352336 36.186938
                  C 2.6080036 36.276538 2.4542165 36.321297 2.2747965 36.321297
                  C 2.1704065 36.321297 2.0745221 36.300235 1.9864421 36.257735
                  C 1.8983621 36.220035 1.8198243 36.168189 1.7513143 36.102189
                  C 1.6730243 36.031389 1.6076606 35.94389 1.5554606 35.84019
                  C 1.5065106 35.73169 1.4660942 35.616041 1.4335042 35.493441
                  C 1.4008542 35.366041 1.3764237 35.231865 1.3601237 35.090365
                  C 1.3470937 34.948865 1.3372081 34.807184 1.3306681 34.665584
                  L 1.6929199 34.665584
                  C 1.6962199 34.783584 1.7042278 34.906121 1.7172078 35.033521
                  C 1.7335078 35.160821 1.7612469 35.279004 1.8004069 35.387504
                  C 1.8428169 35.496004 1.9029744 35.585422 1.9812744 35.656222
                  C 2.0595644 35.727022 2.1658512 35.762158 2.2996012 35.762158
                  C 2.4790312 35.762158 2.6257044 35.675175 2.7398844 35.500675
                  C 2.8540544 35.321475 2.9109334 35.087743 2.9109334 34.799943
                  C 2.9109334 34.592443 2.8884005 34.427483 2.8427205 34.304883
                  C 2.7970405 34.182183 2.7396548 34.090231 2.6711548 34.028931
                  C 2.6059148 33.967631 2.5344808 33.929859 2.4561808 33.915759
                  C 2.3811508 33.896959 2.3124986 33.887337 2.2505086 33.887337
                  C 2.2243986 33.887337 2.1985372 33.889572 2.1724772 33.894572
                  L 2.093929 33.894572
                  L 2.093929 33.35662
                  C 2.123309 33.36162 2.152439 33.363338 2.181779 33.363338
                  L 2.2747965 33.363338
                  C 2.3433165 33.363338 2.4105679 33.351281 2.4758179 33.327681
                  C 2.5410679 33.299381 2.5979369 33.254723 2.6468669 33.193323
                  C 2.6990369 33.127223 2.73995 33.042258 2.76934 32.938558
                  C 2.80194 32.834758 2.8179159 32.705134 2.8179159 32.549434
                  C 2.8179159 32.474034 2.8099179 32.391604 2.7936279 32.301904
                  C 2.7805979 32.212304 2.7547365 32.129774 2.7155965 32.054374
                  C 2.6764565 31.974174 2.6223693 31.907837 2.5538493 31.855937
                  C 2.4853393 31.799337 2.3988236 31.771187 2.2944336 31.771187
                  C 2.1672036 31.771187 2.0680306 31.811393 1.9962606 31.891593
                  C 1.9277506 31.967093 1.8736633 32.061064 1.8345133 32.174264
                  C 1.7986433 32.287464 1.7742128 32.405647 1.7611328 32.528247
                  C 1.7513328 32.650847 1.7447258 32.754439 1.7414958 32.839339
                  L 1.398881 32.839339
                  C 1.398881 32.655339 1.4120451 32.469317 1.4381551 32.280717
                  C 1.4642651 32.087317 1.5098677 31.912835 1.5750977 31.757235
                  C 1.6436077 31.596835 1.7367104 31.466694 1.8541504 31.367594
                  C 1.9715904 31.263894 2.1234698 31.212048 2.3094198 31.212048
                  z

                  M 11.274247 31.212565
                  C 11.394928 31.212575 11.508661 31.247612 11.616345 31.318502
                  C 11.723945 31.384602 11.817098 31.481523 11.895398 31.608923
                  C 11.976998 31.736323 12.040484 31.891662 12.086084 32.075562
                  C 12.131784 32.259562 12.154814 32.467163 12.154814 32.698263
                  C 12.154814 32.919963 12.135003 33.113489 12.095903 33.278589
                  C 12.056803 33.438889 12.003172 33.582687 11.934672 33.710087
                  C 11.866172 33.837387 11.786293 33.953036 11.694893 34.056836
                  C 11.603593 34.160636 11.505771 34.26211 11.401371 34.36121
                  L 11.107849 34.644397
                  C 11.009949 34.738697 10.93007 34.832767 10.86807 34.927067
                  C 10.80937 35.016667 10.76186 35.104167 10.72596 35.189067
                  C 10.69006 35.273967 10.664229 35.351944 10.647929 35.422644
                  C 10.631629 35.493444 10.62219 35.552277 10.61899 35.599377
                  L 12.15533 35.599377
                  L 12.15533 36.186938
                  L 10.227283 36.186938
                  C 10.237283 35.672738 10.300569 35.264624 10.417969 34.962724
                  C 10.538669 34.656124 10.695208 34.405782 10.887708 34.212382
                  L 11.259778 33.830493
                  C 11.334778 33.755093 11.40355 33.682185 11.46545 33.611385
                  C 11.53065 33.540585 11.586248 33.462608 11.631848 33.377808
                  C 11.677548 33.292908 11.713235 33.195886 11.739335 33.087386
                  C 11.765435 32.974186 11.778609 32.835457 11.778609 32.670357
                  C 11.778609 32.571257 11.768554 32.469683 11.749154 32.365983
                  C 11.729554 32.257483 11.697185 32.160462 11.651485 32.075562
                  C 11.609085 31.985962 11.551619 31.913053 11.479919 31.856453
                  C 11.408119 31.799853 11.321604 31.771704 11.220504 31.771704
                  C 11.086704 31.771704 10.982345 31.818998 10.907345 31.913298
                  C 10.832345 32.007598 10.776846 32.120812 10.740946 32.252812
                  C 10.705046 32.384912 10.682534 32.521623 10.672734 32.663123
                  C 10.662734 32.799923 10.656297 32.910502 10.653097 32.995402
                  L 10.296012 32.995402
                  C 10.296012 32.589702 10.331699 32.269087 10.403499 32.033187
                  C 10.478499 31.797287 10.566366 31.618352 10.667566 31.495752
                  C 10.771966 31.373052 10.879644 31.295174 10.990544 31.262174
                  C 11.101521 31.229181 11.196057 31.212572 11.274247 31.212565
                  z

                  M 37.541895 31.580501
                  C 37.385295 31.580501 37.245148 31.632347 37.121248 31.736047
                  C 36.997248 31.839847 36.891438 31.983546 36.803438 32.167546
                  C 36.718638 32.351546 36.652768 32.571203 36.607068 32.825903
                  C 36.561368 33.075903 36.538855 33.349325 36.538855 33.646525
                  C 36.538855 33.943725 36.561368 34.219582 36.607068 34.474382
                  C 36.652768 34.724382 36.718638 34.941505 36.803438 35.125505
                  C 36.891538 35.309405 36.997248 35.453203 37.121248 35.557003
                  C 37.245148 35.660803 37.385295 35.712549 37.541895 35.712549
                  C 37.698495 35.712549 37.839057 35.660703 37.963057 35.557003
                  C 38.087057 35.453203 38.1909 35.309405 38.2757 35.125505
                  C 38.3638 34.941505 38.430604 34.724382 38.476204 34.474382
                  C 38.521904 34.219582 38.544934 33.943725 38.544934 33.646525
                  C 38.544934 33.349325 38.521904 33.075903 38.476204 32.825903
                  C 38.430504 32.571203 38.3638 32.351546 38.2757 32.167546
                  C 38.1909 31.983546 38.087057 31.839847 37.963057 31.736047
                  C 37.839057 31.632247 37.698495 31.580501 37.541895 31.580501
                  z
                `,
                "fill": "#db5f6a",
                "stroke": "none",
              }
            },
          ]);
      } else { // not isSd132
        this.addDrawing(13, 76.252, 67, 28.248,
          "0 0 67 28.248",
          [
            {
              tag: "path",
              attrs: {
                "d": `
                  M 9.5094971 0
                  C 6.7161371 -1.42109e-14 4.530091 0.70830413 2.951241 2.1244181
                  C 1.396681 3.5156781 0.61960042 5.2047958 0.61960042 7.1923258
                  C 0.61960042 8.5090558 0.86243912 9.6268963 1.3482381 10.546126
                  C 1.8340381 11.440526 2.4778164 12.148744 3.2793864 12.670544
                  C 4.0809564 13.192244 4.9308883 13.602244 5.8296183 13.900444
                  C 6.7283483 14.198544 7.894486 14.521577 9.327596 14.869377
                  C 10.542136 15.167477 11.537811 15.440565 12.315011 15.688965
                  C 13.092311 15.912565 13.80895 16.223191 14.46475 16.620691
                  C 15.12055 17.018191 15.64298 17.53997 16.03158 18.18597
                  C 16.42018 18.83187 16.61449 19.61443 16.61449 20.53363
                  C 16.61449 22.12363 16.055923 23.452684 14.938623 24.520984
                  C 13.821223 25.564384 12.15712 26.086263 9.9466797 26.086263
                  C 7.7848697 26.086263 6.0359215 25.564384 4.6999715 24.520984
                  C 3.3640215 23.477484 2.5988244 21.81319 2.4045044 19.52749
                  L 0 19.52749
                  C 0 22.33489 0.8742107 24.496449 2.6230957 26.011849
                  C 4.3719657 27.502549 6.6675671 28.247888 9.5094971 28.247888
                  C 12.521457 28.247888 14.865626 27.564284 16.541626 26.197884
                  C 18.241926 24.806584 19.091858 22.881609 19.091858 20.422009
                  C 19.091858 19.055609 18.84902 17.912578 18.36322 16.993278
                  C 17.87742 16.074078 17.221698 15.353353 16.395898 14.831653
                  C 15.569998 14.285053 14.707676 13.875571 13.808976 13.602271
                  C 12.910176 13.304171 11.719835 12.993444 10.238135 12.670544
                  C 9.1208348 12.422044 8.209895 12.198484 7.505485 11.999784
                  C 6.801075 11.800984 6.133013 11.539886 5.501473 11.216886
                  C 4.869933 10.869086 4.3356901 10.447147 3.8984701 9.950297
                  C 3.4855401 9.453417 3.2184186 8.8321749 3.0969686 8.0868449
                  C 3.0483886 7.8135649 3.0241048 7.5523769 3.0241048 7.3039469
                  C 3.0241048 5.8878269 3.570748 4.6829405 4.663798 3.6891805
                  C 5.756838 2.6705805 7.3719671 2.1616252 9.5094971 2.1616252
                  C 11.331247 2.1616252 12.861631 2.6582135 14.100431 3.6519735
                  C 15.339131 4.6208935 15.958716 6.0746008 15.958716 8.0124308
                  L 18.327047 8.0124308
                  C 18.327047 5.7019308 17.56188 3.7887363 16.03158 2.2732463
                  C 14.50128 0.75775926 12.327147 -1.3159844e-14 9.5094971 0
                  z

                  M 23.646102 0.70796712
                  L 23.646102 27.539404
                  L 32.609379 27.539404
                  C 34.625479 27.539404 36.398751 27.315744 37.928951 26.868644
                  C 39.483551 26.396544 40.807285 25.527118 41.900285 24.260018
                  C 43.017685 23.017818 43.818989 21.502742 44.304789 19.714042
                  C 44.814789 17.925242 45.070117 16.049179 45.070117 14.086479
                  C 45.070117 13.117579 44.997226 12.111558 44.851526 11.068058
                  C 44.705726 10.024658 44.462888 8.98095 44.122888 7.9375
                  C 43.807088 6.89405 43.35755 5.9127237 42.77465 4.9934937
                  C 42.21595 4.0742637 41.523674 3.3165074 40.697774 2.7202474
                  C 39.580474 1.9003974 38.39045 1.3662012 37.12745 1.1177612
                  C 35.88865 0.84447923 34.382579 0.70796712 32.609379 0.70796712
                  L 23.646102 0.70796712
                  z

                  M 63.964054 0.87074788
                  L 60.631958 4.2023275
                  L 63.964054 4.2023275
                  L 63.964054 27.608651
                  L 67.000045 27.608651
                  L 67.000045 0.87074788
                  L 63.964054 0.87074788
                  z

                  M 26.123987 2.8695923
                  L 32.062642 2.8695923
                  C 33.350042 2.8695923 34.491856 2.9437745 35.487756 3.0928345
                  C 36.507956 3.2170545 37.370279 3.4782224 38.074679 3.8757324
                  C 38.949079 4.3477624 39.677592 4.9561408 40.260592 5.7014608
                  C 40.867792 6.4467808 41.341694 7.279236 41.681694 8.198466
                  C 42.021794 9.092856 42.252758 10.037051 42.374158 11.030851
                  C 42.519858 12.024551 42.592749 13.042979 42.592749 14.086479
                  C 42.592749 15.105079 42.519858 16.098792 42.374158 17.067692
                  C 42.252758 18.036592 42.021794 18.980877 41.681694 19.900077
                  C 41.365994 20.819277 40.916455 21.651783 40.333455 22.397083
                  C 39.750555 23.117583 39.046306 23.701197 38.220406 24.148397
                  C 37.297406 24.645297 36.362193 24.980637 35.414893 25.154537
                  C 34.467593 25.303637 33.350042 25.378296 32.062642 25.378296
                  L 26.123987 25.378296
                  L 26.123987 2.8695923
                  z
                `,
                "fill": "#ffffff",
                "stroke": "none",
              }
            },
            {
              tag: "path",
              attrs: {
                "d": `
                  M 42.5394 0.87059
                  L 51.0163 9.93793
                  L 59.4932 0.87059
                  Z
                `,
                "fill": "#db5f6a",
                "stroke": "none",
              }
            },
          ]);
      }
    } else { // not isSd1
      if (hasSeq) {
        this.addDrawing(13, 78.5, 90.495, 26,
          "0 0 90.495 26",
          [
            {
              tag: "path",
              attrs: {
                "d": `
                  M 0 0
                  L 15.01097 25.999963
                  L 27.135295 5.0007284
                  L 27.135295 0
                  L 15.01097 20.999752
                  L 2.8866455 0
                  L 0 0
                  z

                  M 28.500586 0.00051676432
                  L 28.500586 2.5001058
                  L 28.500586 10.500134
                  L 28.500586 13.00024
                  L 28.500586 26.00048
                  L 31.000692 26.00048
                  L 31.000692 13.00024
                  L 45.000354 13.00024
                  L 42.500248 10.500134
                  L 31.000692 10.500134
                  L 31.000692 2.5001058
                  L 45.464408 2.5001058
                  L 55.965059 13.000757
                  L 57.733427 14.768608
                  L 68.965299 26.00048
                  L 72.501001 26.00048
                  L 59.500761 13.000757
                  L 72.501518 0.00051676432
                  L 68.965816 0.00051676432
                  L 57.733427 11.232906
                  L 46.500521 0.00051676432
                  L 42.964819 0.00051676432
                  L 31.000692 0.00051676432
                  L 28.500586 0.00051676432
                  z

                  M 54.904659 14.061674
                  L 42.965336 26.00048
                  L 46.501038 26.00048
                  L 56.671993 15.829525
                  L 54.904659 14.061674
                  z
                `,
                "fill": "#ffffff",
                "stroke": "none",
              }
            },
            {
              tag: "path",
              attrs: {
                "d": `
                  M 73.4008 7.60444
                  C 73.4008 8.69767 73.7491 9.53936 74.4457 10.1295
                  C 75.1423 10.71 76.0566 11.0002 77.1885 11.0002
                  C 78.3882 11.0002 79.3218 10.7342 79.9894 10.2021
                  C 80.6666 9.66029 81.0052 8.91051 81.0052 7.95273
                  C 81.0052 7.42062 80.9085 6.97559 80.715 6.61763
                  C 80.5215 6.25967 80.2603 5.97911 79.9313 5.77594
                  C 79.6024 5.5631 79.2589 5.40347 78.901 5.29705
                  C 78.543 5.18096 78.0689 5.06002 77.4788 4.93425
                  C 77.0337 4.8375 76.6709 4.75043 76.3904 4.67304
                  C 76.1098 4.59564 75.8437 4.49406 75.5922 4.36829
                  C 75.3406 4.23284 75.1278 4.06837 74.9537 3.87488
                  C 74.7892 3.68139 74.6828 3.43952 74.6344 3.14929
                  C 74.6151 3.04287 74.6054 2.94129 74.6054 2.84454
                  C 74.6054 2.29309 74.8231 1.82387 75.2584 1.43688
                  C 75.6938 1.04022 76.3372 0.84189 77.1886 0.84189
                  C 77.9142 0.84189 78.5237 1.03538 79.0171 1.42237
                  C 79.5105 1.79968 79.7572 2.36565 79.7572 3.12026
                  L 80.7005 3.12026
                  C 80.7005 2.22053 80.3958 1.47558 79.7862 0.88543
                  C 79.1767 0.295277 78.3108 0.0002 77.1886 0.0002
                  C 76.076 0.0002 75.2052 0.275927 74.5764 0.82738
                  C 73.9572 1.36916 73.6476 2.02703 73.6476 2.801
                  C 73.6476 3.31375 73.7443 3.74911 73.9378 4.10707
                  C 74.1313 4.45536 74.3877 4.73108 74.707 4.93425
                  C 75.0262 5.13742 75.3649 5.29705 75.7228 5.41314
                  C 76.0808 5.52924 76.5452 5.65501 77.116 5.79045
                  C 77.5997 5.90655 77.9964 6.01297 78.306 6.10971
                  C 78.6156 6.19678 78.901 6.31772 79.1622 6.47251
                  C 79.4234 6.6273 79.6314 6.83047 79.7862 7.08201
                  C 79.941 7.33355 80.0184 7.6383 80.0184 7.99626
                  C 80.0184 8.61543 79.7959 9.13302 79.3509 9.54903
                  C 78.9058 9.95536 78.2431 10.1585 77.3627 10.1585
                  C 76.5016 10.1585 75.8051 9.95536 75.273 9.54903
                  C 74.7408 9.1427 74.4361 8.49451 74.3587 7.60444
                  Z

                  M 85.5329 10.7245
                  C 86.336 10.7245 87.0422 10.6374 87.6517 10.4633
                  C 88.2709 10.2795 88.7982 9.94086 89.2336 9.44745
                  C 89.6786 8.96372 89.9979 8.37357 90.1914 7.677
                  C 90.3945 6.98043 90.4961 6.24999 90.4961 5.4857
                  C 90.4961 5.10839 90.4671 4.71657 90.409 4.31024
                  C 90.3509 3.90391 90.2542 3.49757 90.1188 3.09124
                  C 89.993 2.68491 89.814 2.30276 89.5818 1.9448
                  C 89.3593 1.58684 89.0836 1.29176 88.7546 1.05957
                  C 88.3096 0.74031 87.8355 0.532307 87.3324 0.43556
                  C 86.839 0.32914 86.2392 0.27593 85.5329 0.27593
                  L 81.9629 0.27593
                  L 81.9629 10.7245
                  Z

                  M 82.9498 1.11762
                  L 85.3153 1.11762
                  C 85.828 1.11762 86.2827 1.14665 86.6794 1.20472
                  C 87.0858 1.25312 87.4292 1.3547 87.7098 1.50947
                  C 88.0581 1.69329 88.3483 1.93032 88.5805 2.22056
                  C 88.8224 2.51079 89.011 2.83489 89.1465 3.19285
                  C 89.2819 3.54114 89.3738 3.90877 89.4222 4.29576
                  C 89.4803 4.68274 89.5093 5.0794 89.5093 5.48573
                  C 89.5093 5.88239 89.4803 6.26937 89.4222 6.64668
                  C 89.3738 7.02399 89.2819 7.39163 89.1465 7.74959
                  C 89.0207 8.10755 88.8417 8.43165 88.6095 8.72189
                  C 88.3773 9.00245 88.0968 9.2298 87.7678 9.40395
                  C 87.4002 9.59744 87.0277 9.72804 86.6504 9.79577
                  C 86.2731 9.85384 85.828 9.88287 85.3153 9.88287
                  L 82.9498 9.88287
                  Z
                `,
                "fill": "#ffffff",
                "stroke": "none",
              }
            },
            {
              tag: "path",
              attrs: {
                "d": `
                  M 2.88665 3.57591e-06
                  L 15.011 20.9998
                  L 27.1353 3.57591e-06
                  L 2.88665 3.57591e-06
                  Z
                `,
                "fill": "#299ca3",
                "stroke": "none",
              }
            },
          ]);
      } else { // not hasSeq
        this.addDrawing(13, 71.507, 92, 32.993,
          "0 0 92 32.993",
          [
            {
              tag: "path",
              attrs: {
                "d": `
                  M 0 0
                  L 19.047933 32.992301
                  L 34.43304 6.3458659
                  L 34.43304 0
                  L 19.047933 26.647469
                  L 3.6628255 0
                  L 0 0
                  z

                  M 36.165751 0.00051676432
                  L 36.165751 3.1724162
                  L 36.165751 13.324251
                  L 36.165751 16.496667
                  L 36.165751 32.992818
                  L 39.338167 32.992818
                  L 39.338167 16.496667
                  L 57.102974 16.496667
                  L 53.930558 13.324251
                  L 39.338167 13.324251
                  L 39.338167 3.1724162
                  L 57.692086 3.1724162
                  L 71.016854 16.497184
                  L 73.260128 18.740458
                  L 87.513005 32.992818
                  L 91.999552 32.992818
                  L 75.503402 16.497184
                  L 92.000069 0.00051676432
                  L 87.513521 0.00051676432
                  L 73.260128 14.25391
                  L 59.006734 0.00051676432
                  L 54.520186 0.00051676432
                  L 39.338167 0.00051676432
                  L 36.165751 0.00051676432
                  z

                  M 69.6712 17.843355
                  L 54.520703 32.992818
                  L 59.007251 32.992818
                  L 71.913957 20.086629
                  L 69.6712 17.843355
                  z
                `,
                "fill": "#ffffff",
                "stroke": "none",
              }
            },
            {
              tag: "path",
              attrs: {
                "d": "M 3.6629875,1.033192e-8 19.048062,26.647483 34.433135,1.033192e-8 Z",
                "fill": "#299ca3",
                "stroke": "none",
              }
            },
          ]);
      }
    }
    this.addDrawing(760, 93.94, 72, 10.56,
      "0 0 72 10.56",
      [
        {
          tag: "path",
          attrs: {
            "d": `
              M 1.7436129,0
              C 0.78686512,0 0,0.78686172 0,1.7436129
              V 8.8163871
              C 0,9.7731246 0.78686512,10.56 1.7436129,10.56
              H 70.254115
              c 0.956738,0 1.743439,-0.7868754 1.743439,-1.7436129
              V 1.7436129
              C 71.997554,0.78686172 71.210853,0 70.254115,0
              H 59.202151
              V 0.90306708
              H 70.55799
              c 0.268333,0 0.491961,0.22354352 0.491961,0.49178832
              v 7.8059157
              c 0,0.2682313 -0.223628,0.4917882 -0.491961,0.4917882
              H 1.3948553
              c -0.2682481,0 -0.4917882,-0.2235569 -0.4917882,-0.4917882
              V 1.403762
              c 0,-0.2682481 0.2235401,-0.49178824 0.4917882,-0.49178824
              H 55.866864
              V 0
              Z

              M 56.573461,0.01781334
              c -0.07926,0 -0.143031,0.06377247 -0.143031,0.14303075
              V 1.3948554
              c 0,0.079258 0.06377,0.1430308 0.143031,0.1430308
              h 1.913536
              c 0.07926,0 0.14303,-0.063773 0.14303,-0.1430308
              V 0.16084409
              c 0,-0.07925828 -0.06377,-0.14303075 -0.14303,-0.14303075
              z

              M 33.826158,1.6989049 25.44777,1.7256249
              c -0.876271,0 -1.591674,0.7153649 -1.591674,1.600582
              v 1.3859486
              c 0,0.8852273 0.715354,1.6005821 1.600581,1.6005821
              h 6.178614
              c 0.116221,0 0.214634,0.098238 0.214634,0.2144589
              v 0.2862362
              c 0,0.116255 -0.09842,0.2146333 -0.214634,0.2146333
              h -7.653979
              v 1.8330289
              h 8.423096
              c 0.885194,0 1.600584,-0.7153548 1.600584,-1.6005822
              V 5.9550736
              c 0,-0.8852273 -0.71539,-1.6005821 -1.600584,-1.6005821
              h -6.151893
              c -0.125211,0 -0.232447,-0.098348 -0.232447,-0.2324466
              V 3.8537967
              c 0,-0.1251769 0.09832,-0.232447 0.232447,-0.232447
              h 7.564562
              V 1.7167182
              Z

              m 9.49574,0.00891 -7.260512,0.053615
              c -0.795535,0 -1.439388,0.6528069 -1.439388,1.4575512
              v 4.2025541
              c 0,0.8047274 0.652542,1.4573765 1.457201,1.4573765
              h 7.260513
              c 0.804997,0 1.457725,-0.6526491 1.457725,-1.4573765
              V 3.1651917
              c 0,-0.8047444 -0.661797,-1.4573767 -1.466458,-1.4573767
              z

              m 17.722362,0.00891
              c -1.010472,0 -1.824121,0.7242716 -1.824121,1.6094887
              v 4.0237221
              c 0,0.8494721 0.777969,1.5289791 1.734707,1.5289791
              h 6.96537
              c 0.205812,0 0.393357,-0.035783 0.572471,-0.089416
              l 1.090634,0.7689429
              c 0.07165,0.053666 0.08081,0.035869 0.152111,-0.02672
              l 0.751304,-0.8316389
              c 0.08922,-0.098344 0.107131,-0.098333 0,-0.1788322
              l -0.0093,0.00891 -0.929615,-0.6973403
              c 0.08043,-0.1788434 0.05344,-0.2325309 0.05344,-0.4381737
              V 3.1384682
              c 0,-0.7868601 -0.724396,-1.42175 -1.609488,-1.42175
              z

              m -45.342837,0.00891
              c -0.358455,0 -0.545769,0.3583657 -0.554311,0.3910205
              V 1.7345316
              h -2.163973
              v 7.1176566
              h 2.190693
              V 3.7554737
              c 0,-0.071545 0.05371,-0.1252173 0.125218,-0.1252173
              h 5.329161
              c 0.1073,0 0.187739,0.080439 0.187739,0.1877388
              l 0.0358,5.0698196 2.235401,-0.017813
              c 0,0 -0.02672,-5.320267 -0.02672,-5.7673347 0,-0.447078 -0.178806,-1.377042 -1.439564,-1.377042
              z

              m 32.609959,0
              c -0.358059,0 -0.545615,0.3578541 -0.55431,0.3910205
              V 1.7345316
              h -2.163795
              v 7.1532832
              h 2.199597
              V 3.7554737
              c 0,-0.071545 0.0534,-0.1252173 0.125042,-0.1252173
              h 5.329163
              c 0.107468,0 0.187914,0.080439 0.187914,0.1877388
              l 0.0358,5.0698196
              h 2.226495
              c 0,0 -0.02707,-5.3380802 -0.02707,-5.7851479 0,-0.447078 -0.178834,-1.377042 -1.439388,-1.377042
              z

              m -44.7258337,0.00891
              c -0.8584007,0 -1.555874,0.6974834 -1.555874,1.555874
              v 4.0148153
              c 0,0.8583939 0.6974733,1.555874 1.555874,1.555874
              H 12.196383
              V 7.0547861
              H 4.4529888
              v -0.017813
              c -0.080466,0 -0.1432054,-0.062531 -0.1432054,-0.1430307
              V 6.4915699
              c 0,-0.080466 0.06274,-0.1430308 0.1432054,-0.1430308
              H 12.169489
              V 3.2904056
              c 0,-0.8583906 -0.697481,-1.555874 -1.555875,-1.555874
              z

              M 56.430254,1.9133636
              v 3.4605056 3.5139456
              h 2.199773
              V 1.9133636
              Z

              M 37.465147,3.5497471
              h 4.479884
              c 0.437984,0 0.795836,0.3577188 0.795836,0.7958377
              v 1.9135384
              c 0,0.4381527 -0.357808,0.7956629 -0.804917,0.7956629
              l -4.479536,-0.035627
              c -0.438322,0 -0.787106,-0.3577188 -0.787106,-0.7958377
              V 4.3455848
              c 0,-0.4381189 0.357855,-0.7958377 0.795839,-0.7958377
              z

              m 24.750429,0.080509
              h 4.676706
              c 0.267995,0 0.48253,0.1876604 0.48253,0.4290922
              L 67.3928,6.2769365 66.606045,5.6868254
              c -0.01791,0.017878 -1.01941,0.9925445 -1.046446,1.0193778
              l 0.465067,0.3396762
              h -3.871611
              l -0.0091,-0.00891
              c -0.250422,0 -0.447081,-0.178867 -0.447081,-0.3934654
              V 4.06843
              c 0.01791,-0.2414318 0.241563,-0.4381736 0.518682,-0.4381736
              z

              m -57.7625872,0.00891
              h 5.4005893
              c 0.0805,0 0.1432052,0.062531 0.1432052,0.1430307
              v 0.4292639
              c 0,0.080499 -0.062706,0.1430308 -0.1432052,0.1430308
              H 4.4529888
              c -0.080466,0 -0.1432054,-0.062531 -0.1432054,-0.1430308
              V 3.7821938
              c 0,-0.0805 0.06274,-0.1430307 0.1432054,-0.1430307
              z
            `,
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addRectangle(-156, -32, 20, 334.5, Colors.BODY);
    this.addRectangle(847, -32, 20, 334.5, Colors.BODY);
    this.addRectangle(-134, -32, 132, 334.5, Colors.BODY);
    this.addDrawing(-127, 13, 118, 96,
      "0 0 118 96",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 0 0 H 118 L 108 10 H 10 Z",
            "fill": "#101010",
            "stroke": "none",
          }
        },
        {
          tag: "path",
          attrs: {
            "d": "M 0 0 V 96 L 10 10 Z",
            "fill": "#101010",
            "stroke": "none",
          }
        },
        {
          tag: "path",
          attrs: {
            "d": "M 118 0 V 96 L 108 10 Z",
            "fill": "#303030",
            "stroke": "none",
          }
        },
        {
          tag: "path",
          attrs: {
            "d": "M 0 96 H 119 L 108 10 H 10 Z",
            "fill": "#282828",
            "stroke": "none",
          }
        },
      ]);
    this.addDrawing(-127, 129.5, 118, 162,
      "0 0 118 161",
      [
        {
          tag: "rect",
          attrs: {
            "x": "0",
            "y": "0",
            "width": "5",
            "height": "161",
            "rx": "0",
            "fill": "#101010",
            "stroke": "none",
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": "113",
            "y": "0",
            "width": "5",
            "height": "161",
            "rx": "0",
            "fill": "#303030",
            "stroke": "none",
          }
        },
        {
          tag: "path",
          attrs: {
            "d": "M 0 0 H 118 L 113 13 H 5 Z",
            "fill": "#101010",
            "stroke": "none",
          }
        },
      ]);
    if (hasSeq) {
      this.addMedia(-119, 129.5, 102, 13, "0 0 102 36", 1, [
        {
          tag: "rect",
          attrs: {
            "x": `0`,
            "y": `0`,
            "width": `102`,
            "height": `5`,
            "rx": `0`,
            "fill": `#444444`,
            "stroke": `none`,
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": `0`,
            "y": `5`,
            "width": `102`,
            "height": `31`,
            "rx": `0`,
            "fill": `#333333`,
            "stroke": `none`,
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": `4`,
            "y": `7`,
            "width": `94`,
            "height": `8`,
            "rx": `0`,
            "fill": `#222222`,
            "stroke": `none`,
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": `6`,
            "y": `12`,
            "width": `90`,
            "height": `3.5`,
            "rx": `0`,
            "fill": `#024d96`,
            "stroke": `none`,
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": `16`,
            "y": `12`,
            "width": `70`,
            "height": `3.5`,
            "rx": `0`,
            "fill": `#bbbbbb`,
            "stroke": `none`,
          }
        },
        {
          tag: "path",
          attrs: {
            "d": `M 3 6 H 74 V 3 H 99 V 20 H 74 V 16 H 3 Z M 5 9 H 97 V 16 H 74 V 13 H 5 Z`,
            "fill": `#2a2a2a`,
            "fill-rule": `evenodd`,
            "stroke": `none`,
          }
        },
        {
          tag: "path",
          attrs: {
            "d": `M 63 22.5 H 68 V 24.5 H 63 Z`,
            "fill": `#112211`,
            "stroke": `none`,
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": `74`,
            "y": `21`,
            "width": `25`,
            "height": `10`,
            "rx": `0`,
            "fill": `#444444`,
            "stroke": `none`,
          }
        },
      ], [
        {
          tag: "rect",
          attrs: {
            "x": `0`,
            "y": `0`,
            "width": `102`,
            "height": `5`,
            "rx": `0`,
            "fill": `#444444`,
            "stroke": `none`,
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": `0`,
            "y": `5`,
            "width": `102`,
            "height": `31`,
            "rx": `0`,
            "fill": `#333333`,
            "stroke": `none`,
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": `4`,
            "y": `7`,
            "width": `94`,
            "height": `8`,
            "rx": `0`,
            "fill": `#222222`,
            "stroke": `none`,
          }
        },
        {
          tag: "path",
          attrs: {
            "d": `M 3 6 H 74 V 3 H 99 V 20 H 74 V 16 H 3 Z M 5 9 H 97 V 16 H 74 V 13 H 5 Z`,
            "fill": `#2a2a2a`,
            "fill-rule": `evenodd`,
            "stroke": `none`,
          }
        },
        {
          tag: "path",
          attrs: {
            "d": `M 63 22.5 H 68 V 24.5 H 63 Z`,
            "fill": `#112211`,
            "stroke": `none`,
          }
        },
        {
          tag: "rect",
          attrs: {
            "x": `74`,
            "y": `21`,
            "width": `25`,
            "height": `2`,
            "rx": `0`,
            "fill": `#444444`,
            "stroke": `none`,
          }
        },
      ]);
      this.addLight(-56, 137.62, 5, 0.72222, 16);
    } else { // not hasSeq
    }
    // Starting group 'WheelArea' at offset -122,169.5
    this.addRectangle(-122, 169.5, 108, 122, Colors.PANEL);
    this.addPatchSelectButton(-116, 171.5, 9, 12, 1);
    this.addPatchSelectButton(-101, 171.5, 9, 12, 0);
    this.addUse("L_I_patch", -91, 176.28);
    this.addUse("L_I_select", -91, 179.88);
    this.addWheel(-92.5, 195.5, 13, 66, 0, 0.5, true);
    this.addDrawing(-75.5, 195.5, 4, 66,
      "0 0 4 66",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 0.25 0.25 H 3.5 L 2 30 Z M 0.25 65.75 H 3.5 L 2 36 Z",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.5",
          }
        },
        {
          tag: "circle",
          attrs: {
            "cx": "2",
            "cy": "33",
            "r": "1",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addWheel(-55.5, 195.5, 13, 66, 2, 0.5, false);
    this.addDrawing(-38.5, 195.5, 4, 66,
      "0 0 4 66",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 0.25 0.25 H 3 L 2 65.75 Z",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.5",
          }
        },
      ]);
    this.addRectangle(-122, 268.5, 28, 1.2, this.accentColor);
    this.addRectangle(-92.5, 268.5, 35.5, 1.2, this.accentColor);
    this.addUse("L_B_pitch", -92.5, 263.38);
    this.addRectangle(-55.5, 268.5, 41.5, 1.2, this.accentColor);
    this.addUse("L_B_mod", -55.5, 263.38);
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
          attrs: {
            "d": "M0 0H2L1 1Z",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addDrawing(-37.5, 17, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          attrs: {
            "d": "M0 1H2L 1 0Z",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addSlider(-20, 2, 20, 60, 3, 0.5);
    this.addRectangle(-90, 89, 90, 1.2, this.accentColor);
    this.addUse("L_B_volume", -90, 83.877);
    this.addUse("L_B_data_entry", -42.5, 83.877);
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
      this.addUse("B_bankset", 25, 83.877);
    } else { // not isSd1
      this.addUse("B_cart", 25, 83.877);
    }
    this.addButton(40.8, 69, 15.8, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 13));
    this.addUse("B_sounds", 40.8, 83.877);
    this.addButton(56.6, 69, 15.8, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 7));
    this.addUse("B_presets", 56.6, 83.877);
    if (hasSeq) {
      this.addButton(72.4, 69, 15.8, 10, 51, Colors.BUTTON_LIGHT);
      this.addUse("B_seq", 72.4, 83.877);
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
    this.addUse("B_0", 112, 83.877);
    this.addUse("B_1", 127.8, 83.877);
    this.addUse("B_2", 143.6, 83.877);
    this.addUse("B_3", 159.4, 83.877);
    this.addUse("B_4", 175.2, 83.877);
    this.addUse("B_5", 191, 83.877);
    this.addUse("B_6", 206.8, 83.877);
    this.addUse("B_7", 222.6, 83.877);
    this.addUse("B_8", 238.4, 83.877);
    this.addUse("B_9", 254.2, 83.877);
    this.addRectangle(25, 89, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    this.addRectangle(269, 89, 24.5, 1.2, this.accentColor);
    // Starting group 'Buttons' at offset 295,-13
    this.addButton(295, 69, 15.8, 10, 29, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_replace", 295, 60.2);
    this.addUse("L_I_program", 295, 63.8);
    this.addButton(415, 69, 15.8, 10, 5, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_select", 415, 60.2);
    this.addUse("L_I_voice", 415, 63.8);
    this.addButton(430.8, 69, 15.8, 10, 9, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_copy", 430.8, 63.8);
    this.addButton(446.6, 69, 15.8, 10, 3, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_write", 446.6, 63.8);
    this.addButton(462.4, 69, 15.8, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 5));
    this.addUse("L_I_compare", 462.4, 63.8);
    this.addButton(295, 49, 15.8, 5, 26, Colors.BUTTON_DARK);
    this.addUse("L_I_patch", 295, 40.2);
    this.addUse("L_I_select", 295, 43.8);
    this.addDrawing(305.38, 42.3, 3.3709, 5.1226,
      "0 0 3.3709 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 2.245853978093533 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 2.033297416423511 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(310.8, 49, 15.8, 5, 27, Colors.BUTTON_DARK);
    this.addUse("L_I_midi", 310.8, 43.8);
    this.addDrawing(312.45, 42.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(326.6, 49, 15.8, 5, 28, Colors.BUTTON_DARK);
    this.addUse("L_I_effects", 326.6, 43.8);
    this.addDrawing(331.91, 42.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(295, 29, 15.8, 5, 39, Colors.BUTTON_DARK);
    this.addUse("L_I_key", 295, 20.2);
    this.addUse("L_I_zone", 295, 23.8);
    this.addButton(310.8, 29, 15.8, 5, 40, Colors.BUTTON_DARK);
    this.addUse("L_I_trans_", 310.8, 20.2);
    this.addUse("L_I_pose", 310.8, 23.8);
    this.addButton(326.6, 29, 15.8, 5, 41, Colors.BUTTON_DARK);
    this.addUse("L_I_release", 326.6, 23.8);
    this.addButton(295, 9, 15.8, 5, 36, Colors.BUTTON_DARK);
    this.addUse("L_I_volume", 295, 3.8);
    this.addButton(310.8, 9, 15.8, 5, 37, Colors.BUTTON_DARK);
    this.addUse("L_I_pan", 310.8, 3.8);
    this.addButton(326.6, 9, 15.8, 5, 38, Colors.BUTTON_DARK);
    this.addUse("L_I_timbre", 326.6, 3.8);
    this.addButton(415, 49, 15.8, 5, 4, Colors.BUTTON_DARK);
    this.addUse("L_I_wave", 415, 43.8);
    this.addButton(430.8, 49, 15.8, 5, 6, Colors.BUTTON_DARK);
    this.addUse("L_I_mod", 430.8, 40.2);
    this.addUse("L_I_mixer", 430.8, 43.8);
    this.addButton(446.6, 49, 15.8, 5, 2, Colors.BUTTON_DARK);
    this.addUse("L_I_program", 446.6, 40.2);
    this.addUse("L_I_control", 446.6, 43.8);
    this.addButton(462.4, 49, 15.8, 5, 7, Colors.BUTTON_DARK);
    this.addUse("L_I_effects", 462.4, 43.8);
    this.addDrawing(467.71, 42.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(415, 29, 15.8, 5, 11, Colors.BUTTON_DARK);
    this.addUse("L_I_pitch", 415, 23.8);
    this.addButton(430.8, 29, 15.8, 5, 13, Colors.BUTTON_DARK);
    this.addUse("L_I_pitch", 430.8, 20.2);
    this.addUse("L_I_mod", 430.8, 23.8);
    this.addButton(446.6, 29, 15.8, 5, 15, Colors.BUTTON_DARK);
    this.addUse("L_I_filters", 446.6, 23.8);
    this.addDrawing(450.61, 22.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(462.4, 29, 15.8, 5, 17, Colors.BUTTON_DARK);
    this.addUse("L_I_output", 462.4, 23.8);
    this.addDrawing(467.49, 22.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(415, 9, 15.8, 5, 10, Colors.BUTTON_DARK);
    this.addUse("L_I_lfo", 415, 3.8);
    this.addDrawing(416.01, 2.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(430.8, 9, 15.8, 5, 12, Colors.BUTTON_DARK);
    this.addUse("L_I_env1", 430.8, 3.8);
    this.addDrawing(433.1, 2.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(446.6, 9, 15.8, 5, 14, Colors.BUTTON_DARK);
    this.addUse("L_I_env2", 446.6, 3.8);
    this.addDrawing(448.9, 2.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(462.4, 9, 15.8, 5, 16, Colors.BUTTON_DARK);
    this.addUse("L_I_env3", 462.4, 3.8);
    this.addDrawing(464.7, 2.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    if (hasSeq) {
      this.addUse("B_tracks", 310.8, 61.01);
      this.addRectangle(310.8, 62.472, 10.424, 0.25, Colors.WHITE);
      this.addRectangle(331.98, 62.472, 10.424, 0.25, Colors.WHITE);
      this.addButton(310.8, 69, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addUse("I_1_6", 310.8, 63.8);
      this.addButton(326.6, 69, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addUse("I_7_12", 326.6, 63.8);
      this.addButton(355, 69, 15.8, 10, 19, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_rec", 355, 63.8);
      this.addButton(370.8, 69, 15.8, 10, 22, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_stop", 370.8, 60.2);
      this.addUse("L_I__cont", 370.8, 63.8);
      this.addButton(386.6, 69, 15.8, 10, 23, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_play", 386.6, 63.8);
      this.addButton(355, 49, 15.8, 5, 32, Colors.BUTTON_DARK);
      this.addUse("L_I_click", 355, 43.8);
      this.addButton(370.8, 49, 15.8, 5, 18, Colors.BUTTON_DARK);
      this.addUse("L_I_seq", 370.8, 40.2);
      this.addUse("L_I_control", 370.8, 43.8);
      this.addDrawing(378.17, 42.3, 8.091, 5.1226,
        "0 0 8.091 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 6.966021605123393 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 6.753465043453371 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(386.6, 49, 15.8, 5, 33, Colors.BUTTON_DARK);
      this.addUse("L_I_locate", 386.6, 43.8);
      this.addDrawing(391.7, 42.3, 9.5128, 5.1226,
        "0 0 9.5128 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(355, 29, 15.8, 5, 60, Colors.BUTTON_DARK);
      this.addUse("L_I_song", 355, 23.8);
      this.addButton(370.8, 29, 15.8, 5, 59, Colors.BUTTON_DARK);
      this.addUse("L_I_seq", 370.8, 23.8);
      this.addButton(386.6, 29, 15.8, 5, 61, Colors.BUTTON_DARK);
      this.addUse("L_I_track", 386.6, 23.8);
      this.addButton(355, 9, 15.8, 5, 20, Colors.BUTTON_LIGHT);
      this.addUse("L_I_master", 355, 3.8);
      this.addDrawing(360.3, 2.3, 9.5128, 5.1226,
        "0 0 9.5128 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(370.8, 9, 15.8, 5, 21, Colors.BUTTON_LIGHT);
      this.addUse("L_I_storage", 370.8, 3.8);
      this.addButton(386.69, 9, 15.8, 5, 24, Colors.BUTTON_LIGHT);
      this.addUse("L_I_midi", 386.69, 0.2);
      this.addUse("L_I_control", 386.69, 3.8);
      this.addDrawing(395.34, 2.3, 6.8106, 5.1226,
        "0 0 6.8106 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 5.685560630791281 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 5.473004069121259 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addUse("B_edit", 355, 21.01);
      this.addRectangle(355, 22.472, 20.092, 0.25, Colors.WHITE);
      this.addRectangle(382.31, 22.472, 20.092, 0.25, Colors.WHITE);
      this.addUse("L_B_system", 355, -6.9411);
      this.addRectangle(355, -2, 58.5, 0.5, this.accentColor);
      this.addUse("L_B_sequencer", 355, 83.877);
    } else { // not hasSeq
      this.addUse("B_multi", 310.8, 61.01);
      this.addRectangle(310.8, 62.472, 11.579, 0.25, Colors.WHITE);
      this.addRectangle(330.82, 62.472, 11.579, 0.25, Colors.WHITE);
      this.addButton(310.8, 69, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addUse("I_a", 310.8, 63.8);
      this.addButton(326.6, 69, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addUse("I_b", 326.6, 63.8);
      this.addButton(355, 69, 15.8, 10, 20, Colors.BUTTON_LIGHT);
      this.addUse("L_I_master", 355, 63.8);
      this.addButton(370.8, 69, 15.8, 10, 21, Colors.BUTTON_LIGHT);
      this.addUse("L_I_storage", 370.8, 63.8);
      this.addButton(386.6, 69, 15.8, 10, 24, Colors.BUTTON_LIGHT);
      this.addUse("L_I_midi", 386.6, 60.2);
      this.addUse("L_I_control", 386.6, 63.8);
      this.addUse("L_B_system", 355, 83.877);
    }
    this.addRectangle(295, 89, 58.5, 1.2, this.accentColor);
    this.addRectangle(355, 89, 58.5, 1.2, this.accentColor);
    this.addRectangle(415, 89, 63.2, 1.2, this.accentColor);
    this.addUse("L_B_performance", 295, 83.877);
    this.addUse("L_B_programming", 415, 83.877);
    // Ending group 'Buttons'
    // Starting group 'NarrowWheelArea' at offset -95.0,127.19999999999999
    this.addRectangle(-95, 127.2, 86, 122, Colors.PANEL);
    this.addPatchSelectButton(-89, 129.2, 9, 12, 1);
    this.addPatchSelectButton(-74, 129.2, 9, 12, 0);
    this.addUse("L_I_patch", -64, 133.98);
    this.addUse("L_I_select", -64, 137.58);
    this.addWheel(-75, 153.2, 13, 66, 0, 0.5, true);
    this.addDrawing(-58, 153.2, 4, 66,
      "0 0 4 66",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 0.25 0.25 H 3.5 L 2 30 Z M 0.25 65.75 H 3.5 L 2 36 Z",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.5",
          }
        },
        {
          tag: "circle",
          attrs: {
            "cx": "2",
            "cy": "33",
            "r": "1",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addWheel(-42, 153.2, 13, 66, 2, 0.5, false);
    this.addDrawing(-25, 153.2, 4, 66,
      "0 0 4 66",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 0.25 0.25 H 3 L 2 65.75 Z",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.5",
          }
        },
      ]);
    this.addRectangle(-95, 226.2, 18.5, 1.2, this.accentColor);
    this.addRectangle(-75, 226.2, 31.5, 1.2, this.accentColor);
    this.addUse("L_B_pitch", -75, 221.08);
    this.addRectangle(-42, 226.2, 33, 1.2, this.accentColor);
    this.addUse("L_B_mod", -42, 221.08);
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
    this.root.setAttribute("height", "261.14106862231534mm");
    this.root.setAttribute("viewBox", "-95 -11.941068622315349 578.2 261.14106862231534");
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
          attrs: {
            "d": "M0 0H2L1 1Z",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addDrawing(-37.5, 17, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          attrs: {
            "d": "M0 1H2L 1 0Z",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addSlider(-20, 2, 20, 60, 3, 0.5);
    this.addRectangle(-90, 89, 90, 1.2, this.accentColor);
    this.addUse("L_B_volume", -90, 83.877);
    this.addUse("L_B_data_entry", -42.5, 83.877);
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
      this.addUse("B_bankset", 25, 83.877);
    } else { // not isSd1
      this.addUse("B_cart", 25, 83.877);
    }
    this.addButton(40.8, 69, 15.8, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 13));
    this.addUse("B_sounds", 40.8, 83.877);
    this.addButton(56.6, 69, 15.8, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 7));
    this.addUse("B_presets", 56.6, 83.877);
    if (hasSeq) {
      this.addButton(72.4, 69, 15.8, 10, 51, Colors.BUTTON_LIGHT);
      this.addUse("B_seq", 72.4, 83.877);
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
    this.addUse("B_0", 112, 83.877);
    this.addUse("B_1", 127.8, 83.877);
    this.addUse("B_2", 143.6, 83.877);
    this.addUse("B_3", 159.4, 83.877);
    this.addUse("B_4", 175.2, 83.877);
    this.addUse("B_5", 191, 83.877);
    this.addUse("B_6", 206.8, 83.877);
    this.addUse("B_7", 222.6, 83.877);
    this.addUse("B_8", 238.4, 83.877);
    this.addUse("B_9", 254.2, 83.877);
    this.addRectangle(25, 89, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    this.addRectangle(269, 89, 24.5, 1.2, this.accentColor);
    // Starting group 'Buttons' at offset 295,-13
    this.addButton(295, 69, 15.8, 10, 29, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_replace", 295, 60.2);
    this.addUse("L_I_program", 295, 63.8);
    this.addButton(415, 69, 15.8, 10, 5, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_select", 415, 60.2);
    this.addUse("L_I_voice", 415, 63.8);
    this.addButton(430.8, 69, 15.8, 10, 9, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_copy", 430.8, 63.8);
    this.addButton(446.6, 69, 15.8, 10, 3, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_write", 446.6, 63.8);
    this.addButton(462.4, 69, 15.8, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 5));
    this.addUse("L_I_compare", 462.4, 63.8);
    this.addButton(295, 49, 15.8, 5, 26, Colors.BUTTON_DARK);
    this.addUse("L_I_patch", 295, 40.2);
    this.addUse("L_I_select", 295, 43.8);
    this.addDrawing(305.38, 42.3, 3.3709, 5.1226,
      "0 0 3.3709 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 2.245853978093533 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 2.033297416423511 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(310.8, 49, 15.8, 5, 27, Colors.BUTTON_DARK);
    this.addUse("L_I_midi", 310.8, 43.8);
    this.addDrawing(312.45, 42.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(326.6, 49, 15.8, 5, 28, Colors.BUTTON_DARK);
    this.addUse("L_I_effects", 326.6, 43.8);
    this.addDrawing(331.91, 42.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(295, 29, 15.8, 5, 39, Colors.BUTTON_DARK);
    this.addUse("L_I_key", 295, 20.2);
    this.addUse("L_I_zone", 295, 23.8);
    this.addButton(310.8, 29, 15.8, 5, 40, Colors.BUTTON_DARK);
    this.addUse("L_I_trans_", 310.8, 20.2);
    this.addUse("L_I_pose", 310.8, 23.8);
    this.addButton(326.6, 29, 15.8, 5, 41, Colors.BUTTON_DARK);
    this.addUse("L_I_release", 326.6, 23.8);
    this.addButton(295, 9, 15.8, 5, 36, Colors.BUTTON_DARK);
    this.addUse("L_I_volume", 295, 3.8);
    this.addButton(310.8, 9, 15.8, 5, 37, Colors.BUTTON_DARK);
    this.addUse("L_I_pan", 310.8, 3.8);
    this.addButton(326.6, 9, 15.8, 5, 38, Colors.BUTTON_DARK);
    this.addUse("L_I_timbre", 326.6, 3.8);
    this.addButton(415, 49, 15.8, 5, 4, Colors.BUTTON_DARK);
    this.addUse("L_I_wave", 415, 43.8);
    this.addButton(430.8, 49, 15.8, 5, 6, Colors.BUTTON_DARK);
    this.addUse("L_I_mod", 430.8, 40.2);
    this.addUse("L_I_mixer", 430.8, 43.8);
    this.addButton(446.6, 49, 15.8, 5, 2, Colors.BUTTON_DARK);
    this.addUse("L_I_program", 446.6, 40.2);
    this.addUse("L_I_control", 446.6, 43.8);
    this.addButton(462.4, 49, 15.8, 5, 7, Colors.BUTTON_DARK);
    this.addUse("L_I_effects", 462.4, 43.8);
    this.addDrawing(467.71, 42.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(415, 29, 15.8, 5, 11, Colors.BUTTON_DARK);
    this.addUse("L_I_pitch", 415, 23.8);
    this.addButton(430.8, 29, 15.8, 5, 13, Colors.BUTTON_DARK);
    this.addUse("L_I_pitch", 430.8, 20.2);
    this.addUse("L_I_mod", 430.8, 23.8);
    this.addButton(446.6, 29, 15.8, 5, 15, Colors.BUTTON_DARK);
    this.addUse("L_I_filters", 446.6, 23.8);
    this.addDrawing(450.61, 22.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(462.4, 29, 15.8, 5, 17, Colors.BUTTON_DARK);
    this.addUse("L_I_output", 462.4, 23.8);
    this.addDrawing(467.49, 22.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(415, 9, 15.8, 5, 10, Colors.BUTTON_DARK);
    this.addUse("L_I_lfo", 415, 3.8);
    this.addDrawing(416.01, 2.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(430.8, 9, 15.8, 5, 12, Colors.BUTTON_DARK);
    this.addUse("L_I_env1", 430.8, 3.8);
    this.addDrawing(433.1, 2.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(446.6, 9, 15.8, 5, 14, Colors.BUTTON_DARK);
    this.addUse("L_I_env2", 446.6, 3.8);
    this.addDrawing(448.9, 2.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(462.4, 9, 15.8, 5, 16, Colors.BUTTON_DARK);
    this.addUse("L_I_env3", 462.4, 3.8);
    this.addDrawing(464.7, 2.3, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    if (hasSeq) {
      this.addUse("B_tracks", 310.8, 61.01);
      this.addRectangle(310.8, 62.472, 10.424, 0.25, Colors.WHITE);
      this.addRectangle(331.98, 62.472, 10.424, 0.25, Colors.WHITE);
      this.addButton(310.8, 69, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addUse("I_1_6", 310.8, 63.8);
      this.addButton(326.6, 69, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addUse("I_7_12", 326.6, 63.8);
      this.addButton(355, 69, 15.8, 10, 19, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_rec", 355, 63.8);
      this.addButton(370.8, 69, 15.8, 10, 22, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_stop", 370.8, 60.2);
      this.addUse("L_I__cont", 370.8, 63.8);
      this.addButton(386.6, 69, 15.8, 10, 23, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_play", 386.6, 63.8);
      this.addButton(355, 49, 15.8, 5, 32, Colors.BUTTON_DARK);
      this.addUse("L_I_click", 355, 43.8);
      this.addButton(370.8, 49, 15.8, 5, 18, Colors.BUTTON_DARK);
      this.addUse("L_I_seq", 370.8, 40.2);
      this.addUse("L_I_control", 370.8, 43.8);
      this.addDrawing(378.17, 42.3, 8.091, 5.1226,
        "0 0 8.091 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 6.966021605123393 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 6.753465043453371 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(386.6, 49, 15.8, 5, 33, Colors.BUTTON_DARK);
      this.addUse("L_I_locate", 386.6, 43.8);
      this.addDrawing(391.7, 42.3, 9.5128, 5.1226,
        "0 0 9.5128 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(355, 29, 15.8, 5, 60, Colors.BUTTON_DARK);
      this.addUse("L_I_song", 355, 23.8);
      this.addButton(370.8, 29, 15.8, 5, 59, Colors.BUTTON_DARK);
      this.addUse("L_I_seq", 370.8, 23.8);
      this.addButton(386.6, 29, 15.8, 5, 61, Colors.BUTTON_DARK);
      this.addUse("L_I_track", 386.6, 23.8);
      this.addButton(355, 9, 15.8, 5, 20, Colors.BUTTON_LIGHT);
      this.addUse("L_I_master", 355, 3.8);
      this.addDrawing(360.3, 2.3, 9.5128, 5.1226,
        "0 0 9.5128 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(370.8, 9, 15.8, 5, 21, Colors.BUTTON_LIGHT);
      this.addUse("L_I_storage", 370.8, 3.8);
      this.addButton(386.69, 9, 15.8, 5, 24, Colors.BUTTON_LIGHT);
      this.addUse("L_I_midi", 386.69, 0.2);
      this.addUse("L_I_control", 386.69, 3.8);
      this.addDrawing(395.34, 2.3, 6.8106, 5.1226,
        "0 0 6.8106 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 5.685560630791281 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 5.473004069121259 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addUse("B_edit", 355, 21.01);
      this.addRectangle(355, 22.472, 20.092, 0.25, Colors.WHITE);
      this.addRectangle(382.31, 22.472, 20.092, 0.25, Colors.WHITE);
      this.addUse("L_B_system", 355, -6.9411);
      this.addRectangle(355, -2, 58.5, 0.5, this.accentColor);
      this.addUse("L_B_sequencer", 355, 83.877);
    } else { // not hasSeq
      this.addUse("B_multi", 310.8, 61.01);
      this.addRectangle(310.8, 62.472, 11.579, 0.25, Colors.WHITE);
      this.addRectangle(330.82, 62.472, 11.579, 0.25, Colors.WHITE);
      this.addButton(310.8, 69, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addUse("I_a", 310.8, 63.8);
      this.addButton(326.6, 69, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addUse("I_b", 326.6, 63.8);
      this.addButton(355, 69, 15.8, 10, 20, Colors.BUTTON_LIGHT);
      this.addUse("L_I_master", 355, 63.8);
      this.addButton(370.8, 69, 15.8, 10, 21, Colors.BUTTON_LIGHT);
      this.addUse("L_I_storage", 370.8, 63.8);
      this.addButton(386.6, 69, 15.8, 10, 24, Colors.BUTTON_LIGHT);
      this.addUse("L_I_midi", 386.6, 60.2);
      this.addUse("L_I_control", 386.6, 63.8);
      this.addUse("L_B_system", 355, 83.877);
    }
    this.addRectangle(295, 89, 58.5, 1.2, this.accentColor);
    this.addRectangle(355, 89, 58.5, 1.2, this.accentColor);
    this.addRectangle(415, 89, 63.2, 1.2, this.accentColor);
    this.addUse("L_B_performance", 295, 83.877);
    this.addUse("L_B_programming", 415, 83.877);
    // Ending group 'Buttons'
    this.root.setAttribute("x", "0mm");
    this.root.setAttribute("y", "0mm");
    this.root.setAttribute("width", "578.2mm");
    this.root.setAttribute("height", "107.14106862231534mm");
    this.root.setAttribute("viewBox", "-95 -11.941068622315349 578.2 107.14106862231534");
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
    this.addUse("L_B_volume", 0, 83.877);
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
      this.addUse("B_bankset", 30, 83.877);
    } else { // not isSd1
      this.addUse("B_cart", 30, 83.877);
    }
    this.addButton(45.8, 69, 15.8, 10, 53, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 13));
    this.addUse("B_sounds", 45.8, 83.877);
    this.addButton(61.6, 69, 15.8, 10, 54, Colors.BUTTON_LIGHT).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 7));
    this.addUse("B_presets", 61.6, 83.877);
    if (hasSeq) {
      this.addButton(77.4, 69, 15.8, 10, 51, Colors.BUTTON_LIGHT);
      this.addUse("B_seq", 77.4, 83.877);
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
    this.addUse("B_0", 117, 83.877);
    this.addUse("B_1", 132.8, 83.877);
    this.addUse("B_2", 148.6, 83.877);
    this.addUse("B_3", 164.4, 83.877);
    this.addUse("B_4", 180.2, 83.877);
    this.addUse("B_5", 196, 83.877);
    this.addUse("B_6", 211.8, 83.877);
    this.addUse("B_7", 227.6, 83.877);
    this.addUse("B_8", 243.4, 83.877);
    this.addUse("B_9", 259.2, 83.877);
    this.addRectangle(30, 89, 245, 1.2, this.accentColor);
    // Ending group 'DisplayAndButtons'
    // Starting group 'Buttons' at offset 91.79999999999998,87.2
    this.addButton(91.8, 169.2, 15.8, 10, 29, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_replace", 91.8, 160.4);
    this.addUse("L_I_program", 91.8, 164);
    this.addButton(211.8, 169.2, 15.8, 10, 5, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_select", 211.8, 160.4);
    this.addUse("L_I_voice", 211.8, 164);
    this.addButton(227.6, 169.2, 15.8, 10, 9, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_copy", 227.6, 164);
    this.addButton(243.4, 169.2, 15.8, 10, 3, Colors.BUTTON_MEDIUM);
    this.addUse("L_I_write", 243.4, 164);
    this.addButton(259.2, 169.2, 15.8, 10, 8, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 5));
    this.addUse("L_I_compare", 259.2, 164);
    this.addButton(91.8, 149.2, 15.8, 5, 26, Colors.BUTTON_DARK);
    this.addUse("L_I_patch", 91.8, 140.4);
    this.addUse("L_I_select", 91.8, 144);
    this.addDrawing(102.18, 142.5, 3.3709, 5.1226,
      "0 0 3.3709 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 2.245853978093533 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 2.033297416423511 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(107.6, 149.2, 15.8, 5, 27, Colors.BUTTON_DARK);
    this.addUse("L_I_midi", 107.6, 144);
    this.addDrawing(109.25, 142.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(123.4, 149.2, 15.8, 5, 28, Colors.BUTTON_DARK);
    this.addUse("L_I_effects", 123.4, 144);
    this.addDrawing(128.71, 142.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(91.8, 129.2, 15.8, 5, 39, Colors.BUTTON_DARK);
    this.addUse("L_I_key", 91.8, 120.4);
    this.addUse("L_I_zone", 91.8, 124);
    this.addButton(107.6, 129.2, 15.8, 5, 40, Colors.BUTTON_DARK);
    this.addUse("L_I_trans_", 107.6, 120.4);
    this.addUse("L_I_pose", 107.6, 124);
    this.addButton(123.4, 129.2, 15.8, 5, 41, Colors.BUTTON_DARK);
    this.addUse("L_I_release", 123.4, 124);
    this.addButton(91.8, 109.2, 15.8, 5, 36, Colors.BUTTON_DARK);
    this.addUse("L_I_volume", 91.8, 104);
    this.addButton(107.6, 109.2, 15.8, 5, 37, Colors.BUTTON_DARK);
    this.addUse("L_I_pan", 107.6, 104);
    this.addButton(123.4, 109.2, 15.8, 5, 38, Colors.BUTTON_DARK);
    this.addUse("L_I_timbre", 123.4, 104);
    this.addButton(211.8, 149.2, 15.8, 5, 4, Colors.BUTTON_DARK);
    this.addUse("L_I_wave", 211.8, 144);
    this.addButton(227.6, 149.2, 15.8, 5, 6, Colors.BUTTON_DARK);
    this.addUse("L_I_mod", 227.6, 140.4);
    this.addUse("L_I_mixer", 227.6, 144);
    this.addButton(243.4, 149.2, 15.8, 5, 2, Colors.BUTTON_DARK);
    this.addUse("L_I_program", 243.4, 140.4);
    this.addUse("L_I_control", 243.4, 144);
    this.addButton(259.2, 149.2, 15.8, 5, 7, Colors.BUTTON_DARK);
    this.addUse("L_I_effects", 259.2, 144);
    this.addDrawing(264.51, 142.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(211.8, 129.2, 15.8, 5, 11, Colors.BUTTON_DARK);
    this.addUse("L_I_pitch", 211.8, 124);
    this.addButton(227.6, 129.2, 15.8, 5, 13, Colors.BUTTON_DARK);
    this.addUse("L_I_pitch", 227.6, 120.4);
    this.addUse("L_I_mod", 227.6, 124);
    this.addButton(243.4, 129.2, 15.8, 5, 15, Colors.BUTTON_DARK);
    this.addUse("L_I_filters", 243.4, 124);
    this.addDrawing(247.41, 122.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(259.2, 129.2, 15.8, 5, 17, Colors.BUTTON_DARK);
    this.addUse("L_I_output", 259.2, 124);
    this.addDrawing(264.29, 122.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(211.8, 109.2, 15.8, 5, 10, Colors.BUTTON_DARK);
    this.addUse("L_I_lfo", 211.8, 104);
    this.addDrawing(212.81, 102.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(227.6, 109.2, 15.8, 5, 12, Colors.BUTTON_DARK);
    this.addUse("L_I_env1", 227.6, 104);
    this.addDrawing(229.9, 102.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(243.4, 109.2, 15.8, 5, 14, Colors.BUTTON_DARK);
    this.addUse("L_I_env2", 243.4, 104);
    this.addDrawing(245.7, 102.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    this.addButton(259.2, 109.2, 15.8, 5, 16, Colors.BUTTON_DARK);
    this.addUse("L_I_env3", 259.2, 104);
    this.addDrawing(261.5, 102.5, 9.5128, 5.1226,
      "0 0 9.5128 5.1226",
      [
        {
          tag: "path",
          attrs: {
            "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
            "fill": "none",
            "stroke": "#ffffff",
            "stroke-width": "0.25",
          }
        },
      ]);
    if (hasSeq) {
      this.addUse("B_tracks", 107.6, 161.21);
      this.addRectangle(107.6, 162.67, 10.424, 0.25, Colors.WHITE);
      this.addRectangle(128.78, 162.67, 10.424, 0.25, Colors.WHITE);
      this.addButton(107.6, 169.2, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addUse("I_1_6", 107.6, 164);
      this.addButton(123.4, 169.2, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addUse("I_7_12", 123.4, 164);
      this.addButton(151.8, 169.2, 15.8, 10, 19, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_rec", 151.8, 164);
      this.addButton(167.6, 169.2, 15.8, 10, 22, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_stop", 167.6, 160.4);
      this.addUse("L_I__cont", 167.6, 164);
      this.addButton(183.4, 169.2, 15.8, 10, 23, Colors.BUTTON_MEDIUM);
      this.addUse("L_I_play", 183.4, 164);
      this.addButton(151.8, 149.2, 15.8, 5, 32, Colors.BUTTON_DARK);
      this.addUse("L_I_click", 151.8, 144);
      this.addButton(167.6, 149.2, 15.8, 5, 18, Colors.BUTTON_DARK);
      this.addUse("L_I_seq", 167.6, 140.4);
      this.addUse("L_I_control", 167.6, 144);
      this.addDrawing(174.97, 142.5, 8.091, 5.1226,
        "0 0 8.091 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 6.966021605123393 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 6.753465043453371 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(183.4, 149.2, 15.8, 5, 33, Colors.BUTTON_DARK);
      this.addUse("L_I_locate", 183.4, 144);
      this.addDrawing(188.5, 142.5, 9.5128, 5.1226,
        "0 0 9.5128 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(151.8, 129.2, 15.8, 5, 60, Colors.BUTTON_DARK);
      this.addUse("L_I_song", 151.8, 124);
      this.addButton(167.6, 129.2, 15.8, 5, 59, Colors.BUTTON_DARK);
      this.addUse("L_I_seq", 167.6, 124);
      this.addButton(183.4, 129.2, 15.8, 5, 61, Colors.BUTTON_DARK);
      this.addUse("L_I_track", 183.4, 124);
      this.addButton(151.8, 109.2, 15.8, 5, 20, Colors.BUTTON_LIGHT);
      this.addUse("L_I_master", 151.8, 104);
      this.addDrawing(157.1, 102.5, 9.5128, 5.1226,
        "0 0 9.5128 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 8.387813119005006 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 8.175256557334984 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addButton(167.6, 109.2, 15.8, 5, 21, Colors.BUTTON_LIGHT);
      this.addUse("L_I_storage", 167.6, 104);
      this.addButton(183.49, 109.2, 15.8, 5, 24, Colors.BUTTON_LIGHT);
      this.addUse("L_I_midi", 183.49, 100.4);
      this.addUse("L_I_control", 183.49, 104);
      this.addDrawing(192.14, 102.5, 6.8106, 5.1226,
        "0 0 6.8106 5.1226",
        [
          {
            tag: "path",
            attrs: {
              "d": "M 1 0.125 l 5.685560630791281 0 -0.7700137024018886 3.622629649030907       M 0 1.125 l 5.473004069121259 0 -0.7700137024018886 3.622629649030907",
              "fill": "none",
              "stroke": "#ffffff",
              "stroke-width": "0.25",
            }
          },
        ]);
      this.addUse("B_edit", 151.8, 121.21);
      this.addRectangle(151.8, 122.67, 20.092, 0.25, Colors.WHITE);
      this.addRectangle(179.11, 122.67, 20.092, 0.25, Colors.WHITE);
      this.addUse("L_B_system", 151.8, 93.259);
      this.addRectangle(151.8, 98.2, 58.5, 0.5, this.accentColor);
      this.addUse("L_B_sequencer", 151.8, 184.08);
    } else { // not hasSeq
      this.addUse("B_multi", 107.6, 161.21);
      this.addRectangle(107.6, 162.67, 11.579, 0.25, Colors.WHITE);
      this.addRectangle(127.62, 162.67, 11.579, 0.25, Colors.WHITE);
      this.addButton(107.6, 169.2, 15.8, 10, 30, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 0));
      this.addUse("I_a", 107.6, 164);
      this.addButton(123.4, 169.2, 15.8, 10, 31, Colors.BUTTON_MEDIUM).addLight(this.addLight(5.2667, 0.4, 5.2667, 3.3333, 8));
      this.addUse("I_b", 123.4, 164);
      this.addButton(151.8, 169.2, 15.8, 10, 20, Colors.BUTTON_LIGHT);
      this.addUse("L_I_master", 151.8, 164);
      this.addButton(167.6, 169.2, 15.8, 10, 21, Colors.BUTTON_LIGHT);
      this.addUse("L_I_storage", 167.6, 164);
      this.addButton(183.4, 169.2, 15.8, 10, 24, Colors.BUTTON_LIGHT);
      this.addUse("L_I_midi", 183.4, 160.4);
      this.addUse("L_I_control", 183.4, 164);
      this.addUse("L_B_system", 151.8, 184.08);
    }
    this.addRectangle(91.8, 189.2, 58.5, 1.2, this.accentColor);
    this.addRectangle(151.8, 189.2, 58.5, 1.2, this.accentColor);
    this.addRectangle(211.8, 189.2, 63.2, 1.2, this.accentColor);
    this.addUse("L_B_performance", 91.8, 184.08);
    this.addUse("L_B_programming", 211.8, 184.08);
    // Ending group 'Buttons'
    // Starting group 'PatchSelects' at offset 0.0,87.2
    this.addPatchSelectButton(0, 142.2, 9, 12, 1);
    this.addPatchSelectButton(15, 142.2, 9, 12, 0);
    this.addRectangle(0, 189.2, 40, 1.2, this.accentColor);
    this.addUse("L_B_patch_select", 0, 184.08);
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
          attrs: {
            "d": "M0 0H2L1 1Z",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addDrawing(37.4, 117.2, 5, 2.5,
      "0 0 2 1",
      [
        {
          tag: "path",
          attrs: {
            "d": "M0 1H2L 1 0Z",
            "fill": "#ffffff",
            "stroke": "none",
          }
        },
      ]);
    this.addRectangle(32, 189.2, 59.8, 1.2, this.accentColor);
    this.addUse("L_B_data_entry", 32, 184.08);
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



