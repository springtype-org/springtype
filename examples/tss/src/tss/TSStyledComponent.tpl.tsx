import {TSStyledComponent} from "./TSStyledComponent";
import {ActiveRenderer} from '@springtype/springtype-incubator-core';

export default (view: TSStyledComponent) =>
    <div>
        Huh! {Date.now()}
        <a href="#" onclick={view.onClick}>WOOOHOOO!</a>
    </div>

