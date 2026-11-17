Firebase Auth's sign-in helper, self-hosted so Google's sign-in screen names
challenge.dietcokeman.com instead of dietcokeman-12f1e.firebaseapp.com.

Copied unmodified from https://dietcokeman-12f1e.firebaseapp.com/__/auth/
(handler, handler.js, experiments.js, iframe, iframe.js). `handler` and
`iframe` are saved as .html so GitHub Pages serves them as pages at
/__/auth/handler and /__/auth/iframe. `.nojekyll` in the repo root is what lets
GitHub Pages serve a folder whose name starts with an underscore.

Refresh these occasionally (Firebase updates them); see CLAUDE.md §11.
