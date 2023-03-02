"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    content: { type: String, required: true }
});
exports.default = { Notification: (0, mongoose_1.model)("nofitication", notificationSchema) };
//# sourceMappingURL=NotificationSchema.js.map