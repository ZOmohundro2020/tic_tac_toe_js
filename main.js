function GameBoard() {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => gameBoard;
  let turnCount = 0;

  const isOccupied = (cell) => {
    if (gameBoard[cell] !== "") {
      return true;
    }
  };
  const placePiece = (cell, piece) => {
    if (!isOccupied(cell)) {
      gameBoard[cell] = piece;
      incTurnCount();
      console.log("turn count: ", turnCount);

      return true;
    } else {
      return false;
    }
  };

  const incTurnCount = () => turnCount++;
  const getTurnCount = () => turnCount;

  const checkVictory = (activePlayerPiece) => {
    let gameWon = false;
    const winningArrays = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const victoryArray = [];
    const includesAll = (arr, values) => values.every((v) => arr.includes(v));
    gameBoard.map((cell, index) => {
      if (cell === activePlayerPiece) {
        victoryArray.push(index);
      }
    });

    winningArrays.map((possWin) => {
      if (includesAll(victoryArray, possWin)) {
        console.log("win match");
        gameWon = true;
      }
    });

    return gameWon;
  };

  const checkTie = () => {
    if (!gameBoard.includes("")) {
      return true;
    }
  };

  return { getBoard, placePiece, checkVictory, checkTie, getTurnCount };
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
  let activePlayer = game.determineActivePlayer();
  const displayBoard = () => {
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.innerHTML = "";
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent");
    gameBoard.getBoard().map((el, index) => {
      let newDiv = document.createElement("div");
      newDiv.textContent = el;
      newDiv.setAttribute("id", `cell${index}`);
      newDiv.setAttribute("class", "cell");
      newDiv.addEventListener("click", () => handleClick(newDiv.id));
      parentDiv.appendChild(newDiv);
    });
    gameContainer.appendChild(parentDiv);
  };
  const displayPlayerTurn = (gameOver = false) => {
    let playerText = "";
    const turnCount = gameBoard.getTurnCount();
    const playerInfo = document.getElementById("playerInfo");
    gameOver
      ? (playerText = `Game Over. ${activePlayer.playerName} wins!`)
      : turnCount === 9
      ? (playerText = "Game Over. It's a tie!")
      : (playerText = `It is ${activePlayer.playerName}'s turn and they are playing ${activePlayer.playerPiece}`);
    playerInfo.innerHTML = "";
    const playerInfoPara = document.createElement("p");
    playerInfoPara.textContent = playerText;
    playerInfo.appendChild(playerInfoPara);
  };

  const handleClick = (cell) => {
    console.log("active player:", activePlayer);
    const legalMove = gameBoard.placePiece(cell[4], activePlayer.playerPiece);
    if (legalMove) {
      displayBoard();
      const playerHasWon = gameBoard.checkVictory(activePlayer.playerPiece);
      const gameHasTied = gameBoard.checkTie();
      if (playerHasWon) {
        console.log("game over");
        // add game cleanup
      } else if (gameHasTied) {
        console.log("game tied");
        // add game cleanup
      } else {
        game.toggleActivePlayer();
        activePlayer = game.determineActivePlayer();
      }
      displayPlayerTurn(playerHasWon);
    }
  };
  displayBoard();
  displayPlayerTurn();
}
ViewController();
