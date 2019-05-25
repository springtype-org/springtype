import {Theme} from "@springtype/core";
import {TSStyledComponent} from "./tss/TSStyledComponent";
import {theme} from "./theme";
import {Route, ROUTE_BASE} from "@springtype/router";

@Theme(theme)
@Route(ROUTE_BASE, TSStyledComponent)
export class TSSExampleApp {}