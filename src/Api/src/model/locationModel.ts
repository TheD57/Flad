export interface Position {
    /**
     * Creation timestamp for coords
     */
    timestamp: number;
    /**
     * The GPS coordinates along with the accuracy of the data
     */
    coords: {
        /**
         * Latitude in decimal degrees
         */
        latitude: number;
        /**
         * longitude in decimal degrees
         */
        longitude: number;
    };
}
export class PlacePosition implements Position {
    timestamp: number;
    coords: {
        latitude: number;
        longitude: number;
    };
    constructor(timestamp: number,latitude : number ,longitude: number){
        this.timestamp = timestamp;
        this.coords = {latitude, longitude};
    }
}
export class UserLocation {
    uuid: string;
    latitude : number;
    longitude: number;
    constructor(uuid: string, latitude: number, longitude: number){
        this.uuid = uuid;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class Place{
position: Position;
address: Address;
constructor(address: Address,position: Position){
    this.position = position;
    this.address = address;
}
}


export type Address = {
street : string;
city : string;
state : string;
zip : string;
}