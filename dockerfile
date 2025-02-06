# Schritt 1: Verwende ein Basis-Image mit Node.js
FROM node:23 AS build-stage

# Schritt 2: Setze das Arbeitsverzeichnis im Container auf /app
WORKDIR /app

# Schritt 3: Kopiere die zentrale package.json und package-lock.json sowie die package.json-Dateien von frontend und backend
COPY package*.json ./
COPY frontend/package*.json frontend/
COPY backend/package*.json backend/

# Schritt 4: Installiere die Abhängigkeiten für das gesamte Projekt
RUN npm run install --production

# Schritt 5: Kopiere den gesamten Quellcode ins Arbeitsverzeichnis
COPY . .


# Schritt 6: Baue das gesamte Projekt (Frontend und Backend)
RUN npm run build

# Produktions-Stage: Nur das Notwendige kopieren
FROM node:23 AS production-stage

# Arbeitsverzeichnis setzen
WORKDIR /app

# Kopiere die gebauten Dateien aus der Build-Stage
COPY --from=build-stage /app .


# Setze das Arbeitsverzeichnis auf das Backend und starte den Server
WORKDIR /app/backend
CMD ["npm", "run", "start"]

# Exponiere den Port (z.B. 5001, falls der Backend-Server auf diesem Port läuft)
EXPOSE 5001

