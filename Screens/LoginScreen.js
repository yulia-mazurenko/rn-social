import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import * as Font from "expo-font";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";

import AvatarButton from "../assets/icons/add.svg";

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [keyBoardStatus, setKeyBoardStatus] = useState("");
  const [isInputFocus, setIsInputFocus] = useState({
    email: false,
    password: false,
  });
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [isShownPassword, setIsShownPassword] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyBoardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyBoardStatus("Keyboard Hidden");
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleButtonPress = () => {
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const handleInputFocus = (input) => {
    setIsInputFocus({
      [input]: true,
    });
  };

  const handleInputBlur = (input) => {
    setIsInputFocus({
      [input]: false,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/bg-image.jpg")}
        >
          <View
            style={{
              ...styles.form,
              position:
                keyBoardStatus === "Keyboard Shown" ? "absolute" : "relative",
              top: keyBoardStatus === "Keyboard Shown" ? "53%" : 0,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.formTitle}>Log In</Text>

              <View
                style={{
                  gap: Dimensions.get("window").height < 400 ? 12 : 16,
                  width: dimensions,
                }}
              >
                <TextInput
                  style={
                    isInputFocus.email
                      ? [styles.input, { borderColor: "#FF6C00" }]
                      : styles.input
                  }
                  placeholder="Email"
                  tive
                  placeholderTextColor="#BDBDBD"
                  value={state.email}
                  onFocus={() => handleInputFocus("email")}
                  onBlur={() => handleInputBlur("email")}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...state, email: value }))
                  }
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={
                      isInputFocus.password
                        ? [styles.input, { borderColor: "#FF6C00" }]
                        : styles.input
                    }
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isShownPassword ? false : true}
                    value={state.password}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={() => handleInputBlur("password")}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...state, password: value }))
                    }
                  />
                  <TouchableOpacity style={styles.passwordButton}>
                    <Text
                      style={styles.passwordButtonText}
                      activeOpacity={0.7}
                      onPress={() =>
                        setIsShownPassword((prevState) => !prevState)
                      }
                    >
                      {isShownPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={handleButtonPress}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <Text style={styles.loginText}>
              Don't have an account? Register
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    flex: 1,
    position: "absolute",
    left: 0,
    width: "100%",
    maxHeight: 489,
    paddingBottom: Dimensions.get("window").height < 400 ? 30 : 144,
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  avatar: {
    position: "absolute",
    top: 0,
    transform: [{ translateX: -60 }, { translateY: -60 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  formTitle: {
    textAlign: "center",
    paddingTop: Dimensions.get("window").height < 400 ? 16 : 32,
    marginBottom: Dimensions.get("window").height < 400 ? 16 : 33,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
  },
  input: {
    height: 50,
    paddingLeft: 16,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fffafa",
    color: "#212121",
  },
  passwordButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  passwordButtonText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
    color: "#1B4371",
  },

  button: {
    paddingVertical: 16,
    marginTop: Dimensions.get("window").height < 400 ? 24 : 43,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 25,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
    color: "#ffffff",
  },
  loginText: {
    marginTop: 16,
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#1B4371",
  },
});
