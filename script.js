console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0; // Index of the current song
let audioElement = new Audio('songs/1.mp3'); // Audio element to play songs
let masterPlay = document.getElementById('masterPlay'); // Play/pause button
let myProgressBar = document.getElementById('myProgressBar'); // Progress bar element
let gif = document.getElementById('gif'); // GIF element to show when playing
let masterSongName = document.getElementById('masterSongName'); // Element to display current song name
let songItems = Array.from(document.getElementsByClassName('songItem')); // List of song items

// Array of song objects with their details
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

// Update song item elements with song details
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // Set cover image
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // Set song name
})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play(); // Play the audio
        masterPlay.classList.remove('fa-play-circle'); // Change icon to pause
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // Show GIF
    } else {
        audioElement.pause(); // Pause the audio
        masterPlay.classList.remove('fa-pause-circle'); // Change icon to play
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; // Hide GIF
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress; // Set progress bar value
})

// Seekbar change event
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100; // Update current time of the audio
})

// Reset all play buttons to play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// Handle individual song play button click
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id); // Get song index from the clicked element
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`; // Update audio source
        masterSongName.innerText = songs[songIndex].songName; // Update song name display
        audioElement.currentTime = 0; // Reset current time
        audioElement.play(); // Play the audio
        gif.style.opacity = 1; // Show GIF
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0; // Wrap around to the first song
    } else {
        songIndex += 1; // Move to the next song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Update audio source
    masterSongName.innerText = songs[songIndex].songName; // Update song name display
    audioElement.currentTime = 0; // Reset current time
    audioElement.play(); // Play the audio
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0; // Wrap around to the last song
    } else {
        songIndex -= 1; // Move to the previous song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Update audio source
    masterSongName.innerText = songs[songIndex].songName; // Update song name display
    audioElement.currentTime = 0; // Reset current time
    audioElement.play(); // Play the audio
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})