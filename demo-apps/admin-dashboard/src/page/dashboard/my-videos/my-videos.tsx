import { st } from "../../../../../../src/core";
import { ref } from "../../../../../../src/core/ref";
import { component } from "../../../../../../src/web/component";
import { ILifecycle } from "../../../../../../src/web/component/interface/ilifecycle";
import { tsx } from "../../../../../../src/web/vdom";
import { MwcH5, MwcTab, MwcTabBar } from "st-material";
import { MyVideosTabs } from "./my-video-tab";

@component
export class MyVideosPage extends st.component implements ILifecycle {
  @ref
  tabBarRef: MwcTabBar;

  @ref
  tabsContentRef: MyVideosTabs;

  onAfterElCreate() {
    this.elStyle = {
      width: "100%",
      maxWidth: "760px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "50px",
      paddingTop: "0",
    };
  }

  render() {
    return (
      <fragment>
        <MwcH5>Meine Videos</MwcH5>

        <MwcTabBar ref={{ tabBarRef: this }}>
          <MwcTab icon="movie" active={true} label="Videos"></MwcTab>
          <MwcTab icon="movie_filter" label="Kanäle"></MwcTab>
          {/* <MwcTab icon="list" label="Übersicht" active={true}></MwcTab>
                    <MwcTab icon="playlist_play" label="Playlists"></MwcTab>
                    */}
        </MwcTabBar>
        <MyVideosTabs ref={{ tabsContentRef: this }} />
      </fragment>
    );
  }

  onAfterRender(): void {
    //@ts-ignore
    this.tabBarRef.mdcComponent.listen("MDCTabBar:activated", (evt: any) => {
      console.log("MDCTabBar:activated", evt, evt.detail.index);
      this.tabsContentRef.tabIndex = evt.detail.index;
    });
  }
}
