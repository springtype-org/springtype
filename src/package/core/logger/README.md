## Logger

General logger abstraction implementation. It allows for OOP and functional style logging.

To set a specific logger and/or configuration, you can use the decorator `@AppLogger({ ... })`
on any class.

To use a logger, you can either inject it:

    constructor(
        protected logger: Logger
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