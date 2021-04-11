import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchBox = ({ setInfo, setCharacters, setLoading }) => {
  const [text, setText] = useState("");

  const handleSearchPress = async () => {
    if (text.length > 0) {
      try {
        setLoading(true);
        const response = await fetch(
          "https://rickandmortyapi.com/api/character/?name=" + text
        );
        const data = await response.json();
        if (!data.error && data.results.length > 0) {
          setLoading(false);
          setInfo(data.info);
          setCharacters([...data.results]);
        } else {
          setLoading(false);
          setCharacters([]);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.header}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        testID="searchId"
      />
      <TouchableOpacity onPress={handleSearchPress} testID="searchBtnId">
        <View style={styles.btnSearch}>
          <AntDesign name="search1" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    flex: 1,
    padding: 8,
  },
  btnSearch: {
    backgroundColor: "#FF813F",
    borderRadius: 3,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
