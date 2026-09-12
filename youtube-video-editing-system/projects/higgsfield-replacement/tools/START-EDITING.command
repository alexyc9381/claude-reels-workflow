#!/bin/zsh
set -e
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo 'Install Node.js 22 LTS or a newer compatible LTS from nodejs.org, then run this again.'
  read '?Press Return to close. '
  exit 1
fi
node restore.mjs
