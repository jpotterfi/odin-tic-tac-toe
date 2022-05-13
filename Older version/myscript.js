const boardModule = (() => {
    const positionFactory = (position) => {
    this.position = position;
    this.owner = "neutral";
    this.score = 0;
    return {position, owner, score};
}

    const NE = positionFactory("NE");
    const N = positionFactory("N");
    const NW = positionFactory("NW");
    const ME = positionFactory("ME");
    const M = positionFactory("M");
    const MW = positionFactory("MW");
    const SE = positionFactory("SE");
    const S = positionFactory("S");
    const SW = positionFactory("SW");

    
    

    const board = [NE, N, NW, ME, M, MW, SE, S, SW];

      function addOwner(searchedPosition, player) {
        
        const found = board.findIndex(x => x.position == searchedPosition);
        
        board[found].owner = player;
      }

      function returnBoard (){
        return board;
      }

      function renderBoard(){
        const xPositions = board.filter((position) => {
        return position.owner == "x";
        })
        const oPositions = board.filter((position) => {
        return position.owner == "o";
        })
        xPositions.forEach(renderXPositions);
        function renderXPositions(object){
          let xDrawing = document.getElementById(object.position);
          xDrawing.innerHTML = "x";
        }
        oPositions.forEach(renderOPositions);
        function renderOPositions(object){
          let oDrawing = document.getElementById(object.position);
          oDrawing.innerHTML = "o";
        }
      }
      
      
    return {  
      addOwner,
      renderBoard,
      returnBoard
    }

})();

const interactionModule = (() => {


    let isOnePlayerGameCreated = false;
    let playerOne
    let playerTwo
    let isTwoPlayerGameCreated = false;
    let shapeSelected = "x";
    let computerDifficulty

    //Functions
      function determineGameMode() {
        let gameSelection = document.getElementById("game-setting").value;
        if (isOnePlayerGameCreated == false && isTwoPlayerGameCreated == false) {
          if (gameSelection == "Easy" || gameSelection == "Medium" || gameSelection == "Impossible"){
            playerOne = playerModule.playerFactory(shapeSelected);
            isOnePlayerGameCreated = true;
            isTwoPlayerGameCreated = false;
            computerDifficulty = gameSelection;
            
            return gameSelection;
          }

          if (gameSelection == "Two") {
            isTwoPlayerGameCreated = true;
            isOnePlayerGameCreated = false;
            

            return gameSelection;
          }
        } 
      }


    //^Functions

    

    //X AND O LISTENERS
    let xListener = document.getElementById("x");
    xListener.addEventListener("click", function(){
      if (isOnePlayerGameCreated == true) {
        return
      }
      shapeSelected = "x";
      
      
      
    });
    let oListener = document.getElementById("o");
    oListener.addEventListener("click", function(){
      let gameSelection = determineGameMode();  
      if (gameSelection != "Two"){
        //Call AI Logic with gameSelection difficulty
        //Make Changes to Board
        //Render Board
        //Set onePlayer.hasMoved to false
        
      }
      
    });
    //^X AND O LISTENERS


    //POSITION LISTENERS
    let NEListener = document.getElementById("NE")
    NEListener.addEventListener("click", function(){
      determineGameMode();
      if (isOnePlayerGameCreated == true && playerOne.hasMoved == false) {
        boardModule.addOwner("NE", playerOne.shape);
        boardModule.renderBoard();
        computerModule.makeMove(computerDifficulty, playerOne.shape);
      }

    });

    let NListener = document.getElementById("N")


    let NWListener = document.getElementById("NW")

    NWListener.addEventListener("click", function(){
      //get current player
      boardModule.addOwner("NW", "o");
      boardModule.renderBoard();
    });

    let MEListener = document.getElementById("ME")
    let MListener = document.getElementById("M")
    let MWListener = document.getElementById("MW")
    let SEListener = document.getElementById("SE")
    let SListener = document.getElementById("S")
    let SWListener = document.getElementById("SW")
    //^POSITION LISTENERS
 
})();

const playerModule = (() => {
  
    const playerFactory = (shape) => {
      this.shape = shape;
      if (shape == "x"){
        this.hasMoved = false;
      } else if (shape == "o") {
        this.hasMoved = true;
      }
      return {shape, hasMoved};
    }

      
    
  return {
    playerFactory,
    
  }

})();

