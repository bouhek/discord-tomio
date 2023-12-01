# discord-tomio
### build image
`docker build -t discord-tomio:latest .`

### running image
`docker run -d --name discord-tomio --restart=always discord-tomio:latest`

### removing the container after stop
`docker rm discord-tomio`

## invite bot to your server
change the client_id to the client id of your bot
`https://discord.com/oauth2/authorize?client_id=813841189769183332&permissions=277083450689&scope=bot%20applications.commands`