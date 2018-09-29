import {AbstractSubtractor} from "./AbstractSubtractor";
import {Component} from "../package/di";
import {NiceSubtractorMock} from "./mock/NiceSubtractorMock";

@Component({
    mockedBy: NiceSubtractorMock
})
export class NiceSubtractor extends AbstractSubtractor {

    subtract(a: number, b: number): number {

        console.log('nice!');

        return super.subtract(a, b);
    }
}