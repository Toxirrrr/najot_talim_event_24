let elExitButton = document.querySelector('.profile__button')

elExitButton.addEventListener('click', () => {
    localStorage.removeItem('user')
    location.href = '/'
})