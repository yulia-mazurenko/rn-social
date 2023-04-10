import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsButton from "../../assets/icons/posts.svg";
import CreatePostsButton from "../../assets/icons/create-posts.svg";
import ProfileButton from "../../assets/icons/profile.svg";

const MainTab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <MainTab.Navigator
      labeled={false}
      activeColor="#FF6C00"
      inactiveColor="#212121"
      barStyle={{
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        maxHeight: 83,
        backgroundColor: "#ffffff",
        // marginBottom: 28,
        // marginTop: 9,
        borderTopWidth: 1,
        borderTopColor: "#E8E8E8",
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => <PostsButton size={24} />,
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => <CreatePostsButton />,
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => <ProfileButton size={24} />,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
