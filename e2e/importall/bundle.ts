import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/importall/src/index.ts",
	paths: {
		"@springtype/*": "./*"
	}
});
