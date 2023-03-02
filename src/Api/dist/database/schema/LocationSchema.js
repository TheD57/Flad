"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
// fladDevDb
// ZslYlNRWIOUU7i6o
exports.default = (0, mongoose_1.model)('Location', locationSchema);
//# sourceMappingURL=LocationSchema.js.map