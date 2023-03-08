export default class Artist {
    private id : string; 
    private name : string;
    private url : string; // Image.source
  
    constructor(id : string, name : string, url : string){
        this.id = id;
        this.name = name;
        this.url = url;
    }
   
}