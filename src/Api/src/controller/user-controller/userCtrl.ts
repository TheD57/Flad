import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import Controller from '../Icontroller';
import HttpException from '../../middleware/exeption/httpExeption';
// import LocationService from '../../service/LocationService';
import IUser from '../../database/schema/User/UserInterface';
import UserService from '../../service/UserService';
import validator from '../../database/schema/User/UserValidation'
import validationMiddleware from '../../middleware/validation/ValidatorMiddleware';
import authenticator from '../../middleware/authMiddleware'
import LocationService from '../../service/LocationService';
class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private userService = new UserService();
    private locationService = new LocationService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validator.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validator.login),
            this.login
        );
        this.router.get(`${this.path}`, authenticator, this.getUser);
        this.router.get(`${this.path}/nextTo`, authenticator, this.getUserNext);

        
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

    
    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // the FladId should be created by the Userservice
            const { name, email, password,idFlad, idSpotify } = req.body;

            const token = await this.userService.register(
                name,
                email,
                password,
                idFlad,
                idSpotify
            );

            res.status(201).json({ token });
        } catch (error : any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.userService.login(email, password);

            res.status(200).json({ token });
        } catch (error : any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).send({ data: req.user });
    };

    private getUserNext = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const longitude =  Number(req.body.longitude);
            const latitude =  Number(req.body.latitude);
            //verify::val_int(){
            if (isNaN(longitude) || isNaN(latitude)) {
                console.log('Impossible de convertir la chaîne en nombre');
            }
            //}
            const userId = req.user.idFlad;            
            const data = await this.locationService.getNearUser(userId,latitude,longitude);
            console.log(data);
            res.status(201).send(data);

        }
        catch(error : any){
            next(new HttpException(400, 'Cannot create get netUser'));
        }
    
    }
   

}

export default UserController;



declare global {
    namespace Express {
        export interface Request {
            user: IUser;
        }
    }
}