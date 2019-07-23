module.exports = {

    "packages": [
    ],

    "global-command-chains": {

        "all": [
            "npm-login",
            "all",
            "git-create-tag",
            "github-create-release"
        ],

        "publish-only": [
            "npm-login",
            "publish-only",
            "git-create-tag",
            "github-create-release"
        ]
    },

    "package-command-chains": {

        "all": [
            "git-diff-stop-on-uncommitted-changes",
            "git-log-only-continue-if-changed",
            "remove-node-modules",
            "install-package-dependencies",
            "npm-run-clean",
            "npm-run-build",
            "npm-run-test",
            "increase-package-semver-version",
            "update-semver-version-in-dependent-packages",
            "git-commit",
            "update-git-head-version-in-package-json",
            "git-push",
            "st-flat-publish"
        ],

        "publish-only": [
            "st-flat-publish"
        ]
    },

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
        "install-package-dependencies": "npm install",
        "st-flat-publish": "npx st-flat-publish dist package.json LICENSE.md",
        "git-create-tag": "git tag -a SEMVER_VERSION -m TAG_MESSAGE",
        "github-create-release": "hub release create -m RELEASE_MESSAGE TAG"
    }

};