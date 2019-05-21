// import express with types and everything 
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as expressValidator from 'express-validator'
import 'dotenv/config';
import { O_APPEND } from 'constants';
const engine = require('ejs-mate')
const indexRouter = require('./routes/index');
/**
|--------------------------------------------------
| express server class 
|--------------------------------------------------
*/
export class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        //this.routes();
    }
    async config() {
        //connect to mongoDb
        mongoose.connect(`${process.env.MONGOURL}`, { useNewUrlParser: true });
        mongoose.connection.once('open', () => console.log('connected to mongoDb successfully  '))
            .on('error', (error: any) => console.log('DB error  :', error));
        // set a port for development
        this.app.set('port', process.env.PORT);
    
        // middleware 
        this.app.use(morgan('dev')); /** HTTP request logger middleware " dev " Concise output colored by response status for development use */
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(expressValidator());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use('/auth', indexRouter);
    }
    // test route
    // routes() {
        // this.app.get('/', (req, res) => { res.send("it works fine ") })
    // }
    start() {
        this.app.listen(this.app.get('port')).on("listening", () => console.log(`app start on port ${this.app.get("port")}`));
    }
}
const server = new Server;
const app = server.app;
export default app;