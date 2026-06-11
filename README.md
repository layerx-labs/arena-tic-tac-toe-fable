# Tactic — Tic-Tac-Toe

A crisp, zero-dependency tic-tac-toe that runs entirely in the browser.
Built for the **Arena Sprint: Tic-Tac-Toe** hackathon on TAIKAI.

**Live demo:** https://arena-tic-tac-toe-fable.vercel.app
**Source:** https://github.com/layerx-labs/arena-tic-tac-toe-fable

## What it is

A single-page tic-tac-toe game with:

- **Two-player local play** — X and O alternate, X always starts.
- **vs-Computer mode** — the computer plays O using **minimax**, so it is
  unbeatable (it always wins or draws). Toggle between modes any time.
- **Correct end-game detection** — all 8 winning lines checked; the winning
  line is highlighted and the board locks. Full board with no winner is a draw.
- **Turn indicator** — always shows whose turn it is (or the result).
- **New Game** button — resets the board, keeps the session scoreboard.
- **Session scoreboard** — X wins / draws / O wins, with a Reset Scores button.
- **Accessible** — cells are real `<button>`s (keyboard friendly), the status
  line is an `aria-live` region, cells have `aria-label`s.
- **Responsive** — works on mobile (~375px) and desktop.

## How to run locally

No build step, no dependencies. Either:

```sh
# option 1: just open the file
open index.html

# option 2: serve it
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Tech used

| Piece | Choice | Why |
|---|---|---|
| Markup | `index.html` (semantic HTML) | Self-contained, instant load |
| Styling | `style.css` (plain CSS Grid) | A 3×3 grid is ~5 lines of CSS Grid; responsive by default |
| Logic | `script.js` (vanilla JS) | Zero dependencies, nothing to break, 100% readable |
| AI | Minimax with depth preference | Small (~40 lines), provably optimal for tic-tac-toe |
| Deploy | Vercel static hosting | Public URL, no build configuration needed |

## Architecture / decisions

- **Pure logic vs DOM split.** `checkWinner(board)`, `isDraw(board)` and
  `bestMove(board)` are pure functions over a 9-element array
  (`'X' | 'O' | null`). The DOM layer renders from a single `state` object and
  event handlers mutate state then re-render. This keeps the game logic
  auditable and testable in isolation (the pure functions are exposed on
  `window.__tactic` for console testing).
- **Minimax with depth weighting** (`10 - depth` / `depth - 10`) so the AI
  prefers faster wins and delays losses — it feels deliberate, not random.
- **A 300ms "thinking" delay** before the computer's reply, with the board
  disabled meanwhile, so the AI's move reads as a move rather than a glitch
  and double-click race conditions are impossible.
- **No framework, no bundler, no backend** — the brief asks for self-contained
  and fast; any framework would add risk and zero value at this scope.

## Trade-offs / what was cut

- Scores are session-only (no `localStorage`) — persistence added complexity
  without rubric value.
- The computer always plays O and X always starts — letting the AI go first
  was cut to keep the UI simple.
- No automated test runner is committed; instead the pure functions were
  verified with a Node script asserting all 8 win lines, draw detection, AI
  win-taking/blocking, and 200 random games where the AI never loses.

## File map

```
index.html   — page structure: board, status, mode toggle, scoreboard, actions
style.css    — dark theme, CSS Grid board, win highlight, pop-in animation
script.js    — pure game logic (top) + state + DOM layer (bottom)
```
