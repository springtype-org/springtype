import template from "./SudokuComponent.tpl";
import style from "./SudokuComponent.style";
import {
    Attribute,
    Element,
    Field,
    Lifecycle,
    log,
    OnAttributeChange,
    ShadowDOM,
    Style,
    Template,
    OnFieldChange,
    warn,
} from "@springtype/core";

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

@Element('game-component')
@ShadowDOM
@Template(template)
@Style(style)
export class SudokuComponent extends HTMLElement implements Lifecycle {

    @Attribute
    type: ButtonType = ButtonType.A;

    @Attribute
    active: boolean = false;

    @Field
    protected gameState: GameState = {
        won: false,
        subState: {
            foo: false
        }
    };

    constructor() {

        super();

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

    @OnFieldChange("gameState")
    validateGameState(propName: string, newValue: any) {
        console.log('GameState fully pre-validated and mutated: ', propName, newValue);
    }

    @OnAttributeChange("type")
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
}