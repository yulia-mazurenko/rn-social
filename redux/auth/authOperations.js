import { createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { authSlice } from "./authSlice";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const auth = await getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const { displayName, uid } = await auth.currentUser;

      const userUpdateProfile = {
        login: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      toast.show(error.message, {
        type: "danger",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch) => {
    const auth = getAuth(app);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userUpdateProfile = {
        login: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      toast.show("Wrong password or email", {
        type: "danger",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });

      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    const auth = getAuth(app);
    await signOut(auth);

    dispatch(authSignOut());
    dispatch(
      authStateChange({
        stateChange: false,
      })
    );
  } catch (error) {
    toast.show(error.message, {
      type: "danger",
      duration: 3000,
      offset: 30,
      animationType: "zoom-in",
    });
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  try {
    const auth = await getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          login: auth.currentUser.displayName,
          userId: auth.currentUser.uid,
          email: auth.currentUser.email,
        };

        dispatch(updateUserProfile(userUpdateProfile));

        dispatch(
          authStateChange({
            stateChange: true,
          })
        );
      }
    });
  } catch (error) {
    toast.show(error.message, {
      type: "danger",
      duration: 3000,
      offset: 30,
      animationType: "zoom-in",
    });
    console.log("error", error);
    console.log("error.message", error.message);
  }
};
