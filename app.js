let h2 = document.querySelector("h2");
let userseq = [];
let gameseq = [];
let btns = ["yellow", "red", "green", "purple"];
let started = false;
let level = 0;
let highscr = 0;

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelup();
    }
});
h2.addEventListener("click", function (event) {
    if (event.target.nodeName==="SPAN") {
        if (started == false) {
            console.log("game is started");
            started = true;
            levelup();
        }
    }
});
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
function levelup() {
    level++;
    h2.innerText = `level ${level}`;
    userseq = [];
    let randInx = Math.floor(Math.random() * 3);
    let randColor = btns[randInx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    btnflash(randbtn);
}
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnpress);
}
function btnpress() {
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}
function checkAns(Idx) {
    if (userseq[Idx] == gameseq[Idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        if (highscr < level) {
            highscr = level;
            setdata();
        }
        h2.innerHTML = `Game Over! your score was <b>${level}<b> <br> Highest score is ${highscr} <br> Press any key to start OR <br><span>Click here</span>`;
        reset();
        document.querySelector("body").style.background = "red";
        setTimeout(() => {
            document.querySelector("body").style.background = "linear-gradient(to right, rgb(190, 108, 31), rgb(182, 221, 10), rgb(60, 221, 54))";
        }, 150);
    }
}
function reset() {
    started = false;
    level = 0;
    userseq = [];
    gameseq = [];
}
function setdata() {
    localStorage.setItem("data", highscr);
}
function showdata() {
    localStorage.getItem("data");
}
showdata();