import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import BackButton from "../../assets/icons/arrow-left.svg";
import SendCommentButton from "../../assets/icons/icon-send.svg";

export default function CommentsScreen({ navigation, route }) {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
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
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View
          style={{
            position: "relative",
            borderBottomWidth: 1,
            borderBottomColor: "#E8E8E8",
            paddingTop: 40,
            paddingBottom: 11,
          }}
        >
          <TouchableOpacity style={styles.backButton}>
            <BackButton />
          </TouchableOpacity>
          <Text style={styles.commentsTitle}>Comments</Text>
        </View>

        <View style={{ ...styles.postContainer, width: dimensions }}>
          <View style={{ ...styles.photoContainer, width: dimensions }}></View>

          <View style={{ flex: 1, flexGrow: 1 }}></View>

          <View style={{ position: "relative", marginBottom: 16 }}>
            <TextInput
              style={{ ...styles.input, width: dimensions }}
              placeholder="Comment..."
              placeholderTextColor="#BDBDBD"
            />

            <TouchableOpacity
              style={styles.sendCommentButton}
              activeOpacity={0.7}
            >
              <SendCommentButton />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  postContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  commentsTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  backButton: {
    position: "absolute",
    width: 24,
    height: 24,
    top: 40,
    left: 16,
  },
  photoContainer: {
    position: "relative",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  input: {
    height: 50,
    paddingLeft: 16,
    marginTop: Dimensions.get("window").height < 400 ? 8 : 31,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19.36,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
  },
  sendCommentButton: {
    position: "absolute",
    top: 40,
    right: -25,
  },
});
