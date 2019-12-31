import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface";
import { tsx } from "../../../../../src/web/vdom";
import { ref } from "../../../../../src/core/ref";
import * as PIXI from 'pixi.js-legacy';

interface Star {
  sprite: PIXI.Sprite,
  z: number;
  x: number;
  y: number;
}

@component
export class StarBurst extends st.component implements ILifecycle {

  @ref
  container!: HTMLElement;

  cameraZ = 0;

  app!: PIXI.Application;
  pixelationFilter!: PIXI.Filter;

  onPixiLoad = (loader: any, res: any) => {
    // Create the new filter, arguments: (vertexShader, framentSource)
    /*
    console.log('res.vertexShader.data', res.vertexShader.data)
    console.log('res.vertexShader.data', res.fragmentShader.data)
    this.pixelationFilter = new PIXI.Filter(null, res.fragmentShader.data, {
      customUniform: 0.0,
      pixelSize: { type: "f", value: 16 },
      resolution: { type: "v2v", value: [window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio] }
    });
    */

  }

  calc() {
    // Get the texture for rope.
    const starTexture = PIXI.Texture.from('assets/star.png');

    const starAmount = 1000;
    const fov = 20;
    const baseSpeed = 0.025;
    let speed = 0;
    let warpSpeed = 0;
    const starStretch = 5;
    const starBaseSize = 0.05;


    // Create the stars
    const stars = [];
    for (let i = 0; i < starAmount; i++) {
      const star = {
        sprite: new PIXI.Sprite(starTexture),
        z: 0,
        x: 0,
        y: 0,
      };
      // not working atm
      //star.sprite.filters = [this.pixelationFilter];
      star.sprite.anchor.x = 0.5;
      star.sprite.anchor.y = 0.7;
      this.randomizeStar(star, true);
      this.app.stage.addChild(star.sprite);
      stars.push(star);
    }

    // Change flight speed every 5 seconds
    setTimeout(() => {
      warpSpeed = warpSpeed > 0 ? 0 : 1;
    }, 2000);

    // Listen for animate update
    this.app.ticker.add((delta) => {

      this.app.renderer.screen.width = window.innerWidth;
      this.app.renderer.screen.height = window.innerHeight;
      this.app.renderer.view.setAttribute("width", window.innerWidth);
      this.app.renderer.view.setAttribute("height", window.innerHeight);

      // Simple easing. This should be changed to proper easing function when used for real.
      speed += (warpSpeed - speed) / 20;
      this.cameraZ += delta * 10 * (speed + baseSpeed);
      for (let i = 0; i < starAmount; i++) {
        const star = stars[i];
        if (star.z < this.cameraZ) this.randomizeStar(star);

        // Map star 3d position to 2d with really simple projection
        const z = star.z - this.cameraZ;
        star.sprite.x = star.x * (fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.width / 2;
        star.sprite.y = star.y * (fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.height / 2;

        // Calculate star scale & rotation.
        const dxCenter = star.sprite.x - this.app.renderer.screen.width / 2;
        const dyCenter = star.sprite.y - this.app.renderer.screen.height / 2;
        const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter);
        const distanceScale = Math.max(0, (2000 - z) / 2000);
        star.sprite.scale.x = distanceScale * starBaseSize;
        // Star is looking towards center so that y axis is towards center.
        // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
        star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / this.app.renderer.screen.width;
        star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
      }
    });

  }

  onAfterInitialRender() {
    this.app = new PIXI.Application();

    this.app.loader
      .add('fragmentShader', 'assets/shaders/pixelate.frag')
      //.add('vertexShader', 'assets/shaders/pixelate.vert')
      .load(this.onPixiLoad);

    this.calc();

    this.container.appendChild(this.app.view);
  }

  randomizeStar(star: Star, initial: boolean = false) {
    star.z = initial ? Math.random() * 2000 : this.cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
  }

  render() {
    return <div ref={{ container: this }}></div>
  }
}
