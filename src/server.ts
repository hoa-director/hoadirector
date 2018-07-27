require('dotenv').config();
import * as http from 'http';

import App from './app';

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | false {
    const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    } else {
        return false;
    }
}

function onListening(): void {
    console.log(`listening on port ${port}`);
}
