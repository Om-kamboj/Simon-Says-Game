let level = 0;
let started = false;
let h2Large = document.getElementById("large");
let h2Small = document.getElementById("small");
let btn = ["blue", "orange", "pink", "teal"];
let allBtns = document.querySelectorAll(".btn");
let gameSeq = [];
let userSeq = [];

function updateHeadingVisibility() {
    if (window.innerWidth <= 480) {
        h2Large.style.display = "none";
        h2Small.style.display = "block";
    } else {
        h2Large.style.display = "block";
        h2Small.style.display = "none";
    }
}

updateHeadingVisibility();
window.addEventListener("resize", updateHeadingVisibility);

function startGame() {
    if (!started) {
        started = true;
        levelUP();
    }
}

document.addEventListener("keypress", startGame);      
document.addEventListener("touchstart", startGame);     

function levelUP() {
    userSeq = [];
    level++;
    h2Large.innerText = `Level ${level}`;
    h2Small.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btn[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    btnFlash(randBtn);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUP, 1000);
        }
    } else {
        h2Large.innerHTML = `Game over! Your score was <b>${level}</b><br>Press any key to start again`;
        h2Small.innerHTML = `Game over! Your score was <b>${level}</b><br>Press anywhere to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2Large.innerText = "Press any key to start";
    h2Small.innerText = "Press anywhere to start";
}