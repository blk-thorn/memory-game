
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
    //  event.target.classList.contains('menu__list') == true ||
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
     card.setAttribute("data-modal-btn", i);
 
     const img = document.createElement("img");
     img.src = array[i].img;
     img.classList.add("cards__img");
 
     const name = document.createElement("h3");
     name.classList.add("slider__card-title");
     name.textContent = array[i].name;
 
     const button = document.createElement("button");
     button.classList.add("card__btn");
     button.innerText = "Learn more";

// ________________________modal_____________________________
     const modal = document.createElement("div");
     modal.classList.add("modal");
     modal.setAttribute("data-modal-window", i);

     const modalWrapper = document.createElement("div");
     modalWrapper.classList.add("modal__wrapper")

     const modalContent = document.createElement("div");
     modalContent.classList.add("modal__content");

     const modalInner = document.createElement("div");
     modalInner.classList.add("modal__inner");

     const modalInnerText = document.createElement("div");
     modalInnerText.classList.add("modal__text");

     const modalImg = document.createElement("img");
     modalImg.classList.add("modal__img");
     modalImg.src = array[i].img;

     const modalName = document.createElement("h3");
     modalName.classList.add("modal__title");
     modalName.textContent = array[i].name;

     const modalBreed = document.createElement("h4");
     modalBreed.classList.add("modal__subtitle");
     modalBreed.innerHTML = "<strong>" + array[i].type + " - </strong> " + array[i].breed;

     const modalText = document.createElement("p");
     modalText.classList.add("modal__description");
     modalText.innerHTML = array[i].description;

     const modalList = document.createElement("ul");
     modalList.classList.add("modal__list");

     const liEl = document.createElement("li");
     liEl.classList.add("modal__item");
     liEl.innerHTML = "<strong>Age:</strong> " + array[i].age;

     const liEl2 = document.createElement("li");
     liEl2.classList.add("modal__item");
     liEl2.innerHTML = "<strong>Inoculations:</strong> " + array[i].inoculations;

     const liEl3 = document.createElement("li");
     liEl3.classList.add("modal__item");
     liEl3.innerHTML = "<strong>Diseases:</strong> " + array[i].diseases;

     const liEl4 = document.createElement("li");
     liEl4.classList.add("modal__item");
     liEl4.innerHTML = "<strong>Parasites:</strong> " + array[i].parasites;

     const modalButton = document.createElement("button");
     modalButton.classList.add("modal__button");
     modalButton.textContent = "\u00D7";


     card.appendChild(modal);
     modal.appendChild(modalWrapper);
     modalWrapper.appendChild(modalContent);
     
     modalContent.appendChild(modalInner);
     modalContent.appendChild(modalInnerText);

     modalWrapper.appendChild(modalButton);

     modalList.appendChild(liEl);
     modalList.appendChild(liEl2);
     modalList.appendChild(liEl3);
     modalList.appendChild(liEl4);


     modalInnerText.appendChild(modalName);
     modalInnerText.appendChild(modalBreed);
     modalInnerText.appendChild(modalText);
     modalInnerText.appendChild(modalList);

     modalInner.appendChild(modalImg);


     card.appendChild(img);
     card.appendChild(name);
     card.appendChild(button);
     
     const modalContainer = document.querySelectorAll(".slider__card");
     // Добавляем обработчик событий на каждый элемент
     modalContainer.forEach(card => {
         card.addEventListener("click", (event) => {
             // Целевой элемент клика
             const target = event.target;
     
             // Ищем ближайший элемент с data-modal-btn
             const modalBtnElement = target.closest("[data-modal-btn]");
     
             // Если такой элемент найден, получаем имя модального окна
             const name = modalBtnElement.dataset.modalBtn;
     
             // Находим модальное окно по имени
             const modal = document.querySelector(`[data-modal-window='${name}']`);
 
                 modal.style.display = "flex";
                 body.classList.toggle('noscroll');
                 document.body.style.overflow = "hidden";
 
         });
     });
 
     return card;

 }
 
 const shuffledArr = shuffle([...jsonArr]); // Клонируем и перемешиваем массив
 
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

 const screenWidth = window.innerWidth;

 if (screenWidth >= 768 && screenWidth <= 1279) {
     addUniqueCards(activeCards, 2);
     addUniqueCards(leftCards, 2);
     addUniqueCards(rightCards, 2);
 } else if (screenWidth < 768 && screenWidth >= 320) {
     addUniqueCards(activeCards, 1);
     addUniqueCards(leftCards, 1);
     addUniqueCards(rightCards, 1);
 } else {
     addUniqueCards(activeCards, 3);
     addUniqueCards(leftCards, 3);
     addUniqueCards(rightCards, 3);
 }

 
//  function addUniqueCards(container, count, usedIndices) {
//     while (usedIndices.size < count) {
//         const index = Math.floor(Math.random() * shuffledArr.length);
//         if (!usedIndices.has(index)) {
//             usedIndices.add(index); // Добавляем индекс в множество использованных
//             const newCard = cardTemplate(shuffledArr, index); // Создаем карточку
//             container.appendChild(newCard); // Добавляем карточку в контейнер
//         }
//     }
// }


    const sliderWrapper = document.querySelector(".slider__wrapper")
    const cards = document.querySelectorAll(".slider__card").innerHTML;
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


    // const usedLeftIndices = new Set(); // Использованные индексы для левой колонки
    // const usedRightIndices = new Set(); // Использованные индексы для правой колонки
    let currentCardCount;
    

    function updateCardCount() {  
         const screenWidth = window.innerWidth;
        if (screenWidth < 768 && screenWidth >= 320) {
            currentCardCount = 1;
        } else if (screenWidth >= 768 && screenWidth <= 1279) {
            currentCardCount = 2;
        } else {
            currentCardCount = 3;
        }
    }
    
    slider.addEventListener("animationend", (animationEvent) => {
        let changedCards;
        updateCardCount();
    
        if (animationEvent.animationName === "move-left") {
            slider.classList.remove("transition-left");
            changedCards = leftCards;
            activeCards.innerHTML = changedCards.innerHTML;
    
            changedCards.innerHTML = "";
    
            addUniqueCards(leftCards, currentCardCount);
        } else {
            slider.classList.remove("transition-right");
            changedCards = rightCards;
            activeCards.innerHTML = changedCards.innerHTML;
    
            changedCards.innerHTML = "";
    
            addUniqueCards(rightCards, currentCardCount);
        }
    
        prevBtn.addEventListener('click', moveLeft);
        nextBtn.addEventListener('click', moveRight);
    });
    
    const mediaQueryMobile = window.matchMedia('(min-width: 320px) and (max-width: 767px)');
    const mediaQueryTablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');

    function updateCardDisplay() {
        updateCardCount(); 
        addUniqueCards(currentCardCount);
    }
    
    function handleMediaQueryChange() {
        // console.log('Ширина:', window.innerWidth);
        
        if (mediaQueryMobile.matches) {
            updateCardDisplay(); 
        } else if (mediaQueryTablet.matches) {
            updateCardDisplay();
        } else {
            console.log('error');
        }
    }
    
    window.addEventListener('resize', handleMediaQueryChange);

    handleMediaQueryChange();




        window.onclick = function (e) {
            if (
                e.target.classList.contains("modal__wrapper")||
                e.target.classList.contains("modal__button")||
                e.target.hasAttribute("data-modal-window")) {
                
                let modals = document.querySelectorAll("*[data-modal-window]");
                for (let i = 0; i < modals.length; i++) {
                    modals[i].style.display = "none";
                }
                document.body.style.overflow = "auto";
            }
        };