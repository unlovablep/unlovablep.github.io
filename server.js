#!/usr/bin/env node
// borrowed from an answer to:
// https://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server
// with slight modification

const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const usedir = path.join(process.cwd(), "./public/")
const port = process.argv[2] || 8888

if (!fs.statSync(usedir).isDirectory()) {
	console.log("Provided path is not a directory")
	process.exit(1)
}

http.createServer(function(request,response) {
	
	var uri = url.parse(request.url).pathname
	var filename = path.join(usedir, uri)

	var contentTypesByExtension = {
		// txt
		".html":	"text/html",
		".css":		"text/css",
		".js":		"text/javascript",
		// image
		".apng":	"image/apng",
		".png":		"image/png",
		".bmp":		"image/bmp",
		".avif":	"image/avif",
		".jpeg":	"image/jpeg",
		".webp":	"image/webp",
		".ico":		"image/vnd.microsoft.icon",
		".svg":		"image/svg+xml",
		// video
		".mp4":		"video/mp4",
		// audio
		".mp3":		"video/mp3",
		".aac":		"audio/aac",
	}

	fs.exists(filename, function(exists) {
		if (!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"})
			response.write("404 Not Found\n")
			response.end()
			return
		}

		if (fs.statSync(filename).isDirectory()) filename += '/index.html'

		fs.readFile(filename, "binary", function(err, file) {
			if (err) {
				response.writeHead(500, {"Content-Type": "text/plain"})
				response.write(err + "\n")
				response.end()
				return
			}

			var headers = {}
			var contentType = contentTypesByExtension[path.extname(filename)]
			if (contentType) headers["Content-Type"] = contentType
			response.writeHead(200, headers)
			response.write(file, "binary")
			response.end()
		})
	})
}).listen(parseInt(port, 10))

console.log("Running at | http://localhost:" + port + " | in directory | " + usedir + " |")
