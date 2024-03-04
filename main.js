function GameBoard() {
  const gameBoard = [
    ["X", "X", "X"],
    ["X", "X", "X"],
    ["X", "X", "X"],
  ];
  return { gameBoard };
}

function Player(name, piece) {
  const playerName = name;
  const playerPiece = piece;
  return { name, playerPiece };
}

function GameControl() {  
  // game setup
  const board = GameBoard();  
  const PlayerX = Player("Bob","X");
  const PlayerY = Player("Jim","O");

  const displayBoard = console.log(board);

  //display board changes

  
  
}

GameControl();
