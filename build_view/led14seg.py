#!/usr/bin/env python3

# This creates SVG paths to recreate MAME's 'led14seg' layout element's
# segments. 

from math import ceil, atan2, degrees, hypot, sqrt
from util import fnum, dprint, set_debug
from textwrap import indent

LINE_CAP_START = 1
LINE_CAP_END = 2
LINE_CAP_NONE = 0

def draw_segment_horizontal_caps(minx:float, maxx:float, midy:float, width:float, caps:int):
	w2 = width / 2
	w8 = width / 8
	miny = midy - w2
	maxy = midy + w2
	parts = []

	if caps & LINE_CAP_START:
		parts.append(f'M {fnum(minx + w2)} {fnum(miny)}')
	else:
		parts.append(f'M {fnum(minx)} {fnum(miny)}')
	
	if caps & LINE_CAP_END:
		parts.extend([
			f'H {fnum(maxx - w2)}',
			f'L {fnum(maxx - w8)} {fnum(midy - w8)}',
			f'V {fnum(midy + w8)}',
			f'L {fnum(maxx - w2)} {fnum(maxy)}',
		])
	else:
		parts.extend([
			f'H {fnum(maxx)}',
			f'V {fnum(maxy)}',
		])

	if caps & LINE_CAP_START:
		parts.extend([
			f'H {fnum(minx + w2)}',
			f'L {fnum(minx + w8)} {fnum(midy + w8)}',
			f'V {fnum(midy - w8)}',
			f'Z',
		])
	else:
		parts.extend([
			f'H {fnum(minx)}',
			f'Z'
		])
	
	return ' '.join(parts)

#-------------------------------------------------
#  draw_segment_horizontal - draw a horizontal
#  LED segment
#-------------------------------------------------

def draw_segment_horizontal(minx:float, maxx:float, midy:float, width:float):
	return draw_segment_horizontal_caps(minx, maxx, midy, width, LINE_CAP_START | LINE_CAP_END)


#-------------------------------------------------
#  draw_segment_vertical_caps - draw a
#  vertical LED segment with definable end
#  and start points
#-------------------------------------------------

def draw_segment_vertical_caps(miny:float, maxy:float, midx:float, width:float, caps:int):
	w2 = width / 2
	w8 = width / 8
	minx = midx - w2
	maxx = midx + w2
	parts = []

	if caps & LINE_CAP_START:
		parts.append(f'M {fnum(minx)} {fnum(miny + w2)}')
	else:
		parts.append(f'M {fnum(minx)} {fnum(miny)}')
	
	if caps & LINE_CAP_END:
		parts.extend([
			f'V {fnum(maxy - w2)}',
			f'L {fnum(midx - w8)} {fnum(maxy - w8)}',
			f'H {fnum(midx + w8)}',
			f'L {fnum(maxx)} {fnum(maxy - w2)}',
		])
	else:
		parts.extend([
			f'V {fnum(maxy)}',
			f'H {fnum(maxx)}',
		])

	if caps & LINE_CAP_START:
		parts.extend([
			f'V {fnum(miny + w2)}',
			f'L {fnum(midx + w8)} {fnum(miny + w8)}',
			f'H {fnum(midx - w8)}',
			f'Z',
		])
	else:
		parts.extend([
			f'V {fnum(miny)}',
			f'Z'
		])

	return ' '.join(parts)


#-------------------------------------------------
#  draw_segment_vertical - draw a vertical
#  LED segment
#-------------------------------------------------

def draw_segment_vertical(miny:float, maxy:float, midx:float, width:float):
	return draw_segment_vertical_caps(miny, maxy, midx, width, LINE_CAP_START | LINE_CAP_END)


#-------------------------------------------------
#  draw_segment_diagonal - draw a diagonal
#  LED segment that looks like a back- or forward slash,
#  calculating the parallelogram per
#  https://en.wikipedia.org/wiki/Tangent_lines_to_circles
#-------------------------------------------------

def draw_segment_diagonal(minx:float, maxx:float, miny:float, maxy:float, width:float, mirror:bool=False):
	dprint(f'diagonal({minx=}, {maxx=}, {miny=}, {maxy=}, {width=}, {mirror=}')
	# compute parameters
	dx = maxx - minx
	dy = maxy - miny
	dprint(f'{dx=}, {dy=}')

	d2 = dx*dx + dy*dy
	r2 = width * width
	dprint(f'{d2=}, {r2=}')

	q = sqrt(d2 - r2)
	dprint(f'{q=}')

	# The tangent point
	ix = (r2 * dx - width * q * dy) / d2
	iy = (r2 * dy + width * q * dx) / d2

	dprint(f'{ix=}, {iy=}')

	# Tangent line
	la = iy - dy
	lb = dx - ix
	lc = ix * dy - iy * dx

	dprint(f'{la=}, {lb=}, {lc=}')

	# Intersect the tangent line with the Y axis - i.e, set x = 0
	# la * 0 + lb * y + lc = 0
	#   <=>
	# y = -(lc / lb)

	y = -(lc / lb)
	dprint(f'{y=}')

	if mirror:
		maxx, minx = minx, maxx

	return ' '.join([
		f'M {fnum(minx)} {fnum(miny)}',
		f'L {fnum(minx)} {fnum(miny + y)}',
		f'L {fnum(maxx)} {fnum(maxy)}',
		f'L {fnum(maxx)} {fnum(maxy - y)}',
		f'Z',
	])


