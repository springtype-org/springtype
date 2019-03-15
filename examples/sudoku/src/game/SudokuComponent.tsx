import template from "./SudokuComponent.tpl";
import style from "./SudokuComponent.style";
import {
    log,
    warn,
    WebComponent,
    WebComponentLifecycle,
    Attribute, OnAttributeSet, DetectChanges, Style,
} from "@springtype/springtype-incubator-core";
import {OnFieldChange} from "../../../../src/package/core";

interface Props {
    difficulty: number;
}

interface GameState {
    won: boolean;
    subState: {
        foo: boolean;
    }
}

enum ButtonType {
    A = "A",
    B = "B"
}

@WebComponent({
    tag: 'game-component',
    shadow: true,
    template
})
@Style(style)
export class SudokuComponent extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    type: ButtonType = ButtonType.A;

    @Attribute
    active: boolean = false;

    @DetectChanges
    protected gameState: GameState = {
        won: false,
        subState: {
            foo: false
        }
    };

    @OnFieldChange("gameState")
    validateGameState(propName: string, newValue: any) {
        console.log('GameState fully pre-validated and mutated: ', propName, newValue);
    }

    @OnAttributeSet("type")
    onTypeChange() {
        console.log('onTypeChange', this.type);
    }

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
            this.gameState.won = true;
            this.gameState.subState = {
                foo: true
            };

            // simulate external attribute change
            this.setAttribute("type", "L");

            console.log('type after external mutation', this.type, this.getAttribute("type"));

            this.type = "??" as any;

        }, 500);

        log('SudokuComponent init');

        warn('asdasd', this);
    }
}