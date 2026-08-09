EL_POLLO_LOCO
=================

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Kurze Beschreibung
------------------

EL_POLLO_LOCO ist ein kleines Browser-Game (HTML/CSS/JS), in dem ein Spieler einen Charakter steuert, sammelt und Hindernissen ausweicht. Das Projekt enthält alle Assets (Bilder, Audio, Schriftarten) und die Spiel-Logik in Vanilla JavaScript (objektorientiert, ES6-Klassen, ohne Frameworks oder Build-Tools). Optimiert für den Browser auf Smartphones, spielbar aber auch am Desktop.

Schnellstart
-----------

1. Lokal öffnen

- Öffne index.html direkt im Browser (einige Browser blockieren lokale Dateizugriffe für Audio/Assets).

2. Lokaler Webserver (empfohlen)

- Mit Python 3:

```bash
python3 -m http.server 8000
# dann im Browser öffnen: http://localhost:8000
```

- Mit Node (http-server):

```bash
npx http-server -c-1
# dann im Browser öffnen: http://localhost:8080 (Standardport)
```

Projektstruktur (Kurzüberblick)
------------------------------

- `index.html` – Einstiegspunkt und Spiel-Canvas
- `style.css`, `control-btns.css`, `introductions.css`, `setting-btn.css` – Styles
- `js/` – Steuerungs- und Spiel-Initialisierungsskripte (z. B. `game.js`, `start.js`)
- `levels/`, `models/` – Spielklassen und Level-Logik
- `images/`, `audio/`, `fonts/` – Assets (Grafiken, Sounds, Schriftarten)

Steuerung
---------

**Desktop (Tastatur):**

- Pfeiltasten links/rechts: Bewegung
- Leertaste: Springen
- D: Flasche werfen
- M: Ton stumm schalten / aktivieren
- P: Pause
- H: Zurück zum Start-Bildschirm

**Mobile (Touch):**

- Onscreen-Buttons für Bewegung, Springen und Werfen
- Menü oben rechts für Pause, Ton und weitere Optionen

Entwicklung
-----------

- Code ist in ES6 geschrieben, keine Build-Schritte nötig.
- Nutze einen lokalen Server (siehe oben), um CORS/Dateizugriffsprobleme mit Audio/Assets zu vermeiden.

Assets & Lizenz
---------------

- Schriftarten liegen in `fonts/` mit zugehöriger OFL-Datei (`OFL.txt`) – SIL Open Font License.
- Für Bilder und Audio sind in diesem Repo keine allgemeinen Lizenzangaben zugeordnet. Vor einer Weiterverwendung außerhalb dieses Projekts sollte die Herkunft der einzelnen Assets geprüft werden.
- Für den Quellcode des Spiels ist aktuell keine explizite Lizenz vergeben.

Contributing
------------

- Bugfixes und kleine Verbesserungen per Pull Request.
- Bitte vor größeren Änderungen ein Issue öffnen, damit die Änderung abgestimmt werden kann.

Kontakt / Autor
----------------

Richard Wezel – kontakt@richard-wezel.de

Screenshots
-----------

Startbildschirm:

![Startscreen](https://raw.githubusercontent.com/RichardWezel/El_Pollo_Loco/main/images/intro_outro_screens/start/startscreen_1.png)

Beispiel-Gameplay-Hintergrund:

![Gameplay Hintergrund](https://raw.githubusercontent.com/RichardWezel/El_Pollo_Loco/main/images/desert_background.jpg)

Gewonnen-Bildschirm:

![Win Screen](https://raw.githubusercontent.com/RichardWezel/El_Pollo_Loco/main/images/intro_outro_screens/win/win_1.png)
