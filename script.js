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
    if (resetScore) {
        score = 0;
        life = 3;          
    } 
    document.getElementById("score").innerText = score;
    document.getElementById("gameStatus").innerText = "...";
    document.getElementById("life").innerText = "❤️".repeat(life);
    let colors = await getRandomColors();
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("targetColor").style.backgroundColor = targetColor;

    const colorOptionsDiv = document.getElementById("colorOptions");
    colorOptionsDiv.innerHTML = "";
    colors.forEach(color => {
        const button = document.createElement("button");
        button.className = "color-option fade-in";
        button.setAttribute("data-testid", "colorOption");
        button.style.backgroundColor = color;
        button.onclick = () => handleGuess(color);
        colorOptionsDiv.appendChild(button);
    });
}

function message() {
    return `
        <span>
            <h1>Game Over!!</h1><h2>😭</h2>
            <p>Your score is: ${score} </p>
            <button id="restartButton" class="new-game-btn fade-in">Restart</button>
        </span>
    `;
}

function handleGuess(selectedColor) {
    const gameStatus = document.getElementById("gameStatus");

    if (selectedColor === targetColor) {
        score++;
        gameStatus.innerText = "Correct! 🎉";
        gameStatus.style.color = "green";
        gameStatus.classList.add("fade-in-scale");

        setTimeout(() => {
            gameStatus.classList.remove("fade-in-scale");
            startNewGame();
        }, 500);
    } else {
        life--;
        gameStatus.innerText = "❌ Oops! That's incorrect!";
        gameStatus.style.color = "red";
        gameStatus.classList.add("shake");

        setTimeout(() => {
            gameStatus.classList.remove("shake");
            startNewGame();
        }, 500);

        if (life === -1) {
            const popup = document.getElementById("popup");
            popup.innerHTML = message();
            popup.style.display = "block";
            document.getElementById("new-game-btn").style.visibility = "hidden";
            document.getElementById("restartButton").addEventListener("click", () => {
                startNewGame(true);
                popup.style.display = "none";
                document.getElementById("new-game-btn").style.visibility = "visible";
            });
        }
    }

    document.getElementById("score").innerText = score;
}

