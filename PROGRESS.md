# Site Progress (Clawdbot)

Goal: Make **human** + **agent** views feel cohesive, professional-dev, and pixel-safe on mobile.

## Non-goals / constraints
- No oversharing personal details.
- No “AI slop” visuals.
- Agent view should be *more minimal* than human view.
- Avoid blue-tinted page backgrounds.

## QA checklist (every iteration)
- [ ] No horizontal overflow on **mobile** (390x844) for: /, /about, /blog, /agent
- [ ] Header mode toggle usable and intentional on mobile
- [ ] Dark mode contrast ok (header links visible)
- [ ] Consistent spacing/typography across pages
- [ ] Agent view clearly more minimal than human view

## Current known issues / hypotheses
- Possible remaining overflow sources: long URLs in agent view, code/pre, header wrapping edge cases.
- Background vibe: gradient can read “blue-ish” depending on monitor.

## Change log

### 2026-02-13
- Implemented Human/Agent toggle + agent endpoints.
- Removed covers; reduced content to single post.
- Tightened typography and layout; mono-forward direction.
- Mobile overflow hardening; agent kv grid responsive.

## Next steps
1) Neutralize background gradient (remove blue vibe)
2) Unify component-level widths (only global container sizing)
3) Final pass on agent view minimal theme (less surface tint, less decoration)
## 2026-02-13

- Fixed potential mobile header overflow: title now truncates and nav grid uses minmax(0,1fr).
- Added safe-area padding for header on mobile to avoid right-edge clipping (esp. iOS).
- Neutralized dark-mode palette further (removed cool/blue cast from muted/border/surfaces).
- Agent view: URLs no longer wrap into unreadable fragments; they scroll horizontally within the value cell.
- Rebuilt docs.
