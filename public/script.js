window.onload = function() {
       // Show welcome message or Sign In button
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    const userGreetingContainer = document.getElementById('user-greeting-container');

    if (isLoggedIn && username) {
        userGreetingContainer.innerHTML = `
            <span style="font-size:1.5em; color:white; margin-right:20px;">Welcome, <b>${username}</b></span>
            <button class="sign-in-btn" onclick="logout()" style="margin-left:10px;">Logout</button>
        `;
    } else {
        userGreetingContainer.innerHTML = `
            <button id="signInBtn" class="sign-in-btn" onclick="window.location.href='signIn.html'">Sign In</button>
        `;
    }
};

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.reload();
}

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
          <img src="http://localhost:3002/images/${driver.image}" alt="${driver.name}">   
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
