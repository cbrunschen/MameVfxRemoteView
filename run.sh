#&/bin/bash

export CMAKE_INSTALL_PREFIX=out/install/clang20
export CMAKE_C_COMPILER=/usr/bin/clang
export CMAKE_CXX_COMPILER=/usr/bin/clang++
export CMAKE_BUILD_TYPE=Debug
export OUT=out/build/clang20

cmake \
  -DCMAKE_INSTALL_PREFIX=${CMAKE_INSTALL_PREFIX}   \
  -DCMAKE_C_COMPILER=${CMAKE_C_COMPILER}           \
  -DCMAKE_CXX_COMPILER=${CMAKE_CXX_COMPILER}       \
  -DCMAKE_BUILD_TYPE=${CMAKE_BUILD_TYPE}           \
  -S . -B ${OUT} \
&& \
cmake --build ${OUT} -- -j16 \
&& \
${OUT}/MameVfxRemoteView $@