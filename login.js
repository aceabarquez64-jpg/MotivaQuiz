document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = document.getElementById('loginEmail').value;
            const passwordInput = document.getElementById('loginPassword').value;

            
            const storedUserJSON = localStorage.getItem('motivaUser');
            
            if (!storedUserJSON) {
                alert("No user found. Please sign up first!");
                return;
            }

            const storedUser = JSON.parse(storedUserJSON);

            
            if (emailInput === storedUser.email && passwordInput === storedUser.password) {
                
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'homepage (1).html';
            } else {
                alert("Invalid email or password.");
            }
        });
    }
});