import React, { Component, PropTypes as P } from 'react'

export default class Face extends Component {

  static propTypes = {
    animation: P.string
  }

  render() {
    const { animation } = this.props

    return (
      <div className="face">
        <div className="face-bottom"></div>
        <div className="face-top" style={{animation: animation || ''}}>
          <div className="eye-left"></div>
          <div className="eye-right"></div>
        </div>
      </div>
    )
  }
}
