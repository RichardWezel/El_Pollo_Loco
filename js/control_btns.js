/**
 * Variable containing boolean values for sound playing status.
 ** true: sound play
 ** false: sound muted
 */
let volumeStatus = true;

/**
 * Marks the html element with the given id as used.
 * 
 * @param {string} controllBtnId - id of html element witch have to mark as used.
 */
function markUsedControlBtn(controllBtnId) {
    let element = document.getElementById(controllBtnId);
    if(element) {
        element.style.borderColor = '#FF9601';
        let svgElement = document.querySelector(`#${controllBtnId} svg path`);
        if (svgElement) {
            svgElement.style.fill = '#FF9601';
        }
    }
}

/**
 *Demarcate the html element with the given id.
 * 
 * @param {string} controllBtnId - id of html element witch have to demarcate.
 */
function demarcateUsedControlBtn(controllBtnId) {
    let element = document.getElementById(controllBtnId);
    if(element) {
        element.style.borderColor = 'black';
        let svgElement = document.querySelector(`#${controllBtnId} svg path`);
        if (svgElement) {
            svgElement.style.fill = '#000000';
        }
    } 
}

/**
 * Changes the volume status in the opposite state.
 * Changes the state of variable volumeStatus and the image of speaker symbol.
 */
function changeVolumeStatus() {
    volumeStatus = !volumeStatus;
    changeImgVolume();
}

/**
 * Changes the image of speaker symbol.
 */
function changeImgVolume() {
    if (volumeStatus == true) {
        volumeOn();
    } else {
        volumeOff();
    }
}

/**
 * Sets the speaker symbol to play.
 */
function volumeOn() {
    let volumeImg = document.getElementById('volumeBtn');
    volumeImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
        </svg>`;
    world.playBackgroundMusic();
}

/**
 * Sets the speaker symbol to mute.
 */
function volumeOff() {
    let volumeImg = document.getElementById('volumeBtn');
    volumeImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/>
    </svg>`;
    world.backgroundmusic.pause();
    world.character.snoring_sound.pause();
}

/**
 * Requests fullscreen mode for the game screen element.
 * The function checks for browser compatibility and invokes the appropriate fullscreen request method.
 * It supports modern browsers as well as older versions of Firefox, Chrome, Safari, Opera, and Internet Explorer/Edge.
 */
function fullscreen() {
    let gameScreen = document.getElementById('gameScreen');
    if (gameScreen.requestFullscreen) {
        gameScreen.requestFullscreen({ navigationUI: "show" }).catch((err) => {
        });
    } else if (gameScreen.mozRequestFullScreen) { // Firefox
        gameScreen.mozRequestFullScreen().catch((err) => {
        });
    } else if (gameScreen.webkitRequestFullscreen) { // Chrome, Safari and Opera
        gameScreen.webkitRequestFullscreen().catch((err) => {
        });
    } else if (gameScreen.msRequestFullscreen) { // IE/Edge
        gameScreen.msRequestFullscreen().catch((err) => {
        });
    }
}

/**
 * Shows or hides the buttons of settings depending on the variable menuStatus.
 ** true: hide settings
 ** false: show settings
 */
function clickSettings() {
    if (menuStatus == false) {
        showSettings();
    } else {
        hideSettings();
    }
}

/**
 * Shows the setting buttons
 */
function showSettings() {
    let menuBtn = document.getElementById('menuBtn');
    let volumeBtn = document.getElementById('volumeBtn');
    let homeBtn = document.getElementById('home');
    let helpBtn = document.getElementById('helpBtn');
    let infoBtn = document.getElementById('infoBtn');
    let fullscreenBtn = document.getElementById('fullscreen');
    menuStatus = true;
    menuBtn.innerHTML = svgX();
    volumeBtn.style.display = 'flex';
    homeBtn.style.display = 'flex';
    helpBtn.style.display = 'flex';
    infoBtn.style.display = 'flex';
    if (checkMobileDeviceSize() == false && fullscreenBtn) {
        fullscreenBtn.style.display = 'flex';
    }
}

/**
 * Hides the setting buttons.
 */
function hideSettings() {
    let menuBtn = document.getElementById('menuBtn');
    let volumeBtn = document.getElementById('volumeBtn');
    let homeBtn = document.getElementById('home');
    let helpBtn = document.getElementById('helpBtn');
    let infoBtn = document.getElementById('infoBtn');
    menuStatus = false;
    menuBtn.innerHTML = svgMenu();
    volumeBtn.style.display = 'none';
    homeBtn.style.display = 'none';
    helpBtn.style.display = 'none';
    infoBtn.style.display = 'none';
    if (checkMobileDeviceSize == false) {
        let fullscreenBtn = document.getElementById('fullscreen');
        fullscreenBtn.style.display = 'none';
    }
}