let api = 'https://6714b258690bf212c762246c.mockapi.io/'
let elGoodsList = document.querySelector('.goods__list')

getAll()
login()


async function getAll() {
    let data = await fetch(`${api}items`)

    let arr = await data.json()

    render(arr)

}

async function isLiked(e) {
    let situation = e.target.src.split('/').at(-1)

    let id = e.target.id
    console.log(situation == 'notLike.svg' ? false : true);

    let req = JSON.stringify({
        isLike: situation == 'notLike.svg' ? true : false
    })
    console.log(req);


    let response = await fetch(`${api}items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: req
    })

    getAll()


}


async function login() {
    let response = await fetch(`${api}login`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            username: 'Toxirrrr',
            password: 'f5b15a41-ce30-4f9f-894f-1757b153b0a1'
        })
    })

    console.log('response');
    

}



function render(data) {
    elGoodsList.innerHTML = ''

    try {
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
                let isLike = document.createElement('img')
                let isBasket = document.createElement('p')
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
                price.className = 'goods__item-price'
                sale.className = 'goods__item-sale'
                count.className = 'goods__item-count'
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
                count.textContent = item.count
                if (item.isLike) {
                    isLike.src = '/img/like.svg'
                } else {
                    isLike.src = '/img/notLike.svg'
                }
                isLike.id = item.id
                isBasket.id = item.id
        
                if (item.discount) {
                    discount.textContent = 'Aksia'
                } else if (item.original) {
                    original.textContent = 'Original'
                }
        
                isLike.onclick = isLiked
        
                elGoodsList.append(li)
        
                li.append(img, name, feedback, installments, price, sale, count, isLike, isBasket, discount, original)
        
            }
        }else {
            console.log('');
        }
    } catch (error) {
        elGoodsList.innerHTML = 'Loading'
    }finally {
        elGoodsList.innerHTML = 'Loading'
    }



}

