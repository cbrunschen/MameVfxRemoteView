#!/bin/bash

# Build MAME layout files suitable for submmitting into the MAME codebase.

DIR=$(dirname $(readlink -f $0))
PRG="${DIR}/build_view.py"

# Activate the virtual environment
. ${DIR}/.venv/bin/activate

# A place for default options
OPTS=()

OUTPUT=src/mame/layout
while getopts bo:- name
do
    case $name in
    b) OPTS=();;
    o) OUTPUT="${OPTARG}";;
    -) break;;
    ?) printf "Usage: %s: [-o mame-layout-directory] [-b] [-- <build_view.py flags>]\n" $0
       exit 2;;
    esac
done

shift $(($OPTIND - 1))

for K in vfx vfxsd sd1 sd132; do
  ${PRG} -l ${K} ${OPTS[@]} $@ > "${OUTPUT}/${K}.lay"
done
