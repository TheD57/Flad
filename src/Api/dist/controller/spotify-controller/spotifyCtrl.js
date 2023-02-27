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
const axios_1 = __importDefault(require("axios"));
const crypt_1 = __importDefault(require("./crypt"));
const querystring_1 = __importDefault(require("querystring"));
const qs_1 = __importDefault(require("qs"));
class SpotifyController {
    constructor() {
        this.path = '/spotify';
        this.router = (0, express_1.Router)();
        // need to put in ENvironement file
        // private readonly CLIENT_CALLBACK_URL = "http://localhost:8080/callback";
        this.API_URL = "https://accounts.spotify.com/api/token";
        this.CLIENT_ID = "1f1e34e4b6ba48b388469dba80202b10";
        this.CLIENT_SECRET = "779371c6d4994a68b8dd6e84b0873c82";
        this.CLIENT_CALLBACK_URL = "https://auth.expo.io/@thed47/FLAD//callback";
        this.CALLBACK_URL = "http://localhost:8080/api/spotify/callback";
        this.SCOPES = 'user-read-private user-read-email user-read-playback-state user-read-currently-playing user-read-recently-played playlist-modify-public ugc-image-upload user-modify-playback-state';
        this.ENCRYPTION_SECRET = new crypt_1.default(16);
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                    querystring_1.default.stringify({
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
            }
            catch (error) {
                next(new httpExeption_1.default(400, 'Cannot create spot'));
            }
        });
        this.getRefreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('UUse2');
            try {
                const params = req.query.refresh_token;
                if (!req.query.refresh_token) {
                    return res.json({
                        "error": "Parameter refresh_token missing"
                    });
                }
                var authOptions = {
                    method: 'POST',
                    url: 'https://accounts.spotify.com/api/token',
                    data: qs_1.default.stringify({
                        grant_type: 'refresh_token',
                        refresh_token: params
                    }),
                    headers: {
                        'Authorization': 'Basic ' + (Buffer.from(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64')),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    json: true
                };
                // request.post(authOptions, function(error, response, body) {
                //   if (!error && response.statusCode === 200) {
                //     var access_token = body.access_token;
                //     res.send({
                //       'access_token': access_token
                //     });
                //   }
                // });
                (0, axios_1.default)(authOptions)
                    .then(session => {
                    if (session.status === 200) {
                        res.send({
                            "access_token": session.data.access_token,
                            "expires_in": session.data.expires_in
                        });
                    }
                });
                console.log("goood");
            }
            catch (error) {
                console.log("errur");
                next(new httpExeption_1.default(400, 'Cannot create post'));
            }
        });
        this.getSpot = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const spots = [
                {
                    name: "blue",
                    sourceUrl: "https://cdns-images.dzcdn.net/images/artist/399e7e760d8fedf3cc2891e9c0c41658/200x200-000000-80-0-0.jpg",
                    index: 3
                },
                {
                    name: "strange history",
                    sourceUrl: "https://images.genius.com/339dfe2a7c0adf9a5d08febf29a845f4.1000x1000x1.jpg",
                    index: 7
                },
                {
                    name: "oboy album",
                    sourceUrl: "https://i.pinimg.com/originals/ad/cc/d5/adccd58a0d0ff516a6114703cd05810e.jpg",
                    index: 1
                }
            ];
            try {
                res.send(spots);
            }
            catch (error) {
                console.log('heuuuuuuuuuuuuuuuuuuuuubizzzaaarrreeee');
                console.log(error);
                next(new httpExeption_1.default(400, 'On peut pas avoir darray mec'));
            }
        });
        this.getAccessToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var code = req.query.code;
            var state = req.query.state || null;
            // var storedState = req.cookies ? req.cookies[stateKey] : null;
            var authOptions = {
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                data: qs_1.default.stringify({
                    code: code,
                    redirect_uri: this.CALLBACK_URL,
                    grant_type: 'authorization_code'
                }),
                headers: {
                    'Authorization': 'Basic ' + (Buffer.from(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            };
            try {
                console.log('presssquuueee');
                var resp = yield (0, axios_1.default)(authOptions);
                if (resp.status === 200) {
                    console.log(resp);
                    console.log('oon esttt laaa');
                    var access_token = resp.data.access_token;
                    console.log(access_token);
                    // should redirect res.redirect('/')
                    res.json("ok");
                }
            }
            catch (error) {
                console.log('heuuuuuuuuuuuuuuuuuuuuubizzzaaarrreeee');
                console.log(error);
                next(new httpExeption_1.default(400, 'On peut pas te connecter mec'));
            }
        });
        console.log("useeeee");
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        // this.router.post(`${this.path}`,this.createTask);
        this.router.get(`${this.path}/exchange`, this.login);
        this.router.get(`${this.path}/callback`, this.getAccessToken);
        // this.router.post(`${this.path}/refresh`,this.getRefreshToken);
        this.router.get(`${this.path}/play/:musicId`, this.getMusic);
        this.router.get(`${this.path}/spot`, this.getSpot);
    }
    getMusic() {
        return null;
    }
}
exports.default = SpotifyController;
//# sourceMappingURL=spotifyCtrl.js.map