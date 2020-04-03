import { st } from "../../../core";

export const style = (name: string, definitions: string) => {

  const styleIdent = '$' + name;

  // local cache
  let style: HTMLStyleElement = (document.head as any)[styleIdent];

  // replace/update style
  if (!style) {

    // add
    style = document.createElement('style');
    document.head.appendChild(style);

    style.type = 'text/css';
    setStyle(style, definitions);

    // local cache
    (document.head as any)[styleIdent] = style;
  } else {
    setStyle(style, definitions);
  }
  return style;
};

const setStyle = (style: HTMLStyleElement, definitions: string) => {
  if (style.childNodes[0]) {
    style.removeChild(style.childNodes[0]);
  }
  style.appendChild(document.createTextNode(definitions));
};

st.style = style;
