// Création d'une liste de vidéos
const videoList = [
    "0.mkv",
    "1.mkv",
];

// Variable de chemin commun
const videoPath = "vid/";

// Fonction qui lit une vidéo
function playVideo() {
    const videoElement = document.getElementById("video-player");
    videoElement.style.display = "block"; // Afficher la vidéo lorsque le bouton "Play" est cliqué
    videoElement.src = videoPath + videoList[0];
    videoElement.play();
}

// Fonction qui passe à la vidéo suivante
function nextVideo() {
    const videoElement = document.getElementById("video-player");
    const currentVideoIndex = videoList.indexOf(videoElement.src.replace(videoPath, ""));
    console.log((currentVideoIndex+1)% videoList.length);
    const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;
    videoElement.style.display = "none";
    playVideo(nextVideoIndex);
    videoElement.style.display = "block";
}
