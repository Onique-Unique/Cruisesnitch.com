// const products = [{
//         id: 1,
//         title: 'Cheese Rate Card',
//         tags: 'Tasting, Notes, Journal, Log, Rating, Worksheet, Score, Card, Charcuterie',
//         price: '$2.99',
//         image: 'Specimen - Cheese Card Event.png'
//     },
//     {
//         id: 2,
//         title: 'Trivia Card',
//         tags: 'Answer, Sheet, Player',
//         price: '$2.99',
//         image: 'Specimen - Lets Play Trivia Event.png'
//     },
//     {
//         id: 3,
//         title: 'Wine & Cheese Card Combo',
//         tags: 'Tasting, Score Card, Journal, Charcuterie',
//         price: '$4.99',
//         image: 'Specimen - Wine & Cheese Combo.png'
//     },
//     {
//         id: 4,
//         title: 'Wine Rate Card',
//         tags: 'Tasting, Score, Card, Sheet, Notes',
//         price: '$2.99',
//         image: 'Specimen - Wine Card Event.png'
//     },
//     {
//         id: 5,
//         title: 'Product 5',
//         tags: 'cheese, rate, card, fish',
//         price: '$2.99',
//         image: 'product2.jpg'
//     },
//     {
//         id: 6,
//         title: 'Product 6',
//         tags: 'cheese, rate, card, fish',
//         price: '$2.99',
//         image: 'product3.jpg'
//     },
//     {
//         id: 7,
//         title: 'Product 7',
//         tags: 'cheese, rate, card, fish',
//         price: '$2.99',
//         image: 'product1.jpg'
//     },
//     {
//         id: 8,
//         title: 'Product 8',
//         tags: 'cheese, rate, card, fish',
//         price: '$2.99',
//         image: 'product2.jpg'
//     },
//     {
//         id: 9,
//         title: 'Product 9',
//         tags: 'cheese, rate, card, fish',
//         price: '$2.99',
//         image: 'product3.jpg'
//     },
//     // Add more product objects here...
// ];

const searchInput = document.getElementById('searchInput');
const productContainer = document.getElementById('productContainer');
const popupOverlay = document.querySelector('.popup-overlay');
const mainBanner = document.getElementById('main-banner');
const menuSpans = document.querySelectorAll('#main-banner span');
const burgerIcon = document.querySelector('.burger-icon');
const categories = document.querySelector('.categories');

let shuffledProducts = []; // Initialize as an empty array

function shuffleArray(array) {
    // Create a copy of the original array
    const shuffledArray = [...array];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Load JSON data using fetch
fetch('js/products.json')
    .then(response => response.json())
    .then(products => {

        // Shuffle the products array
        const shuffledProducts = shuffleArray(products);

        displayProducts(shuffledProducts);

        productContainer.addEventListener('click', event => {
            const target = event.target;
            if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
                const productId = parseInt(target.parentElement.dataset.productId);
                const product = products.find(product => product.id === productId);
                if (product) {
                    displayProductPopup(product);
                }
            }
        });

        // displayProducts(products);

        // Search Bar
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            const filteredProducts = shuffledProducts.filter(product =>
                product.title.toLowerCase().includes(searchText) ||
                product.tags.toLowerCase().includes(searchText)
            );

            if (filteredProducts.length === 0) {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = "We do not have this product. Try searching again.";
                noResultsMessage.classList.add('no-results-message');
                productContainer.innerHTML = '';
                productContainer.appendChild(noResultsMessage);
            } else {
                displayProducts(filteredProducts);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

function displayProducts(products) {
    productContainer.innerHTML = `
    <p class= "instant-header">Instant Downloads/ PDF's Available <i class="fa-solid fa-circle-down"></i></p>
    <br>
    <section class="above-products">
    <div class="above-products-container">
      <a class="above-products-image" href="https://fromtheship.etsy.com">
        <img src="/images/store-pfp/store pfp.png" alt="Cruise Vacation Digital & Printables" width="300" height="206">
      </a>
      <div class="above-products-content">
        <h1 class="above-products-heading"><span>Cruise Productivity</span> & Documenting Memories Is Our Aim</h1>
        <div class="above-products-text">
          <p><strong>Hey my cruising friend!</strong></p>
          <p>I’m Onique and I’m passionate about helping you maximise your cruise vacation no matter how long or short it may be. I’d love to help you organize your vacation but not only that - i want physical ways for you to document your cruise memories making the fullest of your time onboard, products are built with you in mind with the knowledge of my Cruise Employee experience so you can be sure what you get is 100% best for your: <br> <strong>Before, During & After Cruise Moments!</strong></p>
        </div>
      </div>
    </div>
  </section>`;
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.dataset.productId = product.id;

        const productImage = document.createElement('img');
        productImage.src = `/digital-products/${product.image}`;
        productImage.alt = product.title;

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;

        const productTags = document.createElement('p');
        const tagsArray = product.tags.split(',').map(tag => tag.trim()); // Split tags into an array
        const displayedTags = tagsArray.slice(0, 3).join(', '); // Display up to 3 tags
        productTags.textContent = displayedTags;

        const productPrice = document.createElement('h2');
        productPrice.textContent = product.price;

        const getNowButton = document.createElement('button');
        getNowButton.textContent = 'Grab It Now';

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productTags);
        productDiv.appendChild(productPrice)
        productDiv.appendChild(getNowButton);

        productContainer.appendChild(productDiv);
    });
}

