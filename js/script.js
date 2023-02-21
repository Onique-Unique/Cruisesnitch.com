// Capture The Blogs Section From Index Page, Parse and Load Into Div On About Page - This Works as the both pages have the same connected JS Script
// Save content to localStorage
function saveContentToLocalStorage(data) {
  localStorage.setItem('allBlogsContent', JSON.stringify(data));
}

// Load content from localStorage
function loadContentFromLocalStorage() {
  const allBlogsContent = localStorage.getItem('allBlogsContent');
  if (allBlogsContent) {
    return JSON.parse(allBlogsContent);
  }
  return null;
}

// Load all blogs
function loadAllBlogs() {
  {
    fetch('/index.html')
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const allBlogsSection = doc.querySelector('#all-blogs');
        // Parse content into a DOM node
        const node = document.createRange().createContextualFragment(allBlogsSection.outerHTML);
        document.querySelector('#all-blogs-container').appendChild(node);
        saveContentToLocalStorage(allBlogsSection);
      })
      .catch(error => console.error(error));
  }
  let allBlogsContent = loadContentFromLocalStorage();
  if (allBlogsContent) {
    // Parse content into a DOM node
    const node = document.createRange().createContextualFragment(allBlogsContent.outerHTML);
    document.querySelector('#all-blogs-container').appendChild(node);
  }
}
// Load all logs function call
loadAllBlogs();

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