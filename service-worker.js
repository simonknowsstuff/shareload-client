chrome.downloads.onDeterminingFilename.addListener((item) => {
  const downloadInfo = {
    filename: item.filename,
    src: item.finalUrl,
    mime: item.mime,
  };
  chrome.storage.session.set({ downloadInfo }, () => {
    console.log("Download info saved: ", downloadInfo);
  });

  let serverUrl = "http://127.0.0.1:6002";

  chrome.storage.local.get(["ip"], (data) => {
    const newIP = data.ip;
    console.log(newIP);
    if (serverUrl != newIP && newIP !== undefined) {
      serverUrl = newIP;
    }
  });

  fetch(serverUrl + "/receive_download", {
    method: "POST",
    body: JSON.stringify(downloadInfo),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        chrome.downloads.cancel(item.id, () => {
          // Cancel file if data has been sent to the server.
          console.log("Download link sent to server successfully!");
        });
      } else {
        console.error("Error sending download link: ", response.statusText);
        chrome.storage.local.set({ lastError: response.statusText });
      }
    })
    .catch((error) => {
      console.error("Error sending download link: ", error);
      chrome.storage.local.set({ lastError: error });
    });
});
