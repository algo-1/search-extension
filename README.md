# Search Extension

The Work Custom Search Extension is a Chromium extension that injects a search bar into https://bing.com/* web pages, allowing users to search and filter retrieved work results by other dimensions not available on current bing work site. It provides a user-friendly interface with dropdowns for filtering and currently uses MockedData.

## Features

- Adds a search bar to web pages
- Dropdowns for filtering by organization, team, role and Document Source.
- Dynamically updates the second dropdown options based on the selected level on first dropdown.
- Toggle button to show/hide the search bar
- Performs a search based on selected filters and displays matching snippets below the search button
- Results are numbered for easy reference

## Installation

1. Clone or download the repository.

2. Open your Chromium-based browser (e.g., Google Chrome, Edge).

3. In the browser, go to `chrome://extensions` for chrome and `edge://extensions/`.

4. Enable the "Developer mode" toggle button on the top-right corner.

5. Click on the "Load unpacked" button.

6. Select the folder containing the cloned/downloaded extension files.

7. The Search Extension will be installed and ready to use.

## Usage

1. Open `https://bing.com/*` in your Chromium-based browser.

2. The search bar will appear on the right side of the page.

3. Use the first dropdown to choose filter.

4. Depending on the selected organization, the second dropdown will populate with corresponding options.

5. Type your search query in the search bar and press Enter, or click the "Search" button.

6. The matching snippets will be displayed below the search button, numbered for easy reference.

7. Use the toggle button to show or hide the search bar as needed.

## Customization

- If you want to modify the mock data, open the `content.js` file and update the `mockData` array with your desired data entries.

- To change the styling of the search bar, dropdowns, or search results, modify the CSS rules in file.

## Limitations

- The extension currently uses mock data for demonstration purposes. Replace the mock data with your own data or connect to an API for real-time data retrieval.

## Credits

This extension is created using JavaScript, HTML, CSS, and the Chromium extension APIs.

## License

This project is licensed under the [MIT License](License).


