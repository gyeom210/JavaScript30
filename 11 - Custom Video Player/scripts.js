const player = document.querySelector('.player');
const play = player.querySelector('.toggle');
const video = player.querySelector('.viewer');
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');
const ranges = player.querySelectorAll('.player__slider');
const skip = player.querySelectorAll('[data-skip]');

function playEvent(e){
    if(video.paused) {
        video.play();
        play.textContent = '❚❚';
    } else {
        video.pause();
        play.textContent = '►';
    }
}

function progressEvent(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function handleEvent(){
    video[this.name] = this.value;
}

function sliderEvent(e){
    const skipTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = skipTime;
}

function skipEvent(){
    video.currentTime += parseFloat(this.dataset.skip);
}

play.addEventListener('click', playEvent);
video.addEventListener('click', playEvent);
video.addEventListener('timeupdate', progressEvent);

let pbar = false;
progress.addEventListener('click', sliderEvent);
progress.addEventListener('mousemove', (e) => pbar && sliderEvent(e));
progress.addEventListener('mousedown', () => pbar = true);
progress.addEventListener('mouseup', () => pbar = false);

ranges.forEach(item => item.addEventListener('change', handleEvent));
ranges.forEach(item => item.addEventListener('mousemove', handleEvent));

skip.forEach(item => item.addEventListener('click', skipEvent));