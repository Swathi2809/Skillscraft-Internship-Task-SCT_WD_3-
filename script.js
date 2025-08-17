let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; 
let gameActive = true;
const statusDisplay = document.getElementById("status");
const boardContainer = document.getElementById("board");

function renderBoard() {
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;
    if (cell === "") {
      cellElement.addEventListener("click", () => makeMove(index));
    }
    boardContainer.appendChild(cellElement);
  });
}

function makeMove(index) {
  if (board[index] !== "" || !gameActive || currentPlayer !== "X") return;
  board[index] = "X";
  renderBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = "O";
    statusDisplay.textContent = "Computer's turn...";
    setTimeout(computerMove, 600); 
  }
}

function computerMove() {
  let emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter(v => v !== null);
  if (emptyCells.length === 0) return;
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "O";
  renderBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = "X";
    statusDisplay.textContent = "Your turn (X)";
  }
}

function checkWinner() {
  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  let winner = null;
  winningCombinations.forEach(combination => {
    const [a,b,c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  });

  if (winner) {
    statusDisplay.textContent = (winner === "X") ? "🎉 You Win!" : "🤖 Computer Wins!";
    gameActive = false;
  } else if (!board.includes("")) {
    statusDisplay.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = "Your turn (X)";
  renderBoard();
}

renderBoard();
