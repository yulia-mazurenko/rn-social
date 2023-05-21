import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";

import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { selectLogin, selectUserId } from "../../redux/auth/selectors";
import { db } from "../../firebase/config";
import MapButton from "../../assets/icons/map-icon.svg";
import CommentsButton from "../../assets/icons/comments-icon.svg";

export default function ProfileScreen({ navigation, route }) {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [userPosts, setUserPosts] = useState([]);
  const [countComments, setCountComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = useSelector(selectUserId);
  const login = useSelector(selectLogin);
  let postsList = [];

  const getUserPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        postsList.push({ ...doc.data(), id: doc.id });

        setUserPosts((prevState) => [
          ...prevState,
          { ...doc.data(), id: doc.id },
        ]);
      });

      const postsId = postsList.map((post) => post.id);
      postsId.forEach((id) => getComments(id));
    } catch (error) {
      toast.show("Something went wrong", {
        type: "danger",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
      console.log(error.message);
    }
  };

  const getComments = async (postId) => {
    try {
      setIsLoading(true);

      const coll = collection(db, "posts", postId, "comments");
      const snapshot = await getCountFromServer(coll);

      setCountComments((prevState) => [
        ...prevState,
        { postId: postId, count: snapshot.data().count },
      ]);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCountComments = (id) => {
    const count = countComments.find((item) => item.postId === id)?.count;
    return count;
  };

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

  useEffect(() => {
    getUserPosts();
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

            <Text style={styles.userName}>{login}</Text>

            <ActivityIndicator
              size="large"
              color="#FF6C00"
              animating={isLoading}
            />
            <FlatList
              style={{ flex: 1 }}
              data={userPosts}
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
                    <Text style={styles.postName}>{item.state.name}</Text>

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
                              post: userPosts.filter(
                                (post) => post.id === item.id
                              ),
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
                          {item.country}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
            />
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
  postName: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
