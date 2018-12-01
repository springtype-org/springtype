import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html";
import template from "./MinesweeperApp.tpl";
import {FieldProp, Neighbors} from "./components/field/FieldComponent";
import {Randomizer} from "../../../../src/package/lang";

declare var Window: any;

@WebComponent({
    tag: 'sw-app',
    template
})
export class MinesweeperApp extends HTMLElement implements WebComponentLifecycle {
    public matrixDimension: [number, number] = [30, 30];
    public mineMatrix: Array<FieldProp[]> = [];
    static mineArray: FieldProp[] = [];

    constructor() {
        super();
    }


    buildField(value: boolean) {
        return {
            bomb: value,
            flag: false,
            open: false,
            showBomb: false,
        }
    }

    getMineAmount(neighbors: number[], values: number[]): number {
        return neighbors.map((position) => values[position])
            .reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    getNeighbors(position: number, total: number): Neighbors {
        const xLength = this.matrixDimension[1];
        let positionRowBefore = position - xLength;
        let positionRowAfter = position + xLength;

        const rowPosition = position % xLength;

        const hasLeft = rowPosition != 0;
        const hasRight = rowPosition != xLength - 1;
        let positions: number[] = [positionRowBefore, positionRowAfter];
        if (hasLeft) {
            positions.push(position - 1);
        }

        if (hasRight) {
            positions.push(position + 1);
        }
        const checkPositions: number[] = [...positions];
        if (hasLeft) {
            positions.push(positionRowBefore - 1);
            positions.push(positionRowAfter - 1);
        }

        if (hasRight) {
            positions.push(positionRowBefore + 1);
            positions.push(positionRowAfter + 1);
        }
        const filterNeighbors = (num: number) => num > -1 && total > num;

        return {
            all: positions.filter(filterNeighbors),
            check: checkPositions.filter(filterNeighbors)
        }

    }

    init(): void {

        const yLength = this.matrixDimension[0];
        const xLength = this.matrixDimension[1];
        const total = yLength * xLength;
        const loaded: number[] = JSON.parse(localStorage.getItem("values")||"[]");
        const values = loaded.length > 0 ? loaded :  Randomizer.generateNumbers(0, 3, total).map(num => num > 0 ? 0 : 1);
        localStorage.setItem("values",JSON.stringify(values));
        for (let y = 0; y < yLength; y++) {
            const rowLength = y * xLength;
            const mineRow: FieldProp[] = [];
            for (let x = 0; x < xLength; x++) {
                const position = rowLength + x;
                const neighbors: Neighbors = this.getNeighbors(position, total);
                const fieldProps: FieldProp = {
                    ...this.buildField(!!values[position]),
                    amountMines: this.getMineAmount(neighbors.all, values),
                    neighbors: this.getNeighbors(position, total),
                    position: position
                };
                MinesweeperApp.mineArray.push(fieldProps);
                mineRow.push(fieldProps);
            }
            this.mineMatrix.push(mineRow);
        }
        Window.props = MinesweeperApp.mineArray;
    }

}