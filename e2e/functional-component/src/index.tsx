import { st } from "../../../src/core";
import { component, Component, render } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";

// define a functional custom element
const E2EClock = component((scope: Component) => {
  // defined at construction time
  const updateUnixTime = () => scope.setAttribute("now", Date.now());

  // render fn returned, auto-called on doRender() when attribute changes (setAttribute)
  return () => (
    <div unwrap>
      <button onClick={updateUnixTime}>Show time</button>
      <E2ETimeDisplay>{scope.getAttribute("now")}</E2ETimeDisplay>
    </div>
  );
});

// simplified functional element, just renders what comes in
const E2ETimeDisplay = component(
  render((component: Component) => {
    return <div>{component.renderChildren()}</div>;
  }),
);

// append element to <body> (as root app element)
st.render(<E2EClock />);
