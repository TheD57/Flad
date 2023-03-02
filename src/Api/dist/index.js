"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const spotifyCtrl_1 = __importDefault(require("./controller/spotify-controller/spotifyCtrl"));
const TestCtrl_1 = __importDefault(require("./controller/TestCtrl"));
const userCtrl_1 = __importDefault(require("./controller/user-controller/userCtrl"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new app_1.default([new TestCtrl_1.default(), new spotifyCtrl_1.default(), new userCtrl_1.default()], Number(process.env.PORT));
app.listen();
//# sourceMappingURL=index.js.map