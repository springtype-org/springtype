import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface";
import { inject } from "../../../../../src/core/di";
import { MusicService } from "../../service/music";
import { KeyboardService } from "../../service/keyboard";
import * as PIXI from 'pixi.js-legacy';
import 'pixi-particles';
import { tsx } from "../../../../../src/web/vdom";
import { GameEngine } from "../../game-engine/game-engine";
import { PlayerObject } from "../../game-engine/objects/player";

@component
export class InGame extends st.component implements ILifecycle {

  static PATH = "ingame";

  app!: PIXI.Application;

  @inject(MusicService)
  musicService!: MusicService;

  @inject(GameEngine)
  gameEngine!: GameEngine;

  onRouteEnter() {
    this.musicService.play('lostPlanet');
  }

  onRouteLeave() {
    this.musicService.stop('lostPlanet');
  }

  onAfterRender() {
    this.renderCanvas();
  }

  async renderCanvas() {
    this.app = new PIXI.Application();

    this.el.appendChild(this.app.view);

    const mission1 = PIXI.Sprite.from('assets/university.jpg');
    const missionScaleFactor = 4;

    const startPosition = (-0 * missionScaleFactor) + window.innerHeight;
    const speedFactor = 0.512;

    mission1.position.x = 0;
    mission1.position.y = startPosition;
    mission1.scale.set(missionScaleFactor, missionScaleFactor)

    this.gameEngine.add(new PlayerObject());

    // 4928 height

    this.app.stage.addChild(mission1);

    // main game loop
    this.app.ticker.add((deltaTime: number) => {

      // delta T is typically 1ms
      this.gameEngine.tick(deltaTime, this.app.stage);

      // canvas responsiveness
      this.app.renderer.screen.width = window.innerWidth;
      this.app.renderer.screen.height = window.innerHeight;
      this.app.renderer.view.setAttribute("width", window.innerWidth);
      this.app.renderer.view.setAttribute("height", window.innerHeight);

      mission1.position.y += speedFactor;
    });
  }

  render() {
    return <fragment />;
  }

}
