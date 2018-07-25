import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import apiRoutes from './routes/api';
import indexRoutes from './routes';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.staticContent();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        
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
