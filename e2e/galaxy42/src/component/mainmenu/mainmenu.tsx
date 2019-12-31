import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface";
import { Layers } from "../layers/layers";
import { StarBurst } from "../starburst/starburst";
import { tsx } from "../../../../../src/web/vdom";
import { Howl } from 'howler';
import { Menu } from "./menu";
import { KeyboardService } from "../../service/keyboard";
import { MusicService } from "../../service/music";
import { inject } from "../../../../../src/core/di";

@component
export class MainMenu extends st.component implements ILifecycle {

  static PATH = 'mainmenu';

  themeSong!: Howl;
  playId!: number;

  @inject(KeyboardService)
  keyboardService!: KeyboardService;

  @inject(MusicService)
  musicService!: MusicService;

  shouldRender() {
    return !this.INTERNAL.notInitialRender;
  }

  onAfterInitialRender() {
    this.keyboardService.onEnter(this.onEnter);
    this.keyboardService.onDown(this.onDown);
    this.keyboardService.onUp(this.onUp);
  }

  onRouteEnter() {
    this.musicService.play('theme');
  }

  onEnter = () => {
    console.log('enter')
  }

  onDown = () => {
    console.log('down')
  }

  onUp = () => {
    console.log('up')
  }

  onRouteLeave() {
    this.musicService.stop('theme');
  }

  render() {
    return <Layers>
      <StarBurst />
      <div>
        <Menu />
      </div>
    </Layers>
  }
}
