const boardModule = (() => {
    const positionFactory = (position) => {
    this.position = position;
    this.owner = "neutral";
    this.isRendered = "false";
    return {position, owner, isRendered};
  }

    const board = [ positionFactory("NE"),
                    positionFactory("N"),
                    positionFactory("NW"),
                    positionFactory("ME"),
                    positionFactory("M"),
                    positionFactory("MW"),
                    positionFactory("SE"),
                    positionFactory("S"),
                    positionFactory("SW")
                  ]           

    function addOwner(searchedPosition, player) {
      const found = board.findIndex(x => x.position == searchedPosition);
      
      board[found].owner = player;
    }

    function returnBoard (){
      return board;
    }

    function clearBoard(){
      for (i = 0; i < 9; i++){
        board[i].owner = "neutral";
        board[i].isRendered = false;
        let resetDrawing = document.getElementById(board[i].position)
        console.table(board[i].position);
        resetDrawing.innerHTML = "";
      }
      
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
        if (object.isRendered == true) {
          return
        }
        object.isRendered = true;
        let xDrawing = document.createElement("div")
        xDrawing.id = ("x" + object.position);
        let drawToPosition = document.getElementById(object.position);
        xDrawing.style.color = "#30C4BE";
        xDrawing.style.animation = "textGrow .25s";
        xDrawing.innerHTML = "X";
        drawToPosition.appendChild(xDrawing);
        

      }

      oPositions.forEach(renderOPositions);
      function renderOPositions(object){
        if (object.isRendered == true) {
          return
        }
        object.isRendered = true;
        let oDrawing = document.createElement("div")
        oDrawing.id = ("o" + object.position);
        let drawToPosition = document.getElementById(object.position);
        oDrawing.style.color = "#F3B136";
        oDrawing.style.animation = "textGrow .25s";
        oDrawing.innerHTML = "O";
        drawToPosition.appendChild(oDrawing);
        

      }

    }
      function animateWinningPositions(winningArray, shape) {
        winningArray.forEach(animatePositions);
        console.table(winningArray);
        console.table(shape);
          function animatePositions(pos){
            let winAnim = document.getElementById(shape + pos);
            winAnim.style.animation = "textRotate 1.5s";
          }
      }
    

      let posOne
      let posTwo
      let posThree

      function returnWinningPositions(){
        let winningPositionsArr = [posOne, posTwo, posThree];
        return winningPositionsArr
      }
    
      function determineWin(board) {
        //LEFT WIN
        if (board[2].owner == 'x' && board[5].owner == 'x' && board[8].owner == 'x'){
          console.log("Left Win");
          posOne = board[2].position;
          posTwo = board[5].position;
          posThree = board[8].position;
          return "xWin";
        }
        if (board[2].owner == 'o' && board[5].owner == 'o' && board[8].owner == 'o'){
          console.log("oLeft Win");
          posOne = board[2].position;
          posTwo = board[5].position;
          posThree = board[8].position;
          return "oWin";
        }
        //LEFT WIN
    
        //RIGHT WIN
        if (board[0].owner == 'x' && board[3].owner == 'x' && board[6].owner == 'x'){
          console.log("Right Win");
          posOne = board[0].position;
          posTwo = board[3].position;
          posThree = board[6].position;
          return "xWin";
        }
        if (board[0].owner == 'o' && board[3].owner == 'o' && board[6].owner == 'o'){
          posOne = board[0].position;
          posTwo = board[3].position;
          posThree = board[6].position;
          console.log("oRight Win");
          return "oWin";
        }
        //RIGHT WIN
    
        //BOTTOM WIN
        if (board[8].owner == 'x' && board[7].owner == 'x' && board[6].owner == 'x'){
          console.log("Bottom Win");
          posOne = board[8].position;
          posTwo = board[7].position;
          posThree = board[6].position;
          return "xWin";
        }
        if (board[8].owner == 'o' && board[7].owner == 'o' && board[6].owner == 'o'){
          console.log("oBottom Win");
          posOne = board[8].position;
          posTwo = board[7].position;
          posThree = board[6].position;
          return "oWin";
        }
        //BOTTOM WIN
    
        //TOP WIN
        if (board[0].owner == 'x' && board[1].owner == 'x' && board[2].owner == 'x'){
          console.log("Top Win");
          posOne = board[0].position;
          posTwo = board[1].position;
          posThree = board[2].position;
          return "xWin";
        }
        if (board[0].owner == 'o' && board[1].owner == 'o' && board[2].owner == 'o'){
          console.log("oTop Win");
          posOne = board[0].position;
          posTwo = board[1].position;
          posThree = board[2].position;
          return "oWin";
        }
        //TOP WIN
    
        //MIDDLE COLUMN WIN
        if (board[1].owner == 'x' && board[4].owner == 'x' && board[7].owner == 'x'){
          console.log("Middle Column Win");
          posOne = board[1].position;
          posTwo = board[4].position;
          posThree = board[7].position;
          return "xWin"
        }
        if (board[1].owner == 'o' && board[4].owner == 'o' && board[7].owner == 'o'){
          console.log("oMiddle Column Win");
          posOne = board[1].position;
          posTwo = board[4].position;
          posThree = board[7].position;
          return "oWin"
        }
        //MIDDLE COLUMN WIN
    
        //MIDDLE ROW WIN
        if (board[5].owner == 'x' && board[4].owner == 'x' && board[3].owner == 'x'){
          console.log("Middle Row Win");
          posOne = board[5].position;
          posTwo = board[4].position;
          posThree = board[3].position;
          return "xWin"
        }
        if (board[5].owner == 'o' && board[4].owner == 'o' && board[3].owner == 'o'){
          console.log("oMiddle Row Win");
          posOne = board[5].position;
          posTwo = board[4].position;
          posThree = board[3].position;
          return "oWin"
        }
        //MIDDLE ROW WIN
    
        //FRONTWARDS DIAGONAL WIN
        if (board[8].owner == 'x' && board[4].owner == 'x' && board[0].owner == 'x'){
          console.log("Frontwards Diagonal Win");
          posOne = board[8].position;
          posTwo = board[4].position;
          posThree = board[0].position;
          return "xWin"
        }
        if (board[8].owner == 'o' && board[4].owner == 'o' && board[0].owner == 'o'){
          console.log("oFrontwards Diagonal Win");
          posOne = board[8].position;
          posTwo = board[4].position;
          posThree = board[0].position;
          return "oWin"
        }
        //FRONTWARDS DIAGONAL WIN
    
        //BACKWARDS DIAGONAL WIN
        if (board[2].owner == 'x' && board[4].owner == 'x' && board[6].owner == 'x'){
          console.log("Backwards Diagonal Win");
          posOne = board[2].position;
          posTwo = board[4].position;
          posThree = board[6].position;
          
          return "xWin"
        }
        if (board[2].owner == 'o' && board[4].owner == 'o' && board[6].owner == 'o'){
          console.log("oBackwards Diagonal Win");
          posOne = board[2].position;
          posTwo = board[4].position;
          posThree = board[6].position;
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
      
      
    return {  
      addOwner,
      renderBoard,
      returnBoard,
      determineWin,
      clearBoard,
      returnWinningPositions,
      animateWinningPositions
    }

})();

const playerModule = (() => {
  const playerFactory = (shape) => {
    this.shape = shape;
    this.score = 0;
    return {shape, score};
  }
  

      
    
  return {
    playerFactory
  }

})();

const interactionModule = (() => {

    let counter = 0;
    let isGameOver = false;
    let playerOne = playerModule.playerFactory("x");
    let playerTwo = playerModule.playerFactory("o");
    let currentPlayer = document.getElementById("currentPlayer");
    let draws = 0;


    //POSITION LISTENERS
    let NEListener = document.getElementById("NE")
    NEListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
    if (counter % 2 == 0 && board[0].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("NE", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");
        
        
        updateScore();
      }
    } else if (counter % 2 != 0 && board[0].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("NE", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");
        
        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
      
    }
    
    });

    let NListener = document.getElementById("N")
    NListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
    if (counter % 2 == 0 && board[1].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("N", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");

        
        updateScore();
      }
    }
    if (counter % 2 != 0 && board[1].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("N", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");
        
        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
      
    }
    
    });

    let NWListener = document.getElementById("NW")
    NWListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
    if (counter % 2 == 0 && board[2].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("NW", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");
        
        
        updateScore();
      }
    } else if (counter % 2 != 0 && board[2].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("NW", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");
        
        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
     
    }
    
    });

    let MEListener = document.getElementById("ME")
    MEListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
    if (counter % 2 == 0 && board[3].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("ME", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");
        
        
        updateScore();
      }
    } else if (counter % 2 != 0 && board[3].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("ME", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");
        
        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
      
    }
    
    });

    let MListener = document.getElementById("M")
    MListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
      
    if (counter % 2 == 0 && board[4].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("M", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");
        
        
        updateScore();
      }
    } else if (counter % 2 != 0 && board[4].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("M", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");
        
        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
      
    }
    
    });
    
    
    let MWListener = document.getElementById("MW")
    MWListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
    if (counter % 2 == 0 && board[5].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("MW", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");
        
        
        updateScore();
      }
    } else if (counter % 2 != 0 && board[5].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("MW", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");
        
        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
      
    }
    
    });

    let SListener = document.getElementById("S")
    SListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
    if (counter % 2 == 0 && board[7].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("S", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");
        
        
        updateScore();
      }
    } else if (counter % 2 != 0 && board[7].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("S", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");
        
        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
      
    }
    
    });

    let SWListener = document.getElementById("SW")
    SWListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
    if (counter % 2 == 0 && board[8].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("SW", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");
        
        
        updateScore();
      }
    } else if (counter % 2 != 0 && board[8].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("SW", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");
        
        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
    }
    
    });

    let SEListener = document.getElementById("SE")
    SEListener.addEventListener("click", function(){
      let board = boardModule.returnBoard()
    if (counter % 2 == 0 && board[6].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("SE", playerOne.shape);
      counter ++;
      currentPlayer.innerHTML = "O";
      currentPlayer.style.color = "#F3B136";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "xWin"){
        isGameOver = true;
        playerOne.score += 1;

        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "x");
        
        
        updateScore();
      }
    } else if (counter % 2 != 0 && board[6].owner == "neutral" && isGameOver == false){
      boardModule.addOwner("SE", playerTwo.shape);
      counter ++;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
      boardModule.renderBoard();
      if (boardModule.determineWin(boardModule.returnBoard()) == "oWin"){
        console.log("returned oWin")
        isGameOver = true;
        playerTwo.score += 1;
        
        let winArr = boardModule.returnWinningPositions();
        boardModule.animateWinningPositions(winArr, "o");

        
        updateScore();
      }
    } 
    if (boardModule.determineWin(boardModule.returnBoard()) == "draw"){
      isGameOver = true;
      draws ++
      updateScore();
      
    }
    
    });


    //^POSITION LISTENERS
    const resetAnchor = document.getElementById("reset");    
    const resetButton = document.createElement("button");
    const resetImage = document.createElement('img');
    resetImage.src = 'refresh.svg';
    resetButton.appendChild(resetImage);
  


    resetButton.id = "resetButton";
    
    
    resetButton.addEventListener("click", function(){
      console.log("this is getting clicked");
      counter = 0;
      boardModule.clearBoard();
      isGameOver = false;
      currentPlayer.innerHTML = "X";
      currentPlayer.style.color = "#30C4BE";
    });
    resetAnchor.appendChild(resetButton);
    
    
    
      
      
     
      
      

    function updateScore(){
      
      const XScore = document.getElementById("XScore");
      const OScore = document.getElementById("OScore");
      const drawsScore = document.getElementById("drawsScore");
      
      XScore.innerHTML = playerOne.score;
      OScore.innerHTML = playerTwo.score;
      drawsScore.innerHTML = draws;  
      
    }
 
})();



//boardModule.addOwner("ME", 'o')
//boardModule.addOwner("NE", 'o')
//boardModule.addOwner("SE", 'o')