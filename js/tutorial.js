/**
 * Interactive in-game tutorial ("learn by doing").
 *
 * Shown on top of the running game when it is started from the start screen. Instead of
 * a text page nobody reads, it gives the player one small task at a time ("Laufe nach
 * rechts", "Springe", ...) and only moves on once the player has actually done it. On
 * desktop each task shows the keyboard key to press, on touch devices the matching
 * on-screen control button is highlighted (pulsing) instead.
 *
 * The game keeps running underneath - nothing here pauses or blocks it. The tutorial can
 * be skipped at any time and is not shown again after "Noch einmal!" (see startGame()).
 */

/**
 * Interval handle for the polling loop that checks whether the current step is done.
 */
let tutorialInterval = null;

/**
 * Index into TUTORIAL_STEPS of the step currently shown.
 */
let tutorialStepIndex = 0;

/**
 * Snapshot values taken when a step starts (character x, enemy count, ...) so a step's
 * `isDone` check can compare against the state at the beginning of that step.
 */
let tutorialStepStart = {};

/**
 * Time in ms the current step has been visible while the game was NOT paused. Used for
 * steps that finish on a timeout, so pausing the game doesn't count towards them.
 */
let tutorialStepElapsed = 0;

/**
 * True while the "✓ Super!" confirmation is shown between two steps, so the polling
 * loop doesn't evaluate the next step's condition before it's even displayed.
 */
let tutorialTransitioning = false;

/**
 * How long the "✓" confirmation stays visible before the next step is shown (ms).
 */
const TUTORIAL_CONFIRM_DURATION = 1100;

/**
 * Polling interval of the tutorial loop (ms).
 */
const TUTORIAL_TICK = 100;

/**
 * The tutorial steps in order. Each step has:
 * - title:    short label (e.g. "Laufen")
 * - text:     the actual task
 * - hint:     optional smaller extra line
 * - key:      keyboard key label shown on desktop (omit for steps without a key)
 * - btnId:    id of the on-screen control button to highlight on touch devices
 * - img:      optional image shown next to the text (e.g. the bottle to collect)
 * - onStart:  optional, takes a snapshot the isDone check can compare against
 * - isDone:   returns true when the player has completed the task
 * - timeout:  optional ms after which the step is completed automatically (only counts
 *             while the game is not paused) - for "tips" that can't reliably be verified
 */
const TUTORIAL_STEPS = [
    {
        title: 'Laufen',
        text: 'Laufe nach rechts',
        hintDesktop: 'Linke Pfeiltaste: zurück laufen.',
        hintMobile: 'Halte den Button gedrückt.',
        key: '→',
        btnId: 'arrowRight',
        onStart: () => ({ x: world.character.x }),
        isDone: () => world.character.x > tutorialStepStart.x + 120
    },
    {
        title: 'Springen',
        text: 'Springe in die Luft',
        hintDesktop: 'So erreichst du auch die Münzen weiter oben.',
        hintMobile: 'So erreichst du auch die Münzen weiter oben.',
        key: 'Leertaste',
        btnId: 'arrowUp',
        isDone: () => world.character.isAboveGround()
    },
    {
        title: 'Hühner',
        text: 'Springe auf Hühner, um sie zu besiegen',
        hintDesktop: 'Vorsicht: Berührung kostet Lebensenergie.',
        hintMobile: 'Vorsicht: Berührung kostet Lebensenergie.',
        img: 'images/chicken/1_w.png',
        onStart: () => ({ enemies: world.level.enemies.length, energy: world.character.energyCharacter }),
        isDone: () => world.level.enemies.length < tutorialStepStart.enemies
                   || world.character.energyCharacter < tutorialStepStart.energy,
        timeout: 9000
    },
    {
        title: 'Flaschen',
        text: 'Sammle eine Tabasco-Flasche ein',
        hintDesktop: 'Einfach hindurchlaufen. Du brauchst sie gegen den Endgegner.',
        hintMobile: 'Einfach hindurchlaufen. Du brauchst sie gegen den Endgegner.',
        img: 'images/bottle/solo/salsa_bottle_stuck_right.png',
        isDone: () => world.character.collectedBottles > 0
    },
    {
        title: 'Werfen',
        text: 'Wirf eine Flasche',
        hintDesktop: 'Pepe muss dabei nach rechts schauen.',
        hintMobile: 'Pepe muss dabei nach rechts schauen.',
        key: 'D',
        btnId: 'throwBtn',
        isDone: () => world.throwableObject.length > 0
    },
    {
        title: 'Bereit!',
        text: 'Du bist bereit! Der Endgegner wartet am Ende des Weges.',
        hintDesktop: 'Alle Tasten: ?-Symbol oben rechts.',
        hintMobile: 'Alle Funktionen: Menü oben rechts.',
        isDone: () => false,
        timeout: 6000
    }
];

