// Initialization functinos
document.addEventListener('DOMContentLoaded', function() {
	buildTOC()
	convertSocials()
});

// Parallax scrolling for background
window.addEventListener('scroll', doParallax);
function doParallax(){
   var positionY = window.pageYOffset/20;
   document.getElementById("bg-div").style.backgroundPosition = "0 -" + positionY + "px";
}


// Automatically builds the table of contents
function buildTOC() {
	const item_divs = document.getElementsByClassName("item")
	const toc_ul = document.getElementById("toc-list")

	// Loop through the item divs
	for (let i=0;i<item_divs.length;i++) {

		// Get the item div
		let item_div = item_divs[i]

		// Add IDs, for the TOC links
		let item_id = "item-" + i;
		item_div.setAttribute("id", item_id)

		//  Build the TOC list
		let toc_li = document.createElement("li")
		let toc_a = document.createElement("a")

		toc_a.href= "#" + item_id
		toc_a.innerHTML = item_div.children[0].innerHTML + "<br><span class=toc-small-text>" + item_div.children[1].innerHTML + "</span>";

		toc_li.appendChild(toc_a)
		toc_ul.appendChild(toc_li)

	}

}



// Converts <social> tags to links
function convertSocials() {

	// Get the social tags
	const social_tags = document.getElementsByTagName("social")

	// Loop through the social tags
	while (social_tags.length > 0) {

		// Get the info from the <social> tag
		social = social_tags[0]
		platform = social.getAttribute("platform")
		handle = social.textContent

		// Send info the function below, returns an object with url and text.
		social_obj = getPlatformUrl(platform, handle)

		// build the link text
		let social_link = document.createElement("a")
		social_link.href = social_obj["url"]
		social_link.innerHTML = social_obj["text"]

		// Replace the <social> with the <a>
		social.replaceWith(social_link)

	}


	function getPlatformUrl(p, h) {
		switch(p) {

			case("instagram"):
				return({
					"text" : ("ig @" + h),
					"url" : ("https://www.instagram.com/" + h)
					})
				break;

			case("twitter"):
				return({
					"text" : ("tw @" + h),
					"url": ("https://twitter.com/" + h)
				})
				break;

			case("tiktok"):
				return({
					"text" : ("tk @" + h),
					"url" : ("https://www.tiktok.com/@" + h)
				})
				break;

		}
	}


}