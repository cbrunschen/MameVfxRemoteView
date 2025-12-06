#!/bin/bash

# Build MAME layout files suitable for submmitting into the MAME codebase.

DIR=$(dirname $(readlink -f $0))
PRG="${DIR}/build_view.py"

# Activate the virtual environment
. ${DIR}/.venv/bin/activate

# By default, output the build_view's parent directory
OUTPUT=$(dirname ${DIR})
while getopts o: name
do
    case $name in
    o) OUTPUT="${OPTARG}";;
    ?) printf "Usage: %s: [-o webroot-directory] <build-view.py flags>\n" $0
       exit 2;;
    esac
done

shift $(($OPTIND - 1))

${PRG} -js $@ > "${OUTPUT}/View.js"
