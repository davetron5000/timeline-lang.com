var fs         = require("fs");
var path       = require("path");
var Handlebars = require("handlebars");

var handlebarsPath = path.join(__dirname,"..","handlebars");
var partialsPath   = path.join(handlebarsPath,"_partials");
var htmlPath       = path.join(__dirname,"..","html");

var partials = fs.readdirSync(partialsPath);

for (var i = 0; i < partials.length; i++) {
  var partial = partials[i];
  if (path.extname(partial) === ".hbs") {

    var hbs         = fs.readFileSync(path.join(partialsPath, partial) ,"UTF-8");
    var partialName = path.basename(partial,".hbs");

    Handlebars.registerPartial(partialName, hbs)
  }
}

var files = fs.readdirSync(handlebarsPath);
for (var i = 0; i < files.length; i++) {
  var file = files[i];
  if (path.extname(file) === ".hbs") {

    var contents = fs.readFileSync(path.join(handlebarsPath,file), "UTF-8");
    var template = Handlebars.compile(contents);
    var html     = template({});

    fs.writeFileSync(path.join(htmlPath,path.basename(file,".hbs") + ".html"), html);
  }
}

