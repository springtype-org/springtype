import {Template, Element} from "@springtype/springtype-incubator-core";
import template from "./FeatureExampleApp.tpl";
import {UseElement} from "../../../src/package/core";
import {BurgerButton} from "../../burger-button/src/burger-button/BurgerButton";

@Element('feature-example-app')
@Template(template)
@UseElement(BurgerButton)
export class FeatureExampleApp extends HTMLElement {}