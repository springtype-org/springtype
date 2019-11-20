import { injectable, inject } from "../../../../src/core/di";
import { IVirtualNode } from "../../../../src/web/vdom/interface";

@injectable
export class LoginGuard {

  guard = (desiredComponent: IVirtualNode) => {
    return desiredComponent;
  };
}
