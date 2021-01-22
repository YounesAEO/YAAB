const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cards = { E: "Emperor", C: "Citizen", S: "Slave" };
const cardsKillers = { E: "S", C: "E", S: "C" };

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

class Player {
  constructor(name, side) {
    this.name = name;
    this.roundsWon = 0;
    this.gain = 0;
    this.playingCards = [];
    this.side = side;
  }
  drawCards() {
    for (let i = 0; i < 4; i++) {
      this.playingCards.push(cards.C);
    }
    this.playingCards.push(this.side);
    this.shuffleCards();
  }
  shuffleCards() {
    for (let i = this.playingCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.playingCards[i];
      this.playingCards[i] = this.playingCards[j];
      this.playingCards[j] = temp;
    }
  }
  playTurn() {
    let playerChoice = "";
    if (this.side == cards.E)
      readline.question("What to play Emperor (E) , Citizen (C)?", (choice) => {
        playerChoice = choice;
      });
    else
      readline.question("What to play Slave (S) , Citizen (C)?", (choice) => {
        playerChoice = choice;
      });

    if (playerChoice == null) return null;
    if (playerChoice.length == 1)
      playerChoice = cards[playerChoice.toUpperCase()];
    const playedCardIndex = this.playingCards.indexOf(playerChoice);
    const playedCard = this.playingCards.splice(playedCardIndex, 1);
    console.log(this.playingCards);
    return playedCard;
  }
}

class Game {
  constructor() {
    this.totalRounds = 12;
    this.currentRound = 1;
    this.switchingRound = 3;
    this.maxPlays = 4;
    this.currentPlay = 1;
    this.player1 = new Player(cards.E);
    this.player2 = new Player(cards.S);
    this.player1.drawCards();
    this.player2.drawCards();
  }
  nextPlay() {
    this.currentPlay++;
  }
  nextRound() {
    this.currentRound++;
  }

  findWinner(firstPlayerCard, secondPlayerCard) {
    const firstKey = getKeyByValue(cards, firstPlayerCard);
    const secondKey = getKeyByValue(cards, secondPlayerCard);
    if (cardsKillers[firstKey] == secondKey) return 2;
    else if (cardsKillers[secondKey] == firstKey) return 1;
    else return 0;
  }

  startGame() {
    while (this.currentPlay < this.maxPlays) {
      this.player1.playTurn();
      this.player2.playTurn();
    }
  }
}
