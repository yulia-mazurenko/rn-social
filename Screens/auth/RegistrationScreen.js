import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";

import AvatarButton from "../../assets/icons/add.svg";
import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [keyBoardStatus, setKeyBoardStatus] = useState("");
  const [isInputFocus, setIsInputFocus] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [isShownPassword, setIsShownPassword] = useState(false);

  const dispatch = useDispatch();

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
    const dimentionsChange = Dimensions.addEventListener("change", onChange);

    return () => {
      dimentionsChange.remove();
    };
  }, []);

  const handleSubmit = () => {
    Keyboard.dismiss();
    console.log(state);
    dispatch(authSignUpUser(state));
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
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/bg-image.jpg")}
        >
          <View
            style={{
              ...styles.form,
              position:
                keyBoardStatus === "Keyboard Shown" ? "absolute" : "relative",
              top: keyBoardStatus === "Keyboard Shown" ? "30%" : 0,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.avatar,
                  left: dimensions / 2,
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 14, right: -12 }}
                >
                  <AvatarButton />
                </TouchableOpacity>
              </View>

              <Text style={styles.formTitle}>Registration</Text>

              <View
                style={{
                  width: dimensions,
                }}
              >
                <TextInput
                  style={
                    isInputFocus.login
                      ? [styles.input, { borderColor: "#FF6C00" }]
                      : styles.input
                  }
                  placeholder="Login"
                  placeholderTextColor="#BDBDBD"
                  value={state.login}
                  onFocus={() => handleInputFocus("login")}
                  onBlur={() => handleInputBlur("login")}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...state, login: value }))
                  }
                />
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
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ flex: 1, flexDirection: "row" }}
            >
              <Text style={styles.loginText}>
                Already have an account?
                <Text> Log in</Text>
              </Text>
            </TouchableOpacity>
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
    maxHeight: 550,
    paddingBottom: Dimensions.get("window").height < 400 ? 20 : 65,
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
    paddingTop: Dimensions.get("window").height < 400 ? 16 : 92,
    marginBottom: Dimensions.get("window").height < 400 ? 8 : 17,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
  },
  input: {
    height: 50,
    paddingLeft: 16,
    marginTop: Dimensions.get("window").height < 400 ? 8 : 16,
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
    color: "#1B4371",
  },

  button: {
    paddingVertical: 16,
    marginTop: Dimensions.get("window").height < 400 ? 16 : 43,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 25,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
    color: "#ffffff",
  },
  loginText: {
    marginTop: 16,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#1B4371",
  },
});
