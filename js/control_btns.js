/**
 * Boolean flag for sound playback status.
 * true: sound enabled
 * false: sound muted
 */
let volumeStatus = true;

/**
 * Highlight the control button element with the given id to show it is active.
 *
 * @param {string} controllBtnId - id of the HTML element to mark as active.
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
 * Remove the active highlight from the control button with the given id.
 *
 * @param {string} controllBtnId - id of the HTML element to unmark.
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
 * Toggle the global volume state and update the speaker icon.
 */
function changeVolumeStatus() {
    volumeStatus = !volumeStatus;
    changeImgVolume();
}

/**
 * Update the speaker icon according to the current `volumeStatus`.
 */
function changeImgVolume() {
    if (volumeStatus == true) {
        volumeOn();
    } else {
        volumeOff();
    }
}

/**
 * Show the speaker as unmuted and resume background sounds.
 */
function volumeOn() {
    let volumeImg = document.getElementById('volumeBtn');
    volumeImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
        </svg>`;
    world.playBackgroundMusic();
}

/**
 * Show the speaker as muted and pause background sounds.
 */
function volumeOff() {
    let volumeImg = document.getElementById('volumeBtn');
    volumeImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/>
    </svg>`;
    world.backgroundmusic.pause();
    world.character.snoring_sound.pause();
}

/**
 * Request fullscreen for the game screen element, with fallbacks for older browsers.
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
 * Toggle the settings menu visibility based on the `menuStatus` flag.
 * true: menu is open
 * false: menu is closed
 */
function clickSettings() {
    if (menuStatus == false) {
        showSettings();
    } else {
        hideSettings();
    }
}

/**
 * Display the settings buttons and update the menu icon.
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
 * Hide the settings buttons and restore the menu icon.
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