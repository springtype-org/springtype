import * as R from "@rematch/core";
import {rematch} from "@rematch/core";
import init = rematch.init;
import {Component} from "../../di";

@Component
export class StateStore {

    init(initConfig: R.InitConfig = {}): R.RematchStore {
        return init(initConfig);
    }
}