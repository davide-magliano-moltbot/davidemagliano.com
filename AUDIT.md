# Davide Site Audit

1. **Agent mode detection ignores base path**
Severity: Medium
Symptom: On sub-path deployments (preview or GitHub Pages project sites), the toggle can show Human as active even while on `/agent`, because `pathname` still includes the base path.
Location: `src/components/Header.astro:5`, `src/components/Header.astro:6`
Fix: Normalize the path the same way as `HeaderLink` (strip `import.meta.env.BASE_URL`) before checking for agent mode.

2. **Agent mode detection is too broad**
Severity: Low
Symptom: Any route that starts with `/agent` (e.g., `/agents`, `/agentic`) would incorrectly mark the Agent toggle as active.
Location: `src/components/Header.astro:6`
Fix: Use a stricter check like `pathname === '/agent' || pathname.startsWith('/agent/')`.

3. **Mode toggle does not preserve context**
Severity: Medium
Symptom: Switching modes always jumps to `/` or `/agent`, losing the current page context (e.g., from `/blog/...` back to home).
Location: `src/components/Header.astro:20`, `src/components/Header.astro:25`
Fix: Preserve the current path when switching (e.g., pass the current path as a query param, or map to an agent version if one exists).

4. **Active toggle state is not announced to screen readers**
Severity: Medium
Symptom: The active mode is only conveyed visually via CSS; assistive tech gets no state.
Location: `src/components/Header.astro:19`, `src/components/Header.astro:27`
Fix: Add `aria-current="page"` to the active link or convert to a `radiogroup` pattern with `aria-checked`.

5. **“sr-only” labels are fully hidden**
Severity: Low
Symptom: The longer “I am a human/agent” labels never reach screen readers because `.mode-long` is `display: none`.
Location: `src/components/Header.astro:21`, `src/components/Header.astro:131`
Fix: Remove `display: none` from `.mode-long` or replace with `aria-label` on the link and set the visible text to `aria-hidden="true"`.

6. **Toggle focus ring is clipped**
Severity: Medium
Symptom: The focus outline on toggle links can be cut off by the parent’s `overflow: hidden`, especially on mobile.
Location: `src/components/Header.astro:106`, `src/components/Header.astro:141`
Fix: Use `:focus-visible` styles that draw inside (e.g., `box-shadow`), or set `overflow: visible` and clip via another method.

7. **Primary nav lacks an aria label**
Severity: Low
Symptom: On the home page there are multiple `<nav>` landmarks, but the header nav isn’t labeled, so screen readers announce multiple “navigation” regions without distinction.
Location: `src/components/Header.astro:10`, `src/pages/index.astro:138`
Fix: Add `aria-label="Primary"` (or similar) to the header `<nav>`.

8. **Heading order is inconsistent**
Severity: Low
Symptom: The header uses an `h2` before the page’s `h1`, which produces an odd document outline for assistive tech.
Location: `src/components/Header.astro:11`
Fix: Use a non-heading element for the site title (e.g., `p`) or conditionally render `h1` only on the home page.

9. **Active nav links lack aria-current**
Severity: Low
Symptom: Active state is only visual; screen readers can’t tell which page is current in the primary nav.
Location: `src/components/HeaderLink.astro:12`, `src/components/HeaderLink.astro:22`
Fix: Add `aria-current={isActive ? 'page' : undefined}` to the anchor.

10. **Footer link text is wrong in Agent view**
Severity: Low
Symptom: The footer always reads “Agent view,” even when you are already in Agent view.
Location: `src/components/Footer.astro:5`, `src/components/Footer.astro:7`
Fix: Pass mode into the footer and swap the label/href (e.g., “Human view” → `/`).

11. **Footer hover color breaks Agent styling**
Severity: Low
Symptom: Agent mode is meant to use neutral link styling, but the footer reintroduces the accent color on hover.
Location: `src/components/Footer.astro:17`, `src/styles/global.css:253`
Fix: Override footer hover color in Agent mode (or inherit the agent-mode link styles).

12. **data-mode is duplicated across pages/layouts**
Severity: Medium
Symptom: `data-mode="human"` is repeated in multiple files. This is easy to forget when adding new pages and can drift from header logic.
Location: `src/pages/index.astro:130`, `src/pages/about.astro:37`, `src/pages/blog/index.astro:81`, `src/layouts/BlogPost.astro:85`
Fix: Centralize `data-mode` in a layout and derive it from the current route (or pass a prop).

13. **Doctype is inconsistent**
Severity: Low
Symptom: Some pages declare `<!doctype html>` while others don’t, creating inconsistent markup and potential quirks-mode risk if defaults ever change.
Location: `src/pages/agent.astro:10`, `src/layouts/BlogPost.astro:14`
Fix: Add `<!doctype html>` consistently (ideally via a shared layout).

14. **Mixed trailing slash usage across routes**
Severity: Medium
Symptom: Links mix `/blog` with `/blog/${id}/` and `/agent`. Depending on host rules this can cause duplicates or extra redirects.
Location: `src/components/Header.astro:14`, `src/pages/index.astro:148`, `src/pages/blog/index.astro:92`, `src/pages/agent.astro:81`
Fix: Pick a single trailing-slash strategy and normalize all internal links.

15. **Trailing-slash behavior is implicit in config**
Severity: Medium
Symptom: `astro.config.mjs` doesn’t set `trailingSlash`, so the output for `/agent` vs `/agent/` depends on defaults and could change between Astro versions.
Location: `astro.config.mjs:8`, `astro.config.mjs:11`
Fix: Explicitly set `trailingSlash: 'always'` (or `'never'`) and align links/canonical URLs.

16. **Canonical URL doesn’t normalize trailing slashes**
Severity: Low
Symptom: Canonicals can diverge from actual URLs when trailing slashes vary, causing duplicate SEO signals.
Location: `src/components/BaseHead.astro:15`, `src/components/BaseHead.astro:48`
Fix: Normalize the canonical URL based on your chosen trailing-slash policy.

17. **Agent key/value block is not semantic**
Severity: Low
Symptom: The Identity block uses generic `<div>` pairs, which aren’t announced as key/value relationships by screen readers.
Location: `src/pages/agent.astro:76`, `src/pages/agent.astro:85`
Fix: Use a `<dl>` with `<dt>`/`<dd>` pairs or a small table.

18. **Agent section labels aren’t headings**
Severity: Low
Symptom: The “Identity/Topics/Notes” labels are plain `div`s, which reduces navigability for assistive tech.
Location: `src/pages/agent.astro:76`, `src/pages/agent.astro:100`
Fix: Use `h2`/`h3` elements with the same styles.

19. **Global overflow clipping can hide focus rings**
Severity: Low
Symptom: `overflow-x: clip` on `html, body` can cut off focus outlines at the viewport edges (notably the header toggle on mobile).
Location: `src/styles/global.css:75`, `src/styles/global.css:151`
Fix: Avoid `overflow-x: clip` globally or switch focus styles to inset box-shadows.
