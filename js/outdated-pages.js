// This script can detect (6 months) outdated pages of a website currently cruisesnitch.com and display a popup to advise editor/ owner to update these pages, this script is built to apply on the page/ index which the blog post links will be detected.
// Check Editorial tool for another version of this script that will fetch the links from the page/ index and display the outdated ones there. 
// Define the cutoff date as a certain number of months, weeks, or days before the current date
function getCutoffDate(num, unit) {
    const cutoffDate = new Date();
    switch (unit) {
        case "months":
            cutoffDate.setMonth(cutoffDate.getMonth() - num);
            break;
        case "weeks":
            cutoffDate.setDate(cutoffDate.getDate() - num * 7);
            break;
        case "days":
            cutoffDate.setDate(cutoffDate.getDate() - num);
            break;
        default:
            throw new Error(`Invalid unit: ${unit}`);
    }
    return cutoffDate.toISOString().slice(0, 10);
}


// Get the cutoff date based on the specified number and unit of time
const cutoffDate = getCutoffDate(6, "months");

// Find the div element with id "all-blogs"
const allBlogsDiv = document.getElementById("all-blogs");

// Find all the blogLinks within the div element
const blogLinks = allBlogsDiv.getElementsByTagName("a");

// Create a container element for the popup messages
const popupDiv = document.createElement("div")
const popupContainer = document.createElement("div");
popupContainer.style.position = "fixed";
popupContainer.style.bottom = "0";
popupContainer.style.right = "0";
popupContainer.style.maxWidth = "450px"; // Set the width of the container
popupContainer.style.height = "200px"; // Set the height of the container
popupContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
popupContainer.style.zIndex = "9999";
popupContainer.style.overflowY = "scroll";
document.body.appendChild(popupContainer);

// Create an array to store outdated pages
const outdatedPages = [];

// Loop through all the blogLinks
for (let i = 0; i < blogLinks.length; i++) {
    const blogLink = blogLinks[i];

    // Fetch the linked page using the fetch API
    fetch(`https://cruisesnitch.com${blogLink.getAttribute("href")}`)
        .then((response) => response.text())
        .then((html) => {
            // Parse the linked page as a DOM document
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Find the datetime attribute of the page
            const cutoffDate = new Date("2023-03-09T00:00:00.000Z"); // UTC timezone
            const datetime = doc.querySelector("[datetime]");
            if (datetime) {
                const dateString = datetime.getAttribute("datetime").slice(0, 10);
                const date = new Date(dateString);
                const diffTime = Math.abs(cutoffDate.getTime() - date.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const diffWeeks = Math.ceil(diffDays / 7);
                const diffMonths = diffDays / 30;

                // Check if the date is older than the cutoff date
                if (diffDays > 182.5 || diffWeeks > 26.071 || diffMonths > 6) {
                    const domain = 'https://cruisesnitch.com';
                    // Create a popup with a message indicating that the page is outdated
                    const popup = document.createElement("div");
                    popup.style.fontSize = "12px";
                    popup.style.maxWidth = "600px";
                    popup.style.backgroundColor = "#ffffff";
                    popup.style.padding = "20px";
                    popup.style.borderRadius = "5px";
                    popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
                    popup.innerHTML = `The content of this page is now outdated. Please update: <span style="color: red">${dateString}</span> <br><a href="${blogLink.href.replace(/^https?:\/\/[^\/]+/, domain)}">${blogLink.href.replace(/^https?:\/\/[^\/]+/, domain)}</a>`;
                    popupDiv.appendChild(popup)
                    popupContainer.appendChild(popupDiv);
                    outdatedPages.push(popup); // Add the popup to the array of outdated pages

                }
            }

        })
        .catch(error => console.error(`Failed to fetch ${blogLink.href}`, error));
}