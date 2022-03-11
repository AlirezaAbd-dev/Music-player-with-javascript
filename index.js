window.addEventListener("load",e=>{
// music information
let now_playing = document.getElementById("now-playing");
let track_art = document.getElementById("track-art");
let track_name = document.getElementById("track-name");
let track_artist = document.getElementById("track-artist");
// control buttons
let playpause_btn = document.getElementById("playpause-track");
let next_btn = document.getElementById("next-track");
let prev_btn = document.getElementById("prev-track");
// timer and volume slider and current time and total time
let seek_slider = document.getElementById("seek_slider");
let volume_slider = document.getElementById("volume_slider");
let curr_time = document.getElementById("current-time");
let total_duration = document.getElementById("total-duration");
let randomIcon = document.getElementById("fa-random");
let curr_track=document.getElementById("curr-track");
let playpauseCircle=document.getElementById("fa-play-circle");
let repeat_track=document.querySelector(".repeat-track");
let body=document.getElementById("body");
let random_track=document.getElementById("random-track");

let track_index = 2,
    isPlaying = false,
    isRandom = false,
    updateTimer;

    

// musics resources
const music_list = [
    {
        img: "./images/Alan-Walker-alone-400x400.jpg",
        name: "Alone",
        artist: "Alan Walker",
        music: "./musics/Alan Walker - Alone.mp3"
    },
    {
        img: "./images/artworks-000467478369-g90jr4-t500x500.jpg",
        name: "Faded",
        artist: "Alan Walker",
        music: "./musics/Alan-Walker-Faded.mp3"
    },
    {
        img: "./images/artworks-fy8KQvvhyNlki9rx-myOEyw-t500x500.jpg",
        name: "Playground",
        artist: "Bea Miller",
        music: "./musics/Bea Miller, Arcane, League of Legends - Playground from the.mp3"
    },
    {
        img: "./images/alanwalkerdarkside.jpg",
        name: "Darkside",
        artist: "Alan Walker",
        music: "./musics/Darkside_CXU7Xlf8wTI_140.mp3"
    }
];
// calling track index function
loadTrack(track_index);

// defining track index function
function loadTrack(track_index) {
    clearInterval(updateTimer)
    // defining reset function
    reset()

    curr_track.src = music_list[track_index].music
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.floor(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate("#");
    let Color2 = populate("#");

    let gradiant = "background:linear-gradient(45deg,"+ Color1 + " , " + Color2 + ");";
    body.style.cssText = gradiant;
}
function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
random_track.addEventListener("click",randomTrack)
function randomTrack(){
    isRandom ? pauseRandom(): playRandom();
}
function playRandom(){
    isRandom=true;
    randomIcon.classList.add("randomActive")
}
function pauseRandom(){
    isRandom=false;
    randomIcon.classList.remove("randomActive")
}
repeat_track.addEventListener("click",repeatTrack);
function repeatTrack(){
    let current_index=track_index;
    loadTrack(current_index);
    playTrack();
}
playpause_btn.addEventListener("click",playpauseTrack)
function playpauseTrack(){
    if(isPlaying==true) pauseTrack() 
    else playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying=true;
    track_art.classList.add("rotate");
    playpauseCircle.innerHTML="pause_circle";
}
function pauseTrack(){
    curr_track.pause();
    isPlaying=false;
    track_art.classList.remove("rotate");
    playpauseCircle.innerHTML="play_circle";
}
prev_btn.addEventListener("click",prevTrack);
next_btn.addEventListener("click",nextTrack);

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
volume_slider.addEventListener("change",setVolume)
function setVolume() {
    curr_track.volume=volume_slider.value/100;
}

seek_slider.addEventListener("change",seekTo)
function seekTo() {  
   let seekto= curr_track.duration * (seek_slider.value / 100);
   curr_track.currentTime=seekto;
}

function setUpdate() {
    let seekPosition=0;
    if(!isNaN(curr_track.duration)){
        seekPosition=curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value=seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent=currentMinutes+":"+currentSeconds;
        total_duration.textContent=durationMinutes+":"+durationSeconds;
    }
}

// end of load window
})