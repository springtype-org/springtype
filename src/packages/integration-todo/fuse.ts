const { fusebox, sparky } = require('fuse-box');
const { pluginTypeChecker } = require('fuse-box-typechecker');
const fastify = require('fastify')();
const path = require('path');

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
                FTL: true
            },
            watch: { ignored: ['dist', 'dev'] },
            hmr: true,
            devServer: true,
            plugins: [
                pluginTypeChecker({
                    basePath: './',
                    tsConfig: './tsconfig.json'
                })
            ]
        });
    }
}
const { task } = sparky(Context);

task('serve', async ctx => {

    fastify.register(require('fastify-static'), {
        root: path.join(__dirname, 'dist')
    })
    
    fastify.listen(3000, (err, address) => {
        if (err) throw err
        console.log(`Server listening on ${address}, serving ./dist`);
    })
});

task('dist', async ctx => {
    const fuse = ctx.getDistConfig();
    await fuse.runProd();
});

task('default', async ctx => {
    const fuse = ctx.getDevConfig();
    await fuse.runDev();
});