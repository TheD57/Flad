
const userSchema: Schema = new mongoose.Schema<IUser>({
    pseudo: {type: String, index: { unique: true }},
    email: {type: String},
    idDafl: {type: String, index: { unique: true }},
    idSpotify: {type: String},
    password: {type: String},
    prenom: {type: String, default: ""},
    description: {type: String, default: ""},
    nom: {type: String, default: ""},
    ville: {type: String, default: ""},
    profilPic: {type: String},
    noteList: [],
    notifications: [],
    friends: {type: [String] },
    favoris: [],
    conversations: {type: [String] }
});
// fladDevDb
// ZslYlNRWIOUU7i6o
export const User: Model<IUser> = model('User', userSchema);
