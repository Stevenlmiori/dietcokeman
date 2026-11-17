#!/bin/sh
# Stamp a fresh ?v= on the shared assets so a deploy can't be served from cache.
# Run this before every commit that touches style.css, engine.js, quizzes.js or account.js.
set -e
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M%S)
sed -i '' -E "s#(style\.css|quizzes\.js|engine\.js|account\.js)\?v=[0-9]+#\1?v=$V#g" index.html play.html profile.html
echo "assets stamped v=$V"
