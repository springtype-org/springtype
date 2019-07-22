module.exports = {

    "packages": [
    ],

    "command-chains": {
        "all": [
            "git-diff-stop-on-uncommitted-changes",
            "remove-node-modules",
            "install-package-dependencies",
            "npm-run-clean",
            "npm-run-build",
            "npm-run-test",
            "git-log-only-continue-if-changed",
            "increase-package-semver-version",
            "update-semver-version-in-dependent-packages",
            "git-commit",
            "git-push",
            "npm-publish",
            "git-create-tag",
            "github-create-release"
        ],
        "publish-only": [
            "npm-publish"
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
        "create-config": "st-monorepo.json",
        "install-package-dependencies": "npm install",
        "npm-publish": "npm publish",
        "git-create-tag": "git tag -a SEMVER_VERSION -m TAG_MESSAGE",
        "github-create-release": "hub release create -m RELEASE_MESSAGE TAG"
    }

};