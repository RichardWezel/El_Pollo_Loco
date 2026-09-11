/**
 * Return the HTML for the start screen buttons.
 *
 * @returns {string} HTML markup for the start buttons.
 */
function StartBtnsHTML() {
    return `
        <div id="btnContainer">
            <button class="btn" onclick="startGame()">Spiel starten</button>
            <button class="btn" onclick="showInstruction()">Anleitung</button>
            <button class="btn" onclick="showImpressum()">Impressum</button>
        </div>
    `
}

/**
 * Return the HTML markup for the game canvas element.
 *
 * @returns {string} HTML markup for the canvas element.
 */
function canvasHTML_Element() {
    return `
        <canvas id="gameCanvas" width='720' height='480'>
        </canvas>
    `
}

/**
 * SVG icons used by the overlay screens (close / previous / next) and the instructions
 * table. Kept in one place so the overlay builders below stay readable.
 */
const OVERLAY_ICONS = {
    close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
    prev: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>',
    next: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>',
    up: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>',
    throwBottle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M600-80q-127-48-203.5-158T320-484q0-91 36-172.5T458-800H320v-80h280v280h-80v-148q-57 51-88.5 119.5T400-484q0 102 54 187.5T600-167v87Z"/></svg>',
    volume: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>',
    pause: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-200v-560h80v560h-80Zm320 0v-560h80v560h-80Z"/></svg>',
    fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>',
    home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>'
};

/**
 * The rows of the instructions table: on-screen symbol, what it does, and the keyboard
 * key(s) shown as key caps. `wide` marks keys with a text label (space bar).
 */
const INSTRUCTION_ROWS = [
    { icon: OVERLAY_ICONS.next, text: 'Pepe läuft nach rechts', keys: ['→'] },
    { icon: OVERLAY_ICONS.prev, text: 'Pepe läuft nach links', keys: ['←'] },
    { icon: OVERLAY_ICONS.up, text: 'Pepe springt', keys: ['Leertaste'], wide: true },
    { icon: OVERLAY_ICONS.throwBottle, iconClass: 'rotation', text: 'Pepe wirft eine Flasche', keys: ['D'] },
    { icon: OVERLAY_ICONS.volume, text: 'Ton an / aus', keys: ['M'] },
    { icon: OVERLAY_ICONS.pause, text: 'Spiel pausieren / fortsetzen', keys: ['P'] },
    { icon: OVERLAY_ICONS.fullscreen, text: 'Vollbild', keys: ['F'] },
    { icon: OVERLAY_ICONS.home, text: 'Home / Startbildschirm', keys: ['H'] }
];

/**
 * Wrap overlay content in the shared "parchment sheet" frame: sky background, a paper
 * sheet with the title on a wooden sign, a round close button and optional previous /
 * next buttons to flip between the two pages of each overlay.
 *
 * @param {Object} options
 * @param {string} options.id - Container id ('InstructionsContainer' or 'ImpressumContainer'),
 * which start.js uses to find and close the overlay.
 * @param {string} options.title - Heading shown on the wooden sign.
 * @param {string} options.content - Inner HTML of the sheet.
 * @param {string} [options.prev] - onclick handler for the "previous page" button.
 * @param {string} [options.next] - onclick handler for the "next page" button.
 * @returns {string} HTML markup.
 */
