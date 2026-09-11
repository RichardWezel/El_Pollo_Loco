#!/bin/sh
# Commit + push to GitHub, then upload the changed files to the web server via git-ftp.
# Usage: ./up.sh "Commit-Nachricht"
set -e
if [ -z "$*" ]; then
    echo "Bitte eine Commit-Nachricht angeben: ./up.sh \"Nachricht\""
    exit 1
fi
git pull
git add .
git commit -m "$*"
git push
git ftp push --verbose 2>&1 | tail -n 25
