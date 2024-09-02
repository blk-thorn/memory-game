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
 
 function shuffle(jsonArr) {
    let currentIndex = jsonArr.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [jsonArr[currentIndex], jsonArr[randomIndex]] = [
        jsonArr[randomIndex], jsonArr[currentIndex]];
    }
  };
  shuffle(jsonArr);


    let key;


    for(key = 0; key < 3; key++) {
        leftCards.innerHTML += `
        <li class="slider__card">
        <img src="${(jsonArr[key].img)}">
        <h3 class="slider__card-title">${(jsonArr[key].name)}</h3>
        <button class="card__btn">Learn more</button>
    </li>
        `
    };

    for(key = 4; key < 7; key++) {
        activeCards.innerHTML += `
        <li class="slider__card">
        <img src="${(jsonArr[key].img)}">
        <h3 class="slider__card-title">${(jsonArr[key].name)}</h3>
        <button class="card__btn">Learn more</button>
    </li>
        `
    };

    for(key = 0; key < 3; key++) {
        rightCards.innerHTML += `
        <li class="slider__card">
        <img src="${(jsonArr[key].img)}">
        <h3 class="slider__card-title">${(jsonArr[key].name)}</h3>
        <button class="card__btn">Learn more</button>
    </li>
        `
    };

    slider.querySelectorAll(".slider__card") .forEach(card => {
		card.addEventListener('click', () => {
            console.log("Клик по карте");
		})
	});


    // const cardsToShow = 3;
    // const cardsToScroll = 3;
    // let position = 0;

    const sliderWrapper = document.querySelector(".slider__wrapper")
    const cards = document.querySelectorAll(".slider__card");
    const prevBtn = document.querySelector(".slider__btn--left");
    const nextBtn = document.querySelector(".slider__btn--right");





    let i = 1;
    for(let li of slider.querySelectorAll(".slider__card")) {
      li.style.position = 'relative';
      li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
      i++;
    };







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

        let newCards;

        if (animationEvent.animationName === "move-left") {
            slider.classList.remove("transition-left");
            newCards = leftCards;
            activeCards.innerHTML = newCards.innerHTML;

            const card1 = cardTemplate();
            card1.key = Math.floor(Math.random () * 8);

            const card2 = cardTemplate();
            card2.key = Math.floor(Math.random () * 8);

            const card3 = cardTemplate();
            card3.key = Math.floor(Math.random () * 8);

            newCards.innerHTML = "",
            newCards.appendChild(card1);
            newCards.appendChild(card2);
            newCards.appendChild(card3);
;
        } else {
            slider.classList.remove("transition-right");
            newCards = rightCards;
            activeCards.innerHTML = newCards.innerHTML;

            const card1 = cardTemplate();
            card1.key = Math.floor(Math.random () * 8);

            const card2 = cardTemplate();
            card2.key = Math.floor(Math.random () * 8);

            const card3 = cardTemplate();
            card3.key = Math.floor(Math.random () * 8);

            newCards.innerHTML = "",
            newCards.appendChild(card1);
            newCards.appendChild(card2);
            newCards.appendChild(card3);
;
        };
        prevBtn.addEventListener('click', moveLeft);
        nextBtn.addEventListener('click', moveRight);
        });




        
