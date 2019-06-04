const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const ifEqualsHelper = require("./helpers/if_equals.js");
const codeSampleHelper = require("./helpers/code_sample.js");

const handlebarsPath = path.join(__dirname, "..", "..", "handlebars");
const partialsPath = path.join(handlebarsPath, "_partials");
const htmlPath = path.join(__dirname, "..", "..", "html");

Handlebars.registerHelper("if-equals", ifEqualsHelper());
Handlebars.registerHelper("code-sample", codeSampleHelper(handlebarsPath));

function log(string) {
  console.log(`[${__filename}]: ${string}`);
}

function isHandleBarsFile(filename) {
  const extension = path.extname(filename);
  return extension === ".hbs";
}

const partials = fs.readdirSync(partialsPath);
partials.forEach(function(partial) {
  if (isHandleBarsFile(partial)) {
    const partialName = path.basename(partial, ".hbs");
    const partialFilename = path.join(partialsPath, partial);
    const partialSource = fs.readFileSync(partialFilename, "UTF-8");

    log(`📝 Registering '${partialName}' from '${partial}'`);
    Handlebars.registerPartial(partialName, partialSource);
  } else {
    log(`⚠️ '${partial}' is not a Handlebars file`);
  }
});

const templates = fs.readdirSync(handlebarsPath);
templates.forEach(function(template) {
  if (isHandleBarsFile(template)) {
    const basename = path.basename(template, ".hbs");

    const htmlFilename = path.join(htmlPath, basename) + ".html";
    const templateFilename = path.join(handlebarsPath, template);

    const templateSource = fs.readFileSync(templateFilename, "UTF-8");
    const compiledTemplate = Handlebars.compile(templateSource);
    const html = compiledTemplate({});

    log(`✅ Compiling '${template}' into '${htmlFilename}'`);

    fs.writeFileSync(htmlFilename, html);
  } else {
    log(`⚠️  '${template}' is not a Handlebars file`);
  }
});
