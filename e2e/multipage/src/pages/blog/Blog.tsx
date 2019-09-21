import { st } from "../../../../../src/core";
import { CustomElement, tsx } from "../../../../../src/web";
import { SpringElement } from "../../../../../src/web/customelement/SpringElement";
import { HomePage } from "../home/Home";
import { FirstPostPage } from "./posts/FirstPost";

@CustomElement("blogpage-root")
export class BlogPage extends SpringElement {
	static ROUTE = "/blog";

	nagivateHome = () => {
		st.router.navigate(HomePage.ROUTE);
	};

	render() {
		return (
			<div>
				BlogPage
				<br />
				<a href="javascript:void(0)" onClick={this.nagivateHome}>
					Back Home
				</a>
				<br />
				<a
					href="javascript:void(0)"
					onClick={() => {
						st.router.navigate(FirstPostPage.ROUTE, {
							id: 5
						});
					}}
				>
					To AffeHase
				</a>
			</div>
		);
	}
}
