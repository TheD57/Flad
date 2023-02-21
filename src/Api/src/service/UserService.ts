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
        try {
            // should maybe creat a method base on id and other information for better security
            // need to view with Emre
            const user = await this.user.findOne({ email });
            // const user = await this.user.findById(idFlad);

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }
}

export default UserService;