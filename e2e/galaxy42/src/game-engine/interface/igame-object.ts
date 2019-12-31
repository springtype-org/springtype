import { IBoundingBox } from "./ibounding-box";

export interface IGameObject {
  hasSprite: boolean;
  isRendered: boolean;
  sprite: PIXI.Sprite;
  canCollide: boolean;
  getBoundingBox(): IBoundingBox;
  onRender(stage: PIXI.Container): void;
  onTick(deltaTime: number);
  createSprite(): void;
  onCollide(object: IGameObject): void;
}
