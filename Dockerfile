FROM node:latest
WORKDIR /app/discord-tomio
COPY ./package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "serve"]