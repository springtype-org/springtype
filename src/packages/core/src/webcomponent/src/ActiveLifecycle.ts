import {Component, InjectionStrategy, Injectable} from "../../di";
import {Lifecycle} from "./interface/Lifecycle";

@Component({injectionStrategy: InjectionStrategy.FACTORY})
export class ActiveLifecycle implements Injectable {
    public context: Lifecycle;

    doFlow(): void {
        this.context.doFlow!();
    }

    doConnect(): void {
        this.context.doConnect!();
    }

    doRender(): void {
        this.context.render!();
    }

    onInject(context: Lifecycle) {
        this.context = context
    }
}