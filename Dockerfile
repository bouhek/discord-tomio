FROM node:latest
WORKDIR /app/discord-tomio
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run deploy-commands
CMD ["npm", "run", "serve"]