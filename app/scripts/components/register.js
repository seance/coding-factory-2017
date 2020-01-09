import React, { Component, PropTypes as P } from 'react'
import R from 'ramda'
import Storage from '../storage'
import Face from './face'
import { initialCode } from '../code'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      validTeamName: false
    }
  }

  render() {
    return (
      <div className="register">
        <div className="story">
          <article className="story-item">
            <Face animation="talk2 1s infinite"/>
            <section className="story-message-left">
              YOU: What happen ?
            </section>
          </article>
          <article className="story-item">
            <section className="story-message-right">
              OPERATOR: Somebody set up us the bomb.
            </section>
            <Face animation="talk3 .7s infinite"/>
          </article>
          <article className="story-item">
            <Face animation="talk1 1s infinite"/>
            <section className="story-message-left">
              YOU: What !
            </section>
          </article>
          <article className="story-item">
            <section className="story-message-right">
              OPERATOR: You must disarm the bomb quickly! It is guarded by a series of hakking challenges!
            </section>
            <Face animation="talk3 .8s infinite"/>
          </article>
          <article className="story-item">
            <section className="story-message-right">
              OPERATOR: Enter your team name and get going! You have 30 minutes! No, I&apos;m not Canadian!
            </section>
            <Face animation="talk3 .5s infinite"/>
          </article>
        </div>
        <div>
          <input
            ref="teamName"
            type="text"
            placeholder="Team name"
            onChange={() => this.checkName()}/>
          <button
            type="submit"
            disabled={!this.state.validTeamName}
            onClick={() => this.register()}>
            Let&apos;s Go!
          </button>
        </div>
      </div>
    )
  }

  checkName() {
    const teamName = this.refs['teamName'].value
    const alreadyUsed = R.contains(teamName, Storage.getUsedTeamNames())

    this.setState({
      validTeamName: !alreadyUsed
    })
  }

  register() {
    const { router } = this.props
    const teamName = this.refs['teamName'].value
    const team = Storage.registerTeam(teamName, 0, initialCode)
    Storage.setCurrentTeamId(team.id)
    router.push(`/game/${team.id}`)
  }
}
