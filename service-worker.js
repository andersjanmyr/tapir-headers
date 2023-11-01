import Config from "./config.js";

chrome.storage.local
  .get("config")
  .then((data) => {
    const config = new Config();
    console.log(data, data.config);
    if (data.config) {
      try {
        config.initFromJSON(data.config);
      } catch (err) {
        console.log(err);
      }
    }

    chrome.storage.local.set({ config: config.toJSON() });

    const rules = config.toRules();
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((rule) => rule.id),
      addRules: rules,
    });
  })
  .catch((err) => {
    console.log("Err", err);
  });
