export const hmrEntrypoint = (module: any) => {
    if (module) {
        (module as any).hot.dispose(() => {});
        (module as any).hot.accept(() => {
            window.location.reload();
        });
    }
};