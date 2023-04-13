import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Image,
} from "react-native";

import LogoutButton from "../../assets/icons/log-out.svg";
import MapButton from "../../assets/icons/map-icon.svg";
import CommentsButton from "../../assets/icons/comments-icon.svg";

export default function DefaultPostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

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
          }}
        >
          <Text style={styles.postsTitle}>Posts</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <LogoutButton />
          </TouchableOpacity>
        </View>

        <View style={styles.postsContainer}>
          <View style={{ flexDirection: "row", marginBottom: 32 }}>
            <View style={styles.avatar}></View>

            <View style={{ paddingTop: 16 }}>
              <Text style={styles.userNameText}>Name</Text>
              <Text style={styles.userEmailText}>Email</Text>
            </View>
          </View>

          <FlatList
            style={{ flex: 1 }}
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    marginBottom: 8,
                    justifyContent: "center",
                    width: 343,
                    borderWidth: 1,
                    borderRadius: 8,
                  }}
                >
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      width: dimensions,
                      height: 240,
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                  />
                </View>
                <Text style={{ ...styles.descriptionText, marginBottom: 11 }}>
                  {item.state.name}
                </Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    // justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginRight: 9 }}
                      onPress={() => navigation.navigate("Comments")}
                    >
                      <CommentsButton />
                    </TouchableOpacity>
                    <Text>0</Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginRight: 8 }}
                      onPress={() => navigation.navigate("Map")}
                    >
                      <MapButton />
                    </TouchableOpacity>

                    <Text
                      style={{
                        ...styles.descriptionText,
                        marginBottom: 34,
                        fontFamily: "Roboto-Regular",
                        textDecorationColor: "#212121",
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                      }}
                    >
                      {item.state.place}
                    </Text>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  postsContainer: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
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
  descriptionText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
});
