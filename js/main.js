var current_cnt = {};

function initializeSlides(set) {
  current_cnt[set] = 1;
}

function showSlides(n, set, set_caption) {
  var i;
  var slides = document.getElementsByClassName(set);
  var caption = document.getElementsByClassName(set_caption)[0];
  var currentSlide;

  if (n > slides.length) {
    current_cnt[set] = 1;
  } 
  
  if (n < 1) {
    current_cnt[set] = slides.length;
  }
  
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }

  n = current_cnt[set];
  currentSlide = slides[n-1];
  currentSlide.style.display = "block";
  caption.innerHTML = currentSlide.getElementsByTagName("p")[0].innerHTML;
  console.log(caption.innerHTML);
}

function plusSlides(n, set, set_caption) {
  current_cnt[set] += n;
  showSlides(current_cnt[set], set, set_caption);
}

function toggleNav() {
    var nav_bar = document.getElementById("responsive_nav");
    var nav_banner = document.getElementsByClassName("navigation");
    var title = document.getElementsByTagName("li");

    nav_bar.style.height = "200px";

    if (nav_bar.className === "top_nav") {
        nav_bar.className += " responsive";
    } 
    else {
        nav_bar.className = "top_nav";
    }
}