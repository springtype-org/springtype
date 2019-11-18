import { st } from "../../../../src/core";
import { component } from "../../../../src/web/component";
import { ILifecycle } from "../../../../src/web/component/interface/ilifecycle";
import { tsx } from "../../../../src/web/vdom";

@component
export class UploadPage extends st.component implements ILifecycle {
  static ROUTE = "#/upload";

  render() {
    return <div>Upload</div>;
  }
}
