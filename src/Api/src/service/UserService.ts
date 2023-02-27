import UserSchema from "../database/schema/User/UserSchema";
import token from "../model/token";


class UserService {
    private user = UserSchema;

    /**
     * Register a new user
     */
    public async register(
        name: string,
        email: string,
        password: string,
        idFlad : string,
        idSpotify : string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                idFlad,
                idSpotify
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error : any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
            // should maybe creat a method base on id and other information for better security
            // need to view with Emre
            const user = await this.user.findOne({ email });
            console.log(user?._id);
            // const user = await this.user.findById(idFlad);

            if (user === undefined || user === null) {
                console.log("Could")
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
       
    }
}

export default UserService;