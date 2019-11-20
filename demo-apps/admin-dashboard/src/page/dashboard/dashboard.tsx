import { st } from "../../../../../src/core";
import { ref } from "../../../../../src/core/ref";
import { component, state } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface/ilifecycle";
import { tsx } from "../../../../../src/web/vdom";
import {
  MwcDrawer,
  MwcTopBar,
  MwcDrawerAppContent,
  MwcTypography,
  MwcDrawerHeader,
  MwcDrawerTitle,
  MwcDrawerSubtitle,
  MwcDrawerContent,
  MwcList,
  MwcListItem,
  MwcListItemIcon,
  MwcButton,
  MwcIcon,
} from "st-material";
import { MwcTopBarVariant } from "st-material/component/mwc-top-bar/mwc-top-bar-variant";
import { MyVideosPage } from "./my-videos/my-videos";
import { inject } from "../../../../../src/core/di";
import { LoginGuard } from "../../guard/login-guard";
import { LoginPage } from "../login/login";
import { UploadDialog } from "./upload-dialog/upload-dialog";
import { Store } from "../../model/Store";
import { videoContext, VIDEO_UPLOAD_CONTEXT } from "../../config/context";

@component
export class DashboardPage extends st.component implements ILifecycle {
  static ROUTE = "#/dashboard";

  @ref
  drawer!: MwcDrawer;

  @ref
  topBar!: MwcTopBar;

  @ref
  appContent!: MwcDrawerAppContent;

  @ref
  uploadDialog: UploadDialog;

  @inject(LoginGuard)
  loginGuard: LoginGuard;

  @state
  component: any;

  drawerAndTopBarFixed: boolean = true;

  onLogoutClick = () => {
    st.router.navigate(LoginPage.ROUTE);
  };

  onUploadVideoClick = () => {
    this.uploadDialog.open();
  };

  update() {

    const store = st.context<Store>(VIDEO_UPLOAD_CONTEXT, videoContext);

    console.log('updated data, upate view!', store.videos);
  }

  render() {
    console.log('dashboard render()')
    return (
      <MwcTypography>

        <UploadDialog ref={{ uploadDialog: this }} opener={this} />

        <MwcDrawer ref={{ drawer: this }} variant={"modal"} fixed={this.drawerAndTopBarFixed}>
          <MwcDrawerHeader>
            {/*
              // @ts-ignore */}
            <center
              style={{
                paddingTop: "20px",
              }}
            >
              <MwcDrawerTitle>
                COMPANY<br /><br />
              </MwcDrawerTitle>
              <MwcDrawerSubtitle>Backend</MwcDrawerSubtitle>
              {/*
              // @ts-ignore */}
            </center>
          </MwcDrawerHeader>
          <MwcDrawerContent>
            <MwcList>
              <MwcListItem
                onClick={() => {
                  this.loadMyVideos();
                  this.drawer.close();
                }}
                autoWrapText={false}
                activated={true}
              >
                <MwcListItemIcon type="vertical_split" />
                Meine Videos
              </MwcListItem>
            </MwcList>
          </MwcDrawerContent>
        </MwcDrawer>

        <MwcDrawerAppContent fixed={false}>
          <MwcTopBar
            ref={{ topBar: this }}
            title="Dashboard"
            variant={MwcTopBarVariant.SHORT}
            fixed={this.drawerAndTopBarFixed}
          >
            <template slot={MwcTopBar.SLOT_NAME_TRAILING_ICONS}>
              <MwcButton onClick={this.onUploadVideoClick}>
                <MwcIcon type="file_upload" class="mdc-top-app-bar__action-item" />
              </MwcButton>
              <MwcButton onClick={this.onLogoutClick}>
                <MwcIcon type="exit_to_app" class="mdc-top-app-bar__action-item" />
              </MwcButton>
            </template>
          </MwcTopBar>
          <MwcDrawerAppContent fixed={this.drawerAndTopBarFixed} ref={{ appContent: this }}>
            {this.component}
          </MwcDrawerAppContent>
        </MwcDrawerAppContent>
      </MwcTypography>
    );
  }

  loadMyVideos() {
    this.component = this.loginGuard.guard(<MyVideosPage />);
  }

  onAfterRender() {

    console.log('onAfterRender')

    this.topBar.mdcComponent.setScrollTarget(this.appContent.contentRef);
    this.topBar.mdcComponent.listen("MDCTopAppBar:nav", () => {
      console.log("nav happened!");
      this.drawer.toggle();
    });

    if (!this.component) {
      this.loadMyVideos();
    }
  }
}
