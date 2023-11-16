// Variable de chemin commun
// import { videoPath } from './config.js';
const videoPath = "../videos/";

// Création d'une liste de vidéos
const videoList = [
    "0.mp4",
    "1.mp4",
    "2.mp4",
]; // a changer grace au nouveau systeme

// Création d'une liste de noms associés aux vidéos
const nameList = [
    "Lain",
    "Usseewa",
    "One Piece",
]; // same 

delay = 2000;
index = 0;
score = 0;

videoElement=null;

startSection=null;
playSection=null;
transitionSection=null;
endSection=null;
videoSection=null;

// Fonction qui démarre la première vidéo et cache l'élément vidéo
function beginBT() {
    videoElement = document.getElementById("video-player"); // Récupère l'élément vidéo
    startSection = document.getElementById("start");
    playSection = document.getElementById("play");
    transitionSection = document.getElementById("transition");
    endSection = document.getElementById("end");
    videoSection = document.getElementById("video");


    startSection.style.display = "none"; // Cache la section start
    videoSection.style.display = "block";
    playSection.style.display = "block";
    song()
}

function song(){
    videoElement.src = videoPath + videoList[index]; // Définit la source de la vidéo
    videoElement.play(); // Démarre la vidéo

    // Réinitialiser la zone de texte
    const textInput = document.getElementById("textInput");
    textInput.style.display = "block";
    textInput.value = '';
    setTimeout(() => {
        transition();
      }, delay);
}

function transition(){

    const hideDiv = document.getElementById("hide");
    hideDiv.style.display  = "none";
    playSection.style.display = "none";
    transitionSection.style.display = "block";
    videoElement.src = videoPath + videoList[index]; // Définit la source de la vidéo
    videoElement.play(); // Démarre la vidéo
    
    // good answer 
    const currentAnswer = textInput.value.trim().toLowerCase();
    const associatedName = nameList[index].toLowerCase();
    // update labels
    const answerLabel = document.getElementById("answer"); 
    answerLabel.innerHTML = associatedName;
    const correctionLabel = document.getElementById("correction"); 
    correctionLabel.innerHTML = associatedName==currentAnswer?"Yup !!":"Nope but well tried !";
    
    index = index + 1;
    //next song
    setTimeout(() => {
        if(index >= videoList.length - 1)
            endBT()
        else{
            hideDiv.style.display  = "block";
            playSection.style.display = "block";
            transitionSection.style.display = "none";
            song()
        }
      }, delay);

}

function endBT() {
    videoSection.style.display = "none";
    transitionSection.style.display = "none";
    endSection.style.display = "block";

}

/*
function nextVideo() {

    videoElement.src = videoPath + videoList[index]; // Définit la source de la vidéo
    console.log(videoElement.src) 
    videoElement.play(); // Démarre la vidéo

}

// Fonction pour vérifier la réponse du texte
function checkAnswer() {
    const textInput = document.getElementById("textInput");
    const videoElement = document.getElementById("video-player");
    const currentAnswer = textInput.value.trim().toLowerCase();
    const associatedName = nameList[index].toLowerCase();
    if (currentAnswer === associatedName) {
        alert("Bonne réponse !");
        score++;
    } else {
        alert("Mauvaise réponse !");
    }
}
*/