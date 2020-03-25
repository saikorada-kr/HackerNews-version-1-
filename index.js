const http = require("http");
const url = require("url");
const fs = require("fs");

let overview = fs.readFileSync("./templates/overview.html", "utf-8");
let blog = fs.readFileSync("./templates/blog.html", "utf-8");
let data = fs.readFileSync("./data/data.json", "utf-8");
dataObject = JSON.parse(data);

function replaceTemplate(blog) {
  output = blog.replace("{%link%}");
}

let server = http.createServer((req, res) => {
  console.log(url.parse(req.url));

  let request = req.url;

  if (request === "/" || request === "/overview") {
    let result = data.map(el => replaceTemplate(template, el));

    let newoverview = overview.replace("{%blog%}", blog);
    res.writeHead(200, { "content-type": "text/html" });
    res.end(newoverview);
  }
});

server.listen(4000, "localhost");
