import { songs } from "./data.js";

console.log(songs);

const wrapper = document.querySelector(".content__wrapper")
const trackCover = wrapper.querySelector(".cover-img");
const trackName = wrapper.querySelector(".track-info .track-name");
const trackArtist = wrapper.querySelector(".track-info .track-artist");
const trackAudio = wrapper.querySelector(".track-audio");
const backgroundCover = document.querySelector(".container__background");

let trackIndex = 0;

window.addEventListener("load", () => {
    loadMusic(trackIndex);
})

function loadMusic(index) {
    trackName.innerText = songs[index].name;
    trackArtist.innerText = songs[index].artist;
    trackCover.src = songs[index].cover;
    backgroundCover.src = songs[index].cover;
    trackAudio.src = songs[index].path;
}


const playPauseButton = wrapper.querySelector('button[title="Play/Pause"]');
const progressBar = wrapper.querySelector(".progress-bar");
const progress = wrapper.querySelector(".progress");
// const playIcon = document.getElementById("play-plist");
// const pauseIcon = document.getElementById("pause-plist");

const prevButton = wrapper.querySelector(".prev__btn");
const nextButton = wrapper.querySelector(".next__btn");
const loopButton = wrapper.querySelector(".loop__btn i");
const currentVolume = wrapper.querySelector(".volume-slider");
// const shuffleButton = wrapper.querySelector(".shuffle__btn");


//play  music function 
function playMusic() {
    wrapper.classList.add("paused");
    playPauseButton.querySelector("i").innerText = "pause"
    trackAudio.play();
}

//pause  music function 
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseButton.querySelector("i").innerText = "play_arrow"
    trackAudio.pause();
}

function nextTrack() {
    trackIndex++;
    if (trackIndex >= songs.length) {
        trackIndex = 0;
    };
    loadMusic(trackIndex);
    playMusic();
}

function prevTrack() {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = [songs.length - 1];
    };
    loadMusic(trackIndex);
    playMusic();
}

playPauseButton.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
})

nextButton.addEventListener("click", () => {
    nextTrack();
})

prevButton.addEventListener("click", () => {
    prevTrack();
})

trackAudio.addEventListener("timeupdate", (e) => {
 const currentTime = e.target.currentTime;
 const duration = e.target.duration;
 let progressWidth = (currentTime / duration) * 100;
 progressBar.style.width = `${progressWidth}%`;

 let trackCurrentTime = wrapper.querySelector(".progress-current");
 let trackDuration = wrapper.querySelector(".progress-duration");

 trackAudio.addEventListener("loadeddata", () => {

//Обновить общее время трека
    let songDuration = trackAudio.duration;
    let totalMin = Math.floor(songDuration / 60);
    let totalSec = Math.floor(songDuration % 60);
    if (totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    trackDuration.innerText = `${totalMin}:${totalSec}`;
})

    //Обновить текущее время трека
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    trackCurrentTime.innerText = `${currentMin}:${currentSec}`;
 });


 let isDragging = false; // Переменная для отслеживания состояния перетаскивания

 // Событие, которое срабатывает при нажатии на элемент
 progress.addEventListener("mousedown", (e) => {
     isDragging = true; // Устанавливаем флаг, что нажата кнопка мыши
     updateCurrentTime(e); // Обновляем текущее время сразу при нажатии
 
     // Добавляем события mousemove и mouseup на документ
     document.addEventListener("mousemove", onMouseMove);
     document.addEventListener("mouseup", onMouseUp);
 });
 
 // Функция для обработки перемещения мыши
 function onMouseMove(e) {
     if (isDragging) { // Если флаг перетаскивания установлен
         updateCurrentTime(e); // Обновляем текущее время
     }
 }
 
 // Функция для обработки отпускания кнопки мыши
 function onMouseUp() {
     isDragging = false; // Сбрасываем флаг, когда кнопка мыши отпущена
     // Удаляем события mousemove и mouseup из документа
     document.removeEventListener("mousemove", onMouseMove);
     document.removeEventListener("mouseup", onMouseUp);
 }
 
 // Функция для обновления текущего времени трека
 function updateCurrentTime(e) {
     let progressWidth = progress.clientWidth;
     let clickedOffSet = e.clientX - progress.getBoundingClientRect().left; // Учитываем позицию относительно элемента
     let songDuration = trackAudio.duration;
 
     // Убедимся, что clickedOffSet находится в пределах ширины прогресс-бара
     clickedOffSet = Math.max(0, Math.min(clickedOffSet, progressWidth)); 
 
     trackAudio.currentTime = (clickedOffSet / progressWidth) * songDuration;
 }
 

 loopButton.addEventListener("click", () => {
    let getText = loopButton.innerText;
    switch(getText){
      case "repeat":
        loopButton.innerText = "repeat_one";
        loopButton.setAttribute("title", "Song looped")
        break;
      case "repeat_one":
        loopButton.innerText = "shuffle";
        loopButton.setAttribute("title", "Playlist looped")
        break;
      case "shuffle":
        loopButton.innerText = "repeat";
        loopButton.setAttribute("title", "Playlist shuffled")
        break;
    }
 })


 trackAudio.addEventListener("ended", () => {
    let getText = loopButton.innerText;
    switch(getText){
      case "repeat":
        nextTrack();
        break;
      case "repeat_one":
        trackAudio.currentTime = 0;
        loadMusic(trackIndex);
        playMusic();
        break;
      case "shuffle":
        let randomSong;
        do {
            randomSong = Math.floor(Math.random() * songs.length);
        } while (trackIndex === randomSong);
    
        trackIndex = randomSong;
        loadMusic(trackIndex);
        playMusic();
        break;  
    }
 })



 //Change Volume
 function changeVolume() {
    trackAudio.volume = currentVolume.value / 100;
 }

 function sliderDown(e) {
    if (isDragging) {
        changeVolume();
}
}

function sliderUp() {
    isDragging = false;
    document.removeEventListener("mousemove", sliderDown);
    document.removeEventListener("mouseup", sliderUp);
}

 currentVolume.addEventListener("mousedown", (e) => {
    isDragging = true;
    changeVolume(); 
    document.addEventListener("mousemove", sliderDown);
    document.addEventListener("mouseup", sliderUp);
});



