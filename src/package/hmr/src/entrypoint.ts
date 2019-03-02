export const hmrEntrypoint = (module: any) => {

    if (module) {

        (module as any).hot.dispose(() => {});
        (module as any).hot.accept(() => {

            // make sure to hard-reload on hot module replacement
            // to prevent odd/buggy behaviour with certain build systems
            // (as cache invalidation isn't as easy as it seems to be, huh...)
            window.location.reload();
        });
    }
};