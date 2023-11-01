const allResourceTypes = Object.values(
  chrome.declarativeNetRequest.ResourceType,
);

const rules = [
  {
    id: 1,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: "x-test-header",
          value: "test-value",
        },
      ],
    },
    condition: {
      urlFilter: "*",
      resourceTypes: allResourceTypes,
    },
  },
];

export default rules;
