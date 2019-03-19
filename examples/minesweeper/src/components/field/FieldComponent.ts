import {
    Attribute,
    Field,
    OnAttributeChange, OnFieldChange, Template,
    Element,
    WebComponentLifecycle
} from "@springtype/springtype-incubator-core";
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
    [x: string]: any;
}

@Element('sw-field')
@Template(template)
export class FieldComponent extends HTMLElement implements WebComponentLifecycle {

    static fieldComponents: FieldComponent[] = [];

    @Attribute
    field: FieldProp;

    @OnAttributeChange("field")
    onFieldChanged() {
        if (this.field) {
            FieldComponent.fieldComponents[this.field.position] = this;
            Window.cmp = FieldComponent.fieldComponents;
        }
    }

    static openFields = (props: FieldProp, checked: number[] = [], level: number = 0): boolean => {

        const isSmall = props.amountMines <= 1;
        const checkNeighbors = [...(isSmall ? props.neighbors.all : props.neighbors.check), props.position]
            .map((pos) => FieldComponent.fieldComponents[pos])
            .filter(cmp => {
                if (cmp) {
                    return !cmp.field.bomb;
                }
            });

        for (const cmp of checkNeighbors.filter(cmp => !cmp.field.open)) {
            if (FieldComponent.checkFailed(cmp.field)) {
                return false
            }
            cmp.field.open = true;
            if (checked.indexOf(cmp.field.position) == -1 && cmp.field.amountMines <= 1 || level == 0) {
                checked.push(cmp.field.position);

                FieldComponent.openFields(cmp.field, checked, level + 1)
            }

            // Need to set for the whole reference to change and trigger a reflow
            // TODO: Use ChangeDetector instead
            cmp.field = {...cmp.field};
        }

        return true;
    };

    static checkFailed = (props: FieldProp): boolean => {
        const loose = props.bomb || props.flag;
        if (loose) {
            FieldComponent.fieldComponents.forEach(cmp => {
                cmp.field.showBomb = true;

                // Need to set for the whole reference to change and trigger a reflow
                // TODO: Use ChangeDetector instead
                cmp.field = {...cmp.field};
            });
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