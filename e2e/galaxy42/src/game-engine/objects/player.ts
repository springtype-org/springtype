import { IGameObject } from "../interface/igame-object";
import { IBoundingBox } from "../interface/ibounding-box";
import { inject } from "../../../../../src/core/di";
import { KeyboardService } from "../../service/keyboard";
import * as PIXI from 'pixi.js-legacy';

export class PlayerObject implements IGameObject {

  @inject(KeyboardService)
  keyboardService!: KeyboardService;

  isRendered: boolean;
  hasSprite: boolean = true;
  sprite: PIXI.Sprite;
  canCollide: boolean = true;

  constructor() {
    this.initKeyNavigation();
  }

  initKeyNavigation() {
    this.keyboardService.onDown(this.onDown);
    this.keyboardService.onUp(this.onUp);
    this.keyboardService.onLeft(this.onLeft);
    this.keyboardService.onRight(this.onRight);
  }

  onLeft = () => {
    console.log('left')
    this.sprite.x -= 10;
  }

  onRight = () => {
    console.log('right')
    this.sprite.x += 10;
  }

  onDown = () => {
    console.log('down')
    this.sprite.y += 10;
  }

  onUp = () => {
    console.log('up')
    this.sprite.y -= 10;
  }


  onRender(stage: PIXI.Container): void {
    this.sprite.scale.set(0.4, 0.4);
    stage.addChild(this.sprite);
    this.isRendered = true;
  }

  onTick(deltaTime: number) {

    // TODO: Sync x/y of particles
  }

  createSprite(): void {
    this.sprite = PIXI.Sprite.from('assets/player.svg');
  }

  onCollide(object: IGameObject): void {
    console.log('onCollide player collided with', object);
  }

  getBoundingBox(): IBoundingBox {
    return {
      x: this.sprite.x,
      y: this.sprite.y,
      width: this.sprite.width,
      height: this.sprite.height
    }
  }
}
