const apiKey = "tNC9ruDFslvlOtnNxkcyI1874_nBfQ9LguX-4ca_W_I"
const url = "https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo&per_page=12";

const imgList = document.querySelector(".images");
const form = document.querySelector("form");
const search = document.querySelector(".header__search");
const searchBtn = document.querySelector(".search__btn");

search.focus();


async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    // Очищаем перед добавлением новых фото(иначе они добавляются снизу)
    imgList.innerHTML = '';  

    data.results.forEach(image => loadImages(image));
}

getData(url);
