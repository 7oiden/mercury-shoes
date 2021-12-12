import { getExistingBasket, saveBasket } from "../utils/storage.js";
import { getToken } from "../utils/storage.js";
import descriptionToggler from "../components/productDetails/descriptionToggler.js";
import { basketCounter } from "../components/common/basketCounter.js";

const detailsContainer = document.querySelector(".details__container");

const basket = getExistingBasket();

const token = getToken();

export default function renderDetails(details) {
  let editProd = "";

  if (token) {
    editProd = `<a href="edit-product.html?id=${details.id}" class="details__edit-button edit-button">
        Edit Product
      </a>`;
  }

  //   const plusIcon = `<svg viewBox="0 0 24 24" id="plus-icon">
  //     <path fill="currentColor" d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z" />
  // </svg>`;

  let iconClass = "fa-plus";

  ///toggles button class
  let buttonClass = "add-to-basket";
  let buttonText = "Add to basket";

  const itemAlreadyInBasket = basket.find((item) => {
    detailsContainer.innerHTML = "";

    return parseInt(item.id) === details.id;
  });

  if (itemAlreadyInBasket) {
    buttonClass = "remove-from-basket";
    buttonText = "Remove from basket";
  }

  let gender = "Unisex";

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
    <div class="details__heading-wrapper">
    <h2 class="details__sub-heading">Product info:</h2>
    <i class="fas ${iconClass} fa-minus"></i>
    </div>
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

  descriptionToggler();
  // const iconSelector = document.querySelector(".fas");
  // const descriptionParagraph = document.querySelector(".details__text");

  // if (descriptionParagraph.style.display === "block") {
  // }

  // iconSelector.addEventListener("click", paragraphToggler);

  // function paragraphToggler() {
  //   if (descriptionParagraph.style.display === "block") {
  //     descriptionParagraph.style.display = "none";
  //     iconSelector.classList.toggle("fa-plus");
  //   } else {
  //     descriptionParagraph.style.display = "block";
  //     iconSelector.classList.toggle("fa-plus");
  //   }
  // }

  // //prevents text from getting lost when rezising window
  // window.onresize = function () {
  //   if (window.innerWidth >= 992) {
  //     descriptionParagraph.style.display = "block";
  //   }
  // };

  const button = document.querySelector("#buy-button");
  const messageContainer = document.querySelector(".button-message");
  const counterContainer = document.querySelector("#counter-container");

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
    this.classList.toggle("add-to-basket");

    if (this.classList.contains("add-to-basket")) {
      this.innerHTML = "Add to basket";
    }

    this.classList.toggle("remove-from-basket");

    if (this.classList.contains("remove-from-basket")) {
      this.innerHTML = "Remove from basket";
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
      //runs basket counter animation when product is added
      counterContainer.classList.add("animation");
      setTimeout(function () {
        counterContainer.classList.remove("animation");
      }, 1500);
      currentBasket.push(basket);
      saveBasket(currentBasket);
      basketCounter();
      messageContainer.innerHTML = "Product added to basket.";
      setTimeout(function () {
        messageContainer.innerHTML = "";
      }, 1500);
    } else {
      messageContainer.innerHTML = "Product removed from basket.";

      setTimeout(function () {
        messageContainer.innerHTML = "";
      }, 1500);
      const newBasket = currentBasket.filter((item) => {
        return item.id !== id;
      });
      saveBasket(newBasket);
      basketCounter();
    }
  }
}
