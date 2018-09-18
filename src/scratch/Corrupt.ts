import {NotEmpty, NotNull, Defined, Validate, Required, Min, Max, Range} from "../package/val";
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

    @Validate
    public min(@Min(1) min?: any): void {
        console.log('min reached', arguments)
    }

    @Validate
    public max(@Max(2) max?: any): void {
        console.log('max reached', arguments)
    }

    @Validate
    public range(@Range(2,3) range?: any): void {
        console.log('range reached', arguments)
    }
}