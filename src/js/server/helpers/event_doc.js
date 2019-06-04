const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

function parseEventName(line, filename) {
  const matchresult = line.match(/^event (.*) takes \[$/)

  if (matchresult === null) {
    throw `${line} does not declare an event, from file ${filename}`;
  }

  return matchresult[1];
}

module.exports = function(eventDocPath) {
  return function(eventPath) {

    const filename = path.join(eventDocPath, eventPath + ".timeline-doc");

    const eventDoc = fs.readFileSync(filename,"UTF-8");
    const lines = eventDoc.split("\n");
    const firstLine = lines.shift();

    const eventName = parseEventName(firstLine,filename);
    const slug = eventName.split(" ").join("-");
    const params = [];
    const doc = [];

    let insideParams = true;

    lines.forEach(function(line) {
      if ( line === "]" ) {
        insideParams = false;
      }
      else if ( insideParams ) {
        const paramMatchResult = line.match(/^\s*([^\s]+):\s*([^\s]+)\s*$/)
        if (paramMatchResult === null) {
          throw `Could not parse param from line '${line}' in file ${filename}`;
        }
        params.push({ name: paramMatchResult[1], type: paramMatchResult[2] });
      }
      else {
        doc.push(line);
      }
    });
    
    if (insideParams) {
      throw `Never found ending bracket for params from ${filename}`;
    }

    if (doc.length === 0) {
      throw `No docs for ${eventName} in ${filename}'`;
    }

    const paramsHTML = params.map(function(param) {
      return `  ${param.name}: <a href="#type-${param.type}">${param.type}</a>`
    }).join("\n");

    const docHTML = doc.map(function(docLine) {
      return `<p class="lh-copy">${docLine}</p>`;
    }).join("\n");


    return new Handlebars.SafeString(`<a name="events-${slug}"></a>
          <article class="bg-near-white ph3 pb1 mb3">
            <div class="pv3 bb b--gray">
              <h1 class="f4 monospace mt0 pt0">${eventName}</h1>
              <pre class="lh-copy"><code>[
${paramsHTML}
]</code></pre>
            </div>
            ${docHTML}
          </article>`);
  };
};
