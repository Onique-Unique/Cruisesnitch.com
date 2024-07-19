// Retrieve favorites from localStorage or initialize as an empty array
let favorites = JSON.parse(localStorage.getItem('etsy-favorites')) || [];

// Function to create and show the overlay with the search bar
function showSearchBar(textarea) {
    // Create the overlay elements
    const overlay = document.createElement('div');
    const modifiedText = document.createElement('span');
    const input = document.createElement('input');
    const confirmButton = document.createElement('button');

    // Styling for overlay
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '80px'; // Top 80 pixels of the page
    overlay.style.backgroundColor = '#1F1F1F'; // Semi-transparent black
    overlay.style.zIndex = '999'; // Ensure it's above other content
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    // Add "Modified" text to overlay
    modifiedText.textContent = 'Modified';
    modifiedText.style.color = 'white';
    modifiedText.style.marginRight = '10px';
    overlay.appendChild(modifiedText);

    // Add Google logo to overlay
    const logo = document.createElement('img');
    logo.src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png';
    logo.alt = 'Google Logo';
    logo.style.width = '100px';
    logo.style.marginRight = '20px';
    overlay.appendChild(logo);

    // Styling for input
    input.style.marginRight = '10px';
    input.style.backgroundColor = '#fff';
    input.style.border = 'none';
    input.style.width = '40%';
    input.style.color = 'black';
    input.style.padding = '10px';
    input.style.borderRadius = '25px';
    input.placeholder = 'add product type or niche keyword here'; // Placeholder text

    // Styling for confirm button
    confirmButton.textContent = 'Search';
    confirmButton.style.padding = '10px 15px';
    confirmButton.style.backgroundColor = '#edff40';
    confirmButton.style.color = 'black';
    confirmButton.style.fontSize = '14px';
    confirmButton.style.border = 'none';
    confirmButton.style.borderRadius = '25px';

    // Add hover effect for confirm button
    confirmButton.style.cursor = 'pointer';
    confirmButton.addEventListener('mouseover', () => {
        confirmButton.style.backgroundColor = '#d3d3d3';
    });
    confirmButton.addEventListener('mouseout', () => {
        confirmButton.style.backgroundColor = '#edff40';
    });

    // Append elements to the overlay
    overlay.appendChild(input);
    overlay.appendChild(confirmButton);
    document.body.appendChild(overlay);

    // Add event listener to the confirm button
    confirmButton.addEventListener('click', () => {
        const newText = input.value.trim();
        if (newText) {
            handleIntitleText(newText, textarea, true); // Set reload to true
        }
        document.body.removeChild(overlay); // Remove overlay on confirm
    });

    // Update document title based on textarea content
    updateDocumentTitle(textarea);
}

// Function to handle the text inside the textarea
function handleIntitleText(newText, textarea, reload = false) {
    const intitleIndex = textarea.value.indexOf('intitle:');
    if (intitleIndex !== -1) {
        const beforeIntitle = textarea.value.substring(0, intitleIndex + 8);
        textarea.value = beforeIntitle + newText;
        if (reload) {
            const searchButton = document.querySelector('.Tg7LZd');
            if (searchButton) {
                searchButton.click();
            }
        } else {
            showNotification('Search query updated!');
        }
    }
}

// Function to update the document title based on textarea content
function updateDocumentTitle(textarea) {
    const intitleIndex = textarea.value.indexOf('intitle:');
    if (intitleIndex !== -1) {
        const afterIntitle = textarea.value.substring(intitleIndex + 8).trim();
        document.title = afterIntitle + ' Search'; // Update title with "Google" and the last word after "intitle:"
    } else {
        document.title = 'Google Mod'; // Default title if "intitle:" is not found
    }
}

// Function to check and handle textareas
function checkAndHandleTextareas() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        if (textarea.value.includes('site:etsy.com')) {
            // Hide textarea immediately with CSS
            const style = document.createElement('style');
            style.textContent = 'textarea { display: none !important; }';
            document.head.append(style);

            // Show search bar if "site:" is present
            showSearchBar(textarea);
            createDropdownButtons(textarea); // Create the dropdown buttons
            analyzeAndDisplayH3Texts(); // Analyze and display h3 texts in word soup
            addDownloadFavoritesButton();
        }
    });
}

