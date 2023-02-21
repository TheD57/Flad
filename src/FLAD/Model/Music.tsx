export default class Music {
    private id : string; 
    private name : string;
    private artist : string;
    private linkCover : string; // Image.source
  
    constructor(id : string, name : string, artist : string, linkCover : string){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.linkCover = linkCover;
    }
   
}
