# Color Guessing Game

A fun and interactive web game where players need to guess the color shown in a box by selecting one of the color options provided. The game keeps track of the player's score and remaining lives, with the player losing lives on incorrect guesses. The game ends when the player runs out of lives.

## Features
- Guess the correct color from the given options.
- Track the score and remaining lives.
- Smooth animations and hover effects.
- Game over screen with the option to restart the game.

## How to Play
1. A color will be displayed in a box at the top of the page.
2. Below the box, several color options will appear. Click on one of them to guess the color.
3. If your guess is correct, your score increases by one and a new round starts.
4. If your guess is wrong, you lose a life.
5. The game ends when you lose all your lives.
6. Click the "New Game" button at any time to restart the game with a fresh start.

## Technologies Used
- **HTML**: For the structure of the game.
- **CSS**: For styling and animations.
- **JavaScript**: For the game logic and functionality.
- **JSON**: To load the color options dynamically from an external file (`colors.json`).

## File Structure
├── index.html # Main HTML file 
├── styles.css # Styles for the game 
├── script.js # Game logic 
├── colors.json # A JSON file containing color data (optional) 
└── README.md # This file


## How to Run the Game Locally
1. Download or clone this repository to your local machine.
2. Ensure you have the `colors.json` file in the same directory as the HTML file. If you don't have it, you can create a simple JSON file with color data like this:
   ```json
   {
     "colors": ["#FF5733", "#33FF57", "#5733FF", "#F0FF33", "#FF33F0", "#33F0FF"]
   }
3. Open the index.html file in your browser to play the game.


## Acknowledgements
The game was created by Ismail Oni as part of the HNG Internship Stage 1 Frontend Task.
Thank you to freepik for the game icon and design inspiration.
Feel free to contribute, report issues, or improve the game in any way!
