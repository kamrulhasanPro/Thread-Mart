import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firbase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  console.log("Current user is ->", user?.email);

  // register user
  const registerUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const googleLoginUser = () => {
    setLoader(true);
    return signInWithPopup(auth, GoogleAuthProvider());
  };

  // sign out
  const signOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  // store user and state change track
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currenUser) => {
      setUser(currenUser);
      setLoader(false);
    });
    return () => subscribe();
  }, []);

  const authInfo = {
    registerUser,
    loginUser,
    googleLoginUser,
    signOutUser,
    user,
    loader,
    setLoader,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
