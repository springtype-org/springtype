import { st } from "../../../../src/core";
import { component } from "../../../../src/web/component";
import { tsx } from "../../../../src/web/vdom";

@component
export class AboutPage extends st.component {
  render() {
  return <div>About, name: {st.router.match.params.name}</div>;
  }
}
