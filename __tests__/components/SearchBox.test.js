import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import SearchBox from "../../components/SearchBox";
import { fireEvent, waitFor, render } from "@testing-library/react-native";

jest.mock("@expo/vector-icons");

it("Search trigger success", async () => {
  const { getByTestId } = render(
    <SearchBox
      setInfo={() => null}
      setCharacters={() => null}
      setLoading={() => null}
    />
  );
  const handleSearchPress = fetch.mockResponseSuccess(
    JSON.stringify({ data: { info: {} }, results: [{}] })
  );

  const button = getByTestId("searchBtnId");
  fireEvent.press(button);
  waitFor(() => expect(handleSearchPress).toHaveBeenCalledTimes(1));
});

it("Search trigger error", async () => {
  const { getByTestId, toJSON } = render(
    <SearchBox
      setInfo={() => null}
      setCharacters={() => null}
      setLoading={() => null}
    />
  );
  toJSON();
  const searchTxt = "Rick";
  const handleSearchPress = fetch.mockResponseFailure(
    JSON.stringify({ data: { error: {} } })
  );
  const search = getByTestId("searchId");
  fireEvent.changeText(search, searchTxt);
  const button = getByTestId("searchBtnId");
  fireEvent.press(button);
  waitFor(() => expect(handleSearchPress).toHaveBeenCalledTimes(1));
});

it("Search trigger success with no data", async () => {
  const loading = jest.fn();
  const { getByTestId } = render(
    <SearchBox
      setInfo={() => null}
      setCharacters={() => null}
      setLoading={loading}
    />
  );
  const searchTxt = "Rick";
  const handleSearchPress = fetch.mockResponseSuccess(
    JSON.stringify({ data: { results: [] } })
  );
  const search = getByTestId("searchId");
  fireEvent.changeText(search, searchTxt);
  const button = getByTestId("searchBtnId");
  fireEvent.press(button);
  waitFor(() => expect(handleSearchPress).toHaveBeenCalledTimes(1));
});

it("Search component renders correctly", () => {
  const { toJSON } = render(
    <SearchBox
      setInfo={() => null}
      setCharacters={() => null}
      setLoading={() => null}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});
