const Playlist = [
    {
      title: "Road Trip",
      artist: "Unknown",
      album: "Road Trippin",
      genre: "Indie Pop",
      audioSrc: "/assets/songs/roadtrip.mp3",
      backgroundImage: "/assets/images/scenicdrive.png"
    },
    {title: "Coffe Shop Playlist",
     artist: "Unknown",
     album: "Coffee Shop",
     genre: "Acoustic",
     audioSrc: "/assets/songs/coffeeshop.mp3",
     backgroundImage: "/assets/images/coffeescene.png"
    },
    {
      title: "Sad Songs Playist",
      artist: "Unknown",
      album: "Sad Songs",
      genre: "feels",
      audioSrc: "/assets/songs/sad.mp3",
      backgroundImage: "/assets/images/sadsongs.png"
    }
  
  ];
  
  const audioPlayer = document.getElementById("audio-player");
  const playBtn = document.querySelector(".play-btn");
  const pauseBtn = document.querySelector(".pause-btn");
  const titleCard = document.getElementById("title-card");
  const artistInfo = document.getElementById("artist");
  const genreInfo = document.getElementById("genre");
  const albumInfo = document.getElementById("album")
  const forwardBtn = document.querySelector(".skip-btn");
  const backwardBtn = document.querySelector(".go-back-btn");
  const shuffleBtn = document.querySelector(".shuffle-btn"); // Shuffle button
  const volumeControl = document.querySelector(".volume-control");
const songProgress = document.querySelector(".song-progress");
const currentTimeSpan = document.querySelector(".current-time");
const totalTimeSpan = document.querySelector(".total-time");
  
  let currentSongIndex = 0;
  let shuffledSongIndexes = shuffleArray([...Array(Playlist.length).keys()]);
  
  function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function updateSongInfo() {
    titleCard.querySelector("h2").textContent = Playlist[currentSongIndex].title;
    artistInfo.textContent = "Artist: " + Playlist[currentSongIndex].artist;
    genreInfo.textContent = "Genre: " + Playlist[currentSongIndex].genre;
    albumInfo.textContent = "Album: " + Playlist[currentSongIndex].album;
  }
  
  function playSong() {
    audioPlayer.src = Playlist[currentSongIndex].audioSrc;
    audioPlayer.play();
    updateSongInfo();
    updateCardBackground();
  }
  
  function pauseSong() {
    audioPlayer.pause();
  }
  
  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % Playlist.length;
    playSong();
  }
  
  function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + Playlist.length) % Playlist.length;
    playSong();
  }
  
  function playShuffledSong() {
    if (shuffledSongIndexes.length === 0) {
      shuffledSongIndexes = shuffleArray([...Array(Playlist.length).keys()]);
    }
    currentSongIndex = shuffledSongIndexes.pop();
    playSong();
  }
  
  playBtn.addEventListener("click", playSong);
  pauseBtn.addEventListener("click", pauseSong);
  forwardBtn.addEventListener("click", playNextSong);
  backwardBtn.addEventListener("click", playPreviousSong);
  shuffleBtn.addEventListener("click", playShuffledSong);
  audioPlayer.addEventListener("ended", playNextSong);

// Update volume
volumeControl.addEventListener("input", function () {
  audioPlayer.volume = volumeControl.value;
});

function updateProgress() {
  const currentTime = audioPlayer.currentTime;
  const totalTime = audioPlayer.duration;

  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const totalMinutes = Math.floor(totalTime / 60);
  const totalSeconds = Math.floor(totalTime % 60);

  currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
  totalTimeSpan.textContent = `${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;

  songProgress.value = (currentTime / totalTime) * 100;
}

audioPlayer.addEventListener("timeupdate", updateProgress);

function updateCardBackground() {
  const card = document.querySelector(".card");
  const currentBackgroundImage = Playlist[currentSongIndex].backgroundImage;
  card.style.backgroundImage = `url('${currentBackgroundImage}')`;
}


