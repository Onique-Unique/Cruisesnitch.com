// Capture The Blogs Section From Index Page, Parse and Load Into Div On About Page - This Works as the both pages have the same connected JS Script
function loadAllBlogs() {
    fetch('index.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const allBlogsSection = doc.querySelector('#all-blogs');
            document.querySelector('#all-blogs-container').appendChild(allBlogsSection);
        })
        .catch(error => console.error(error));
}
// Load all logs function call
loadAllBlogs();

// Wait For Page Load
window.onload = function () {
    const dropdownItems = document.querySelectorAll('.dropdown_item');
    dropdownItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            const val = item.getAttribute('data-value');
            document.querySelector(`.dropdown_container-${val}`).classList.toggle('active');
        })
    })

    // Nav Menu
    const overlay = document.querySelector('.overlay');
    const mob_nav_open = document.querySelector('.mob_nav_open');
    const mob_nav = document.querySelector('.header_nav');
    const mob_nav_close = document.querySelector('.mob_nav_close')
    mob_nav_open.addEventListener('click', () => {
        mob_nav.classList.add('active');
        overlay.classList.add('active');
    })

    mob_nav_close.addEventListener('click', () => {
        mob_nav.classList.remove('active');
        overlay.classList.remove('active')
    })

    // Swap CSS Background Image for Higher Quality
    var featuredImg = document.querySelector('.featured-img');
    var highres = '/images/blog-images/cruise-ft-img.jpg';
    var img = new Image();
    img.src = highres;
    img.onload = function () {
        featuredImg.style.backgroundImage = 'url(' + highres + ')';
    };

    // See more blogs button
    // get the button and the blog wrapper
    const blogsButton = document.querySelector('.blogs_button');
    const blogWrapper = document.querySelector('#reveal-more-blogs');
    const blogHeading = document.querySelector('.blogs_heading');

    // add a click event listener to the button
    blogsButton.addEventListener('click', function () {
        // change the blog heading
        blogHeading.textContent = "All Cruise Travel Blogs";
        // remove the hide class from the blog wrapper
        blogWrapper.classList.remove('hide');
        // add the hide class to the button
        blogsButton.classList.add('hide');
    });

    // Dynamically take the last 6 Blog Card Entries and place outside the reveal more blogs div
    // get the latest 6 blog card elements
    const latestBlogCards = document.querySelectorAll('.blog_card:nth-last-of-type(-n+6)');
    // get the reveal more blogs div
    const revealMoreBlogs = document.getElementById('reveal-more-blogs');
    // create a new div for the latest 3 blog cards
    const newblogWrapper = document.createElement('div');
    newblogWrapper.classList.add('blog_wrapper');
    // append the latest 3 blog cards to the new div
    latestBlogCards.forEach(blogCard => {
        newblogWrapper.appendChild(blogCard);
    });
    // insert the new div above the reveal more blogs div
    revealMoreBlogs.parentNode.insertBefore(newblogWrapper, revealMoreBlogs);

    // Share Button script
    const shareBtn = document.getElementById("share-btn");

    if (shareBtn) {
        const shareTitle = document.querySelector("title").textContent;

        function shareList() {
            if (navigator.canShare) {
                navigator.share({
                    title: shareTitle,
                    text: "Get ready to embark on the adventure of a lifetime as I help you conquer the seas and check off that bucket list!",
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
};