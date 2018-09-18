import {NotEmpty, NotNull, Defined, Validate, Required} from "../package/val";
import {Component} from "../package/di";

@Component()
export class Corrupt {

    @Validate
    public undefined(@Defined() undefined?: any): void {
        console.log('undefined reached', arguments)
    }

    @Validate
    public notNull(@NotNull() notNull?: any): void {
        console.log('notNull reached', arguments)
    }

    @Validate
    public notEmpty(@NotEmpty() notEmpty?: any): void {
        console.log('notEmpty reached', arguments)
    }

    @Validate
    public notEmptyAll(@NotEmpty(true) notEmptyAll?: any): void {
        console.log('notEmptyAll reached', arguments)
    }

    @Validate
    public required(@Required() required?: any): void {
        console.log('required reached', arguments)
    }
}