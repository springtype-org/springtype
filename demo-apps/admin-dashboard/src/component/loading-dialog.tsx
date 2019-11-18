import { st } from "springtype/core";
import { ref } from "springtype/core/ref";
import { component } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { MwcDialog, MwcButton } from "st-material";

@component
export class LoadingDialog extends st.component {
  @ref
  dialog: MwcDialog;

  open() {
    console.log("open dialog", this.dialog);
    this.dialog.open();
  }

  close = () => {
    this.dialog.close();
  };

  render() {
    return (
      <MwcDialog ref={{ dialog: this }}>
        <template slot={MwcDialog.SLOT_NAME_CONTENT}>Content</template>
        <template slot={MwcDialog.SLOT_NAME_BUTTONS}>
          <MwcButton
            style={{
              visibility: "hidden",
            }}
          ></MwcButton>
        </template>
      </MwcDialog>
    );
  }

  onAfterRender() {
    console.log("Loading dialog", this);
  }
}
