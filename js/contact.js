let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    searchIcon.classList.remove('fa-times');
    searchForm.classList.remove('active');
}

// Contact Send to avoid spam and hide email from email crawlers
const contactSend = document.getElementById("contact-submit");
const action = "https://formsubmit.co/novatechoffice@gmail.com";

contactSend.addEventListener("click", () => {
    document.getElementById("gamelounge-contact").action = action;
});