let gridBoxes = document.querySelectorAll(".grid-box");
let currentPlayer = "X";
let gameOver = false;

gridBoxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!gameOver && box.innerHTML === "") {
            box.innerHTML = currentPlayer;
            checkWin();
            checkDraw();
            switchPlayer();
        }
    });
});

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.querySelector(".background-effect").style.left = currentPlayer === "O" ? "100px" : "0";
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        let [v0, v1, v2] = condition.map(index => gridBoxes[index].innerHTML);
        
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            gameOver = true;
            document.querySelector("#game-results").innerHTML = currentPlayer + " wins!";
            document.querySelector("#restart-game").style.display = "inline";

            for (let index of condition) {
                gridBoxes[index].style.backgroundColor = "#2E2923";
                gridBoxes[index].style.color = "#FFE74C";
            }
        }
    }
}

function checkDraw() {
    if (!gameOver) {
        let isDraw = Array.from(gridBoxes).every(box => box.innerHTML !== "");

        if (isDraw) {
            gameOver = true;
            document.querySelector("#game-results").innerHTML = "It's a draw!";
            document.querySelector("#restart-game").style.display = "inline";
        }
    }
}

document.querySelector("#restart-game").addEventListener("click", () => {
    gameOver = false;
    currentPlayer = "X";
    document.querySelector(".background-effect").style.left = "0";
    document.querySelector("#game-results").innerHTML = "";
    document.querySelector("#restart-game").style.display = "none";

    gridBoxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#2E2923";
    });
});

