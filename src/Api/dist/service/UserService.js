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
const UserSchema_1 = __importDefault(require("../database/schema/User/UserSchema"));
const token_1 = __importDefault(require("../model/token"));
class UserService {
    constructor() {
        this.user = UserSchema_1.default;
    }
    /**
     * Register a new user
     */
    register(name, email, password, idFlad, idSpotify) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.create({
                    name,
                    email,
                    password,
                    idFlad,
                    idSpotify
                });
                const accessToken = token_1.default.createToken(user);
                return accessToken;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /**
     * Attempt to login a user
     */
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // should maybe creat a method base on id and other information for better security
                // need to view with Emre
                const user = yield this.user.findOne({ email });
                // const user = await this.user.findById(idFlad);
                if (!user) {
                    throw new Error('Unable to find user with that email address');
                }
                if (yield user.isValidPassword(password)) {
                    return token_1.default.createToken(user);
                }
                else {
                    throw new Error('Wrong credentials given');
                }
            }
            catch (error) {
                throw new Error('Unable to create user');
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map