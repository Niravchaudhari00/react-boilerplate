import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

class AuthService {
  signInWithGoogle() {
    return new Promise((resolve, reject) => {
      signInWithPopup(auth, provider)
        .then(async (response) => {
          const res = await response;
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  signUpWithGoogle(visitorId?: string | number) {}
}

export { AuthService };
