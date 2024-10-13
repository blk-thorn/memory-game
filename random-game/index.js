import { newArray } from "./data.js"

let errors = 0;

const body = document.body;
const modal = document.querySelector(".modal");
const cardsContainer = document.querySelector(".cards__container");
const restartBtn = document.querySelector(".restart__btn");
const modalRestartBtn = document.querySelector(".modal__btn");
const modalcloseBtn = document.querySelector(".modal__close");
const bestScores = JSON.parse(localStorage.getItem("bestScores")) ?? [];
const scoreTable = document.querySelectorAll(".table__score");
const recentScore = document.getElementById("errors");

const MAX_BEST_SCORE = 10;

let firstCard = null; 
let secondCard = null;
const flipDuration = 1500; // Время переворота

window.addEventListener("load", () => {
    shuffleCards(); 
    newArray.forEach((cardData) => {
        loadCards(cardData);
    });
    flipAllCards();
});

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

    card.addEventListener('click', () => {
        // Убираем клик по перевернутым и совпадающим картам
        if (card.classList.contains("flip") || card.classList.contains("match")) {
            return;
        }
    
        flipCard(card);
    
        // Если не выбрана ни одна карта
        if (firstCard === null) {
            firstCard = card;
            // console.log("firstCard", firstCard);
        } else {
            // Если первая карта уже выбрана, то это вторая карта
            secondCard = card;
            // console.log("secondCard", secondCard);
    
            // Сравниваем карты
            const firstCardFace = firstCard.querySelector(".card__face");
            const secondCardFace = secondCard.querySelector(".card__face");
    
            let firstCardNum = firstCardFace.src;
            let secondCardNum = secondCardFace.src;
    
            if (firstCardNum === secondCardNum) {
                // Если карты совпадают, добавляем класс match
                firstCard.classList.add("match");
                secondCard.classList.add("match");
                firstCard = null; // Сбрасываем первую карту
                secondCard = null; // Сбрасываем вторую карту
            } else {
                // Если карты не совпадают
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    firstCard = null;
                    secondCard = null; 
                    errors++; // Увеличиваем счетчик ошибок
                    recentScore.innerText = errors; // Обновляем значение счетчика
                }, 500);
            }
    
            // Проверяем на выигрыш
            if (newArray.length === document.querySelectorAll(".match").length) {

                const score = {score: errors};
                
                
                bestScores.push(score);
                bestScores.sort( (a, b) => a.score - b.score )
                bestScores.slice(10);
                
                localStorage.setItem("bestScores", JSON.stringify(bestScores));
                
                scoreTable.forEach((cell, index) => {
                    if (index < bestScores.length) {
                        cell.innerText = bestScores[index].score; // Извлекаем score из объекта и присваиваем
                    }
                })

                setTimeout(function() {
                    body.classList.add('noscroll');
                    modal.style.display = "flex";
                }, 600);
            }
        }
    });
    
    return card;
}


function flipCard(card) {
    card.classList.add('flip'); // Используем переданный элемент
}


//  Переворачиваем все карточки
function flipAllCards() {
    const cards = document.querySelectorAll(".card"); // Обновляем карточки
    cards.forEach(card => {
        card.classList.add('flip');
    });

    // Обратный переворот через 1,5 сек
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('flip');
        });
    }, flipDuration);
}



function shuffleCards() {
    for (let i = 0; i < newArray.length; i++) {
        let j = Math.floor(Math.random() * newArray.length) //Получить случайный индекс
        let temp = newArray[i];
        newArray[i] =  newArray[j];
        newArray[j] = temp;
    }
}


restartBtn.addEventListener("click", () => {
    window.location.reload();
});

modalRestartBtn.addEventListener("click", () => {
    window.location.reload();
});

modalcloseBtn.addEventListener ("click", () => {
    body.classList.remove('noscroll');
    modal.style.display = "none";
});

