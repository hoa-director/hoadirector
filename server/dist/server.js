"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const app_1 = require("./app");
const port = normalizePort(process.env.PORT || 3000);
app_1.default.set('port', port);
const server = http.createServer(app_1.default);
server.listen(port);
server.on('listening', onListening);
function normalizePort(val) {
    const parsedPort = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(parsedPort)) {
        return val;
    }
    else if (parsedPort >= 0) {
        return parsedPort;
    }
    else {
        return false;
    }
}
function onListening() {
    console.log(`listening on port ${port}`);
    console.log(`process environment ${JSON.stringify(process.env.NODE_ENV, null, 2)}`);
}
//# sourceMappingURL=server.js.map