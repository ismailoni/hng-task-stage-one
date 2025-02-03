let targetColor = null;
let score = 0;
let life = 3;

async function loadColors() {
    const response = await fetch("colors.json");
    const data = await response.json();
    return data.colors;
}

async function getRandomColors() {
    let colors = await loadColors();
    let shuffled = colors.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
}


async function startNewGame(resetScore = false) {
    if (resetScore) score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("life").innerText = "❤️".repeat(life);
    document.getElementById("gameStatus").innerText = "Guess the correct color!";

    let colors = await getRandomColors();
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("targetColor").style.backgroundColor = targetColor;

    const colorOptionsDiv = document.getElementById("colorOptions");
    colorOptionsDiv.innerHTML = "";
    colors.forEach(color => {
        const button = document.createElement("button");
        button.className = "color-option fade-in";
        button.style.backgroundColor = color;
        button.onclick = () => handleGuess(color);
        colorOptionsDiv.appendChild(button);
    });
}

function message() {
    return `
        <span>
            <h1>Game Over!! 😭</h1>
            <p>Your score is: ${score} </p>
            <button id="restartButton" class="new-game-btn fade-in">Restart</button>
            </span>
    `;
}

function handleGuess(selectedColor) {
    if (selectedColor === targetColor) {
        score++;
        document.getElementById("gameStatus").innerText = "Correct! 🎉";
        setTimeout(() => {
            startNewGame();
        }, 1000)
    } else {
        life = life - 1;
        document.getElementById("gameStatus").innerText = "Wrong! Try again. ❌";
        if (life == 0) {
           const popup = document.getElementById("popup");
           popup.innerHTML = message();
           popup.style.display = "block";
           document.getElementById("restartButton").addEventListener("click", () => {
              window.location.reload();
           })
        } else {
            setTimeout(() => {
                startNewGame();
             }, 1000)
           }        
    
        }
    document.getElementById("score").innerText = score;
}

window.onload = startNewGame;

