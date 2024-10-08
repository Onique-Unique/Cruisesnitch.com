const submit = document.getElementById('submit');
const output = document.getElementById('output');
const copy = document.getElementById('copy');
let paraEl = document.getElementById('paraEl');
let listMain = document.getElementById('listMain');
let listCustom = document.getElementById('listCustom');
let topics = document.getElementById('topics');
let title, description, link, secondary_title, secondary_para_1, secondary_para_2, current_image_link;
let input = {},
    val = [];
let tCount = 0; //Topic count 
let htmlCode, htmlCode_second;
let htmlCode_topics = '';
let formCode;
let htmlCode_first_c = htmlCode_first;
let htmlCode_last_c = htmlCode_last;

let reviews, children; //all the topics will be stored here in an array and their children (paras and divs) will be stored in children for every iteration of reviews

paraEl.addEventListener('click', (e) => {
    e.preventDefault();
    tCount++;
    formCode = `                        
    <h2 class="title-secondary h2-highlight">Topic ${tCount}</h2>
    <div class="form-group para" id="review${tCount}">
        <label class="pre-start" for="review-${tCount}">Topic title</label>
        <input type="text" class="form-control" id="review-${tCount}">
        <label>Direct para 1</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Direct para 2</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Direct para 3</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label class="inner-fill">Inner para 1</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label class="inner-fill">Inner para 2</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Alternate Inner para</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label class="inner-fill">Inner para 4</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Indirect para 1</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Indirect para 2</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Indirect para 3</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
    </div>
    <br/>`;
    topics.insertAdjacentHTML('beforeend', formCode);
});

// Regular List Elements Generate
listMain.addEventListener('click', (e) => {
    e.preventDefault();
    tCount++;
    formCode = `
    <h2 class="title-secondary h2-highlight">Topic ${tCount}</h2>
    <div class="form-group listMain" id="review${tCount}">
        <label class="pre-start" for="review-${tCount}">Topic title</label>
        <input type="text" class="form-control" id="review-${tCount}"/>
        <label>Direct para 1</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Direct para 2</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Direct para 3</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label class="inner-fill">Topic list item 1</label>
        <input type="text" class="form-control" />
        <label class="inner-fill">Topic list item 2</label>
        <input type="text" class="form-control" />
        <label class="inner-fill">Topic list item 3</label>
        <input type="text" class="form-control">
        <label class="inner-fill">Topic list item 4</label>
        <input type="text" class="form-control" />
        <label class="inner-fill">Topic list item 5</label>
        <input type="text" class="form-control" />
        <label class="inner-fill">Topic list item 6</label>
        <input type="text" class="form-control">
        <label class="inner-fill">Topic list item 7</label>
        <input type="text" class="form-control">
        <label class="inner-fill">Topic list item 8</label>
        <input type="text" class="form-control">
        <label class="inner-fill">Topic list item 9</label>
        <input type="text" class="form-control">
        <label class="inner-fill">Topic list item 10</label>
        <input type="text" class="form-control" />
        <label>Indirect para 1</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Indirect para 2</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
        <label>Indirect para 3</label>
        <textarea class='form-control' rows="2" cols="30"></textarea>
    </div>
    <br/>
    `;
    topics.insertAdjacentHTML('beforeend', formCode);
});

// For Custom List Input Amount
// Define numListItems as a global variable
let numListItems;

