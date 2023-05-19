import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebase/config";
import { db } from "../../firebase/config";

import BackButton from "../../assets/icons/arrow-left.svg";
import CameraButton from "../../assets/icons/camera.svg";
import TrashButton from "../../assets/icons/trash.svg";
import MapButton from "../../assets/icons/map-icon.svg";
import { selectLogin, selectUserId } from "../../redux/auth/selectors";

const initialState = {
  name: "",
  place: "",
};

export default function CreatePostsScreen({ navigation, route }) {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isDisabledPublishButton, setIsDisabledPublishButton] = useState(true);
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState(null);

  const userId = useSelector(selectUserId);
  const login = useSelector(selectLogin);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);

      const place = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      place.find((p) => {
        setCountry(p.country);
      });
    })();
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

  const takePhoto = async () => {
    console.log("location", location);
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    setIsDisabledPublishButton(false);
  };
  const deletePost = () => {
    setPhoto(null);
    setState(initialState);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    setState(initialState);
    navigation.navigate("Posts", {
      screen: "DefaultPostsScreen",
      params: { photo, state },
    });
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo,
        state,
        location: location.coords,
        country,
        userId,
        login,
      });
      console.log("Post written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage(app);

    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();
    const storageRef = await ref(storage, `postImage/${uniquePostId}`);
    console.log(storageRef);

    await uploadBytes(storageRef, file);

    const gsReference = await ref(
      storage,
      `gs://rn-social-c5397.appspot.com/postImage/${uniquePostId}`
    );
    // const url = await getBlob(gsReference);
    // console.log(url);
    const url = await getDownloadURL(gsReference);
    return url;
  };

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
          <Text style={styles.postsTitle}>Create Post</Text>
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
          <Camera
            style={{ ...styles.camera, width: dimensions }}
            ref={setCamera}
          >
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 120, width: 120 }}
                />
              </View>
            )}
            <TouchableOpacity onPress={takePhoto} activeOpacity={0.7}>
              <CameraButton />
            </TouchableOpacity>
          </Camera>

          <Text style={styles.loadPhotoText}>Load a photo</Text>
          <View style={{ width: dimensions }}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#BDBDBD"
              value={state.name}
              onChangeText={(value) =>
                setState((prevState) => ({ ...state, name: value }))
              }
            />
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  ...styles.mapButton,
                  paddingBottom: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E8E8E8",
                }}
                onPress={() => navigation.navigate("Map")}
              >
                <MapButton />
              </TouchableOpacity>

              <TextInput
                style={{
                  ...styles.input,
                  marginLeft: 28,
                }}
                placeholder="Place"
                placeholderTextColor="#BDBDBD"
                value={state.place}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...state, place: value }))
                }
              />
            </View>

            <TouchableOpacity
              disabled={isDisabledPublishButton}
              style={
                photo
                  ? {
                      ...styles.publishButton,
                      backgroundColor: "#FF6C00",
                    }
                  : styles.publishButton
              }
              onPress={sendPhoto}
              activeOpacity={0.7}
            >
              <Text
                style={
                  photo
                    ? { ...styles.publishButtonText, color: "#fff" }
                    : styles.publishButtonText
                }
              >
                Publish
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ ...styles.trashButtonContainer, width: dimensions }}>
            <TouchableOpacity onPress={deletePost}>
              <TrashButton />
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
  postsTitle: {
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

  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 3,
  },

  loadPhotoText: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    height: 50,
    marginBottom: Dimensions.get("window").height < 400 ? 8 : 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  mapButton: {
    position: "absolute",
    top: 10,
    left: 0,
  },

  publishButton: {
    paddingVertical: 16,
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 25,
    backgroundColor: "#F6F6F6",
  },
  publishButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
    color: "#BDBDBD",
  },
  trashButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
});
