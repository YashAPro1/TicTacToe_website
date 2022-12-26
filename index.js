const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const windowCond = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [1,4,8],
    [2,4,6]
];
let degree = 360;
let options = ["","","","","","","","",""];
let player1 = window.prompt("Enter Player1 Name: ");
let player2 = window.prompt("Enter Player2s Name: ");
let currentplayer = "X";
let player;
let game_on = false;
initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    // if(currentplayer == "X"){
    //     player = player1;
    //     console.log(player);
    // }
    // else{
    //     player = player2;
    //     console.log(player);
    // }
    statusText.textContent = `${player1}'s turn`
    game_on = true;
}
function cellClicked(){
    const cellIndex =  this.getAttribute("cellIndex");
    // this.style.transform = "rotateX("+360+"deg)"+"delay 0.5s";
    if(options[cellIndex] != "" || !game_on){
        return;
    }
    updateCell(this,cellIndex);
    // changePlayer();
    checkWinner();
}
function updateCell(cell,index){
    options[index] = currentplayer;
    // console.log(options[index])
    cell.textContent = currentplayer;

}

function changePlayer(){
    currentplayer = (currentplayer == "X") ? "O" : "X";

    if(currentplayer == "X"){
        
        player = player1;
        // just for testing
        // console.log(player);
    }
    else{
        
        player = player2;
        // just for testing
        // console.logde(player);
    }
    statusText.textContent = `${player}'s turn`;
}

function checkWinner(){
        let roundwon = false;
        
        for(let i=0;i<windowCond.length;i++){
            // console.log(i);
            const condition = windowCond[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];
            // console.log(`${cellA} this is cella`);
            if(cellA == "" || cellB == "" || cellC == ""){
                
                continue;
            }
            if(cellA == cellB && cellB == cellC){
                roundwon = true;
                // console.log("hello");
                break;

            }
        }
        if (roundwon){
            let pl;
            if (currentplayer == "X"){
                pl = player1;
            }
            else{
                pl = player2;
            }
            statusText.textContent = `${pl} wins this round!🥳🥳`;
        }
        else if (!options.includes("")){
            statusText.textContent = `Draw!`;
            game_on = false;
        }
        else{
            changePlayer();
        }
}

function restartGame(){
    currentplayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${player1}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    game_on = true;
}
