const http = require("http");
const url = require("url");
const fs = require("fs");

let overview = fs.readFileSync("./templates/overview.html", "utf-8");
let blog = fs.readFileSync("./templates/blog.html", "utf-8");
let data = fs.readFileSync("./data/data.json", "utf-8");
dataObject = JSON.parse(data);

function replaceTemplate(blog, el) {
  let output = blog.replace("{%heading%}", el.heading);
  output = blog.replace("{%url%}", el.url);
  //output = blog.replace("{%content%}",product )

  return output;
}

let server = http.createServer((req, res) => {
  console.log(url.parse(req.url));

  let request = req.url;

  if (request === "/" || request === "/overview") {
    let result = dataObject.map(el => replaceTemplate(blog, el));
    let newResult = result.join("");

    console.log(newResult);

    res.writeHead(200, { "content-type": "text/html" });
    res.end(newResult);
  }
});

server.listen(4000, "localhost");
