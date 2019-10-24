import { st } from "../../../core/st";

export interface ICustomElementRegistry {
  [customElementClassName: string]: typeof st.element;
}
