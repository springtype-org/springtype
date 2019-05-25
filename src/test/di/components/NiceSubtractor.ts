import {AbstractSubtractor} from "../helper/AbstractSubtractor";
import {Component} from "@springtype/core";
import {NiceSubtractorMock} from "../mock/NiceSubtractorMock";

@Component({
    mockedBy: NiceSubtractorMock
})
export class NiceSubtractor extends AbstractSubtractor {

    subtract(a: number, b: number): number {

        console.log('nice!');

        return super.subtract(a, b);
    }
}