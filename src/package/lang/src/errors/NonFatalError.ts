
export class NonFatalException extends Error implements Error{

    constructor(error: Error){
        super()
    }
}