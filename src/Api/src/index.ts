import App from "./app";
import SpotifyController from "./controller/spotify-controller/spotifyCtrl";
import PingController from "./controller/TestCtrl";
import UserController from "./controller/user-controller/userCtrl";
import dotenv from 'dotenv'
dotenv.config();
const app = new App(
    [new PingController(), new SpotifyController(), new UserController()],
    Number(process.env.PORT)

);

app.listen();



