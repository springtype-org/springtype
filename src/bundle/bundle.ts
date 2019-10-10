import { bundle } from "./dist/bundle";

(async () => {
  console.log("Start bundling...");

  await bundle({
    output: "test/dist",
    entry: "test/src/index.tsx",
    devServer: {
      enabled: false,
    },
  });

  console.log("Done bundling.");

  /*
  // FIXME: Remove asap with fuse-box support
  let index = readFileSync("./test/dist/index.html", "utf8");
  index = index.replace(/src="\//g, 'src="');
  writeFileSync("./test/dist/index.html", index);
  */
})();
