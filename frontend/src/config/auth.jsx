import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const signInWithGoogle = async () => {
    try {
      //load popup for sign in
      const result = await signInWithPopup(auth, provider);
      return result.user; 
    } catch (error) {
      console.error("google signin error", error);
      throw error;
    }
  };
  
  //sign out
  export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("google signout error", error);
    }
  };