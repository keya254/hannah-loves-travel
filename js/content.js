// An array used to store slideshow ids for initializing all the slideshows on a page
var slideshow_id_list = [];

// Grab the data from server via JSON
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json_obj = JSON.parse(this.responseText);
        createHero(json_obj);
		displaySections(json_obj);
    }
};
xmlhttp.open("GET", "../page_content.php", true);
xmlhttp.send();

// Set up hero section of the page
function createHero(data_obj){
	// Hero image
	var header_img = document.getElementsByClassName('header_img_container');
	var img_url = data_obj.hero_img + 'w1600-no';
	var full_url = "url('" + img_url + "')";
	header_img[0].style.backgroundImage = full_url;
	header_img[0].style.backgroundSize = "cover";
	header_img[0].style.backgroundPosition = "top";

	// Hero text
	var hero = document.getElementsByClassName('hero');
	hero[0].innerHTML="<h1>" + data_obj.title + "</h1>" + "<p>" + data_obj.description + "</p>";
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
	slideshow_id_list = [];
}

// Create a subsection in the page
function createSection(section_obj) {
	var return_string = "<article>";

	// Add section title
	var section_title = section_obj.section_title;
	return_string += "<h2 class=\"block-title\">" + section_title + "</h2>";

	// Create the slideshow
	var slideshow = "<div class=\"slideshow_container\">";
	var slideshow_id = section_title;
	var slide_list = section_obj.slideshow;
	var slide;
	var index;
	// Loop through and create each slide
	for (index = 0; index < slide_list.length; index++) {
		slide = slide_list[index];
		slideshow += createSlide(slide, slideshow_id);
	}
	// Add the controls
	var caption_id = slideshow_id + "_caption";
	slideshow += "<div class=\"slideshow_bottom\"><p class=\"caption "+ caption_id + "\"></p><div class=\"slideshow_controls\">1 of 5<a class=\"prev\" onclick=\"plusSlides(-1, '" + slideshow_id + "', '" + caption_id + "')\">&#10094;</a><a class=\"next\" onclick=\"plusSlides(1, '" + slideshow_id + "', '" + caption_id + "')\">&#10095;</a></div></div>";

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
	var img_url = slide_obj.img + 'w1200-no';
	return_string += "<img src=\"" + img_url + "\">";
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
}
