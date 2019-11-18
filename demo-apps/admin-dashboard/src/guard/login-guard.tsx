import { injectable, inject } from "../../../../src/core/di";
import { FirebaseService } from "../service/firebase";
import { IVirtualNode } from "../../../../src/web/vdom/interface";
import { ErrorMessage } from "../component/error-message/error-message";
import { tsx } from "../../../../src/web/vdom";

@injectable()
export class LoginGuard {

  @inject(FirebaseService)
  firebaseService: FirebaseService;

  guard = (desiredComponent: IVirtualNode) => {
    return desiredComponent;

    if (this.firebaseService.isLoggedIn) {
      return desiredComponent;
    } else {
      return <ErrorMessage message="Forbidden." />;
    }
  };
}
