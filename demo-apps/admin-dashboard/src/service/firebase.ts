import { injectable } from "../../../../src/core/di";

@injectable
export class FirebaseService {

  isInitialized: boolean = false;
  isLoggedIn: boolean = false;

  async init() {
    if (!this.isInitialized) {
      // dummy method, would await firebase.init() here
      this.isInitialized = true;
    }
  }

  async login(email: string, password: string) {
    await this.init();

    // dummy, would await firebase/login here

    // throws otherwise and doesn't reach code
    this.isLoggedIn = true;
  }
}
