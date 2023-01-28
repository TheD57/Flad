// import { ApiSpotifyIdentification } from "./ApiSpotifyIdentification";
// import { SpotifyRequest } from "./spotifyRequestHandler/spotifyRequest";


// export class SpotifyService {

// private identification : ApiSpotifyIdentification;
// public request : SpotifyRequest;

//   constructor() {
// 	this.identification= new ApiSpotifyIdentification();
// 	this.request = new SpotifyRequest();
//   }

//   	get id(){
// 		return this.identification;
// 	}

// 	async apiAuth(url : string) {
// 		await this.identification.setCode(url);
//     	this.request = ApiSpotifyRequests(await this.identification.createToken());
// 	}

// 	async getSpotifyCredentials() {
// 		const res = await axios.get('/api/spotify-credentials')
// 		const spotifyCredentials = res.data
// 		return spotifyCredentials
// 	  }

// }
