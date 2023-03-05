import { User } from "../User";

export class UserFactory {

    public static JsonToModel( jsonUser :any ) : User{
        return new User(jsonUser.idFlad, jsonUser.idSpotify, jsonUser.email, jsonUser.createdAt, jsonUser.name, jsonUser.imageUrl);
    }
    public static uptade( jsonUser :any ) : User{
        return new User(jsonUser.idFlad, jsonUser.idSpotify, jsonUser.email, jsonUser.createdAt, jsonUser.name, jsonUser.imageUrl);
    }

}