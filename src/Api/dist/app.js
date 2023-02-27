"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import compression from 'compression';
const cors_1 = __importDefault(require("cors"));
// import ErrorMiddleware from './middleware/error.middleware';
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.dataBase = null;
        this.initialiseDatabase();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        // this.initialiseErrorHandling();
    }
    initialiseMiddleware() {
        // this.express.use(helmet());
        this.express.use((0, cors_1.default)());
        // this.express.use(morgan('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        // this.express.use(compression());
        // mine
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({
            extended: true
        }));
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
            this.express.get('/toto', (req, res) => {
                res.send('Hello World!');
            });
        });
    }
    // private initialiseErrorHandling(): void {
    //     this.express.use(ErrorMiddleware);
    // }
    listen() {
        const server = this.express.listen(this.port, () => {
            console.log(`⚡️[server] : App listening on the port ${this.port}`);
        });
    }
    initialiseDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        const uri = "mongodb+srv://fladDevDb:ZslYlNRWIOUU7i6o@fladcluster.b29tytu.mongodb.net/?retryWrites=true&w=majority";
        mongoose_1.default.connect(uri)
            .then(() => console.log("Connect to MongoDB database successfully"))
            .catch(err => console.log("Error connecting : " + err));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map