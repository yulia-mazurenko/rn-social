import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import LogoutButton from "../../assets/icons/log-out.svg";

export default function DefaultPostsScreen({ navigation, route }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View
          style={{
            position: "relative",
            borderBottomWidth: 1,
            borderBottomColor: "#E8E8E8",
          }}
        >
          <Text style={styles.postsTitle}>Posts</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <LogoutButton />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexGrow: 1,
            paddingTop: 32,
            paddingHorizontal: 16,
          }}
        >
          <View style={styles.avatar}></View>

          <View style={{ paddingTop: 16 }}>
            <Text style={styles.userNameText}>Name</Text>
            <Text style={styles.userEmailText}>Email</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  postsTitle: {
    textAlign: "center",
    paddingTop: Dimensions.get("window").height < 400 ? 16 : 55,
    paddingBottom: Dimensions.get("window").height < 400 ? 8 : 11,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  logoutButton: {
    width: 24,
    height: 24,
    position: "absolute",
    bottom: 14,
    right: 16,
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  userNameText: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15.23,
    color: "#212121",
  },
  userEmailText: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 12.89,
    color: "#212121",
  },
});
