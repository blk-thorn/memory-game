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
    const array1 = jsonArr;
    const array2 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    const array3 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    const array4 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    const array5 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    const array6 = jsonArr.map(i=>[Math.random(), i]).sort().map(i=>i[1])

    const petsArr = jsonArr.concat(array1, array2, array3, array4, array5);

    return petsArr;
}

console.log(petsArr);

const postData = petsArr;
let currentPage = 1;
let rows = 8;


function displayList (arrData, rowPerPage, page) {
	const postsEl = document.querySelector(".cards__container");

	const start = rowPerPage * page;
	const end = start + rowPerPage;
	const paginatedData = arrData.slice(start, end);

	paginatedData.forEach ((el) => {
		const card = document.createElement("li");
        card.classList.add("cards__item");

        const img = document.createElement("img");
        img.src = `${el.img}`;
        img.classList.add = ("cards__img");

        const name = document.createElement("h3");
        name.classList.add("cards__item-title");
        name.textContent = `${el.name}`;

        const button = document.createElement("button");
        button.classList.add("cards__btn");
        button.innerText = ("Learn more");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(button);
		postsEl.appendChild(card)
	})
};



function displayPagination (arrData, rowPerPage) {
	const paginationEl = document.querySelector(".pagenav");
	// const paginationBtns = document.getElementById("left__buttons");
	const pagesCount = Math.ceil (arrData.length / rowPerPage);

    for (let i = 0; i < pagesCount; i++) {
		const liEl = displayPaginationBtn(i + 1);
		liEl.innerText = currentPage;
	    paginationEl.appendChild(liEl);

		liEl.addEventListener("click", () => {
			console.log("Кнопка с номером страницы")
			liEl.innerText = currentPage;
			currentPage++;
		   });
	}
};
function displayPaginationBtn(page) {
	const liEl = document.querySelector(".pagenav__active");
	liEl.innerText = page;
	return liEl;
};

displayList(postData, rows, currentPage);
displayPagination(postData, rows);
