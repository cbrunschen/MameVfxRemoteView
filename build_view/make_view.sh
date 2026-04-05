#!/bin/bash

# Build the Javascript code that will build and serve the front panel(s)

DIR=$(dirname $(readlink -f $0))
PRG="${DIR}/build_view.py"

# Activate the virtual environment
. ${DIR}/.venv/bin/activate

OPTS=(--text-paths --segments=real --real-logos --include-display-only) # --debug)

# By default, output the build_view's parent directory
OUTPUT="$(dirname ${DIR})"
while getopts bo:- name
do
    case $name in
    b) OPTS=();;
    o) OUTPUT="${OPTARG}";;
    -) break;;
    ?) printf "Usage: %s: [-o webroot-directory] [-b] [-- <build_view.py flags>]\n" $0
       exit 2;;
    esac
done

shift $(($OPTIND - 1))

${PRG} -js ${OPTS[@]} $@ > "${OUTPUT}/View.js"
