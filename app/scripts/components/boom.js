import React, { Component, PropTypes as P } from 'react'
import { Link } from 'react-router'
import Bomb from './bomb'

export default class Boom extends Component {

  render() {
    return (
      <div className="home">
        <h1>Boom.</h1>
        <div>
          Oh well. At least you tried. Check the scoreboard!
        </div>
        <Bomb/>
      </div>
    )
  }
}
