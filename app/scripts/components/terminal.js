import React, { Component, PropTypes as P } from 'react'

// keycodes
const TAB = 9
const ENTER = 13

export default class Terminal extends Component {

  static propTypes = {
    text: P.string,
    readOnly: P.bool,
    execute: P.func
  }

  render() {
    const { text, readOnly } = this.props
    return readOnly
      ? this.renderReadOnly(text)
      : this.renderReadWrite(text)
  }

  renderReadOnly(text) {
    return (
      <div className="terminal">
        <div className="terminal-glow"></div>
        <div className="terminal-middle">
          <div className="terminal-inner">
            <textarea
              ref="text"
              className="terminal-text"
              onWheel={e => this.onWheel(e)}
              spellCheck={false}
              value={text || ''}
              readOnly={true}/>
          </div>
        </div>
      </div>
    )
  }

  renderReadWrite(text) {
    return (
      <div className="terminal">
        <div className="terminal-glow"></div>
        <div className="terminal-middle">
          <div className="terminal-inner">
            <textarea
              ref="text"
              className="terminal-text"
              onWheel={e => this.onWheel(e)}
              onKeyDown={e => this.onKeyDown(e)}
              spellCheck={false}
              defaultValue={text || ''}/>
          </div>
        </div>
      </div>
    )
  }

  onWheel(e) {
    const textarea = this.refs['text']
    textarea.scrollTop += 10 * e.deltaY
    e.preventDefault()
  }

  onKeyDown(e) {
    if (e.keyCode === TAB) {
      const textarea = this.refs['text']
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = textarea.value

      textarea.value = `${value.substring(0, start)}  ${value.substring(end)}`
      textarea.selectionStart = textarea.selectionEnd = start + 2

      e.preventDefault()
    }
    else if (e.keyCode === ENTER && e.ctrlKey) {
      const { execute } = this.props
      execute && execute()

      e.preventDefault()
    }
  }

  getText() {
    return this.refs['text'].value
  }
}
