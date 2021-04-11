import { statusIndicator, keyExtractor } from "../../common/utils";

test("statusIndicator", () => {
  expect(statusIndicator("Alive")).toEqual("#28a745");
  expect(statusIndicator("Dead")).toEqual("#dc3545");
  expect(statusIndicator("unknown")).toEqual("#E4E4E4");
});

test("keyExtractor", () => {
  expect(keyExtractor({ id: 1 })).toEqual("1");
});
