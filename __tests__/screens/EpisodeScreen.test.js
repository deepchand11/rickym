import "react-native";
import React from "react";
import EpisodeScreen from "../../screens/EpisodeScreen";
import { fireEvent, waitFor, render } from "@testing-library/react-native";

it("Navigate to previous screen", () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "locationUrl",
    },
  };
  fetch.mockResponseSuccess(JSON.stringify({}));
  const { getByTestId } = render(
    <EpisodeScreen route={urlMock} navigation={{ popToTop }} />
  );
  const backBtn = getByTestId("backBtn");
  fireEvent.press(backBtn);
  expect(popToTop).toHaveBeenCalledTimes(1);
});

it("Api success", () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "episodeUrl",
    },
  };
  const success = {
    name: "Mockname",
    air_date: "Mockairdate",
    episode: "Mockepisode",
  };
  const fetchEpisode = fetch.mockResponseSuccess(JSON.stringify(success));
  const { getByTestId, toJSON } = render(
    <EpisodeScreen route={urlMock} navigation={{ popToTop }} />
  );
  waitFor(() => {
    expect(getByTestId("episodeNameId").props.children).toBe("Mockname");
    expect(getByTestId("episodeAirDateId").props.children).toBe("Mockairdate");
    expect(getByTestId("episodeId").props.children).toBe("Mockepisode");
  });
  waitFor(() => expect(fetchEpisode).toHaveBeenCalledTimes(1));
  expect(toJSON()).toMatchSnapshot();
});

it("Api Error", () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "episodeUrl",
    },
  };
  const fetchEpisode = fetch.mockResponseFailure({
    error: { message: "mockerror" },
  });
  const { toJSON } = render(
    <EpisodeScreen route={urlMock} navigation={{ popToTop }} />
  );
  waitFor(() => expect(fetchEpisode).toHaveBeenCalledTimes(0));
  expect(toJSON()).toMatchSnapshot();
});
