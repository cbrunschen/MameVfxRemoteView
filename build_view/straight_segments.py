#!/usr/bin/env python3

# This creates SVG paths loosely based on MAME's 'led14seg' layout element's
# segments, but adjusted to the positioning and size of the NEC FIP80B5R
# Vacuum Fluorescent Display's segments, and adding the Dot and Underline
# segments.
# All paths are polygons.

from sys import argv, exit
from argparse import ArgumentParser, BooleanOptionalAction

from math import ceil, sqrt
from util import fnum, dprint, set_debug
from textwrap import indent
from geom import Matrix
from typing import cast

from vfd import fip80b5r_from_led14seg_indexes

LINE_CAP_START = 1
LINE_CAP_END = 2
LINE_CAP_NONE = 0

def horizontal_segment_caps(minx:float, maxx:float, midy:float, width:float, caps:int):
	w2 = width / 2
	w8 = width / 8
	miny = midy - w2
	maxy = midy + w2
	parts = []

	if caps & LINE_CAP_START:
		parts.append((minx + w2, miny))
	else:
		parts.append((minx, miny))
	
	if caps & LINE_CAP_END:
		parts.extend([
			(maxx - w2, miny),
			(maxx - w8, midy - w8),
			(maxx - w8, midy + w8),
			(maxx - w2, maxy),
		])
	else:
		parts.extend([
			(maxx, miny),
			(maxx, maxy),
		])

	if caps & LINE_CAP_START:
		parts.extend([
			(minx + w2, maxy),
			(minx + w8, midy + w8),
			(minx + w8, midy - w8),
		])
	else:
		parts.extend([
			(minx, maxy),
		])
	
	return parts

def horizontal_segment(minx:float, maxx:float, midy:float, width:float):
	return horizontal_segment_caps(minx, maxx, midy, width, LINE_CAP_START | LINE_CAP_END)

def vertical_segment_caps(miny:float, maxy:float, midx:float, width:float, caps:int):
	w2 = width / 2
	w8 = width / 8
	minx = midx - w2
	maxx = midx + w2
	parts = []

	if caps & LINE_CAP_START:
		parts.append((minx, miny + w2))
	else:
		parts.append((minx, miny))
	
	if caps & LINE_CAP_END:
		parts.extend([
			(minx, maxy - w2),
			(midx - w8, maxy - w8),
			(midx + w8, maxy - w8),
			(maxx, maxy - w2),
		])
	else:
		parts.extend([
			(minx, maxy),
			(maxx, maxy),
		])

	if caps & LINE_CAP_START:
		parts.extend([
			(maxx, miny + w2),
			(midx + w8, miny + w8),
			(midx - w8, miny + w8),
		])
	else:
		parts.extend([
			(maxx, miny),
		])

	return parts

def vertical_segment(miny:float, maxy:float, midx:float, width:float):
	return vertical_segment_caps(miny, maxy, midx, width, LINE_CAP_START | LINE_CAP_END)

def diagonal_segment(minx:float, maxx:float, miny:float, maxy:float, width:float, mirror:bool=False):
	# compute parameters
	dx = maxx - minx
	dy = maxy - miny

	d2 = dx*dx + dy*dy
	r2 = width * width

	q = sqrt(d2 - r2)

	# The tangent point
	ix = (r2 * dx - width * q * dy) / d2
	iy = (r2 * dy + width * q * dx) / d2

	# Tangent line
	la = iy - dy
	lb = dx - ix
	lc = ix * dy - iy * dx

	# Intersect the tangent line with the Y axis - i.e, set x = 0
	# la * 0 + lb * y + lc = 0
	#   <=>
	# y = -(lc / lb)

	y = -(lc / lb)

	if mirror:
		maxx, minx = minx, maxx

	return [
		(minx, miny),
		(minx, miny + y),
		(maxx, maxy),
		(maxx, maxy - y),
	]

def chamfered_rect(cx, cy, w, h, chamfer):
	w2 = w/2
	h2 = h/2
	return [
		(cx-w2+chamfer, cy-h2),
		(cx+w2-chamfer, cy-h2),
		(cx+w2, cy-h2+chamfer),
		(cx+w2, cy+h2-chamfer),
		(cx+w2-chamfer, cy+h2),
		(cx-w2+chamfer, cy+h2),
		(cx-w2, cy+h2-chamfer),
		(cx-w2, cy-h2+chamfer),
	]

def fn(v):
	# return fnum(v, 1)
	return str(int(round(v)))

def transform(tf:Matrix, ps: list[tuple[float,float]]):
	return cast(list[tuple[float,float]], [tf.transform(p) for p in ps])

def pp(ps: list[tuple[float,float]]) -> str:
	return f'M{fn(ps[0][0])},{fn(ps[0][1])}' + ''.join([f'l{fn(x-px)},{fn(y-py)}' for ((px, py), (x,y)) in zip(ps[:-1], ps[1:])]) + ' Z'

