import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/multipage/src/app.module.ts",
	webIndex: {
		template: "src/index.html"
	},
	cache: {
		enabled: false
	}
});
