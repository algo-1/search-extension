// Function to create the search bar
function createSearchBar() {
  // Create a search bar container element
  const searchBarContainer = document.createElement('div');
  searchBarContainer.style.position = 'fixed';
  searchBarContainer.style.top = '10px';
  searchBarContainer.style.right = '10px';
  searchBarContainer.style.zIndex = '9999';
  searchBarContainer.style.width = '30%';
  searchBarContainer.style.padding = '10px';
  searchBarContainer.style.backgroundColor = '#f8f8f8';
  searchBarContainer.style.borderRadius = '5px';
  searchBarContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';

  // Create a search bar element
  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.placeholder = 'Ask Me Anything...';
  searchBar.style.width = '100%';
  searchBar.style.marginBottom = '10px';
  searchBar.style.padding = '8px';
  searchBar.style.border = '1px solid #ccc';
  searchBar.style.borderRadius = '3px';

  // Create a search button
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchButton.style.width = '100%';
  searchButton.style.padding = '8px';
  searchButton.style.backgroundColor = '#0078D7';
  searchButton.style.color = 'white';
  searchButton.style.border = 'none';
  searchButton.style.borderRadius = '3px';
  searchButton.style.cursor = 'pointer';

  // Create the first dropdown box (Filter by Organization)
  const dropdown1 = document.createElement('select');
  dropdown1.style.width = '100%';
  dropdown1.style.marginBottom = '10px';
  dropdown1.style.padding = '8px';
  dropdown1.style.border = '1px solid #ccc';
  dropdown1.style.borderRadius = '3px';

  // Create options for dropdown1 (organizations)
  const organizations = ['Organization 1', 'Organization 2', 'Organization 3'];
  organizations.forEach((organization) => {
    const option = document.createElement('option');
    option.text = organization;
    dropdown1.add(option);
  });

  // Create the second dropdown box (Filter by Team)
  const dropdown2 = document.createElement('select');
  dropdown2.style.width = '100%';
  dropdown2.style.padding = '8px';
  dropdown2.style.border = '1px solid #ccc';
  dropdown2.style.borderRadius = '3px';

  // Create options for dropdown2 (teams)
  const teams = ['Team 1', 'Team 2', 'Team 3'];
  teams.forEach((team) => {
    const option = document.createElement('option');
    option.text = team;
    dropdown2.add(option);
  });

  // Append elements to the search bar container
  searchBarContainer.appendChild(searchBar);
  searchBarContainer.appendChild(searchButton);
  searchBarContainer.appendChild(document.createTextNode('Filter by Organization:'));
  searchBarContainer.appendChild(dropdown1);
  searchBarContainer.appendChild(document.createTextNode('Filter by Team:'));
  searchBarContainer.appendChild(dropdown2);

  // Append the search bar container to the body of the webpage
  document.body.appendChild(searchBarContainer);
}

// Function to toggle the search bar visibility
function toggleSearchBar() {
  const searchBarContainer = document.querySelector('#searchBarContainer');
  if (searchBarContainer.style.display === 'none') {
    searchBarContainer.style.display = 'block';
    localStorage.setItem('searchBarToggled', 'true');
  } else {
    searchBarContainer.style.display = 'none';
    localStorage.setItem('searchBarToggled', 'false');
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'toggleSearchBar') {
    toggleSearchBar();
  }
});

// Create the search bar on page load
createSearchBar();

// Get the toggle state from localStorage
const isToggled = localStorage.getItem('searchBarToggled') === 'true';

// Set the initial visibility of the search bar
const searchBarContainer = document.querySelector('#searchBarContainer');
searchBarContainer.style.display = isToggled ? 'block' : 'none';

// Inform the background script of the current toggle state
chrome.runtime.sendMessage({ action: 'getToggleState' }, function (response) {
  if (!response || response.toggled !== isToggled) {
    toggleSearchBar();
  }
});
