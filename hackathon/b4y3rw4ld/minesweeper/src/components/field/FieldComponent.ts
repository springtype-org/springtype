import {WebComponent, WebComponentLifecycle} from "../../../../../../src/package/html";
import "./FieldComponent.scss"
import template from "./FieldComponent.tpl"

export interface Neighbors {
    all: number[]
    check: number[]
}

declare var Window: any;

export interface FieldProp {
    open: boolean,
    bomb: boolean;
    flag: boolean;
    showBomb: boolean;
    amountMines: number;
    neighbors: Neighbors;
    position: number;
}

@WebComponent({
    tag: 'sw-field',
    template
})

export class FieldComponent extends HTMLElement implements WebComponentLifecycle {
    static fieldComponent: FieldComponent[] = [];

    constructor(public props: FieldProp) {
        super()
    }


    init(): void {
        FieldComponent.fieldComponent[this.props.position] = this;
        Window.cmp = FieldComponent.fieldComponent;
    }

    static openFields = (props: FieldProp, checked: number[] = [], level: number = 0): boolean => {

        const isSmall = props.amountMines <= 1;
        const checkNeighbors = [...(isSmall ? props.neighbors.all : props.neighbors.check), props.position]
            .map((pos) => FieldComponent.fieldComponent[pos])
            .filter(cmp => !cmp.props.bomb)
        ;
        for (const cmp of checkNeighbors.filter(cmp => !cmp.props.open)) {
            if (FieldComponent.checkFailed(cmp.props)) {
                return false
            }
            cmp.props.open = true;
            if (checked.indexOf(cmp.props.position) == -1 && cmp.props.amountMines <= 1 || level == 0) {
                checked.push(cmp.props.position);

                FieldComponent.openFields(cmp.props, checked, level + 1)
            }
        }
        return true;
    };

    static checkFailed = (props: FieldProp): boolean => {
        const loose = props.bomb || props.flag;
        if (loose) {
            FieldComponent.fieldComponent.forEach(cmp => cmp.props.showBomb = true);
        }

        return loose;
    };

    getColor = (num: number): string => {
        switch (num) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            case 4:
                return 'four';
            case 5:
                return 'five';
            case 6:
                return 'six';
            case 7:
                return 'seven';
            case 8:
                return 'eight';
            case 0:
            default:
                return '';
        }
    }
}