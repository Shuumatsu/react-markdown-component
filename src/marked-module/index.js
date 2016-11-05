import React, // eslint-disable-line no-unused-vars
{ Component, PropTypes } from 'react'
import Marked from 'marked'
import { highlight as PrismHighlight, languages as PrismLanguages } from 'prismjs'
import Style from './styles.min.css'

class Markdown extends Component {

  markdown() {
    if (this.state.markdown) {
      Marked(this.state.markdown,
        Object.assign({}, this.state.opt, { highlight: this.highlightOpt }),
        this.markedCallback)
    }
  }

  highlightOpt(code, lang) {
    return PrismHighlight(code, this.detectLang(code, lang))
  }

  detectLang(code, lang) {
    if (!lang) {
      // Stupid simple detection if we have no lang, courtesy of:
      // https://github.com/robdodson/mark-down/blob/ac2eaa/mark-down.html#L93-101
      return code.match(/^\s*</) ? PrismLanguages.markup : PrismLanguages.javascript
    }

    if (PrismLanguages[lang]) {
      return PrismLanguages[lang]
    }
    switch (lang.substr(0, 2)) {
      case 'js':
      case 'es':
        return PrismLanguages.javascript
      case 'c':
        return PrismLanguages.clike
      default:
        // The assumption is that you're mostly documenting HTML when in HTML.
        return PrismLanguages.markup
    }
  }

  markedCallback(error, marked) {
    if (!error)
      this.setState({
        marked
      })
  }

  constructor(props) {
    super(props)

    this.markdown = this.markdown.bind(this)
    this.highlightOpt = this.highlightOpt.bind(this)
    this.detectLang = this.detectLang.bind(this)
    this.markedCallback = this.markedCallback.bind(this)

    this.state = {
      style: props.style || Style,
      markdown: props.markdown || '',
      opt: {
        pedantic: props.pedantic || false,
        sanitize: props.sanitize || false,
        smartypants: props.smartypants || false,
      },
      marked: ''
    }

    this.markdown()
  }

  componentWillReceiveProps(nextProps) {
    const {markdown, pedantic, sanitize, smartypants} = nextProps
    if (markdown === this.props.markdown &&
      { pedantic, sanitize, smartypants } === this.state.opt)
      return

    this.setState({
      markdown: markdown || '',
      opt: {
        pedantic: pedantic || this.state.pedantic,
        sanitize: sanitize || this.state.sanitize,
        smartypants: smartypants || this.state.smartypants
      } || this.state.opt
    })

    this.markdown()
  }

  render() {
    return (
      <div className={this.state.style.marked}>
        {this.state.marked && (
          <div dangerouslySetInnerHTML={{ __html: this.state.marked }} />
        )}
      </div>
    )
  }
}

Markdown.propTypes = {
  markdown: PropTypes.string,
  opt: PropTypes.shape({
    pedantic: PropTypes.bool,
    sanitize: PropTypes.bool,
    smartypants: PropTypes.bool
  }),
  style: PropTypes.object
}

export default Markdown
