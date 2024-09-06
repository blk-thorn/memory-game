// document.querySelector(".burger").addEventListener("click", function(){
//     this.classList.toggle("burger--active")
//     document.querySelector(".menu__list").classList.toggle("menu__list--active")
//     document.querySelector("body").classList.toggle("noscroll")
// });


// document.querySelectorAll('.menu__item').addEventListener('click', function() {
// this.classList.remove(("menu__list--active"))
// document.querySelector(".burger").classList.remove("burger--active")
// });

const menu = document.querySelector('.menu__list');
const menuBtn = document.querySelector('.burger');
const body = document.body;

if (menu && menuBtn) {
	menuBtn.addEventListener('click', e => {
		menu.classList.toggle('menu__list--active');
		menuBtn.classList.toggle('burger--active');
		body.classList.toggle('noscroll');
	})

	menu.addEventListener('click', e => {
		if (e.target.classList.contains('menu__item-link')) {
			menu.classList.remove('menu__list--active');
			menuBtn.classList.remove('burger--active');
			body.classList.remove('noscroll');
		}
	})

	menu.querySelectorAll('.menu__item-link').forEach(link => {
		link.addEventListener('click', (event) => {
			menu.classList.remove('menu__list--active');
			menuBtn.classList.remove('burger--active');
			body.classList.remove('noscroll');
            event._isClicked = true;
            console.log("Клик по ссылке");
		})
	})
};


body.addEventListener('click', (event) => {
    if( 
     event._isClicked === true ||
     event.target.classList.contains('menu__list') == true ||
     event.target.classList.contains('menu__item-link') == true  ||
     event.target.classList.contains('burger') == true ||
     event.target.classList.contains('burger__line') == true
    ) return;
    // console.log("Клик вне блока");

   menu.classList.remove('menu__list--active');
   menuBtn.classList.remove('burger--active');
   body.classList.remove('noscroll');
});


// _________________________________SLIDER__________________________________
 import { jsonArr } from "./jsonarray.js";

 const slider = document.querySelector(".pets__slider");
 let leftCards = document.querySelector(".left__cards");
 let rightCards = document.querySelector(".right__cards");
 let activeCards = document.querySelector(".active__cards");
 
 // Функция для перемешивания массива
 function shuffle(array) {
     for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
     }
     return array;
 }
 
 // Создание карточки
 function cardTemplate(array, i) {
     const card = document.createElement("li");
     card.classList.add("slider__card");
 
     const img = document.createElement("img");
     img.src = array[i].img;
     img.classList.add("cards__img");
 
     const name = document.createElement("h3");
     name.classList.add("slider__card-title");
     name.textContent = array[i].name;
 
     const button = document.createElement("button");
     button.classList.add("card__btn");
     button.innerText = "Learn more";
 
     card.appendChild(img);
     card.appendChild(name);
     card.appendChild(button);
 
     return card;
 }
 
 // Перемешиваем массив
 const shuffledArr = shuffle([...jsonArr]); // Клонируем и перемешиваем массив
 
 // Добавление уникальных карточек
 function addUniqueCards(container, count) {
     const usedIndices = new Set(); // Множество для отслеживания использованных индексов
 
     while (usedIndices.size < count) {
         const index = Math.floor(Math.random() * shuffledArr.length);
         if (!usedIndices.has(index)) { // Проверяем, использовался ли индекс
             usedIndices.add(index); // Добавляем индекс в множество
             const newCard = cardTemplate(shuffledArr, index); // Создаем карточку
             container.appendChild(newCard); // Добавляем карточку в контейнер
         }
     }
 }
 

 addUniqueCards(activeCards, 3);
 addUniqueCards(leftCards, 3);
 addUniqueCards(rightCards, 3);



    const sliderWrapper = document.querySelector(".slider__wrapper")
    const cards = document.querySelectorAll(".slider__card");
    const prevBtn = document.querySelector(".slider__btn--left");
    const nextBtn = document.querySelector(".slider__btn--right");


    const moveLeft = () => {
        slider.classList.add("transition-left");
        prevBtn.removeEventListener('click', moveLeft);
        nextBtn.removeEventListener('click', moveRight);
    }
    const moveRight = () => {
        slider.classList.add("transition-right");
        prevBtn.removeEventListener('click', moveLeft);
        nextBtn.removeEventListener('click', moveRight);
    }

    prevBtn.addEventListener('click', moveLeft);
    nextBtn.addEventListener('click', moveRight);


    slider.addEventListener("animationend", (animationEvent) => {

        let changedCards;

        if (animationEvent.animationName === "move-left") {
            slider.classList.remove("transition-left");
            changedCards = leftCards;
            activeCards.innerHTML = changedCards.innerHTML;

            changedCards.innerHTML = "";

            addUniqueCards(leftCards, 3);

   
        } else {
            slider.classList.remove("transition-right");
            changedCards = rightCards;
            activeCards.innerHTML = changedCards.innerHTML;

            changedCards.innerHTML = "";

            addUniqueCards(rightCards, 3);
        };
        prevBtn.addEventListener('click', moveLeft);
        nextBtn.addEventListener('click', moveRight);
        });




        
