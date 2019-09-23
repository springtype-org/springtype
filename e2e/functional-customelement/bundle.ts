import { bundle } from "@springtype/bundle";

bundle({
	homeDir: "../../",
	entry: "e2e/functional-customelement/src/index.tsx",
	paths: {
		"@springtype/*": "./*"
	}
});