listCustom.addEventListener('click', (e) => {
    e.preventDefault();
    // Create the popup box
    const popup = document.createElement('div');
    popup.id = "listBox";
    popup.innerHTML = `<i class="fa-solid fa-rectangle-xmark" id="close-custom-list"></i><p>Enter the number of topic list items:</p><input type="text" id="num-list-items" /><button id="submit-num-list-items">Submit</button>`;
    document.body.appendChild(popup);

    let customListClose = document.getElementById("close-custom-list");
    customListClose.onclick = function () {
        document.body.removeChild(popup);
    }

    // Add a click event listener to the submit button
    const submitBtn = document.querySelector('#submit-num-list-items');
    submitBtn.addEventListener('click', () => {
        tCount++;

        formCode = `
        <h2 class="title-secondary h2-highlight">Topic ${tCount}</h2>
        <div class="form-group listCustom" id="review${tCount}">
            <label class="pre-start" for="review-${tCount}">Topic title</label>
            <input type="text" class="form-control" id="review-${tCount}"/>
            <label>Direct para 1</label>
            <textarea class='form-control' rows="2" cols="30"></textarea>
            <label>Direct para 2</label>
            <textarea class='form-control' rows="2" cols="30"></textarea>
            <label>Direct para 3</label>
            <textarea class='form-control' rows="2" cols="30"></textarea>
        `;

        numListItems = document.querySelector('#num-list-items').value;

        // Ensure that numListItems is a number, create list areas based on user amount specified
        while (isNaN(numListItems)) {
            alert('Please enter a valid number');
            return;
        }

        for (let i = 1; i <= parseInt(numListItems); i++) {
            formCode += `<label class="inner-fill">Topic list item ${i}</label><input type="text" class="form-control" />`;
        }

        formCode += `
            <label>Indirect para 1</label>
            <textarea class='form-control' rows="2" cols="30"></textarea>
            <label>Indirect para 2</label>
            <textarea class='form-control' rows="2" cols="30"></textarea>
            <label>Indirect para 3</label>
            <textarea class='form-control' rows="2" cols="30"></textarea>
        </div>
        <br/>
        `;
        topics.insertAdjacentHTML('beforeend', formCode);
        popup.remove();
    });
});

/* On Submitting the form */
submit.addEventListener('click', (e) => {
    e.preventDefault();
    //reset Html topics so the changes are replaced 
    htmlCode_topics = '';

    //Refresh htmlCode and htmlCode_last so it can be placed again with the changes made 
    htmlCode_first = htmlCode_first_c;
    htmlCode_last = htmlCode_last_c;

    getPreInputs();
    createParas();
    replaceCode();
});

//Get the preliminary inputs - title, description, link, secondary title details
getPreInputs = () => {
    title = document.getElementById('title').value;
    description = document.getElementById('description');
    link = document.getElementById('link');
    secondary_title = document.getElementById('secondary_title');
    secondary_para_1 = document.getElementById('secondary_para_1');
    secondary_para_2 = document.getElementById('secondary_para_2');
    current_image_link = document.getElementById("image-link");

    input = {
        title: title,
        description: description.value,
        'current-page-link': link.value,
        'secondary-title': secondary_title.value,
        'secondary-title-paragraph': secondary_para_1.value,
        'secondary-title-paragraph-2': secondary_para_2.value,
        'current-image-link': current_image_link.value.replace("C:\\fakepath\\", "")
    };
    htmlCode_first = htmlCode_first.replace(/{ .on-page-video }/g, title);
};

