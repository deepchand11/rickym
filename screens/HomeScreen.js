import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { keyExtractor } from "../common/utils";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox";

const HomeScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({
    count: 0,
    pages: 0,
    next: "https://rickandmortyapi.com/api/character/?page=1",
  });
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  let _isMounted = false;
  useEffect(() => {
    _isMounted = true;
    if (_isMounted) fetchCharacters();
    return () => {
      // cleanup;
      _isMounted = false;
      setCharacters([]);
    };
  }, []);
  const fetchCharacters = async () => {
    if (!loading && !isListEnd && info.next) {
      try {
        setLoading(true);
        const response = await fetch(info.next);
        const data = await response.json();

        if (data.results.length > 0) {
          setLoading(false);
          setInfo(data.info);
          setCharacters([...characters, ...data.results]);
        } else {
          setIsListEnd(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading && <ActivityIndicator color="white" style={{ margin: 15 }} />}
      </View>
    );
  };

  const renderItem = ({ item }) => <Card item={item} navigation={navigation} />;
  return (
    <View style={styles.container}>
      <SearchBox
        setInfo={setInfo}
        setCharacters={setCharacters}
        setLoading={setLoading}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={characters}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={fetchCharacters}
          onEndReachedThreshold={1}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(36, 40, 47)",
  },
  contentContainer: {
    padding: 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
