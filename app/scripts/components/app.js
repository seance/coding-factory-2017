import React, { Component, PropTypes as P } from 'react'
import { Link } from 'react-router'
import Storage from '../storage'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTeamId: Storage.getCurrentTeamId()
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      currentTeamId: Storage.getCurrentTeamId()
    })
  }

  render() {
    const { currentTeamId } = this.state
    const { pathname } = this.props.location
    const active = {
      home: pathname === '/' ? 'gt active' : 'gt',
      register: pathname === '/register' ? 'gt active' : 'gt',
      game: pathname.startsWith('/game/') ? 'gt active' : 'gt',
      scoreboard: pathname === '/scoreboard' ? 'gt active' : 'gt'
    }

    return (
      <div className="app">
        <header>
          <Link to="/">
            <span className={active.home}>&gt;</span>
            Home
          </Link>
          <Link to="/register">
            <span className={active.register}>&gt;</span>
            Sign Up
          </Link>
          <Link to={`/game/${currentTeamId}`}
            className={currentTeamId == null || isNaN(currentTeamId) ? 'disabled' : ''}>
            <span className={active.game}>&gt;</span>
            The Bomb
          </Link>
          <Link to="/scoreboard">
            <span className={active.scoreboard}>&gt;</span>
            Scoreboard
          </Link>
        </header>
        {this.props.children}
        <footer>
          // Coding Factory 2017 (c) <i className="futurice-logo"/>
        </footer>
      </div>
    )
  }
}
