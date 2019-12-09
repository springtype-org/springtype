import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { store } from "../../../src/web/component/decorator/store";
import { appStore, actions } from "./store";

@component
export class E2EStoreTest extends st.component implements ILifecycle {

  @store('count')
  count!: number;

  increment = () => {
    st.getStore().dispatch(actions.increment);
  }

  decrement = () => {
    st.getStore().dispatch(actions.decrement);
  }

  render() {
    return (
      <div>
        <h2>Store test</h2>

        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>

        <p>
          Counter: {this.count}
        </p>
      </div>
    );
  }

  onStoreChange(name: string, value: any) {
    console.log('Store change', '@store("count") prop name', name, 'value', value, ' === ', this.count)
  }
}

st.setStore(appStore);

st.render(<E2EStoreTest />);
