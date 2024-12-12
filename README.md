# AuDojo ⛩️

- AVL-Bäume und Sortieralgorithmen selbstständig üben und verstehen 📚
- Interaktive Website mit Schritt-für-Schritt-Lernen und direktem Feedback ✅
- Spielerisches Üben für mehr Verständnis und Selbstvertrauen 💪

<table style="">
  <tr>
    <th>Homepage</th>
    <th>SortSensei</th>
  </tr>
  <tr>
    <td>
      <img src="code/frontend/src/assets/homepage.png" />
    </td>
    <td>
      <img src="code/frontend/src/assets/sortsensei-page.png" />
    </td>
  </tr>
</table>

## Run AuDojo locally ⚡

### Installation

```bash
cd code/
npm i
```

### Run in Devmode 🥽

```bash
cd code/
npm run dev # catch vite address from programm output
```
Das Dojo ist nun unter http://localhost:5001/ erreichbar

### Build 🏗️ && Run 🏃🏻
```bash
cd code/
npm run build
npm run start
```

## Run AuDoJo in a Docker Container 🐋📦

### Via Terminal 📟
  Zuerst muss das Image (die Blaupause) für den individuellen Container generiert werden
  ```bash
  cd code/
  docker build -t AuDojo_Image .
  ```

  Als nächstes wollen wir das Image zum leben erwecken, in dem wir eine konkrete Instanz (einen Container) starten
  ```bash
  docker run -p 5001:5001 AuDojo_Image 
  ```
  Zugriff auf den Container
  Solltest du vergessen haben den Container zu stoppen, oder vergessen haben wie du ihn genannt hast, kannst du dir mit folgendem Befehl die derzeit laufenden Container       anzeigen
  ```bash
  docker ps
  ```
  Um jetzt Zugriff auf den gewünschten Container zu bekommen, mache folgendes 

  ```bash
  docker exec -it <container_name> /bin/bash
  ```

  Container löschen
  ```bash
  docker rm <container_name>
  ```

  Images anzeigen und löschen
  Die Images unserer Anwendungen sind relativ groß. Da bei jedem Build ein neues image erstellt wird, würde ich empfehlen die alten images regelmäßig zu löschen.

  Images anzeigen:
  ```bash
  docker image ls
  ```

  Images löschen:
   ```bash
  docker rmi <image_name>
  ```

## ✨ Kriterien ✨

### 🔥 Muss

- 🐳 Docker-Unterstützung
- ✅ Tests für Stabilität
- 🌳 TreeTutor: Übungstool für AVL-Bäume
- 🔄 SortSensei: Sortieralgorithmen trainieren
- 🎮 Single-Player-Modus
- 🎲 Zufällig generierte Trees und Arrays
- 📖 Verlinkung auf AuD-Anleitungen
- 📜 Einsehen von Pseudo-Code der Algorithmen

### 💡 Soll

- ⭐ Punktesystem für mehr Motivation
- ⚔️ Battles:
  1v1
  Team vs. Team
- 🏆 Leaderboard für den Wettbewerb
- 📚 Generierte Anleitungen zur Hilfe

### 🌟 Kann

- 🤖 Chat-Bot-Helfer für Unterstützung
- 🔍 Übungen zur Breiten- und Tiefensuche
- 🧑‍💼 Benutzerkonten erstellen
- 📚 Battle in der Vorlesung für ein interaktives Lernerlebnis
- 🧩 AuD2: Üben von dynamischer Programmierung
- 📜 Story-Mode für eine immersive Lernerfahrung
