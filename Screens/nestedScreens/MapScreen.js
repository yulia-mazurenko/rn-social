import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native";

import BackButton from "../../assets/icons/arrow-left.svg";

export default function MapScreen({ navigation, route }) {
  const { latitude, longitude } = route.params.location;
  return (
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
        <Text style={styles.mapTitle}>Map</Text>
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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="shop" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapTitle: {
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
});
