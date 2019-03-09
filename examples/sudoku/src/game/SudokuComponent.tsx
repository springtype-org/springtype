import template from "./SudokuComponent.tpl";
import style from "./SudokuComponent.style";
import { WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import {log} from "@springtype/springtype-incubator-core";

interface Props {
    difficulty: number;
}

@WebComponent({
    tag: 'game-component',
    shadow: true,
    template,
    style
})
export class SudokuComponent extends HTMLElement implements WebComponentLifecycle {

    constructor(public props: Props) {
        super();
    }

    init() {

        log('SudokuComponent init');
    }
}