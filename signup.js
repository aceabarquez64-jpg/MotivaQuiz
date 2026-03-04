document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            
            const user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password 
            };

            
            localStorage.setItem('motivaUser', JSON.stringify(user));

            alert("Account created successfully! Please log in.");
            window.location.href = 'Login (1).html';
        });
    }
});