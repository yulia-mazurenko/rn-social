import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedStack = createNativeStackNavigator();

export default function PostsScreen({ route }) {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{ headerShown: false }}
      />
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </NestedStack.Navigator>
  );
}
