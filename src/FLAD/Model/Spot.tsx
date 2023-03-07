import Music from "./Music";

export class Spot {
    private _userId : string;
    private _music : Music;
    constructor(userId : string, music : Music){
        this._userId = userId;
        this._music = music;
    } 
    get userSpotifyId(): string {
        return this._userId;
      }
    set userSpotifyId(value: string) {
      this._userId = value;
    }
    get music(): Music {
      return this._music;
    }
    set music(value: Music) {
      this._music = value;
    }
}