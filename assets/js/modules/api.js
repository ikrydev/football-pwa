const base_url = 'https://api.football-data.org'
const api_token = 'd327b3f79ad54560ac84595be3610b21'

let status = res => {
    if(res.status != 200){
        console.log(`Error : ${res.status}`)
        return Promise.reject(new Error(res.statusText()))
    }else{
        return Promise.resolve(res)
    }
}

const getStandings = leagueID => {
    fetch(`${base_url}/v2/competitions/${leagueID}/standings`,{
        headers:{
            'X-Auth-Token' : api_token
        }
    })
    .then(status)
    .then(res => res.json())
    .then(data => {
        let standingsHTML = ''
        console.log(data)
        data = data.standings[0].table
        data.forEach(dataTeam => {
            let urlTeamImage = dataTeam.team.crestUrl
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
            standingsHTML +=
            `
            <tr>
                <td>${dataTeam.position}</td>
                <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
                <td>${dataTeam.team.name}</td>
                <td>${dataTeam.playedGames}</td>
                <td>${dataTeam.won}</td>
                <td>${dataTeam.draw}</td>
                <td>${dataTeam.lost}</td>
                <td>${dataTeam.goalsFor}</td>
                <td>${dataTeam.goalsAgainst}</td>
                <td>${dataTeam.goalDifference}</td>
                <td>${dataTeam.points}</td>
            </tr>
            `
        })
        document.getElementById('progress').style.display = 'none'
        document.getElementById('standings').innerHTML = standingsHTML
    })
    .catch(err => console.log(err))
}

export default {
    getStandings
}
