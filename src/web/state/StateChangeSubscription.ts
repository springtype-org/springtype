import { st } from "../../core";
import { IStateChangeSubscription } from "./interface/IStateChangeSubscription";

export class StateChangeSubscription implements IStateChangeSubscription {
	constructor(public path: string, public subscriberFunction: Function) {}

	unsubscribe = (): void => {
		st.state.unsubscribe(this.path, this.subscriberFunction);
	};
}
