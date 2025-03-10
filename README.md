[![Build Project](https://github.com/AuDojo/AuDojo/actions/workflows/build.yml/badge.svg)](https://github.com/AuDojo/AuDojo/actions)

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
      <img src="frontend/src/assets/homepage-new-new.png" />
    </td>
    <td>
      <img src="frontend/src/assets/sortsensei-page-new-new.png" />
    </td>
  </tr>
</table>

<table style="">
  <tr>
    <th>TreeTutor</th>
    <th>Examples-SortSensei</th>
  </tr>
  <tr>
    <td>
      <img src="frontend/src/assets/treetutor-page.png" />
    </td>
    <td>
      <img src="frontend/src/assets/examples-page.png" />
    </td>
  </tr>
</table>

> _Hint: `git commit` will automatically check linting with ESLint and Prettier. `git commit --no-verify` will skip that._

## Run AuDojo locally ⚡

### Installation 💾

```bash
# If pnpm not installed, run: `npm i -g pnpm`
pnpm i
```

### Run in Devmode 🥽

```bash
pnpm dev # catch site-url from programm output
```

### Build 🏗️ && Run 🏃🏻

```bash
pnpm build # remove artifacts with `npm run clean`
pnpm start
```

Das Dojo ist nun unter http://localhost:5001/projects/audojo erreichbar ☎️

## Run AuDoJo in a Docker Container 🐋📦

### Via docker-compose

```bash
# Run
docker-compose up -d # --build (if source code changed and you want to build the image again)

# Stop and delete container
docker-compose down
```

### Via dockerfile

(1) Image erzeugen 🌱

```bash
docker build -t audojo .
```

(2) Container starten 🛫

```bash
docker run -p 5001:5001 audojo
```

(3) Laufende Container anzeigen 👓

```bash
docker ps
```

(4) Auf Container zugreifen 🤚

```bash
docker exec -it <container_name> /bin/bash
```

(5) Container löschen 🗑️

```bash
docker rm <container_name>
```

(6) Images anzeigen 👓

```bash
docker image ls
```

(7) Images löschen 🗑️

```bash
docker rmi <image_name>
```

## 🧪 Testing

Using [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com/) for Unit/Integration tests,
[Playwright](https://playwright.dev) as a tool for running e2e tests.

Start Unit and Integration tests with:

```bash
pnpm test # --ui
```

Start e2e tests with:

```bash
pnpm e2e # --ui
```

- [More about testing](https://github.com/AuDojo/AuDojo/discussions/332)

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
