import {Component, InjectionStrategy} from "../../di";
import {Lifecycle} from "./interface/Lifecycle";

@Component({injectionStrategy: InjectionStrategy.FACTORY})
export class ActiveLifecycle implements Lifecycle {
    public context: Lifecycle;

    doFlow(): void {
        this.context.doFlow();
    }



    onInject(context: Lifecycle) {
        this.context = context
    }
}