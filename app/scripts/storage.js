import R from 'ramda'

const NEXT_TEAM_ID = 'nextTeamId'
const CURRENT_TEAM_ID = 'currentTeamId'
const USED_TEAM_NAMES = 'usedTeamNames'

const getTeamKey = id =>
  `team-${id}`

const getNextTeamId = () => {
  let teamId = parseInt(localStorage.getItem(NEXT_TEAM_ID), 10)
  if (!teamId) {
    teamId = 0
    localStorage.setItem(NEXT_TEAM_ID, teamId)
  }
  return teamId
}

export default {

  getUsedTeamNames() {
    let teamNames = JSON.parse(localStorage.getItem(USED_TEAM_NAMES))
    if (!teamNames) {
      teamNames = []
      localStorage.setItem(USED_TEAM_NAMES, JSON.stringify(teamNames))
    }
    return teamNames
  },

  getCurrentTeamId() {
    return parseInt(localStorage.getItem(CURRENT_TEAM_ID), 10)
  },

  setCurrentTeamId(teamId) {
    localStorage.setItem(CURRENT_TEAM_ID, teamId);
  },

  registerTeam(name, color, code) {
    const teamId = getNextTeamId()
    const teamNames = this.getUsedTeamNames()
    const team = {
      id: teamId,
      name: name,
      color: color,
      tasks: [],
      time: 1800,
      code: code,
      done: false
    }

    teamNames.push(name)
    localStorage.setItem(NEXT_TEAM_ID, teamId + 1)
    localStorage.setItem(USED_TEAM_NAMES, JSON.stringify(teamNames))
    localStorage.setItem(getTeamKey(teamId), JSON.stringify(team))

    return team
  },

  getTeamData(teamId) {
    return JSON.parse(localStorage.getItem(getTeamKey(teamId)))
  },

  updateTeamData(teamId, team) {
    const current = this.getTeamData(teamId)
    if (!current || !current.done) {
      localStorage.setItem(getTeamKey(teamId), JSON.stringify(team))
    }
  },

  getAllDoneTeams() {
    const teams = R.range(0, getNextTeamId()).map(id => this.getTeamData(id))
    return R.reject(t => R.isNil(t) || !t.done)(teams)
  }
}
