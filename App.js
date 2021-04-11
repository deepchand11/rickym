import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import EpisodeScreen from "./screens/EpisodeScreen";
import DetailScreen from "./screens/DetailScreen";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Navigator initialRouteName="Home">
          <Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Rick And Morty",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Screen
            name="Details"
            options={{ title: "Details" }}
            component={DetailScreen}
          />
          <Screen
            name="Episode"
            options={{ title: "Episode" }}
            component={EpisodeScreen}
          />
        </Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
