module.exports = function(hljs) {
  return {
    contains: [
      {
        className: "number",
        relevance: 0,
        begin: /^Success.*$/
      },
      {
        className: "deletion",
        relevance: 0,
        begin: /^Failure.*$/
      },
      {
        className: "deletion",
        relevance: 0,
        begin: /^.*Collision.*$/
      },
      {
        className: "keyword",
        relevance: 0,
        begin: /^\>.*$/
      }
    ]
  };
}
