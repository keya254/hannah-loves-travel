// An array used to store slideshow ids for initializing all the slideshows on a page
var slideshow_id_list = [];
// Counts for keeping track of which slide the slideshow is currently on
var current_cnt = {};
// URL splittler
var splitter = "?";

// Grab the width of the browser, to be used later for image sizes
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// Parse out the article id, assuming url format: ?article_id, e.g. ?slovenia
var article_id = "";
var params = window.location.search.split(splitter);
if (params.length < 2) {
	// Default to homepage if no id is specified
	// TODO: Redirect to index.html
	article_id = "home";
} else {
	var param_index = params.length - 1;
	article_id = params[param_index];
}

// Call the server for page data
getContentData(article_id, false);

showNav();
showFooter();

// Set up hero section of the page
function createHero(data_obj){
	// Hero image
	var img_url = data_obj.hero_img + 'w' + (width + 200) + '-no';
	var img_position = "center"; // Default position of background image

	if (data_obj.img_position) {
		img_position = data_obj.img_position;
	}
	setBgImage('header_img_container', img_url, "cover", img_position);

	// Hero text
	var hero = document.getElementsByClassName('hero');
	hero[0].innerHTML="<h1>" + data_obj.title + "</h1>" + "<p>" + data_obj.description + "</p>";
}

// Display the main content of the page, either it being a list of articles or the different sections of an article
function displayMainContent(data_obj) {
	if (data_obj.sections) {
		displaySections(data_obj);
	}

	if (data_obj.article_list) {
		displayArticleList(data_obj);
	}
}

// Loop through the array and create a list of articles
function displayArticleList(data_obj) {
	var article_list = data_obj.article_list;
	var index;
	var article;
	var page_content = document.getElementsByClassName('content_container')[0];
	var innerHTML_string = "<article class=\"list\">";
	
	for (index = 0; index < article_list.length; index++) {
		article = article_list[index];
		var article_title = article.article_title;
		var article_img = article.article_img;
		var article_url = splitter + article.article_id;
		if (article.article_active) {
			innerHTML_string += "<a class=\"title_link\" href=\"" + article_url + "\"><div class=\"link_img_container\" style=\"background-image:url(" + article_img + ")\"></div>" + article_title + "</a>";
		} else {
			innerHTML_string += "<a class=\"title_link inactive\" href=\"" + article_url + "\"><div class=\"link_img_container\" style=\"background-image:url(" + article_img + ")\"></div>" + article_title + "</a>";
		}
	}

	innerHTML_string += "</article>";

	page_content.innerHTML = innerHTML_string;
}

// Loop through the array and create subsections of the page
function displaySections(data_obj) {
	var section_list = data_obj.sections;
	var index;
	var section;
	var page_content = document.getElementsByClassName('content_container')[0];
	page_content.innerHTML = "";
	for (index = 0; index < section_list.length; index++) {
		page_content.innerHTML += createSection(section_list[index]);
	}

	// Intialize all the slideshows on the page
	intializeSlideshows();
}

// Create a subsection in the page
function createSection(section_obj) {
	var return_string = "<article>";

	// Add section title
	var section_title = section_obj.section_title;
	return_string += "<h2 class=\"block-title\">" + section_title + "</h2>";

	// Create the slideshow
	var slideshow_id = section_title;
	// The slide_container is used to host all images in the slide and act as the "touch-activated" area for swipes
	var slideshow = "<div class=\"slideshow_container\"><div class=\"slide_container\" id=\"" + slideshow_id + "\">";
	var slide_list = section_obj.slideshow;
	var slide;
	var index;
	// Loop through and create each slide
	for (index = 0; index < slide_list.length; index++) {
		slide = slide_list[index];
		slideshow += createSlide(slide, slideshow_id);
	}
	slideshow += "</div>";
	// Add the controls
	var caption_id = slideshow_id + "_caption";
	slideshow += "<p class=\"caption "+ caption_id + "\"></p><a class=\"prev\" onclick=\"plusSlides(-1, '" + slideshow_id + "', '" + caption_id + "')\">&#10094;</a><a class=\"next\" onclick=\"plusSlides(1, '" + slideshow_id + "', '" + caption_id + "')\">&#10095;</a>";

	// Add the slideshow_id to the list of slideshows for initialization
	slideshow_id_list.push(slideshow_id);

	// Add the slideshow to the inner html
	return_string += slideshow + "</div>";

	// Add the paragraphs
	return_string += "<p class=\"left\">" + section_obj.tips_left + "</p>";
	return_string += "<p class=\"right\">" + section_obj.tips_right + "</p>";


	return return_string + "</article>";
}

// Create a single slide in a slideshow
function createSlide(slide_obj, set) {
	var return_string = "<div class=\"slide fade " + set + "\">";
	var img_url = "";
	if (slide_obj.vertical) {
		img_url = slide_obj.img + 'h700-no';
		return_string += "<img class=\"vertical\" src=\"" + img_url + "\">";
	} else {
		img_url = slide_obj.img + 'w' + (width + 200) + '-no';
		return_string += "<img src=\"" + img_url + "\">";
	}
	return_string += "<p>" + slide_obj.caption + "</p>";

	return return_string + "</div>";
}	

// Intialize all the slideshows on the page
function intializeSlideshows() {
	var slideshow_list = document.getElementsByClassName('slideshow_container');
	var index;
	var slideshow_id;
	for (index = 0; index < slideshow_list.length; index++) {
		slideshow_id = slideshow_id_list[index];	
		initializeSlides(slideshow_id);
		showSlides(current_cnt[slideshow_id], slideshow_id, slideshow_id+'_caption');
	}

	addSwipeHandlers();
}

// Initializes the slideshow
function initializeSlides(set) {
  current_cnt[set] = 1;
}

// Display a given slide
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

// Move to the previous or next slide
function plusSlides(n, set, set_caption) {
  current_cnt[set] += n;
  showSlides(current_cnt[set], set, set_caption);
}

// Handle left and right swipes on the slideshows
function addSwipeHandlers() {
	var slideshow_container = document.getElementsByClassName('slide_container');
	var startX; // Touch start x position
	var distance;
	var min_distance = 100; // Minimum distance of a swipe to be considered valid
	var index;

	for (index = 0; index < slideshow_container.length; index++) {
		slideshow_container[index].addEventListener('touchstart', function(event) {
		    var touch = event.changedTouches[0];
		    distance = 0;
		    startX = touch.pageX;
		}, false);

		slideshow_container[index].addEventListener('touchend', function(event) {
		    var touch = event.changedTouches[0];
		    distance = touch.pageX - startX;

	        if (Math.abs(distance) >= min_distance) {
	        	var slideshow_id = this.id; // Get the id for that slideshow
				var caption_id = slideshow_id + '_caption';
	        	if (distance > 0) {
	        		// In this case, it's a swipe right, the equivalent of clicking on "prev"
	        		plusSlides(-1, slideshow_id, caption_id);
	        		
	        	} else {
	        		// In this case, it's a swipe left, the equivalent of clicking on "next"
	        		plusSlides(1, slideshow_id, caption_id);
	        	}
	        }
		}, false);
	}
}
