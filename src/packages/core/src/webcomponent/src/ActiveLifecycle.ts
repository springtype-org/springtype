import {Component, InjectionStrategy,DefaultInjectionStrategy} from "../../di";
import {Lifecycle} from "./interface/Lifecycle";

@Component
@DefaultInjectionStrategy(InjectionStrategy.FACTORY)
export class ActiveLifecycle implements Lifecycle {
    context!: Lifecycle;

    doFlow(): void {
        this.context.doFlow();
    }


    onInject(context: Lifecycle) {
        this.context = context
    }
}