// maye this file should me the UserModel like we had in php cause it's here we verrify the password
import IUser from "./UserInterface";
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
// const userSchema: Schema = new Schema<IUser>({
//     pseudo: {type: String, index: { unique: true }},
//     email: {type: String},
//     idDafl: {type: String, index: { unique: true }},
//     idSpotify: {type: String},
//     password: {type: String},
//     prenom: {type: String, default: ""},
//     description: {type: String, default: ""},
//     nom: {type: String, default: ""},
//     ville: {type: String, default: ""},
//     profilPic: {type: String},
//     noteList: [],
//     notifications: [],
//     friends: {type: [String] },
//     favoris: [],
//     conversations: {type: [String] }
// });

const userSchema = new Schema(
    {
        
        idFlad: {
            type: String,
            required: true,
            unique: true,
        },
        idSpotify: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            // this mean that we identify user by email
            unique: true,
            // delete the whitespace
            trim: true,
        },
        password: {
            type: String,
        },
        
    },
    { timestamps: true }
);

// this means that we hash the user password before saving it to the database
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        //just had that to be sure that the api still going
        return next();
    }

    const hash = await bcrypt.hash(this.password, 8);

    this.password = hash;

    next();
});

userSchema.methods.isValidPassword = async function (
    password: string
): Promise< boolean | Error> {
    return await bcrypt.compare(password, this.password);
};

// fladDevDb
// ZslYlNRWIOUU7i6o
export default model<IUser>('User', userSchema);
// export const User: Model<IUser> = model('User', userSchema);
