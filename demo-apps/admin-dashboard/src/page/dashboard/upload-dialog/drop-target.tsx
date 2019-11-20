import { st } from "../../../../../../src/core";
import { ref } from "../../../../../../src/core/ref";
import { component, attr } from "../../../../../../src/web/component";
import { tsx } from "../../../../../../src/web/vdom";
import { MwcLinearProgress, MwcIcon, MwcH5 } from "st-material";
import * as uploadDialogStyle from "./upload-dialog.tss.scss";
import { UploadDialog } from "./upload-dialog";
import * as dropTargetStyle from "./drop-target.tss.scss";

export interface IDropTargetAttrs {
  opener?: UploadDialog;
}

@component
export class DropTarget extends st.component<IDropTargetAttrs> {
  @ref
  progress: MwcLinearProgress;

  @ref
  previewVideo: HTMLVideoElement;

  @ref
  pleaseDragContainer: HTMLElement;

  @ref
  pleaseDropContainer: HTMLElement;

  @ref
  uploadingContainer: HTMLElement;

  @ref
  uploadSuccessfulContainer: HTMLElement;

  @attr
  opener: UploadDialog;

  // internal states
  isOver: boolean = false;
  isUploading: boolean = false;
  isUploadSuccessful: boolean = false;
  hasRendered: boolean = false;
  dropDisplayDelay: number = 2000;
  uploadResult: any;

  reset() {
    this.isOver = false;
    this.isUploading = false;
    this.isUploadSuccessful = false;
    this.previewVideo.src = undefined;
    this.progress.progress(0);
    this.opener.setState(UploadDialog.INITIAL);
    this.updateContainerVisibility();
  }

  hide() {
    this.el.style.display = "none";
  }

  show() {
    this.el.style.display = "block";
  }

  onDropFile = (evt: any) => {
    evt.stopPropagation();
    evt.preventDefault();

    const files = evt.dataTransfer.files;

    this.isUploading = true;
    this.updateContainerVisibility();

    for (let file of files) {
      const reader = new FileReader();

      reader.onprogress = (progressEvent: any) => {
        this.progress.progress(progressEvent.loaded / progressEvent.total);
      };

      reader.onload = (loadEvent: any) => {
        this.isUploadSuccessful = true;
        this.uploadResult = loadEvent.target.result;
        this.updateContainerVisibility();

        this.previewVideo.setAttribute("src", this.uploadResult);
        this.previewVideo.setAttribute("type", "video/mp4");

        this.opener.setState(UploadDialog.UPLOAD_SUCCESSFUL);
      };
      reader.readAsDataURL(file);
    }
  };

  onDragOver = (evt: any) => {
    evt.dataTransfer.dropEffect = "copy";

    evt.stopPropagation();
    evt.preventDefault();

    if (this.isOver) return;

    this.isOver = true;
    this.updateContainerVisibility();

    setTimeout(() => {
      this.updateContainerVisibility();
      this.isOver = false;
    }, this.dropDisplayDelay);
  };

  updateContainerVisibility = () => {
    if (this.isUploadSuccessful) {
      this.showUploadSuccessfulContainer();
      return;
    }

    if (this.isUploading) {
      this.showIsUploadingContainer();
      return;
    }

    if (this.isOver) {
      this.showIsDragOverContainer();
      return;
    }
    this.showPleaseDropVideoContainer();
  };

  render() {
    return (
      <div class={dropTargetStyle.container} onDrop={this.onDropFile} onDragOver={this.onDragOver}>
        <div class={uploadDialogStyle.dragTargetOver}>
          <div
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <div ref={{ pleaseDragContainer: this }}>
              <MwcIcon
                type="file_upload"
                style={{
                  fontSize: "15em",
                }}
              />
              <MwcH5>Bitte ein Video hier ablegen....</MwcH5>
            </div>

            <div ref={{ pleaseDropContainer: this }}>
              <MwcIcon
                type="file_download"
                style={{
                  fontSize: "15em",
                }}
              />
              <MwcH5>Bitte das Video jetzt loslassen....</MwcH5>
            </div>

            <div ref={{ uploadingContainer: this }}>
              <MwcH5>Wird hochgeladen...</MwcH5>

              <MwcLinearProgress ref={{ progress: this }} />
            </div>

            <div ref={{ uploadSuccessfulContainer: this }}>
              <MwcH5>Upload erfolgreich.</MwcH5>

              <video
                controls
                ref={{ previewVideo: this }}
                style={{
                  maxHeight: "250px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  onAfterInitialRender() {
    this.hasRendered = true;
    this.updateContainerVisibility();
  }

  showUploadSuccessfulContainer() {
    this.uploadSuccessfulContainer.style.display = "block";
    this.uploadingContainer.style.display = "none";
    this.pleaseDropContainer.style.display = "none";
    this.pleaseDragContainer.style.display = "none";
  }

  showIsUploadingContainer() {
    this.uploadSuccessfulContainer.style.display = "none";
    this.uploadingContainer.style.display = "block";
    this.pleaseDropContainer.style.display = "none";
    this.pleaseDragContainer.style.display = "none";
  }

  showIsDragOverContainer() {
    this.uploadSuccessfulContainer.style.display = "none";
    this.uploadingContainer.style.display = "none";
    this.pleaseDropContainer.style.display = "block";
    this.pleaseDragContainer.style.display = "none";
  }

  showPleaseDropVideoContainer() {
    this.uploadSuccessfulContainer.style.display = "none";
    this.uploadingContainer.style.display = "none";
    this.pleaseDropContainer.style.display = "none";
    this.pleaseDragContainer.style.display = "block";
  }
}
