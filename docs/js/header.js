// /js/header.js
				// in the example of https://example.com/index.html?p=main:
				// "/index.html" + "?p=main"
let currentLink = window.location.pathname + window.location.search
console.log(currentLink)
Array.from(document.querySelectorAll('.hdrlnk')).forEach(function(item) {
	let link = item.getAttribute('href')
	if (link !== currentLink) {
		// change the header link's colour if it isn't the current link
		item.style.color = "#c0c0c0"
	}
})
