// announcement-full.js
//
// imports a full announcement to fill the page

async function fetchPage(pg) {
	try {
		const response = await fetch(pg)
		if (!response.ok) { throw new Error("oopsie") }
		const data = await response.text()
		return data
	} catch(error) {
		console.error("woops")
	}
}

async function main() {
	let annCont = await fetchPage("/pages/ann.html")
	const parser = new DOMParser()
	const doc = parser.parseFromString(annCont, "text/html")
	const divs = doc.querySelectorAll("div[id]")
	const idNumbers = Array.from(divs).map(div => parseInt(div.id, 10))

	const url = new URL(window.location.href)
	const selected = url.searchParams.get("ann")

	let ann = doc.getElementById(selected).innerHTML
	let date = doc.getElementById(selected).getAttribute("date")
	let title = doc.getElementById(selected).getAttribute("anntitle")
	let imagesrc = doc.getElementById(selected).getAttribute("imgsrc") || `/assets/ann/${selected}.png`
	let id = selected

	document.getElementById("BACKLINK").href = `/landing.html?p=main#${selected}`
	document.getElementById("IMAGE").src = imagesrc
	document.getElementById("TITLE").innerHTML = title || "Title Text Here"
	document.getElementById("DATE").innerHTML = date || "1970/01/01"
	document.getElementById("ID").innerHTML = id || "?"
	document.getElementById("CONT").innerHTML = ann || "If you are seeing this, an error has occured."
}

main()
