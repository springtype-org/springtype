import { st } from "springtype/core";
import { ref } from "springtype/core/ref";
import { component, attr } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { MwcLinearProgressIndeterminate } from "st-material";
import * as loadingIndicatorStyle from "./loading-indicator.tss.scss";

@component
export class LoadingIndicator extends st.component {
  @attr
  open: boolean;

  onAfterElCreate() {
    this.elStyle = {
      display: "block",
      position: "fixed",
      width: "100%",
      height: "10px",
    };
  }

  render() {
    return this.open ? <MwcLinearProgressIndeterminate /> : <fragment />;
  }
}
