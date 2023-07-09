let toggledSearchBar = true;

// Called when the user clicks on the browser action.
chrome.action.onClicked.addListener(async (tab) => {
  // Send a message to the active tab
  toggledSearchBar = !toggledSearchBar;
  const response = await chrome.tabs.sendMessage(tab.id, {
    show_content: toggledSearchBar,
  });
});
