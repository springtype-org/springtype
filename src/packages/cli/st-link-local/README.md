## st-link-local

When working with more than one inter-dependent node modules locally, 
developers usually have to opt-in for `npm link` or `yarn link`.

Both solutions come with gotchas. Interference with npm caches, local
vs. remote registry issues and Microsoft Windows filesystem symlink problems
may occur and framework development may become a nightmare.

This simple CLI tool solves all headaches:

CLI example:

`cd ./project/with/local/dependencies`

`npx st-link-local`

