import assert from "assert";
import { default as Config, allResourceTypes } from "./config.js";

describe("Config", function () {
  describe("#toRules()", function () {
    it("should return -1 when the value is not present", function () {
      const config = new Config();
      const expected = [
        {
          action: {
            requestHeaders: [
              {
                header: "x-header",
                operation: "set",
                value: "x-value",
              },
            ],
            responseHeaders: [],
            type: "modifyHeaders",
          },
          condition: {
            resourceTypes: allResourceTypes,
            urlFilter: "*",
          },
          id: 1,
          priority: 1,
        },
      ];
      assert.deepEqual(expected, config.toRules());
    });
  });
});
