function GameBoard() {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => gameBoard;

  const isOccupied = (cell) => {
    if (gameBoard[cell] !== "") {
      return true;
    }
  };
  const placePiece = (cell, piece) => {
    console.log({ cell, piece });
    if (!isOccupied(cell)) {
      gameBoard[cell] = piece;

      return true;
    } else {
      return false;
    }
  };
  // To Do: Rework this
  const checkVictory = () => {
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[i][0] !== "" &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2]
      ) {
        console.log("victory row");
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[0][i] !== "" &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
      ) {
        console.log("victory col");
        return true;
      }
    }

    if (
      gameBoard[0][0] !== "" &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
    ) {
      console.log("victory diag");
      return true;
    }
    if (
      gameBoard[0][2] !== "" &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0]
    ) {
      console.log("victory diag");
      return true;
    }
  };

  return { getBoard, placePiece, checkVictory };
}

function Player(playerName, playerPiece, activePlayer = false) {
  return { playerName, playerPiece, activePlayer };
}

function GameControl() {
  // -- Setup -- //
  const PlayerX = Player("Bob", "X", true);
  const PlayerY = Player("Jim", "O");
  const players = [PlayerX, PlayerY];

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

  return { determineActivePlayer, toggleActivePlayer };
}

function ViewController() {
  const game = GameControl();
  const gameBoard = GameBoard();
  const displayBoard = () => {
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.innerHTML = "";
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent");
    gameBoard.getBoard().map((el, index) => {
      let newDiv = document.createElement("div");
      newDiv.textContent = el;
      newDiv.setAttribute("id", `cell${index}`);
      newDiv.addEventListener("click", () => handleClick(newDiv.id));
      parentDiv.appendChild(newDiv);
    });
    gameContainer.appendChild(parentDiv);
  };
  const displayPlayerTurn = () => {
    const activePlayer = game.determineActivePlayer();
    const playerInfo = document.getElementById("playerInfo");
    const playerText = `It is ${activePlayer.playerName}'s turn and they are playing ${activePlayer.playerPiece}`;
    playerInfo.innerHTML = "";
    const playerInfoPara = document.createElement("p");
    playerInfoPara.textContent = playerText;
    playerInfo.appendChild(playerInfoPara);
  };

  const handleClick = (cell) => {
    console.log("active player:", game.determineActivePlayer());
    const legalMove = gameBoard.placePiece(
      cell[4],
      game.determineActivePlayer().playerPiece
    );
    if (legalMove) {
      displayBoard();
      game.toggleActivePlayer();
      displayPlayerTurn();
    }
  };
  displayBoard();
  displayPlayerTurn();
}
ViewController();
