import {MinesweeperApp} from "./MinesweeperApp";
import "./MinesweeperApp.scss"
import {FieldComponent, FieldProp} from "./components/field/FieldComponent"

export default (view: MinesweeperApp) => {
    const items = view.mineMatrix
        .map((fields: FieldProp[]) => {
                return (
                    <div class="row-fields">
                        {
                            fields.map((field: FieldProp) =>
                                <sw-field props={field}/>
                            )
                        }
                    </div>
                )
            }
        );
    return (
        <div class="container">
            <div class="row">
                <div class="col-lg-12 ">
                    <div class="box col-center-block">
                        {items}
                    </div>
                </div>
            </div>
        </div>);
}
