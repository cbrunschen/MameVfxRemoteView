#!/usr/bin/env python3

from sys import argv, exit
from argparse import ArgumentParser, BooleanOptionalAction

from math import ceil, sqrt
from util import fnum, dprint, set_debug
from textwrap import indent
from geom import Matrix
from typing import cast

from vfd import segment_paths_led14seg_order
from straight_segments import straight_segments

def fn(v):
	# return fnum(v, 1)
	return str(int(round(v)))

def pp(ps: list[tuple[float,float]]) -> str:
	return f'M{fn(ps[0][0])},{fn(ps[0][1])}' + ''.join([f'l{fn(x-px)},{fn(y-py)}' for ((px, py), (x,y)) in zip(ps[:-1], ps[1:])]) + ' Z'

def draw_comparison(thickness:int, middle:float):
	print('<?xml version="1.0" encoding="UTF-8"?>')
	print(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="342" height="572" viewBox="0 0 3420 5720">')
	print(f'<rect x="0" y="0" width="3420" height="5720" fill="#f7f7f70f" stroke="none" />')

	for i, s in enumerate(straight_segments(thickness=thickness, middle=middle)):
		print(indent(f'<path d="{pp(s)}" fill="red" fill-opacity="50%"/>', '\t'))

	for i, s in enumerate(segment_paths_led14seg_order):
		print(indent(f'<path d="{s}" fill="green" fill-opacity="50%"/>', '\t'))

	print('</svg>')


def main():
	parser = ArgumentParser()
	parser.add_argument('thickness', type=int, default=300)
	parser.add_argument('middle', type=float, default=1./2.)

	args = parser.parse_args()

	draw_comparison(args.thickness, args.middle)

if __name__ == '__main__':
	main()	# print(',\n'.join([f'"{s}"' for s in straight_segment_paths_fip80b5r]))