// Function to create dropdown buttons
function createDropdownButtons(textarea) {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '140px';
    buttonContainer.style.right = '20px';
    buttonContainer.style.backgroundColor = '#333';
    buttonContainer.style.border = '1px solid #ccc';
    buttonContainer.style.padding = '10px';
    buttonContainer.style.borderRadius = '5px';
    buttonContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    buttonContainer.style.zIndex = '999';
    buttonContainer.style.textAlign = 'center';

    // Add Etsy logo above buttons
    const etsyLogo = document.createElement('img');
    etsyLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Etsy_logo_lg_rgb.png';
    etsyLogo.alt = 'Etsy Logo';
    etsyLogo.style.width = '100px';
    etsyLogo.style.marginBottom = '10px';
    buttonContainer.appendChild(etsyLogo);

    const buttons = [
        { text: 'site:etsy.com/listing intext:people bought this in the last intext:Bestseller intext:Ships from intitle:shirt', label: 'people bought last 24hrs Bestsellers' },
        { text: 'site:etsy.com/listing intext:In 20+ carts intext:Bestseller intext:Ships from intitle:shirt', label: 'in 20+ carts Bestsellers' },
        { text: 'site:etsy.com/listing intext:views in the last 24 hours intext:Bestseller intext:Ships from intitle:shirt', label: 'views in last 24hrs Bestsellers' }
    ];

    buttons.forEach((buttonData, index) => {
        const button = document.createElement('button');
        button.textContent = buttonData.label;
        button.style.display = 'block';
        button.style.width = '100%';
        button.style.marginBottom = '5px';
        button.style.padding = '10px';
        button.style.backgroundColor = '#1E90FF';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '15px';
        button.style.cursor = 'pointer';

        button.addEventListener('click', () => {
            textarea.value = buttonData.text;
            showNotification(`Textarea updated with "${buttonData.label}" content`);
        });

        buttonContainer.appendChild(button);
    });

    document.body.appendChild(buttonContainer);
}

// Function to show a notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '50px';
    notification.style.right = '50%';
    notification.style.transform = 'translateX(50%)';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '15px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s';

    document.body.appendChild(notification);

    // Fade in the notification
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);

    // Fade out and remove the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Function to find and display review counts
function findAndDisplayReviewCounts() {
    const spans = document.querySelectorAll('span');
    const reviewCounts = [];

    spans.forEach(span => {
        const textContent = span.textContent;
        const match = textContent.match(/(\d{1,3}(,\d{3})*) reviews/);
        if (match) {
            // Remove commas and parse as a number
            const reviewCount = parseInt(match[1].replace(/,/g, ''), 10);
            reviewCounts.push(reviewCount);
            // span.style.display = 'none'; // Hide the span
        }
    });

    const targetDivs = document.querySelectorAll('.ChPIuf');
    targetDivs.forEach((div, index) => {
        if (reviewCounts[index] !== undefined) {
            const multipliedReviewCount = reviewCounts[index] * 4.2; // Multiply by 4.45
            const verifiedPurchasesText = document.createElement('span');
            verifiedPurchasesText.classList.add("verifiedPurchasesText");
            verifiedPurchasesText.textContent = `${Math.ceil(multipliedReviewCount)}+ shop verified purchases`;
            verifiedPurchasesText.style.backgroundColor = '#e15c00'; // Set background color to orange
            verifiedPurchasesText.style.color = 'white'; // Set text color to white
            verifiedPurchasesText.style.padding = '2px 5px'; // Add some padding for better appearance
            verifiedPurchasesText.style.borderRadius = '5px'; // Round the corners
            verifiedPurchasesText.style.display = 'block'; // Ensure each span is on a new line
            verifiedPurchasesText.style.width = 'max-content'; // Background color fits length of content inside
            div.appendChild(verifiedPurchasesText);

            if(multipliedReviewCount < 2000){
                const recommendationText = document.createElement('span');
                recommendationText.textContent = "On the rise";
                recommendationText.style.marginLeft = '10px';
                recommendationText.style.backgroundColor = 'green'; // Set background color to green
                recommendationText.style.color = 'white'; // Set text color to white
                recommendationText.style.padding = '2px 5px'; // Add some padding for better appearance
                recommendationText.style.borderRadius = '5px'; // Round the corners
                recommendationText.style.display = 'inline'; // Display inline-block to appear next to verifiedPurchasesText
                recommendationText.style.width = 'max-content'; // Background color fits length of content inside
                verifiedPurchasesText.insertAdjacentElement('beforebegin', recommendationText); // Insert directly after verifiedPurchasesText
            }
        }
    });
}
function analyzeAndDisplayH3Texts() {
    // Extract text from all h3 tags
    const h3Tags = document.querySelectorAll('h3');
    const textArray = [];

    h3Tags.forEach(h3 => {
        // Remove numbers and special characters, and split into words
        const words = h3.textContent.replace(/[^a-zA-Z\s]/g, '').split(/\s+/);
        words.forEach(word => {
            if (word.trim().length >= 3) { // Ensure words are 3 or more letters
                textArray.push(word.trim());
            }
        });
    });

    // Create the popup container
    const popupContainer = document.createElement('div');
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = 'calc(140px + 35%)'; // Adjust position beneath buttonContainer
    popupContainer.style.right = '20px';
    popupContainer.style.backgroundColor = '#333333';
    popupContainer.style.border = '1px solid #ccc';
    popupContainer.style.padding = '10px';
    popupContainer.style.borderRadius = '5px';
    popupContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    popupContainer.style.zIndex = '999';
    popupContainer.style.display = 'flex';
    popupContainer.style.flexWrap = 'wrap';
    popupContainer.style.width = '235px'; // Set a fixed width
    popupContainer.style.height = '200px';
    popupContainer.style.overflowY = 'scroll';
    popupContainer.style.justifyContent = 'center'; // Center the content

    // Create the heading
    const heading = document.createElement('h3');
    heading.textContent = 'Word Soup';
    heading.style.color = 'white';
    heading.style.width = '100%';
    heading.style.textAlign = 'center'; // Center the heading
    heading.style.marginBottom = '10px';
    popupContainer.appendChild(heading);

    // Create a map to count occurrences of each word
    const wordCount = new Map();
    textArray.forEach(word => {
        word = word.toLowerCase(); // Normalize words to lowercase
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });

    // Convert map to sorted array
    const sortedWords = Array.from(wordCount.entries()).sort((a, b) => b[1] - a[1]);

    // Create buttons for each word
    sortedWords.forEach(([word]) => {
        const wordButton = document.createElement('button');
        wordButton.textContent = word;
        wordButton.style.backgroundColor = '#4CAF50';
        wordButton.style.color = 'white';
        wordButton.style.border = 'none';
        wordButton.style.borderRadius = '5px';
        wordButton.style.margin = '2px';
        wordButton.style.padding = '5px 10px';
        wordButton.style.cursor = 'pointer';
        wordButton.style.flex = '0 1 auto'; // Ensure buttons are flexible

        // Add hover effect
        wordButton.addEventListener('mouseover', () => {
            wordButton.style.backgroundColor = '#3e8e41';
        });
        wordButton.addEventListener('mouseout', () => {
            wordButton.style.backgroundColor = '#4CAF50';
        });

        // Add click event to copy text to clipboard
        wordButton.addEventListener('click', () => {
            navigator.clipboard.writeText(word).then(() => {
                showNotification(`Copied "${word}" to clipboard`);
            }).catch(err => {
                showNotification(`Failed to copy: ${err}`);
            });
        });

        popupContainer.appendChild(wordButton);
    });

    document.body.appendChild(popupContainer);
}

