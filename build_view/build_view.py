#!/usr/bin/env python3

from sys import argv, stderr, exit
from argparse import ArgumentParser, BooleanOptionalAction

from view import *
from view_builders import *
from mame_layout import *
from js_html import *
import util
import render

def main():
  parser = ArgumentParser()
  group = parser.add_mutually_exclusive_group()
  group.add_argument('-l', '--layout', choices=['vfx','vfxsd','sd1','sd132'])
  group.add_argument('-js', '--javascript', action='store_true')
  parser.add_argument('-io', '--io-port-prefix', type=str, default="")
  parser.add_argument('-rl', '--real-logos', action=BooleanOptionalAction, default=False)
  parser.add_argument('-f', '--fonts', action=BooleanOptionalAction, default=False)
  parser.add_argument('-hc', '--hexcolors', action=BooleanOptionalAction, default=False)
  parser.add_argument('-tp', '--text-paths', action=BooleanOptionalAction, default=False)
  parser.add_argument('-s', '--segments', choices=['default','straight','real'], default='default')
  parser.add_argument('-D', '--debug', action='store_true', default=False)
  parser.add_argument('-tr', '--text-renderer', choices=render.choices, default=render.choices[0])
  parser.add_argument('-ido', '--include-display-only', action=BooleanOptionalAction, default=False)
  # parser.add_argument('-fs', '--fontsize', default=1.4)

  args = parser.parse_args()
  util.set_debug(args.debug)
  render.configure(args.text_renderer)

  visitor = None
  if args.javascript:
    visitor = HTMLJSVisitor(
      text_paths=args.text_paths,
      segments=args.segments
    )
  elif args.layout:
    visitor = MameLayoutVisitor(
      args.layout, args.io_port_prefix, 
      fonts=args.fonts, 
      hexcolors=args.hexcolors, 
      text_paths=args.text_paths,
      segments=args.segments
    )
  
  views = {
    'Full': FullViewBuilder,
    'Compact': CompactViewBuilder,
    'Panel': PanelViewBuilder,
    'Tablet': TabletViewBuilder,
  }

  if args.include_display_only:
    views['Display'] = DisplayOnlyViewBuilder
  
  if visitor:
    for name, builder_class in views.items():
      builder = builder_class(name)
      visitor.visitView(builder.withRealLogos(args.real_logos).build())
    print(visitor)
  else:
    eprint(f'No visitor specified!')
    parser.print_usage(stderr)

# eprint(f"colors_by_name: {colors_by_name}")
# for color in colors:
#   eprint(f"Have color {color}")
#   eprint(f"  colors_by_name['{color.name}'] = {colors_by_name[color.name]}")
#   eprint(f"  Color.get('{color.name}') = {Color.get(color.name)}")

if __name__ == '__main__':
  exit(main())
