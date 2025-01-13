const signup = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    if (!username) {
        alert('Username is required');
        return;
    }
    if (!email) {
        alert('Email is required');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Email not valid');
        return;
    }

    if (!password) {
        alert('Password is required');
        return;
    }
    try {
        const result = await fetch('https://crudnodejs-production.up.railway.app/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        const json = await result.json();

        if (result.status !== 201) {
            alert(json.message);
        } else {
            alert('Register Success');
            window.location.href = "./index.html";
        }
    } catch (error) {
        alert(`error: ${error}`);
    }
};
