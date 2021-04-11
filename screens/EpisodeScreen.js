import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";

const EpisodeScreen = ({ route, navigation }) => {
  const [episode, setEpisode] = useState({});
  const [loading, setLoading] = useState(false);
  const { url } = route.params;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          setLoading(false);
          setEpisode(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {
      setEpisode({});
    };
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="black" style={{ margin: 15 }} />
      ) : (
        <View>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text} testID="episodeNameId">
            {episode.name}
          </Text>
          <Text style={styles.label}>Air Date:</Text>
          <Text style={styles.text} testID="episodeAirDateId">
            {episode.air_date}
          </Text>
          <Text style={styles.label}>Episode:</Text>
          <Text style={styles.text} testID="episodeId">
            {episode.episode}
          </Text>
        </View>
      )}

      <Button
        testID="backBtn"
        title="Go back"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

export default EpisodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  label: {
    color: "rgb(158, 158, 158)",
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
