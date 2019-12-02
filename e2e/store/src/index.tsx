import { st } from "../../../src/core";
import { component, state } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { appStore } from "./state";
import { actions } from "./actions";

@component
export class E2EStoreTest extends st.component implements ILifecycle {

  @state
  counter!: number;

  increment = () => {
    appStore.dispatch(actions.increment);
  }

  decrement = () => {
    appStore.dispatch(actions.decrement);
  }

  render() {
    return (
      <div>
        <h2>Store test</h2>

        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>

        <p>
          Counter: {this.counter}
        </p>
      </div>
    );
  }

  onAfterInitialRender() {

    // trivial map; TODO: @store
    appStore.subscribe(() => {
      const state = appStore.getState();
      this.counter = state.count;
    });
  }
}

st.render(<E2EStoreTest />);
