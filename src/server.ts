import * as dotenv from 'dotenv';
dotenv.config();
import * as http from 'http';

import App from './app';

const port = normalizePort(process.env.PORT || 5000);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | false {
  const parsedPort: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(parsedPort)) {
    return val;
  } else if (parsedPort >= 0) {
    return parsedPort;
  } else {
    return false;
  }
}

function onListening(): void {
  console.log(`listening on port ${port}`);
}
