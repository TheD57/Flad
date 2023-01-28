import { Router } from "express";
import Controller from "./Icontroller";

type PingResponse = {
    message: string;
  }

export default class PingController implements Controller {
    public path = '/ping';
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get("/ping", async (_req, res) => {
            const response = await this.getMessage();
            return res.send(response);
          });
    }
    async getMessage(): Promise<PingResponse> {
        return {
        message: "pong",
        };
    }
}