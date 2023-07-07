const loginButtonHandler = async (event) => {
    event.preventDefault();

    // When login button is clicked, redirect to login page
    document.location.replace('/login');

}

document
    .querySelector('#login-button')
    .addEventListener('click', loginButtonHandler);


