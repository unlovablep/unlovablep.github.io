// dynamic-page.js

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
	const page = "/pages/" + url.searchParams.get("p") + ".html"

	console.log(`PAGE\t: ${page}`)

	let pageContents = await fetchPage(page)
	if (!pageContents) {
		console.error("Couldn't fetch page contents")
		pageContents = "This page couldn't be loaded."
	}

	//end
	document.getElementById("page").innerHTML = pageContents
}
main()
