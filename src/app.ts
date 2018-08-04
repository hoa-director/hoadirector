import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import apiRoutes from './routes/api';
import indexRoutes from './routes';
import userRoutes from './routes/user';
import passport from './config/passport';

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
        this.express.use(bodyParser.json());
        this.express.use(session({ secret: process.env.SESSION_SECRET }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
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
        this.express.use('/user/', userRoutes);
        this.express.use('/*', indexRoutes);
    }

}

export default new App().express;
