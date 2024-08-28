const gameCells=document.querySelectorAll(".cell");
const player1=document.querySelector(".player1");
const player2=document.querySelector(".player2");
const restartBtn=document.querySelector(".restart");
const alertBox=document.querySelector(".alertBox");


//making variable
let currentPlayer ='O';
let nextPlayer ='X';
let playerTurn= currentPlayer; 

player1.textContent =`player 1:${currentPlayer}`;
player2.textContent=`player 2: ${nextPlayer}`;



// Function to start the game
const startGame=()=>{
gameCells.forEach(cell=>{
    cell.addEventListener("click",handleClick);
});
}
//function to handle clicks or any events
const handleClick=(e)=>{
  if(e.target.textContent === ''){ 
    e.target.textContent = playerTurn;
    if(checkWin()){
      // console.log(`${playerTurn} is a Winner` );
      showAlert(`${playerTurn} is a Winner!!`);
      disableCells();
    }
    else if(checkTie()){
      // console.log('it is a Tie');
      showAlert(`it is a Tie!`);
      disableCells();

    }
    else {
      showAlert(` Turn for player :${playerTurn}`);
         changePlayerTurn();
    }
  
  }

}
//function to change the player
const changePlayerTurn=()=>{
  if(playerTurn===currentPlayer){
    playerTurn=nextPlayer;
  }
  else{
    playerTurn = currentPlayer;
  }

//   playerTurn=playerTurn === currentPlayer ? nextPlayer :currentPlayer;
// it a shortcut of if else code 

}
//function to check win
const checkWin =()=>{
  const WinningCond=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    
  ];
  for(let i=0;i<WinningCond.length;i++){
    const[pos1,pos2,pos3]=WinningCond[i];

    // console.log(`${pos1} ${pos2} ${pos3}`);
    if(gameCells[pos1].textContent !== '' &&
      gameCells[pos1].textContent === gameCells[pos2].textContent &&
      gameCells[pos2].textContent === gameCells[pos3].textContent){
        return true;
      }
  }
  return false;
}
// function to check  for a tie
const checkTie =()=>{
let emptyCells = 0;
gameCells.forEach(cell=>{
  if(cell.textContent === ''){
    emptyCells++;
  }
});

 return emptyCells === 0 &&  !checkWin();

}
// function to disable game-board
const disableCells =()=>{
  gameCells.forEach(cell =>{
    cell.removeEventListener("click",handleClick);
    cell.classList.add('disabled');
  });
}

//restart button
const restartGame=()=>{
  gameCells.forEach(cell =>{
    cell.textContent ='';
    cell.classList.remove('disabled');
  });
  startGame();

}
const showAlert=(msg)=>{
alertBox.style.display = "block";
alertBox.textContent=msg;
setTimeout(()=>{
  alertBox.style.display = "none";
},3000)
}

restartBtn.addEventListener('click',restartGame);



//Calling start game function
startGame();