createParas = () => {
    let classN;
    //the remaining paragraphs 
    reviews = topics.children;
    reviews = Array.from(reviews);
    reviews = reviews.filter(r => r.tagName === 'DIV'); //filtered out only the 'review' div elements that we need inputs from
    reviews.forEach((review, index) => {
        classN = review.className.replace('form-group ', '');
        //reset val
        val = [];
        children = review.children;
        children = Array.from(children);
        children.forEach((item) => {
            if (item.tagName === 'TEXTAREA' || item.tagName === 'INPUT') {
                /*if(item.id === `review-${index+1}` && item.value == '') {
                    alert('Please enter a title for your topics');
                    stat = 0;
                    return;
                }
                else {*/
                val.push(item.value); //Even if the title field is not filled, start pushing the content
                //}
            }
        });

        //Replace the misc h2's and secondary-paras first with a switch statement
        switch (index + 1) {
            case 1:
                htmlCode_first = htmlCode_first.replace(/{ .first-h2 }/g, val[0]);
                break;
            case 2:
                htmlCode_first = htmlCode_first.replace(/{ .second-h2 }/g, val[0]);
                //find the first non-empty paragraph 
                for (let i = 1; i < val.length; i++) {
                    if (val[i] != '') {
                        htmlCode_first = htmlCode_first.replace(/{ .second-h2-paragraph }/, val[i]);
                    }
                }
                break;
            case 3:
                htmlCode_first = htmlCode_first.replace(/{ .third-h2 }/g, val[0]);
                break;
            case 4:
                htmlCode_first = htmlCode_first.replace(/{ .fourth-h2 }/g, val[0]);
                break;
        }
        // if first para is at index 0 then do this or move to next if statement
        if (index === 0 && classN === 'para') {

            htmlCode_second = `
            <h2 class="title-secondary h2-highlight" id="review-1">${val[0]}</h2>
            <p class="text">${val[1]}</p> 
            <p class="text">${val[2]}</p> 
            <p class="text">${val[3]}</p> 
            <div class="div-container">
                <p class="text"> ${val[4]}</p> 
                <p class="text"> ${val[5]}</p> 
                <p class="text text-alt"> ${val[6]}</p> 
                <p class="text"> ${val[7]}</p> 
            </div>
            <br>
            <p class="text">${val[8]}</p> 
            <p class="text">${val[9]}</p> 
            <p class="text">${val[10]}</p> 
            <br>
            <figure id="on-page-video">
                <iframe src="{ .current-embed-video-link }" height="380" class="image" loading="lazy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <figcaption>Video Representation: ${document.getElementById("secondary_title").value}</figcaption>
            </figure>
            <br><br>
            `
        }
        if (index === 0 && classN === 'listMain') {
            htmlCode_topics += `
            <h2 class="title-secondary h2-highlight" id="review-${index+1}">${val[0]}</h2>
            <p class="text">${val[1]}</p> 
            <p class="text">${val[2]}</p> 
            <p class="text">${val[3]}</p> 
            <div class="div-container"> 
               <ul>
                    <li class="text">${val[4]}</li> 
                    <li class="text">${val[5]}</li>
                    <li class="text">${val[6]}</li> 
                    <li class="text">${val[7]}</li> 
                    <li class="text">${val[8]}</li>
                    <li class="text">${val[9]}</li> 
                    <li class="text">${val[10]}</li> 
                    <li class="text">${val[11]}</li>
                    <li class="text">${val[12]}</li> 
                    <li class="text">${val[13]}</li>
               </ul>
            </div>
            <br>
            <p class="text">${val[14]}</p> 
            <p class="text">${val[15]}</p> 
            <p class="text">${val[16]}</p> 
            <br>
            <figure id="on-page-video">
                <iframe src="{ .current-embed-video-link }" height="380" class="image" loading="lazy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <figcaption>Video Representation: ${document.getElementById("secondary_title").value}</figcaption>
            </figure>
            <br><br>
            `
        }
        if (index === 0 && classN === 'listCustom') {

            htmlCode_second = `
            <h2 class="title-secondary h2-highlight" id="review-${index+1}">${val[0]}</h2>
            <p class="text">${val[1]}</p> 
            <p class="text">${val[2]}</p> 
            <p class="text">${val[3]}</p> 
            <div class="div-container"> 
                <ul>
            `;
            // generate the amount of list areas based on user input stored in variable numListItems
            for (let i = 4; i < 4 + parseInt(numListItems); i++) {
                htmlCode_topics += `<li class="text">${val[i]}</li>`;
            }

            htmlCode_topics += `</ul></div>`;

            let startIndex = 4 + parseInt(numListItems);
            htmlCode_topics += `
                <br>
                <p class="text">${val[startIndex]}</p> 
                <p class="text">${val[startIndex + 1]}</p> 
                <p class="text">${val[startIndex + 2]}</p> 
                <br>
                <figure id="on-page-video">
                    <iframe src="{ .current-embed-video-link }" height="380" class="image" loading="lazy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <figcaption>Video Representation: ${document.getElementById("secondary_title").value}</figcaption>
                 </figure>
            <br><br>
            `
        } else {
            if (classN === 'para' && index != 0) {
                htmlCode_topics += `
                <h2 class="title-secondary h2-highlight" id="review-${index+1}">${val[0]}</h2>
                <p class="text">${val[1]}</p> 
                <p class="text">${val[2]}</p> 
                <p class="text">${val[3]}</p> 
                <div class="div-container">
                    <p class="text"> ${val[4]}</p> 
                    <p class="text">  ${val[5]} </p>
                    <p class="text text-alt">  ${val[6]} </p> 
                    <p class="text">  ${val[7]} </p>
                </div>
                <br>
                <p class="text">${val[8]}</p> 
                <p class="text">${val[9]}</p> 
                <p class="text">${val[10]}</p> 
                <br><br>
                `
            }
            if (classN === 'listMain' && index != 0) {
                htmlCode_topics += `
                <h2 class="title-secondary h2-highlight" id="review-${index+1}">${val[0]}</h2>
                <p class="text">${val[1]}</p> 
                <p class="text">${val[2]}</p> 
                <p class="text">${val[3]}</p> 
                <div class="div-container"> 
                   <ul>
                        <li class="text">${val[4]}</li> 
                        <li class="text">${val[5]}</li>
                        <li class="text">${val[6]}</li> 
                        <li class="text">${val[7]}</li> 
                        <li class="text">${val[8]}</li>
                        <li class="text">${val[9]}</li> 
                        <li class="text">${val[10]}</li> 
                        <li class="text">${val[11]}</li>
                        <li class="text">${val[12]}</li> 
                        <li class="text">${val[13]}</li>
                   </ul>
                </div>
                <br>
                <p class="text">${val[14]}</p> 
                <p class="text">${val[15]}</p> 
                <p class="text">${val[16]}</p> 
                <br><br>
                `
            }
            if (classN == 'listCustom' && index != 0) {
                htmlCode_topics += `
                <h2 class="title-secondary h2-highlight" id="review-${index+1}">${val[0]}</h2>
                <p class="text">${val[1]}</p> 
                <p class="text">${val[2]}</p> 
                <p class="text">${val[3]}</p> 
                <div class="div-container"> 
                   <ul>
                `;

                for (let i = 4; i < 4 + parseInt(numListItems); i++) {
                    htmlCode_topics += `<li class="text">${val[i]}</li>`;
                }

                htmlCode_topics += `</ul></div>`;

                let startIndex = 4 + parseInt(numListItems);
                htmlCode_topics += `
                    <br>
                    <p class="text">${val[startIndex]}</p> 
                    <p class="text">${val[startIndex + 1]}</p> 
                    <p class="text">${val[startIndex + 2]}</p> 
                    <br><br>
                `;
            }
        }
    });

    htmlCode = htmlCode_first + htmlCode_second + htmlCode_topics + htmlCode_last; //create the entire html code     

    // Get date time
    const now = new Date();

    // Get the current year, month, and day
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are 0-indexed
    const day = now.getDate();

    // Format the date in the YYYY-MM-DD format
    const isoDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // Get the month names
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get the current month name
    const monthName = monthNames[month - 1];

    //   Replace instances with latest date
    htmlCode = htmlCode.replace(/{ .date-schema }/g, isoDate);
    htmlCode = htmlCode.replace(/{ .dateMM }/g, `${monthName} ${day}, ${year}`);

    // Replace Iframe Src instances
    const embed_video_link = document.getElementById('video-link').value;
    htmlCode = htmlCode.replace(/{ .current-embed-video-link }/g, embed_video_link);

    //Remove the word undefined or h2, p, div, ul, li, iframe elements with no content (if the inputs have spaces, it'll stay)
    htmlCode = htmlCode.replace(/<(ul|h2|li)[^>]*>\s*<\/\1>|<li><a[^>]*>\s*<\/a><\/li>|<div class="div-container">\s*<\/div>/gi, '');
    htmlCode = htmlCode.replace(/<iframe[^>]*src="" height="380" class="image" loading="lazy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen><\/iframe>/gi, '');
    htmlCode = htmlCode.replace(/<p class="text">(\s)*<\/p>/gi, '\n');
    htmlCode = htmlCode.replace(/<p class="text text-alt">(\s)*<\/p>/gi, '\n');
    htmlCode = htmlCode.replace(/<li class="text">(null|undefined|\s)*<\/li>/gi, '\n');
    htmlCode = htmlCode.replace(/<p class="text">(null|undefined|\s)*<\/p>/gi, '\n');
    htmlCode = htmlCode.replace(/undefined/gi, '');
    htmlCode = htmlCode.replace(/<li><a[^>]*>.*?{.*?}.*?<\/a><\/li>/gi, '');


    //remove the extra lines that come up
    //htmlCode = htmlCode.replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n');;
    htmlCode = htmlCode.replace(/\n\s*\n\s*\n/g, '\n');
}

replaceCode = () => {
    let o = htmlCode;
    for (const key in input) {
        let reg = new RegExp("{ ." + key + " }", 'g');
        o = o.replace(reg, input[key]);
    }

    //o has the final html code, but htmlCode still has the original 
    output.innerText = o;
};

/* Copy generated HTML code */
copy.addEventListener('click', event => {
    event.preventDefault();
    let r = document.createRange();
    r.selectNode(document.getElementById('output'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert("Copied To Clipboard");
});

// Api key stored to local storage to avoid being stolen, can update api key when necessary
var keyAccessBtn = document.getElementById("key-access");
keyAccessBtn.addEventListener("click", function (event) {
    event.preventDefault();
    // Create a new div element to hold the input and buttons
    var apiKeyDiv = document.createElement("div");
    apiKeyDiv.classList.add('ask-ai');

    // Create the input element
    var apiKeyInput = document.createElement("input");
    apiKeyInput.type = "text";
    apiKeyInput.placeholder = "Enter API Key";
    apiKeyInput.style.marginBottom = "5px";

    // Create the close button
    var apiCloseBtn = document.createElement("button");
    apiCloseBtn.innerHTML = "Close";
    apiCloseBtn.id = "closeAiGenerate";
    apiCloseBtn.addEventListener("click", function () {
        document.body.removeChild(apiKeyDiv);
    });

    // Create the submit button
    var apiSubmitBtn = document.createElement("button");
    apiSubmitBtn.innerHTML = "Submit";
    apiSubmitBtn.id = "aiGenerateText";
    apiSubmitBtn.addEventListener("click", function () {
        if (apiKeyInput.value == "") {
            alert("API key field is empty");
        } else {
            // Save the key to local storage
            localStorage.setItem("secureAI", apiKeyInput.value);
            document.body.removeChild(apiKeyDiv);
        }
    });

    // Add the input, close button, and submit button to the div
    apiKeyDiv.appendChild(apiKeyInput);
    apiKeyDiv.appendChild(document.createElement("br"));
    apiKeyDiv.appendChild(apiSubmitBtn);
    apiKeyDiv.appendChild(apiCloseBtn);

    // Add the div to the page
    document.body.appendChild(apiKeyDiv);
});

// Retrieve the key from local storage
var secureAI = localStorage.getItem("secureAI");

const nameSafe = "Bearer";

var AIbutton = document.getElementById('ai-gen');

const aiInstructions = "in a conversational and approachable tone that is easy to understand for the reader, write original and creative information for: In List Format - ";

AIbutton.onclick = async function () {
    event.preventDefault();
    // Create the popup container
    var askAI = document.createElement('div');
    askAI.classList.add('ask-ai');

    // Create the input field
    var inputAI = document.createElement('textarea');
    inputAI.type = 'text';
    inputAI.placeholder = 'Enter something';

    // Create the generate button
    var aigenerateButton = document.createElement('button');
    aigenerateButton.innerHTML = 'Generate';
    aigenerateButton.id = "aiGenerateText";
    aigenerateButton.onclick = async function () {

        // Check if the input value is empty before executing rest of code
        if (inputAI.value === "") {
            alert("Please enter a value");
            return;
        }

        const replacedAIValue = inputAI.value;
        const topicInsert = document.getElementById("TopicInsert").value;

        // match the text within brackets
        var matchFind = topicInsert.match(/\[(.*?)\]/);

        // check if input1 has brackets
        if (matchFind) {
            // Replace instances of "[blank]" in input2 with text inside the bracket
            const newAIValue = replacedAIValue.replace(/\[blank\]/g, matchFind[1]);

            // Show the loading element and blur background
            document.querySelector('.app-container').style.filter = 'blur(2px) brightness(0.5)';
            document.querySelector('.loading').style.display = 'block';

            // Call the OpenAI API to generate content
            const response = await fetch(`https://api.openai.com/v1/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${nameSafe} ${secureAI}`
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: aiInstructions + newAIValue + "?",
                    max_tokens: 500,
                }),
            });

            // Check if the request was successful
            if (!response.ok) {
                // Hide the loading element
                document.querySelector('.loading').style.display = 'none';

                // Display the error message
                console.error(`Error: ${response.status} ${response.statusText}`);
                return;
            }

            // Parse the response as JSON
            const data = await response.json();

            // Check if the data object has a choices property
            if (!data.choices) {
                // Hide the loading element
                document.querySelector('.loading').style.display = 'none';

                // Display the error message
                console.error(`Error: The data object does not have a 'choices' property.`);
                return;
            }

            // Hide the loading element and remove background blur
            document.querySelector('.loading').style.display = 'none';
            document.querySelector('.app-container').style.filter = 'none';

            // Update Text Area with new values
            inputAI.value = newAIValue;

            // Display the generated content in the page
            var output = document.getElementById("output");
            output.innerText = data.choices[0].text;

        }
    }

    // Create the close button
    var aicloseButton = document.createElement('button');
    aicloseButton.innerHTML = 'Close';
    aicloseButton.id = "closeAiGenerate";
    aicloseButton.onclick = function () {
        document.body.removeChild(askAI);
    }

    // Add the input field, buttons, and close button to the popup container
    askAI.appendChild(inputAI);
    askAI.appendChild(aigenerateButton);
    askAI.appendChild(aicloseButton);

    // Add the popup container to the body of the page
    document.body.appendChild(askAI);
}

