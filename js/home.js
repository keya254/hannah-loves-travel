var article_id = "home";

getContentData(article_id, true);

var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

function populateHomeImages(json_obj) {
	var img_url;

	// Hero image
	img_url = json_obj.hero_img + 'w' + (width + 200) + '-no';
	setBgImage('header_img_container', img_url, "cover", "center");

	// Globetrotting image
	img_url = json_obj.globe_img;
	setBgImage('globe', img_url, "cover", "center");

	// USA image
	img_url = json_obj.usa_img;
	setBgImage('usa', img_url, "cover", "center");

	// Doggie image
	img_url = json_obj.doggie_img;
	setBgImage('doggie', img_url, "cover", "center");
}

showNav();
showFooter();