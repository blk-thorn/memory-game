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
		menu.classList.toggle('menu__list--active')
		menuBtn.classList.toggle('burger--active')
		body.classList.toggle('noscroll')
	})

	menu.addEventListener('click', e => {
		if (e.target.classList.contains('menu__item-link')) {
			menu.classList.remove('menu__list--active')
			menuBtn.classList.remove('burger--active')
			body.classList.remove('noscroll')
		}
	})

	menu.querySelectorAll('.menu__item-link').forEach(link => {
		link.addEventListener('click', (event) => {
			menu.classList.remove('menu__list--active')
			menuBtn.classList.remove('burger--active')
			body.classList.remove('noscroll')
            event._isClicked = true;
            console.log("Клик по ссылке");
		})
	})
}


body.addEventListener('click', (event) => {
    if( 
     event._isClicked === true ||
     event.target.classList.contains('menu__list') == true ||
     event.target.classList.contains('menu__item-link') == true  ||
     event.target.classList.contains('burger') == true ||
     event.target.classList.contains('burger__line') == true
    ) return
    console.log("Клик вне блока")

   menu.classList.remove('menu__list--active');
   menuBtn.classList.remove('burger--active');
})