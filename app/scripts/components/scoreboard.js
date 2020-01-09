import React, { Component, PropTypes as P } from 'react'
import { Link } from 'react-router'
import R from 'ramda'
import moment from 'moment'
import Storage from '../storage'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTeamId: Storage.getCurrentTeamId(),
      teams: Storage.getAllDoneTeams()
    }
  }

  render() {
    const { currentTeamId, teams } = this.state
    const rankedTeams = R.sortBy(t => -t.time)(teams)

    return (
      <div className="scoreboard">
        <h1>Scoreboard</h1>
        <table className="score-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Time</th>
              <th>Team</th>
              <th>SLOC</th>
              <th>Complexity<sup>1</sup></th>
              <th>Density<sup>1</sup></th>
              <th>Maintainability<sup>1</sup></th>
            </tr>
          </thead>
          <tbody>
          {
            rankedTeams.length
              ? this.renderTableRows(rankedTeams, currentTeamId)
              : this.renderNoRows()
          }
          </tbody>
        </table>
        <div className="footnote">
          <sup>1</sup>code analysis by <code>typhonjs-escomplex</code>
        </div>
      </div>
    )
  }

  renderTableRows(rankedTeams, currentTeamId) {
    const mapIndexed = R.addIndex(R.map)
    return mapIndexed((team, index) => (
      <tr
        key={team.id}
        className={team.id === currentTeamId ? 'active' : ''}>
        <td>{index + 1}</td>
        <td>{moment(team.time * 1000).format('mm:ss')}</td>
        <td>{team.name}</td>
        <td>{team.report.sloc}</td>
        <td>{team.report.complexity}</td>
        <td>{team.report.density}</td>
        <td>{team.report.maintainability}</td>
      </tr>
    ), rankedTeams)
  }

  renderNoRows() {
    return (
      <tr>
        <td colSpan={7}>
          Be the first kid on your block on the scoreboard!
        </td>
      </tr>
    )
  }
}
