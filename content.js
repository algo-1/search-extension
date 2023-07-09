const USER_TEAM = "Team A";
const USER_ORG = "Organization A";
const USER_ROLE = "SWE";
const DEFAULT_DOC_SOURCE = "Source A";

// Add listener that listens to message from service-worker
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const { show_content } = message;
  const searchBarContainer = document.querySelector("#searchBarContainer");
  show_content
    ? (searchBarContainer.style.display = "block")
    : (searchBarContainer.style.display = "none");

  sendResponse({
    message: `ACK! Received message from ${JSON.stringify(sender)}`,
  });
});

const mockData = [
  {
    organization: "Organization A",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    team: "Team A",
    role: "SWE",
    dataSource: "Source A",
  },
  {
    organization: "Organization B",
    snippet:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    team: "Team B",
    role: "PM",
    dataSource: "Source B",
  },
  {
    organization: "Organization C",
    snippet:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    team: "Team Z",
    role: "PM",
    dataSource: "Source A",
  },
  {
    organization: "Organization D",
    snippet:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    team: "Team A",
    role: "SWE",
    dataSource: "Source C",
  },
  {
    organization: "Organization E",
    snippet:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    team: "Team B",
    role: "PM",
    dataSource: "Source B",
  },
  {
    organization: "Organization A",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    team: "Team Z",
    role: "Business Analyst",
    dataSource: "Source A",
  },
  {
    organization: "Organization B",
    snippet:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    team: "Team B",
    role: "PM",
    dataSource: "Source B",
  },
  {
    organization: "Organization C",
    snippet:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    team: "Team A",
    role: "PM",
    dataSource: "Source A",
  },
  {
    organization: "Organization D",
    snippet:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    team: "Team Z",
    role: "Business Analyst",
    dataSource: "Source C",
  },
  {
    organization: "Organization E",
    snippet:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    team: "Team X",
    role: "SWE",
    dataSource: "Source B",
  },
];

