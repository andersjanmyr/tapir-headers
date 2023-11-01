export const allResourceTypes = [
  "csp_report",
  "font",
  "image",
  "main_frame",
  "media",
  "object",
  "other",
  "ping",
  "script",
  "stylesheet",
  "sub_frame",
  "webbundle",
  "websocket",
  "webtransport",
  "xmlhttprequest",
];

const headerOps = ["append", "set", "remove"];

const defaultConfig = {
  version: "1.0",
  urlHeaders: [
    {
      url: {
        pattern: "*",
        type: "url", // url, regex
      },
      headers: [
        {
          op: "set", // append, set, remove
          header: "x-header",
          value: "x-value",
        },
      ],
    },
  ],
};

export default class Config {
  constructor() {
    this.data = defaultConfig;
  }

  init(config) {
    this.data = config;
  }

  initFromJSON(json) {
    this.data = JSON.parse(json);
  }

  toJSON() {
    return JSON.stringify(this.data);
  }

  toRules() {
    const rules = [];
    this.data.urlHeaders.forEach((urlHeader) => {
      const condition = this.toCondition(urlHeader.url);
      urlHeader.headers.forEach((header) => {
        rules.push(this.toRule(header, condition));
      });
    });
    return rules;
  }

  toCondition({ pattern, type }) {
    const condition = {
      resourceTypes: allResourceTypes,
    };
    if (type == "url") {
      condition["urlFilter"] = pattern;
    } else {
      condition["regexFilter"] = pattern;
    }
    return condition;
  }

  toRule(headers, condition) {
    return {
      id: 1,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          {
            operation: headers.op,
            header: headers.header,
            value: headers.value,
          },
        ],
      },
      condition,
    };
  }
}
