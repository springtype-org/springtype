import { st } from "../../../src/core";
import { customElement, CustomHTMLElement } from "../../../src/web/customelement";
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
  "e2e-unix-clock",
  /* tsx fn */ (scope: CustomHTMLElement) => {
    const updateUnixTime = () => scope.setAttribute("now", Date.now());
    return (
      <div>
        <button onClick={updateUnixTime}>Show UNIX time</button>: {scope.getAttribute("now")}
      </div>
    );
  },
  /* tss fn */ (scope: CustomHTMLElement, theme: Theme) => ({
    button: {
      background: theme.primaryColor,
    },
  }),
);

// append element to <body> (as root app element)
st.dom.setRoot("e2e-unix-clock");
