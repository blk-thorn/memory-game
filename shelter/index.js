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
    for (let i = jsonArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [jsonArr[i], jsonArr[j]] = [jsonArr[j], jsonArr[i]];
    }
    };
  shuffle(jsonArr);

  function cardTemplate(jsonArr) {
    // shuffle(jsonArr);
    for (let i = 0; i < jsonArr.length; i++) {
        const card = document.createElement("li");
        card.classList.add("slider__card");

        const img = document.createElement("img");
        img.src = jsonArr[i].img;
        img.classList.add = ("cards__img");

        const name = document.createElement("h3");
        name.classList.add("slider__card-title");
        name.textContent = jsonArr[i].name;

        const button = document.createElement("button");
        button.classList.add("card__btn");
        button.innerText = ("Learn more");



        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(button);
        return card;
    };

    
}

for (let i = 0; i < 3; i++) {
    const card = cardTemplate(jsonArr);
    activeCards.appendChild(card );
}
for (let i = 0; i < 3; i++) {
    const card = cardTemplate(jsonArr);
    leftCards.appendChild(card);
}
for (let i = 0; i < 3; i++) {
    const card = cardTemplate(jsonArr);
    rightCards.appendChild(card);
}

let i = 1;
for(let li of slider.querySelectorAll(".slider__card")) {
  li.style.position = 'relative';
  li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
  i++;
};



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

            for (let i = 0; i < 3; i++) {
                // shuffle(jsonArr);
                const card = cardTemplate(jsonArr);
                changedCards.appendChild(card);
            }
        } else {
            slider.classList.remove("transition-right");
            changedCards = rightCards;
            activeCards.innerHTML = changedCards.innerHTML;

            changedCards.innerHTML = "";

            for (let i = 0; i < 3; i++) {
                const card = cardTemplate(jsonArr);
                changedCards.appendChild(card);
            };
        };
        prevBtn.addEventListener('click', moveLeft);
        nextBtn.addEventListener('click', moveRight);
        });




        
