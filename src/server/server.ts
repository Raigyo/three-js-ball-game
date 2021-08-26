// When starting this project by using `npm run dev`, this server script
// will be compiled using tsc and will be running concurrently along side webpack-dev-server
// visit http://127.0.0.1:8080

// In the production environment we don't use the webpack-dev-server, so instead type,
// `npm run build`        (this creates the production version of bundle.js and places it in ./dist/client/)
// `tsc -p ./src/server`  (this compiles ./src/server/server.ts into ./dist/server/server.js)
// `npm start            (this starts nodejs with express and serves the ./dist/client folder)
// visit http://127.0.0.1:3000

import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
import theBallGame from './theBallGame'

const PORT: number = parseInt(<string>process.env.PORT, 10) || 3000

class App {
    private server: http.Server
    private PORT: number

    private io: socketIO.Server

    constructor(PORT: number) {
        this.PORT = PORT
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))

        this.server = new http.Server(app)

        this.io = new socketIO.Server(this.server)

        new theBallGame(this.io)
    }

    public Start() {
        this.server.listen(this.PORT, () => {
            console.log(`Server listening on PORT ${this.PORT}.`)
        })
    }
}

new App(PORT).Start()
