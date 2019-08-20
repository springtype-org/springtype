import {Component, InjectionStrategy} from "../../di";
import {Lifecycle} from "./interface/Lifecycle";

@Component({injectionStrategy: InjectionStrategy.FACTORY})
export class ActiveLifecycle {
    public context: Lifecycle;

    doFlow(): void {
        this.context.doFlow();
    }

    doConnect(): void {
        this.context.doConnect();
    }

    doRender(){
        this.context.render();
    }

    onInject(context: Lifecycle) {
        this.context = context
    }
}