#!/bin/bash

# Build MAME layout files suitable for use as external artwork,
# with text rendered as paths, and including real(istic) logos.
# Also accepts further flags or arguments to be passed to build_view.py.

DIR=$(dirname $(readlink -f $0))
PRG="${DIR}/build_view.py"

# Activate the virtual environment
. ${DIR}/.venv/bin/activate

COMPRESS=true
OUTPUT=artwork
while getopts no: name
do
    case $name in
    n)  COMPRESS=false;;
    o)  OUTPUT="${OPTARG}";;
    ?)  printf "Usage: %s: [-o artwork-directory] <build-view.py flags>\n" $0
        exit 2;;
    esac
done

shift $(($OPTIND - 1))

for K in vfx vfxsd sd1 sd132; do
  mkdir -p "${OUTPUT}/${K}"
  ${PRG} -l ${K} -io 'panel:' --text-paths --segment-paths --real-logos $@ > "${OUTPUT}/${K}/${K}.lay"
  if [[ $COMPRESS = "true" ]]; then
    pushd "${OUTPUT}"
    zip -r "${K}.zip" "${K}"
    popd
    rm "${OUTPUT}/${K}/${K}.lay"
    rmdir "${OUTPUT}/${K}"
  fi
done