def straight_segments(thickness=300):
	width = 1900
	height = 3110
	skewwidth = 340
	yx = -skewwidth / height
	shear = Matrix().shear(yx=yx)
	tseg = shear.translate(500+skewwidth, 690)
	return [
		transform(tseg, ps) for ps in [
			# top bar
			horizontal_segment(
					0 + 2*thickness/3, width - 2*thickness/3, 0 + thickness/2,
					thickness),

			# right-top bar
			vertical_segment(
					0 + 2*thickness/3, (height + thickness)/2 - 2*thickness/3, width - thickness/2,
					thickness),

			# right-bottom bar
			vertical_segment(
					(height - thickness)/2 + 2*thickness/3, height - 2*thickness/3, width - thickness/2,
					thickness),

			# bottom bar
			horizontal_segment(
					0 + 2*thickness/3, width - 2*thickness/3, height - thickness/2,
					thickness),

			# left-bottom bar
			vertical_segment(
					(height - thickness)/2 + 2*thickness/3, height - 2*thickness/3, 0 + thickness/2,
					thickness),

			# left-top bar
			vertical_segment(
					0 + 2*thickness/3, (height + thickness)/2 - 2*thickness/3, 0 + thickness/2,
					thickness),

			# horizontal-middle-left bar
			horizontal_segment_caps(
					0 + 2*thickness/3, width/2 - thickness/10, height/2,
					thickness, LINE_CAP_START),

			# horizontal-middle-right bar
			horizontal_segment_caps(
					0 + width/2 + thickness/10, width - 2*thickness/3, height/2,
					thickness, LINE_CAP_END),

			# vertical-middle-top bar
			vertical_segment_caps(
					0 + thickness + thickness/4, height/2 - thickness/2 - thickness/4, width/2,
					thickness, LINE_CAP_NONE),

			# vertical-middle-bottom bar
			vertical_segment_caps(
					height/2 + thickness/2 + thickness/4, height - thickness - thickness/4, width/2,
					thickness, LINE_CAP_NONE),

			# diagonal-left-bottom bar
			diagonal_segment(
					0 + thickness + thickness/5, width/2 - thickness/2 - thickness/5,
					height/2 + thickness/2 + thickness/4, height - thickness - thickness/4,
					thickness, mirror=True),

			# diagonal-left-top bar
			diagonal_segment(
					0 + thickness + thickness/5, width/2 - thickness/2 - thickness/5,
					0 + thickness + thickness/4, height/2 - thickness/2 - thickness/4,
					thickness),

			# diagonal-right-top bar
			diagonal_segment(
					width/2 + thickness/2 + thickness/5, width - thickness - thickness/5,
					0 + thickness + thickness/4, height/2 - thickness/2 - thickness/4,
					thickness, mirror=True),

			# diagonal-right-bottom bar
			diagonal_segment(
					width/2 + thickness/2 + thickness/5, width - thickness - thickness/5,
					height/2 + thickness/2 + thickness/4, height - thickness - thickness/4,
					thickness),
		]
	] + [
		# Decimal Point / Dot
		transform(shear.translate(2720, 3800 - 0.7 * thickness), chamfered_rect(0, 0, thickness, 1.4 * thickness, thickness / 3)),
		# Underline
		transform(shear.translate(1385, 4550), chamfered_rect(0, 0, 1850, thickness, 60)),
	]

straight_segment_paths_led14seg = [pp(segment) for segment in straight_segments()]
straight_segment_paths_fip80b5r = [straight_segment_paths_led14seg[fip80b5r_from_led14seg_indexes[i]] for i in range(16)]

def draw_segments(thickness=300):
	print('<?xml version="1.0" encoding="UTF-8"?>')
	print(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="342" height="572" viewBox="0 0 3420 5720">')
	print(f'<rect x="0" y="0" width="3420" height="5720" fill="#f7f7f70f" stroke="none" />')

	for i, s in enumerate(straight_segments(thickness=thickness)):
		lvl = int(ceil(255 * (i / 17)))
		lvl = 3 * f'{lvl:02x}'
		print(indent(f'<path d="{pp(s)}" fill="#{lvl}" />', '\t'))

	print('</svg>')

def diagonals():
	print('<?xml version="1.0" encoding="UTF-8"?>')
	print(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{1000}" height="{400}" viewBox="0 0 {1000} {400}">')
	for i, thickness in enumerate([10, 30, 70]):
		dx = 10 + 200 * i
		s = diagonal_segment(dx, dx + 200, 20, 220, thickness, mirror=True)
		print(indent(f'<path fill="black" d="{s}" />', '\t\t'))

	print('</svg>')

def main():
	parser = ArgumentParser()
	parser.add_argument('thickness', type=int, default=300)
	parser.add_argument('-D', '--debug', action='store_true', default=False)
	# parser.add_argument('-fs', '--fontsize', default=1.4)

	args = parser.parse_args()

	set_debug(args.debug)
	draw_segments(args.thickness)

if __name__ == '__main__':
	main()	# print(',\n'.join([f'"{s}"' for s in straight_segment_paths_fip80b5r]))



