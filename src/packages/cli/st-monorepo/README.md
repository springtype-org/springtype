## SpringType monorepo

`st-monorepo` is a simple and straight-forth but likewise highly customizable 
tool to manage npm and git-based mono-repositories. 

#### Motivation

We've used `lerna` and it was helpful for us. But after some time we came to the 
conclusion that handling `lerna` can render quite complex at times and it lacked 
a configurable build pipeline at the time.

#### Design goals

Our primary design goals for `st-monorepo` are:
- Customizable build-chain 
- Customizable version control commands
- Customizable package manager commands
- Customizable repository processing (selection and order)
- Customizable commit messages (interactive)
- Customizable semver version upgrades (interactive)
- Minimum code dependencies
- Maximum simplicity and developer experience

#### Configuration

We encourage our users to use a package structure similar to `lerna`.
The basic idea is, to structure your monorepo like this:

    src/
        packages/
            A/
- some-subfolder/
-     A1/
-         ...
-         package.json
- ...
- package.json
            B/
- ...
- package.json
- 
        st-monorepo.json
        package.json
        
As you can see, we have a file called `st-monorepo.json`.
Similar to `lerna` this file contains the configuration for the
management tool, but it's structure differs completely.

Here is an example of `st-monorepo.json` for the above monorepo 
project layout:

    {
        "packages": [
            "packages/A",
            "packages/A/some-subfolder/A1",
            "packages/B"
        ],
        "script-chains": {
            "all": [
- "git-diff-stop-on-uncommitted-changes",
- "remove-node-modules", 
- "install-package-dependencies", 
- "npm-run-clean", 
- "npm-run-build", 
- "npm-run-test", 
- "git-log-only-continue-if-changed",
- "increase-package-semver-version",
- "update-semver-version-in-dependent-packages",
- "git-commit",
- "git-push",
- "npm-publish",
- "git-create-tag",
- "github-create-release"
            ],
            "publish-only": [
- "npm-publish"
            ]
        }
    }

As you can see, `packages` is an ordered list of packages which
also allows for sub-packages to be recognized. 

Processing chains are customizable and identified by name.

The order for chain execution equals the order of packages named.

Valid script-chain names are valid npm package names.
Internal command names (e.g. install, clean) are blacklisted.

#### CLI

The Command Line Interface (CLI) of `st-monorepo` is quite simple and straight-forward. 

There main features are:
1. Run script chains in all repositories in the right order with only one command, like:
   `npx st-monorepo all`
2. Run script chains in only specific repositories in a specific order, like: `npx st-monorepo publish-only B,A`
3. Run a specific command in specific repositories, like: `npx st-monorepo install B,A`
4. Run a script chain or a command in a specific package directory: `npx st-monorepo all`.
   If no `st-monorepo.json` can be found in the directory, `st-monorepo` assumes it's a package
   directory and looks upward in the folder structure until the first `st-monorepo.json` file
   is found. Commands and script chains are only executed for the local package in this case.

`st-monorepo` takes care of the developer experience and always makes sure to consistently
fail in time whenever a command executed in a chain fails. 

Also, the specific package name and version affected is always printed out at the right time.

#### Using `st-monorepo`

We made moving to `st-monorepo` a breeze. 

Firstly, you don't need to install anything as 
`npx st-monorepo` is a temporary installed npm executable.

Secondly, it is a zero-configuration monorepo management tool (for the
packages to be managed). Commands run in sub-processes called with the 
right arguments which makes sure, that you don't need any special 
`package.json` configuration.

Basically, you just leave things as they are.

To add support for `st-monorepo` and create a new `st-monorepo.json` config file, just run: `npx st-monorepo init` 
in the folder where your package folders are located.

To add/remove/move execution order of packages, you just edit `st-monorepo.json`'s `packages` section.

#### Supported commands

The commands supported are:

- create-config
- list-managed-packages
- git-diff-stop-on-uncommitted-changes
- remove-node-modules 
- install-package-dependencies 
- npm-run-clean 
- npm-run-build 
- npm-run-test 
- git-log-only-continue-if-changed
- increase-package-semver-version
- update-semver-version-in-dependent-packages
- git-commit
- git-push
- npm-publish
- git-create-tag
- github-create-release

All commands should be pretty self-explanatory.

#### Advanced customization

We've made sure that `st-monorepo` becomes a simple swiss-army knife without borders.

Most commands can be configured, for example (showing the default values):

    {
        "packages": [ ... ],
        "script-chains": { ... },
        "commands": {
            "git-diff-stop-on-uncommitted-changes": "git diff --cached",
            "npm-run-build": "npm run build",
            "npm-run-clean": "npm run clean",
            "npm-run-test": "npm run test",
            "remove-node-modules": "npx st-rm-rf node_modules",
            "git-log-only-continue-if-changed": "git log origin..HEAD",
            "git-commit": "git commit -m COMMIT_MESSAGE",
            "git-push": "git push",
            "increase-package-semver-version": "SEMVER_VERSION",
            "create-config": "st-monorepo.json",
            "install-package-dependencies": "npm install",
            "npm-publish": "npm publish",
            "git-create-tag": "git tag -a SEMVER_VERSION -m TAG_MESSAGE",
            "github-create-release": "hub release create -m RELEASE_MESSAGE TAG"
        }
    }
    
Thus you can just change the commands internally executed.