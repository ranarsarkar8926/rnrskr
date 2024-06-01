let cnt = 0;
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const disableBox=()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBox=()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}
const draw=()=>{
    msg.innerText = "Shit! there is no winner";
    msgContainer.classList.remove("hide");
    disableBox();
}
const showWinner=(winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
}
const resetGame=()=>{
    turnO=true;
    cnt = 0;
    enableBox();
    msgContainer.classList.add("hide");
}
const checkWinner=()=>{
    for(pattern of winPatterns){
        let valP1 = boxes[pattern[0]].innerText;
        let valP2 = boxes[pattern[1]].innerText;
        let valP3 = boxes[pattern[2]].innerText;
        if(valP1!="" && valP2!="" && valP3!=""){
            if(valP1 === valP2 && valP2 === valP3){
                showWinner(valP1 );
                return true;
            }
        }
    }
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        cnt++;
        let isWin = checkWinner();
        if(cnt===9 && !isWin){
            draw();
        }
        
    });
});
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);