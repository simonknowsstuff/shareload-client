function updateDownloadInfo() {
  const infoText = document.getElementById('downloadInfoText');
  const moreInfo = document.getElementById('downloadMoreInfo');
  chrome.storage.local.get(['downloadInfo'], (data) => {
    const downloadInfo = data.downloadInfo;
    if (downloadInfo) {
      infoText.textContent = downloadInfo.filename + ' is being downloaded!';
      moreInfo.textContent = `Source: ${downloadInfo.src}
      MIME type: ${downloadInfo.mime}`;
    } else {
      infoText.textContent = 'No recent downloads detected.';
      moreInfo.textContent = 'No info yet.';
    }
  });
}

// This is temporary. May be removed.
document.getElementById('clearUrl').addEventListener('click', () => {
  chrome.storage.local.remove('downloadInfo');
});

document.getElementById('confirmIP').addEventListener('click', () => {
  // TODO: Check if server IP is valid, and perhaps add in a regex to filter the IP.
  // For now, the entered IP should not end with '/'
  // Default IP is http://127.0.0.1:6002
  const ipText = document.getElementById('serverIP').value;
  chrome.storage.local.set({ ip: ipText }, () => {
      console.log('Set new ip to: ', ipText);
  });
});

document.getElementById('viewMore').addEventListener('click', () => {
  const moreInfo = document.getElementById('downloadMoreInfo');
  if (moreInfo.style.display === 'none') {
    moreInfo.style.display = 'inline';
  } else {
    moreInfo.style.display = 'none';
  }
});

// Update the info on the screen regardless of whatever happens.
chrome.storage.local.onChanged.addListener(() => {
  updateDownloadInfo();
});
updateDownloadInfo();

