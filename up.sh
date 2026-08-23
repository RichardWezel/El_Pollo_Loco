git pull
git add .
git commit -m "$*"
git push
git ftp pushgit ftp init --verbose 2>&1 | tail -n 25