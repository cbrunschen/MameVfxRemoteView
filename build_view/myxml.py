#!/usr/bin/env python

from dataclasses import dataclass, field
from textwrap import indent
from typing import Sequence

@dataclass
class Document:
  root: 'Element'

  def __str__(self):
    return f'<?xml version="1.0"?>\n{self.root}'

@dataclass
class Element:
  tag: str
  attrs: dict[str, str] = field(default_factory=dict)
  children: list['Element|CDATA|Space|Comment'] = field(default_factory=list)

  def __post_init__(self):
    # Make sure we have our own copies.
    self.attrs = self.attrs.copy()
    self.children = self.children.copy()

  def append(self, i):
    if (i == self):
      raise Exception(f"{self.tag}: Appending self")
    self.children.append(i)
  
  def extend(self, l: Sequence['Element|CDATA|Space|Comment']):
    for i in l:
      self.append(i)
    return self
  
  def __format__(self, spec:str):
    short = 's' in spec
    items = [ f'<{self.tag}' ]
    if self.attrs is not None:
      items.extend([f' {k}="{v}"' for (k,v) in self.attrs.items() if v is not None])

    n_children = len(self.children)
    if n_children > 0:
      if (n_children == 1) and short:
        items.append('>')
        child = format(self.children[0], spec).strip()
        items.append(child)
        items.append(f'</{self.tag}>\n')
      else:
        items.append('>\n')
        items.extend([indent(format(child, spec), '\t') for child in self.children])
        items.append(f'</{self.tag}>\n')

    else:
      items.append(' />\n')
    
    return ''.join(items)

  def __str__(self):
    return self.__format__('')


@dataclass
class CDATA:
  contents: str

  def __str__(self):
    parts = self.contents.split(']]>')
    escaped = ']]>]]><[CDATA['.join(parts).strip()
    return f'<![CDATA[\n{indent(escaped, '\t')}\n]]>'

@dataclass
class Space:
  n: int = 1

  def __str__(self):
    return '\n'.join(['' for i in range(self.n + 1)])


@dataclass
class Comment:
  contents: str

  def __str__(self):
    return f'<!-- {self.contents.replace("--", "==")} -->\n'