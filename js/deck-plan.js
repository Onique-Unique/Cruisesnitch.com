 // Get the number of decks from the span
 const numberOfDecks = parseInt(document.querySelector('.table-generate').textContent);

 // Get the table body element
 const tableBody = document.querySelector('.deckRows');

 // Calculate the number of rows needed for a two-column layout
 const numRows = Math.ceil(numberOfDecks / 2);

 // Generate table rows with two columns for the dynamically generated rows
 for (let i = 1; i <= numRows; i++) {
     const row = document.createElement('tr');

     // Create the first column
     const cell1 = document.createElement('td');
     cell1.textContent = `Deck ${i * 2 - 1}`;
     cell1.classList.add('generatedRow'); // Add the class for styling
     row.appendChild(cell1);

     // Create the second column if applicable
     if (i * 2 <= numberOfDecks) {
         const cell2 = document.createElement('td');
         cell2.textContent = `Deck ${i * 2}`;
         cell2.classList.add('generatedRow'); // Add the class for styling
         row.appendChild(cell2);
     }

     tableBody.appendChild(row);
 }

 // Uncomment When Digital Products Are Built  vvvv

 // Find the first div-container element on the page
 const divContainerPrepend = document.querySelector('.div-container');

 // Create a new HTML element
 const newElement = document.createElement('div');
 newElement.id = "next-trip-items";

 // Fetch the JSON data from your product.json file
 fetch('/js/products.json')
     .then(response => response.json())
     .then(data => {
         // Find keywords in the description
         const description = document.querySelector('#share-description').textContent.toLowerCase();
         const descriptionWords = description.split(' '); // Split the description into words

         // Find matching products based on title or tags
         const matchingProducts = data.filter(product => {
             const productTitle = product.title.toLowerCase();
             const productTags = product.tags.toLowerCase();

             // Check if any part of the description matches any part of the title or tags
             return descriptionWords.some(word => {
                 return productTitle.includes(word) || productTags.includes(word);
             });
         });

         if (matchingProducts.length > 0) {
             // Sort matching products by the number of matches
             matchingProducts.sort((a, b) => {
                 const aTitle = a.title.toLowerCase();
                 const bTitle = b.title.toLowerCase();
                 const aTags = a.tags.toLowerCase();
                 const bTags = b.tags.toLowerCase();

                 // Count how many words in the description match the title or tags of each product
                 const aMatchCount = descriptionWords.filter(word => aTitle.includes(word) || aTags.includes(word)).length;
                 const bMatchCount = descriptionWords.filter(word => bTitle.includes(word) || bTags.includes(word)).length;

                 // Sort in descending order based on match count
                 return bMatchCount - aMatchCount;
             });

             // Use the first matching product (the one with the most matches)
             const matchingProduct = matchingProducts[0];
             newElement.innerHTML = `
                <div class="suggested-top">
                    <h2> For Your Next Cruise Trip! </h2>
                    <!-- Only one Suggested Item for affiliate -->
                    <div class="wrapper">
                        <div class="item-box">
                            <a href="${matchingProduct.url}" target="_blank">
                                <img loading="lazy" class="suggested-item" border="0" src="/store-products/${matchingProduct.image}" alt="${matchingProduct.title}" title="${matchingProduct.title}" decoding="async">
                            </a>
                            <a href="${matchingProduct.url}" target="_blank" rel="nofollow"><h3 class="suggested-text-item">${matchingProduct.title}</h3></a>
                            <a class="suggest-link" href="${matchingProduct.url}" target="_blank" rel="nofollow">See Item</a>
                        </div>
                    </div>
                    <h3><span>Tip:</span> Add to cart to lock in the cheapest deal!</h3>
                </div>
            `;

             // Get all h2 elements on the page
 let h2Elements = document.querySelectorAll('h2');

 // Loop through all h2 elements
 h2Elements.forEach((h2Element, index) => {
     // Skip the first and last h2 elements
     if (index === 0 || index === h2Elements.length - 1) {
         return;
     }

     // Generate a random number between 0 and 1
     let randomNumber = Math.random();

     // Create the mini-banner div element
     let miniBannerDiv = document.createElement('div');
     miniBannerDiv.className = 'mini-banner aff-banner';
     miniBannerDiv.style.transform = 'scale(.8)';
     miniBannerDiv.style.transition = 'transform 0.5s ease';

     // Create the link element
     let link = document.createElement('a');
     link.href = `${matchingProduct.url}`;
     link.target = '_blank';
     link.rel = 'nofollow';

     // Create Discount Text
     let affDiscount = document.createElement('p');
     affDiscount.className = 'aff-discount';

     // Amazon Version -------------------------------------
     affDiscount.innerText = `Save %10 On Favourited Items`;

     // Personal Product
     // affDiscount.innerText = "Celebrity Skincare Tricks!";

     // Create Coupon Text
     let affCode = document.createElement('p');
     affCode.className = 'aff-code';

     // Amazon Version -------------------------------------
     affCode.innerHTML = `Try Coupon: <span class="aff-code-span">Save %10 On Favourited Items</span> Using Link`;

     // Personal Product
     // affCode.innerHTML = `<span class="aff-code-span">Keep It Secret</span> Use The Link`;

     // Create the button element
     let button = document.createElement('button');
     button.className = 'mini-banner-btn aff-banner-btn';

     // Create the text element
     let text = document.createElement('p');
     text.className = 'mini-banner-text';

     // Amazon Version ------------------------------------
     text.innerText = `${matchingProduct.title}`;

     // Personal Product
     // text.innerHTML = `Don't Skip, Get It Now! &nbsp`;

     // Create the icon element
     let icon = document.createElement('i');
     icon.className = 'fa-solid fa-circle-chevron-right';

     // Append the text and icon to the button
     button.appendChild(text);
     button.appendChild(icon);

     // Append the button to the link
     link.appendChild(affDiscount);
     link.appendChild(button);

     // Append the link to the mini-banner div
     miniBannerDiv.appendChild(link);
     miniBannerDiv.appendChild(affCode);

     // If the index of the h2 element is 1 (second h2)
     // and the h2 element does not have an id of 'main-post-3'
     // then place the div above the h2
     if (index === 1 && h2Element.id !== 'main-post-3') {
         h2Element.parentNode.insertBefore(miniBannerDiv, h2Element);
     }

     // If the index of the h2 element is greater than 1
     // and the h2 element does not have an id of 'main-post-3'
     // and the random number is greater than 0.5
     // then place the div below the h2
     if (index > 1 && h2Element.id !== 'main-post-3' && randomNumber > 0.5) {
         h2Element.parentNode.insertBefore(miniBannerDiv, h2Element.nextSibling);
     }

     // Add an event listener for when the mini-banner div comes into view
     // When the div comes into view, scale it up to 1.2
     window.addEventListener('scroll', () => {
         if (isInViewport(miniBannerDiv)) {
             miniBannerDiv.style.transform = 'scale(1)';
         } else {
             miniBannerDiv.style.transform = 'scale(.8)';
         }
     });
 });

 // Function to check if an element is in the viewport
 function isInViewport(element) {
     const rect = element.getBoundingClientRect();
     return (
         rect.top >= 0 &&
         rect.left >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
     );
 }
         } else {
             // Handle the case where no matching product is found
             newElement.innerHTML = `
                <div class="suggested-top">
                    <h2> For Your Next Cruise Trip! </h2>
                    <!-- No matching product found -->
                    <p>No matching product found based on the description.</p>
                </div>
            `;
         }

         // Insert the new element before the first div-container element
         if (divContainerPrepend) {
             divContainerPrepend.parentNode.insertBefore(newElement, divContainerPrepend);
         } else {
             // Handle the case where no div-container elements were found
             console.log('No div-container elements found on the page.');
         }
     })
     .catch(error => {
         console.error('Error fetching JSON data:', error);
     });