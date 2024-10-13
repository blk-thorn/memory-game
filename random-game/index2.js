import { allCards } from "./data.js"

const newArray = allCards.flatMap(card => [card, card]); 


console.log(newArray)

const cardsContainer = document.querySelector(".cards__container");

window.addEventListener("load", () => {
        loadCards(newArray);
})

function loadCards(array) {
    array.forEach(cardData => {
    const card = document.createElement("li");
    card.classList.add("card");
    card.setAttribute("id", "card");

    const cardBack = document.createElement("img");
    cardBack.src = cardData.img2;
    cardBack.classList.add("card__back");
    cardBack.setAttribute("alt", "Card back");

    const cardFace = document.createElement("img");
    cardFace.src = cardData.img;
    cardFace.classList.add("card__face");
    cardFace.setAttribute("alt", "Card face");

    card.appendChild(cardFace);
    card.appendChild(cardBack);
    cardsContainer.appendChild(card);

    card.addEventListener('click', flipCard);

    card.addEventListener('click', function() {
        console.log("Карта была нажата!");
        flipCard.call(this); // Используем call для передачи контекста
    });
    
    function flipCard() {
        this.classList.toggle('flip'); // Здесь `this` ссылается на карточку
    }

    return card
})
}
const cards = document.querySelectorAll(".card");


function flipCard() {
    this.classList.toggle('flip');
  }
