// Initialization functinos
document.addEventListener('DOMContentLoaded', function() {
	buildTOC()
});


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