// Toggle Icon To Hide Topic Insert
// Get references to the input field and the icon
const inputField = document.getElementById("TopicInsert");
const icon = document.getElementById("toggle-icon");
const toggleButton = document.getElementById("toggleButton");

// Add a click event listener to the toggle button
toggleButton.addEventListener("click", function () {
    // Toggle the visibility of the input field
    if (inputField.style.display === "none") {
        inputField.style.display = "block";
        // Change the icon to the up arrow
        icon.classList.remove("fa-circle-chevron-down");
        icon.classList.add("fa-circle-chevron-up");
        toggleButton.classList.remove("toggle-btn-top");
    } else {
        inputField.style.display = "none";
        // Change the icon to the down arrow
        icon.classList.remove("fa-circle-chevron-up");
        icon.classList.add("fa-circle-chevron-down");
        toggleButton.classList.add("toggle-btn-top");
    }
});


// Linkify any selected text in the output area of the workspace
document.addEventListener('contextmenu', function (event) {
    // Check if the user has highlighted text and if the click event is inside the output div
    var outputDiv = event.target.closest("#output");
    if (outputDiv) {
        var selection = window.getSelection();
        if (selection.toString().length > 0) {
            event.preventDefault();
            // Ask the user for the link URL
            var linkURL = prompt("Enter the link URL:");
            // Check if the user entered a URL
            if (linkURL) {
                // Create a new link element
                var link = document.createElement('a');
                link.href = linkURL;
                link.innerText = selection;

                // Replace the highlighted text with the link as html version
                selection.deleteFromDocument();
                var html = link.outerHTML;
                var textNode = document.createTextNode(html);
                selection.getRangeAt(0).insertNode(textNode);
            }
        }
    }
});

