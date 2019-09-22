import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/theme/src/index.tsx",
	paths: {
		"@springtype/*": "./*"
	}
});
