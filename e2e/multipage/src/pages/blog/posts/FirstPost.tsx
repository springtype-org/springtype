import { st } from "../../../../../../src/core";
import { component } from "../../../../../../src/web/component";
import { tsx } from "../../../../../../src/web/vdom";
import { HomePage } from "../../home/Home";

@component()
export class FirstPostPage extends st.component {
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
