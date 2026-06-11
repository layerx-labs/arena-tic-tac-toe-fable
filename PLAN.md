# PLAN.md — Arena Sprint: Tic-Tac-Toe

## Project: **"Tactic" — a crisp, zero-dependency tic-tac-toe with an unbeatable AI toggle**

One-line pitch: a fast-loading, single-file-architecture tic-tac-toe that nails the
fundamentals (correct win/draw logic, clear turn state, reset, winning-line highlight)
and adds one well-scoped bonus — an optional **vs-Computer mode powered by minimax**
(unbeatable) — all in vanilla HTML/CSS/JS with no build step and no dependencies.

The brief fixes WHAT we build; we win on **execution**: bug-free logic, clean readable
code, a genuinely incremental git history, instant deploy, and a sharp writeup.

---

## 1. Problem & target user

- **Problem:** The hackathon asks for a playable, correct, shipped tic-tac-toe.
  The real challenge is correctness + craft under a tiny scope.
- **Target user:** Two people at one keyboard/screen who want a quick game, or a
  single player who wants to test themselves against a perfect AI. Also: the judges,
  who need it to load instantly and work first try on any device.

## 2. Core features (in priority order)

### Must-have (eligibility / "It works" 40%)
1. 3×3 grid, click/tap to place; X and O alternate, X starts.
2. Turn indicator always visible ("X's turn" / "O's turn").
3. Win detection (all 8 lines) → status shows winner, **winning line highlighted**,
   board locks (no further moves).
4. Draw detection → clear "Draw" status.
5. **New Game / Reset** button (always available; resets board, keeps scores).
6. Self-contained static page — no backend, no login, loads instantly.

### Nice-to-have (bonus polish — only after must-haves are deployed & verified)
7. **Vs-Computer mode** (toggle: "2 Players" / "vs Computer"). Computer plays O
   using minimax → unbeatable. ~40 lines, fully unit-testable by hand.
8. Session scoreboard (X wins / O wins / draws), reset-scores button.
9. Keyboard accessibility: cells are real `<button>`s (free win), `aria-label`s,
   status region uses `aria-live="polite"`.
10. Light visual polish: subtle pop-in animation on placement, responsive layout
    (works on mobile), dark-friendly palette. CSS only — no libraries.

If time pressure hits, features 7–10 are cut in reverse order. Ship must-haves first.

## 3. Tech stack (each choice justified)

| Choice | Why |
|---|---|
| **Vanilla HTML + CSS + JS (ES modules not even needed — one `script.js`)** | Zero build step, zero dependencies, nothing to break; fastest possible load; judges can read 100% of the code. |
| **3 files: `index.html`, `style.css`, `script.js`** | Separation of concerns without framework overhead; readable diff-friendly history. |
| **GitHub Pages for deploy** | Free, public URL straight from the repo `main` branch — repo and demo are guaranteed in sync; nothing extra to configure or pay for. |
| **No framework / no bundler / no backend** | Brief explicitly says self-contained & fast; any framework adds risk and zero rubric value. |
| **Plain CSS Grid for the board** | 3×3 grid in ~5 lines; responsive by default. |

## 4. Architecture

- **Frontend (everything):**
  - `index.html` — semantic markup: header, status line (`aria-live`), 3×3 board of
    `<button>` cells, controls (New Game, mode toggle, scoreboard).
  - `style.css` — CSS Grid board, responsive sizing (`min(90vw, 420px)`), winning-line
    highlight class, small transitions.
  - `script.js` — clear separation of **pure game logic** from DOM:
    - State: `board` (array of 9: `'X' | 'O' | null`), `currentPlayer`, `gameOver`, `mode`, `scores`.
    - Pure functions: `checkWinner(board)` → `{winner, line} | null`; `isDraw(board)`;
      `minimax(board, player)` → best move (only used in vs-Computer mode).
    - DOM layer: render from state; event handlers mutate state then re-render.
    - This split keeps logic auditable and the code obviously correct.
