import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/children/src/index.tsx",
	paths: {
		"@springtype/*": "./*"
	}
});
