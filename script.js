///////////////////////////////////////////////////
//////////////////  Loading Page  /////////////////
///////////////////////////////////////////////////

window.onload = async function() {
    let progressBar = document.getElementById("progressBar");
    let loadingScreen = document.getElementById("loadingScreen");
    let gameContainer = document.getElementById("gameContainer");

    let progress = 0;
    let loadingInterval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(loadingInterval);

            // Hide loading screen and show game
            loadingScreen.style.display = "none";
            gameContainer.style.display = "flex";

            // Start the game
            startNewGame();
        } else {
            progress += 10;
            progressBar.style.width = progress + "%";
        }
    }, 200);
    startNewGame();
};




///////////////////////////////////////////////////
//////////////////  Game Scripts  /////////////////
///////////////////////////////////////////////////


let targetColor = null;
let score = 0;
let life = 3;
let cachedColors = null;

async function loadColors() {
    if (cachedColors) {
        return cachedColors;
    }
    const response = await fetch("colors.json");
    const data = await response.json();
    cachedColors = data.colors;
    return cachedColors;
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
    document.getElementById("gameStatus").innerText = "...";

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
        }, 500)
    } else {
        life = life - 1;
        document.getElementById("gameStatus").innerText = "Wrong!! ❌❌❌";
        if (life == -1) {
           const popup = document.getElementById("popup");
           popup.innerHTML = message();
           popup.style.display = "block";
           document.getElementById("restartButton").addEventListener("click", () => {
               window.location.reload();
            })
        } else {
            setTimeout(() => {
                startNewGame();
            }, 500)
        }        
        
    }
    button.disabled
    document.getElementById("score").innerText = score;
}