function overlayHTML({ id, title, content, prev, next }) {
    let prevBtn = prev ? `<button class="overlay-nav overlay-prev" onclick="${prev}" title="Zurück">${OVERLAY_ICONS.prev}</button>` : '';
    let nextBtn = next ? `<button class="overlay-nav overlay-next" onclick="${next}" title="Weiter">${OVERLAY_ICONS.next}</button>` : '';
    return `
        <div id="${id}" class="overlay-screen">
            <button class="overlay-nav overlay-close" onclick="closeOverlay()" title="Schließen">${OVERLAY_ICONS.close}</button>
            ${prevBtn}
            ${nextBtn}
            <div class="sheet">
                <div class="sheet-sign">${title}</div>
                <div class="sheet-content">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

/**
 * Return the HTML for the game story screen (story content).
 *
 * @returns {string} HTML markup for the story screen.
 */
function storyHTML() {
    return overlayHTML({
        id: 'InstructionsContainer',
        title: 'Spielhandlung',
        next: 'renderInstructions()',
        content: `
            <p class="storyText">
                Du spielst einen Mexikaner namens Pepe, welcher sich durch die Steppen Mexikos kämpfen muss. Auf seinem Weg findet er wertvolle Münzen und Tabasco-Flaschen, die er natürlich gerne einsammelt. Manchmal muss Pepe in die Höhe, um die wertvollen Gegenstände zu erreichen. Doch Pepe trifft auch auf Hühner, die ihm nicht wohlgesonnen sind. Er verliert an wichtigen Lebenspunkten, wenn sie ihn berühren. Diese kann Pepe leicht bezwingen, indem er auf sie springt. Am Ende seines Weges trifft er auf die Mutter der kleinen Küken, welche nicht sehr erfreut darüber sein wird, dass du ihre Jungen verletzt hast. Pepe sollte versuchen, die wenigen Flaschen, die er einsammeln konnte, gegen diesen Endgegner zu nutzen. Wird er es schaffen?
            </p>
            <p class="storyHint">Weiter → zur Steuerung</p>
        `
    });
}

/**
 * Build one row of the instructions table.
 *
 * @param {Object} row - Entry of INSTRUCTION_ROWS.
 * @returns {string} HTML markup.
 */
function instructionRowHTML(row) {
    let keys = row.keys.map(key => `<span class="keycap${row.wide ? ' keycap-wide' : ''}">${key}</span>`).join('');
    return `
        <div class="row">
            <div class="controlSymbol ${row.iconClass || ''}">${row.icon}</div>
            <div class="rowText">${row.text}</div>
            <div class="rowKeys">${keys}</div>
        </div>
    `;
}

/**
 * Return the HTML for the game instructions/explanation screen.
 *
 * @returns {string} HTML markup for the instructions.
 */
function explenationHTML() {
    return overlayHTML({
        id: 'InstructionsContainer',
        title: 'Steuerung',
        prev: 'renderStory()',
        content: `
            <div class="InstructionsText">
                <div class="columnHeading">
                    <div class="controlSymbol">Symbol</div>
                    <div class="rowText">Funktion</div>
                    <div class="rowKeys">Tastatur</div>
                </div>
                ${INSTRUCTION_ROWS.map(instructionRowHTML).join('')}
            </div>
        `
    });
}

/**
 * Return the HTML for on-screen control symbols (mobile controls).
 *
 * @returns {string} HTML markup for control buttons.
 */
function ControlSymbolsHTML() {
    return `
        <div id="controlBtnSection">
            <button id="arrowRight" class="control_circle control_element" onmousedown="keydownRight()" onmouseup="keyUpRight()" ontouchstart="keydownRight()" ontouchend="keyUpRight()">
              <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
              </svg>
            </button>
            <button id="arrowLeft" class="control_circle control_element" onmousedown="keydownLeft()" onmouseup="keyUpLeft()" ontouchstart="keydownLeft()" ontouchend="keyUpLeft()">
              <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
              </svg>
            </button>

            <button id="arrowUp" class="control_circle control_element" onmousedown="keydownSpace()" onmouseup="keyUpSpace()" ontouchstart="keydownSpace()" ontouchend="keyUpSpace()">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
              </svg>
            </button>
            <button id="throwBtn" class="control_circle control_element" onmousedown="keydownD()" onmouseup="keyUpD()" ontouchstart="keydownD()" ontouchend="keyUpD()">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M600-80q-127-48-203.5-158T320-484q0-91 36-172.5T458-800H320v-80h280v280h-80v-148q-57 51-88.5 119.5T400-484q0 102 54 187.5T600-167v87Z"/>
              </svg>
            </button>
        </div>
    `;
}

/**
 * Return the HTML for the navigation bar.
 *
 * @returns {string} HTML markup for the navbar.
 */
function navbarHTML() {
    return `
        <nav id="navbar">
            <button id="helpBtn" class="control_element" onclick="showInstruction()">
                <svg xmlns="http://www.w3.org/2000/svg" height="44px" viewBox="0 -960 960 960" width="44px" fill="#000000"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
            </button>
            <button id="infoBtn" class="control_element" onclick="showImpressum()">
                <svg xmlns="http://www.w3.org/2000/svg" height="44px" viewBox="0 -960 960 960" width="44px" fill="#000000"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
            </button>
            <button id="pauseBtn" class="control_circle_small control_element" onclick="clickPauseBtn()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-200h120v-560H320v560Zm200 0h120v-560H520v560Z"/>
                </svg>
            </button>
            <button id="volumeBtn" class="control_circle_small control_element" onmousedown="keydownM()" onmouseup="keyUpM()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
                </svg>
            </button>
            <button id="fullscreen" class="control_circle_small control_element" onclick="fullscreen()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>
                </svg>
            </button>
            <button id="home" class="control_circle_small control_element" onclick="reloadGame()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
            </button>
            <button id="menuBtn" class="control_circle_small control_element" onclick="clickSettings()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
            </button>

            
        </nav>
    `;
}

/**
 * Return the HTML for the game-over outcome screen.
 *
 * @returns {string} HTML markup for the game-over screen.
 */
function gameOverHTML() {
    return `
        <div class="endScreen" id="gameOver">
            <img src="images/intro_outro_screens/game_over/game_over.png" alt="">
            <button class="endScreenBtn btn" onclick="restartGame()">Noch einmal!</button>
        <div>
    `;
}

/**
 * Return the HTML for the win outcome screen.
 *
 * @returns {string} HTML markup for the win screen.
 */
function winHTML() {
     return `
        <div class="endScreen" id="gameWin">
            <img class="gameWinImage" src="images/intro_outro_screens/win/won_2.png" alt="">
            <button class="endScreenBtn btn" onclick="restartGame()">Noch einmal!</button>
        <div>
    `;
}

/**
 * Return the HTML for the impressum (legal notice) screen.
 *
 * @returns {string} HTML markup for the impressum.
 */
function ImpressumHTML() {
    return overlayHTML({
        id: 'ImpressumContainer',
        title: 'Impressum',
        next: 'renderDataSecurity()',
        content: `
            <article>
                <p class="header_info">Angaben gemäß § 5 TMG</p>
                <p class="text_info">
                    Richard Wezel<br>
                    Eschholzstr. 74<br>
                    79115 Freiburg
                </p>
                <p class="header_info">Kontakt</p>
                <p class="text_info">
                    E-Mail: kontakt@richard-wezel.de
                </p>
                <p class="header_info">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</p>
                <p class="text_info">
                    Richard Wezel<br>
                    Eschholzstr. 74<br>
                    79115 Freiburg
                </p>
            </article>
        `
    });
}

/**
 * Return the HTML for the data security / privacy information screen.
 *
 * @returns {string} HTML markup for the privacy information.
 */
function DataSecurityHTML() {
    return overlayHTML({
        id: 'ImpressumContainer',
        title: 'Datenschutz',
        prev: 'renderInformations()',
        content: `
            <article>
                <p class="text_info">
                    Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
                </p>
                <p class="header_info">Keine Datenspeicherung</p>
                <p class="text_info">
                    Wir möchten Sie darüber informieren, dass wir auf unserer Website keine personenbezogenen Daten speichern oder verarbeiten. Dies bedeutet, dass wir keine Daten über Ihr Surfverhalten, Ihre IP-Adresse oder andere persönliche Informationen erfassen.
                </p>
                <p class="header_info">Keine Verwendung von Cookies</p>
                <p class="text_info">
                    Unsere Website verwendet keine Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Da wir keine Cookies verwenden, werden keine Informationen auf Ihrem Endgerät durch Cookies gespeichert oder ausgelesen.
                </p>
                <p class="header_info">Lokaler Zwischenspeicher (Session Storage)</p>
                <p class="text_info">
                    Das Spiel nutzt den sogenannten Session Storage Ihres Browsers, um zu erkennen, dass Sie über den "Noch einmal!"-Button direkt eine neue Runde starten möchten. Dabei werden keine personenbezogenen Daten gespeichert, keine Analyse Ihres Verhaltens durchgeführt und keine Informationen an uns oder Dritte übertragen. Der Eintrag wird automatisch gelöscht, sobald Sie den Browser-Tab schließen.
                </p>
                <p class="header_info">Kontakt</p>
                <p class="text_info">
                    Wenn Sie Fragen zu dieser Datenschutzerklärung haben, können Sie uns unter folgenden Kontaktdaten erreichen:
                </p>
                <p class="text_info">
                    Richard Wezel<br>
                    Eschholzstr. 74<br>
                    79115 Freiburg<br>
                    E-Mail: richard.wezel@posteo.de
                </p>
            </article>
        `
    });
}

/**
 * Return the SVG markup for the closing symbol used in the settings menu.
 *
 * @returns {string} SVG markup.
 */
function svgX() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
    `;
}

/**
 * Return the SVG markup for the menu/open symbol used in the settings menu.
 *
 * @returns {string} SVG markup.
 */
function svgMenu() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
    `;
}

/**
 * Return the SVG markup for the pause symbol, shown on the pause button while the game
 * is running (clicking it pauses).
 *
 * @returns {string} SVG markup.
 */
function svgPause() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-200h120v-560H320v560Zm200 0h120v-560H520v560Z"/>
        </svg>
    `;
}

/**
 * Return the SVG markup for the play symbol, shown on the pause button while the game
 * is paused (clicking it resumes).
 *
 * @returns {string} SVG markup.
 */
function svgPlay() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-200v-560l440 280-440 280Z"/>
        </svg>
    `;
}

/**
 * Return the HTML for the in-game tutorial container. The box itself is filled step by
 * step from tutorial.js (see showTutorialStep()). #tutorialLayer uses the same "game
 * stage" box as the canvas/control buttons on mobile (see style.css), so the box always
 * sits over the visible game area and not in the letterboxed bars.
 *
 * @returns {string} HTML markup for the tutorial layer.
 */
function tutorialHTML() {
    return `
        <div id="tutorialLayer">
            <div id="tutorialBox"></div>
        </div>
    `;
}
