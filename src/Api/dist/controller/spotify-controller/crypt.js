"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CryptString {
    constructor(length) {
        this.stringCrypt = this.generateRandomString(length);
    }
    generateRandomString(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.default = CryptString;
//# sourceMappingURL=crypt.js.map