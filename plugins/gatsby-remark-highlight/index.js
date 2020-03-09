/**
 * options
 * options.include
 * If this option is defined (Array), this plugin will only highlight languages that are in this list.
 *
 * options.exclude
 * If this option is defined (Array), this plugin will only highlight languages that are not in this list.
 *
 * options.prefix
 * If this option is defined (string), this plugin will use this prefix for classes instead of hljs-.
 *
 * more look at https://github.com/remarkjs/remark-highlight.js
 */

const highlight = require('remark-highlight.js')
const visit = require('unist-util-visit')
const langusgeList = require('./languageList')
module.exports = ({ markdownAST }, options) => {
  const transformer = highlight(options)
  transformer(markdownAST, options)
  visit(markdownAST, 'code', node => {
    let { lang, data } = node

    if (!lang) {
      lang = 'text'
    }

    if (!data) {
      data = {}
      node.data = data
    }

    if (!data.hProperties) {
      data.hProperties = {}

      data.hProperties.className = [
        'hljs',
        ...(data.hProperties.className || []),
        'language-' + lang,
      ]
    }
    data.hProperties['data-language'] = langusgeList[lang] || 'TEXT'
  })
  return markdownAST
}
