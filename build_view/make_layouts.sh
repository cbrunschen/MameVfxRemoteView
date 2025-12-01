#!/bin/bash

# Build MAME layout files suitable for submmitting into the MAME codebase.

DIR=$(dirname $(readlink -f $0))
PRG="${DIR}/build_view.py"

OUTPUT=src/mame/layout
while getopts o: name
do
    case $name in
    o) OUTPUT="${OPTARG}";;
    ?) printf "Usage: %s: [-o mame-layout-directory] <build-view.py flags>\n" $0
       exit 2;;
    esac
done

for K in vfx vfxsd sd1 sd132; do
  ${PRG} -l ${K} > "${OUTPUT}/${K}.lay"
done
