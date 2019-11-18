import { st } from "springtype/core";
import { component, attr } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { MwcSubtitle1 } from "st-material";
import * as errorMessageStyle from "./error-message.tss.scss";

@component
export class ErrorMessage extends st.component {
  @attr
  message: string;

  onAfterRender() {
    this.elStyle = {
      display: "block",
      backgroundColor: "#cc627522",
      color: "#cc0000",
      borderRadius: "10px",
      marginBottom: this.message ? "2em" : "0",
      marginLeft: "2em",
      marginRight: "2em",
    };
  }

  render() {
    return this.message ? (
      <MwcSubtitle1 class={errorMessageStyle.errorMessage}>{this.message}</MwcSubtitle1>
    ) : (
      <fragment />
    );
  }
}
