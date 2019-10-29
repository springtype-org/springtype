import { st } from "../../../core/st";

export interface IComponentRegistry {
  [componentClassName: string]: typeof st.component;
}
