import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";

import BackButton from "../../assets/icons/arrow-left.svg";
import SendCommentButton from "../../assets/icons/icon-send.svg";
import { selectLogin } from "../../redux/auth/selectors";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../../firebase/config";
import { db } from "../../firebase/config";

export default function CommentsScreen({ navigation, route }) {
  const { postId, post } = route.params;

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const login = useSelector(selectLogin);

  const createDate = () => {
    const date = new Date();

    let day = date.getDate();
    if (day < 10) day = "0" + day;

    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    let month = months[date.getMonth()];

    let year = date.getFullYear();
    if (year < 10) year = "0" + year;

    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    const currentDate =
      day + " " + month + ", " + year + " | " + hours + ":" + minutes;

    return currentDate;
  };

  const createComment = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        postId,
        comment,
        login,
        date: createDate(),
      });
      console.log("Comment written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding post: ", e);
    }
    setComment("");
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", postId, "comments")
    );

    querySnapshot.forEach((doc) => {
      setAllComments((prevState) => [
        ...prevState,
        { ...doc.data(), id: doc.id },
      ]);
    });
  };

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
            marginTop: 10,
          }}
        >
          <Text style={styles.commentsTitle}>Comments</Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("Posts", {
              screen: "DefaultPostsScreen",
            })
          }
        >
          <BackButton />
        </TouchableOpacity>

        <View style={{ ...styles.postContainer, width: dimensions }}>
          <View style={{ ...styles.photoContainer, width: dimensions }}>
            <Image
              source={{ uri: post[0].photo }}
              style={{
                width: dimensions,
                height: 240,
                borderWidth: 1,
                borderRadius: 8,
              }}
            />
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              style={{ ...styles.commentsContainer, width: dimensions }}
              data={allComments}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text style={styles.commentDateText}>{item.date}</Text>
                </View>
              )}
            />
          </SafeAreaView>

          <View style={{ position: "relative", marginBottom: 16 }}>
            <TextInput
              style={{ ...styles.input, width: dimensions }}
              value={comment}
              placeholder="Comment..."
              placeholderTextColor="#BDBDBD"
              onChangeText={setComment}
            />

            <TouchableOpacity
              style={styles.sendCommentButton}
              activeOpacity={0.7}
              onPress={createComment}
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
    top: 50,
    left: 16,
  },
  photoContainer: {
    position: "relative",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginBottom: 32,
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
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
    color: "#212121",
  },
  commentDateText: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  comment: {
    flex: 1,
    flexDirection: "column",
    width: 299,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    marginBottom: 24,
    alignSelf: "flex-start",
  },

  commentsContainer: {
    flex: 1,
  },
});
