import React, { Component, PropTypes as P } from 'react'

export default class Bomb extends Component {

  render() {
    return (
      <div className="bomb">
        <div className="bomb-fire-outer"></div>
        <div className="bomb-fire-middle"></div>
        <div className="bomb-fire-inner"></div>
        <div className="bomb-body"></div>
        <div className="bomb-neck"></div>
        <div className="bomb-fuse"></div>
      </div>
    )
  }
}
