// import { useState } from "react";
// import SpotifyService from "../services/spotify/spotify.service";

// class Manager{
  
//     // injection de dépences
//     spotifyService = new SpotifyService();
//     userService = new userService();

//     private currentUser  = useState(null);

//     constructor() {
//     }

//     // spotify methods
//       apiAuthorization(url : string) {
//         spotifyService.apiAuthorization(url);
//       }
    
//       getCompleteMusic = async (id : string) :Promise<Music> =>{
//         // Map info = await spotifyService.getTrackInfo(id);
//         // return Music(id, info['name'], info['artist'], info['cover']);
//       }
      
//       removeFromPlaylist(id : string) {
//         this.spotifyService.removeFromPlaylist(id);
//       }
    

//       addToPlaylist(id : string) {
//         this.spotifyService.addToPlaylist(id);
//       }
    
//       playTrack(id : string) {
//         this.spotifyService.playTrack(id);
//       }
//       ////////////////////////////////////////////

//     // private readonly getTaskById: RequestHandler = async (
//     //     req: Request,
//     //     res: Response,
//     //     next: NextFunction
//     // ): Promise<Response | void> => {
//     //     try {
//     //         const id = req.params.taskId;
//     //         const userId = req.params.userId;
             
//     //         const data = await this.Taskservice.getTaskById(id, userId);
//     //         res.status(201).send(data);

//     //     }
//     //     catch(error){
//     //         next(new HttpException(400, 'Cannot create post'));
//     //     }
    
//     // }

    
//     // private delete = async (
//     //     req: Request,
//     //     res: Response,
//     //     next: NextFunction
//     // ): Promise<Response | void> => {
//     //     try {
//     //         const id = req.params.taskId;
//     //         const userId = req.params.userId;
//     //         await this.Taskservice.DeleteTask(id, userId);
//     //         return res.status(200).send({ status: "Success", msg: "Data Removed" });
//     //     } catch (error) {
//     //         next(new HttpException(400, 'Cannot create post'));
//     //     }
//     // };
    
//     // private updateTask = async (
//     //     req: Request,
//     //     res: Response,
//     //     next: NextFunction
//     // ): Promise<Response | void> => {
//     //     try {
            
//     //         const taskId = req.params.taskId;
//     //         const userId = req.params.userId;
//     //         const reqBody:CreateTaskReqBody = Object.assign({}, req.body);                
            
//     //         const updatedTask = await this.Taskservice.UpdateTask(
//     //             // req.auth!.uid,
//     //             taskId,
//     //             userId,
//     //             // firebase.auth().currentUser.getIdToken()
//     //             reqBody.nom,
//     //             reqBody.description,
//     //             reqBody.logo,
//     //             reqBody.duration,
//     //             reqBody.done,
//     //             // reqBody.tags,
//     //             reqBody.repepat,
//     //             reqBody.deb,
//     //             reqBody.fin
//     //             );
//     //             // res.send('Success add');
//     //             // res.status(201).json({ task });
//     //             res.status(204).send(`Update a new contact: ${updatedTask}`);
//     //     } catch (error) {
//     //         console.log(error);
//     //         next(new HttpException(403, 'Cannot create post'));
//     //     }
//     // };

// }

// export default Manager;