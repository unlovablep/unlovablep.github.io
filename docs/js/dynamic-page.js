// dynamic-page.js
// 

if (!window.location.search) { window.location.href = "/landing.html?p=main" }

async function fetchPage(pg) {
	try {
		const response = await fetch(pg)
		if (!response.ok) { throw new Error("oopsie") }
		const data = await response.text()
		return data
	} catch (error) {
		console.error("woops")
	}
}

async function main() {
	const url = new URL(window.location.href)
	const page = "/pages/" + url.searchParams.get("p") + ".txt"

	console.log(`PAGE\t: ${page}`)

	let pageContents = await fetchPage(page)
	if (!pageContents) {
		console.error("Couldn't fetch page contents")
		pageContents = "<p>This page couldn't be loaded, or does not exist.</p>" +
			"<p>If you require assistance, please ask through one of my <a href=\"/paige.html\">contacts</a>.</p>"
	}

	// end
	document.getElementById("page").innerHTML = pageContents

	// handle script tags
	const pageElement = document.getElementById("page")
	const scripts = pageElement.querySelectorAll("script")
	scripts.forEach(script => {
		const newScript = document.createElement("script")
		if (script.src) {
			newScript.src = script.src
			newScript.async = false
		} else {
			newScript.textContent = script.textContent
		}
		document.body.appendChild(newScript)
	})
}
main()
