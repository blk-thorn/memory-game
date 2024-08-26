document.querySelector(".burger").addEventListener("click", function(){
    this.classList.toggle("burger--active")
    document.querySelector(".menu__list").classList.toggle("menu__list--active")
})

