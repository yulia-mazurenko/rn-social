import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/mainScreen/Home";

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  // if (!isAuth) {
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
  // }
  // return (
  //   <MainTab.Navigator
  //     labeled={false}
  //     activeColor="#FF6C00"
  //     inactiveColor="#212121"
  //     barStyle={{
  //       flex: 1,
  //       alignItems: "center",
  //       alignSelf: "center",
  //       maxHeight: 83,
  //       backgroundColor: "#ffffff",
  //       // marginBottom: 28,
  //       // marginTop: 9,
  //       borderTopWidth: 1,
  //       borderTopColor: "#E8E8E8",
  //     }}
  //     screenOptions={{
  //       headerShown: true,
  //       tabBarShowLabel: false,
  //     }}
  //   >
  //     <MainTab.Screen
  //       options={{
  //         tabBarIcon: ({ focused, color, size }) => <PostsButton size={24} />,
  //       }}
  //       name="Posts"
  //       component={PostsScreen}
  //     />
  //     <MainTab.Screen
  //       options={{
  //         tabBarIcon: ({ focused, color, size }) => <CreatePostsButton />,
  //       }}
  //       name="Create"
  //       component={CreatePostsScreen}
  //     />
  //     <MainTab.Screen
  //       options={{
  //         tabBarIcon: ({ focused, color, size }) => <ProfileButton size={24} />,
  //       }}
  //       name="Profile"
  //       component={ProfileScreen}
  //     />
  //   </MainTab.Navigator>
  // );
};
