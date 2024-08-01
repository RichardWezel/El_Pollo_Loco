function renderBtns() {
    return `
        <div id="btnContainer">
            <a class="btn" onclick="startGame()">Spiel start</a>
            <a class="btn" onclick="showInstruction()">Anleitung</a>
            <a class="btn" onclick="showSettings()">Einstellungen</a>
        </div>
    `
}

function canvasHTML_Element() {
    return `
        <canvas id="canvas" width="720" height="480">
        </canvas>
    `
}

function explenationHTML() {
    return `
        <div id="InstructionsContainer">
            <a class="nextBtn_right" onclick="startGame()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
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

function storyHTML() {
    return `
        <div id="InstructionsContainer">
            <a class="nextBtn_right" onclick="renderInstructions()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                </svg>
            </a>

            <h1 class="headerInstructions">Spielhandlung</h1>

            <div class="storyText">
                Du spielst einen Mexikaner namens Pepe, welcher sich durch die Steppen Mexikos kämpfen muss. Auf seinem Weg findet er wertvolle Münzen und Tabasco-Flaschen, die er natürlich gerne einsammelt. Manchmal muss Pepe in die Höhe, um die Wertvollen Gegenstände zu erreichen. Doch Pepe trifft auch auf Hühner, die ihm nicht wohl gesonnen sind. Er verliert an wichtigen Lebenspunkten, wenn sie ihn berühren. Diese kann Pepe leicht bezwingen, indem er auf sie springt. Am Ende seines Weges trifft er auf die Mutter der kleineren Hühner Kücken, welche nicht sehr erfreut darüber sein wird, dass du ihre Jungen verletzt hast. Pepe sollte versuchen die wenigen Flaschen, die er einsammeln konnte gegen diesen Endgegner zu nutzen. Wird er es schaffen?
            </div>
        </div>
    `;
}

function ControlSymbolsHTML() {
    return `
        <!-- control btns -->
        <a id="arrowRight" class="control_circle control_element" onmousedown="keydownRight()" onmouseup="keyUpRight()">
          <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
          </svg>
        </a>
        <a id="arrowLeft" class="control_circle control_element" onmousedown="keydownLeft()" onmouseup="keyUpLeft()">
          <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
          </svg>
        </a>
        <a id="volumeBtn" class="control_circle_small control_element" onmousedown="keydownM()" onmouseup="keyUpM()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
          </svg>
        </a>
        <a id="arrowUp" class="control_circle control_element" onmousedown="keydownSpace()" onmouseup="keyUpSpace()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
          </svg>
        </a>
        <a id="throwBtn" class="control_circle control_element" onmousedown="keydownD()" onmouseup="keyUpD()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M600-80q-127-48-203.5-158T320-484q0-91 36-172.5T458-800H320v-80h280v280h-80v-148q-57 51-88.5 119.5T400-484q0 102 54 187.5T600-167v87Z"/>
          </svg>
        </a>
        <a id="fullscreen" class="control_circle_small control_element" onclick="fullscreen()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>
          </svg>
        </a>
        <a id="home" class="control_circle_small control_element" onclick="initStartScreen()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
        </a>
        <img id="idGameOver" class="gameOver" src="images/intro_outro_screens/game_over/game over.png" alt="">
        <a id="reloadGameBtn" class="btn" onclick="reloadGame()">zum Start zurück</a>
    `;
}

function gameOverHTML() {
    return `
        <img class="gameOver" src="images/intro_outro_screens/game_over/game over.png" alt="">
    `;
}

function winHTML() {
     return `
        <img class="gameOver" src="images/intro_outro_screens/win/won_2.png" alt="">
    `;
}
