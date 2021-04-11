import "react-native";
import React from "react";
import DetailScreen from "../../screens/DetailScreen";
import { fireEvent, waitFor, render, act } from "@testing-library/react-native";

// import { create, act } from "react-test-renderer";
// const popToTop = jest.fn();
// const urlMock = {
//   params: {
//     url: "locationUrl",
//   },
// };
// const tree = create(<DetailScreen route={urlMock} navigation={{ popToTop }} />);
// test("snapshot", () => {
//   expect(tree).toMatchSnapshot();
// });

// test("call timeout", () => {
//   act(() => jest.runAllTimers());
// });
// Note: test renderer must be required after react-native.
// import renderer from "react-test-renderer";

it("Detail Screen renders correctly", async () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "locationUrl",
    },
  };
  const { toJSON } = await render(
    <DetailScreen route={urlMock} navigation={{ popToTop }} />
  );

  expect(toJSON()).toMatchSnapshot();
});

it("Navigate to previous screen", async () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "locationUrl",
    },
  };
  const { getByTestId } = await render(
    <DetailScreen route={urlMock} navigation={{ popToTop }} />
  );
  const backBtn = getByTestId("backBtn");
  fireEvent.press(backBtn);
  expect(popToTop).toHaveBeenCalledTimes(1);
});

// it("Api mock calling on component mount ", async () => {
//   const popToTop = jest.fn();
//   const urlMock = {
//     params: {
//       url: "locationUrl",
//     },
//   };
//   const success = {
//     data: { name: "Mockname", type: "Mocktype", dimension: "Mockdimension" },
//   };
//   const fetchEpisode = fetch.mockResponseSuccess(JSON.stringify(success));
//   await act(async () => {
//     const { getByTestId } = await render(
//       <DetailScreen route={urlMock} navigation={{ popToTop }} />
//     );
//     expect(getByTestId("episodeNameId").props.children).toBe(success.data.name);
//   });
// });

it("Api mock calling on component mount success", async () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "locationUrl",
    },
  };
  const success = {
    name: "Mockname",
    type: "Mocktype",
    dimension: "Mockdimension",
  };
  const fetchLocation = fetch.mockResponseSuccess(JSON.stringify(success));
  await act(async () => {
    const { getByTestId } = await render(
      <DetailScreen route={urlMock} navigation={{ popToTop }} />
    );
    expect(getByTestId("detailNameId").props.children).toBe("Mockname");
    expect(getByTestId("detailTypeId").props.children).toBe("Mocktype");
    expect(getByTestId("detailDimensionId").props.children).toBe(
      "Mockdimension"
    );
  });
  await waitFor(() => expect(fetchLocation).toHaveBeenCalledTimes(1));
});

it("Api mock calling on component mount error", async () => {
  const popToTop = jest.fn();
  const urlMock = {
    params: {
      url: "locationUrl",
    },
  };
  const error = {
    message: "Mockerror",
  };
  const fetchLocation = fetch.mockResponseFailure(error);
  await act(async () => {
    const { getByTestId } = await render(
      <DetailScreen route={urlMock} navigation={{ popToTop }} />
    );
    expect(getByTestId("detailNameId").props.children).toBeUndefined();
    expect(getByTestId("detailTypeId").props.children).toBeUndefined();
    expect(getByTestId("detailDimensionId").props.children).toBeUndefined();
  });
  await waitFor(() => expect(fetchLocation).toHaveBeenCalledTimes(1));
});
