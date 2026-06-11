/* Tactic — tic-tac-toe game logic.
 * Pure game functions (checkWinner, isDraw, bestMove) are kept separate
 * from the DOM layer so the core logic is easy to read and verify.
 */
"use strict";

// ---------- Pure game logic ----------

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

/** Returns {winner: 'X'|'O', line: [i,i,i]} or null. */
function checkWinner(board) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

/** True when the board is full and nobody has won. */
function isDraw(board) {
  return !checkWinner(board) && board.every((cell) => cell !== null);
}

// ---------- State ----------

const state = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  gameOver: false,
  winLine: null,
  mode: "2p", // '2p' | 'cpu'
  scores: { X: 0, O: 0, D: 0 },
  cpuThinking: false,
};

// ---------- DOM layer ----------

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const scoreXEl = document.getElementById("score-x");
const scoreOEl = document.getElementById("score-o");
const scoreDEl = document.getElementById("score-d");
const mode2pBtn = document.getElementById("mode-2p");
const modeCpuBtn = document.getElementById("mode-cpu");

// Build the 9 cell buttons once.
const cells = [];
for (let i = 0; i < 9; i++) {
  const btn = document.createElement("button");
  btn.className = "cell";
  btn.type = "button";
  btn.dataset.index = String(i);
  btn.setAttribute("role", "gridcell");
  btn.addEventListener("click", () => handleCellClick(i));
  boardEl.appendChild(btn);
  cells.push(btn);
}

function render() {
  for (let i = 0; i < 9; i++) {
    const value = state.board[i];
    const btn = cells[i];
    btn.innerHTML = value ? `<span>${value}</span>` : "";
    btn.classList.toggle("x", value === "X");
    btn.classList.toggle("o", value === "O");
    btn.classList.toggle("filled", value !== null);
    btn.classList.toggle("win", !!state.winLine && state.winLine.includes(i));
    btn.disabled = state.gameOver || value !== null || state.cpuThinking;
    btn.setAttribute(
      "aria-label",
      value ? `Cell ${i + 1}: ${value}` : `Cell ${i + 1}: empty`
    );
  }

  const result = checkWinner(state.board);
  if (result) {
    statusEl.textContent = `${result.winner} wins!`;
  } else if (isDraw(state.board)) {
    statusEl.textContent = "It's a draw.";
  } else if (state.cpuThinking) {
    statusEl.textContent = "Computer is thinking…";
  } else {
    statusEl.textContent = `${state.currentPlayer}'s turn`;
  }

  scoreXEl.textContent = String(state.scores.X);
  scoreOEl.textContent = String(state.scores.O);
  scoreDEl.textContent = String(state.scores.D);
  mode2pBtn.classList.toggle("active", state.mode === "2p");
  modeCpuBtn.classList.toggle("active", state.mode === "cpu");
}

function applyMove(index) {
  state.board[index] = state.currentPlayer;
  const result = checkWinner(state.board);
  if (result) {
    state.gameOver = true;
    state.winLine = result.line;
    state.scores[result.winner] += 1;
  } else if (isDraw(state.board)) {
    state.gameOver = true;
    state.scores.D += 1;
  } else {
    state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
  }
}

function handleCellClick(index) {
  if (state.gameOver || state.board[index] !== null || state.cpuThinking) return;
  applyMove(index);
  render();

}

function newGame() {
  state.board = Array(9).fill(null);
  state.currentPlayer = "X";
  state.gameOver = false;
  state.winLine = null;
  state.cpuThinking = false;
  render();
}

function setMode(mode) {
  if (state.mode === mode) return;
  state.mode = mode;
  newGame(); // switching modes starts a fresh board
}

document.getElementById("new-game").addEventListener("click", newGame);
document.getElementById("reset-scores").addEventListener("click", () => {
  state.scores = { X: 0, O: 0, D: 0 };
  render();
});
mode2pBtn.addEventListener("click", () => setMode("2p"));
modeCpuBtn.addEventListener("click", () => setMode("cpu"));

render();

// Expose pure functions for quick console testing (harmless in production).
window.__tactic = { checkWinner, isDraw };
