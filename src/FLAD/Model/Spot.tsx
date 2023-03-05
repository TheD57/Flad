import Music from "./Music";

export class Spot {
    private _userId : string;
    public _music : Music;
    constructor(userId : string, music : Music){
        this._userId = userId;
        this._music = music;
    } 
    get userSpotifyId(): string {
        return this._userId;
      }
      get idSpotify(): Music {
        return this._music;
      }

}