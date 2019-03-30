import {Element, Template, UseElement} from "@springtype/springtype-incubator-core";
import template from "./FeatureExampleApp.tpl";
import {BurgerButton} from "../../burger-button/src/burger-button/BurgerButton";

@Element('feature-example-app')
@Template(template)
@UseElement(BurgerButton)
export class FeatureExampleApp extends HTMLElement {}