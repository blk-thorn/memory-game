import { songs } from "./data.js";

const wrapper = document.querySelector(".content__wrapper")
const trackCover = wrapper.querySelector(".cover-img");
const trackName = wrapper.querySelector(".track-info .track-name");
const trackArtist = wrapper.querySelector(".track-info .track-artist");
const trackAudio = wrapper.querySelector(".track-audio");
const backgroundCover = document.querySelector(".container__background");

let trackIndex = 0; // Начальное значение для trackIndex
let playedIndexes = []; // Массив, чтобы отслеживать проигранные индексы

window.addEventListener("load", () => {
    loadMusic(trackIndex);
    nowPlaying();
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

const playList = wrapper.querySelector(".playlist");
const showPlaylist = wrapper.querySelector(".queue__btn");
const hidePlaylist = wrapper.querySelector("#close");


showPlaylist.addEventListener("click", () => {
    playList.classList.toggle("show")
})

hidePlaylist.addEventListener ("click", () => {
    showPlaylist.click();
})


function createPlaylist(array) {

    const ulTag = wrapper.querySelector("ul");

    for (let i = 0; i < array.length; i++) {
        const track = document.createElement("li");
        track.setAttribute("li-index", i);
        
        
        const div = document.createElement("div");
        div.classList.add("row");

        const span = document.createElement("span");
        span.textContent = array[i].artist;

        const p = document.createElement("p");
        p.textContent = array[i].name;

        const audioDuration = document.createElement("span");
        audioDuration.classList.add("audio-duration");
        audioDuration.setAttribute('id', array[i].path);

        const audioTrack = document.createElement("audio");
        audioTrack.src = array[i].path;
        audioTrack.setAttribute('class', array[i].path);

        div.appendChild(span);
        div.appendChild(p);

        track.appendChild(div);
        track.appendChild(audioDuration);
        track.appendChild(audioTrack);

        ulTag.appendChild(track);

    
        audioTrack.addEventListener("loadeddata", () => {
                let duration = audioTrack.duration;
                let totalMin = Math.floor(duration / 60);
                let totalSec = Math.floor(duration % 60);
                if (totalSec < 10) {
                    totalSec = `0${totalSec}`;
                }
                audioDuration.innerText = `${totalMin}:${totalSec}`;
                audioDuration.setAttribute("totalduration", `${totalMin}:${totalSec}`);
            });
    }
}

createPlaylist(songs);


const allLiTags = document.querySelectorAll("li");

function nowPlaying() {
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".audio-duration");
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
            let addDuration = audioTag.getAttribute("totalduration");
            audioTag.innerText = addDuration;
        }
        if (allLiTags[j].getAttribute("li-index") == trackIndex) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing"
        }
        allLiTags[j].addEventListener("click", () => clicked(allLiTags[j]));
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    trackIndex = getLiIndex;
    loadMusic(trackIndex);
    playMusic();
    nowPlaying();
}



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
    nowPlaying();
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
    nowPlaying();
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
     isDragging = false; // Если кнопка отпущена, удаляем события mousemove и mouseup 
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

    // Проверяем, если все песни сыграны
    if (playedIndexes.length === songs.length) {
        playedIndexes = []; // Очищаем список сыгранных индексов
    }

    do {
        randomSong = Math.floor(Math.random() * songs.length);
    } while (playedIndexes.includes(randomSong)); // Пока этот индекс уже проигран

    // Добавляем выбранный индекс в массив сыгранных
    playedIndexes.push(randomSong);

    // Обновляем trackIndex выбранной случайной песни
    trackIndex = randomSong;

    // Загружаем и воспроизводим выбранную песню
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



