function updateDownloadInfo() {
  const infoText = document.getElementById("downloadInfoText");
  const moreInfo = document.getElementById("downloadMoreInfo");
  const errorDiv = document.getElementById("error");
  chrome.storage.session.get(["downloadInfo"], (data) => {
    if (chrome.runtime.lastError) {
      errorDiv.textContent = `Error: ${chrome.runtime.lastError.message}`;
    }
    const downloadInfo = data.downloadInfo;
    if (downloadInfo) {
      infoText.textContent = downloadInfo.filename + " is being downloaded!";
      moreInfo.textContent = `Source: ${downloadInfo.src}
      MIME type: ${downloadInfo.mime}`;
    } else {
      infoText.textContent = "No recent downloads detected.";
      moreInfo.textContent = "No info yet.";
    }
  });

  chrome.storage.local.get(["lastError"], (result) => {
    if (result.lastError) {
      errorDiv.textContent = `Error: ${result.lastError.message}`;
      // Clear the error after displaying it
      chrome.storage.local.remove("lastError");
    } else {
      errorDiv.textContent = "";
    }
  });
}

document.getElementById("confirmIP").addEventListener("click", () => {
  const ipRegex =
    /^(http:\/\/)?((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d{1,5}$/;

  const ipText = document.getElementById("serverIP").value;
  if (!ipRegex.test(ipText)) {
    alert("Invalid IP address");
    document.getElementById("serverIP").value = "http://127.0.0.1:5000";
    return;
  }

  chrome.storage.local.set({ ip: ipText }, () => {
    console.log("Set new ip to: ", ipText);
  });
});

document.getElementById("viewMore").addEventListener("click", () => {
  const moreInfo = document.getElementById("downloadMoreInfo");
  if (moreInfo.style.display === "none") {
    moreInfo.style.display = "inline";
  } else {
    moreInfo.style.display = "none";
  }
});

// Update the info on the screen regardless of whatever happens.
chrome.storage.session.onChanged.addListener(() => {
  updateDownloadInfo();
});
updateDownloadInfo();
