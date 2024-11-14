# AuDojo

Wir sind überzeugt, dass viele Studierende von einem interaktiven Lernwerkzeug für AuD pro-
fitieren würden. Daher möchten wir eine Website erstellen mit folgenden Funktionen:
- Schrittweise Übungen zu AVL-Tree-Operationen und Sortieralgorithmen mit detaillierten Erklärungen
- Sofortige Überprüfung zu eigenen Lösungsansätzen
- Gamifizierung des Lernprozesses durch ein Punktesystem für gelöste Aufgaben und ein
motivierendes Leaderboard.

Unser übergeordnetes Ziel ist es, den Lernprozess für AuD-Studierende effizienter und ange-
nehmer zu gestalten. Wir streben danach, mit diesem Tool Unsicherheiten abzubauen und
das Selbstvertrauen der Studierenden im Umgang mit diesen fundamentalen Konzepten zu
stärken.

# Start Backend and Frontend

### Setup

```bash
cd code/
npm i # Install backend dependencies
cd frontend/
npm i # Install frontend dependencies
```

### Run

```bash
cd code/
npm run dev # Run express server on http://localhost:5001
cd frontend/
npm run dev # Run frontend server on some localhost (look at terminal)

```

## Kriterien

### Muss

- Docker einrichten
- Tests
- TreeTutor
- SortSensei
- "Single-Player"
- Zufallsgenerierte Trees und Arrays
- Verlinkung auf AuD Anleitungen
- Möglichkeit den jeweiligen Pseudo-Code mit anzusehen

### Soll

- Punktesystem
- Battle mit anderen Studenten
  - one v. one
  - Team v. Team
- Leaderboard
- Generierte Anweisungen / Anleitungen zur Hilfe

### Kann

- Chat-Bot Helfer
- Breiten- Tiefensuche
- Accounts
- Battle in der Vorlesung
- AuD2 Dynamic Programming
- Story-Mode
