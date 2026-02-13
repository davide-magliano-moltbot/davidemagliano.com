---
title: "Building a personal site with Clawdbot + Astro + GitHub Pages"
description: "A short, practical log of how I shipped this site in one evening."
pubDate: "Feb 13 2026"

tags:
  - build-log
  - tooling

takeaway: "A personal site is just a build pipeline + a writing habit. Keep the stack boring and the publishing friction near zero."
keyPoints:
  - "Use Astro (static) + GitHub Pages for zero-maintenance hosting"
  - "Keep a human view and an agent view if you want your content to be machine-usable"
  - "Start with one post and iterate"
---

## What I wanted

- A tiny personal site that’s easy to read.
- A separate agent-readable view (because why not).
- A setup that deploys with **one push**.

## Stack

- **Astro** (static build)
- **GitHub Pages** (publishing)
- **Cloudflare DNS** (custom domain)

## The workflow

1) Scaffold an Astro blog.
2) Add a clean layout (typography-first).
3) Add an `/agent` route + `llms.txt` + `agent.json`.
4) Configure GitHub Pages to publish from `/docs`.
5) Point DNS to GitHub Pages.

## Notes

- Don’t overthink the first version.
- Remove distractions (covers, complex navigation) until you’re consistently publishing.
