import { st } from "../../../../../../src/core";
import { ref } from "../../../../../../src/core/ref";
import { component, attr } from "../../../../../../src/web/component";
import { tsx } from "../../../../../../src/web/vdom";
import { MwcDialog, MwcButton } from "st-material";
import { DropTarget } from "./drop-target";
import { Store } from "../../../model/Store";
import { MetadataForm } from "./metadata-form";
import { DashboardPage } from "../dashboard";
import { videoContext, VIDEO_UPLOAD_CONTEXT } from "../../../config/context";

export interface IUploadDialogAttrs {
  opener: DashboardPage;
}

@component
export class UploadDialog extends st.component<IUploadDialogAttrs> {
  static UPLOAD_SUCCESSFUL = "UPLOAD_SUCCESSFUL";
  static ENTER_METADATA = "ENTER_METADATA";
  static INITIAL = "INITIAL";

  @ref
  dialog: MwcDialog;

  @ref
  dropTarget: DropTarget;

  @ref
  metaDataForm: MetadataForm;

  @ref
  saveButton: MwcButton;

  @ref
  nextButton: MwcButton;

  @attr
  opener: DashboardPage;

  hasRendered: boolean = false;
  currentState: string = UploadDialog.INITIAL;

  open() {
    this.dialog.open();
  }

  close = () => {
    this.dialog.close();
  };

  save = () => {
    const store = st.context<Store>(VIDEO_UPLOAD_CONTEXT, videoContext);

    store.videos.push({
      title: this.metaDataForm.title.value,
      description: this.metaDataForm.description.value,
      dataUrl: this.dropTarget.uploadResult,
    });
  };

  onSaveAndClose = () => {
    this.save();
    this.dropTarget.reset();
    this.close();
    this.opener.update();
  };

  onShowMetaDataForm = () => {
    this.setState(UploadDialog.ENTER_METADATA);
  };

  render() {

    console.log('dialog render')

    return (
      <MwcDialog ref={{ dialog: this }} title="Video hochladen">
        <template slot={MwcDialog.SLOT_NAME_CONTENT}>
          <DropTarget ref={{ dropTarget: this }} opener={this} />
          <MetadataForm ref={{ metaDataForm: this }} opener={this} />
        </template>
        <template slot={MwcDialog.SLOT_NAME_BUTTONS}>
          <MwcButton onClick={this.close} label="Abbrechen"></MwcButton>
          <MwcButton
            style={{ marginLeft: "1em" }}
            ref={{ nextButton: this }}
            onClick={this.onShowMetaDataForm}
            variant="raised"
            label="Weiter"
          />
          <MwcButton
            style={{ marginLeft: "1em" }}
            ref={{ saveButton: this }}
            onClick={this.onSaveAndClose}
            variant="raised"
            label="Speichern"
          />
        </template>
      </MwcDialog>
    );
  }

  setState(state: string) {
    this.currentState = state;
    this.updateVisibility();
  }

  onAfterRender() {
    this.hasRendered = true;
    this.setState(UploadDialog.INITIAL);
  }

  updateVisibility() {
    switch (this.currentState) {
      case UploadDialog.UPLOAD_SUCCESSFUL:
        this.nextButton.el.style.display = "block";
        break;
      case UploadDialog.ENTER_METADATA:
        this.dropTarget.hide();
        this.metaDataForm.show();
        this.nextButton.el.style.display = "none";
        this.saveButton.el.style.display = "block";
        break;
      case UploadDialog.INITIAL:
      default:
        this.dropTarget.show();
        this.metaDataForm.hide();
        this.saveButton.el.style.display = "none";
        this.nextButton.el.style.display = "none";
        break;
    }
  }
}
