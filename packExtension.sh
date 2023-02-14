#! /usr/bin/env bash
# Warning, only works if called by a file path!!
rootfolder=$(realpath -- "$(dirname -- "$0")")
rootfoldername=$(basename -- "$rootfolder")
if ! [[ -d $rootfolder ]]; then
    printf 'Something went wrong when finding your file. This can only be called with a file path'
fi

keyfile=$rootfolder/$rootfoldername.pem
if [[ -f "$keyfile" ]]; then
  # Key file exists at root file
  google-chrome --pack-extension="$rootfolder/src" --pack-extension-key="$keyfile" || exit
else
  # No key file is present
  google-chrome --pack-extension="$rootfolder/src" || exit
fi

distfolder=$rootfolder/dist
# Move files to dist folder
if ! [[ -d "$distfolder" ]]; then
  mkdir "$distfolder"
fi

mv "$rootfolder/src.crx" "$distfolder/$rootfoldername.crx"

if [[ -f "$rootfolder/src.pem" ]]; then
  mv "$rootfolder/src.pem" "$rootfolder/$rootfoldername.pem"
fi
