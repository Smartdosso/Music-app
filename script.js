const songs = [
    {
        title: "Sailematu",
        artist: "Nuchie Meek",
        src: "music/Nuchie_Meek_-_Sailematu_(VISUALIZER)(128k).mp3"
    },
    {
        title: "Feel",
        artist: "Davido",
        src: "music/Davido - FEEL (Official Audio)(MP3_320K).mp3"
    },
    {
        title: "Nack",
        artist: "The Therapist",
        src: "music/The_Therapist_-_Nack.mp3"
    },
    {
        title: "Salamatu",
        artist: "Nuchie Meek",
        src: "music/Nuchie-Meek-Salamatu-Originalhitz.com-.mp3"
    },
    {
        title: "Unavailable",
        artist: "Davido",
        src: "music/Davido - UNAVAILABLE (Official Video) ft. Musa Keys(MP3_320K).mp3"
    }
];

let currentSongIndex = 0;
let isRepeating = false;
const audio = new Audio(songs[currentSongIndex].src);
const playButton = document.getElementById("play");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

audio.addEventListener('loadeddata', () => {
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('ended', nextSong);

function formatTime(time)  {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = '❚❚';
    } else {
        audio.pause();
        playButton.textContent = '►';
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

function repeatSong(){
    isRepeating = !isRepeating;
    audio.loop = isRepeating;

    if(isRepeating){
        alert("Repeat is on");
    }else{
        alert('Repeat is off');
    }
}

function loadSong(index) {
    audio.src = songs[index].src;
    document.getElementById("song-title").textContent = songs[index].title;
    document.getElementById("artist").textContent = songs[index].artist;
    playButton.textContent = '❚❚';
    audio.load();
}

function seekTo() {
    audio.currentTime = (progress.value / 100) * audio.duration;
}

function setVolume() {
    audio.volume = volume.value / 100;
}

loadSong(currentSongIndex);
