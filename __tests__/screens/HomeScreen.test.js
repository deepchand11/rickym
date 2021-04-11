import "react-native";
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import { fireEvent, waitFor, render, act } from "@testing-library/react-native";

jest.mock("../../components/Card");

it("Api success", () => {
  const fetchCharacters = fetch.mockResponseSuccess(
    JSON.stringify({
      info: {},
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
        },
        {
          id: 2,
          name: "Morty Smith",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
        },
      ],
    })
  );
  const tree = render(<HomeScreen />);
  waitFor(() => expect(fetchCharacters).toHaveBeenCalledTimes(1));
  expect(tree).toMatchSnapshot();
});
it("Api no data", () => {
  const fetchCharacters = fetch.mockResponseSuccess(
    JSON.stringify({
      info: {},
      results: [],
    })
  );
  const tree = render(<HomeScreen />);
  waitFor(() => expect(fetchCharacters).toHaveBeenCalledTimes(1));
  expect(tree).toMatchSnapshot();
});
it("Api error", () => {
  const fetchCharacters = fetch.mockResponseFailure(
    JSON.stringify({ data: { error: {} } })
  );
  const tree = render(<HomeScreen />);
  waitFor(() => expect(fetchCharacters).toHaveBeenCalledTimes(1));
  expect(tree).toMatchSnapshot();
});
