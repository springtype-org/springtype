import { st } from "../../../src/core";
import { customElement, CustomHTMLElement, render } from "../../../src/web/customelement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import { tsx } from "../../../src/web/vdom";

if (process.env.NODE_ENV === "development") {
  customElementsHMRPolyfill;
}

interface Theme {
  primaryColor: string;
}

st.tss.setTheme({
  primaryColor: "red",
});

// define a functional custom element
customElement(
  "e2e-clock",
  (scope: CustomHTMLElement) => {
    // defined at construction time
    const updateUnixTime = () => scope.setAttribute("now", Date.now());

    // render fn returned, called on doRender()
    return () => {
      return (
        <div>
          <button onClick={updateUnixTime}>Show time</button>
          <e2e-time-display>{scope.getAttribute("now")}</e2e-time-display>
        </div>
      );
    };
  },
  // renderStyle fn
  (scope: CustomHTMLElement, theme: Theme) => ({
    button: {
      background: theme.primaryColor,
    },
  }),
);

// simplified functional element, just renders
customElement("e2e-time-display", render(() => <slot></slot>));

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "e2e-time-display": Partial<HTMLElement>;
    }
  }
}

// append element to <body> (as root app element)
st.dom.setRoot("e2e-clock");
