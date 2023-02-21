import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
    type: {type: String, required: true},
    content: {type: String, required: true}
});

export default {Notification: model("nofitication", notificationSchema)}