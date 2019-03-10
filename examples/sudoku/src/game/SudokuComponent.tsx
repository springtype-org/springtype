import template from "./SudokuComponent.tpl";
import style from "./SudokuComponent.style";
import {
    DetectFieldChanges,
    log,
    warn,
    WebComponent,
    WebComponentLifecycle,
    ChangeDetection
} from "@springtype/springtype-incubator-core";

interface Props {
    difficulty: number;
}

interface GameState {
    won: boolean;
}

@WebComponent({
    tag: 'game-component',
    shadow: true,
    template,
    style
})

// TODO: Remove with new state concept
@DetectFieldChanges("gameState", true, (instance: any, props) => {
    console.log('game state change');
}) // activate change detection just for this class field
export class SudokuComponent extends HTMLElement implements WebComponentLifecycle {

    constructor(

        // TODO: @
        public props: Props,
        // TODO: @DetectChanges
        protected gameState: GameState) {
        super();
    }

    // TODO: @OnChange("gameState")
    validate() {

        console.log('Executed because gameState changed!', this.gameState);
    }

    init() {

        this.gameState.won = true;

        setTimeout(() => {

            this.gameState.won = false;

        }, 500);

        log('SudokuComponent init');

        warn('asdasd', this);
    }
}