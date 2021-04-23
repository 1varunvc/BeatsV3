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
    title: 'the 1',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/the 1.mp3',
    duration: '03:30',
  },
  {
    title: 'cardigan',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/cardigan.mp3',
    duration: '03:59',
  },
  {
    title: 'the last great american dynasty',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/the last great american dynasty.mp3',
    duration: '03:51',
  },
  {
    title: 'exile (feat. Bon Iver)',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/exile (feat. Bone Iver).mp3',
    duration: '04:45',
  },
  {
    title: 'my tears ricochet',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/my tears ricochet.mp3',
    duration: '04:15',
  },
  {
    title: 'mirrorball',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/mirrorball.mp3',
    duration: '03:29',
  },
  {
    title: 'seven',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/seven.mp3',
    duration: '03:28',
  },
  {
    title: 'august',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/august.mp3',
    duration: '04:21',
  },
  {
    title: 'this is me trying',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/this is me trying.mp3',
    duration: '03:15',
  },
  {
    title: 'illicit affairs',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/illicit affairs.mp3',
    duration: '03:10',
  },
  {
    title: 'invisible string',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/invisible string.mp3',
    duration: '04:12',
  },
  {
    title: 'mad woman',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/mad woman.mp3',
    duration: '03:57',
  },
  {
    title: 'epiphany',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/epiphany.mp3',
    duration: '04:49',
  },
  {
    title: 'betty',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/betty.mp3',
    duration: '04:54',
  },
  {
    title: 'peace',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/peace.mp3',
    duration: '03:57',
  },
  {
    title: 'hoax',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/evermore.png',
    discPath: '../../songs/Taylor Swift – Folklore/01 hoax.mp3',
    duration: '03:40',
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
