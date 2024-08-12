/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: pong
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player1 = "p";
const player2 = "e";
const ball = "b";

setLegend(
  [ player1, bitmap`
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
  [ player2, bitmap`
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
.........3333333` ],
  [ ball, bitmap`
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
)

const level = map`
....................
....................
....................
....................
....................
p..................e
p........b.........e
p..................e
p..................e
....................
....................
....................
....................
....................
....................
....................`

setMap(level);

setSolids([ player1, player2 ]);

setPushables({
  [player1]: [],
  [player2]: [],
  [ball]: []
});

// player1 movement
const p1 = getAll(player1);
onInput("w", () => {
  for (let i = 0; i < p1.length; i++) {
    p1[i].y -= 1;
  }
})
onInput("s", () => {
  for (let i = p1.length - 1; i >= 0; i--) {
    p1[i].y += 1;
  }
})

// player2 movement
const p2 = getAll(player2);
onInput("i", () => {
  for (let i = 0; i < p2.length; i++) {
    p2[i].y -= 1;
  }
})
onInput("k", () => {
  for (let i = p2.length - 1; i >= 0; i--) {
    p2[i].y += 1;
  }
})

const ballObj = getFirst(ball);
function checkHit() {
  if (ballObj.y == 0 || ballObj.y == 16) return true;

  return false;
}

var gameLoop = setInterval(() => {
  // move ball
  ballObj.x += 1;
  ballObj.y += 1;
  
  if (checkHit()) {
  }
}, 150)
