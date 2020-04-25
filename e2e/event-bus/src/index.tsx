import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { onMessage } from "../../../src/core/event-bus/decorator/on-message";

const SendMessageButton = component((scope: any) => {

  const onClick = () => {
    // publishing data on this topic
    st.sendMessage('newRandom', { value: Math.random() });
  };
  return () => <button onClick={onClick}>Send message "newRandom"</button>
});

@component
export class E2EBusTest extends st.component implements ILifecycle {

  data: any = {};

  @onMessage('newRandom')
  handleNewRandomMessage(data: any) {
    this.data = data;
    this.rerender();
  }

  containerA() {
    return <fragment>
      <ComponentA />
      <br />
      <ComponentB />
    </fragment>
  }

  containerB() {
    return <fragment>
      <ComponentA />
      <br />
      <ComponentB />
    </fragment>
  }

  render() {
    return (
      <div unwrap>
        <SendMessageButton />
        <br />
        newRandom most recent data message: {this.data.value}

        <h2>onMessage/sendMessage variant:</h2>

        {/* flip-flop rendering to test garbage collection of sub-instances with messaging*/}
        {this.data.value && this.data.value > 0.5 ? this.containerA() : this.containerB()}

      </div>
    );
  }
}

const TOPIC_BUTTON_CLICK = "button:clicked";

@component
export class ComponentA extends st.component {

  constructor() {
    super();
    console.log('created new instance of ComponentA')
  }

  sendMessageOnClick = (event: Event) => {
    st.sendMessage(TOPIC_BUTTON_CLICK, 'Yes')
  };

  render() {
    return (
      <div unwrap>
        <button onclick={this.sendMessageOnClick}>Click here to send a message</button>
      </div>
    );
  }
}

@component
export class ComponentB extends st.component {

  buttonWasClicked: string = 'No';

  constructor() {
    super();
    console.log('created new instance of ComponentB')
  }

  onMessage(topic: string, value: any) {

    console.log('onMessage', topic, value, this)

    switch (topic) {
      case TOPIC_BUTTON_CLICK:
        console.log('onMessage BEFORE', topic, value, this)
        this.buttonWasClicked = value;
        this.rerender();
        console.log('onMessage AFTER', topic, value, this)
        break;
    }
  }

  render() {
    return (
      <div unwrap>
        Was button clicked? {this.buttonWasClicked}
      </div>
    );
  }
}

// Tells SpringType to render this component now
st.render(<E2EBusTest />);
