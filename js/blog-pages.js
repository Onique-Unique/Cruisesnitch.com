window.onload = function () {
    let menu = document.querySelector('#menu-bars');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
        searchIcon.classList.remove('fa-times');
        searchForm.classList.remove('active');
    }

    // Advisory Notice For Affiliate
    const advisoryNotice = document.getElementById("advisory");
    const advisoryText = document.getElementById("advisory-text");

    if (advisoryNotice) {
        advisoryNotice.addEventListener("click", () => {
            advisoryText.classList.toggle("hide");
        });
    };

    // Related Links
    const relatedContainer = document.getElementById("related-link-list");
    const relatedLinks = document.getElementById("related-links");
    const relatedLinksAlt = document.getElementById("related-links-alt");
    const relatedContainerAlt = document.getElementById("top-picks-list");
    if (relatedLinks) {
        relatedLinks.addEventListener("click", () => {
            relatedContainer.classList.toggle("hide");
        });
    };

    if (relatedLinksAlt) {
        relatedLinksAlt.addEventListener("click", () => {
            relatedContainerAlt.classList.toggle("hide");
        });
    };

    // Uncomment When Digital Products Are Built  vvvv

//     // Find the first div-container element on the page
//     const divContainerPrepend = document.querySelector('.div-container');

//     // Create a new HTML element
//     const newElement = document.createElement('div');
//     newElement.id = "next-trip-items";
//     newElement.innerHTML = `
// <div class="suggested-top">
//                 <h2> For Your Next Trip! </h2>
//                 <!-- Only one Suggested Item for affiliate -->
//                 <div class="wrapper">
//                     <div class="item-box">
//                         <a href="#" target="_blank">
//                             <img loading="lazy" class="suggested-item" border="0" src="/images/blog-images/Mommy-Daughter-Etsy-Listing.PNG" alt="For Your Next Trip" title="For Your Next Trip" decoding="async"></a>
//                         <a href="#" target="_blank" rel="nofollow"><h3 class="suggested-text-item"> Wine Tasting Chart</h3></a>                   
//                         <a class="suggest-link" href="#" target="_blank" rel="nofollow">See Item</a>
//                     </div>
//                     <div class="item-box">
//                         <a href="#" target="_blank">
//                             <img loading="lazy" class="suggested-item" border="0" src="/images/blog-images/Mommy-Daughter-Etsy-Listing.PNG" alt="For Your Next Trip" title="For Your Next Trip" decoding="async"></a>
//                         <a href="#" target="_blank" rel="nofollow"><h3 class="suggested-text-item"> Wine And Cheese Tasting Chart (Combo)</h3></a> 
//                         <a class="suggest-link" href="#" target="_blank" rel="nofollow">See Item</a>
//                     </div>
//                 </div>
//                 <div class="wrapper">
//                     <div class="item-box">
//                         <a href="#" target="_blank">
//                             <img loading="lazy" class="suggested-item" border="0" src="/images/blog-images/Mommy-Daughter-Etsy-Listing.PNG" alt="For Your Next Trip" title="For Your Next Trip" decoding="async"></a>
//                         <a href="#" target="_blank" rel="nofollow"><h3 class="suggested-text-item"> Tour Guide Referral</h3></a>                   
//                         <a class="suggest-link" href="#" target="_blank" rel="nofollow">See Item</a>
//                     </div>
//                     <div class="item-box">
//                         <a href="#" target="_blank">
//                             <img loading="lazy" class="suggested-item" border="0" src="/images/blog-images/Mommy-Daughter-Etsy-Listing.PNG" alt="For Your Next Trip" title="For Your Next Trip" decoding="async"></a>
//                             <a href="#" target="_blank" rel="nofollow"><h3 class="suggested-text-item"> Crew & Staff Off Boarding Messages</h3></a>
//                         <a class="suggest-link" href="#" target="_blank" rel="nofollow">See Item</a>
//                     </div>
//                 </div>
//                 <h3><span>Tip:</span> Add to cart to lock in cheapest deal!</h3>
//             </div>
//             `;

