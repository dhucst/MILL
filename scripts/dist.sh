#!/bin/bash

set -e -x

# cleaning outdated distributions.
rm -rf dist
mkdir dist

# packaging binaries with pkg.
npx pkg -t node8-linux-x64,node8-linux-x86,node8-macos-x64,node8-macos-x86,node8-win-x64,node8-win-x86 .

make_tarball() {
  binary=$1
  tarball_name=$2

  mv $binary MILL
  tar -czvf dist/$tarball_name MILL
  rm MILL
}

make_win_tarball() {
  binary=$1
  tarball_name=$2

  # we have to keep .exe suffix here.
  mv $binary MILL.exe
  tar -czvf dist/$tarball_name MILL.exe
  rm MILL.exe
}

make_tarball MILL-linux-x64 MILL-linux-x64.tar.gz
make_tarball MILL-linux-x86 MILL-linux-x86.tar.gz
make_tarball MILL-macos-x64 MILL-macos-x64.tar.gz
make_tarball MILL-macos-x86 MILL-macos-x86.tar.gz
make_win_tarball MILL-win-x64.exe MILL-win-x64.tar.gz
make_win_tarball MILL-win-x86.exe MILL-win-x86.tar.gz
