import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
interface MyTheme {
	primaryColor: string;
}

const themeA: MyTheme = {
	primaryColor: "#cc0000"
};

const themeB: MyTheme = {
	primaryColor: "#0000cc"
};

@component()
export class ThemeTest extends st.component implements ILifecycle {
	onConnect() {
		this.changeThemeA();
	}

	changeThemeA = () => {
		st.tss.setTheme(themeA);
	};

	changeThemeB = () => {
		st.tss.setTheme(themeB);
	};

	render() {
		return (
			<div>
				<button onClick={this.changeThemeA}>Change theme to theme A</button>
				<button onClick={this.changeThemeB}>Change theme to theme B</button>
				<div class="basic">Some text themed</div>
			</div>
		);
	}
	renderStyle(theme: MyTheme) {
		return `.basic {
			background: ${theme.primaryColor}
		}`;
	}
}

st.render(<ThemeTest />);
