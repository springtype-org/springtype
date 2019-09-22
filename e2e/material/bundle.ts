import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/material/src/app.module.tsx",
	webIndex: {
		template: "src/index.html"
	},
	cache: {
		enabled: false
	}
});
