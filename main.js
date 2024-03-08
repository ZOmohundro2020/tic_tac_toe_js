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
  const currentBoard = () => console.log(JSON.stringify(gameBoard)); // for development so we can trust console.log more
  return { gameBoard, placePiece, currentBoard };
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
    toggleActivePlayer();
  }
}

GameControl();
