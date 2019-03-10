import {Route, AppTheme} from "@springtype/springtype-incubator-core";
import {TSStyledComponent} from "./tss/TSStyledComponent";
import {theme} from "./theme";
import {ROUTE_BASE} from "../../todo-mvc/src/routes";

@AppTheme(theme)
@Route(ROUTE_BASE, TSStyledComponent)
export class TSSExampleApp {}