//     // Insert the new element before the first div-container element
//     if (divContainerPrepend) {
//         divContainerPrepend.parentNode.insertBefore(newElement, divContainerPrepend);
//     } else {
//         // Handle the case where no div-container elements were found
//         console.log('No div-container elements found on the page.');
//     }

    // Swap CSS Background Image for Higher Quality
    var featuredImg = document.querySelector('.featured-img');
    var highres = '/images/blog-images/cruise-ft-img.jpg';
    var img = new Image();
    img.src = highres;
    img.onload = function () {
        featuredImg.style.backgroundImage = 'url(' + highres + ')';
    };

    // Share Button script
    const shareBtn = document.getElementById("share-btn");

    if (shareBtn) {
        const shareTitle = document.getElementById("share-title").textContent;
        const shareDescription = document.getElementById("share-description").textContent;

        function shareList() {
            if (navigator.canShare) {
                navigator.share({
                    title: shareTitle,
                    text: shareDescription,
                    url: window.location.href,
                });
            } else {
                // Desktop Functionality
            }
        };

        shareBtn.addEventListener("click", () => {
            shareList();
        });
    }

    // Add a scroll event listener to the window object for share button to appear
    window.addEventListener('scroll', function () {
        // Get the current scroll position
        const scrollPosition = window.scrollY;

        // Get the height of the page
        const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Calculate the scroll position as a percentage of the page height
        const scrollPercentage = (scrollPosition / pageHeight) * 100;

        // Check if the scroll percentage is greater than or equal to 5
        if (scrollPercentage >= 2.5) {
            // Show the share button
            shareBtn.style.display = 'block';
        } else {
            // Hide the share button
            shareBtn.style.display = 'none';
        }
    });

    // Protect Page from unwanted content stealing, plagiarism etc such as copying content or inspect element...
    // Create error message box and design
    let errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.background = 'ghostwhite';
    errorMessage.style.color = 'red';
    errorMessage.style.padding = '10px';
    errorMessage.style.position = 'fixed';
    errorMessage.style.top = '50%';
    errorMessage.style.left = '50%';
    errorMessage.style.transform = 'translate(-50%, -50%)';
    errorMessage.style.borderRadius = '5px';
    errorMessage.style.zIndex = '2';
    errorMessage.style.fontSize = '1.2rem';
    errorMessage.style.display = 'none';
    errorMessage.style.textAlign = "center";
    errorMessage.style.minWidth = "280px";
    errorMessage.innerText = 'Not Allowed: This page is protected!';
    document.body.style.userSelect = "none";
    document.body.style.WebkitUserSelect = "none";
    document.body.style.msUserSelect = "none";
    document.body.style.oUserSelect = "none";
    document.body.appendChild(errorMessage);

    // Detect attempts to copy any text on page
    document.addEventListener('copy', event => {
        // Block the copy event and display error message
        errorMessage.style.display = 'block';
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 1000);
        event.preventDefault();
    });

    // Listen for right click on page then display error message
    document.addEventListener("contextmenu", function (event) {
        errorMessage.style.display = 'block';
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 1000);
        event.preventDefault();
    });

    // Find all text elements on page excluding anchor tags, images etc, listen for mousedown/ long press then display error message
    let textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');

    for (let i = 0; i < textElements.length; i++) {
        textElements[i].addEventListener("mousedown", function (event) {
            if (event.target.tagName != "a") {
                event.preventDefault();
            }
        });
    }

    // Listen for keyboard control A or control C or control U or control shift J or control shift I or F12 on page then display error message
    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.keyCode == 65 || event.ctrlKey && event.keyCode == 67 || event.ctrlKey && event.shiftKey && event.keyCode == 74 || event.ctrlKey && event.keyCode == 85 || event.keyCode == 123 || event.ctrlKey && event.shiftKey && event.keyCode == 73) {
            errorMessage.style.display = 'block';
            setTimeout(function () {
                errorMessage.style.display = 'none';
            }, 1000);
            event.preventDefault();
        }
    });

    // Check every 1 second if body user select has been removed then run the following function:
    setInterval(function () {
        if (document.body.style.userSelect !== "none") {
            document.body.style.display = "none";
            window.location.reload();
            alert("Really?! - You are attempting to do something that is not allowed!");
        }
    }, 1000);

    // Wrap Text of the Li elements within the div-container that has a dash(-) or colon(:) in a span separately from other text
    const listItems = document.querySelectorAll('.div-container ul li.text');

    listItems.forEach((item) => {
        const text = item.innerText.trim();
        const colonIndex = text.indexOf(':');

        if (colonIndex > -1) {
            const firstPart = text.substring(0, colonIndex + 1).trim();
            const secondPart = text.substring(colonIndex + 1).trim();
            const span = document.createElement('span');
            span.textContent = firstPart;
            item.innerHTML = '';
            item.appendChild(span);
            item.insertAdjacentText('beforeend', secondPart);
        }
    });

};