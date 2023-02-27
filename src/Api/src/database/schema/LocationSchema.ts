import { Schema, model,Document } from 'mongoose';


const locationSchema = new Schema(
    {
        
        idFlad: {
            type: String,
            required: true,
            unique: true,
        },
       
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        
        
    },
    { timestamps: true }
);

// fladDevDb
// ZslYlNRWIOUU7i6o
export default model<ILocation>('Location', locationSchema);

export interface ILocation extends Document {
    idFlad: string;
    latitude : number;
    longitude: number;

}