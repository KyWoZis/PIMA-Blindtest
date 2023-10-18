// Variable de chemin commun
// import { videoPath } from './config.js';
const videoPath = "https://saes-vin.iiens.net/vid/";

// Création d'une liste de vidéos
const videoList = [
    "0.mkv",
    "1.mkv",
];

// Fonction qui démarre la première vidéo et cache l'élément vidéo
function beginBT() {
    const videoElement = document.getElementById("video-player");
    videoElement.src = videoPath + videoList[0];
    videoElement.style.display = "block"; // Affiche l'élément vidéo
    videoElement.play();
    console.log(videoElement.src)
}

// Fonction qui passe à la vidéo suivante
// function nextVideo() {
//     const videoElement = document.getElementById("video-player");
//     console.log(videoElement.src);
//     const currentVideoIndex = videoList.indexOf(videoElement.src.replace(videoPath, ""));
//     console.log(videoList.indexOf(videoElement.src.replace(videoPath, "")));
//     console.log(currentVideoIndex);
//     const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;
//     videoElement.style.display = "none";
//     playVideo(nextVideoIndex);
// }

function nextVideo() {
    const videoElement = document.getElementById("video-player");
    const currentVideoIndex = videoList.indexOf(videoElement.src.replace(videoPath, ""));
    console.log(currentVideoIndex)
    const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;
    console.log(nextVideoIndex)
    videoElement.style.display = "none";
    videoElement.src = videoPath + videoList[nextVideoIndex];
    console.log(videoElement.src)
    videoElement.play();
}