// Pre/ Page Inputs Label Color Code if left empty vs filled
document.querySelector('body').addEventListener('input', function (event) {
    const target = event.target;
    if (target.matches('input, textarea')) {
        const label = document.querySelector(`label[for=${target.id}]`);
        if (target.value.trim() !== "") {
            label.style.color = "#86CD82";
        } else {
            label.style.color = "";
        }
    }
});

//  Popup For Outdated Blog Posts On Site, If Blog Posts Are Outdated An Alert Will Show On Editorial Page advising editor/ owner to update the recommended pages with provided links
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

// Fetch the homepage to get the all-blogs div
fetch("https://cruisesnitch.com")
    .then((response) => response.text())
    .then((html) => {
        // Parse the homepage as a DOM document
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Find the div element with id "all-blogs"
        const allBlogsDiv = doc.getElementById("all-blogs");

        // Find all the blogLinks within the div element
        const blogLinks = allBlogsDiv.getElementsByTagName("a");

        // Create a container element for the popup messages
        const popupDiv = document.createElement("div");
        const popupAlertIcon = document.createElement("i");
        popupAlertIcon.className = "fa-solid fa-circle-exclamation";
        popupAlertIcon.style.position = "fixed";
        popupAlertIcon.style.right = "1%";
        popupAlertIcon.style.color = "red";
        popupAlertIcon.style.fontSize = "18px";
        popupAlertIcon.style.background = "aliceblue";
        popupAlertIcon.style.borderRadius = "100%";
        popupAlertIcon.style.border = "2px solid aliceblue";
        const popupContainer = document.createElement("div");
        popupContainer.style.position = "fixed";
        popupContainer.style.bottom = "0";
        popupContainer.style.right = "0";
        popupContainer.style.maxWidth = "450px"; // Set the width of the container
        popupContainer.style.height = "200px"; // Set the height of the container
        popupContainer.style.borderRadius = "5px";
        popupContainer.style.zIndex = "9999";
        popupContainer.style.overflowY = "scroll";
        popupDiv.appendChild(popupAlertIcon);
        document.body.appendChild(popupContainer);

        // Create an array to store outdated pages
        const outdatedPages = [];

        // Add event listener to the popup icon to toggle the visibility of the popup container
        popupAlertIcon.addEventListener("click", () => {
            popupContainer.classList.toggle("outdated-blog-alert");
        });

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
                    const currentDate = new Date().toISOString().substring(0, 23) + "Z";
                    const cutoffDate = new Date(currentDate); // UTC timezone
                    const datetime = doc.querySelector("[datetime]");
                    if (datetime) {
                        const dateString = datetime.getAttribute("datetime").slice(0, 10);
                        const date = new Date(dateString);
                        const diffTime = Math.abs(cutoffDate.getTime() - date.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        const diffWeeks = Math.ceil(diffDays / 7);
                        const diffMonths = diffDays / 30;
                        // Check if the date is older than the cutoff date
                        if (diffDays > 91.25 || diffWeeks > 13.036 || diffMonths > 3) {
                            const domain = 'https://cruisesnitch.com';
                            // Create a popup with a message indicating that the page is outdated
                            const popup = document.createElement("div");
                            popup.style.fontSize = "12px";
                            popup.style.maxWidth = "600px";
                            popup.style.backgroundColor = "#ffffff";
                            popup.style.padding = "20px";
                            popup.style.marginBottom = "5px";
                            popup.style.borderRadius = "5px";
                            popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
                            popup.innerHTML = `<span style="color: black">The table content of this page is now outdated. Please update:</span> <span style="color: red">${dateString}</span> <br><a href="${blogLink.href.replace(/^file:\/\/\/[A-Za-z]:/, domain)}" target="_blank">${blogLink.href.replace(/^file:\/\/\/[A-Za-z]:/, domain)}</a>`;
                            popupDiv.appendChild(popup)
                            popupContainer.appendChild(popupDiv);
                            outdatedPages.push(popup); // Add the popup to the array of outdated pages

                        }
                    }
            })
        .catch(error => console.error(`Failed to fetch ${blogLink.href}`, error));
    }
});