import axios from "axios";
import MusicFactory from "../../Model/factory/MusicFactory";
import Music from "../../Model/Music";
import { FetchOptions, RequestHandler } from "./spotifyRequestHandler/utils";

export default class SpotifyService implements IspotifyService {
    private readonly API_URL = "https://flad-api-production.up.railway.app/api/";
    private spotifyRequestHandler = new RequestHandler();
	private readonly token : string; 
    constructor(token : string) {
        this.token = token;
    }
  	// get id(){
	// 	return this.identification;
	// }

	// async apiAuth(url : string) {
	// 	await this.identification.setCode(url);
    // 	// this.request = ApiSpotifyRequests(await this.identification.createToken());
	// }  
	public async getMusicById(idMusic : string): Promise<Music>{
		var requestData :string =  '/tracks/' + idMusic;
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined,this.token);
		if (respMusic.status != 200) {
		}
		return MusicFactory.mapFromSpotifyTrack(respMusic.data);
	}

	public async getUserCurrentMusic(): Promise<string | null>{
		var requestData :string = '/me/player/currently-playing';
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined,this.token);
		if (respMusic.status != 200) {
			return null;
		}
		return respMusic.data.items.track.id;
	}

	public async getUserRecentlyPlayedMusic(): Promise<string | null>{
		var requestData :string = '/me/player/recently-played';
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined,this.token);
		if (respMusic.status != 200) {
		}
		if (respMusic.data.items.length <= 0) {
			return null;
		  }
		return respMusic.data.items[0].track.id;
	}

	public async playMusic(idMusic : string): Promise<void>{
		var requestData :string = '/me/player/play';
		const fetchOptions: FetchOptions = {
			method: 'PUT',
			body: {
			  uris: [`spotify:track:${idMusic}`],
			  position_ms: 0
			}
		  };
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, fetchOptions,this.token);
		console.log(respMusic.data);
		// need to handle when 
		// if (respMusic.status != 200) {
		// 	if (respMusic.status == 400 && respMusic.data.message =='need to use Spotify premium'){

		// 	}
		// }
		// if(respMusic){
		// 	console.log(respMusic);
		// 	console.log(respMusic.data);

		// }
		return ;
	}

	public async searchMusic(text : string): Promise<Music[]>{
		var requestData :string = '/search';
		const fetchOptions: FetchOptions = {
			params: {
				q: text,
				type: 'track'
			}
		  };
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, fetchOptions,this.token);
		
		if (respMusic.status != 200) {
		}
		const tracksData = respMusic?.data?.tracks?.items;
		if (!tracksData || !Array.isArray(tracksData)) {
			return [];
		}
		const tracks = tracksData.map((trackData: any) => {
			// const { id, name, artists, album } = trackData;
			return MusicFactory.mapFromSpotifyTrack(trackData)
			// const artistNames = artists.map((artist: any) => artist.name).join(', ');
			// const linkCover = album?.images[0]?.url || '';
			// return new Music(id, name, artistNames, linkCover);
		  });
		return tracks;
	}
	// tempo version 
	public async getMusicMoreDetails(idMusic : string): Promise<string>{
		var requestData :string =  '/audio-features/' + idMusic;
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined,this.token);
		if (respMusic.status != 200) {
		}

		return respMusic.data.audio_features.tempo;
	}

	public async getRelatedArtist(idArtist : string): Promise<string>{
		var requestData :string =  '/artists/' + idArtist + '/related-artists';
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined,this.token);
		if (respMusic.status != 200) {
		}

		return respMusic.data.audio_features.tempo;
	}

	public async getArtistTopTracks(idArtist : string): Promise<string>{
		var requestData :string =  '/artists/' + idArtist + '/top-tracks';
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined,this.token);
		if (respMusic.status != 200) {
		}

		return respMusic.data.audio_features.tempo;
	}


	public async addItemToPlayList(playlistId : string, idMusic : string): Promise<void>{
		var requestData :string = '/playlists/' + playlistId + '/tracks';
		const fetchOptions: FetchOptions = {
			method: 'POST',
			body: {
			  uris: [`spotify:track:${idMusic}`]
			}
		  };
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, fetchOptions,this.token);
		console.log(respMusic.data);
		return ;
	}

	public async createPlayList(userId : string,name : string,description : string): Promise<void>{
		var requestData :string = '/users/' + encodeURIComponent(userId) + '/playlists';
		
		const fetchOptions: FetchOptions = {
			method: 'POST',
			body: {
				"public": false,
				"name": name || "New Flad Playlist",
				"description": description,
			}
		  };
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, fetchOptions,this.token);
		console.log(respMusic.data);
		return ;
	}



	async getSpotifyCredentials() {
		const res = await axios.get(this.API_URL)
        // then  verify error
		const spotifyCredentials = res.data;
		return spotifyCredentials
	  }

}
