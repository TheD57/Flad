import App from "./app";
import SpotifyController from "./controller/spotify-controller/spotifyCtrl";
import PingController from "./controller/TestCtrl";
import UserController from "./controller/user-controller/userCtrl";

const app = new App(
    [new PingController(), new SpotifyController(), new UserController()],
    Number(8080)
    // Number(process.env.PORT)

);

app.listen();



