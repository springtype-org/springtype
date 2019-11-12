import { st } from "../../../../../../dist/core";
import { component } from "../../../../../../dist/web/component";
import { tsx } from "../../../../../../dist/web/vdom";
import { HomePage } from "../../home/Home";

@component()
export class FirstPostPage extends st.component {
	static ROUTE = "#/blog/firstpost/:id/";

	render() {
		return (
			<div>
				FirstPostPage, id: {st.router.match.params.id}
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
