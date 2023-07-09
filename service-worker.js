function toggleSearchBar(tab) {
  chrome.tabs.sendMessage(tab.id, { action: 'toggleSearchBar' });
}

chrome.browserAction.onClicked.addListener(toggleSearchBar);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'getToggleState') {
    sendResponse({ toggled: localStorage.getItem('searchBarToggled') === 'true' });
  }
});