function displayProductPopup(product) {
    const popup = document.createElement('div');
    popup.classList.add('popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    const popupExit = document.createElement('div');
    popupExit.classList.add('popup-exit');
    popupExit.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;

    const popupImage = document.createElement('img');
    popupImage.src = `/digital-products/${product.image}`;
    popupImage.alt = product.title;

    const popupTitle = document.createElement('h2');
    popupTitle.textContent = product.title;

    const popupTags = document.createElement('p');
    popupTags.classList.add('popup-tags');
    const tagsArray = product.tags.split(',').map(tag => tag.trim());
    const displayedTags = tagsArray.slice(0, 3).join(', ');
    popupTags.textContent = displayedTags;

    const popupPrice = document.createElement('h2');
    popupPrice.textContent = product.price;

    const popupCheckoutButton = document.createElement('a');
    popupCheckoutButton.href = product.url;
    popupCheckoutButton.target = "_blank"; // Open the URL in a new tab/window
    popupCheckoutButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Buy Now`;

    popupContent.appendChild(popupExit);
    popupContent.appendChild(popupImage);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(popupTags);
    popupContent.appendChild(popupPrice);
    popupContent.appendChild(popupCheckoutButton);

    popup.appendChild(popupContent);

    document.body.appendChild(popup);
    popupOverlay.style.display = 'block';

    popupExit.addEventListener('click', () => {
        closePopup();
    });
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        document.body.removeChild(popup);
        popupOverlay.style.display = 'none';
    }
}

// Categories
menuSpans.forEach(span => {
    span.addEventListener('click', () => {
        searchInput.value = span.textContent;
        searchInput.dispatchEvent(new Event('input')); // Manually trigger input event

        if (window.innerWidth < 769) {
            categories.classList.toggle('category-visible');
            popupOverlay.style.display = popupOverlay.style.display === 'block' ? 'none' : 'block';
            mainBanner.style.zIndex = mainBanner.style.zIndex === '1001' ? '' : '1001';
        }
    });
});

burgerIcon.addEventListener('click', () => {
    categories.classList.toggle('category-visible');
    popupOverlay.style.display = popupOverlay.style.display === 'block' ? 'none' : 'block';
    mainBanner.style.zIndex = mainBanner.style.zIndex === '1001' ? '' : '1001';
});

// Countdown
// Get Current Date JS Logic----------------------------------------------------

// Set the date we're counting down to
var saleCountDownDate = new Date("Oct 30, 2023 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var saleDistance = saleCountDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var saledays = Math.floor(saleDistance / (1000 * 60 * 60 * 24));
    var salehours = Math.floor((saleDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var saleminutes = Math.floor((saleDistance % (1000 * 60 * 60)) / (1000 * 60));
    var saleseconds = Math.floor((saleDistance % (1000 * 60)) / 1000);

    // Dot symbol as separation for text limited time only
    const dot = " &bull; ";

    // Display the result in the element with id="demo"
    document.getElementById("countdown").innerHTML = saledays + "d " + salehours + "h " +
        saleminutes + "m " + saleseconds + "s " + dot + " remaining";

    // If the count down is finished, write some text
    if (saleDistance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Expired";
    }
}, 1000);

// Cookie Settings
document.cookie = "AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=None;Secure";

const landingPageVisible = document.querySelector('.landing-page-visible');

// Affiliate Link stored in variable
const goToAffiliateLink = "https://fromtheship.etsy.com";

// always remove extra <img> at the end of the amazon affiliate image link
// const affiliateImage = '<a href="https://www.amazon.com/dp/B07W22LYQK?psc=1&pd_rd_i=B07W22LYQK&pd_rd_w=8OtKx&content-id=amzn1.sym.bff6e147-54ad-4be3-b4ea-ec19ea6167f7&pf_rd_p=bff6e147-54ad-4be3-b4ea-ec19ea6167f7&pf_rd_r=QRVWA386EHZ4NDX4SG30&pd_rd_wg=y837k&pd_rd_r=ee737b51-3245-41e0-8f8a-79e415f4342a&s=furniture&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzUlQ2T1BSM0s0SUFLJmVuY3J5cHRlZElkPUEwMDMzMjk3M0I1UUJGRjBCTFZQSyZlbmNyeXB0ZWRBZElkPUEwNTg4MjEwMU5IWEhLRTFaRlNHQyZ3aWRnZXROYW1lPXNwX2RldGFpbDImYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl&linkCode=li1&tag=oniquecampbel-20&linkId=543b85e5bce37362dafecb1de3f10780&language=en_US&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07W22LYQK&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=oniquecampbel-20&language=en_US" ></a>';

// Coupon Select/ Display for Scroll Intent
let springCoupons = [{
    code: "GET5OFF",
    discount: "5% off"
}, {
    code: "MYFAVE",
    discount: "Save %10 On Favourited Items"
}, {
    code: "CHECKOUT",
    discount: "Save $ on Checkout"
}, {
    code: "FORYOU",
    discount: "15% off"
}];

let summerCoupons = [{
    code: "GET5OFF",
    discount: "5% off"
}, {
    code: "CRUISING",
    discount: "Orders Over 10 - Save 10"
}, {
    code: "MYFAVE",
    discount: "Save %10 On Favourited Items"
}, {
    code: "CHECKOUT",
    discount: "Save $ on Checkout"
}, {
    code: "FORYOU",
    discount: "15% off"
}];

let fallCoupons = [{
    code: "GET5OFF",
    discount: "5% off"
}, {
    code: "MYFAVE",
    discount: "Save %10 On Favourited Items"
}, {
    code: "CHECKOUT",
    discount: "Save $ on Checkout"
}, {
    code: "FORYOU",
    discount: "15% off"
}];

let winterCoupons = [{
    code: "GET5OFF",
    discount: "5% off"
}, {
    code: "CRUISING",
    discount: "Orders Over 10 - Save 10"
}, {
    code: "MYFAVE",
    discount: "Save %10 On Favourited Items"
}, {
    code: "CHECKOUT",
    discount: "Save $ on Checkout"
}, {
    code: "FORYOU",
    discount: "15% off"
}];

// add function that checks current date, if the date is season relative then select a random coupon code from that list

function getCouponCodeBySeason() {
    let currentDate = new Date();
    let month = currentDate.getMonth();
    let coupons;

    if (month >= 3 && month <= 5) {
        coupons = springCoupons;
    } else if (month >= 6 && month <= 8) {
        coupons = summerCoupons;
    } else if (month >= 9 && month <= 11) {
        coupons = fallCoupons;
    } else if (month === 0 || month === 1 || month === 2 || month === 12) {
        coupons = winterCoupons;
    }

    // exclude all codes that have a month name that is not equal to current month
    let filteredCoupons = coupons.filter(coupon => {
        let code = coupon.code;
        let monthName = code.substring(0, 3).toUpperCase();
        let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let currentMonth = months[month];
        return monthName !== currentMonth;
    });

    let randomIndex = Math.floor(Math.random() * filteredCoupons.length);
    let selectedCoupon = filteredCoupons[randomIndex];
    return selectedCoupon;
}

let couponCode = getCouponCodeBySeason();
console.log(couponCode);

// Onpage Notification 
const userSearch = document.querySelector("title").innerText;
let scrollIntent = document.createElement('div');
scrollIntent.className = 'scroll-intent';

let scrollIntentContent = document.createElement('div');
scrollIntentContent.className = 'scroll-intent-content';

let scrollIntentInnerContent = document.createElement('div');
scrollIntentInnerContent.className = 'scroll-intent-inner-content';

let scrollIntenth3 = document.createElement('h3');

// Amazon Version popup image -----------------------------------------------
// let scrollIntentImage = document.createElement('div');
// scrollIntentImage.style.fontSize = "1.4rem";
// scrollIntentImage.style.color = "mediumvioletred";
// scrollIntentImage.innerHTML = `${affiliateImage} <br> Neck + Back Massager!`;

let scrollIntenth3Text = document.createTextNode('Hurry!!');
scrollIntenth3.appendChild(scrollIntenth3Text);

let scrollIntenth4Main = document.createElement('h4');
scrollIntenth4Main.id = "scrollIntent-main-h4";
scrollIntenth4Main.innerHTML = `Interested In ${userSearch}?`;

let scrollIntenth4Secondary = document.createElement('h4');
scrollIntenth4Secondary.innerHTML = `<span id="span-head">FromTheShip</span> is showcasing special deals right now "for a limited time" on the products you really want to buy`;

let scrollIntentp = document.createElement('p');
let scrollIntentpText = document.createTextNode('Go quick and save your items to cart to lock in these deals for your cruise..');
scrollIntentp.appendChild(scrollIntentpText);

let scrollIntentpCoupon = document.createElement('p');
scrollIntentpCoupon.className = "coupon-text";
scrollIntentpCoupon.innerHTML = `Missed Your Chance To Use Coupon? Try One Now: <br><br><span id="coupon-code">${couponCode.code}</span>`;

let scrollIntentpCouponText = document.createElement('p');
scrollIntentpCouponText.className = "coupon-text";
scrollIntentpCouponText.innerHTML = `${couponCode.discount}`;

let scrollIntentURLBtn = document.createElement('button');
scrollIntentURLBtn.className = "scroll-intent-btn";
let scrollIntentbtnText = document.createTextNode('Take Me There');
scrollIntentURLBtn.appendChild(scrollIntentbtnText);
scrollIntentURLBtn.onclick = gotoURL;

let exitScrollIntent = document.createElement("div");
exitScrollIntent.className = "exit-scroll-intent";
exitScrollIntent.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
scrollIntentContent.appendChild(exitScrollIntent);
exitScrollIntent.onclick = closeScrollIntent;

scrollIntentInnerContent.appendChild(scrollIntenth3);
// Amazon Only - Aff Image Insert
// scrollIntentInnerContent.appendChild(scrollIntentImage);
scrollIntentInnerContent.appendChild(scrollIntenth4Secondary);
scrollIntentInnerContent.appendChild(scrollIntentp);
scrollIntentInnerContent.appendChild(scrollIntentpCoupon);
scrollIntentInnerContent.appendChild(scrollIntentpCouponText);
scrollIntentInnerContent.appendChild(scrollIntenth4Main);
scrollIntentInnerContent.appendChild(scrollIntentURLBtn);

scrollIntentContent.appendChild(scrollIntentInnerContent);
scrollIntent.appendChild(scrollIntentContent);

document.body.appendChild(scrollIntent);
let showScrollIntent = true;

function closeScrollIntent() {
    document.getElementsByClassName('scroll-intent')[0].style.display = 'none';
    showScrollIntent = false;
    document.querySelector(".landing-page-visible").classList.remove("scroll-intent-blur");
    document.body.classList.remove("page-body-scroll-intent-adjust");
}

function gotoURL() {
    document.location.href = `${goToAffiliateLink}`;
}

document.onscroll = function () {
    if (window.scrollY > (window.innerHeight * 2) && showScrollIntent) {
        document.getElementsByClassName('scroll-intent')[0].style.display = 'block';
        document.querySelector(".landing-page-visible").classList.add("scroll-intent-blur");
        document.body.classList.add("page-body-scroll-intent-adjust");
    }
};

let scrollIntentTimer = setInterval(function () {
    if (showScrollIntent == false) {
        showScrollIntent = true;
        document.getElementsByClassName('scroll-intent')[0].style.display = 'block';
        document.body.classList.add("page-body-scroll-intent-adjust");
    }
}, 35000);

// Affiliate Shopping Chat Notification Bot
setTimeout(() => {
    // Create shopping container div to be positioned at end of page
    let shoppingCartContainer = document.createElement('div');
    shoppingCartContainer.className = 'shopping-cart-container';
    shoppingCartContainer.style.width = "100%";
    shoppingCartContainer.style.position = 'fixed';
    shoppingCartContainer.style.bottom = '20px';
    shoppingCartContainer.style.cursor = 'pointer';
    shoppingCartContainer.style.zIndex = '99999999';

    // Design and create the shopping cart element and style
    let shoppingCart = document.createElement('div');
    shoppingCart.className = 'shopping-cart';
    shoppingCart.style.position = "absolute";
    shoppingCart.style.right = '10px';
    shoppingCart.style.bottom = '50px';
    shoppingCart.style.width = '60px';
    shoppingCart.style.height = '60px';
    shoppingCart.style.borderRadius = '100%';
    shoppingCart.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    shoppingCart.style.padding = '20px';
    shoppingCart.style.background = '#fff';
    shoppingCart.style.fontSize = '16px';

    // When shopping cart is clicked go to link
    shoppingCart.addEventListener("click", () => {
        document.location.href = `${goToAffiliateLink}`;
    });

    // Adding the shopping icon with style
    let shoppingCartIcon = document.createElement('div');
    shoppingCartIcon.innerHTML = `<i class="fa-solid fa-anchor"></i>`;
    shoppingCartIcon.style.fontSize = "4rem";
    shoppingCartIcon.style.position = "absolute";
    shoppingCartIcon.style.top = "50%";
    shoppingCartIcon.style.left = "50%";
    shoppingCartIcon.style.transform = "translate(-50%, -50%)";
    shoppingCartIcon.style.color = "#f1641e";

    // Appending the elements
    shoppingCart.appendChild(shoppingCartIcon);
    shoppingCartContainer.appendChild(shoppingCart);

    // Create the notification display elements and design
    let notification = document.createElement('div');
    notification.className = 'shopping-cart__notification';
    notification.style.position = 'absolute';
    notification.style.bottom = '115px';
    notification.style.right = '20px';
    notification.style.padding = '1px 5px';
    notification.style.fontSize = '11px';
    notification.style.borderRadius = '0 5px 0 0';
    notification.style.color = '#fff';
    notification.style.background = '#3F51B5';
    notification.style.textAlign = 'center';
    notification.style.zIndex = '99999999';

    // Create notification text area to display
    let notificationText = document.createElement('span');
    notificationText.innerHTML = 'New deals available every single day!';

    // Append elements
    notification.appendChild(notificationText);
    shoppingCartContainer.appendChild(notification);
    document.body.appendChild(shoppingCartContainer);

    // Start the timer
    setInterval(function () {
        // Create random notification message
        let messages = ['Purchases get free shipping!', 'Shop exclusive collections and save big!', 'Unlock savings today!', 'Shop top picks and save!', 'Get exclusive deals and discounts!', 'Claim personalized discounts!', 'New deals available!', 'Buy now and enjoy the benefits!', 'Don\'t wait, buy now!', 'Get the best deals now!', 'Click and shop for deals!', 'Don\'t miss out, buy now!', 'Get yours now and save!', 'Try it now and save big!', 'Save big on your purchase!', 'Don\'t delay, shop now!', 'Enjoy big savings now!', 'Take advantage now and save!', 'Get yours now and enjoy the savings!', 'Act now and get yours today!', 'Hurry, before limited time offers end!', 'Buy now and save more!', 'Get yours before they\'re gone!', 'Check out these new offers!', 'Don\'t miss out, act now!', 'Grab these deals now!', 'Shop now and save big!'];
        let randomMessage = messages[Math.floor(Math.random() * messages.length)];
        // Update the notification text
        document.querySelector('.shopping-cart__notification span').innerHTML = randomMessage;
    }, 10000);

    // Shopping cart animation to correspond with text change timing
    shoppingCartContainer.addEventListener('animationend', () => {
        shoppingCartContainer.classList.remove('wiggle');
    });

    setInterval(function () {
        shoppingCartContainer.classList.add('wiggle');
    }, 10000);
}, 1500);

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