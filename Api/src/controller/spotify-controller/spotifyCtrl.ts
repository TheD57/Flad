import Controller from '../Icontroller';
import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthReqBody } from './request/authReqBody';
import HttpException from '../../middleware/exeption/httpExeption';
import axios from 'axios';
import CryptString from './crypt';
import AES from 'crypto-js'
import querystring from 'querystring';

class SpotifyController implements Controller {
    public path = '/spotify';
    public router = Router();
    
    constructor() {
      console.log("useeeee");

        this.initialiseRoutes();
    }
    initialiseRoutes() {
        // this.router.post(`${this.path}`,this.createTask);
        this.router.get(`${this.path}/exchange`,this.login);
        this.router.get(`${this.path}/callback`,this.getAccessToken);
        // this.router.post(`${this.path}/refresh`,this.getRefreshToken);
        this.router.get(`${this.path}/play/:musicId`, this.getMusic);
    }

      // need to put in ENvironement file
    // private readonly CLIENT_CALLBACK_URL = "http://localhost:8080/callback";
     private readonly API_URL = "https://accounts.spotify.com/api/token";
     private readonly CLIENT_ID = "1f1e34e4b6ba48b388469dba80202b10";
     private readonly CLIENT_SECRET = "779371c6d4994a68b8dd6e84b0873c82";
     private readonly CLIENT_CALLBACK_URL = "https://auth.expo.io/@thed47/FLAD//callback";
     private readonly CALLBACK_URL = "http://localhost:8080/api/spotify/callback";
     private readonly SCOPES ='user-read-private user-read-email user-read-playback-state user-read-currently-playing user-read-recently-played playlist-modify-public ugc-image-upload user-modify-playback-state';
     private readonly ENCRYPTION_SECRET = new CryptString(16);

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

      console.log("useeeee");
        try {
            // const params = req.body;
            // if (!params.refresh_token) {
            //   return res.json({
            //     "error": "Parameter missing"
            //   });
            // }
          
            // this.spotifyRequest({
            //   grant_type: "authorization_code",
            //   redirect_uri: this.CLIENT_CALLBACK_URL,
            //   // code: params.code
            // })
            res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
              response_type: 'code',
              client_id: this.CLIENT_ID,
              scope: this.SCOPES,
              redirect_uri: this.CALLBACK_URL,
              state: this.ENCRYPTION_SECRET.stringCrypt
            }));
            // .then(session => {
            //   let result = {
            //     "access_token": session.access_token,
            //     "expires_in": session.expires_in,
            //     "refresh_token": this.encrypt(session.refresh_token)
            //   };
            //   return res.send(result);
            // })
            // .catch(response => {
            //   return res.json(response);
            // });
        } catch (error) {
            next(new HttpException(400, 'Cannot create spot'));
        }  
        
        
    };

    // private getRefreshToken = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<Response | void> => {
    
    //   console.log('UUse2');

    //     try {
    //         const params = req.body;
    //         if (!params.refresh_token) {
    //           return res.json({
    //             "error": "Parameter missing"
    //           });
    //         }
          
    //         this.spotifyRequest({
    //             grant_type: "refresh_token",
    //             refresh_token: this.decrypt(params.refresh_token)
    //           })
    //           .then(session => {
    //             return res.send({
    //                 "access_token": session.access_token,
    //                 "expires_in": session.expires_in
    //             });
    //           })
    //           .catch(response => {
    //             return res.json(response);
    //           });
    //           console.log("errur");
    //     } catch (error) {
    //         next(new HttpException(400, 'Cannot create post'));
    //         console.log("errur");

    //     }  
        
        
    // };

    public getMusic(){

      return null;
    }

    // private spotifyRequest = (params : AuthReqBody) => {
    //     return new Promise<any>(() => {
    //       console.log("============ on est laaaa sa mer");
    //       var code = req.query.code || null;
    //       var state = req.query.state || null;

    //         axios.post(this.API_URL, {
    //           form: params,
    //           headers: {
    //             "Authorization": "Basic " + new Buffer(this.CLIENT_ID + ":" + this.CLIENT_SECRET).toString('base64')
    //           },
    //           json: true
    //         });
    //       }).then(resp => {
    //         if (resp.statusCode != 200) {
    //           return Promise.reject({
    //             statusCode: resp.statusCode,
    //             body: resp.body
    //           });
    //         }
    //         return Promise.resolve(resp.body);
    //       })
    //       .catch(err => {
    //         return Promise.reject({
    //           statusCode: 500,
    //           body: err.stringify({})
    //         });
    //       });
    // };

    private getAccessToken = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {

    // console.log("heheh");
    //   try {
    //     var code = req.query.code;
    //     var state = req.query.state;
    //     console.log("================================================================================================================================");
    //     console.log(req);
    //     console.log("================================================================================================================================");

    //     if (state === null) {
    //       next(new HttpException(400, 'Cannot create twerk'));
    //     } else {
    //      const resp : any = await axios.post('https://accounts.spotify.com/api/token',{
    //         form: {
    //           code: code,
    //           redirect_uri: this.CALLBACK_URL,
    //           // code_verifier : this.ENCRYPTION_SECRET.stringCrypt,
    //           grant_type: 'authorization_code'
    //         },
    //         headers: {
    //           'Authorization': 'Basic ' + (new Buffer(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64')),
    //         },json: true}
    //         );
    //       if (resp.statusCode != 200) {
    //         console.log(resp.statusCode, resp.body);    
    //           }
    //       else{
    //         console.log("error");
    //         console.log(resp.statusCode, resp.body);    
    //       }
            
    //     }
    //       // });
    //   } catch (error) {
    //     console.log(error);
    //       next(new HttpException(400, 'Cannot create spot'));
    //   }  
      
    var code = req.query.code || null;
    var state = req.query.state || null;
    // var storedState = req.cookies ? req.cookies[stateKey] : null;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: this.CALLBACK_URL,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };


  };




    private encrypt(text :any){
        return CryptoJS.AES.encrypt(text, this.ENCRYPTION_SECRET.stringCrypt).toString();
    };

    private decrypt(text: any) {
        console.log("errer");
        var bytes = CryptoJS.AES.decrypt(text, this.ENCRYPTION_SECRET.stringCrypt);
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    
}
export default SpotifyController;
