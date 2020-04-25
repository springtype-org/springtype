import { TYPE_FUNCTION } from "../../lang";
import { injectable } from "../../di/decorator/injectable";
import "../service";
import { InjectionStrategy } from "../../di/enum";

export const service = (
  injectionStrategyOrCtor: InjectionStrategy | any = InjectionStrategy.SINGLETON,
  factoryFn?: Function): any => {

  // services are injectable by default
  injectable(injectionStrategyOrCtor, factoryFn);

  if (typeof injectionStrategyOrCtor == TYPE_FUNCTION) {
    return injectionStrategyOrCtor;
  } else {
    return (targetClass: any) => {
      return targetClass
    };
  }
};
