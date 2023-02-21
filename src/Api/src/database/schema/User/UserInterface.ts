import { Document } from 'mongoose';

export default interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    idFlad : string;
    idSpotify : string;

    isValidPassword(password: string): Promise<Error | boolean>;
}