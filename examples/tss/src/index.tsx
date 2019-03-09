import {Route, Theme} from "@springtype/springtype-incubator-core";
import {TSStyledComponent} from "./tss/TSStyledComponent";
import {theme} from "./theme";
import {ROUTE_DEFAULT} from "../../todo-mvc/src/routes";

@Theme(theme)
@Route(ROUTE_DEFAULT, TSStyledComponent)
export class TSSExampleApp {}