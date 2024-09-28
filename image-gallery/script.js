const apiKey = "tNC9ruDFslvlOtnNxkcyI1874_nBfQ9LguX-4ca_W_I"
const url = "https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo&per_page=12";
const requestUrl = "https://api.unsplash.com/search/photos";

const imgList = document.querySelector(".images");
const form = document.querySelector("form");
const search = document.querySelector(".header__search");
const searchBtn = document.querySelector(".search__btn");

search.focus();


async function getData(url) {
    const res = await fetch(url);
    console.log("res.status", res.status);
    const data = await res.json();
    // console.log(data);

    // Очищаем перед добавлением новых фото(иначе они добавляются снизу)
    imgList.innerHTML = '';  

    data.results.forEach(image => loadImages(image));
}

getData(url);


function loadImages(image) {
    let imgElement = document.createElement('img');
    imgElement.classList.add("image");
    imgElement.src = image.urls.regular;
    imgList.appendChild(imgElement);

    imgElement.addEventListener('click', () => openImageLink(image));
}


function openImageLink(image) {
    document.body.innerHTML = '<img src="' + image.urls.regular + '" style="display: flex; width: 60%; height: auto; margin: 0 auto;" alt="Large Image">';
}



function performSearch() {
    const searchTerm = search.value; // Получаем значение из поля поиска
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
    }
});

