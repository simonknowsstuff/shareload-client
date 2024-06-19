chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchDownloads") {
    chrome.downloads.search({ state: "in_progress" }, (results) => {
      const urls = results.map((download) => download.url);
      sendResponse({ urls });
    });
    return true;
  } else if (request.action === "viewHistory") {
    chrome.tabs.create({ url: chrome.runtime.getURL("history.html") });
  }
});
