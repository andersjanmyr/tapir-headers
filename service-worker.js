import defaultRules from "./default-rules.js";

chrome.storage.local
  .get()
  .then((config) => {
    console.log("config", config);
    let rules;
    if (config) {
      try {
        rules = JSON.parse(config.rules);
      } catch (err) {
        console.log(err);
      }
    }
    if (!rules) {
      rules = defaultRules;
    }

    chrome.storage.local.set({ rules: JSON.stringify(rules) });

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((rule) => rule.id),
      addRules: rules,
    });
  })
  .catch((err) => {
    console.log("Err", err);
  });
