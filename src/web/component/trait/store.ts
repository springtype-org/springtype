import { st } from "../../../core";
import { Store } from "../../../core/redux/interface/store";
import { Action, AnyAction } from "../../../core/redux/interface/actions";
import { resolvePathInObject } from "../../../core/lang/resolve-path-in-object";
import { TYPE_FUNCTION } from "../../../core/lang/type-function";
import { ILifecycle } from "../interface";
import { RenderReason } from "../interface/irender-reason";
import { ChangeType } from "../../../core/cd/interface/change-type";

export const STORE_MOUNTS: string = "STORE_MOUNTS";
let reduxStore: Store<any, any>;

export class StoreTrait {
  static enableFor(instance: any) {

    const storeMounts = Object.getPrototypeOf(instance).constructor[STORE_MOUNTS] || {};

    if (!reduxStore) return;

    StoreTrait.setMountStateValues(storeMounts, instance);

    reduxStore.subscribe(() => {
      StoreTrait.setMountStateValues(storeMounts, instance);
    });
  }

  static async setMountStateValues(storeMounts: any, instance: ILifecycle) {

    // add change detection / reflection for all @store
    for (let name in storeMounts) {

      // @ts-ignore
      if (!instance.el) {
        await instance.initiallyRendered!();
      };

      const value = resolvePathInObject(storeMounts[name], reduxStore.getState());

      // @ts-ignore
      const prevValue = instance[name];

      // redux store value map to instance property
      // @ts-ignore
      instance[name] = value;

      if (typeof instance.onStoreChange == TYPE_FUNCTION) {
        instance.onStoreChange!(name, value);
      }

      if (instance.shouldRender!(RenderReason.STORE_CHANGE, {
        name,
        path: storeMounts[name],
        prevValue,
        type: ChangeType.REFERENCE,
        value
      })) {
        instance.doRender!();
      }
    }
  }

  static addStoreMount(ctor: any, mountName: string, selector: string) {
    // validate
    if (process.env.NODE_ENV === "development") {

      if (st.dom.isStandardHTMLAttribute(mountName)) {
        st.error(`The store mount ${ctor.name}.${mountName} is a standard HTML element attribute. It's value would be written directly to this.el, hiding away from @attr. Please choose a different name.`);
      }
    }

    // init cache
    if (!ctor[STORE_MOUNTS]) {
      ctor[STORE_MOUNTS] = {};
    }

    // register
    ctor[STORE_MOUNTS][mountName] = selector;
  }
}

if (!st.getStore) {
  st.getStore = () => {
    return reduxStore;
  }

  st.setStore = <S = any, A extends Action<any> = AnyAction>(store: Store<S, A>) => {
    reduxStore = store;
  }
}