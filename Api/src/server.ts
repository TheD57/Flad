import App from "./app";
import PingController from "./controller/TestCtrl";

const app = new App(
    [new PingController()],
    Number(8080)
    // Number(process.env.PORT)

);

app.listen();
