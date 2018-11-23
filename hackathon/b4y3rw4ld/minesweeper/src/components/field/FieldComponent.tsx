import {WebComponent, WebComponentLifecycle} from "../../../../../../src/package/html";
import {FieldModel} from "../../models/FieldModel";
import "./FieldComponent.scss"

export interface FieldProp {
    open: boolean
    field: FieldModel
}

@WebComponent({
    tag: 'sw-field'
})
export class FieldComponent extends HTMLElement implements WebComponentLifecycle {
    constructor(public props: FieldProp) {
        super()
    }

    render() {
        const displayValue = this.props.field.bomb;
        return (
            <div>
                {displayValue}
            </div>
        );
    }

    init(): void {

    }
}