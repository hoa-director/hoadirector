import * as express from 'express';
import * as path from 'path';
import apiRoutes from './routes/api';
import indexRoutes from './routes';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.staticContent();
        this.routes();
    }

    private staticContent(): void {
        this.express.use(
            express.static(path.join(__dirname, 'public'), {
                maxAge: 31557600000
            })
        );
    }

    private routes(): void {
        this.express.use('/api/', apiRoutes);
        this.express.use('/*', indexRoutes);
    }
}

export default new App().express;
