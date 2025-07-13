let boxes=document.querySelectorAll('.box');
let resetBtn=document.querySelector('#reset');
let msg = document.querySelector('.msg'); 
let newGame=document.querySelector('.new-game');
var count=0;
console.log(count);

const winningPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let turnO=true;



boxes.forEach((box) => {
    box.addEventListener("click", () => {
           if (box.textContent !== "" || box.classList.contains("disabled")) {
            var overAudio = new Audio('overclick.mp3');
            overAudio.play();
            return; 
        }
        count += 1;
       
        var audio = new Audio('click.mp3');
        audio.play();
        console.log("Box clicked");
        if (turnO) {
            box.textContent = "O";
            box.style.backgroundColor = "lightyellow";
            turnO = false;
        } else {
            box.textContent = "X";
            box.style.backgroundColor = "lightblue";
            turnO = true;
        }
        box.classList.add("disabled"); 
        checkwinner();
    });
    
});
const checkwinner = () => {
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                boxes[pattern[0]].style.backgroundColor = "green";
                boxes[pattern[1]].style.backgroundColor = "green";
                boxes[pattern[2]].style.backgroundColor = "green";
                showwinner(pos1Val);
                return true;
            }
        }
    }
     if ( count === 9) {
            gamedraw();
        }
    
    return false;
}
resetBtn.addEventListener("click", () => {
    var resetAudio = new Audio('reset.mp3');
    resetAudio.play();
    boxes.forEach((box) => {
        box.textContent = "";
        box.style.backgroundColor = "";
        box.classList.remove("disabled"); 
    });
    turnO = true; 
});
newGame.addEventListener("click", () => {
    var resetAudio = new Audio('reset.mp3');
    resetAudio.play();
    boxes.forEach((box) => {
        box.textContent = "";
        box.style.backgroundColor = "";
        box.classList.remove("disabled");
    });
    turnO = true;
    count = 0;
    let status = document.querySelector('.status');
    status.innerText = "";
    msg.classList.add('hide'); 
});


const showwinner = (winner) => {
    let status = document.querySelector('.status');
    status.innerText = `Congratulations! ${winner} is the winner!`;
    msg.classList.remove('hide');
    var audio = new Audio('win.wav');
    audio.play();
    disableboxes();
}

const gamedraw = () => {
    let status = document.querySelector('.status');
    status.innerText = 'GAME DRAW! PLAY AGAIN';
    msg.classList.remove('hide');
    disableboxes(); 
}



const disableboxes=()=>{
    for(let box of boxes) {
        box.classList.add("disabled");
    }
}


