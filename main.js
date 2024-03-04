function GameBoard() {
  let gameBoard = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  const placePiece = (row, col, piece) => {
    console.log(row, col, piece);
    gameBoard[row][col] = piece;
  };
  return { gameBoard, placePiece };
}

function Player(playerName, playerPiece, activePlayer = false) {
  return { playerName, playerPiece, activePlayer };
}

function GameControl() {
  // game setup
  const board = GameBoard();
  const PlayerX = Player("Bob", "X", true);
  const PlayerY = Player("Jim", "O");
  const players = [PlayerX, PlayerY];
  const displayBoard = () => {
    console.log(board.gameBoard);
  };
  displayBoard();

  const turnControl = function () {
    // determine active player
    const determineActivePlayer = function () {
      let activePlayer;
      players.map((player) => {
        if (player.activePlayer) {
          activePlayer = player;
        }
      });

      console.log("activePlayer is: ", activePlayer);
      return activePlayer;
    };

    const toggleActivePlayer = function () {
      players.map((player) => (player.activePlayer = !player.activePlayer));
      console.log("players array is now: ", players);
    };

    // flow control
    activePlayer = determineActivePlayer();

    //sample first turn
    console.log(
      `It is ${activePlayer.playerName}'s turn and they are playing as ${activePlayer.playerPiece} `
    );
    board.placePiece(0, 0, activePlayer.playerPiece);
    displayBoard();
    toggleActivePlayer();
    console.log("after first turn: ", activePlayer.playerName);
  };
  //console.log("Enter Row,Col coordinates");

  turnControl();
}

GameControl();
