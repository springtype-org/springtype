import { JSX as IonicJSX } from "@ionic/core/dist/types/components";

declare global {
  export namespace JSX {
    export interface IntrinsicElements extends IonicJSX.IntrinsicElements {
      [tagName: string]: any;
    }
  }
}
