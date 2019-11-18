import { INJECTION_STRATEGY } from "../di";
import { InjectionStrategy } from "../enum/injection-strategy";
import { IInjectionStrategyConfig } from "../interface/iinjection-strategy-config";
import { TYPE_STRING } from "../../lang/type-string";

export const injectable = (
  injectionStrategyOrCtor: InjectionStrategy | any = InjectionStrategy.SINGLETON,
  factoryFn?: Function,
) => {
  if (typeof injectionStrategyOrCtor === TYPE_STRING) {
    return (originalCtor: any) => {
      Object.defineProperty(originalCtor, INJECTION_STRATEGY, {
        value: {
          injectionStrategy: injectionStrategyOrCtor,
          factoryFn,
        } as IInjectionStrategyConfig,
      });
      return originalCtor;
    };
  } else {
    Object.defineProperty(injectionStrategyOrCtor, INJECTION_STRATEGY, {
      value: {
        injectionStrategy: InjectionStrategy.SINGLETON,
        factoryFn: undefined,
      } as IInjectionStrategyConfig,
    });
    return injectionStrategyOrCtor;
  }
};
