import {NotEmpty, Validate} from "../package/val";
import {Component} from "../package/di";

@Component()
export class Corrupt {

    @Validate
    public checkMe(@NotEmpty parameter1: any): void {
    }
}