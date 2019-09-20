import { st } from "../../../../../../src/core";
import { CustomElement, tsx } from "../../../../../../src/web";
import { HomePage } from "../../home/Home";

@CustomElement("firstpostpage-root")
export class FirstPostPage extends HTMLElement {
	static ROUTE = "/blog/firstpost/:id";

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
