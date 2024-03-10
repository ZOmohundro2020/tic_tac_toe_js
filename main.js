function GameBoard() {
  let gameBoard = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  const isOccupied = (row, col) => {
    if (gameBoard[row][col] !== "-") {
      console.log("occupied");
      return true;
    }
  };
  const placePiece = (row, col, piece) => {
    console.log("row, col, piece", row, col, piece);
    if (!isOccupied(row, col)) {
      gameBoard[row][col] = piece;
      return true;
    } else {
      return false;
    }
  };
  const checkVictory = () => {
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[i][0] !== "-" &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2]
      ) {
        console.log("victory row");
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[0][i] !== "-" &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
      ) {
        console.log("victory col");
        return true;
      }
    }

    if (
      gameBoard[0][0] !== "-" &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
    ) {
      console.log("victory diag");
      return true;
    }
    if (
      gameBoard[0][2] !== "-" &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0]
    ) {
      console.log("victory diag");
      return true;
    }
  };

  const currentBoard = () => console.log(JSON.stringify(gameBoard)); // for development so we can trust console.log more

  const displayHTML = () => {
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.innerHTML = "";
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent");
    gameBoard.flat().map((el, index) => {
      // create a new div, fill it with current array, give it identifier, attach it to dom
      let newDiv = document.createElement("div");
      newDiv.textContent = el;
      newDiv.setAttribute("id", `cell${index + 1}`);
      newDiv.addEventListener("click", () => console.log(`clicked ${newDiv.id}`));
      parentDiv.appendChild(newDiv);
    });
    gameContainer.appendChild(parentDiv);
  };

  return { gameBoard, placePiece, currentBoard, checkVictory, displayHTML };
}

function Player(playerName, playerPiece, activePlayer = false) {
  return { playerName, playerPiece, activePlayer };
}

function GameControl() {
  // -- Setup -- //
  let gameActive = true;
  const board = GameBoard();
  const PlayerX = Player("Bob", "X", true);
  const PlayerY = Player("Jim", "O");
  const players = [PlayerX, PlayerY];
  board.currentBoard();
  board.displayHTML();

  const determineActivePlayer = function () {
    let activePlayer;
    players.map((player) => {
      if (player.activePlayer) {
        activePlayer = player;
      }
    });
    return activePlayer;
  };

  const toggleActivePlayer = function () {
    players.map((player) => (player.activePlayer = !player.activePlayer));
  };

  function turn() {
    activePlayer = determineActivePlayer();
    console.log(
      `It is ${activePlayer.playerName}'s turn and they are playing as ${activePlayer.playerPiece} `
    );
    while (true) {
      const [x, y] = prompt("Enter Row,Col coordinates").split(",");
      legalMove = board.placePiece(x - 1, y - 1, activePlayer.playerPiece);
      if (legalMove) {
        break;
      } else {
        console.log("That is not a legal move, please try again");
      }
    }
  }

  while (gameActive) {
    turn();
    board.currentBoard();
    board.displayHTML();
    if (board.checkVictory()) {
      break;
    }
    toggleActivePlayer();
  }
  console.log("made it here");
  window.alert("test");
  gameActive = false;
}

GameControl();
