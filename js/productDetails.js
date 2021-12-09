import { baseUrl } from "./settings/api.js";
import displayAlert from "./components/common/displayAlert.js";
import { mobileToggler } from "./components/dropdownTogglers.js";
import { adminToggler } from "./components/dropdownTogglers.js";
import { validateNewsletterForm } from "./components/newsletter.js";
import createAdminNav from "./components/common/createAdminNav.js";

import { getExistingBasket, saveBasket } from "./utils/storage.js";
import { basketCounter } from "./components/common/basketCounter.js";
import { getToken } from "./utils/storage.js";

const token = getToken();

basketCounter();

createAdminNav();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const detailUrl = baseUrl + "products/" + id;

// console.log(detailUrl);

(async function () {
  try {
    const response = await fetch(detailUrl);
    const details = await response.json();

    console.log(details);

    document.title = `Mercury Shoes | ${details.title}`;

    createHtml(details);
  } catch (error) {
    displayAlert("alert error", error, ".details__container");
  }
})();

const detailsContainer = document.querySelector(".details__container");

const basket = getExistingBasket();

detailsContainer.innerHTML = "";

function createHtml(details) {
  let editProd = "";

  if (token) {
    editProd = `<a href="edit-product.html?id=${details.id}" class="details__edit-button edit-button">
        Edit Product
      </a>`;
  }

  ///toggles button class
  let buttonClass = "on";
  let buttonText = "Add to basket";

  const itemAlreadyInBasket = basket.find((item) => {
    return parseInt(item.id) === details.id;
  });

  if (itemAlreadyInBasket) {
    buttonClass = "off";
    buttonText = "Remove from basket";
  }

  let gender = "Unisex"

  let stockInfo = `<div class="in-stock"></div>`;

  if (!details.stock) {
    stockInfo = `<div class="out-of-stock"></div>`;
  }

  let sizeContent = `
    <div class="details__line-wrapper">
          <label for="size" class="details__label">Size:</label>
          <select id="size">
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="44">45</option>
          </select>
          </div>
          `;

  let quantityContent = `
  <div class="details__line-wrapper">
          <label for="quantity" class="details__label">Quantity:</label>
          <select id="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          </div>
          `;

  detailsContainer.innerHTML = `<div class="details__image">
  <img src="${details.image_url}" alt="${
    details.image_alt_text
  }" class="details__image"/>
  </div>
  <div class="details__card">
  <div class="details__head">
  <div class="details__title-wrapper">
  <h1 class="details__title">${details.title}</h1>
  ${editProd}
  </div>
  <p class="details__price">$${details.price.toFixed(2)}</p>
  </div>
  <hr />
  <div class="details__block-wrapper">
  <div class="details__block1">
  <div class="details__value-wrapper">
    <div class="details__line-wrapper">
    <h3 class="details__label">Gender:</h3>
    <p class="details__value">${gender}</p>
    </div>
    <div class="details__line-wrapper">
    <h3 class="details__label">Color:</h3>
    <p class="details__value">${details.color}</p>
    </div>
    <div>
    <form class="quantity-container">${sizeContent}</form>
    </div>
    <form class="quantity-container">${quantityContent}</form>
    </div>
    </div>
    <div class="details__block2">
    <h2 class="details__sub-heading">Product info:</h2>
    <p class="details__text">${details.description}</p>
    </div>
    </div>
    <hr />
    <div class="details__button-wrapper">
    <div class="button-message"></div>
    <div class="details__stock-wrapper">
    <h3 class="details__stock-label">In stock:</h3>${stockInfo}
    </div>
    <button class="button primary-button ${buttonClass}"
    id="buy-button" 
    data-id="${details.id}"
    data-image="${details.image_url}"
    data-color="${details.color}"
    data-title="${details.title}"
    data-price="${details.price}"
    data-stock="${details.stock}"
    data-quantity="">
    ${buttonText}</button>
    </div>
    </div>
  `;

  // console.log(details.stock);

  const button = document.querySelector("#buy-button");
  const messageContainer = document.querySelector(".button-message");

  messageContainer.innerHTML = "";

  if (!details.stock) {
    button.classList.add("disabled");
  }

  if (!details.stock && buttonText === "Remove from basket") {
    button.classList.remove("disabled");
  }

  button.addEventListener("click", handleBuyButton);

  function handleBuyButton() {
    if (!details.stock) {
      button.classList.add("disabled");
    }
    this.classList.toggle("on");
    this.classList.toggle("off");

    if (this.classList.contains("on")) {
      this.innerHTML = "Add to basket";
      // console.log(this.classList);
    }

    if (this.classList.contains("off")) {
      this.innerHTML = "Remove from basket";
      console.log("hi");
      // console.log(this.classList);
    }

    let size = document.getElementById("size").value;
    const selectSize = document.querySelector("#size");

    selectSize.addEventListener("change", (event) => {
      size = event.target.value;
    });

    let quantity = document.getElementById("quantity").value;
    const selectQuantity = document.querySelector("#quantity");

    selectQuantity.addEventListener("change", (event) => {
      quantity = event.target.value;
    });

    const id = this.dataset.id;
    const image = this.dataset.image;
    const color = this.dataset.color;
    const title = this.dataset.title;
    const price = this.dataset.price;

    const currentBasket = getExistingBasket();

    const basketInStorage = currentBasket.find((item) => {
      return item.id === id;
    });

    if (!basketInStorage) {
      const basket = {
        id: id,
        image: image,
        color: color,
        title: title,
        price: price,
        size: size,
        quantity: quantity,
      };

      currentBasket.push(basket);
      saveBasket(currentBasket);
      basketCounter();
    } else {
      messageContainer.innerHTML = "Product removed from basket.";

      setTimeout(function () {
        messageContainer.innerHTML = "";
      }, 2000);
      const newBasket = currentBasket.filter((item) => {
        return item.id !== id;
      });
      saveBasket(newBasket);
      basketCounter();
    }
  }
}

// <div class="details__size-box">
// <div class="details__size">36</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">37</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">38</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">39</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">40</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">41</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">42</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">43</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">44</div>
// </div>
// <div class="details__size-box">
// <div class="details__size">45</div>
// </div>
