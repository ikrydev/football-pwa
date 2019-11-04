import database from './database.js'

const addBookmarkTeam = (id,logo,name,venue,website) => {
    database.addTeam({id,logo,name,venue,website})
}

const getAllTeam = () => {
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
                        <span class="badge-blue"><strong>${team.name}</strong></span>
                        <span>${team.venue}</span>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
                        <button onclick="deleteBookmarkTeam(${team.id})" class="waves-effect waves-light btn red accent-3">REMOVE</button>
                    </div>
                    </div>
                </div>
                `
            })
            document.getElementById('progress').style.display = 'none'
            document.getElementById('bookmarkTeams').innerHTML = teamsHTML
        })
}

const deleteBookmarkTeam = id => {
    database.deleteTeam(id)
    getAllTeam()
}

export default {
    addBookmarkTeam,
    getAllTeam,
    deleteBookmarkTeam
}