// Function to mark/unmark favorites
function toggleFavorite(result, favoriteButton) {
    const url = result.querySelector('a').href;
    const index = favorites.indexOf(url);
    if (index === -1) {
        favorites.push(url);
        result.style.backgroundColor = '#FFFFE0'; // Highlight favorite result
    } else {
        favorites.splice(index, 1);
        result.style.backgroundColor = ''; // Remove highlight
    }
    localStorage.setItem('etsy-favorites', JSON.stringify(favorites)); // Save favorites to localStorage
}

// Function to download favorites as TXT
function downloadFavoritesAsTXT() {
    let txtContent = "Favorites URLs\n";
    favorites.forEach(url => {
        txtContent += url + "\n";
    });

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'favorites.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add favorite buttons to search results
function addFavoriteButtons() {
    const searchResults = document.querySelectorAll('.g');
    searchResults.forEach(result => {
        const verifiedPurchasesText = result.querySelector('.verifiedPurchasesText');
        if (verifiedPurchasesText) {
            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = '❤';
            favoriteButton.style.marginLeft = '10px';
            favoriteButton.style.backgroundColor = '#c6c6c6';
            favoriteButton.style.color = '#ff0000';
            favoriteButton.style.border = '1px solid white';
            favoriteButton.style.borderRadius = '10px';
            favoriteButton.style.cursor = 'pointer';
            favoriteButton.style.fontSize = '20px';
            favoriteButton.style.verticalAlign = 'middle';
            favoriteButton.style.display = 'inline-block';

            favoriteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent opening the link
                event.preventDefault(); // Prevent default link behavior
                toggleFavorite(result, favoriteButton);
            });

            verifiedPurchasesText.insertAdjacentElement('beforeend', favoriteButton);

            const url = result.querySelector('a').href;
            if (favorites.includes(url)) {
                result.style.backgroundColor = '#FFFFE0'; // Highlight favorite result if already in favorites
            }
        }
    });
}

// Add download favorites button to the page
function addDownloadFavoritesButton() {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Favorites';
    downloadButton.style.position = 'fixed';
    downloadButton.style.bottom = '10px';
    downloadButton.style.right = '20px';
    downloadButton.style.fontSize = '12px';
    downloadButton.style.padding = '10px 20px';
    downloadButton.style.backgroundColor = '#808080';
    downloadButton.style.color = '#fff';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.cursor = 'pointer';
    downloadButton.addEventListener('click', downloadFavoritesAsTXT);

    document.body.appendChild(downloadButton);
}

// Add an event listener for URL changes
window.addEventListener('urlchange', () => {
    setTimeout(checkAndHandleTextareas, 10); // Delay of 10 milliseconds
    setTimeout(findAndDisplayReviewCounts, 10); // Delay of 10 milliseconds
});

// Execute the functions once on page load
checkAndHandleTextareas();
findAndDisplayReviewCounts();
addFavoriteButtons();