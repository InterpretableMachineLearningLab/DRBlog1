#!/usr/bin/env bash
# One-shot deploy for the Interpretable ML Lab site.
#
# Run from the dr-blog repo root:
#   bash scripts/deploy.sh
#
# What it does:
#   1. `npm run build` — regenerates public/rss.xml + public/sitemap.xml
#      and produces a fresh static export in out/.
#   2. Re-inits out/ as its own git repo (because `next build` wipes the
#      previous one on every build) and force-pushes it to the org site
#      repo at InterpretableMachineLearningLab.github.io.
#
# You need write access to that repo. If your git credential helper doesn't
# have it cached the first push will prompt.

set -euo pipefail

SITE_REPO="https://github.com/InterpretableMachineLearningLab/InterpretableMachineLearningLab.github.io.git"
COMMIT_MSG="${1:-Deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)}"

# Move to the repo root regardless of where the user invoked us from.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "▸ Building static export ..."
npm run build

if [ ! -d out ]; then
  echo "✗ next build did not produce out/ — aborting." >&2
  exit 1
fi

echo "▸ Preparing out/ for deploy ..."
cd out
rm -rf .git
git init -q -b main
touch .nojekyll                # tell GitHub Pages not to run Jekyll

echo "▸ Committing ..."
git add -A
git -c user.name="Deploy bot" -c user.email="deploy@example.com" \
    commit -q -m "$COMMIT_MSG"

echo "▸ Pushing to $SITE_REPO ..."
git remote add origin "$SITE_REPO"
git push -f -q origin main

echo "✓ Deployed. Site should refresh at https://interpretablemachinelearninglab.github.io/ within ~30s."
