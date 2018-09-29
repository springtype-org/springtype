import {
    NotEmpty,
    NotNull,
    IsDefined,
    Required,
    Min,
    Max,
    Range,
    Validation,
    PRINT_VALIDATOR
} from "../package/val";
import {Component} from "../package/di";

@Component()
@Validation(PRINT_VALIDATOR)
export class Corrupt {

    public undefined(@IsDefined() undefined?: any): void {
        console.log('undefined reached', arguments)
    }

    public notNull(@NotNull() notNull?: any): void {
        console.log('notNull reached', arguments)
    }

    public notEmpty(@NotEmpty() notEmpty?: any): void {
        console.log('notEmpty reached', arguments)
    }

    public notEmptyAll(@NotEmpty(true) notEmptyAll?: any): void {
        console.log('notEmptyAll reached', arguments)
    }

    public required(@Required() required?: any): void {
        console.log('required reached', arguments)
    }

    public min(@Min(1) min?: any): void {
        console.log('min reached', arguments)
    }

    public max(@Max(2) max?: any): void {
        console.log('max reached', arguments)
    }

    public range(@Range(2, 3) range?: any): void {
        console.log('range reached', arguments)
    }
}