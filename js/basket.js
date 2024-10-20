let elGoods = document.querySelector('.goods')
let elBasketList = document.querySelector('.basket__list')

async function getAll() {
    let data = await fetch(`${api}items`)

    let arr = await data.json()

    arr = arr.filter(item => {
        if (item.isBasket) {
            return item
        }

    })

    console.log(arr);


    renderLikePage(arr)

}

function renderLikePage(data) {
    elGoodsList.innerHTML = ''

    console.log();
    if (data.length == 0) {
        elGoods.innerHTML = `
        <section class="loading">
              <div class="container">
                <div class="lodaing__wrapper">
                  <img class="loading__img" width="128" height="128" src="./img/loading__img.png" alt="loading">
                  <h2 class="loading__title">Sizga yoqqanini qoʻshing</h2>
                  <p class="loading__text">Mahsulotdagi ♡ belgisini bosing. Akkauntga kiring va barcha saralanganlar saqlanib qoladi</p>
                  <a href="/" class="loading__link">Like Bosish</a>
                </div>
              </div>
            </section>
        `
    }


    if (data) {
        for (let i = 0; i < data.length; i++) {

            item = data[i];

            let li = document.createElement('li')

            let basket = `
            <li class="basket__item">
                    <input type="checkbox" />
                    <img
                      src="${item.img}"
                      width="80"
                      height="110"
                      alt=""
                    />
                    <div class="basket__item-center">
                      <h3 class="basket__item-title">${item.title}</h3>
                      <p class="basket__item-text"></p>
                    </div>
                    <div class="basket__item-btns">
                      <button class="basket__item-btn">-</button>
                      <p class="basket__count">1</p>
                      <button class="basket__item-btn">+</button>
                    </div>
                  </li>
            `
            li.innerHTML = basket

            elBasketList.append(li)

        }
    } else {
        console.log('');
    }



}

getAll()