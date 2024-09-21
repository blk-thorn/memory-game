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