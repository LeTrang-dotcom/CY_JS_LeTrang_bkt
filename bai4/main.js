const videoName = document.getElementById("videoName");
const videoControl = document.getElementById("videoControl");
let isPlaying = false;
let isOnSpeaker = false;
let isFullScreen = false;
let isDragging = false;
const video = document.getElementById("myVideo");

function displayControl(){
    videoControl.innerHTML = `
        <div id="videoName">Chờ em đến muôn đời</div>
            <div id="time">
                <span id="current-time">0:00</span> / <span id="duration">0:00</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar" id="progress-bar"></div>
                <div class="progress-status" id="progress-status">
                    <div id="progress-circle"></div>
                </div>
            </div>
            <div class="control">
                <div>
                    <button type="button">
                        <img src="./image/pause-icon.svg" alt="Pause Video"  onclick="playOrPauseVideo()" id="play">
                    </button>
                    <button type="button">
                        <img src="./image/pre-15s.svg" alt="Pre 15s" onclick="preVideo()">
                    </button>
                    <button type="button">
                        <img src="./image/next-15s.svg" alt="Next 15s" onclick="nextVideo()">
                    </button>
                </div>
                <div>
                    <button type="button">
                        <img src="./image/off-volume.svg" alt="Off Volume" onclick="onOrOffSpeaker()" id="control-speaker">
                    </button>
                    <button type="button">
                        <img src="./image/all-screen.svg" alt="Full Screen" onclick="fullScreen()" id="size-screen">
                    </button>
                </div>
        </div>
    `;
}

displayControl();

const centerPlay = document.getElementById("play-button");
function playOrPauseVideo(){
    const play = document.getElementById("play");
   
    if(!isPlaying){
        video.play();
        play.src = "./image/play-icon.svg";
        play.alt = "Play Video";
        isPlaying = true;
        centerPlay.classList.add("hidden");
    } else{
        video.pause();
        play.src = "./image/pause-icon.svg";
        play.alt = "Pause Video";
        isPlaying = false;
        centerPlay.classList.remove("hidden");
    }
}

video.addEventListener("click", () => {
    if(isPlaying){
        video.pause();
        play.src = "./image/pause-icon.svg";
        play.alt = "Pause Video";
        isPlaying = false;
        centerPlay.classList.remove("hidden");
    }else{
        video.play();
        play.src = "./image/play-icon.svg";
        play.alt = "Play Video";
        isPlaying = true;
        centerPlay.classList.add("hidden");
    }
})

let startTime = null;

const progressBarStatus = document.getElementById("progress-status");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.querySelector(".progress-container");

function updateProgressBar() {
    if (!startTime) {
        startTime = video.currentTime;
    }   
    let elapsedTime = video.currentTime - startTime;
    
    let progressPercent = (elapsedTime / video.duration) * 98;
    
    progressBarStatus.style.width = progressPercent + "%";

    if (progressPercent < 98) {
        requestAnimationFrame(updateProgressBar);
    }
}

// function updateProgressBarOnClick(event) {
//     let progressBarWidth = progressContainer.offsetWidth;
//     let offsetX = event.offsetX;

//     let progressPercent = (offsetX / progressBarWidth) * 100;
//     progressBarStatus.style.width = progressPercent + "%";

//     let newTime = (progressPercent / 100) * video.duration;
//     video.currentTime = newTime;
// }

progressBar.addEventListener("mousedown", (event) => {
    isDragging = true;
    updateProgressBar(event);
});

window.addEventListener("mousemove", (event) => {
    if (isDragging) {
        let containerRec = progressContainer.getBoundingClientRect();
        if (event.clientX >= containerRec.left && event.clientX <= containerRec.right) {
            let offsetX = event.clientX - containerRec.left;
            let progressBarWidth = containerRec.width;
            let progressPercent = (offsetX / progressBarWidth) * 100;
            progressBarStatus.style.width = progressPercent + "%";
            let newTime = (progressPercent / 100) * video.duration;
            video.currentTime = newTime;
        }
    }
})

window.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        video.play();
    }
});

video.addEventListener("loadedmetadata", () => {
    const durationDisplay = document.getElementById("duration");
    durationDisplay.textContent = formatTime(video.duration);

    video.addEventListener("play", () => {
        startTime = null;
        requestAnimationFrame(updateProgressBar);
        console.log(requestAnimationFrame(updateProgressBar));
    });
})

video.addEventListener("timeupdate", () => {
    const currentTimeDisplay = document.getElementById("current-time");
    currentTimeDisplay.textContent = formatTime(video.currentTime);
})

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return minutes + ":" + ((secs < 10) ? "0" + secs : secs);
}

function preVideo(){
    return (video.currentTime - 15) > 0 ? video.currentTime = video.currentTime - 15 : video.currentTime = 0;
}

function nextVideo(){
    return (video.currentTime + 15) > video.duration ? video.currentTime = video.duration : video.currentTime = video.currentTime + 15;
}

function onOrOffSpeaker(){
    const controlSpeaker = document.getElementById("control-speaker");
    if(isOnSpeaker){
        video.muted = true;
        controlSpeaker.src = "./image/off-volume.svg";
        controlSpeaker.alt = "Off Speaker";
        isOnSpeaker = false;
    }else{
        video.muted = false;
        controlSpeaker.src = "./image/on-volume.svg";
        controlSpeaker.alt = "On Speaker";
        isOnSpeaker = true;
    }
}

function fullScreen(){
    const videoMedia = document.querySelector(".video-media");
    const sizeScreen = document.getElementById("size-screen");
    if(!isFullScreen){
        sizeScreen.src = "./image/compress.svg";
        sizeScreen.alt = "Small Screen";
        videoMedia.classList.add("full-screen");
        isFullScreen = true;
    }else{
        sizeScreen.src = "./image/all-screen.svg";
        sizeScreen.alt = "Full Screen";
        videoMedia.classList.remove("full-screen");
        isFullScreen = false;
    }
    
}