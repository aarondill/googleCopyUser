#! /usr/bin/env bash
# Warning, only works if called by a file path!!
rootfolder=$(realpath -- "$(dirname -- "$0")")
rootfoldername=$(basename -- "$rootfolder")
err() { printf '%s\n' "$@" >&2; }
abort() {
  err "$1"
  exit "${2:-1}"
}
has() { command -v -- "$1" >/dev/null 2>&1; }
if ! [ -d "$rootfolder" ]; then
  abort 'Something went wrong when finding your file. This can only be called with a file path.' 1
fi

cmds=(
  "${GOOGLE_CHROME:-}" # allow user to override
  google-chrome google-chrome-stable chromium
  chromium-browser vivaldi brave opera
)
chrome=
for f in "${cmds[@]}"; do
  if has "$f"; then
    chrome="$f"
    break
  fi
done

if [ -z "$chrome" ]; then
  abort "Couldn't find chrome executable to package extension. Try setting the GOOGLE_CHROME environment variable or check if you have it installed." 2
fi

keyfile=$rootfolder/$rootfoldername.pem
if [[ -f "$keyfile" ]]; then
  # Key file exists at root file
  "$chrome" --pack-extension="$rootfolder/src" --pack-extension-key="$keyfile" || exit
else
  # No key file is present
  "$chrome" --pack-extension="$rootfolder/src" || exit
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
