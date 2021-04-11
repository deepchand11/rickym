import "react-native";
import React from "react";
import EpisodeScreen from "../../screens/EpisodeScreen";
import { fireEvent, waitFor, render, act } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
// import renderer from "react-test-renderer";

it("Episode Screen renders correctly", async () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "EpisodeUrl",
    },
  };
  const { toJSON } = await render(
    <EpisodeScreen route={urlMock} navigation={{ popToTop }} />
  );
  expect(toJSON).toMatchSnapshot();
});

it("Navigate to previous screen", async () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "episodeUrl",
    },
  };
  const { getByTestId } = await render(
    <EpisodeScreen route={urlMock} navigation={{ popToTop }} />
  );
  const backBtn = getByTestId("backBtn");
  fireEvent.press(backBtn);
  expect(popToTop).toHaveBeenCalledTimes(1);
});

it("Api mock calling on component mount ", async () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "locationUrl",
    },
  };
  const success = {
    name: "Mockname",
    air_date: "Mockairdate",
    episode: "Mockepisode",
  };

  const fetchEpisode = fetch.mockResponseSuccess(JSON.stringify(success));
  await act(async () => {
    const { getByTestId } = await render(
      <EpisodeScreen route={urlMock} navigation={{ popToTop }} />
    );
    expect(getByTestId("episodeNameId").props.children).toBe("Mockname");
    expect(getByTestId("episodeAirDateId").props.children).toBe("Mockairdate");
    expect(getByTestId("episodeId").props.children).toBe("Mockepisode");
  });
  await waitFor(() => expect(fetchEpisode).toHaveBeenCalledTimes(1));
});

it("Api mock calling on component mount error", async () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "episodeUrl",
    },
  };
  const error = {
    message: "Mockerror",
  };
  const fetchEpisode = fetch.mockResponseFailure(error);
  await act(async () => {
    const { getByTestId } = await render(
      <EpisodeScreen route={urlMock} navigation={{ popToTop }} />
    );
    expect(getByTestId("episodeNameId").props.children).toBeUndefined();
    expect(getByTestId("episodeAirDateId").props.children).toBeUndefined();
    expect(getByTestId("episodeId").props.children).toBeUndefined();
  });
  await waitFor(() => expect(fetchEpisode).toHaveBeenCalledTimes(1));
});
