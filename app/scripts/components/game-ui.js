import React, { Component, PropTypes as P } from 'react'
import moment from 'moment'
import escomplex from 'typhonjs-escomplex'
import Storage from '../storage'
import Terminal from './terminal'
import { runProgram } from '../game'

const DEFAULT_OUTPUT = [
  'BombOS (Bomb Operating System) 95ME',
  'WARNING: Security protocols active!',
  '',
  '** Console access disabled **',
  ''
]

export default class GameUi extends Component {

  constructor(props) {
    super(props)

    const { teamId } = this.props.params
    const team = Storage.getTeamData(teamId)

    if (team && !team.done) {
      this.timerId = setInterval(() => {
        this.tick()
      }, 1000)
    }

    this.state = {
      teamId,
      team,
      messages: []
    }
  }

  componentWillUnmount() {
    const { team } = this.state
    if (team && !team.done) {
      this.persistCode(team)
    }
    clearInterval(this.timerId)
  }

  render() {
    const { teamId, team, messages } = this.state
    return team
      ? this.renderGame(team, messages)
      : this.renderNoSuchTeam(teamId)
  }

  renderNoSuchTeam(teamId) {
    return (
      <div>
        Unknown team id {teamId}
      </div>
    )
  }

  renderGame(team, messages) {
    const { time, code, tasks, done } = team
    const timeString = moment(time * 1000).format('mm:ss')
    const input = done ? '// No cheating! :)' : code
    const output = DEFAULT_OUTPUT.concat(messages).join('\n')
    const codes = team.tasks

    return (
      <div className="game-ui">
        <div className="timer">
          {timeString}
        </div>
        <div className="terminals">
          <Terminal ref='input-term' text={input} execute={() => this.executeCode()}/>
          <Terminal ref='output-term' text={output} readOnly={true}/>
        </div>
        <button
          className="execute-button"
          disabled={done}
          onClick={() => this.executeCode()}>
          &gt;&gt;Execute
        </button>
        <div className="codes">
          <div className={codes[0] ? 'code ok' : 'code'}>{codes[0] || ''}</div>
          <div className={codes[1] ? 'code ok' : 'code'}>{codes[1] || ''}</div>
          <div className={codes[2] ? 'code ok' : 'code'}>{codes[2] || ''}</div>
          <div className={codes[3] ? 'code ok' : 'code'}>{codes[3] || ''}</div>
          <div className={codes[4] ? 'code ok' : 'code'}>{codes[4] || ''}</div>
        </div>
      </div>
    )
  }

  executeCode() {
    const { team } = this.state
    if (team.done) {
      return
    }

    this.persistCode(team)

    try {
      const { done, tasks, messages } = runProgram(team.tasks, team.code)

      team.done = done || false
      team.tasks = tasks || []
      this.setState({
        messages: messages || []
      }, () => {
        if (done) {
          this.bombDefused(team)
        }
      })
    }
    catch (err) {
      console.error(err)
      this.setState({
        messages: [err.toString()]
      })
    }
  }

  tick() {
    const { team } = this.state

    if (!team.done) {
      team.time -= 1

      Storage.updateTeamData(team.id, team)

      if (team.time > 0) {
        this.forceUpdate()
      } else {
        this.bombExploded(team)
      }
    }
  }

  bombExploded(team) {
    team.done = true
    this.analyzeCode(team)
    clearInterval(this.timerId)
    this.props.router.push('/boom')
  }

  bombDefused(team) {
    this.analyzeCode(team)
    clearInterval(this.timerId)
  }

  persistCode(team) {
    team.code = this.refs['input-term'].getText()
    Storage.updateTeamData(team.id, team)
  }

  analyzeCode(team) {
    try {
      const report = escomplex.analyzeModule(team.code)
      team.report = {
        sloc: report.methodAggregate.sloc.physical,
        complexity: report.methodAggregate.cyclomatic,
        density: report.methodAggregate.cyclomaticDensity,
        maintainability: report.maintainability
      }
    } catch (err) {
      console.error(err)
      team.report = {
        sloc: 'n/a',
        complexity: 'n/a',
        density: 'n/a',
        maintainability: 'n/a'
      }
    }
    Storage.updateTeamData(team.id, team)
  }
}