/**
 * Insert the tutorial box into the game screen and start the first step. Called from
 * startGame() after the World exists, since the step checks read from `world`.
 */
function startTutorial() {
    endTutorial();
    let gameScreen = document.getElementById('gameScreen');
    // insertAdjacentHTML instead of innerHTML += - see renderOverlay() in start.js for
    // why += would break the already-running canvas.
    gameScreen.insertAdjacentHTML('beforeend', tutorialHTML());
    tutorialStepIndex = 0;
    showTutorialStep();
    tutorialInterval = setInterval(tutorialTick, TUTORIAL_TICK);
}

/**
 * Remove the tutorial box and stop the polling loop. Safe to call when no tutorial is
 * showing. Used by the skip button and once the last step is finished.
 */
function endTutorial() {
    if (tutorialInterval) {
        clearInterval(tutorialInterval);
        tutorialInterval = null;
    }
    clearTutorialHighlight();
    let layer = document.getElementById('tutorialLayer');
    if (layer) {
        layer.remove();
    }
    tutorialTransitioning = false;
}

/**
 * Returns true while a tutorial is showing.
 */
function isTutorialRunning() {
    return tutorialInterval !== null;
}

/**
 * Render the current step into the tutorial box, take the step's start snapshot and
 * highlight the matching control button on touch devices.
 */
function showTutorialStep() {
    let step = TUTORIAL_STEPS[tutorialStepIndex];
    let box = document.getElementById('tutorialBox');
    if (!step || !box) {
        return;
    }
    tutorialStepStart = step.onStart ? step.onStart() : {};
    tutorialStepElapsed = 0;
    box.classList.remove('tutorial-done', 'tutorial-fade');
    box.innerHTML = tutorialStepHTML(step, tutorialStepIndex, TUTORIAL_STEPS.length);
    clearTutorialHighlight();
    if (step.btnId && checkDeviceMode() == 'mobile') {
        highlightTutorialControl(step.btnId);
    }
}

/**
 * Polling loop: while the game is running (not paused, not over), check whether the
 * current step has been completed - either by the player's action or by its timeout.
 */
function tutorialTick() {
    if (!isGameRunning() || tutorialTransitioning) {
        return;
    }
    if (isGameOverOrWon()) {
        endTutorial();
        return;
    }
    if (world.isPaused) {
        return;
    }
    let step = TUTORIAL_STEPS[tutorialStepIndex];
    tutorialStepElapsed += TUTORIAL_TICK;
    let timedOut = step.timeout && tutorialStepElapsed >= step.timeout;
    if (step.isDone() || timedOut) {
        completeTutorialStep();
    }
}

/**
 * Mark the current step as done: show the "✓" confirmation briefly, then either advance
 * to the next step or - after the last one - fade the tutorial out entirely.
 */
function completeTutorialStep() {
    tutorialTransitioning = true;
    clearTutorialHighlight();
    let box = document.getElementById('tutorialBox');
    let isLast = tutorialStepIndex >= TUTORIAL_STEPS.length - 1;
    if (box) {
        // The final "you're ready" step has no task to confirm - just let it fade away.
        if (isLast) {
            box.classList.add('tutorial-fade');
        } else {
            box.classList.add('tutorial-done');
            box.innerHTML = tutorialConfirmHTML();
        }
    }
    setTimeout(() => {
        tutorialTransitioning = false;
        if (isLast || !isTutorialRunning()) {
            endTutorial();
        } else {
            tutorialStepIndex++;
            showTutorialStep();
        }
    }, TUTORIAL_CONFIRM_DURATION);
}

