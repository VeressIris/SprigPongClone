/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: pong
@author: 
@tags: ['beginner']
@addedOn: 2024-08-13
*/

const player1 = "p";
const player2 = "e";
const ball = "b";

setLegend(
  [player1, bitmap`
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........
7777777.........`],
  [player2, bitmap`
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333
.........3333333`],
  [ball, bitmap`
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
.55555555555555.
..555555555555..
...5555555555...
....55555555....`]
);

const level = map`
....................
....................
....................
....................
....................
p....b.............e
p..................e
p..................e
p..................e
....................
....................
....................
....................
....................
....................
....................`;

setMap(level);

setSolids([player1, player2]);

setPushables({
  [player1]: [],
  [player2]: [],
  [ball]: []
});

var isGameOver = false;
var gameLoop;
var directionY = 1;
var directionX = 1;
var score = 0;
var ballObj = getFirst(ball);

// player 1 movement
var p1 = getAll(player1);
onInput("w", () => {
  if (isGameOver) return;
  for (let i = 0; i < p1.length; i++) {
    p1[i].y -= 1;
  }
});
onInput("s", () => {
  if (isGameOver) return;
  for (let i = p1.length - 1; i >= 0; i--) {
    p1[i].y += 1;
  }
});

// player 2 movement
var p2 = getAll(player2);
onInput("i", () => {
  if (isGameOver) return;
  for (let i = 0; i < p2.length; i++) {
    p2[i].y -= 1;
  }
});
onInput("k", () => {
  if (isGameOver) return;
  for (let i = p2.length - 1; i >= 0; i--) {
    p2[i].y += 1;
  }
});

function checkHitY() {
  return ballObj.y == 0 || ballObj.y == 15;
}

function gameOver() {
  if (ballObj.x == 0) {
    clearText();
    addText('Player 2 wins!', {
      x: 3,
      y: 6,
      color: color`3`
    });
    return true;
  }
  if (ballObj.x == 19) {
    clearText();
    addText('Player 1 wins!', {
      x: 3,
      y: 6,
      color: color`7`
    });
    return true;
  }
  return false;
}

function checkPaddleHit() {
  for (let i = 0; i < p1.length; i++) {
    if (p1[i].x == ballObj.x && p1[i].y == ballObj.y)
      return true;
  }
  for (let i = 0; i < p2.length; i++) {
    if (p2[i].x == ballObj.x && p2[i].y == ballObj.y)
      return true;
  }
  return false;
}

function resetGameState() {
  clearText();
  setMap(level);
  p1 = getAll(player1);
  p2 = getAll(player2);
  ballObj = getFirst(ball);
  isGameOver = false;
  score = 0;
  directionY = 1;
  directionX = 1;
  clearInterval(gameLoop);
}

function startGame() {
  gameLoop = setInterval(() => {
    ballObj.x += directionX;
    ballObj.y += directionY;

    // bounce ball off top and bottom walls
    if (checkHitY()) {
      directionY *= -1;
    }

    // bounce ball off paddles
    if (checkPaddleHit()) {
      directionY *= -1;
      directionX *= -1;
      score++;
    } else if (gameOver()) {
      isGameOver = true;
      addText('Score: ' + score.toString(), {
        x: 6,
        y: 8,
        color: color`0`
      });
      addText(`Press 'i' to \n play again`, {
        x: 4,
        y: 10,
        color: color`0`
      });
      clearInterval(gameLoop);
    }
  }, 125);
}

onInput("a", () => {
  if (!isGameOver) return;
  resetGameState();
  startGame();
});

startGame();
