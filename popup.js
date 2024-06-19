document.getElementById("fetchUrls").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "fetchDownloads" }, (response) => {
    const urlList = document.getElementById("urlList");
    urlList.innerHTML = "";
    response.urls.forEach((url) => {
      const li = document.createElement("li");
      li.textContent = url;
      urlList.appendChild(li);
    });

    chrome.storage.local.get({ downloadHistory: [] }, (result) => {
      const history = result.downloadHistory.concat(response.urls);
      chrome.storage.local.set({ downloadHistory: history });
    });
  });
});

document.getElementById("clearUrls").addEventListener("click", () => {
  document.getElementById("urlList").innerHTML = "";
});

document.getElementById("viewHistory").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "viewHistory" });
});
