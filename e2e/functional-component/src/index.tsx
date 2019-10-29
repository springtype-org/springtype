import { st } from "../../../src/core";
import { component, Component, render } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";

interface Theme {
  primaryColor: string;
}

st.tss.setTheme({
  primaryColor: "red",
});

// define a functional custom element
const E2EClock = component(
  (scope: Component) => {
    // defined at construction time
    const updateUnixTime = () => scope.setAttribute("now", Date.now());

    const renderFn = () => (
      <div>
        <button onClick={updateUnixTime}>Show time</button>
        <E2ETimeDisplay>{scope.getAttribute("now")}</E2ETimeDisplay>
      </div>
    );

    // render fn returned, auto-called on doRender() when attribute changes (setAttribute)
    return renderFn;
  },
  // renderStyle fn
  (scope: Component, theme: Theme) => `button {
    background: ${theme.primaryColor};
  }`,
);

// simplified functional element, just renders what comes in
const E2ETimeDisplay = component(
  render(() => {
    return (
      <div>
        <slot></slot>
      </div>
    );
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      E2ETimeDisplay: Partial<HTMLElement>;
    }
  }
}

// append element to <body> (as root app element)
st.render(<E2EClock />);
