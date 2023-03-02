"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = exports.UserLocation = exports.PlacePosition = void 0;
class PlacePosition {
    constructor(timestamp, latitude, longitude) {
        this.timestamp = timestamp;
        this.coords = { latitude, longitude };
    }
}
exports.PlacePosition = PlacePosition;
class UserLocation {
    constructor(uuid, latitude, longitude) {
        this.uuid = uuid;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
exports.UserLocation = UserLocation;
class Place {
    constructor(address, position) {
        this.position = position;
        this.address = address;
    }
}
exports.Place = Place;
//# sourceMappingURL=locationModel.js.map