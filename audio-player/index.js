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
const shuffleButton = wrapper.querySelector(".shuffle__btn");


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

