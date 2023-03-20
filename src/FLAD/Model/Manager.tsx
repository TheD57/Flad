import SpotifyService from "../services/spotify/spotify.service";

class Manager {

  // injection de dépences
  spotifyService = new SpotifyService();
  userService = new userService();

  // spotify methods
  apiAuthorization(url: string) {
    this.spotifyService.apiAuthorization(url);
  }

  getCompleteMusic = async (id: string): Promise<Music> => {
    // Map info = await spotifyService.getTrackInfo(id);
    // return Music(id, info['name'], info['artist'], info['cover']);
  }

  removeFromPlaylist(id: string) {
    this.spotifyService.removeFromPlaylist(id);
  }


  addToPlaylist(id: string) {
    this.spotifyService.addToPlaylist(id);
  }

  playTrack(id: string) {
    this.spotifyService.playTrack(id);
  }

}

export default Manager;