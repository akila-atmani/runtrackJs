const correctOrder = [
    "images/logo1.PNG", "images/logo2.PNG", "images/logo3.PNG", 
    "images/logo4.PNG", "images/logo5.PNG", "images/logo6.PNG", 
    "images/logo7.PNG", "images/logo8.PNG", ""
];

let currentOrder = [...correctOrder];
const tiles = document.querySelectorAll('.tile');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
let emptyIndex;

function initializeGame() {
    do {
        currentOrder = shuffleArray([...correctOrder]);
    } while (!isSolvable(currentOrder) || JSON.stringify(currentOrder) === JSON.stringify(correctOrder));
    
    emptyIndex = currentOrder.indexOf("");
    updateBoard();
    message.textContent = '';
    restartBtn.style.display = 'none';
}

function shuffleArray(array) {
    let shuffled = array.slice(0, -1); // Exclure la case vide
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.push(""); // Ajouter la case vide à la fin
    return shuffled;
}

function isSolvable(arr) {
    let inversionCount = 0;
    const tiles = arr.filter(tile => tile !== "");
    for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            if (tiles[i] > tiles[j]) inversionCount++;
        }
    }
    return inversionCount % 2 === 0;
}

function moveTile(index) {
    const validMoves = getValidMoves(emptyIndex);
    if (validMoves.includes(index)) {
        [currentOrder[emptyIndex], currentOrder[index]] = [currentOrder[index], currentOrder[emptyIndex]];
        emptyIndex = index;
        updateBoard();
        if (isGameWon()) {
            message.textContent = "Vous avez gagné !";
            message.className = "message win";
            restartBtn.style.display = "inline-block";
        }
    }
}

function getValidMoves(emptyIndex) {
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    const moves = [];
    if (col > 0) moves.push(emptyIndex - 1);
    if (col < 2) moves.push(emptyIndex + 1);
    if (row > 0) moves.push(emptyIndex - 3);
    if (row < 2) moves.push(emptyIndex + 3);
    return moves;
}

function updateBoard() {
    tiles.forEach((tile, index) => {
        tile.style.backgroundImage = currentOrder[index] ? `url('${currentOrder[index]}')` : '';
        tile.classList.toggle('empty', currentOrder[index] === "");
    });
}

function isGameWon() {
    return JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
}

tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => moveTile(index));
});

restartBtn.addEventListener('click', initializeGame);
shuffleBtn.addEventListener('click', initializeGame);
initializeGame();