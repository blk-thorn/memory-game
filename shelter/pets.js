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



// _______________________________Pagination__________________________________

import { jsonArr } from "./jsonarray.js";


const petsArr = mixArr(jsonArr);

function mixArr () {
    const array1 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    const array2 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    const array3 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    const array4 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    const array5 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])

    const petsArr = jsonArr.concat(array1, array2, array3, array4, array5);

    return petsArr;
}

console.log(petsArr);

const postData = petsArr;
let currentPage = 1;
const petCards = 8; 

function displayList(arrData, petsPerPage, page) {
    const postsEl = document.querySelector(".cards__container");
    postsEl.innerHTML = "";
    page--; // Уменьшаем для корректной работы с индексами, чтобы отсчет начинался с индекса [0]
    const start = page * petsPerPage; // Начальный индекс
    const end = start + petsPerPage; // Конечный индекс
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((pet) => {
        const card = document.createElement("li");
        card.classList.add("cards__item");

        const img = document.createElement("img");
        img.src = `${pet.img}`;
        img.classList.add("cards__img");

        const name = document.createElement("h3");
        name.classList.add("cards__item-title");
        name.textContent = `${pet.name}`;

        const button = document.createElement("button");
        button.classList.add("cards__btn");
        button.innerText = "Learn more";

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(button);
        postsEl.appendChild(card);
    });
}

function displayPagination(arrData, petsPerPage) {
    const liEl = document.querySelector(".pagenav__active");
    liEl.innerText = currentPage;

    const totalPages = Math.ceil(arrData.length / petsPerPage);

    // Скрываем или показываем кнопки в зависимости от текущей страницы
    btnPrev.disabled = (currentPage === 1);
    btnNext.disabled = (currentPage === totalPages);
    

    if (btnPrev.disabled) {
        btnPrev.classList.add("disabled");
        btnFirst.classList.add("disabled");
    } else {
        btnPrev.classList.remove("disabled");
        btnFirst.classList.remove("disabled");
    }

    if (btnNext.disabled) {
        btnNext.classList.add("disabled");
        btnLast.classList.add("disabled");
    } else {
        btnNext.classList.remove("disabled");
        btnLast.classList.remove("disabled");
    }
}

function handleNextBtn() {
    const totalPages = Math.ceil(postData.length / petCards);
    if (currentPage < totalPages) {
        currentPage++; // Переход на следующую страницу
    }

    // Обновляем список питомцев и элемент пагинации
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
}

function handlePrevBtn() {
    if (currentPage > 1) {
        currentPage--; // Переход на предыдущую страницу
    }

    // Обновляем список питомцев и элемент пагинации
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
}
function handleLastBtn() {
    const totalPages = Math.ceil(postData.length / petCards);
    if (currentPage < totalPages) {
        currentPage = totalPages; // Переход на последнюю страницу
    }

    // Обновляем список питомцев и элемент пагинации
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
}

function handleFirstBtn() {
    if (currentPage > 1) {
        currentPage = 1; // Переход на первую страницу
    }

    // Обновляем список питомцев и элемент пагинации
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
}

// Обработчики для кнопок
const btnNext = document.querySelector(".pagenav__button--next");
const btnPrev = document.querySelector(".pagenav__button--prev");
const btnFirst = document.querySelector(".pagenav__button--first");
const btnLast = document.querySelector(".pagenav__button--last");

btnNext.addEventListener("click", handleNextBtn);
btnPrev.addEventListener("click", handlePrevBtn);
btnLast.addEventListener("click", handleLastBtn);
btnFirst.addEventListener("click", handleFirstBtn);

// Начальная загрузка данных
displayList(postData, petCards, currentPage);
displayPagination(postData, petCards);