import "react-native";
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import Card from "../../components/Card";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("navigates on location press", async () => {
  const navigate = jest.fn();
  const item = {
    image: "imageUrl",
    location: {
      name: "locationName",
      url: "locationUrl",
    },
    episode: ["episodeUrl"],
  };
  const { getByTestId } = await render(
    <Card item={item} navigation={{ navigate }} />
  );
  const locationId = getByTestId("locationId");
  fireEvent.press(locationId);
  expect(navigate).toHaveBeenCalledWith("Details", { url: "locationUrl" });
});
it("navigates on episode press", async () => {
  const navigate = jest.fn();
  const item = {
    image: "imageUrl",
    location: {
      name: "locationName",
      url: "locationUrl",
    },
    episode: ["episodeUrl"],
  };
  const { getByTestId } = await render(
    <Card item={item} navigation={{ navigate }} />
  );
  const locationId = getByTestId("episodeId");
  fireEvent.press(locationId);
  expect(navigate).toHaveBeenCalledWith("Episode", { url: "episodeUrl" });
});
it("Card renders correctly", () => {
  const navigate = jest.fn();
  const item = {
    image: "imageUrl",
    location: {
      name: "locationName",
      url: "locationUrl",
    },
    episode: ["episodeUrl"],
  };
  const tree = renderer
    .create(<Card item={item} navigation={{ navigate }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
