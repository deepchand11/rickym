import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";

const DetailScreen = ({ route, navigation }) => {
  const [detail, setDetail] = useState({});
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
          setDetail(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {
      setDetail({});
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="black" style={{ margin: 15 }} />
      ) : (
        <View>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text} testID="detailNameId">
            {detail.name}
          </Text>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.text} testID="detailTypeId">
            {detail.type}
          </Text>
          <Text style={styles.label}>Dimension:</Text>
          <Text style={styles.text} testID="detailDimensionId">
            {detail.dimension}
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

export default DetailScreen;

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
