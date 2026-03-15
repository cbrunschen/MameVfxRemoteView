#!/bin/bash

# Build MAME layout files suitable for submmitting into the MAME codebase.

DIR=$(dirname $(readlink -f $0))
PRG="${DIR}/build_view.py"

# Activate the virtual environment
. ${DIR}/.venv/bin/activate


OUTPUT=src/mame/layout
while getopts o:- name
do
    case $name in
    o) OUTPUT="${OPTARG}";;
    -) break;;
    ?) printf "Usage: %s: [-o mame-layout-directory] [-- <build_view.py flags>]\n" $0
       exit 2;;
    esac
done

shift $(($OPTIND - 1))

for K in vfx vfxsd sd1 sd132; do
  ${PRG} -l ${K} $@ > "${OUTPUT}/${K}.lay"
done
