import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/mainScreen/Home";

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};
