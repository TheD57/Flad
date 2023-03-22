import axios from "axios";
import MusicFactory from "../../Model/factory/MusicFactory";
import Music from "../../Model/Music";
import { FetchOptions, RequestHandler } from "./spotifyRequestHandler/utils";
export class MusicMinimal {
	public id: string;
	public title: string;
	public image: string;

	constructor(id: string, title: string, bio: string, image: string, trackPreviewUrl: string) {
		this.title = title;
		this.image = image;
		this.id = id;
	}

}

export default class SpotifyService implements IspotifyService {
	private readonly API_URL = "https://flad-api-production.up.railway.app/api/";
	private spotifyRequestHandler = new RequestHandler();
	public token: string;


	constructor(token: string) {
		this.token = token;
	}
	public async getMusicById(idMusic: string): Promise<Music| null> {
		let requestData: string = '/tracks/' + idMusic;
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined, this.token);
		if (respMusic.status != 200) {
			return null;
		}
		return MusicFactory.mapFromSpotifyTrack(respMusic.data);
	}

	public async getUserCurrentMusic(): Promise<string | null> {
		let requestData: string = '/me/player/currently-playing';
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined, this.token);
		if (respMusic.status != 200) {
			return null;
		}


		return respMusic.data.item.id;
	}

	public async getUserRecentlyPlayedMusic(): Promise<string | null> {
		let requestData: string = '/me/player/recently-played';
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined, this.token);
		if (respMusic.status != 200) {
			return null;
		}
		if (respMusic.data.items.length <= 0) {
			return null;
		}
		return respMusic.data.items[0].track.id;
	}

	public async playMusic(idMusic: string): Promise<void> {
		const fetchOptions: FetchOptions = {
			method: 'PUT',
			body: {
				uris: [`spotify:track:${idMusic}`],
				position_ms: 0
			}
		};
		throw new Error("not Implemented")
		return;
	}

	public async searchMusic(text: string): Promise<Music[]> {
		var requestData: string = '/search';
		const fetchOptions: FetchOptions = {
			params: {
				q: text,
				type: 'track'
			}
		};
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, fetchOptions, this.token);

		if (respMusic.status != 200) {
		}
		const tracksData = respMusic?.data?.tracks?.items;
		if (!tracksData || !Array.isArray(tracksData)) {
			return [];
		}
		const tracks = tracksData.map((trackData: any) => {
			return MusicFactory.mapFromSpotifyTrack(trackData)
		});
		return tracks;
	}
	// tempo version 
	public async getMusicMoreDetails(idMusic: string): Promise<string> {
		let requestData: string = '/audio-features/' + idMusic;
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined, this.token);
		if (respMusic.status != 200) {
		}

		return respMusic.data.audio_features.tempo;
	}

	public async getRelatedArtist(idArtist: string): Promise<string> {
		let requestData: string = '/artists/' + idArtist + '/related-artists';
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined, this.token);
		if (respMusic.status != 200) {
		}

		return respMusic.data.audio_features.tempo;
	}

	public async getArtistTopTracks(idArtist: string): Promise<string> {
		let requestData: string = '/artists/' + idArtist + '/top-tracks';
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, undefined, this.token);
		if (respMusic.status != 200) {
		}

		return respMusic.data.audio_features.tempo;
	}

	public async addItemToPlayList(playlistId: string, idMusic: string): Promise<void> {
		let requestData: string = '/playlists/' + playlistId + '/tracks';
		const fetchOptions: FetchOptions = {
			method: 'POST',
			body: {
				uris: [`spotify:track:${idMusic}`]
			}
		};
		const respMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, fetchOptions, this.token);
		console.log(respMusic.data);
		return;
	}

	public async getSimilarTrack(musicId: string, limit: number = 1, market?: string): Promise<Music[]> {
		const requestData: string = '/recommendations/' +
			'?limit=' + limit +
			'&market=FR' +
			'&seed_tracks=' + musicId;
		var respSimilarMusic;
		try {
			respSimilarMusic = await this.spotifyRequestHandler.spotifyFetch(requestData, {}, this.token);
		} catch (error) {
			console.log(error);
		}
		if (!respSimilarMusic || !respSimilarMusic.data.tracks) {
			return [];
		}
		const similars: Music[] = await Promise.all(
			respSimilarMusic.data.tracks.map(async (trackData: any) => {
				if (trackData.id != undefined) {
					const data = await this.getMusicById(trackData.id);
					return data;
				}

			})

		)
		return similars.filter((music: Music | undefined) => !!music) as Music[];
	}


	async getSpotifyCredentials() {
		const res = await axios.get(this.API_URL)
		const spotifyCredentials = res.data;
		return spotifyCredentials
	}

}
