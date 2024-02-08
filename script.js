
//imagesliders

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

//index announcements
function startSlider(slideClass) {
    let currentIndex = 0;
    const slides = document.querySelectorAll(slideClass);

    setInterval(() => {
        slides[currentIndex].style.opacity = 0;
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].style.opacity = 1;
    }, 3000); // Change slide every 3 seconds
}
document.addEventListener('DOMContentLoaded', function() {
    startSlider('.quote-slide');
});
document.addEventListener('DOMContentLoaded', function() {
    startSlider('.unique-quote-slide');
});

//login

function login() {
    // Get values from the input fields
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if the username and password match (you can replace this with your authentication logic)
    if (username === "user" && password === "password") {
        // If matched, redirect to the profile page
        window.location.href = "profile.html";
    } else {
        // If not matched, show an alert (you can customize this part)
        alert("Invalid username or password. Please try again.");
    }
}

