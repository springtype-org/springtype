import {WebComponent} from "../../../src/package/html";
import template from "./FeatureExampleApp.tpl";

@WebComponent({
    tag: 'feature-example-app',
    template
})
export class FeatureExampleApp extends HTMLElement {}