import React, { memo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";
import { statusIndicator } from "../common/utils";

const Card = ({ item, navigation }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: item.image,
        }}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Octicons
            name="primitive-dot"
            size={14}
            color={statusIndicator(item.status)}
          />
          <Text numberOfLines={1} style={styles.status}>
            {item.status} - {item.species}
          </Text>
        </View>
        <Text style={styles.subtitle}>Last known location:</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", {
              url: item.location.url,
            })
          }
          testID="locationId"
        >
          <Text numberOfLines={1} style={styles.subtext}>
            {item.location.name}
          </Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>First seen in:</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Episode", {
              url: item.episode[0],
            })
          }
          testID="episodeId"
        >
          <Text numberOfLines={1} style={styles.subtext}>
            episode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "rgb(60, 62, 68)",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flex: 1,
  },
  tinyLogo: {
    width: 115,
    height: 115,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    padding: 5,
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    width: 180,
  },
  status: {
    fontSize: 11,
    color: "rgb(158, 158, 158)",
    marginLeft: 3,
  },
  subtitle: {
    fontSize: 11,
    color: "rgb(158, 158, 158)",
  },
  subtext: {
    fontSize: 12,
    color: "#ffffff",
    textDecorationLine: "underline",
    width: 180,
  },
});
