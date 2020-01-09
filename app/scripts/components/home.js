import React, { Component, PropTypes as P } from 'react'
import { Link } from 'react-router'
import Bomb from './bomb'

export default class Home extends Component {

  render() {
    return (
      <div className="home">
        <h1>
          <span className="c c0">S</span>
          <span className="c c1">o</span>
          <span className="c c2">m</span>
          <span className="c c3">e</span>
          <span className="c c4">b</span>
          <span className="c c5">o</span>
          <span className="c c6">d</span>
          <span className="c c7">y</span>
          <span className="c"> </span>
          <span className="c c8">S</span>
          <span className="c c9">e</span>
          <span className="c c10">t</span>
          <span className="c"> </span>
          <span className="c c11">U</span>
          <span className="c c12">p</span>
          <span className="c"> </span>
          <span className="c c13">U</span>
          <span className="c c14">s</span>
          <span className="c"> </span>
          <span className="c c15">T</span>
          <span className="c c16">h</span>
          <span className="c c17">e</span>
          <span className="c"> </span>
          <span className="c c18">B</span>
          <span className="c c19">o</span>
          <span className="c c20">m</span>
          <span className="c c21">b</span>
        </h1>
        <Link to="/register">
          <Bomb/>
        </Link>
      </div>
    )
  }
}
