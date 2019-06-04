const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

function parseTypeName(line, filename) {
  const matchresult = line.match(/^type (.*) contains \[$/)

  if (matchresult === null) {
    throw `${line} does not declare a type, from file ${filename}`;
  }

  return matchresult[1];
}

module.exports = function(typeDocPath) {
  return function(typePath) {

    const filename = path.join(typeDocPath, typePath + ".timeline-doc");
    const typeDoc = fs.readFileSync(filename, "UTF-8");
    const lines = typeDoc.split("\n");
    const firstLine = lines.shift();

    const typeName = parseTypeName(firstLine,filename);
    const slug = typeName.split(" ").join("-");

    const params = [];
    const literals = [];
    const operators = [];
    const doc = [];

    let insideParams = true;

    lines.forEach( function(line) {
      if (line === "]") {
        insideParams = false;
      }
      else if (insideParams) {
        const paramMatchResult = line.match(/^\s*([^\s]+):\s*([^\s]+)\s*$/)
        if (paramMatchResult === null) {
          throw `Could not parse param from line '${line}' in file ${filename}`;
        }
        params.push({ name: paramMatchResult[1], type: paramMatchResult[2] });
      }
      else {
        const literalMatchResult = line.match(/^typed literal (.*)$/)
        if (literalMatchResult === null) {
          const operatorMatchResult = line.match(/^operator (.) produces (.*)$/)
          if (operatorMatchResult === null) {
            doc.push(line);
          }
          else {
            operators.push({ operator: operatorMatchResult[1], type: operatorMatchResult[2] })
          }
        }
        else {
          literals.push(literalMatchResult[1]);
        }
      }
    });

    if (insideParams) {
      throw `Never found the closing bracket on params from ${filename}`;
    }

    const paramsHTML = params.map(function(param) {
      return `  ${param.name}: <a href="#type-${param.type}">${param.type}</a>`
    }).join("\n");

    const docHTML = doc.map(function(docLine) {
      return `<p class="lh-copy">${docLine}</p>`;
    }).join("\n");

    const literalsHTML = "<ul class=\"list\">" + literals.map(function(literal) {
      return `<li class="pl0"><code class="nowrap">${literal}</code></li>`
    }).join("\n") + "<\/ul>";

    const literalsLabel = literals.length == 0 ? "No Literals" : "Supported Literals"

    const operatorsHTML = "<ul>" + operators.map(function(operator) {
      return `<li><code class="nowrap">${typeName} ${operator.operator} ${typeName} &rarr; ${operator.type}</code></li>`;
    }).join("\n") + "<\/ul>";

    const operatorsLabel = operators.length == 0 ? "No Operators" : "Supported Operators"

    return new Handlebars.SafeString(`<a name="type-${slug}"></a>
          <article class="bg-near-white ph3 pb1 mb3">
            <div class="pv3 bb b--gray">
              <h1 class="f4 monospace mt0 pt0">${typeName}</h1>
              <pre class="lh-copy"><code>[
${paramsHTML}
]</code></pre>
            </div>
            <h2 class="f5">${literalsLabel}</h2>
${literalsHTML}
            <h2 class="f5">${operatorsLabel}</h2>
${operatorsHTML}
            ${docHTML}
          </article>`);
  };
};
