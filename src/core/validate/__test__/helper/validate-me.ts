import {
  Future,
  IsDate,
  IsDefined,
  IsNumber,
  IsString,
  Max,
  Min,
  NotEmpty,
  NotNull,
  Past,
  Range,
  Required,
  Validate,
  Validation
} from "../..";

export const now = Date.now();
export const pastDate = new Date(now - 1000);
export const nowDate = new Date(now);
export const futureDate = new Date(now + 1000);

@Validation()
export class ValidateOnClass {
  notNull(@NotNull() test: any) {
  }

  isDate(@IsDate() test: any) {
  }

  isDefined(@IsDefined() test: any) {
  }

  isNumber(@IsNumber() test: any) {
  }

  isString(@IsString() test: any) {
  }

  maxNumber(@Max(2) test: any) {
  }

  minNumber(@Min(0) test: any) {
  }

  maxDate(@Max(futureDate) test: any) {
  }

  minDate(@Min(pastDate) test: any) {
  }

  past(@Past() test: any) {
  }

  future(@Future() test: any) {
  }

  rangeNumber(@Range(-1, 1) test: any) {
  }

  rangeDate(@Range(pastDate, futureDate) test: any) {
  }

  notEmpty(@NotEmpty({full: true}) test: any) {
  }

  notEmptyRequired(@NotEmpty({required: false}) test: any) {
  }

  required(@Required() test: any) {
  }
}

export class ValidateOnMethod {
  @Validate()
  validate(@Required() test: any) {
  }

  noValidate(@Required() test: any) {
  }
}
