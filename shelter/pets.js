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
            // console.log("Клик по ссылке");
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

const postData = petsArr;
let currentPage = 1;

function getPetsCards() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 320) {
        return 3;
    } else if (windowWidth <= 768) {
        return 6;
    } else {
        return 8;
    }
}

function displayList(arrData, petsPerPage, page) {
    const postsEl = document.querySelector(".cards__container");
    postsEl.innerHTML = "";
    page--; // Чтобы отсчет начинался с индекса [0]
    const start = page * petsPerPage; // Начальный индекс
    const end = start + petsPerPage; // Конечный индекс
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((pet, index) => {
        const card = document.createElement("li");
        card.classList.add("cards__item");
        card.setAttribute("data-modal-btn", index);

        const img = document.createElement("img");
        img.src = `${pet.img}`;
        img.classList.add("cards__img");

        const name = document.createElement("h3");
        name.classList.add("cards__item-title");
        name.textContent = `${pet.name}`;

        const button = document.createElement("button");
        button.classList.add("cards__btn");
        button.innerText = "Learn more";

        // ________________________modal_____________________________
     const modal = document.createElement("div");
     modal.classList.add("modal");
     modal.setAttribute("data-modal-window", index);

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
     modalImg.src = `${pet.img}`;

     const modalName = document.createElement("h3");
     modalName.classList.add("modal__title");
     modalName.textContent = `${pet.name}`;

     const modalBreed = document.createElement("h4");
     modalBreed.classList.add("modal__subtitle");
     modalBreed.innerHTML = "<strong>" + `${pet.type}` + "- </strong> " + `${pet.breed}`;

     const modalText = document.createElement("p");
     modalText.classList.add("modal__description");
     modalText.innerHTML = `${pet.description}`;

     const modalList = document.createElement("ul");
     modalList.classList.add("modal__list");

     const liEl = document.createElement("li");
     liEl.classList.add("modal__item");
     liEl.innerHTML = "<strong>Age:</strong> " + `${pet.age}`;

     const liEl2 = document.createElement("li");
     liEl2.classList.add("modal__item");
     liEl2.innerHTML = "<strong>Inoculations:</strong> " + `${pet.inoculations}`;

     const liEl3 = document.createElement("li");
     liEl3.classList.add("modal__item");
     liEl3.innerHTML = "<strong>Diseases:</strong> " + `${pet.diseases}`;

     const liEl4 = document.createElement("li");
     liEl4.classList.add("modal__item");
     liEl4.innerHTML = "<strong>Parasites:</strong> " + `${pet.parasites}`;

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
        postsEl.appendChild(card);
    });

    
const modalContainer = document.querySelectorAll(".cards__item");

modalContainer.forEach(card => {
    card.addEventListener("click", (event) => {
        const target = event.target;
        const modalBtnElement = target.closest("[data-modal-btn]");

        if (modalBtnElement) {
            const name = modalBtnElement.dataset.modalBtn;
            const modal = document.querySelector(`[data-modal-window='${name}']`);
            modal.style.display = "flex";
            body.classList.toggle('noscroll');
            document.body.style.overflow = "hidden";

            // Закрытие модального окна при нажатии кнопки
            const closeBtn = modal.querySelector(".modal__button");
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            });
        }
    });
})
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
    const petCards = getPetsCards();
    const totalPages = Math.ceil(postData.length / petCards);
    if (currentPage < totalPages) {
        currentPage++; // Переход на следующую страницу
    }

    // Обновляем список питомцев и элемент пагинации
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
}

function handlePrevBtn() {
    const petCards = getPetsCards();
    if (currentPage > 1) {
        currentPage--;
    }

    // Обновляем список питомцев и элемент пагинации
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
}
function handleLastBtn() {
    const petCards = getPetsCards();
    const totalPages = Math.ceil(postData.length / petCards);
    if (currentPage < totalPages) {
        currentPage = totalPages; // Переход на последнюю страницу
    }

    // Обновляем список питомцев и элемент пагинации
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
}

function handleFirstBtn() {
    const petCards = getPetsCards();
    if (currentPage > 1) {
        currentPage = 1; // Переход на первую страницу
    }

    // Обновляем список питомцев и элемент пагинации
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
}

const btnNext = document.querySelector(".pagenav__button--next");
const btnPrev = document.querySelector(".pagenav__button--prev");
const btnFirst = document.querySelector(".pagenav__button--first");
const btnLast = document.querySelector(".pagenav__button--last");

btnNext.addEventListener("click", handleNextBtn);
btnPrev.addEventListener("click", handlePrevBtn);
btnLast.addEventListener("click", handleLastBtn);
btnFirst.addEventListener("click", handleFirstBtn);

function initializeDisplay() {
    const petCards = getPetsCards(); // Актуальное количество карточек
    displayList(postData, petCards, currentPage); // Список питомцев
    displayPagination(postData, petCards);
}

// Инициализация при загрузке
initializeDisplay();

window.addEventListener('resize', () => {
    const petCards = getPetsCards(); // Новое количество карточек
    const totalPages = Math.ceil(postData.length / petCards); // Пересчитываем количество страниц

    // Обновляем список питомцев и пагинацию
    displayList(postData, petCards, currentPage);
    displayPagination(postData, petCards);
});



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