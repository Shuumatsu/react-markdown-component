# react-markdown-component

## USAGE
```
import Markdown from 'react-markdown-component'

const el = <Markdown ref="marked" markdown={this.state.value} />
```

## PROPS
```
Markdown.propTypes = {
  markdown: PropTypes.string,
  pedantic: PropTypes.bool,
  sanitize: PropTypes.bool,
  smartypants: PropTypes.bool,
  // While this element has a default css style, you can import your cutomized markdown css style and passed it to the Marked element
  style: PropTypes.object
}
```
