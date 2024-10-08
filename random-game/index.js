import { allCards } from "./data.js"

console.log(allCards)


const cardsContainer = document.querySelector(".cards__container");

window.addEventListener("load", () => {
    for (let i = 0; i < allCards.length * 2; i++) {
        // Используем остаток от деления, чтобы получить индекс в пределах массива cards
        const cardSrc = allCards[i % allCards.length];
        loadCards(cardSrc);
    }
})

function loadCards(array) {
    const card = document.createElement("li");
    card.classList.add("card");

    const cardBack = document.createElement("img");
    cardBack.src = array.img2;
    cardBack.classList.add("card__back");
    cardBack.setAttribute("alt", "Card back");

    const cardFace = document.createElement("img");
    cardFace.src = array.img;
    cardFace.classList.add("card__face");
    cardFace.setAttribute("alt", "Card face");

    card.appendChild(cardFace);
    card.appendChild(cardBack);
    cardsContainer.appendChild(card);

    card.addEventListener('click', flipCard);
}
const cards = document.querySelectorAll(".card");
console.log(cards)

function flipCard() {
    this.classList.toggle('flip');
  }
