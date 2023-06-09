import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
// import { ToastProvider } from "react-native-toast-notifications";
import Toast from "react-native-toast-notifications";

import { store } from "./redux/store";

import Main from "./components/Main";

let customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <ToastProvider>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Main />
      </Provider>
      <Toast ref={(ref) => (global["toast"] = ref)} />
    </View>
    // </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});
