#Backend-Container
FROM node:18

WORKDIR /app/backend/

COPY code/package*.json ./
COPY code/tsconfig.json ./

RUN npm install --production=false

COPY code/backend/ backend/

EXPOSE 5001

CMD ["npm", "run", "dev"]

#Frontend-Container
#FROM node:18 as frontend

#WORKDIR /app/frontend

#COPY code/frontend/packag*.json ./

#RUN npm install --production=false

#COPY code/frontend/ .

#CMD ["npm", "run", "dev"]




