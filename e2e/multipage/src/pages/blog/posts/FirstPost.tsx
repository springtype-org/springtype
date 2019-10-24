import { st } from "../../../../../../src/core";
import { customElement } from "../../../../../../src/web/customelement";
import { tsx } from "../../../../../../src/web/vdom";
import { HomePage } from "../../home/Home";

@customElement()
export class FirstPostPage extends st.element {
	static ROUTE = "/blog/firstpost/:id/";

	render() {
		return (
			<div>
				FirstPostPage, id: {st.router.getParams().id}
				<br />
				<a
					href="javascript:void(0)"
					onClick={() => {
						st.router.navigate(HomePage.ROUTE);
					}}
				>
					Back Home
				</a>
			</div>
		);
	}
}
