# Walkthrough - Page-Flow Support Wizard

We have refactored the Guided Support Flow into a completely new, nested page routing structure under `/support/*`. This satisfies the constraint of leaving all homepage files completely untouched, while providing a modular routing layout where each step occupies its own page subpath.

---

## 🛠️ Nested Route Layout

We scaffolded these page files within Next.js App Router:
- `/src/app/support/layout.tsx`: Houses the shared `SupportFlowProvider` context. Ensures all subpages contain a matching sticky navigation header and footer.
- `/src/app/support/page.tsx`: Automatically server-side redirects users to `/support/step-1`.
- `/src/app/support/step-1/page.tsx`: **Step 1 (Situation)** selection cards grid. Toggles `situation` state context. Continues to `/support/step-2`.
- `/src/app/support/step-2/page.tsx`: **Step 2 (Goals)** selection cards grid. Toggles `goal` state context. Back links to `/support/step-1`, Continue links to `/support/step-3`.
- `/src/app/support/step-3/page.tsx`: **Step 3 (Preferred Communication)** checkboxes. Toggles `commMethods` array. Back links to `/support/step-2`, Continue links to `/support/results`.
- `/src/app/support/results/page.tsx`: Matches recommendations based on context answers, flags Best Match badge, and opens the adaptive callback booking modal.

### Unmodified Homepage (CTA Redirects)
To ensure the homepage button takes users into the Support Wizard without modifying homepage layout files, we configured `/src/app/guided-support/page.tsx` (the previous endpoint path) to client-side redirect immediately to the new wizard page `/support/step-1`.

### Page Transitions
Each subpage content is wrapped inside `<AnimatePage />` (utilizing Framer Motion) to perform entry slide-in transitions on route load. Toggling "Reduced Motion" inside settings disables animation timing instantly for safety.

---

## 🔬 Compilation Checks

Run production build checks successfully compiled nested route targets statically:
```bash
▲ Next.js 16.2.10 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 3.1s
  Running TypeScript ...
  Finished TypeScript in 2.3s ...
  Collecting page data using 11 workers ...
  Generating static pages using 11 workers (0/10) ...
✓ Generating static pages using 11 workers (10/10) in 719ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /guided-support
├ ○ /support
├ ○ /support/results
├ ○ /support/step-1
├ ○ /support/step-2
└ ○ /support/step-3

○  (Static)  prerendered as static content
```

---

## 🖥️ Browser Interactions & State Persistence

The browser subagent completed verification of:
1. Homepage CTA redirects to `/support/step-1`.
2. Selecting Step 1 and continuing to Step 2.
3. Clicking **Go Back** on Step 2 to return to Step 1: verifying that the user's previously selected situation was successfully preserved in context.
4. Continuing forward, selecting options, and reviewing matched results: verifying **Deaf Wellness Counselling** receives the "⭐ Best Match" badge.

**Route Wizard Flow Recording:**
![Interactive Page Wizard Flow Verification Recording](/C:/Users/krish/.gemini/antigravity-ide/brain/7cf52654-2259-470e-998b-ccc20b16f228/route_wizard_flow_1784450370979.webp)
