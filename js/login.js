async function login(event) {
    event.preventDefault();
    try {
        let res = await fetch(`${api}login`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                username: 'Toxirrrr',
                password: 'N42 Fullstack'
            })
        })
        res = await res.json()
        console.log(res);
    } catch (error) {
        console.log('login err', error);

    }
}