import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/di/src/index.tsx",
	paths: {
		"@springtype/*": "./*"
	}
});
