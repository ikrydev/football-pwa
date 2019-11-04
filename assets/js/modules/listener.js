import database from './database.js'

const addBookmarkTeam = (id,logo,name,venue,website) => {
    database.addTeam({id,logo,name,venue,website})
}

const getAllTeam = () => {
    console.log('here')
    database.getTeam()
        .then(data => {
            let teamsHTML = ''
            data.forEach(team => {
                teamsHTML  +=
                `
                <div class="col s12">
                    <div class="card">
                    <div class="card-content row valign-wrapper">
                        <div class="col s4" class="logo-team">
                            <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                        </div>
                        <div class="col s8 information-team">
                        <span>${team.name}</span>
                        <span class="badge-blue">${team.venue}</span>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
                        <button class="waves-effect waves-light btn orange accent-3">REMOVE</button>
                    </div>
                    </div>
                </div>
                `
            })
            document.getElementById('progress').style.display = 'none'
            document.getElementById('bookmarkTeams').innerHTML = teamsHTML
        })
}

export default {
    addBookmarkTeam,
    getAllTeam
}