// import db from '../database';
import { Place, PlacePosition, Position, UserLocation } from '../model/locationModel';
import axios from 'axios';

class LocationService {
    private API_KEY : string = "AIzaSyBFCEAtmhZ8jvw84UTQvX3Aqpr66GVqB_A";
    public async getNearUser(uuid : string, latitude : number, longitude : number)
    {
        const UserCollectionref = db.collection('UserPosition');
        db.collection('UserPosition').doc(uuid).set({uuid : uuid, latitude : latitude, longitude : longitude});
        // const newPosition = {
        //     name: 'Los Angeles',
        //     state: 'CA',
        //     country: 'USA'
        //   };     
        const snapshot = await UserCollectionref.where("uuid", "!=", uuid).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  

        let dbUsersList:UserLocation[] = [];
        snapshot.forEach(doc => {
            dbUsersList.push(new UserLocation(doc.data().uuid,doc.data().latitude,doc.data().longitude));
          console.log(doc.id, '=>', doc.data());
        });
            
            let listUser: string[] = [];                                                             //Set the listUser to an empty list
            dbUsersList.forEach(user => {
                console.log(user);
                const dist = this.distanceBetween(latitude , longitude , user.latitude, user.longitude);      //With the function meters, determinate the distance between the current user and the user who is in the actual row
                console.log(user.uuid,dist);
                if (dist <= 5) {                                                     //If the user in the actual row is less than 100 meters away of the current user
    
                    listUser.push(user.uuid);             //Add the username and the ID of the song that user who is in the actual row is listening
    
                }
            });                                      
    
                
            return listUser;                                                           //Return an array
            // $listUser[] = ['user' => $userID, 'music' => $idMusic];             //Add the username and the ID of the song that user who is in the actual row is listening
       
    }

    public getCenter (points: Position[]) {
        if (Array.isArray(points) === false || points.length === 0) {
            return false;
        }
    
        const numberOfPoints = points.length;
    
        const sum = points.reduce(
            (acc, point) => {
                const pointLat = this.toRad(point.coords.latitude);
                const pointLon = this.toRad(point.coords.longitude);
                return {
                    X: acc.X + Math.cos(pointLat) * Math.cos(pointLon),
                    Y: acc.Y + Math.cos(pointLat) * Math.sin(pointLon),
                    Z: acc.Z + Math.sin(pointLat),
                };
            },
            { X: 0, Y: 0, Z: 0 }
        );
    
        const X = sum.X / numberOfPoints;
        const Y = sum.Y / numberOfPoints;
        const Z = sum.Z / numberOfPoints;
    
        return {
            longitude: this.toDeg(Math.atan2(Y, X)),
            latitude: this.toDeg(Math.atan2(Z, Math.sqrt(X * X + Y * Y))),
        };
    };
    
    public toRad = (value: number) => (value * Math.PI) / 180;
    public toDeg = (value: number) => (value * 180) / Math.PI;

    // sa c'est un utils du coup mettre dans une calss utils 
    // resulta en km
    private distanceBetween (lat1 : number, lon1 : number, lat2: number, lon2 : number) : number {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            
            if (dist > 1) {
                dist = 1;
            }
    
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
    
            return dist;
        }
    }
    private distanceBetweenPosition(first : Position, second : Position) : number {
        return this.distanceBetween (first.coords.latitude, first.coords.longitude, second.coords.latitude, second.coords.longitude)
    }

    // give a array of position sorted by distance and return the first
    private findNearest(main : Position, list : Position[]){
        this.orderByDistance(main, list)[0]
    }
    
    //distanceFn: DistanceFn = getDistance est param sa serrait cool de lui passer un fonction
    private orderByDistance (mainPos: Position,coords: Position[]){    
        return coords
        .slice()
        .sort((a, b) => this.distanceBetweenPosition(mainPos, a) - this.distanceBetweenPosition(mainPos, b));
    };

    // getCenter(coords)

    


}



export default LocationService;

  
  
  
  
  
  