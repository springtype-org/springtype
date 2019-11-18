import { st } from "../../../../../../../src/core";
import { ref } from "../../../../../../../src/core/ref";
import { component } from "../../../../../../../src/web/component";
import { ILifecycle } from "../../../../../../../src/web/component/interface";
import { tsx } from "../../../../../../../src/web/vdom";
import {
  MwcDialog,
  MwcList,
  MwcListItem,
  MwcListItemIcon,
  MwcListItemText,
  MwcListItemTextPrimary,
  MwcListItemTextSecondary,
} from "st-material";
import { Store } from "../../../../model/Store";
import { videoContext, VIDEO_UPLOAD_CONTEXT } from "../../../../config/context";

@component
export class MyVideosTabOverview extends st.component implements ILifecycle {
  @ref
  dialogRef: MwcDialog;

  @ref
  videoRef: HTMLVideoElement;

  render() {
    const store = st.context<Store>(VIDEO_UPLOAD_CONTEXT, videoContext);
    return (
      <div style={{ marginTop: "15px" }}>
        <MwcDialog ref={{ dialogRef: this }}>
          <template slot={MwcDialog.SLOT_NAME_CONTENT}>
            <video
              controls
              style={{
                maxHeight: "300px",
                maxWidth: "100%",
              }}
              ref={{ videoRef: this }}
            />
          </template>
        </MwcDialog>
        <MwcList avatarList={true} twoLine={true} singleSelection={true}>
          {store.videos.map(video => (
            <MwcListItem autoWrapText={false}>
              <MwcListItemIcon type="movie" graphic={true} />
              <MwcListItemText>
                <MwcListItemTextPrimary>{video.title}</MwcListItemTextPrimary>
                <MwcListItemTextSecondary>{video.description}</MwcListItemTextSecondary>
              </MwcListItemText>

              <MwcListItemIcon
                onClick={() => {
                  this.dialogRef.title = video.title;
                  this.videoRef.src = video.dataUrl;
                  this.dialogRef.open();
                }}
                type="play_circle_filled"
                meta={true}
              />
            </MwcListItem>
          ))}
        </MwcList>
      </div>
    );
  }
}
