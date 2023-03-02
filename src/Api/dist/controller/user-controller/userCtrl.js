"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const httpExeption_1 = __importDefault(require("../../middleware/exeption/httpExeption"));
const UserService_1 = __importDefault(require("../../service/UserService"));
const UserValidation_1 = __importDefault(require("../../database/schema/User/UserValidation"));
const ValidatorMiddleware_1 = __importDefault(require("../../middleware/validation/ValidatorMiddleware"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const LocationService_1 = __importDefault(require("../../service/LocationService"));
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.userService = new UserService_1.default();
        this.locationService = new LocationService_1.default();
        // private createUser = async (
        //     req: Request,
        //     res: Response,
        //     next: NextFunction
        // ): Promise<Response | void> => {
        //     try {
        //         console.log(req.body);
        //         const reqBody:CreateTaskReqBody = Object.assign({}, req.body);
        //         checkIfIsValidCreateTaskReqBody(reqBody);
        //         await this.userService.createUserById(reqBody.fin
        //         );
        //         res.status(200).send({ status: "Success", msg: "Success add" });
        //     } catch (error) {
        //         next(new HttpException(400, 'Cannot create post'));
        //     }
        // };
        // private readonly getUserById: RequestHandler = async (
        //     req: Request,
        //     res: Response,
        //     next: NextFunction
        // ): Promise<Response | void> => {
        //     try {
        //         const id = req.params.taskId;
        //         const userId = req.params.userId;
        //         const data = await this.userService.getUserById(id, userId);
        //         res.status(201).send(data);
        //     }
        //     catch(error){
        //         next(new HttpException(400, 'Cannot create post'));
        //     }
        // }
        // private readonly getAllUsers: RequestHandler = async (
        //     req: Request,
        //     res: Response,
        //     next: NextFunction
        // ): Promise<Response | void> => {
        //     try {
        //         const userId = req.params.userId;
        //         const tasks = await this.userService.getUsers(userId);
        //         const responseList = tasks.map(task => new TaskResumedRes(task));  
        //         res.status(201).send(responseList);             
        //     }
        //     catch(error){
        //         next(new HttpException(400, 'Cannot get user task'));
        //     }
        // }
        // private deleteUser = async (
        //     req: Request,
        //     res: Response,
        //     next: NextFunction
        // ): Promise<Response | void> => {
        //     try {
        //         const id = req.params.taskId;
        //         const userId = req.params.userId;
        //         await this.userService.DeleteUser(id, userId);
        //         return res.status(200).send({ status: "Success", msg: "Data Removed" });
        //     } catch (error) {
        //         next(new HttpException(400, 'Cannot create post'));
        //     }
        // };
        // private updateUser = async (
        //     req: Request,
        //     res: Response,
        //     next: NextFunction
        // ): Promise<Response | void> => {
        //     try {
        //         const taskId = req.params.taskId;
        //         const userId = req.params.userId;
        //         const reqBody:CreateTaskReqBody = Object.assign({}, req.body);                
        //         const updatedTask = await this.userService.UpdateTask(
        //             // req.auth!.uid,
        //             taskId,
        //             userId,
        //             // firebase.auth().currentUser.getIdToken()
        //             reqBody.nom,
        //             reqBody.description,
        //             reqBody.logo,
        //             reqBody.duration,
        //             reqBody.done,
        //             // reqBody.tags,
        //             reqBody.repepat,
        //             reqBody.deb,
        //             reqBody.fin
        //             );
        //             // res.send('Success add');
        //             // res.status(201).json({ task });
        //             res.status(204).send(`Update a new contact: ${updatedTask}`);
        //     } catch (error) {
        //         console.log(error);
        //         next(new HttpException(403, 'Cannot create post'));
        //     }
        // };
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // the FladId should be created by the Userservice
                const { name, email, password, idFlad, idSpotify } = req.body;
                console.log(name, email, password, idFlad, idSpotify);
                const token = yield this.userService.register(name, email, password, idFlad, idSpotify);
                res.status(201).json({ token });
            }
            catch (error) {
                next(new httpExeption_1.default(400, error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userService.login(email, password);
                res.status(200).json({ token });
            }
            catch (error) {
                next(new httpExeption_1.default(400, error.message));
            }
        });
        this.getUser = (req, res, next) => {
            if (!req.user) {
                return next(new httpExeption_1.default(404, 'No logged in user'));
            }
            res.status(200).send({ data: req.user });
        };
        this.getUserNext = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const longitude = Number(req.body.longitude);
                const latitude = Number(req.body.latitude);
                //verify::val_int(){
                if (isNaN(longitude) || isNaN(latitude)) {
                    console.log('Impossible de convertir la chaîne en nombre');
                }
                //}
                const userId = req.user.idFlad;
                const data = yield this.locationService.getNearUser(userId, latitude, longitude);
                console.log(data);
                res.status(201).send(data);
            }
            catch (error) {
                next(new httpExeption_1.default(400, 'Cannot create get netUser'));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/register`, (0, ValidatorMiddleware_1.default)(UserValidation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, ValidatorMiddleware_1.default)(UserValidation_1.default.login), this.login);
        this.router.get(`${this.path}`, authMiddleware_1.default, this.getUser);
        this.router.get(`${this.path}/nextTo`, authMiddleware_1.default, this.getUserNext);
        // //create
        // this.router.post(`${this.path}`,this.createUser);
        // // // get One
        // this.router.get (`${this.path}/:userId`, this.getUserById);
        // // // get All
        // this.router.get (`${this.path}`, this.getAllUsers);
        // //update One
        // this.router.put (`${this.path}/:userId`, this.updateUser);
        // //Delete One
        // this.router.delete (`${this.path}/:userId`, this.deleteUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=userCtrl.js.map