// Function to create the search bar
function createSearchBar() {
  // Create a search bar container element
  const searchBarContainer = document.createElement("div");
  searchBarContainer.id = "searchBarContainer";

  searchBarContainer.setAttribute("title", "Custom Work Search");
  searchBarContainer.style.position = "fixed";
  searchBarContainer.style.top = "10px";
  searchBarContainer.style.right = "10px";
  searchBarContainer.style.zIndex = "9999";
  searchBarContainer.style.width = "30%";
  searchBarContainer.style.padding = "10px";
  searchBarContainer.style.backgroundColor = "#f8f8f8";
  searchBarContainer.style.borderRadius = "5px";
  searchBarContainer.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";

  // Create the first dropdown box
  const dropdown1 = document.createElement("select");
  dropdown1.style.width = "100%";
  dropdown1.style.marginBottom = "10px";
  dropdown1.style.padding = "8px";
  dropdown1.style.border = "1px solid #ccc";
  dropdown1.style.borderRadius = "3px";

  // Create options for dropdown1
  const filter_one = ["Team", "Organization", "Role", "Document Source"];
  filter_one.forEach((filter) => {
    const option = document.createElement("option");
    option.text = filter;
    dropdown1.add(option);
  });

  // Function to update the options of the second dropdown based on the selection of the first dropdown
  function updateDropdown2() {
    const selectedLevel = dropdown1.value;

    // Clear existing options
    dropdown2.innerHTML = "";

    // Populate options based on the selected options
    if (selectedLevel === "Organization") {
      const orgs = [...new Set(mockData.map((data) => data.organization))];
      orgs.forEach((org) => {
        const option = document.createElement("option");
        option.text = org;
        dropdown2.add(option);
      });
    } else if (selectedLevel === "Team") {
      const teams = [...new Set(mockData.map((data) => data.team))];
      teams.forEach((team) => {
        const option = document.createElement("option");
        option.text = team;
        dropdown2.add(option);
      });
    } else if (selectedLevel === "Role") {
      const roles = [...new Set(mockData.map((data) => data.role))];
      roles.forEach((role) => {
        const option = document.createElement("option");
        option.text = role;
        dropdown2.add(option);
      });
    } else if (selectedLevel === "Document Source") {
      const docs = [...new Set(mockData.map((data) => data.dataSource))];
      docs.forEach((doc) => {
        const option = document.createElement("option");
        option.text = doc;
        dropdown2.add(option);
      });
    }
  }

  // Add event listener to the first dropdown to trigger updating the second dropdown
  dropdown1.addEventListener("change", updateDropdown2);
  // Create the second dropdown box (Filter by Team)
  const dropdown2 = document.createElement("select");
  dropdown2.style.width = "100%";
  dropdown2.style.padding = "8px";
  dropdown2.style.border = "1px solid #ccc";
  dropdown2.style.borderRadius = "3px";

  // default is Teams
  const teams = [...new Set(mockData.map((data) => data.team))];
  teams.forEach((team) => {
    const option = document.createElement("option");
    option.text = team;
    dropdown2.add(option);
  });

  // Create a search button
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchButton.style.width = "100%";
  searchButton.style.padding = "8px";
  searchButton.style.backgroundColor = "#0078D7";
  searchButton.style.color = "white";
  searchButton.style.border = "none";
  searchButton.style.borderRadius = "3px";
  searchButton.style.cursor = "pointer";
  searchButton.onclick = () => {
    performSearch(dropdown1, dropdown2, searchResultsContainer);
  };

  // Append elements to the search bar container
  searchBarContainer.appendChild(document.createTextNode("Custom Work Search"));
  searchBarContainer.appendChild(document.createTextNode("Filter Criteria:"));
  searchBarContainer.appendChild(dropdown1);
  searchBarContainer.appendChild(document.createTextNode(`Filter by:`));
  searchBarContainer.appendChild(dropdown2);
  searchBarContainer.appendChild(searchButton);

  // Create a container for displaying search results
  const searchResultsContainer = document.createElement("div");
  searchResultsContainer.id = "searchResultsContainer";

  // Append the search button and search results container to the searchBarContainer
  searchBarContainer.appendChild(searchResultsContainer);
  searchButton.addEventListener(
    "click",
    performSearch(dropdown1, dropdown2, searchResultsContainer)
  );
  // Append the search bar container to the body of the webpage
  document.body.appendChild(searchBarContainer);
}

// TO DO: Make this work so as to return search result container below the searcbar container

// Function to perform search based on selected filters
function performSearch(dropdown1, dropdown2, searchResultsContainer) {
  let selectedLevel = dropdown1.value;
  let selectedValue = dropdown2.value;

  // The filtering defaults to the user's team
  if (!selectedLevel) {
    selectedLevel = "Team";
    selectedValue = USER_TEAM;
  } else if (!selectedValue) {
    switch (selectedLevel) {
      case "Organization":
        selectedValue = USER_ORG;
        break;
      case "Team":
        selectedValue = USER_TEAM;
        break;
      case "Role":
        selectedValue = USER_ROLE;
        break;
      case "Document Source":
        selectedValue = DEFAULT_DOC_SOURCE;
        break;
      default:
        selectedLevel = "Team";
        selectedValue = USER_TEAM;
    }
  }

  // Clear previous search results
  searchResultsContainer.innerHTML = "";

  const getKey = (selectedLevel) => {
    switch (selectedLevel) {
      case "Organization":
        return "organization";
      case "Team":
        return "team";
      case "Role":
        return "role";
      case "Document Source":
        return "dataSource";
      default:
        return "team";
    }
  };

  // Perform search based on selected filters
  const matchingSnippets = mockData.filter((data) => {
    return data[getKey(selectedLevel)] === selectedValue;
  });

  // Display matching snippets with numbered results
  if (matchingSnippets.length > 0) {
    matchingSnippets.forEach((snippet, index) => {
      const resultElement = document.createElement("div");
      resultElement.textContent = `${index + 1}. ${snippet.snippet}`;
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    const noResultsElement = document.createElement("div");
    noResultsElement.textContent = "No results found.";
    searchResultsContainer.appendChild(noResultsElement);
  }
}

createSearchBar();
