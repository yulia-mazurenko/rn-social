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
import CameraButton from "../../assets/icons/camera.svg";
import TrashButton from "../../assets/icons/trash.svg";
import MapButton from "../../assets/icons/map-icon.svg";

export default function CreatePostsScreen({ navigation, route }) {
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
          <Text style={styles.postsTitle}>Create Post</Text>
        </View>

        <View style={{ ...styles.postContainer, width: dimensions }}>
          <View style={{ ...styles.photoContainer, width: dimensions }}>
            <TouchableOpacity
              style={{
                ...styles.cameraButton,
                left: dimensions / 2 - 30,
                top: 90,
              }}
            >
              <CameraButton />
            </TouchableOpacity>
          </View>

          <Text style={styles.loadPhotoText}>Load a photo</Text>
          <View style={{ width: dimensions }}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#BDBDBD"
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
              />
            </View>

            <TouchableOpacity style={styles.publishButton} activeOpacity={0.7}>
              <Text style={styles.publishButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: dimensions,
              marginBottom: 0,
            }}
          >
            <TouchableOpacity style={styles.trashButton}>
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
  cameraButton: {
    position: "absolute",
    width: 60,
    height: 60,
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
    color: "#BDBDBD",
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
});
