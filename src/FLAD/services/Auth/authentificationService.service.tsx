export class AuthentificationService {

	constructor(private auth: Auth, private http: HttpClient) { }
	name = "toto";

	async register({ email, password }) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}
	async login({ email, password }) {
		// should for all method use a cloud function to creata user  
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	logout() {
		return signOut(this.auth);
	}


}




