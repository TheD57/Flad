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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema_1 = __importDefault(require("../database/schema/User/UserSchema"));
const token_1 = __importDefault(require("../model/token"));
const httpExeption_1 = __importDefault(require("./exeption/httpExeption"));
function authenticatedMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bearer = req.headers.authorization;
        if (!bearer || !bearer.startsWith('Bearer ')) {
            return next(new httpExeption_1.default(401, 'Unauthorised'));
        }
        const accessToken = bearer.split('Bearer ')[1].trim();
        try {
            const payload = yield token_1.default.verifyToken(accessToken);
            if (payload instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return next(new httpExeption_1.default(401, 'Unauthorised'));
            }
            const user = yield UserSchema_1.default.findById(payload.id)
                .select('-password')
                .exec();
            if (!user) {
                return next(new httpExeption_1.default(401, 'Unauthorised'));
            }
            req.user = user;
            return next();
        }
        catch (error) {
            return next(new httpExeption_1.default(401, 'Unauthorised'));
        }
    });
}
exports.default = authenticatedMiddleware;
//# sourceMappingURL=authMiddleware.js.map