const signin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    emailInput.value = '';
    passwordInput.value = '';

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
        const result = await fetch('https://crudnodejs-production.up.railway.app/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const json = await result.json();

        if (result.status !== 200) {
            alert(json.message);
        } else {
            // alert('Login Success');
            localStorage.setItem('token', json.token);
            window.location.href = "./userManagerment.html";
        }

    } catch (error) {
        alert(`error: ${error}`);
        emailInput.value = '';
        passwordInput.value = '';
    }
};