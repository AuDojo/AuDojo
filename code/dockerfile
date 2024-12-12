# Schritt 1: Verwende ein Basis-Image mit Node.js
FROM node:18 AS build-stage

# Schritt 2: Setze das Arbeitsverzeichnis im Container auf /app
WORKDIR /app

# Schritt 3: Kopiere die zentrale package.json und package-lock.json sowie die package.json-Dateien von frontend und backend
COPY code/package*.json ./
COPY code/frontend/package*.json frontend/
COPY code/backend/package*.json backend/

# Schritt 4: Installiere die Abhängigkeiten für das gesamte Projekt
RUN npm run install

# Schritt 5: Kopiere den gesamten Quellcode ins Arbeitsverzeichnis
COPY code/ .

# Schritt 6: Baue das gesamte Projekt (Frontend und Backend)
RUN npm run build

# Produktions-Stage: Nur das Notwendige kopieren
FROM node:18 AS production-stage

# Arbeitsverzeichnis setzen
WORKDIR /app

# Kopiere die gebauten Dateien aus der Build-Stage
COPY --from=build-stage /app .

# Exponiere den Port (z.B. 5001, falls der Backend-Server auf diesem Port läuft)
EXPOSE 5001

# Setze das Arbeitsverzeichnis auf das Backend und starte den Server
WORKDIR /app/backend
CMD ["npm", "run", "start"]

