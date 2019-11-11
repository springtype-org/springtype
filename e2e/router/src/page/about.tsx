import { st } from "../../../../dist/core";
import { component } from "../../../../dist/web/component";
import { tsx } from "../../../../dist/web/vdom";

@component()
export class AboutPage extends st.component {
  render() {
  return <div>About, name: {st.router.match.params.name}</div>;
  }
}
