import {Theme} from "@springtype/springtype-incubator-core";
import {TSStyledComponent} from "./tss/TSStyledComponent";
import {theme} from "./theme";
import {Route, ROUTE_BASE} from "@springtype/springtype-incubator-router";

@Theme(theme)
@Route(ROUTE_BASE, TSStyledComponent)
export class TSSExampleApp {}