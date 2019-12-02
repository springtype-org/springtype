import { st } from "../../../src/core";
import { component, state } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { pubsub } from "../../../src/core/pubsub";

const PubButton = component((scope: any) => {

  const onClick = () => {
    // publishing data on this topic
    st.publish('newRandom', { value: Math.random() });
  };
  return () => <button onClick={onClick}>Publish on topic "newRandom"</button>
});

@component
export class E2EBusTest extends st.component implements ILifecycle {

  // view automatically re-renderes only because this
  // property is decorated as a @state :)
  @state
  data: any = {};

  onAfterInitialRender() {
    // subscribe for any message published using this topic
    st.subscribe('newRandom', (data: any) => {
      this.data = data;
    })
  }

  render() {
    return (
      <div unwrap>
        <PubButton />
        <br />
        newRandom most recent data message: {this.data.value}
      </div>
    );
  }
}

st.enable(pubsub);

// Tells SpringType to render this component now
st.render(<E2EBusTest />);
