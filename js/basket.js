let elGoods = document.querySelector('.goods')
let elBasketList = document.querySelector('.basket__list')
let elBasket = document.querySelector('.basket')
let elBasketCountInBasket = document.querySelector('.basket__span')

basketGetAll()

async function basketGetAll() {
  let data = await fetch(`${api}items`)

  let arr = await data.json()

  arr = arr.filter(item => {
    if (item.count) {
      return item
    }
  })
  renderBasketPage(arr)

}

async function controlCount(obj, id) {
  let res = await fetch(`${api}items/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: 'PUT',
    body: JSON.stringify({
      isBasket: obj.obj || true,
      count: obj.count
    })
  })

  res = await res.json()

  if (res.count != obj.count) {
    return
  }
  basketGetAll()

  //location.href = '/basket.html'
}

function count(e) {

  let id = e.target.id
  let count = e.target.title
  let content = e.target.textContent
  let obj = {
    count: +count,
    isBasket: true
  }
  if (content == '+') {
    obj.count++;
  }
  if (content == '-' && count != 1 || 0) {
    obj.count--;
  }
  if (count == 'delete') {
    obj.count = 0
    obj.isBasket = false
  }
  console.log(obj);
  // controlCount(obj, id);

}

function renderBasketPage(data) {
  elBasketList.innerHTML = ''

  if (data.length == 0) {
    elBasket.innerHTML = `
        <section class="loading">
              <div class="container">
                <div class="lodaing__wrapper">
                  <img class="loading__img" width="128" height="128" src="./img/noBasket__img.png" alt="loading">
                  <h2 class="loading__title">Savatda hozircha mahsulot yoʻq</h2>
                  <p class="loading__text">Bosh sahifadagi to’plamlardan boshlang yoki kerakli mahsulotni qidiruv orqali toping</p>
                  <a href="/" class="loading__link">Bosh Sahifa</a>
                </div>
              </div>
            </section>
        `
  } else {

    let num = 0

    for (let i = 0; i < data.length; i++) {

      let item = data[i];

      let li = document.createElement('li')
      li.className = 'basket__item'

      li.id = item.id
      elBasketCountInBasket.textContent = ` ${++num} Mahsulot`

      const basketItem = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const img = document.createElement("img");
      img.draggable = false
      img.src = item.img;
      img.width = 80;
      img.height = 110;
      img.alt = item.name;

      const basketItemCenter = document.createElement("div");
      basketItemCenter.classList.add("basket__item-center");

      const itemTitle = document.createElement("h3");
      itemTitle.classList.add("basket__item-title");
      itemTitle.textContent = item.name;

      const sellerInfo = document.createElement("p");
      sellerInfo.classList.add("basket__item-text");
      sellerInfo.textContent = "Sotuvchi: www";

      basketItemCenter.appendChild(itemTitle);
      basketItemCenter.appendChild(sellerInfo);

      const basketItemBtns = document.createElement("div");
      basketItemBtns.classList.add("basket__item-btns");

      const decrementBtn = document.createElement("button");
      decrementBtn.classList.add("basket__item-btn");
      decrementBtn.setAttribute("title", item.count);
      decrementBtn.setAttribute("id", item.id);
      decrementBtn.textContent = "-";
      decrementBtn.onclick = count


      const itemCount = document.createElement("p");
      itemCount.classList.add("basket__count");
      itemCount.textContent = item.count;

      const incrementBtn = document.createElement("button");
      incrementBtn.classList.add("basket__item-btn");
      incrementBtn.setAttribute("title", item.count);
      incrementBtn.setAttribute("id", item.id);
      incrementBtn.textContent = "+";
      incrementBtn.onclick = count

      basketItemBtns.append(decrementBtn, itemCount, incrementBtn);

      const basketItemPriceContainer = document.createElement("div");
      const basketItemPrice = document.createElement("div");
      basketItemPrice.setAttribute("id", item.id);
      basketItemPrice.classList.add("basket__item-price");

      const binIcon = document.createElement("img");
      binIcon.src = "./img/profile__basket.svg";
      binIcon.setAttribute("title", 'delete');
      binIcon.id = item.id
      binIcon.width = 24;
      binIcon.height = 24;
      binIcon.alt = "bin";
      binIcon.onclick = count

      const deleteText = document.createElement("p");
      deleteText.textContent = "Yo'q qilish"
      deleteText.setAttribute("id", item.id);
      deleteText.setAttribute("title", 'delete');
      deleteText.onclick = count

      basketItemPrice.appendChild(binIcon);
      basketItemPrice.appendChild(deleteText);
      basketItemPriceContainer.appendChild(basketItemPrice);

      basketItem.appendChild(checkbox);
      basketItem.appendChild(img);
      basketItem.appendChild(basketItemCenter);
      basketItem.appendChild(basketItemBtns);
      basketItem.appendChild(basketItemPriceContainer);


      li.appendChild(basketItem)

      elBasketList.append(li)

    }
  }



}
