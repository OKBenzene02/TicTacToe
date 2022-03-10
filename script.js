const main = document.querySelector("main");

main.innerHTML = `
<div class="container ">
            <ul class="list_items">
                <li class="items cell1"></li>
                <li class="items cell2"></li>
                <li class="items cell3"></li>
                <li class="items cell4"></li>
                <li class="items cell5"></li>
                <li class="items cell6"></li>
                <li class="items cell7"></li>
                <li class="items cell8"></li>
                <li class="items cell9"></li>
            </ul>
        </div>
        <div class="message ">
            <div class="win_text"></div>
            <button class="restart">Restart</button>
        </div>`;

const listItems = document.querySelectorAll("li");
const board = document.querySelector(".container");
const Winner = document.querySelector(".message");
const winnerText = document.querySelector(".win_text");
const Restart_Game = document.querySelector(".restart");
const xClass = "x";
const oClass = "o";
let User_turn;

const Winning_elements = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

StartGame();

function StartGame() {
  User_turn = false;
  listItems.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const cell = e.target;
      const currentTurn = User_turn ? oClass : xClass;
      placeTheVariables(currentTurn, cell);
      // For deciding winner
      if (checkWin(currentTurn)) {
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      }
      // For switching the turns
      else {
        swapTheVariables();
        changeHover();
      }
    });
  });
  changeHover();
}

Restart_Game.addEventListener("click", (e) => {
  e.preventDefault();
  board.classList[1] = xClass
  listItems.forEach((cell) => {
    cell.classList.remove(oClass);
    cell.classList.remove(xClass);
    Winner.classList.remove("show");
  });
});

function placeTheVariables(currentTurn, cell) {
  cell.classList.add(currentTurn);
}

function swapTheVariables() {
  User_turn = !User_turn;
}

function changeHover() {
  board.classList.remove(xClass);
  board.classList.remove(oClass);
  if (User_turn) {
    board.classList.add(oClass);
  } else {
    board.classList.add(xClass);
  }
}

function checkWin(currentTurn) {
  return Winning_elements.some((combination) => {
    return combination.every((index) => {
      return listItems[index].classList.contains(currentTurn);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winnerText.innerHTML = `Draw!`;
  } else {
    const textChange = User_turn ? "O" : "X";
    winnerText.innerHTML = `Player ${textChange} wins!`;
  }
  Winner.classList.add("show");
}

function isDraw() {
  return [...listItems].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}
