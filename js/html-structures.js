/**
 * Returns the html elements of start buttons.
 * 
 * @returns {HTMLElement}
 */
function StartBtnsHTML() {
    return `
        <div id="btnContainer">
            <button class="btn" onclick="startGame()">Spiel start</button>
            <button class="btn" onclick="showInstruction()">Anleitung</button>
            <button class="btn" onclick="showImpressum()">Impressum</button>
        </div>
    `
}

/**
 * Returns the html element of canvas.
 * 
 * @returns {HTMLElement}
 */
function canvasHTML_Element() {
    return `
        <canvas id="gameCanvas" width='720' height='480'>
        </canvas>
    `
}

/**
 * Returns the html elements of the game story.
 * 
 * @returns {HTMLElement}
 */
function storyHTML() {
    return `
        <div id="InstructionsContainer">
            <button class="nextBtn_right" onclick="renderInstructions()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                </svg>
            </button>

            <h1 class="headerInstructions">Spielhandlung</h1>

            <div class="storyText">
                Du spielst einen Mexikaner namens Pepe, welcher sich durch die Steppen Mexikos kämpfen muss. Auf seinem Weg findet er wertvolle Münzen und Tabasco-Flaschen, die er natürlich gerne einsammelt. Manchmal muss Pepe in die Höhe, um die Wertvollen Gegenstände zu erreichen. Doch Pepe trifft auch auf Hühner, die ihm nicht wohl gesonnen sind. Er verliert an wichtigen Lebenspunkten, wenn sie ihn berühren. Diese kann Pepe leicht bezwingen, indem er auf sie springt. Am Ende seines Weges trifft er auf die Mutter der kleineren Hühner Kücken, welche nicht sehr erfreut darüber sein wird, dass du ihre Jungen verletzt hast. Pepe sollte versuchen die wenigen Flaschen, die er einsammeln konnte gegen diesen Endgegner zu nutzen. Wird er es schaffen?
            </div>
        </div>
    `;
}

/**
 * Returns the html elements of game explenation.
 * 
 * @returns {HTMLElement}
 */
function explenationHTML() {
    return `
        <div id="InstructionsContainer">
        <a class="close" onclick="reloadGame()">
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </svg>
        </a>

            <a class="nextBtn_left" onclick="renderStory()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
            </a>

            <h1 class="headerInstructions">Anleitung</h1>

            <div class="InstructionsText">
                <div class="columnHeading">
                    <div class="column_1">
                        <div class="symbol">
                            Symbol
                        </div>
                    </div>
                    <div class="column_2">
                        Funktion
                    </div>
                    <div class="column_3">
                        Tastatur
                    </div>
                </div>

                <div class="row">
                    <div class="controlSymbol column_1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                        </svg>
                    </div>
                    <div class="column_2">
                        Pepe läuft nach rechts
                    </div>
                    <div class="column_3">
                        Pfeiltaste rechts
                    </div>
                </div>

                <div class="row">
                    <div class="controlSymbol column_1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                    </div>
                    <div class="column_2">
                        Pepe läuft nach links
                    </div>
                    <div class="column_3">
                        Pfeiltaste links
                    </div>
                </div>

                <div class="row">
                    <div class="controlSymbol column_1 rotation">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M600-80q-127-48-203.5-158T320-484q0-91 36-172.5T458-800H320v-80h280v280h-80v-148q-57 51-88.5 119.5T400-484q0 102 54 187.5T600-167v87Z"/></svg>
                    </div>
                    <div class="column_2">
                        Pepe wirft eine Flasche
                    </div>
                    <div class="column_3">
                        Taste D
                    </div>
                </div>

                <div class="row">
                    <div class="controlSymbol column_1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
                    </div>
                    <div class="column_2">
                        Pepe springt
                    </div>
                    <div class="column_3">
                        Leettaste
                    </div>
                </div>

                <div class="row">
                    <div class="controlSymbol column_1">
                        <svg id="musicBox" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>
                    </div>
                    <div class="column_2">
                        Ton an / aus
                    </div>
                    <div class="column_3">
                        Taste M
                    </div>
                </div>

                <div class="row">
                    <div class="controlSymbol column_1">
                        <svg id="fullscreen_symbol" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>
                    </div>
                    <div class="column_2">
                        Vollbild
                    </div>
                    <div class="column_3">
                        Taste F
                    </div>
                </div>

                <div class="row">
                <div class="controlSymbol column_1">
                <svg id="home_symbol" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                </div>
                <div class="column_2">
                    Home / Startbildschirm
                </div>
                <div class="column_3">
                    Taste H
                </div>
            </div>
            </div>
        </div>
    `;
}

/**
 * Returns the html elements of controll elements.
 * 
 * @returns {HTMLElement}
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
 * Returns the html elements of navigation bar.
 * 
 * @returns {HTMLElement}
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
 * Returns the html elements of the outcome screen game over.
 * 
 * @returns {HTMLElement}
 */
function gameOverHTML() {
    return `
        <div class="endScreen" id="gameOver">
            <img src="images/intro_outro_screens/game_over/game over.png" alt="">
            <button class="endScreenBtn btn" onclick="reloadGame()">Noch einmal!</button>
        <div>
    `;
}

/**
 * Returns the html elements of the outcome screen game win.
 * 
 * @returns {HTMLElement}
 */
function winHTML() {
     return `
        <div class="endScreen" id="gameWin">
            <img class="gameWinImage" src="images/intro_outro_screens/win/won_2.png" alt="">
            <button class="endScreenBtn btn" onclick="reloadGame()">Noch einmal!</button>
        <div>
    `;
}

/**
 * Returns the html elements of game impressum.
 * 
 * @returns {HTMLElement}
 */
function ImpressumHTML() {
    return `
    <div id="ImpressumContainer">
        <button class="nextBtn_right" onclick="renderDataSecurity()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
            </svg>
        </button>

        <h1 class="headerInstructions">Impressum</h1>
        
        <article>
            <p class="header_info"><strong>Angaben gemäß § 5 TMG:</strong></p>
            <p class="text_info">
                Richard Wezel<br>
                Eschholzstr. 74<br>
                79115 Freiburg
            </p>
            <p class="header_info"><strong>Kontakt:</strong></p>
            <p class="text_info">
                Telefon: +49 (0) 176 831 405 47<br>
                E-Mail: richard.wezel@posteo.de
            </p>
            <p class="header_info"><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong></p>
            <p class="text_info">
                Richard Wezel<br>
                Eschholzstr. 74<br>
                79115 Freiburg
            </p>
        </article>
    </div>
`;
}

/**
 * Returns the html elements of game data security instructions.
 * 
 * @returns {HTMLElement}
 */
function DataSecurityHTML() {
    return `
    <div id="ImpressumContainer">
        <button class="close" onclick="reloadGame()">
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </svg>
        </button>

        <button class="nextBtn_left" onclick="showImpressum()">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
        </button>
       
        <h1 class="headerInstructions">Datenschutz</h1>

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
                Unsere Website verwendet keine Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Da wir keine Cookies verwenden, werden keine Informationen auf Ihrem Endgerät gespeichert oder ausgelesen.
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
        
    </div>
`;
}

/**
 * Returns the html elements of closing svg symbol of setting menu.
 * 
 * @returns {HTMLElement}
 */
function svgX() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
    `;
}

/**
 * Returns the html elements of opening svg symbol of setting menu.
 * 
 * @returns {HTMLElement}
 */
function svgMenu() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
    `;
}