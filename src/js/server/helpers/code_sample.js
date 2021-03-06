const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");
const hljs = require("highlight.js/lib/highlight");
const bnf = require("highlight.js/lib/languages/bnf.js");
const timeline = require("../highlighters/timeline.js");
const timelineSimulation = require("../highlighters/timeline-simulation.js");

hljs.registerLanguage("timeline", timeline);
hljs.registerLanguage("simulation", timelineSimulation);
hljs.registerLanguage("bnf", bnf);

module.exports = function(handlebarsPath) {
  return function(codeFilePath) {
    const file = path.join(handlebarsPath, "_code-samples", codeFilePath);
    const code = fs.readFileSync(file, "UTF-8");
    const language = path.extname(codeFilePath);

    let highlighted = { value: code };

    if (language === ".timeline") {
      highlighted = hljs.highlight("timeline", code);
    } else if (language == ".simulation") {
      highlighted = hljs.highlight("simulation", code);
    } else if (language == ".bnf") {
      highlighted = hljs.highlight("bnf", code);
    }

    return new Handlebars.SafeString(highlighted.value);
  };
};
