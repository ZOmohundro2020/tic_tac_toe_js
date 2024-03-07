function GameBoard() {
  let gameBoard = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  const placePiece = (row, col, piece) => {
    console.log("row, col, piece", row, col, piece);
    gameBoard[row][col] = piece;
  };
  const currentBoard = () => console.log(JSON.stringify(gameBoard)); // for development so we can trust console.log more
  return { gameBoard, placePiece, currentBoard };
}

function Player(playerName, playerPiece, activePlayer = false) {
  return { playerName, playerPiece, activePlayer };
}

function GameControl() {
  // game setup
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
    let ask = prompt("Enter Row,Col coordinates");
    [x, y] = ask.split(",");
    board.placePiece(x - 1, y - 1, activePlayer.playerPiece);
  }
  while (gameActive) {
    turn();
    board.currentBoard();
    toggleActivePlayer();
  }
}

GameControl();
