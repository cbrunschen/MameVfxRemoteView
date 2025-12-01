#!/bin/bash

# Build MAME layout files suitable for use as external artwork,
# with text rendered as paths, and including real(istic) logos.
# Also accepts further flags or arguments to be passed to build_view.py.

DIR=$(dirname $(readlink -f $0))
PRG="${DIR}/build_view.py"

OUTPUT=artwork
while getopts o: name
do
    case $name in
    o)    OUTPUT="${OPTARG}";;
    ?)   printf "Usage: %s: [-o artwork-directory] <build-view.py flags>\n" $0
          exit 2;;
    esac
done

shift $(($OPTIND - 1))

for K in vfx vfxsd sd1 sd132; do
  mkdir -p "${OUTPUT}/${K}"
  ${PRG} -l ${K} -io 'panel:' -tp -rl $@ > "${OUTPUT}/${K}/${K}.lay"
  pushd "${OUTPUT}"
  zip -r "${K}.zip" "${K}"
  popd
  rm "${OUTPUT}/${K}/${K}.lay"
  rmdir "${OUTPUT}/${K}"
done
