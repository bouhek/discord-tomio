FROM node:current-slim
WORKDIR /app/discord-tomio
COPY ./package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run deploy-commands
CMD ["npm", "run", "serve"]