/**
 * Skip button handler: stop the tutorial right away. The game keeps running.
 */
function skipTutorial() {
    endTutorial();
}

/**
 * Add the pulsing highlight to the on-screen control button with the given id.
 *
 * @param {string} btnId - id of the control button (e.g. 'arrowRight').
 */
function highlightTutorialControl(btnId) {
    let btn = document.getElementById(btnId);
    if (btn) {
        btn.classList.add('tutorial-pulse');
    }
}

/**
 * Remove the pulsing highlight from every control button.
 */
function clearTutorialHighlight() {
    document.querySelectorAll('.tutorial-pulse').forEach(el => el.classList.remove('tutorial-pulse'));
}

/**
 * Returns true once the win or game-over screen is showing, so the tutorial can get out
 * of the way.
 */
function isGameOverOrWon() {
    let gameOver = document.getElementById('gameOver');
    let gameWin = document.getElementById('gameWin');
    return (gameOver && gameOver.style.display == 'block')
        || (gameWin && gameWin.style.display == 'block')
        || world.character.isDead();
}

/**
 * Build the inner HTML of the tutorial box for one step.
 *
 * @param {Object} step - Entry of TUTORIAL_STEPS.
 * @param {number} index - Index of the step (for the progress dots).
 * @param {number} total - Total number of steps.
 * @returns {string} HTML markup.
 */
function tutorialStepHTML(step, index, total) {
    let mobile = checkDeviceMode() == 'mobile';
    let hint = mobile ? step.hintMobile : step.hintDesktop;
    return `
        <button class="tutorial-skip" onclick="skipTutorial()" title="Tutorial überspringen">Überspringen ✕</button>
        <div class="tutorial-title">${step.title}</div>
        <div class="tutorial-main">
            ${tutorialInputHTML(step, mobile)}
            <div class="tutorial-text">
                <div class="tutorial-task">${step.text}</div>
                ${hint ? `<div class="tutorial-hint">${hint}</div>` : ''}
            </div>
        </div>
        ${tutorialDotsHTML(index, total)}
    `;
}

/**
 * Build the visual cue for what to press: a keyboard key cap on desktop, a copy of the
 * on-screen control button's icon on touch devices, or the step's image if it has no
 * key at all (e.g. "collect a bottle").
 *
 * @param {Object} step - Entry of TUTORIAL_STEPS.
 * @param {boolean} mobile - Whether the touch layout is active.
 * @returns {string} HTML markup (may be empty).
 */
function tutorialInputHTML(step, mobile) {
    if (step.img) {
        return `<img class="tutorial-img" src="${step.img}" alt="">`;
    }
    if (mobile && step.btnId) {
        let btn = document.getElementById(step.btnId);
        let svg = btn ? btn.querySelector('svg') : null;
        if (svg) {
            let extra = step.btnId == 'throwBtn' ? ' tutorial-icon-throw' : '';
            return `<div class="tutorial-icon${extra}">${svg.outerHTML}</div>`;
        }
    }
    if (!mobile && step.key) {
        let wide = step.key.length > 1 ? ' tutorial-key-wide' : '';
        return `<div class="tutorial-key${wide}">${step.key}</div>`;
    }
    return '';
}

/**
 * Progress dots showing which step of how many is active.
 *
 * @param {number} index - Active step index.
 * @param {number} total - Total number of steps.
 * @returns {string} HTML markup.
 */
function tutorialDotsHTML(index, total) {
    let dots = '';
    for (let i = 0; i < total; i++) {
        let cls = i < index ? 'tutorial-dot done' : (i == index ? 'tutorial-dot active' : 'tutorial-dot');
        dots += `<span class="${cls}"></span>`;
    }
    return `<div class="tutorial-dots">${dots}</div>`;
}

/**
 * The short "✓ Super!" confirmation shown between two steps.
 *
 * @returns {string} HTML markup.
 */
function tutorialConfirmHTML() {
    return `
        <div class="tutorial-confirm">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            <span>Super!</span>
        </div>
    `;
}
