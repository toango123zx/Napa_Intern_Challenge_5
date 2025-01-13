document.addEventListener("DOMContentLoaded", function () {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
        window.location.href = "./index.html";
        return
    } else {
        getuser();
    }
});

const showcCreateUserPopup = () => {
    const popup = document.getElementById('createUserPopup');
    popup.style.display = 'flex';
}

const closeCreateUserPopup = () => {
    const popup = document.getElementById('createUserPopup');
    popup.style.display = 'none';
}

const showEditUserPopup = (buttonElement) => {
    const popup = document.getElementById('editUserPopup');
    const liElement = buttonElement.closest('li');
    const username = document.getElementById('updateUsername');
    username.value = liElement.querySelector('h3').textContent;
    const email = document.getElementById('updateEmail');
    email.value = liElement.querySelector('p').textContent;
    const button = document.getElementById('buttonEdit');
    button.dataset.id = liElement.dataset.id;

    popup.style.display = 'flex';
}
const closeEditUserPopup = () => {
    const popup = document.getElementById('editUserPopup');
    popup.style.display = 'none';
}

const showDeleteUserPopup = (buttonElement) => {
    const popup = document.getElementById('deleteUserPopup');
    const liElement = buttonElement.closest('li');
    const button = document.getElementById('buttonDelete');
    button.dataset.id = liElement.dataset.id;
    popup.style.display = 'flex';
}
const closeDeleteUserPopup = () => {
    const popup = document.getElementById('deleteUserPopup');
    popup.style.display = 'none';
}

let _listUser = []
let _timeout;

const _getUserApi = "https://crudnodejs-production.up.railway.app/api/users"
const _createUserApi = "https://crudnodejs-production.up.railway.app/api/users";
const _updateUserApi = "https://crudnodejs-production.up.railway.app/api/users/";
const _deleteUserApi = "https://crudnodejs-production.up.railway.app/api/users/";

const getuser = async () => {
    try {
        const listUser = await (await fetch(_getUserApi)).json();
        const ulElement = document.querySelector('.user__list');
        _listUser = listUser;

        listUser.forEach(user => {
            const liElement = document.createElement('li');
            liElement.classList.add('user__item');
            liElement.innerHTML = `
            <div class="user__information">
                <h3>${user.username}</h3>
                <p>${user.email}</p>
            </div>
            <div class="user__nav">
                <button class="button--edit" onclick="showEditUserPopup(this)">Edit</button>
                <button class="button--delete" onclick="showDeleteUserPopup(this)">Delete</button>
            </div>
            `;
            liElement.dataset.id = user._id;
            ulElement.appendChild(liElement);
        });
    } catch (error) {
        alert(`error: ${error}`);
    }
};

const searchUser = (name) => {
    try {
        const resultList = _listUser.filter(user => user.username.includes(name.trim()));
        const ulElement = document.querySelector('.user__list');
        ulElement.innerHTML = '';

        resultList.forEach(user => {
            const liElement = document.createElement('li');
            liElement.classList.add('user__item');
            liElement.innerHTML = `
            <div class="user__information">
                <h3>${user.username}</h3>
                <p>${user.email}</p>
            </div>
            <div class="user__nav">
                <button class="button--edit" onclick="showEditUserPopup(this)">Edit</button>
                <button class="button--delete" onclick="showDeleteUserPopup(this)">Delete</button>
            </div>
            `;
            liElement.dataset.id = user._id;
            ulElement.appendChild(liElement);
        });
    } catch (error) {
        alert(`error: ${error}`);
    }
}

const debounceSearch = (event) => {
    clearTimeout(_timeout);
    _timeout = setTimeout(() => searchUser(event.target.value), 500);
};

const createUser = async () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username) {
            alert('Username is required');
            document.getElementById("createUserForm").removeEventListener("submit", handleSubmit)
            return;
        }

        try {
            const result = await fetch("https://crudnodejs-production.up.railway.app/api/users", {
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
                document.getElementById("createUserForm").removeEventListener("submit", handleSubmit)
                return;
            } else {
                alert(json.message);
                const listUser = document.querySelector('.user__list');

                const liElement = document.createElement('li');
                liElement.classList.add('user__item');
                liElement.innerHTML = `
                <div class="user__information">
                <h3>${username}</h3>
                <p>${email}</p>
                </div>
                <div class="user__nav">
                <button class="button--edit" onclick="showEditUserPopup(this)">Edit</button>
                <button class="button--delete" onclick="showDeleteUserPopup(this)">Delete</button>
                </div>
                `;

                liElement.dataset.id = json.userId;
                listUser.appendChild(liElement);
                closeCreateUserPopup();
            }
        } catch (error) {
            alert(`error: ${error}`);
            document.getElementById("createUserForm").removeEventListener("submit", handleSubmit)
            return
        }
    }
    document.getElementById("createUserForm").addEventListener("submit", handleSubmit);
}

const updateUser = async (buttonUpdate) => {
    const usernameInput = document.getElementById('updateUsername');
    const emailInput = document.getElementById('updateEmail');
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();


    const updateUserApi = _updateUserApi + buttonUpdate.dataset.id;
    document.getElementById("updateFrom").addEventListener("submit", async function handleSubmit(event) {
        event.preventDefault();
        if (!username) {
            alert('Username is required');
            document.getElementById("updateFrom").removeEventListener("submit", handleSubmit)
            return;
        }

        try {
            const result = await fetch(updateUserApi, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                }),
            });

            const json = await result.json();

            if (result.status !== 200) {
                alert(json.message);
                document.getElementById("updateFrom").removeEventListener("submit", handleSubmit)
                return;
            } else {
                alert('Update Success');
            }
            const listUser = Array.from(document.getElementsByClassName('user__item'));
            listUser.forEach(li => {
                if (li.dataset.id === buttonUpdate.dataset.id) {
                    li.querySelector('h3').textContent = username;
                    li.querySelector('p').textContent = email;
                }
            });
            closeEditUserPopup();
            document.getElementById("updateFrom").removeEventListener("submit", handleSubmit)
        } catch (error) {
            alert(`error: ${error}`);
            document.getElementById("updateFrom").removeEventListener("submit", handleSubmit)
            return;
        }
    })
}

const deleteUser = async (buttonDelete) => {
    const deleteUserApi = _updateUserApi + buttonDelete.dataset.id;

    try {
        const result = await fetch(deleteUserApi, {
            method: 'DELETE',
        });

        const json = await result.json();

        if (result.status !== 200) {
            alert(json.message);
            return;
        }
        const listUser = Array.from(document.getElementsByClassName('user__item'));
        listUser.forEach(li => {
            if (li.dataset.id === buttonDelete.dataset.id) {
                li.remove();
            }
        });
        closeDeleteUserPopup();
    } catch (error) {
        alert(`error: ${error}`);
        return;
    }
}
// document.addEventListener('DOMContentLoaded', () => {
//     getuser();
// });
