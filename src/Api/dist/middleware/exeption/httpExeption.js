"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
// en fontion de l'exeption firebas,etc une bonne exeption
exports.default = HttpException;
//# sourceMappingURL=httpExeption.js.map