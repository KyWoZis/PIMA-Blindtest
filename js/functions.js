// Variable de chemin commun
import { videoPath } from './config.js';
// Création d'une liste de vidéos
const videoList = [
    "0.mkv",
    "1.mkv",
];

// Fonction qui lit une vidéo
function playVideo(index) {
    const videoElement = document.getElementById("video-player");
    videoElement.style.display = "block"; // Afficher la vidéo lorsque le bouton "Play" est cliqué
    videoElement.src = videoPath + videoList[index];
    videoElement.play();
}

// Fonction qui passe à la vidéo suivante
function nextVideo() {
    const videoElement = document.getElementById("video-player");
    console.log(videoElement.src);
    const currentVideoIndex = videoList.indexOf(videoElement.src.replace(videoPath, ""));
    console.log(videoList.indexOf(videoElement.src.replace(videoPath, "")));
    console.log(currentVideoIndex);
    const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;
    videoElement.style.display = "none";
    playVideo(nextVideoIndex);
}
