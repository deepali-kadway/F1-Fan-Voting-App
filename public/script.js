document.addEventListener('DOMContentLoaded', () => {
    fetchDrivers()
})

function fetchDrivers() {
    fetch('http://localhost:3002/drivers')
    .then(res => res.json())
    .then(drivers => {
        console.log(drivers); 
        const container = document.getElementById('candidates')
        container.innerHTML = drivers.map(driver =>
         `<div id="card">
          <img src="${driver.image}" alt="Candidate Photo">
          <p id="name">${driver.name}</p>
          <p id="team"><b>Team: </b>${driver.team}</p>
          <p id="country"><b>Country: </b>${driver.country}</p>
          <p id="podiums"><b>Podiums: </b>${driver.podiums}</p>
          <p id="votes"><b>Votes: </b>${driver.votes}</p>
          <button type="button" class="vote-btn" onclick="addVote('${driver._id}')">Vote</button>
        </div>
        `).join('')
    })
}

function addVote(driverId) {
    fetch(`http://localhost:3002/drivers/${driverId}/votes`, 
        {method: 'PUT'})
    .then(res => res.json())
    .then(() => {
        fetchDrivers()
        // const message = document.getElementById('message')
        // message.innerHTML = `<p>Vote added successfully!</p>`
    })

}