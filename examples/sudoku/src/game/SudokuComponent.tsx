import template from "./SudokuComponent.tpl";
import style from "./SudokuComponent.style";
import {
    DetectFieldChanges,
    log,
    warn,
    WebComponent,
    WebComponentLifecycle,
} from "@springtype/springtype-incubator-core";

interface Props {
    difficulty: number;
}

interface GameState {
    won: boolean;
}

enum ButtonType {
    A = "A",
    B = "B"
}

@WebComponent({
    tag: 'game-component',
    shadow: true,
    template,
    style
})
// TODO: Remove with new state concept
@DetectFieldChanges("gameState", true, (instance: any, props) => {
    console.log('game state change', instance, props);
}, (instance, props, value) => {

    if (typeof value !== 'boolean') {
        return false;
    }

    console.log('before ', value);
    return true;
}) // activate change detection just for this class field
export class SudokuComponent extends HTMLElement implements WebComponentLifecycle {

    // TODO: @Attribute
    type: ButtonType = ButtonType.A;

    constructor(

        // TODO: @RenderOnChange
        public props: Props,
        // TODO: @DetectChanges
        protected gameState: GameState) {
        super();
    }

    // TODO: @OnAttributeChange("lol")
    // TODO: @OnFieldChange("gameState")
    // TODO: @Buffer(500)
    // TODO: @Delay()
    // TODO: @Throttle()
    // TODO: @Memorize
    validate() {

        console.log('Executed because gameState changed!', this.gameState);
    }

    init() {

        this.gameState.won = "true" as any;

        setTimeout(() => {

            this.gameState.won = false;
            this.gameState.won = false;
            this.gameState.won = false;

        }, 500);

        log('SudokuComponent init');

        warn('asdasd', this);
    }
}