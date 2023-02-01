const notificationSchema = new mongoose.Schema({
    type: {type: String, required: true},
    content: {type: String, required: true}
});

export default {Annonce: mongoose.model("nofitication", notificationSchema)}