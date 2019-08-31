const { fusebox, sparky } = require('fuse-box');
const { pluginTypeChecker } = require('fuse-box-typechecker');

class Context {

    getDistConfig() {
        return fusebox({
            target: 'browser',
            homeDir: '../',
            output: `dist`,
            entry: `integration-todo/src/index.module.ts`,
            webIndex: {
                template: `src/index.html`
            },
            paths: {
                "@springtype*": ["packages*"]
            }, 
            logging: { level: 'verbose' },
            dependencies: {
                include: ['tslib']
            },
            plugins: []
        });
    }

    getDevConfig() {
        return fusebox({
            target: 'browser',
            homeDir: '../',
            output: `dev`,
            entry: `integration-todo/src/index.module.ts`,
            webIndex: {
                template: `src/index.html`
            },
            paths: {
                "@springtype*": ["packages*"]
            }, 
            logging: { level: 'verbose' },
            dependencies: {
                include: ['tslib']
            },
            cache: {
                root: '.cache',
                FTL: true,
                enabled: true
            },
            watch: { ignored: ['dist', 'dev'] },
            hmr: true,
            devServer: true,
            plugins: [
                pluginTypeChecker({
                    basePath: '.',
                    tsConfig: './tsconfig.json'
                })
            ]
        });
    }
}
const { task } = sparky(Context);

task('dist', async ctx => {
    const fuse = ctx.getDistConfig();
    await fuse.runProd();
});

task('default', async ctx => {
    const fuse = ctx.getDevConfig();
    await fuse.runDev();
});