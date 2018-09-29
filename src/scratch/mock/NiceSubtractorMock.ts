import {Component} from "../../package/di";
import {AbstractSubtractor} from "../AbstractSubtractor";

@Component
export class NiceSubtractorMock extends AbstractSubtractor {

    subtract(a: number, b: number): number {

        console.log('nice test!');

        return super.subtract(a, b);
    }
}