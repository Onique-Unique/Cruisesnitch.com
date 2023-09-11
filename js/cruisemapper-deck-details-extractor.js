javascript: (function () {

    // Find all H3 elements with the class "contentTitle"
    const contentTitles = document.querySelectorAll('h3.contentTitle');

    // Initialize an empty array to store the extracted data
    const extractedData = [];

    // Define keywords for each category
    const categoryKeywords = {
        Restaurants: ['restaurant', 'dining', 'eatery', 'food', 'menu', 'cuisine', 'chef', 'buffet', 'dinner', 'breakfast', 'lunch', 'deli'],
        'Bars/ Lounge': ['bar', 'drinks', 'pub', 'adult', 'club', 'cocktails', 'beverages'],
        Recreational: ['pool', 'teen', 'kid', 'child', 'casino', 'youth', 'infant', 'play', 'game', 'recreation', 'activity', 'fitness', 'gym', 'swimming', 'exercise', 'salon', 'wellness', 'beauty', 'treatment', 'massage'],
        Services: ['service', 'amenity', 'facility', 'health', 'medical', 'tender', 'shop', 'souvenir', 'photo'],
        Entertainment: ['entertainment', 'show', 'performance', 'theater', 'concert', 'music', 'comedy', 'cinema'],
    };


    // Loop through each "contentTitle" element
    contentTitles.forEach((title) => {
        // Extract the deck number from the title
        const titleText = title.textContent.trim();
        const deckMatch = titleText.match(/deck (\d+)/i);
        const deckNumber = deckMatch ? deckMatch[1] : null;

        // Find the parent div with class "itemContent" for each title
        const itemContentDiv = title.nextElementSibling;

        // Extract the text from each p and li element within "itemContent"
        const paragraphsAndListItems = itemContentDiv.querySelectorAll('p, li');
        const extractedText = [];

        paragraphsAndListItems.forEach((element) => {
            const elementText = element.textContent.trim();
            if (!/cabin|bridge|suite|bedroom/i.test(elementText)) {
                // Exclude elements containing "cabin," "bridge," or "suite"
                extractedText.push(elementText);
            }
        });

        // Categorize the extracted text based on the earliest keyword occurrence
        const categorizedText = {};

        for (const category in categoryKeywords) {
            categorizedText[category] = [];
        }

        extractedText.forEach((text) => {
            const keywordPositions = {};

            // Find the earliest keyword occurrence in the text
            for (const category in categoryKeywords) {
                const keywords = categoryKeywords[category];
                const keywordPosition = keywords.map(keyword => text.toLowerCase().indexOf(keyword)).reduce((minPos, currentPos) => {
                    if (currentPos !== -1 && (minPos === -1 || currentPos < minPos)) {
                        return currentPos;
                    }
                    return minPos;
                }, -1);

                keywordPositions[category] = keywordPosition;
            }

            // Determine the category with the earliest keyword occurrence
            let earliestCategory = null;
            let earliestPosition = text.length;

            for (const category in categoryKeywords) {
                const position = keywordPositions[category];
                if (position !== -1 && position < earliestPosition) {
                    earliestCategory = category;
                    earliestPosition = position;
                }
            }

            if (earliestCategory) {
                categorizedText[earliestCategory].push(text);
            }
        });

        // Store the extracted data in an object
        const data = {
            deck: deckNumber,
            categories: categorizedText,
        };

        // Add the object to the extractedData array
        extractedData.push(data);
    });

    // Create the popup container
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid #ccc';
    popup.style.zIndex = '9999';
    popup.style.maxWidth = '400px';
    popup.style.maxHeight = '400px'; // Set a maximum height for the popup
    popup.style.overflowY = 'auto'; // Enable vertical scrolling if content exceeds the height

    // Create a close button for the popup
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        popup.remove();
    });

    popup.appendChild(closeButton);

    // Display the extracted data in the popup with categories
    extractedData.forEach((data) => {
        const deckInfo = document.createElement('div');
        deckInfo.innerHTML = `<strong>Deck ${data.deck}</strong><br>`;
        for (const category in data.categories) {
            const elements = data.categories[category];
            if (elements.length > 0) {
                const first100Chars = elements.map(element => element.slice(0, 100));
                deckInfo.innerHTML += `<strong>${category}:</strong><br>${first100Chars.join('<br><br>')}<br><br>`;
            }
        }
        popup.appendChild(deckInfo);
    });

    // Append the popup to the body
    document.body.appendChild(popup);
})();