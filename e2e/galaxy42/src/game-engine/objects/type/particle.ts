import { IGameObject } from "../../interface/igame-object";

export class Particle implements IGameObject {
  sprite: PIXI.Sprite;
  hasSprite: boolean = false;
  canCollide: boolean = false;
  emitter: any; // PIXI.particles.Emitter
  onRender(stage: PIXI.Container): void {
    throw new Error("Method not implemented.");
  }
  onTick(deltaTime: number) {
    throw new Error("Method not implemented.");
  }
  createSprite(): PIXI.Sprite {
    throw new Error("Method not implemented.");
  }
  onCollide(object: IGameObject): void {
    throw new Error("Method not implemented.");
  }
}
