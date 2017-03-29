// Grab the data from server via JSON
function getContentData(article_id, isHomePage) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200 && this.responseText != "") {
          var json_obj = JSON.parse(this.responseText);
          if (isHomePage) {
            populateHomeImages(json_obj);
          } else {
            createHero(json_obj);
            displayMainContent(json_obj);
          }
      }
      else {
        //TODO: Display an error page
        console.log(this.responseText);
      }
  };
  xmlhttp.open("POST", "../page_content.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("param=" + article_id);
}

// Set a background image for a div
function setBgImage(img_div_name, img_url, size, position) {
  var img_div;
  var full_url;

  img_div = document.getElementsByClassName(img_div_name);
  full_url = "url('" + img_url + "')";
  img_div[0].style.backgroundImage = full_url;
  img_div[0].style.backgroundSize = size;
  img_div[0].style.backgroundPosition = position;
}

function showNav() {
  var nav_div = document.getElementsByClassName('navigation');
  nav_div[0].innerHTML = "<img src=\"assets/hlt_logo.svg\"><ul class=\"top_nav\" id=\"responsive_nav\"><li class=\"title\"><a class=\"nav_link\" href=\"javascript:void(0);\" onclick=\"toggleNav()\">MENU</a></li><li class=\"home\"><a class=\"nav_link\" href=\"index.html\">HOME</a></li><li><a class=\"nav_link\" href=\"enroute.html?globetrotting\">GLOBETROTTING</a></li><li><a class=\"nav_link\" href=\"enroute.html?usa\">U.S.A</a></li><li><a class=\"nav_link\" href=\"enroute.html?doggie\">DOGGIE TRIPS</a></li></ul>";
}

function showFooter() {
  var footer_div = document.getElementsByTagName('footer');
  footer_div[0].innerHTML = "<p>Copyright 2017 Zheng (Hannah) Yang</p>";
}

// Mobile nav
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