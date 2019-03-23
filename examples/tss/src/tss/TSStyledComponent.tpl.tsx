import {TSStyledComponent} from "./TSStyledComponent";

export default (view: TSStyledComponent) =>
    <div>
        Huh! {Date.now()}
        <a href="#" onclick={view.onClick}>WOOOHOOO!</a>
    </div>

