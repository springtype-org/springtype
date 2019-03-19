import {Template, Element} from "@springtype/springtype-incubator-core";
import template from "./FeatureExampleApp.tpl";
import {UseComponent} from "../../../src/package/core";
import {BurgerButton} from "../../burger-button/src/burger-button/BurgerButton";

@Element('feature-example-app')
@Template(template)
@UseComponent(BurgerButton)
export class FeatureExampleApp extends HTMLElement {}