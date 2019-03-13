import template from "./SudokuComponent.tpl";
import style from "./SudokuComponent.style";
import {
    DetectFieldChanges,
    log,
    warn,
    WebComponent,
    WebComponentLifecycle,
    Attribute, OnAttributeChange,
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
// TODO: Remove with new change detection concept
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

    @Attribute
    type: ButtonType = ButtonType.A;

    @Attribute
    active: boolean = false;

    constructor(

        // TODO: @DetectChanges
        protected gameState: GameState) {
        super();
    }

    @OnAttributeChange("type")
    onTypeChange() {
        console.log('onTypeChange', this.type);
    }

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

        console.log('default type', this.type);
        console.log('isActive', this.active);

        setTimeout(() => {

            //this.type = "C" as any;
            console.log('isActive', this.active);

            this.gameState.won = false;
            this.gameState.won = false;
            this.gameState.won = false;

            // simulate external attribute change
            this.setAttribute("type", "L");

            console.log('type after external mutation', this.type, this.getAttribute("type"));

            this.type = "??" as any;

        }, 500);

        log('SudokuComponent init');

        warn('asdasd', this);
    }

}