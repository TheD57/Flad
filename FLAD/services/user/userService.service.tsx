import { AuthentificationService } from "../Auth/authentificationService.service";

export class UserService {

  constructor(private auth: AuthentificationService) {}

	getUserProfile() {
		const user = this.auth.currentUser;
		const userDocRef = doc(this.firestore, `User/${user.uid}`);
		return docData(userDocRef);
	}
	async uploadName(name: string, email : string) {
		const user = this.auth.currentUser;
		try {
			const userDocRef = doc(this.firestore, `User/${user.uid}`);
			await setDoc(userDocRef, {
				name,
				email
			});
			return true;
		} catch (e) {
			return null;
		}
	}
	

}
