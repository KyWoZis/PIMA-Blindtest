// Création d'une liste de vidéos
const videoList = [
    "1.mkv",
    "2.mkv",
];

// Variable de chemin commun
const videoPath = "./vid/";

// Fonction qui lit une vidéo
function playVideo() {
    const videoElement = document.getElementById("video-player");
    videoElement.src = videoPath + videoList[1];
    videoElement.play();
}

// Fonction qui passe à la vidéo suivante
function nextVideo() {
    const videoElement = document.getElementById("video-player");
    const currentVideoIndex = videoList.indexOf(videoElement.src.replace(videoPath, ""));
    const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;
    videoElement.style.display = "none";
    playVideo(nextVideoIndex);
    videoElement.style.display = "block";
}
