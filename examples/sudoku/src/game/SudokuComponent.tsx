import template from "./SudokuComponent.tpl";
import style from "./SudokuComponent.style";
import {Logger, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";

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

    constructor(public props: Props,
                protected logger: Logger) {
        super();
    }

    init() {

        this.logger.log('SudokuComponent init');

        this.logger.warn('asdasd', this);
    }
}