const computerModule = (() => {

  function makeMove(difficulty, previousShape){
    if (difficulty == "Easy") {
      let currentBoard = boardModule.returnBoard();
      
      let possibleMoves = currentBoard.filter(function(value){
        return value.owner == "neutral"; });
      let possibleMovesTwo = possibleMoves;
      console.table(possibleMovesTwo)

      for (i = 0; i < possibleMoves.length; i++){ 
        possibleMoves[i].score += miniMax(currentBoard, previousShape);
        
      }
      console.table(possibleMoves)
      console.table(possibleMovesTwo);
    }
    
  }

  function miniMax(differentBoard,previousShape, possibleMove){

    let miniMaxBoard = differentBoard;
   
    let shape = previousShape;
    let random = getRandomInt(8);
    console.table(random);
    console.table(miniMaxBoard[random]);

    if (determineWin(miniMaxBoard) == "xWin"){
      return 1
    } else if (determineWin(miniMaxBoard) == "oWin"){
      return -1
    } else if (determineWin(miniMaxBoard) == "draw"){
      return 0
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    if (previousShape == "x"){
      shape = 'o';
     } else if (previousShape == "o"){
      shape = 'x';
     }

     miniMaxBoard[random].owner = shape;
     
     miniMax(miniMaxBoard, shape)



   
    
    /*
    console.table(currentBoard);
    let shape
    let miniMaxBoard = currentBoard;

    if (determineWin(miniMaxBoard) == "xWin"){
      return 1
    } else if (determineWin(miniMaxBoard) == "oWin"){
      return -1
    } else if (determineWin(miniMaxBoard) == "draw"){
      return 0
    }

    if (previousShape == "x"){
      shape = 'o';
     } else if (previousShape == "o"){
      shape = 'x';
     }
    
    
    if (typeof possibleMove != "undefined"){
        const found = miniMaxBoard.findIndex(x => x.position == possibleMove);
        miniMaxBoard[found].owner = shape;
        if (shape == "x"){
          shape = 'o';
         } else if (shape == "o"){
          shape = 'x';
         }
    }

    for (j = 0; j < 9; j++){
      if (miniMaxBoard[j].owner == "neutral"){
        miniMaxBoard[j].owner = shape;   
        miniMax(miniMaxBoard, shape);
      }
    }
    */
  }

  function determineWin(board) {
    
   

    //LEFT WIN
    if (board[2].owner == 'x' && board[5].owner == 'x' && board[8].owner == 'x'){
      console.log("Left Win");
      return "xWin";
    }
    if (board[2].owner == 'o' && board[5].owner == 'o' && board[8].owner == 'o'){
      console.log("oLeft Win");
      return "oWin";
    }
    //LEFT WIN

    //RIGHT WIN
    if (board[0].owner == 'x' && board[3].owner == 'x' && board[6].owner == 'x'){
      console.log("Right Win");
      return "xWin";
    }
    if (board[0].owner == 'o' && board[3].owner == 'o' && board[6].owner == 'o'){
      console.log("oRight Win");
      return "oWin";
    }
    //RIGHT WIN

    //BOTTOM WIN
    if (board[8].owner == 'x' && board[7].owner == 'x' && board[6].owner == 'x'){
      console.log("Bottom Win");
      return "xWin";
    }
    if (board[8].owner == 'o' && board[7].owner == 'o' && board[6].owner == 'o'){
      console.log("oBottom Win");
      return "oWin";
    }
    //BOTTOM WIN

    //TOP WIN
    if (board[0].owner == 'x' && board[1].owner == 'x' && board[2].owner == 'x'){
      console.log("Top Win");
      return "xWin";
    }
    if (board[0].owner == 'o' && board[1].owner == 'o' && board[2].owner == 'o'){
      console.log("oTop Win");
      return "oWin";
    }
    //TOP WIN

    //MIDDLE COLUMN WIN
    if (board[1].owner == 'x' && board[4].owner == 'x' && board[7].owner == 'x'){
      console.log("Middle Column Win");
      return "xWin"
    }
    if (board[1].owner == 'o' && board[4].owner == 'o' && board[7].owner == 'o'){
      console.log("oMiddle Column Win");
      return "oWin"
    }
    //MIDDLE COLUMN WIN

    //MIDDLE ROW WIN
    if (board[5].owner == 'x' && board[4].owner == 'x' && board[3].owner == 'x'){
      console.log("Middle Row Win");
      return "xWin"
    }
    if (board[5].owner == 'o' && board[4].owner == 'o' && board[3].owner == 'o'){
      console.log("oMiddle Row Win");
      return "oWin"
    }
    //MIDDLE ROW WIN

    //FRONTWARDS DIAGONAL WIN
    if (board[8].owner == 'x' && board[4].owner == 'x' && board[0].owner == 'x'){
      console.log("Frontwards Diagonal Win");
      return "xWin"
    }
    if (board[8].owner == 'o' && board[4].owner == 'o' && board[0].owner == 'o'){
      console.log("oFrontwards Diagonal Win");
      return "oWin"
    }
    //FRONTWARDS DIAGONAL WIN

    //BACKWARDS DIAGONAL WIN
    if (board[2].owner == 'x' && board[4].owner == 'x' && board[6].owner == 'x'){
      console.log("Backwards Diagonal Win");
      
      return "xWin"
    }
    if (board[2].owner == 'o' && board[4].owner == 'o' && board[6].owner == 'o'){
      console.log("oBackwards Diagonal Win");
      return "oWin"
    }
    //BACKWARDS DIAGONAL WIN

    //STALEMATE
    if (board[0].owner != "neutral" &&
        board[1].owner != "neutral" &&
        board[2].owner != "neutral" &&
        board[3].owner != "neutral" &&
        board[4].owner != "neutral" &&
        board[5].owner != "neutral" &&
        board[6].owner != "neutral" &&
        board[7].owner != "neutral" &&
        board[8].owner != "neutral"){
          console.log("draw");
          return "draw";
        }
    //
  }

  function clearBoard(board){
    for (k = 0; k < 9; k++){
      board[k].owner = "neutral";
    }
    return board
  }

  return {
    makeMove,
    determineWin,
    clearBoard
  }
})();


//console.log(boardModule.addOwner("NE", "Jeremy"));
//console.log(boardModule.addOwner("S", "Jeremy"));
//boardModule.addOwner("ME", 'o')
//boardModule.addOwner("NE", 'o')
//boardModule.addOwner("SE", 'o')

//let testBoard = boardModule.returnBoard();


//computerModule.makeMove("Easy", "x");

//computerModule.determineWin(testBoard);

//boardModule.renderBoard();
