import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/micro/src/index.tsx",
	paths: {
		"@springtype/*": "./*"
	}
});
