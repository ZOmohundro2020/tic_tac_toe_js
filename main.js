function GameBoard() {
  const gameBoard = [
    ["X", "X", "X"],
    ["X", "X", "X"],
    ["X", "X", "X"],
  ];
  return { gameBoard };
}

function Player(playerName, playerPiece, activePlayer=false) {
  // const playerName = name;
  // const playerPiece = piece;
  // const activePlayer = active;
  return { playerName, playerPiece, activePlayer };
}

function GameControl() {
  // game setup
  const board = GameBoard();
  const PlayerX = Player("Bob", "X",true);
  const PlayerY = Player("Jim", "O");
  const displayBoard = console.log(board);
  console.log(PlayerX);
  console.log(PlayerY);


  const turnControl = function () {};
  //display board changes
}

GameControl();
