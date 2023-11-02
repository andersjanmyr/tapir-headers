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
        comment: "All sites",
      },
      requestHeaders: [
        {
          op: "set", // set, remove
          header: "x-header",
          value: "x-value",
          comment: "possible values: x-value",
        },
      ],
      responseHeaders: [],
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
    return this.data.urlHeaders.map(this.toRule, this);
  }

  toRule(urlHeader) {
    const condition = this.toCondition(urlHeader.url);
    return {
      id: 1,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: this.toHeaders(urlHeader.requestHeaders),
        responseHeaders: this.toHeaders(urlHeader.responseHeaders),
      },
      condition,
    };
  }

  toHeaders(headers) {
    return headers.map((h) => ({
      operation: h.op,
      header: h.header,
      value: h.value,
    }));
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
}
