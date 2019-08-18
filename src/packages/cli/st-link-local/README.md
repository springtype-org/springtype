## st-link-local

When working with more than one inter-dependent node modules locally, 
developers usually have to opt-in for `npm link` or `yarn link`.

Both solutions come with gotchas. Interference with npm caches, local
vs. remote registry issues and Microsoft Windows filesystem symlink problems
may occur and framework development may become a nightmare.

This simple CLI tool solves these headaches: We've introduced a new 
`package.json` field `stLinkLocalDependencies`:

```
{
    "stLinkLocalDependencies": {
        "@springtype/core": "file:../../core/dist"
    }
}
```

Using a custom field ensures that the link-local dependency management
is not interfering with and default npm behaviour.

Run:

`npx st-link-local`

to install locally linked dependencies and watch/sync for any changes.

For example, you could run:

`tsc -w`

in `../../core/`. On any file change caused by a typescript transpilation 
run, `st-link-local` will synchronize the local dependency code.

