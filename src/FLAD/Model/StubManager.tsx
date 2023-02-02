// import { useState } from "react";
// import SpotifyService from "../services/spotify/spotify.service";
// import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

// class StubManager{
  
//     // injection de dépences
//     spotifyService = new SpotifyService();
//     // userService = new userService();

//     private currentUser  = useState(null);
//     private discovery = {
//         authorizationEndpoint: 'https://accounts.spotify.com/authorize',
//         tokenEndpoint: 'https://accounts.spotify.com/api/token',
//       };
//     constructor() {
//     }

//     // spotify methods
//       apiAuthorization(url : string){
//         const [, response, promptAsync] = useAuthRequest(
//             {
//               clientId: '1f1e34e4b6ba48b388469dba80202b10',
//               scopes: ['user-read-email', 'playlist-modify-public'],
//               // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
//               // this must be set to false
//               usePKCE: false,
//               redirectUri: makeRedirectUri({
//                 scheme: 'flad'
//               }),
//             },
//             this.discovery
//           );

    
//     }
    
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

// export default StubManager;