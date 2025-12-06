function standardize_color(color) {
  var ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = color;
  return ctx.fillStyle;
}

Colors = {
//COLORS//
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

//CODE//

}


