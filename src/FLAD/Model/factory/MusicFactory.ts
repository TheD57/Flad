import Music from "../Music";

export default class MusicFactory {
    static mapFromSpotifyTrack(jsonMusic :any ): Music {
        const music = new Music(
            jsonMusic.id,
            jsonMusic.name,
            "",
            jsonMusic.album.images[0].url,
            jsonMusic.preview_url
          );
      return music;
    }
  }