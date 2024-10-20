let elLoginForm = document.querySelector('.login__form')
let elHeaderTitle = document.querySelector('.header__mid-login')
let elHeaderProfileLink = document.querySelector('.header__login')
let api_new = 'https://6714b258690bf212c762246c.mockapi.io/'
let user = localStorage.getItem('user')
let newUser = JSON.parse(user)

if (newUser){
    elHeaderTitle.textContent = newUser.username
    elHeaderProfileLink.href = '/profile.html'
}else {
    localStorage.removeItem('user')
}

if(location.pathname == '/profile.html' && !newUser) {
    location.href = '/'
}

if(location.pathname == '/login.html' && newUser) {
    location.href = '/'
}

    elLoginForm?.addEventListener('submit', async function signIn(evt) {
        evt.preventDefault();

        try {
            let res = await fetch(`${api_new}login`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    username: 'Toxirrrr',
                    password: 'N42 Fullstack'
                })
            })
            res = await res.json()

            if (res.createdAt) {
                localStorage.setItem('user', JSON.stringify(res))
                location.href = '/'
            }
        } catch (error) {
            console.log('login err', error);
        }
    })