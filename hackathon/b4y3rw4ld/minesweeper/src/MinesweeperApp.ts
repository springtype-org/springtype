import {WebComponent} from "../../../../src/package/html";
import template from "./MinesweeperApp.tpl";
import {FieldProp} from "./components/field/FieldComponent";
import {Randomizer} from "../../../../src/package/lang";
import {FieldModel} from "./models/FieldModel";

@WebComponent({
    tag: 'sw-app',
    template
})
export class MinesweeperApp extends HTMLElement {
    public matrixDimension: [number, number] = [2, 2];
    public mineMatrix: Array<FieldProp[]> = [];
    constructor() {
        super();
        const xLength = this.matrixDimension[0];
        const yLength = this.matrixDimension[1];
        const values = Randomizer.generateNumbers(0, 1,xLength*yLength);
console.error(values);
        for (let x = 0; x < xLength; x++) {
            const mineRow: FieldProp[] = [];
            for (let y = 0; y < yLength; y++) {
                mineRow.push({
                    field: this.getRandomField(!!values[x*xLength +y]),
                    open: false
                });
                console.error(values[x*xLength +y])
            }

            this.mineMatrix.push(mineRow);
        }
    }

    getRandomField(value: boolean ): FieldModel {
        return {
            bomb: value,
            flag: false
        }
    }


}