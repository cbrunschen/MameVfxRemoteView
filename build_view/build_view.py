#!/usr/bin/env python3

from textwrap import indent, dedent, wrap
from dataclasses import dataclass, field
from sys import argv, exit
from argparse import ArgumentParser

from view import *
from view_builders import *
from mame_layout import *
from js_html import *
from util import DEBUG

def main():
  parser = ArgumentParser()
  group = parser.add_mutually_exclusive_group()
  group.add_argument('-l', '--layout', choices=['vfx','vfxsd','sd1'])
  group.add_argument('-js', '--javascript', action='store_true')
  parser.add_argument('-io', '--io_port_prefix', type=str, default="")
  parser.add_argument('--debug', action='store_true', default=False)
  # parser.add_argument('-fs', '--fontsize', default=1.4)

  args = parser.parse_args()
  DEBUG = args.debug

  visitor = None
  if args.javascript:
    visitor = HTMLJSVisitor()
  elif args.layout:
    visitor = MameLayoutVisitor(args.layout, args.io_port_prefix)
  
  views = {
    'panel': PanelBuilder,
    'square_panel': SquarePanelBuilder,
  }
  
  if visitor:
    for builder_class in views.values():
      builder = builder_class(visitor.defaultFontSize())
      visitor.visitView(builder.build())
    print(visitor)
  else:
    eprint(f'No visitor specified!')
    parser.print_usage(stderr)

if __name__ == '__main__':
  exit(main())
