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
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/01.%20the%201.mp3',
    duration: '3:30',
  },
  {
    title: 'cardigan',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/02.%20cardigan.mp3',
    duration: '3:59',
  },
  {
    title: 'the last great american dynasty',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/03.%20the%20last%20great%20american%20dynasty.mp3',
    duration: '3:51',
  },
  {
    title: 'exile (feat. Bon Iver)',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/04.%20exile%20%28feat.%20Bon%20Iver%29.mp3',
    duration: '4:45',
  },
  {
    title: 'my tears ricochet',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/05.%20my%20tears%20ricochet.mp3',
    duration: '4:15',
  },
  {
    title: 'mirrorball',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/06.%20mirrorball.mp3',
    duration: '3:29',
  },
  {
    title: 'seven',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/07.%20seven.mp3',
    duration: '3:28',
  },
  {
    title: 'august',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/08.%20august.mp3',
    duration: '4:21',
  },
  {
    title: 'this is me trying',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/09.%20this%20is%20me%20trying.mp3',
    duration: '3:15',
  },
  {
    title: 'illicit affairs',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/10.%20illicit%20affairs.mp3',
    duration: '3:10',
  },
  {
    title: 'invisible string',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/11.%20invisible%20string.mp3',
    duration: '4:12',
  },
  {
    title: 'mad woman',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/12.%20mad%20woman.mp3',
    duration: '3:57',
  },
  {
    title: 'epiphany',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/13.%20epiphany.mp3',
    duration: '4:49',
  },
  {
    title: 'betty',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/14.%20betty.mp3',
    duration: '4:54',
  },
  {
    title: 'peace',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/15.%20peace.mp3',
    duration: '3:57',
  },
  {
    title: 'hoax',
    artist: 'Taylor Swift',
    coverPath: '../../album-art/taylor-swift/folklore.png',
    discPath: 'https://archive.org/download/taylor-swift-folklore-2020/16.%20hoax.mp3',
    duration: '3:40',
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
