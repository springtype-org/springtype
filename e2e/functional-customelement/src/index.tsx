import { st } from "../../../src/core";
import { customElement, CustomHTMLElement, render } from "../../../src/web/customelement";
import { tsx } from "../../../src/web/vdom";

interface Theme {
  primaryColor: string;
}

st.tss.setTheme({
  primaryColor: "red",
});

// define a functional custom element
const E2EClock = customElement(
  (scope: CustomHTMLElement) => {
    // defined at construction time
    const updateUnixTime = () => scope.setAttribute("now", Date.now());

    // render fn returned, auto-called on doRender() when attribute changes (setAttribute)
    return () => (
      <div>
        <button onClick={updateUnixTime}>Show time</button>
        <E2ETimeDisplay>{scope.getAttribute("now")}</E2ETimeDisplay>
      </div>
    );
  },
  // renderStyle fn
  (scope: CustomHTMLElement, theme: Theme) => `button {
    background: ${theme.primaryColor};
  }`,
);

// simplified functional element, just renders what comes in
const E2ETimeDisplay = customElement(
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
