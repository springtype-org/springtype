import { st } from "../../../../../src/core";
import { CustomElement, Router, tsx } from "../../../../../src/web";
import { HomePage } from "../home/Home";
import { FirstPostPage } from "./posts/FirstPost";

@CustomElement("blogpage-root")
export class BlogPage extends HTMLElement {
	static ROUTE = "/blog";

	constructor(protected router: Router) {
		super();
	}

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
						this.router.navigate(FirstPostPage.ROUTE, {
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
