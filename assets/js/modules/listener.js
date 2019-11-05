import database from './database.js'

const getAllTeam = () => {
    //Get All Bookmark Team From Database
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
                        <button onclick="deleteBookmarkTeam(${team.id},'${team.name}')" class="waves-effect waves-light btn red accent-3">REMOVE</button>
                    </div>
                    </div>
                </div>
                `
            })
            //insert All Team in Database to DOM
            document.getElementById('progress').style.display = 'none'
            document.getElementById('bookmarkTeams').innerHTML = teamsHTML
        })
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addBookmarkTeam = (id,logo,name,venue,website) => {
    //Add To Database
    database.addTeam({id,logo,name,venue,website})
    //Display Toast
    M.toast({html: `Berhasil Bookmark ${name}`, classes: 'rounded'});
    //Push Notification
    pushNotification(`Berhasil Bookmark ${name}`)
}

const deleteBookmarkTeam = (id,name) => {
    //Conform Delete Bookmark ?
    let imSure = confirm(`Apakah Anda Yakin ingin menghapus ${name} dari Bookmark ?`)
    if(imSure){
        //Delete Team From Database
        database.deleteTeam(id)
        //Fetch All Team
        getAllTeam()
        //Display Toast
        M.toast({html: `Berhasil Menghapus ${name}`, classes: 'rounded'})
        //Push Notification
        pushNotification(`Berhasil Menghapus ${name}`)
    }
    
}

export default {
    addBookmarkTeam,
    getAllTeam,
    deleteBookmarkTeam
}