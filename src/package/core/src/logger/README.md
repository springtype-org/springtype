## ActiveLogger

General logger abstraction implementation. It allows for OOP and functional style logging.

To set a specific logger and/or configuration, you can use the decorator `@Logger({ ... })`
on any class.

To use a logger, you can either inject it:

    constructor(
        protected logger: ActiveLogger
    ) {}
    
    someMethod() {
        this.logger.warn(...);
    }

Or use the functional API:

    info(...);
    log(...);
    warn(...);
    error(...);
    debug(...);
    trace(...);