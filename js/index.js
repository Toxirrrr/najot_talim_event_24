let api = 'https://6714b258690bf212c762246c.mockapi.io/'
let elGoodsList = document.querySelector('.goods__list')
let elAllList = document.querySelector('.all__list')
let elBasketCount = document.querySelector('.header__bin-count')
let elLikeCount = document.querySelector('.header__like-count')


getAll()
login()



async function getAll() {
    let data = await fetch(`${api}items`)

    let arr = await data.json()

    renderAll(arr)
    render(arr)

}

async function isLiked(e) {
    try {
        let situation = e.target.src.split('/').at(-1)
        let id = e.target.id

        let req = JSON.stringify({
            isLike: situation == 'notLike.svg' ? true : false
        })
        console.log(req);


        await fetch(`${api}items/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: req
        })

        getAll()
    } catch (error) {
        console.log('isLike err', error);

    }
}

async function addToBasket(e) {
    try {
        let id = e.target.id

        let req = JSON.stringify({
            isBasket: true,
            count: 1
        })
        console.log(req);


        await fetch(`${api}items/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: req
        })

        alert('Succes')

        getAll()
    } catch (error) {
        console.log('isLike err', error);

    }
}


async function login() {
    try {
        await fetch(`${api}login`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                username: 'Toxirrrr',
                password: 'N42 Fullstack'
            })
        })
    } catch (error) {
        console.log('login err', error);

    }

}



function render(data) {
    elGoodsList.innerHTML = ''

    if (data) {
        for (let i = 0; i < data.length; i++) {

            item = data[i];

            let li = document.createElement('li')

            let img = document.createElement('img')
            let name = document.createElement('h2')
            let feedback = document.createElement('p')
            let installments = document.createElement('p')
            let price = document.createElement('p')
            let sale = document.createElement('p')
            let count = document.createElement('p')
            let priceWrapper = document.createElement('div')
            let wrapper = document.createElement('div')
            let isLike = document.createElement('img')
            let isBasket = document.createElement('img')
            let discount = document.createElement('p')
            let original = document.createElement('p')

            li.className = 'good__item'
            li.id = item.id

            img.width = 232
            img.height = 310

            img.className = 'goods__item-img'
            name.className = 'goods__item-name'
            feedback.className = 'goods__item-feedback'
            installments.className = 'goods__item-installments'
            wrapper.className = 'goods__item-wrapper'
            priceWrapper.className = 'goods__item-price-wrapper'
            price.className = 'goods__item-price'
            sale.className = 'goods__item-sale'
            isLike.className = 'goods__item-isLike'
            isBasket.className = 'goods__item-isBasket'
            discount.className = 'goods__item-discount'
            original.className = 'goods__item-original'

            img.src = item.img
            name.textContent = item.name
            feedback.textContent = item.feedback?.rate + '(' + item.feedback?.count + ` sharhlar)`
            installments.textContent = item.installments
            price.textContent = item.price
            sale.textContent = item.price
            if (item.isLike) {
                isLike.src = '/img/like.svg'
            } else {
                isLike.src = '/img/notLike.svg'
            }
            isLike.id = item.id
            isBasket.id = item.id
            isBasket.src = '/img/addBasket.svg'

            if (item.discount) {
                discount.textContent = 'Aksia'
            } else if (item.original) {
                original.textContent = 'Original'
            }

            isLike.onclick = isLiked
            isBasket.onclick = addToBasket

            priceWrapper.append(wrapper, isBasket)
            wrapper.append(price, sale)
            elGoodsList.append(li)

            li.append(img, name, feedback, installments, priceWrapper, isLike, discount, original)

        }
    } else {
        console.log('');
    }



}



function renderAll(data) {
    elAllList.innerHTML = ''

    for (let i = 0; i < data.length; i++) {

        item = data[i];

        let li = document.createElement('li')

        let img = document.createElement('img')
        let name = document.createElement('h2')
        let feedback = document.createElement('p')
        let installments = document.createElement('p')
        let price = document.createElement('p')
        let sale = document.createElement('p')
        let count = document.createElement('p')
        let priceWrapper = document.createElement('div')
        let wrapper = document.createElement('div')
        let isLike = document.createElement('img')
        let isBasket = document.createElement('img')
        let discount = document.createElement('p')
        let original = document.createElement('p')

        li.className = 'all__item'
        li.id = item.id

        img.width = 232
        img.height = 310

        img.className = 'all__item-img'
        name.className = 'all__item-name'
        feedback.className = 'all__item-feedback'
        installments.className = 'all__item-installments'
        wrapper.className = 'all__item-wrapper'
        priceWrapper.className = 'all__item-price-wrapper'
        price.className = 'all__item-price'
        sale.className = 'all__item-sale'
        isLike.className = 'all__item-isLike'
        isBasket.className = 'all__item-isBasket'
        discount.className = 'all__item-discount'
        original.className = 'all__item-original'

        img.src = item.img
        name.textContent = item.name
        feedback.textContent = item.feedback?.rate + '(' + item.feedback?.count + ` sharhlar)`
        installments.textContent = item.installments
        price.textContent = item.price
        sale.textContent = item.price
        if (item.isLike) {
            isLike.src = '/img/like.svg'
        } else {
            isLike.src = '/img/notLike.svg'
        }
        isLike.id = item.id
        isBasket.id = item.id
        isBasket.src = '/img/addBasket.svg'

        if (item.discount) {
            discount.textContent = 'Aksia'
        } else if (item.original) {
            original.textContent = 'Original'
        }

        isLike.onclick = isLiked
        isBasket.onclick = addToBasket

        priceWrapper.append(wrapper, isBasket)
        wrapper.append(price, sale)
        elGoodsList.append(li)

        li.append(img, name, feedback, installments, priceWrapper, isLike, discount, original)

        elAllList.append(li)

    }



}