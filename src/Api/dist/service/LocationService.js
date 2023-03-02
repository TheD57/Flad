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
// import db from '../database';
const locationModel_1 = require("../model/locationModel");
const LocationSchema_1 = __importDefault(require("../database/schema/LocationSchema"));
class LocationService {
    constructor() {
        this.locationCollection = LocationSchema_1.default;
        this.toRad = (value) => (value * Math.PI) / 180;
        this.toDeg = (value) => (value * 180) / Math.PI;
        // getCenter(coords)
    }
    // private API_KEY : string = "AIzaSyBFCEAtmhZ8jvw84UTQvX3Aqpr66GVqB_A";
    getNearUser(idFlad, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.locationCollection.findOneAndUpdate({ idFlad }, { idFlad, latitude, longitude }, { upsert: true });
            const snapshot = yield this.locationCollection.find({ idFlad: { $ne: idFlad } });
            if (snapshot.length === 0) {
                console.log('No matching documents.');
                return;
            }
            let dbUsersList = [];
            snapshot.forEach(doc => {
                dbUsersList.push(new locationModel_1.UserLocation(doc.idFlad, doc.latitude, doc.longitude));
                console.log(doc.idFlad, '=>', doc);
            });
            // missing the curent music
            let listUser = [];
            dbUsersList.forEach(user => {
                console.log(user);
                const dist = this.distanceBetween(latitude, longitude, user.latitude, user.longitude);
                console.log(user.uuid, dist);
                if (dist <= 100) {
                    listUser.push(user.uuid);
                }
            });
            return listUser;
            // $listUser[] = {userID,idMusic};             
        });
    }
    getCenter(points) {
        if (Array.isArray(points) === false || points.length === 0) {
            return false;
        }
        const numberOfPoints = points.length;
        const sum = points.reduce((acc, point) => {
            const pointLat = this.toRad(point.coords.latitude);
            const pointLon = this.toRad(point.coords.longitude);
            return {
                X: acc.X + Math.cos(pointLat) * Math.cos(pointLon),
                Y: acc.Y + Math.cos(pointLat) * Math.sin(pointLon),
                Z: acc.Z + Math.sin(pointLat),
            };
        }, { X: 0, Y: 0, Z: 0 });
        const X = sum.X / numberOfPoints;
        const Y = sum.Y / numberOfPoints;
        const Z = sum.Z / numberOfPoints;
        return {
            longitude: this.toDeg(Math.atan2(Y, X)),
            latitude: this.toDeg(Math.atan2(Z, Math.sqrt(X * X + Y * Y))),
        };
    }
    ;
    // sa c'est un utils du coup mettre dans une calss utils 
    // resulta en km
    distanceBetween(lat1, lon1, lat2, lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            return dist;
        }
    }
    distanceBetweenPosition(first, second) {
        return this.distanceBetween(first.coords.latitude, first.coords.longitude, second.coords.latitude, second.coords.longitude);
    }
    // give a array of position sorted by distance and return the first
    findNearest(main, list) {
        this.orderByDistance(main, list)[0];
    }
    //distanceFn: DistanceFn = getDistance est param sa serrait cool de lui passer un fonction
    orderByDistance(mainPos, coords) {
        return coords
            .slice()
            .sort((a, b) => this.distanceBetweenPosition(mainPos, a) - this.distanceBetweenPosition(mainPos, b));
    }
    ;
}
exports.default = LocationService;
//# sourceMappingURL=LocationService.js.map