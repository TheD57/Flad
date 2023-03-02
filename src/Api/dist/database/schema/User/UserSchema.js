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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
const userSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
// this means that we hash the user password before saving it to the database
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            //just had that to be sure that the api still going
            return next();
        }
        const hash = yield bcrypt_1.default.hash(this.password, 8);
        this.password = hash;
        next();
    });
});
userSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
// fladDevDb
// ZslYlNRWIOUU7i6o
exports.default = (0, mongoose_1.model)('User', userSchema);
// export const User: Model<IUser> = model('User', userSchema);
//# sourceMappingURL=UserSchema.js.map