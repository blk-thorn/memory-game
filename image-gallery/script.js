import { apiKey } from "./key.js";

const url = "https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo&per_page=12";
const requestUrl = "https://api.unsplash.com/search/photos";

const imgList = document.querySelector(".images");
const form = document.querySelector("form");
const search = document.querySelector(".header__search");
const searchBtn = document.querySelector(".search__btn");
const body = document.querySelector("body");
let imgContainer;

search.focus();


async function getData(url) {
    const res = await fetch(url);
    console.log("res.status", res.status);
    const data = await res.json();
    console.log(data);

    // Нужно очистить перед добавлением новых фото(иначе они добавляются снизу)
    imgList.innerHTML = '';  

    data.results.forEach(image => loadImages(image));
}

getData(url);


function loadImages(image) {
    let imgElement = document.createElement("img");
    imgElement.classList.add("image");
    imgElement.setAttribute('alt', image.alt_description || "Regular Image");
    imgElement.src = image.urls.regular;
    imgList.appendChild(imgElement);

    imgElement.addEventListener("click", () => openImageLink(image));
}


function openImageLink(image) {
    imgContainer = document.createElement("div");
    imgContainer.classList.add("modal");
    
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("modalWrapper");

    const modalBtn = document.createElement("button");
    modalBtn.classList.add("material-symbols-outlined", "close__btn");
    modalBtn.textContent = "close"

    let imgElement = document.createElement("img");
    imgElement.classList.add("imgModal");
    imgElement.setAttribute('alt', image.alt_description || 'Large Image');
    imgElement.src = image.urls.regular;

    imgWrapper.appendChild(modalBtn);
    imgWrapper.appendChild(imgElement);
    imgContainer.appendChild(imgWrapper);
    imgList.appendChild(imgContainer);
    
    body.classList.add("noscroll");
    modalBtn.addEventListener("click", () => {
        closeModal();
    });

    imgContainer.addEventListener("click", (e) => {
        if (e.target === imgContainer ||
            e.target === imgWrapper) {
            closeModal();
        }
    });

    function closeModal() {
        imgContainer.remove();
        body.classList.remove("noscroll");
    }

}


function performSearch() {
    const searchTerm = search.value; // Значение из поля поиска
    if (searchTerm) {
        const apiSearchUrl = `${requestUrl}?query=${encodeURIComponent(searchTerm)}&client_id=${apiKey}&per_page=12`;
        getData(apiSearchUrl);
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    performSearch();
})

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    performSearch(); 
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        search.value = "";
        imgContainer.remove();
        body.classList.remove("noscroll");
    }
});

