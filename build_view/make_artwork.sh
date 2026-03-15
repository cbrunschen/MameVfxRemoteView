#!/bin/bash

# Build MAME layout files suitable for use as external artwork,
# with text rendered as paths, and including real(istic) logos.
# Also accepts further flags or arguments to be passed to build_view.py.

DIR=$(dirname $(readlink -f $0))
PRG="${DIR}/build_view.py"

# Activate the virtual environment
. ${DIR}/.venv/bin/activate

OPTS=(--text-paths --segments=real --real-logos) # --debug)

COMPRESS=true
OUTPUT=artwork
while getopts bno:- name
do
    case $name in
    b) OPTS=();;
    n) COMPRESS=false;;
    o) OUTPUT="${OPTARG}";;
    -) break;;
    ?) printf "Usage: %s: [-o artwork-directory] [-n] [-b] [-- <build_view.py flags>]\n" $0
       exit 2;;
    esac
done

shift $(($OPTIND - 1))

for K in vfx vfxsd sd1 sd132; do
  mkdir -p "${OUTPUT}/${K}"
  ${PRG} -l ${K} -io 'panel:' ${OPTS[@]} $@ > "${OUTPUT}/${K}/${K}.lay"
  if [[ $COMPRESS = "true" ]]; then
    pushd "${OUTPUT}"
    zip -r "${K}.zip" "${K}"
    popd
    rm "${OUTPUT}/${K}/${K}.lay"
    rmdir "${OUTPUT}/${K}"
  fi
done
