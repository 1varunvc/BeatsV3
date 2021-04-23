const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'willow',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/willow.mp3',
    duration: '3:34',
  },
  {
    title: 'champagne problems',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/champagne problems.mp3',
    duration: '4:04',
  },
  {
    title: 'gold rush',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/gold rush.mp3',
    duration: '3:05',
  },
  {
    title: "'tis the damn season'",
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: "../../songs/taylorSwift-evermore/'tis the damn season.mp3",
    duration: '3:49',
  },
  {
    title: 'tolerate it',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/tolerate it.mp3',
    duration: '4:05',
  },
  {
    title: 'no body, no crime (feat. HAIM)',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/no body, no crime (feat. HAIM).mp3',
    duration: '3:35',
  },
  {
    title: 'happiness',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/happiness.mp3',
    duration: '5:15',
  },
  {
    title: 'dorothea',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/dorothea.mp3',
    duration: '3:45',
  },
  {
    title: 'coney island (feat. The National)',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/coney island (feat. The National).mp3',
    duration: '4:35',
  },
  {
    title: 'ivy',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/ivy.mp3',
    duration: '4:20',
  },
  {
    title: 'cowboy like me',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/cowboy like me.mp3',
    duration: '4:35',
  },
  {
    title: 'long story short',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/long story short.mp3',
    duration: '3:35',
  },
  {
    title: 'majorie',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/majorie.mp3',
    duration: '4:17',
  },
  {
    title: 'closure',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/closure.mp3',
    duration: '3:00',
  },
  {
    title: 'evermore (feat. Bon Iver)',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/evermore (feat. Bon Iver).mp3',
    duration: '5:04',
  },
  {
    title: 'right where you left me (bonus track)',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/taylorSwift-evermore/right where you left me (bonus track).mp3',
    duration: '4:05',
  },
  {
    title: "it's time to go",
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: "../../songs/taylorSwift-evermore/it's time to go.mp3",
    duration: '4:14',
  },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
