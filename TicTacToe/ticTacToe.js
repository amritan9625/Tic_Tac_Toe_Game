let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let drawGame = document.querySelector(".draw-game");

let turnO = true;   // playerX, playerO
let count = 0;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

let resetGame = () =>{
    turnO = true;
    enableBoxes();
    count = 0;
    msgContainer.classList.add("hide");
}

// In the case of game restart
let enableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";     // for restart the game and empty the boxes.
    }
}


boxes.forEach((box) =>{
    box.addEventListener("click", () =>{    
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        checkDraw();
        checkWinner();
    });
});

let checkDraw = () =>{
    if(count === 9){
        drawGame.classList.remove("hide-draw");
        disableBoxes();
    }
}
// In the case of a winner is known.
let disableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = true;
    }
}

const checkWinner = () =>{
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
            }
        }
    }
}

let showWinner = (winner) =>{
    msg.innerText = `congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// when clicked on the reset button.
newGameBtn.addEventListener("click", resetGame);
// to reset the game.
resetBtn.addEventListener("click", resetGame);