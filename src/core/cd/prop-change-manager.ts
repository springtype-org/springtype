import { ICustomHTMLElement } from "../../web/customelement/interface";
import { ICustomHTMLElementInternals, INTERNAL } from "../../web/customelement/interface/icustom-html-element";
import { RenderReason } from "../../web/customelement/interface/ilifecycle";
import { isPrimitive } from "../lang/is-primitive";
import { st } from "../st/st";
import { ChangeDetector } from "./change-detector";
import { IOnChangeHandler, IOnDeepChangeHandler } from "./interface/ion-change-handler";
import { IPropChange, PropChangeType } from "./interface/ion-prop-change";

export const PROPS: any = Symbol("PROPS");

export const DEFAULT_EMPTY_PATH = "";

interface IProp {
  name: string;
  type: PropChangeType;
}

export class PropChangeManager {
  static addProp(ctor: any, name: string | symbol, type: PropChangeType) {
    if (!ctor[PROPS]) {
      ctor[PROPS] = [];
    }
    ctor[PROPS].push({
      name,
      type,
    });
  }

  static initProps(instance: any, props: Array<IProp>) {
    for (let i = 0; i < props.length; i++) {
      PropChangeManager.initProp(instance, props[i].name, props[i].type);
    }
  }

  static handleCustomElementPropChange(instance: any, change: IPropChange) {
    if (process.env.NODE_ENV != "production" && st.debug) {
      st.info("prop-change-manager.ts", "@prop()", change.name, "change detected on", instance, change);
    }

    // call handler method if implemented
    if (typeof instance.onPropChange == "function") {
      instance.onPropChange(change);
    }

    // if the instance never rendered yet, don't call doRender()!
    if (!(instance[INTERNAL] as ICustomHTMLElementInternals).notInitialRender) return;

    if (
      instance.shouldRender(RenderReason.PROP_CHANGE, {
        name: change.name,
        path: change.path,
        value: change.value,
        prevValue: change.prevValue,
        type: change.type,
      })
    ) {
      instance.doRender();
    }
  }

  static initProp(instance: ICustomHTMLElement, name: string, type: PropChangeType) {
    PropChangeManager.onPropChange(
      instance,
      name,
      type,
      (value: any, prevValue: any) => {
        PropChangeManager.handleCustomElementPropChange(instance, {
          type: PropChangeType.REFERENCE,
          path: DEFAULT_EMPTY_PATH,
          name,
          value,
          prevValue,
        });
      },
      (path: string, value: any, prevValue: any) => {
        PropChangeManager.handleCustomElementPropChange(instance, {
          type: PropChangeType.DEEP,
          path,
          name,
          value,
          prevValue,
        });
      },
    );
  }

  static conditionallyApplyDeepChangeDetection(value: any, onDeepChange: IOnDeepChangeHandler): any {
    // only activate deep change detection if there is some function to listen to it
    if (!isPrimitive(value) && typeof onDeepChange == "function") {
      value = ChangeDetector.onChange(value, onDeepChange);
    }
    return value;
  }

  static onPropChange(instance: any, name: string | symbol, type: PropChangeType, onChange: IOnChangeHandler, onDeepChange?: IOnDeepChangeHandler): any {
    let value = PropChangeManager.conditionallyApplyDeepChangeDetection(instance[name], onDeepChange!);

    Object.defineProperty(instance, name, {
      get: () => value,
      set: (newValue: any) => {
        const prevValue = value;

        if (type === PropChangeType.DEEP) {
          value = PropChangeManager.conditionallyApplyDeepChangeDetection(newValue, onDeepChange!);
        }
        onChange(value, prevValue);
      },
    });
    return value;
  }
}

if (!st.onPropChange) {
  st.onPropChange = PropChangeManager.onPropChange;
}
