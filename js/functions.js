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
    const videoElement = document.getElementById("video-player"); // Récupère l'élément vidéo
    videoElement.src = videoPath + videoList[0]; // Définit la source de la vidéo
    videoElement.style.display = "block"; // Affiche l'élément vidéo
    videoElement.play(); // Démarre la vidéo
    console.log(videoElement.src) 
    videoElement.addEventListener('pause', function() {
        videoElement.play(); // Empêche la pause
    });
}


function nextVideo() {
    const videoElement = document.getElementById("video-player"); // Récupère l'élément vidéo
    const currentVideoIndex = videoList.indexOf(videoElement.src.replace(videoPath, "")); // Récupère l'index de la vidéo actuelle
    console.log(currentVideoIndex) 
    const nextVideoIndex = (currentVideoIndex + 1) % videoList.length; // Récupère l'index de la prochaine vidéo
    console.log(nextVideoIndex)
    videoElement.style.display = "block"; // Affiche l'élément vidéo
    videoElement.src = videoPath + videoList[nextVideoIndex]; // Définit la source de la vidéo
    console.log(videoElement.src) 
    videoElement.play(); // Démarre la vidéo
    videoElement.addEventListener('pause', function() {
        videoElement.play(); // Empêche la pause
    });
}