import {
  ArcRotateCamera,
  Axis,
  Color4,
  Effect,
  Engine,
  Mesh,
  Scene,
  ShaderMaterial,
  Texture,
  Vector3,
} from "babylonjs";
import { st } from "../../../../../src/core";
import { ref } from "../../../../../src/core/ref";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface";
import fragmentShader from "../../shaders/warp.frag";
import vertexShader from "../../shaders/warp.vert";
import "./first-scene.scss";
import tpl from "./first-scene.tpl";

@component({
  tpl,
})
export class FirstScene extends st.component implements ILifecycle {

  class = "FirstScene";

  private engine!: Engine;
  private scene!: Scene;
  private camera!: ArcRotateCamera;

  @ref
  private iframe!: HTMLIFrameElement;

  @ref
  private canvas!: HTMLCanvasElement;

  onAfterRender(): void {
    window.addEventListener("resize", () => this.alignVideoDisplay());

    this.registerShaders();

    this.createEngine();
    this.createScene();
    this.createCamera();

    this.createMeshAnimation();

    this.engine.runRenderLoop(() => this.scene.render());
  }

  onAfterRender() {
    this.alignVideoDisplay();
  }

  private alignVideoDisplay() {
    const halfWidth = this.el.clientWidth / 2;

    if (this.iframe) {
      const videoDisplayHeight = this.el.clientWidth / 3.555;

      this.iframe.style.top = `${this.el.clientHeight - videoDisplayHeight - videoDisplayHeight / 2}px`;

      this.iframe.style.transform = `perspective(${halfWidth}px) rotateX(15deg)`;
      this.iframe.style.left = `${halfWidth / 2}px`;
      this.iframe.style.width = `${halfWidth}px`;
      this.iframe.style.height = `${videoDisplayHeight}px`;
    }
  }

  private registerShaders() {
    Effect.ShadersStore["customFragmentShader"] = fragmentShader;
    Effect.ShadersStore["customVertexShader"] = vertexShader;
  }

  private createEngine() {
    this.engine = new Engine(this.canvas, true);
  }

  private createScene() {
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0, 0, 0, 0);
  }

  private createCamera() {
    this.camera = new ArcRotateCamera("Camera", 0, Math.PI / 2, 12, Vector3.Zero(), this.scene);
    this.camera.attachControl(this.el, false);

    this.camera.lowerRadiusLimit = 6;
    this.camera.upperRadiusLimit = 6;
    this.camera.minZ = 1;
  }

  private createMeshAnimation() {
    const shaderMaterial = new ShaderMaterial(
      "shader",
      this.scene,
      {
        vertex: "custom",
        fragment: "custom",
      },
      {
        attributes: ["position", "normal", "uv"],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
      },
    );

    const mesh = Mesh.CreatePlane("mesh", 10.0, this.scene);
    mesh.rotate(Axis.Y, Math.PI * 0.5);

    const refTexture = new Texture("http://i.imgur.com/HP1V7TJ.png", this.scene);

    shaderMaterial.setTexture("refSampler", refTexture);
    shaderMaterial.setFloat("time", 0);
    shaderMaterial.setVector3("cameraPosition", Vector3.Zero());

    shaderMaterial.backFaceCulling = false;

    mesh.material = shaderMaterial;

    let time = 0;

    this.scene.registerBeforeRender(() => {
      shaderMaterial.setFloat("time", time);
      time += 0.02;

      shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera!.position);
    });
  }
}
