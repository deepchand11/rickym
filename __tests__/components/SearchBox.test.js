import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import SearchBox from "../../components/SearchBox";
import { fireEvent, waitFor, render } from "@testing-library/react-native";

beforeEach(() => {
  fetch.mockClear();
});

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
  //   await waitFor(() => expect(handleSearchPress).toHaveBeenCalledTimes(0));
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
});

it("Search trigger success with no data", async () => {
  const { getByTestId } = render(
    <SearchBox
      setInfo={() => null}
      setCharacters={() => null}
      setLoading={() => null}
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
});

it("Search component renders correctly", () => {
  const tree = renderer
    .create(
      <SearchBox
        setInfo={() => null}
        setCharacters={() => null}
        setLoading={() => null}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
