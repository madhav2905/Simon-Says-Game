let gameSeq=[];
let userSeq=[];
let boxes=["red","yellow","blue","green"];
let started=false;
let level=0;
let p=document.querySelector("p");

document.addEventListener("keypress",startGame);
document.addEventListener("click",startGame);

function startGame() {
    if (!started) {
        started = true;
        levelUp();
    }
}

function boxFlash(box) {
    box.classList.add("flash");
    setTimeout(() => {
        box.classList.remove("flash");
    }, 150);
}
function levelUp() {
    userSeq=[];
    level++;
    p.innerText=`Level ${level}`;
    //Choosing random box
    let boxes2=document.querySelectorAll(".box"); // Assume all boxes have a "box" class
    let randomIndex=Math.floor(Math.random() * boxes.length);
    let randomBox=boxes2[randomIndex]; // Directly access the random box
    gameSeq.push(boxes[randomIndex]);
    boxFlash(randomBox);
}
function checkAns(index) {
    if (gameSeq[index]==userSeq[index]) {
        if (gameSeq.length==userSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        p.innerText=`Game Over! Your score was ${level}. Press any key to start again.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor="gray";
        }, 125);
        reset();
    }
}
function boxPress() {
    let box=this;
    boxFlash(box);
    let userColor=box.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allBoxes=document.querySelectorAll(".box");
for(box of allBoxes){
    box.addEventListener("click",boxPress);
}
function reset() {
    gameSeq=[];
    userSeq=[];
    started=false;
    level=0;
}