document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3002/drivers')
    .then(res => res.json())
    .then(drivers => {
        const container = document.getElementById('candidates')
        container.innerHTML = drivers.map(driver =>
         `<div id="card">
          <img src="${driver.image}" alt="Candidate Photo">
          <p id="name">${driver.name}</p>
          <p id="team"><b>Team: </b>${driver.team}</p>
          <p id="country"><b>Country: </b>${driver.country}</p>
          <p id="podiums"><b>Podiums: </b>${driver.podiums}</p>
          <button type="button" class="vote-btn">Vote</button>
        </div>
        `).join('')
    })
})