def led14seg(width = 750, height = 1200, thickness = 120, skew = 120):
		# sizes for computation

		segments = [
			# top bar
			draw_segment_horizontal(
					0 + 2*thickness/3, width - 2*thickness/3, 0 + thickness/2,
					thickness),

			# right-top bar
			draw_segment_vertical(
					0 + 2*thickness/3, height/2 - thickness/3, width - thickness/2,
					thickness),

			# right-bottom bar
			draw_segment_vertical(
					height/2 + thickness/3, height - 2*thickness/3, width - thickness/2,
					thickness),

			# bottom bar
			draw_segment_horizontal(
					0 + 2*thickness/3, width - 2*thickness/3, height - thickness/2,
					thickness),

			# left-bottom bar
			draw_segment_vertical(
					height/2 + thickness/3, height - 2*thickness/3, 0 + thickness/2,
					thickness),

			# left-top bar
			draw_segment_vertical(
					0 + 2*thickness/3, height/2 - thickness/3, 0 + thickness/2,
					thickness),

			# horizontal-middle-left bar
			draw_segment_horizontal_caps(
					0 + 2*thickness/3, width/2 - thickness/10, height/2,
					thickness, LINE_CAP_START),

			# horizontal-middle-right bar
			draw_segment_horizontal_caps(
					0 + width/2 + thickness/10, width - 2*thickness/3, height/2,
					thickness, LINE_CAP_END),

			# vertical-middle-top bar
			draw_segment_vertical_caps(
					0 + thickness + thickness/3, height/2 - thickness/2 - thickness/3, width/2,
					thickness, LINE_CAP_NONE),

			# vertical-middle-bottom bar
			draw_segment_vertical_caps(
					height/2 + thickness/2 + thickness/3, height - thickness - thickness/3, width/2,
					thickness, LINE_CAP_NONE),

			# diagonal-left-bottom bar
			draw_segment_diagonal(
					0 + thickness + thickness/5, width/2 - thickness/2 - thickness/5,
					height/2 + thickness/2 + thickness/3, height - thickness - thickness/3,
					thickness, mirror=True),

			# diagonal-left-top bar
			draw_segment_diagonal(
					0 + thickness + thickness/5, width/2 - thickness/2 - thickness/5,
					0 + thickness + thickness/3, height/2 - thickness/2 - thickness/3,
					thickness),

			# diagonal-right-top bar
			draw_segment_diagonal(
					width/2 + thickness/2 + thickness/5, width - thickness - thickness/5,
					0 + thickness + thickness/3, height/2 - thickness/2 - thickness/3,
					thickness, mirror=True),

			# diagonal-right-bottom bar
			draw_segment_diagonal(
					width/2 + thickness/2 + thickness/5, width - thickness - thickness/5,
					height/2 + thickness/2 + thickness/3, height - thickness - thickness/3,
					thickness),
		]

		return segments
		# print('\n\n'.join(segments))
		# apply skew
		# apply_skew( 40)


def draw_segments():
	w = 750
	h = 1200
	t = 120
	sk = 120
	d = 2
	angle = -degrees(atan2(sk, h))
	tf = f'translate({fnum(sk)}) skewX({fnum(angle)})'
	segments = led14seg(w, h, t, sk)
	print('<?xml version="1.0" encoding="UTF-8"?>')
	print(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{fnum((w + sk) / d)}" height="{fnum(h / d)}" viewBox="0 0 {fnum(w + sk)} {fnum(h)}">')
	print(f'\t<g transform="{tf}">')
	for i, s in enumerate(segments):
		lvl = int(ceil(255 * (i / 15)))
		lvl = 3 * f'{lvl:02x}'
		print(indent(f'<path fill="#{lvl}" d="{s}" />', '\t\t'))
	print('\t</g>')
	print('</svg>')

def diagonals():
	print('<?xml version="1.0" encoding="UTF-8"?>')
	print(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{1000}" height="{400}" viewBox="0 0 {1000} {400}">')
	for i, thickness in enumerate([10, 30, 70]):
		dx = 10 + 200 * i
		s = draw_segment_diagonal(dx, dx + 200, 20, 220, thickness, mirror=True)
		print(indent(f'<path fill="black" d="{s}" />', '\t\t'))

	print('</svg>')


if __name__ == '__main__':
	set_debug(True)
	draw_segments()



