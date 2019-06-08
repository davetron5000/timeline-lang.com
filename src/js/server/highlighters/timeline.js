module.exports = function(hljs) {
  return {
    keywords: "on send now is if else",
    contains: [
      {
        className: "number",
        relevance: 0,
        variants: [
          { begin: /\b[0-9]+°[0-9]+\'[0-9]+\"[0-9]+/ },
          { begin: /\b[0-9]+°[0-9]+\'[0-9]+\"/ },
          { begin: /\b[0-9]+°[0-9]+\'/ },
          { begin: /\b[0-9]+°/ }
        ]
      },
      {
        className: "number",
        relevance: 0,
        variants: [
          { begin: /\b[0-9,]+km/ },
          { begin: /\b[0-9,]+s/ },
          { begin: /\b[0-9,]+kg/ },
          { begin: /\b[0-9,]+ms/ },
          { begin: /\b[0-9,]+m/ }
        ]
      },
      {
        className: "name",
        begin: "\\b([a-z-]+:)",
        relevance: 10
      },
      {
        className: "deletion",
        relevance: 0,
        variants: [
          { begin: /\^\^+/ },
          { begin: /^\s*\|\s*$/ },
          { begin: /^\s*\|\-\-+\s+.*$/ }
        ]
      },
      {
        className: "keyword",
        begin: /do nothing/,
        relevance: 0
      },
      {
        className: "keyword",
        begin: /\sin\s/,
        relevance: 0
      },
      {
        className: "type",
        begin: /\s[\-\<\>\+≠÷x]\s/,
        relevance: 0
      },
      {
        className: "type",
        relevance: 0,
        variants: [{ begin: /[\[\]]/ }, { begin: /[\{\}]/ }]
      }
    ]
  };
};
