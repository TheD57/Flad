import App from "./app";
import SpotifyController from "./controller/spotify-controller/spotifyCtrl";
import PingController from "./controller/TestCtrl";

const app = new App(
    [new PingController(), new SpotifyController()],
    Number(8080)
    // Number(process.env.PORT)

);

app.listen();



