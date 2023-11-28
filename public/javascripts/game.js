// Variable de chemin commun
// import { videoPath } from './config.js';
const videoPath = "../videos/";

// Création d'une liste de noms associés aux vidéos
const naame = [
    "Souso no Frieren",
    "Usseewa",
    "One Piece",

]; // same 
list = [];
nameList = [];
ArtistList = [];
OriginList = [];
MusicTypeList = [];
function dataToListMusic(musics,infoMusics){
    musics.forEach(music =>
    {
        list.push(music.music_id)
        const name = infoMusics.filter(music1 => music1.music_id === music.music_id);
        nameList.push(name[0].music_name);
        ArtistList.push(name[0].artist_name);
        OriginList.push(name[0].origin);
        MusicTypeList.push(name[0].music_type);
    });// a changer quand je serais plus reveillé : pas besoin des musics si on a infomusics ( a part peut etre pour avoir leur ordre)
}

delay = 20000;
index = 0;
score = 0;
//elements de réponses

Music_name = null;
Artist_name = null;
Origin = null;
Music_type = null;
videoElement=null;
//sections
startSection=null;
playSection=null;
transitionSection=null;
endSection=null;
videoSection=null;

// Fonction qui démarre la première vidéo et cache l'élément vidéo
function beginBT() {
    dataToListMusic(data,infoMusics);
    //recupere les sections
    videoElement = document.getElementById("video-player"); // Récupère l'élément vidéo
    startSection = document.getElementById("start");
    playSection = document.getElementById("play");
    transitionSection = document.getElementById("transition");
    endSection = document.getElementById("end");
    videoSection = document.getElementById("video");
    //recupere les elements de reponses
    Music_name = document.getElementById("textInputMusic_name");
    Artist_name = document.getElementById("textInputArtist");
    Origin = document.getElementById("textInputOrigin");
    Music_type = document.getElementById("textInputMusic_Type");

    startSection.style.display = "none"; // Cache la section start
    videoSection.style.display = "block";
    playSection.style.display = "block";
    song()
}

function song(){
    videoElement.src = videoPath + list[index]+".mp4"; // Définit la source de la vidéo
    videoElement.play(); // Démarre la vidéo

    // Réinitialiser la zone de texte
    // faire ca dans une fonction non :eyes: ?
    if (nameList[index] === null) {
        Music_name.style.display = 'none';
    } else {
        Music_name.value = '';
        Music_name.style.display = 'block';
    }

    if (ArtistList[index] === null) {
        Artist_name.style.display = 'none';
    } else {
        Artist_name.value = '';
        Artist_name.style.display = 'block';
    }

    if (OriginList[index] === null) {
        Origin.style.display = 'none';
    } else {
        Origin.value = '';
        Origin.style.display = 'block';
    }

    if (MusicTypeList[index] === null) {
        Music_type.style.display = 'none';
    } else {
        Music_type.value = '';
        Music_type.style.display = 'block';
    }
    setTimeout(() => {
        transition();
      }, delay);
}

function transition(){

    const hideDiv = document.getElementById("hide");
    hideDiv.style.display  = "none";
    playSection.style.display = "none";
    transitionSection.style.display = "block";
    videoElement.src = videoPath + list[index]+".mp4"; // Définit la source de la vidéo
    videoElement.play(); // Démarre la vidéo


    // Utilisation de la fonction pour chaque ensemble de valeurs
    updateLabels(Music_name, nameList[index], "answerMusicName", "correctionMusicName");
    updateLabels(Artist_name, ArtistList[index], "answerArtistName", "correctionArtistName");
    updateLabels(Origin, OriginList[index], "answerOrigin", "correctionOrigin");
    updateLabels(Music_type, MusicTypeList[index], "answerMusicType", "correctionMusicType");
    index = index + 1;
    //next song
    setTimeout(() => {
        if(index >= list.length )
            endBT()
        else{
            hideDiv.style.display  = "block";
            playSection.style.display = "block";
            transitionSection.style.display = "none";
            song()
        }
      }, delay);

}

function updateLabels(inputElement, associatedValue, answerLabelId, correctionLabelId) {
    const currentAnswer = inputElement.value.trim().toLowerCase();
    const associated = associatedValue.toLowerCase();

    const answerLabel = document.getElementById(answerLabelId);
    const correctionLabel = document.getElementById(correctionLabelId);

    if (associatedValue === "") {
        answerLabel.style.display = 'none';
        correctionLabel.style.display = 'none';
    } else {
        answerLabel.innerHTML = associated;
        correctionLabel.innerHTML = associated === currentAnswer ? "Yup !!" : "Nope but well tried !";
        answerLabel.style.display = 'block';
        correctionLabel.style.display = 'block';
    }
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