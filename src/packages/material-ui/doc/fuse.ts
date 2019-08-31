const { fusebox, sparky } = require('fuse-box');
const { pluginTypeChecker } = require('fuse-box-typechecker');

class Context {


    getDevConfig() {
        return fusebox({
            target: 'browser',
            homeDir: '../../',
            output: `dev`,
            entry: `material-ui/doc/TestApp.tsx`,
            webIndex: {
                template: `index.html`
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
                    basePath: '../',
                    tsConfig: './tsconfig.json'
                })
            ]
        });
    }
}
const { task } = sparky(Context);

task('default', async ctx => {
    const fuse = ctx.getDevConfig();
    await fuse.runDev();
});