import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    const dimentionsChange = Dimensions.addEventListener("change", onChange);

    return () => {
      dimentionsChange.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/bg-image.jpg")}
        >
          <View style={styles.profileContainer}>
            <View
              style={{
                ...styles.avatar,
                left: dimensions / 2,
              }}
            ></View>

            <Text style={styles.userName}>User Name</Text>
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
  profileContainer: {
    flex: 1,
    position: "relative",
    left: 0,
    width: "100%",
    maxHeight: 550,
    paddingHorizontal: 16,
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
  userName: {
    textAlign: "center",
    paddingTop: Dimensions.get("window").height < 400 ? 16 : 92,
    marginBottom: Dimensions.get("window").height < 400 ? 8 : 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
  },
});
