let volumeStatus = true;

function markUsedControlBtn(controllBtnId) {
    let element = document.getElementById(controllBtnId);
    element.style.borderColor = '#FF9601';
    let svgElement = document.querySelector(`#${controllBtnId} svg path`);
    if (svgElement) {
        svgElement.style.fill = '#FF9601';
    }
}

function demarcateUsedControlBtn(controllBtnId) {
    let element = document.getElementById(controllBtnId);
    element.style.borderColor = 'black';
    let svgElement = document.querySelector(`#${controllBtnId} svg path`);
    if (svgElement) {
        svgElement.style.fill = '#000000';
    }
}

function changeVolumeStatus() {
    volumeStatus = !volumeStatus;
    changeImgVolume();
}

function changeImgVolume() {
    if (volumeStatus == true) {
        volumeOn();
    } else {
        volumeOff();
    }
}

function volumeOn() {
    let volumeImg = document.getElementById('volumeBtn');
    volumeImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
        </svg>`;
    world.playBackgroundMusic();
}

function volumeOff() {
    let volumeImg = document.getElementById('volumeBtn');
    volumeImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/>
    </svg>`;
    world.backgroundmusic.pause();
    world.character.snoring_sound.pause();
}

function fullscreen() {
    let gameScreen = document.getElementById('gameScreen');
    if (gameScreen.requestFullscreen) {
        gameScreen.requestFullscreen({ navigationUI: "show" }).catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else if (gameScreen.mozRequestFullScreen) { // Firefox
        gameScreen.mozRequestFullScreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else if (gameScreen.webkitRequestFullscreen) { // Chrome, Safari and Opera
        gameScreen.webkitRequestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else if (gameScreen.msRequestFullscreen) { // IE/Edge
        gameScreen.msRequestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    }
}

function clickSettings() {
    if (menuStatus == false) {
        showSettings();
    } else {
        hideSettings();
    }
}

function showSettings() {
    let menuBtn = document.getElementById('menuBtn');
    let volumeBtn = document.getElementById('volumeBtn');
    let homeBtn = document.getElementById('home');
    menuStatus = true;
    menuBtn.innerHTML = svgX();
    volumeBtn.style.display = 'flex';
    homeBtn.style.display = 'flex';

    if (checkMobileDeviceSize == false) {
        let fullscreenBtn = document.getElementById('fullscreen');
        fullscreenBtn.style.display = 'flex';
    }
}


function hideSettings() {
    let menuBtn = document.getElementById('menuBtn');
    let volumeBtn = document.getElementById('volumeBtn');
    let homeBtn = document.getElementById('home');

    menuStatus = false;
    menuBtn.innerHTML = svgMenu();
    volumeBtn.style.display = 'none';
    
    homeBtn.style.display = 'none';

    if (checkMobileDeviceSize == false) {
        let fullscreenBtn = document.getElementById('fullscreen');
        fullscreenBtn.style.display = 'none';
    }
}

function svgX() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
    `;
}

function svgMenu() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
    `;
}