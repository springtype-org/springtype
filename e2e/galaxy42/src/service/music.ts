import { injectable } from "../../../../src/core/di";
import { Howl } from 'howler';

interface SongMap {
  [songName: string]: {
    howl: Howl;
    playId: number;
  };
}

export type Songs = 'theme' | 'lostPlanet';

@injectable
export class MusicService {

  themeSong!: Howl;
  songs: SongMap = {};

  constructor() {
    this.initSongs();
  }

  initSongs() {

    this.songs.theme = {
      howl: new Howl({
        src: ['assets/music/theme.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.3
      }),
      playId: undefined
    };

    this.songs.lostPlanet = {
      howl: new Howl({
        src: ['assets/music/lost-planet.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.3
      }),
      playId: undefined
    };
  }

  play(songName: Songs) {
    this.songs[songName].howl.stop(this.songs[songName].playId);
    this.songs[songName].howl.loop(this.songs[songName].playId);
    this.songs[songName].playId = this.songs[songName].howl.play();
    this.songs[songName].howl.fade(0, 0.3, 1000, this.songs[songName].playId);
  }

  stop(songName: Songs) {
    this.songs[songName].howl.fade(0.3, 0, 1000, this.songs[songName].playId);
  }
}
