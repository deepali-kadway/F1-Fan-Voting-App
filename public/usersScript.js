//Registration: Account Creation
function registration(event){
    event.preventDefault() // Prevent form from submitting and reloading the page

    const fullname = document.getElementById('fullname').value
    const contact = document.getElementById('contact').value
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('userpwd').value

fetch('http://localhost:3002/users/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({fullname, contact, email, username, password})
})
 .then(async res => {
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username); // username variable from form
            showRegisterModal('User has been created!');
        } else {
            showRegisterModal('Registration failed: ' + data.message);
        }
    });
}

function showRegisterModal(message) {
    document.getElementById('registerModalMessage').textContent = message;
    document.getElementById('registerModal').classList.add('show');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('show');
    // Redirect to drivers page after closing modal
    window.location.href = 'http://127.0.0.1:5500/public/index.html'; 
}

//User Sign In
//console.log('SignIn called')
function signIn(event){
    event.preventDefault()

    const username = document.getElementById('usernameSignIn').value
    const userpwd = document.getElementById('userpwdSignIn').value
    fetch('http://localhost:3002/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password: userpwd})
    })
    .then(res => res.json())
    .then(data => {console.log(data)
        //Check for successful login
        if(data.findUser){
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username); // username variable from your form
            window.location.href='http://127.0.0.1:5500/public/index.html'
        }else{
            alert('Invalid Credentials')
        }
    })
    .catch(error => {
        console.error(error)
        alert('Server Error')
    })
}