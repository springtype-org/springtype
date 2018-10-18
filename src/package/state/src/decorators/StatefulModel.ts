import {Component} from "../../../di";

export interface IStatefulModel<SM> {
    onInitialState(): SM;
    state?: SM;
}

export function StatefulModel(target: any): any {

    const target2 = <any> Component(target);

    const stateModel = new target2();

    console.log('stateModel', stateModel);

    return target2;
}