// Variable de chemin commun
// import { videoPath } from './config.js';
const videoPath = "https://saes-vin.iiens.net/vid/";

// Création d'une liste de vidéos
const videoList = [
    "0.mkv",
    "1.mkv",
];

// Création d'une liste de noms associés aux vidéos
const nameList = [
    "Gyakkou",
    "Usseewa",
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

    const playButton = document.getElementById("playButton");   // Récupère l'élément bouton play
    playButton.style.display = "none"; // Cache le bouton play

      // Afficher la zone de texte
      const textInput = document.getElementById("textInput");
      textInput.style.display = "block";
      textInput.value = ''; // Réinitialiser le texte à chaque fois
    
    // Afficher le bouton de soumission
    const submitButton = document.getElementById("submitButton");
    submitButton.style.display = "block";

    // Afficher le bouton "Next"
    const nextButton = document.getElementById("nextButton");
    nextButton.style.display = "block";

    //à termes il faudra que l'on encapsule nos fonctions pour ne plus avoir à toucher ici
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

     // Réinitialiser la zone de texte
     const textInput = document.getElementById("textInput");
     textInput.style.display = "block";
     textInput.value = '';

     // Afficher le bouton de soumission
    const submitButton = document.getElementById("submitButton");
    submitButton.style.display = "block";
}

// Fonction pour vérifier la réponse du texte
function checkAnswer() {
    const textInput = document.getElementById("textInput");
    const videoElement = document.getElementById("video-player");
    const currentVideoIndex = videoList.indexOf(videoElement.src.replace(videoPath, ""));
    const currentAnswer = textInput.value.trim().toLowerCase();
    const associatedName = nameList[currentVideoIndex].toLowerCase();
    if (currentAnswer === associatedName) {
        alert("Bonne réponse !");
    } else {
        alert("Mauvaise réponse !");
    }
}
