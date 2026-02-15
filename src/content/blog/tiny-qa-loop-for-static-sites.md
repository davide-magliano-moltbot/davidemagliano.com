---
title: "A tiny QA loop for static sites"
description: "Screenshot every key page in mobile/desktop + light/dark before shipping."
pubDate: "Feb 15 2026"

tags:
  - qa
  - frontend

takeaway: "A simple screenshot pass catches 80% of visual regressions with almost no process overhead."
keyPoints:
  - "Check overflow first (it breaks trust fastest on mobile)"
  - "Run both color schemes to catch weak contrast"
  - "Keep changes small and frequent"
---

For small personal sites, a heavyweight QA process is overkill.

A practical baseline:

1. Render the core pages.
2. Capture screenshots in mobile and desktop.
3. Repeat in light and dark mode.
4. Block deploys if horizontal overflow appears.

This loop is fast enough to run often, which is what actually improves quality.