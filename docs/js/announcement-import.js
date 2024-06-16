// announcement-import.js
//
// imports announcement titles/dates/ids/images to the main page

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
	let annCont = await fetchPage("/pages/ann.txt")
	const parser = new DOMParser()
	const doc = parser.parseFromString(annCont, "text/html")
	const divs = doc.querySelectorAll("div[id]")
	const idNumbers = Array.from(divs).map(div => parseInt(div.id, 10))
	idNumbers.sort((a,b) => b-a)
	for (let i = 0; i < idNumbers.length; i++) {
		if (!idNumbers[i]) { continue }
		let ann = doc.getElementById(idNumbers[i].toString()).innerHTML
		let date = `<p>${doc.getElementById(idNumbers[i].toString()).getAttribute("date")}</p>`
		let title = `<h3 style="color:#ff7fc0"><a href="/landing.html?p=anndisp&ann=${idNumbers[i]}">${doc.getElementById(idNumbers[i].toString()).getAttribute("anntitle")}</a></h3>`
		let imgsrc = doc.getElementById(idNumbers[i].toString()).getAttribute("imgsrc") || `/assets/ann/${idNumbers[i]}.png`
		let image = `<img style="border:2px solid #ffcbfa;background:#7f7f7f;float:left;width:48px;height:48px;margin-right:12px;" src="${imgsrc}">`
		let id = `<p style="color:#7f7f7f;">${idNumbers[i]}</p>`
		document.getElementById("announcements").innerHTML += `<div id=${i+1}><div style="line-height:0.25;text-align:left;">${image}${title}${date}${id}</div><hr></div>`
	}
}

main()
