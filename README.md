# discord-tomio
### build image
`docker build -t discord-tomio:latest .`

### running image
`docker run -d --name discord-tomio --restart=always discord-tomio:latest`

### removing the container after stop
`docker remove discord-tomio`