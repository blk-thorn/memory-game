import { songs } from "./data.js";

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
const loopButton = wrapper.querySelector(".loop__btn");
const loopButtonIcon = wrapper.querySelector(".loop__btn i");
const currentVolume = wrapper.querySelector(".volume-slider");
// const shuffleButton = wrapper.querySelector(".shuffle__btn");

 let isRandom = false;
 let isLooped = false;

function playMusic() {
    wrapper.classList.add("paused");
    playPauseButton.querySelector("i").innerText = "pause"
    trackAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseButton.querySelector("i").innerText = "play_arrow"
    trackAudio.pause();
}

function nextTrack() {
    if (isRandom) {
        handleShuffle();
    } else if (isLooped) {
        loopSong();
    }
    else {
        trackIndex++;
        if (trackIndex >= songs.length) {
            trackIndex = 0; 
        }
        loadMusic(trackIndex);
        playMusic();
    }
}

function prevTrack() {
    if (isRandom) {
        handleShuffle();
    } else if (isLooped) {
        loopSong();
    }
    else {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = [songs.length - 1];
    };
    loadMusic(trackIndex);
    playMusic();
}
}



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


 let isDragging = false;

 progress.addEventListener("mousedown", (e) => {
     isDragging = true; // Если нажата кнопка мыши, обновляем текущее время
     updateCurrentTime(e);
 
     // Добавляем события mousemove и mouseup на документ
     document.addEventListener("mousemove", onMouseMove);
     document.addEventListener("mouseup", onMouseUp);
 });
 

 function onMouseMove(e) {
     if (isDragging) { // Если флаг перетаскивания установлен, обновляем текущее время
         updateCurrentTime(e);
     }
 }
 
 // При отпускании кнопки мыши
 function onMouseUp() {
     isDragging = false; // Если кнопка мыши отпущена, удаляем события mousemove и mouseup из документа
     document.removeEventListener("mousemove", onMouseMove);
     document.removeEventListener("mouseup", onMouseUp);
 }
 
 // Обновляем текущее времени трека
 function updateCurrentTime(e) {
     let progressWidth = progress.clientWidth;
     let clickedOffSet = e.clientX - progress.getBoundingClientRect().left; // Учитываем позицию относительно элемента
     let songDuration = trackAudio.duration;
 
     // Убедимся, что clickedOffSet находится в пределах ширины прогресс-бара
     clickedOffSet = Math.max(0, Math.min(clickedOffSet, progressWidth)); 
 
     trackAudio.currentTime = (clickedOffSet / progressWidth) * songDuration;
 }
 

 loopButton.addEventListener("click", () => {
    let getText = loopButtonIcon.innerText;
    switch(getText){
      case "repeat":
        isRandom = false;
        isLooped = true;
        loopButtonIcon.innerText = "repeat_one";
        loopButtonIcon.setAttribute("title", "Song looped")
        break;
      case "repeat_one":
        isRandom = true;
        isLooped = false;
        loopButtonIcon.innerText = "shuffle";
        loopButtonIcon.setAttribute("title", "Playlist shuffled")
        break;
      case "shuffle":
        isRandom = false;
        isLooped = false;
        loopButtonIcon.innerText = "repeat";
        loopButtonIcon.setAttribute("title", "Playlist repeat")
        break;
    }
 })


function handleShuffle() {
    let randomSong;
    do {
        randomSong = Math.floor(Math.random() * songs.length);
    } while (trackIndex === randomSong);

    trackIndex = randomSong;
    loadMusic(trackIndex);
    playMusic();
}

function loopSong() {
    trackAudio.currentTime = 0;
    loadMusic(trackIndex);
    playMusic();
}

 trackAudio.addEventListener("ended", () => {
    let getText = loopButton.innerText;
    switch(getText){
      case "repeat":
        isRandom = false;
        isLooped = false;
        nextTrack();
        break;
      case "repeat_one":
        isRandom = false;
        isLooped = true;
        loopSong();
        break;
      case "shuffle":
        isRandom = true;
        isLooped = false;
        handleShuffle();
        break;  
    }
 })

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



 //Изменение громкости
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



