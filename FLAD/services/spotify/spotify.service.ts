import axios from "axios";


export default class SpotifyService {
    private readonly API_URL = "http://localhost:8080/api/spotify/exchange";

    constructor() {
        
    }
  	// get id(){
	// 	return this.identification;
	// }

	// async apiAuth(url : string) {
	// 	await this.identification.setCode(url);
    // 	// this.request = ApiSpotifyRequests(await this.identification.createToken());
	// }   
	async getSpotifyCredentials() {
		const res = await axios.get(this.API_URL)
        // then  verify error
		const spotifyCredentials = res.data;
		return spotifyCredentials
	  }

}
