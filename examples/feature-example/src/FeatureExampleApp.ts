import {WebComponent} from "@springtype/springtype-incubator-core";
import template from "./FeatureExampleApp.tpl";

@WebComponent({
    tag: 'feature-example-app',
    template
})
export class FeatureExampleApp extends HTMLElement {}