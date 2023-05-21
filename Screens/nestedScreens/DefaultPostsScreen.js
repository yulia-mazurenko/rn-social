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
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { collection, getCountFromServer, getDocs } from "firebase/firestore";

import LogoutButton from "../../assets/icons/log-out.svg";
import MapButton from "../../assets/icons/map-icon.svg";
import CommentsButton from "../../assets/icons/comments-icon.svg";
import { useSelector } from "react-redux";
import { selectEmail, selectLogin } from "../../redux/auth/selectors";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";

export default function DefaultPostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [countComments, setCountComments] = useState([]);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [isPostCreated, setIsPostCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const name = useSelector(selectLogin);
  const email = useSelector(selectEmail);

  const dispatch = useDispatch();

  const getComments = async (postId) => {
    try {
      setIsLoading(true);

      const coll = collection(db, "posts", postId, "comments");
      const snapshot = await getCountFromServer(coll);
      setCountComments((prevState) => [
        ...prevState,
        { postId: postId, count: snapshot.data().count },
      ]);
      setIsPostCreated((prevState) => !prevState);
      console.log("end posts");
      setIsLoading(false);
    } catch (error) {
      toast.show(error.message, {
        type: "danger",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
    }
  };

  const getCountComments = (id) => {
    const count = countComments.find((item) => item.postId === id)?.count;
    return count;
  };

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((doc) => {
        setPosts((prevState) => [...prevState, { ...doc.data(), id: doc.id }]);
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const postIdList = posts.map((post) => post.id);
    postIdList.forEach((id) => getComments(id));
  }, [posts]);

  useEffect(() => {
    getAllPosts(isPostCreated);
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

  const handleLogOut = () => {
    dispatch(authSignOutUser());
  };

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
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
            <LogoutButton />
          </TouchableOpacity>
        </View>

        <View style={styles.postsContainer}>
          <View style={{ flexDirection: "row", marginBottom: 32 }}>
            <View style={styles.avatar}></View>

            <View style={{ paddingTop: 16 }}>
              <Text style={styles.userNameText}>{name}</Text>
              <Text style={styles.userEmailText}>{email}</Text>
            </View>
          </View>
          <ActivityIndicator
            size="large"
            color="#FF6C00"
            animating={isLoading}
          />
          <FlatList
            style={{ flex: 1 }}
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item, index, separators }) => (
              <TouchableHighlight
                key={item.id}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <View>
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
                    {item.state?.name}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
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
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId: item.id,
                            post: posts.filter((post) => post.id === item.id),
                          })
                        }
                      >
                        <CommentsButton />
                      </TouchableOpacity>
                      <Text>{getCountComments(item.id)}</Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                      }}
                    >
                      <TouchableOpacity
                        style={{ marginRight: 8 }}
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.location,
                          })
                        }
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
                        {item.state?.place}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
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
