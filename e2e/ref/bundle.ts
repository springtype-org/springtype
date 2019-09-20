import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/ref/src/index.tsx",
	paths: {
		"@springtype/*": "./*"
	}
});
