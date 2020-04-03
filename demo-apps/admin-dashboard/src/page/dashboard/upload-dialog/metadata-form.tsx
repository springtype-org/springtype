import { st } from "../../../../../../src/core";
import { ref } from "../../../../../../src/core/ref";
import { component, attr } from "../../../../../../src/web/component";
import { tsx } from "../../../../../../src/web/vdom";
import { MwcIcon, MwcTextField, MwcTextArea } from "st-material";
import { UploadDialog } from "./upload-dialog";
import { MwcTextFieldVariant } from "st-material/component/mwc-text-field/mwc-text-field-variant";
import * as metaDataFormStyle from "./metadata-form.tss.scss";

export interface IMetadataFormAttrs {
  opener?: UploadDialog;
}

@component
export class MetadataForm extends st.component<IMetadataFormAttrs> {
  @attr
  opener: UploadDialog;

  @ref
  title: MwcTextField;

  @ref
  description: MwcTextArea;

  // internal states
  hasRendered: boolean = false;
  hide() {
    this.el.style.display = "none";
  }

  show() {
    this.el.style.display = "block";
  }


  render() {
    return (
      <div class={metaDataFormStyle.container}>
        <MwcTextField
          class={metaDataFormStyle.metaDataField}
          variant={MwcTextFieldVariant.OUTLINED}
          ref={{ title: this }}
          label="Titel"
        >
          <template slot={MwcTextField.SLOT_NAME_LEADING_ICON}>
            <MwcIcon type="videocam" class={"mdc-text-field__icon"} />
          </template>
        </MwcTextField>

        <MwcTextArea
          class={metaDataFormStyle.metaDataField}
          variant={MwcTextFieldVariant.OUTLINED}
          ref={{ description: this }}
          label="Beschreibung"
        ></MwcTextArea>
      </div>
    );
  }

  onAfterRender() {
    this.hasRendered = true;
  }
}
