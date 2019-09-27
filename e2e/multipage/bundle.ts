import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/multipage/src/app.module.ts",
	cache: {
		enabled: false
	}
});
