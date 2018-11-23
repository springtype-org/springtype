import {MinesweeperApp} from "./MinesweeperApp";
import "./MinesweeperApp.scss"
import {FieldProp} from "./components/field/FieldComponent"
import "./components/field/FieldComponent"

export default (view: MinesweeperApp) => {
    const items = view.mineMatrix
        .map((fields: FieldProp[]) => <div class="box">
                <div class="row">{fields
                    .map((field: FieldProp) =>
                        <sw-field class="item" props={field}/>
                    )}</div>

            </div>
        );
    return (<div>
        {items}
    </div>);
}
