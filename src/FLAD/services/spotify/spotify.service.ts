
export class SpotifyService {

private identification : ApiSpotifyIdentification;
public request : SpotifyRequest;

  constructor() {

  }

  	get identification{
		
	}

	async uploadName() {
		
	}
	async apiAuth(url : string) {
		await this.identification.setCode(url);
    	this.request = ApiSpotifyRequests(await this.identification.createToken());
	}

}
