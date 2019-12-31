import { injectable } from "../../../../src/core/di";
import { IGameObject } from "./interface/igame-object";
import { isColliding } from "./box-collider";
import * as PIXI from 'pixi.js-legacy';

@injectable
export class GameEngine {

  gameObjects: Array<IGameObject> = [];

  tick(deltaTime: number, stage: PIXI.Container) {

    for (const gameObject of this.gameObjects) {

      if (gameObject.hasSprite && !gameObject.sprite) {
        gameObject.createSprite();
      }

      if (!gameObject.isRendered) {
        gameObject.onRender(stage);
      }

      // box collider
      for (const collisionCandidateGameObject of this.gameObjects) {
        if (gameObject.canCollide && gameObject !== collisionCandidateGameObject &&
          isColliding(collisionCandidateGameObject.getBoundingBox(), gameObject.getBoundingBox())) {
          collisionCandidateGameObject.onCollide(gameObject);
          gameObject.onCollide(collisionCandidateGameObject);
        }
      }

      // game loop tick
      gameObject.onTick(deltaTime);
    }
  }

  add(gameObject: IGameObject) {
    this.gameObjects.push(gameObject);
  }
}