- **Backend:** none (per brief).
- **Data:** in-memory only; (optional) scores in `localStorage` — only if trivial.
- **Deploy:** GitHub Pages from `main` branch root of
  `layerx-labs/arena-tic-tac-toe-fable`. Live URL will be
  `https://layerx-labs.github.io/arena-tic-tac-toe-fable/`.

## 5. Rubric mapping

| Criterion | Weight | How we score high |
|---|---|---|
| **It works** | 40 | Exhaustive manual test matrix before submitting: all 8 win lines for both X and O, full-board draw, clicks on occupied cells ignored, clicks after game over ignored, reset mid-game and post-game, AI never loses and never plays an occupied cell, mode switch resets cleanly. No build step = no deploy-time surprises. |
| **Craft** | 30 | Small pure-function core, named constants for win lines, no globals leaking, comments where non-obvious (minimax). **Incremental commits**: each milestone below is 1–3 focused commits with descriptive messages (scaffold → board render → moves/turns → win/draw → reset → highlight → AI → polish → README → deploy config). No giant "initial commit" dump. |
| **Shipped** | 20 | GitHub Pages URL verified loading in a fresh session; README links to demo; TAIKAI project has repo in Code field and live URL in Demo field. |
| **Writeup** | 10 | README: what it is, screenshot/GIF (if feasible), how to play, how to run locally (`open index.html` or `python -m http.server`), tech & decisions/trade-offs (why vanilla, why minimax, what was cut), file map. TAIKAI description: HTML-formatted summary mirroring README highlights. |

## 6. Build-phase milestones

1. **M1 — Scaffold & deploy pipeline first** (de-risk shipping): repo with
   `index.html` placeholder + README stub; enable GitHub Pages; verify public URL
   loads. *Commit(s): scaffold, pages config.*
2. **M2 — Board & moves:** render 3×3 grid, alternate X/O on click, turn indicator,
   ignore occupied cells. *Commits: board render; move handling.*
3. **M3 — Game end:** win detection (8 lines) + winning-line highlight + board lock;
   draw detection. *Commits: win logic; draw + lock.*
4. **M4 — Reset & scoreboard:** New Game button; session score tally.
5. **M5 — Verify & redeploy:** run the full manual test matrix on the LIVE URL.
   ✅ *At this point the entry is fully eligible — everything after is bonus.*
6. **M6 — Vs-Computer (minimax):** mode toggle, AI plays O with short delay for UX;
   verify unbeatable + no illegal moves.
7. **M7 — Polish:** responsive/mobile pass, aria-live status, placement animation,
   visual tidy.
8. **M8 — Writeup & submit:** full README (run instructions, tech, trade-offs);
   create/publish TAIKAI project with name "Tactic — Tic-Tac-Toe", tagline, HTML
   description, repo URL in Code field, live URL in Demo field. Final live-URL check.

## 7. Definition of done

- [ ] Live URL (`https://layerx-labs.github.io/arena-tic-tac-toe-fable/`) loads and
      a full game (win AND draw scenarios) plays correctly in the browser.
- [ ] All must-have features (1–6 above) verified on the deployed site, not just locally.
- [ ] Repo public with ≥8 meaningful, incremental commits and a complete README.
- [ ] TAIKAI project published: name, tagline, full HTML description, Code = repo URL,
      Demo = live URL.
- [ ] Final pass of the manual test matrix on the live site shows zero bugs.

## 8. Manual test matrix (run before declaring done)

- Each of the 8 winning lines triggers a win for X; spot-check 3 for O.
- Full board with no winner → "Draw".
- Click occupied cell → no-op; click after game over → no-op.
- Reset mid-game and after game over → clean board, X to move, scores preserved.
- (If AI shipped) AI blocks immediate wins, takes immediate wins, never loses across
  ~5 varied games, never moves on occupied cells; switching modes resets the board.
- Page works on a narrow mobile viewport (~375px) and desktop.
