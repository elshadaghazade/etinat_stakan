// Button Scroll to Top
var btnScrollToTop = document.querySelector("#scrolltoTop")
btnScrollToTop.addEventListener("click", function() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    })
    // const btnScrollToTop = document.querySelector("#scrolltoTop")
    // window.addEventListener("scroll", () => {
    //   if (window.pageYOffset > 100) {
    //     btnScrollToTop.classList.add("active");
    //   } else {
    //     btnScrollToTop.classList.remove("active")
    //   }
    // })
    //Get the button:
mybutton = document.getElementById("scrolltoTop");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}