import { mobileToggler } from "./components/dropdownTogglers.js";
// import { adminToggler } from "./components/dropdownTogglers.js";
import createAdminNav from "./components/common/createAdminNav.js";
import displayAlert from "./components/common/displayAlert.js";
// import { alertContainer } from "./settings/constants.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import { basketCounter } from "./components/common/basketCounter.js";

basketCounter();

const alertContainer = document.querySelector(".addalert-container");

createAdminNav();

const addForm = document.querySelector(".add__form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const color = document.querySelector("#color");
const shortDescription = document.querySelector("#short-description");
const description = document.querySelector("#description");
const productImage = document.querySelector("#product-image");
const imageAltText = document.querySelector("#image-alt-text");

const titleError = document.querySelector("#add-title-error");
const priceError = document.querySelector("#add-price-error");
const colorError = document.querySelector("#add-color-error");
const shortDescriptionError = document.querySelector(
  "#add-short-description-error"
);
const descriptionError = document.querySelector("#add-description-error");
const urlError = document.querySelector("#add-url-error");
const altTextError = document.querySelector("#add-alt-text-error");

const alert = document.querySelector(".addalert-container");

document.getElementById("product-image").value = "via.placeholder.com/500x400";

addForm.addEventListener("submit", submitAddForm);

function submitAddForm(event) {
  event.preventDefault();

  alert.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const colorValue = color.value.trim();
  const shortDescriptionValue = shortDescription.value.trim();
  const descriptionValue = description.value.trim();
  const productImageValue = "https://" + productImage.value.trim();
  const imageAltTextValue = imageAltText.value.trim();

  console.log(productImageValue);

  const featuredValue = document.querySelector(
    'input[name="featured"]:checked'
  ).value;

  const stockValue = document.querySelector(
    'input[name="stock"]:checked'
  ).value;

  console.log(productImageValue);

  // validation
  function checkLength(value, len) {
    if (value.trim().length > len) {
      return true;
    } else {
      return false;
    }
  }

  function validateNumber(priceValue) {
    const regEx = /^-?\d+\.?\d*$/;
    const patternMatches = regEx.test(priceValue);
    return patternMatches;
  }

  function checkInput() {
    if (checkLength(title.value, 4)) {
      titleError.style.display = "none";
    } else {
      titleError.style.display = "block";
    }

    if (validateNumber(price.value)) {
      priceError.style.display = "none";
    } else {
      priceError.style.display = "block";
    }

    if (checkLength(color.value, 2)) {
      colorError.style.display = "none";
    } else {
      colorError.style.display = "block";
    }

    if (checkLength(shortDescription.value, 9)) {
      shortDescriptionError.style.display = "none";
    } else {
      shortDescriptionError.style.display = "block";
    }

    if (checkLength(description.value, 14)) {
      descriptionError.style.display = "none";
    } else {
      descriptionError.style.display = "block";
    }

    if (checkLength(productImage.value, 9)) {
      urlError.style.display = "none";
    } else {
      urlError.style.display = "block";
    }

    if (checkLength(imageAltText.value, 9)) {
      altTextError.style.display = "none";
    } else {
      altTextError.style.display = "block";
    }
  }

  title.addEventListener("keyup", checkInput);
  price.addEventListener("keyup", checkInput);
  color.addEventListener("keyup", checkInput);
  shortDescription.addEventListener("keyup", checkInput);
  description.addEventListener("keyup", checkInput);
  productImage.addEventListener("keyup", checkInput);
  imageAltText.addEventListener("keyup", checkInput);

  title.onfocus = function () {
    title.style.border = "1px solid #bdbdbd";
  };

  price.onfocus = function () {
    price.style.border = "1px solid #bdbdbd";
  };

  color.onfocus = function () {
    shortDescription.style.border = "1px solid #bdbdbd";
  };

  shortDescription.onfocus = function () {
    shortDescription.style.border = "1px solid #bdbdbd";
  };

  description.onfocus = function () {
    description.style.border = "1px solid #bdbdbd";
  };

  productImage.onfocus = function () {
    productImage.style.border = "1px solid #bdbdbd";
  };

  imageAltText.onfocus = function () {
    imageAltText.style.border = "1px solid #bdbdbd";
  };

  if (checkLength(title.value, 4)) {
    titleError.style.display = "none";
    title.style.border = "1px solid #bdbdbd";
  } else {
    titleError.style.display = "block";
    title.style.border = "2px solid #ed553b";
  }
  if (validateNumber(price.value)) {
    priceError.style.display = "none";
    price.style.border = "1px solid #bdbdbd";
  } else {
    priceError.style.display = "block";
    price.style.border = "2px solid #ed553b";
  }
  if (checkLength(color.value, 2)) {
    colorError.style.display = "none";
    color.style.border = "1px solid #bdbdbd";
  } else {
    colorError.style.display = "block";
    color.style.border = "2px solid #ed553b";
  }
  if (checkLength(shortDescription.value, 9)) {
    shortDescriptionError.style.display = "none";
    shortDescription.style.border = "1px solid #bdbdbd";
  } else {
    shortDescriptionError.style.display = "block";
    shortDescription.style.border = "2px solid #ed553b";
  }

  if (checkLength(description.value, 14)) {
    descriptionError.style.display = "none";
    description.style.border = "1px solid #bdbdbd";
  } else {
    descriptionError.style.display = "block";
    description.style.border = "2px solid #ed553b";
  }

  if (checkLength(productImage.value, 9)) {
    urlError.style.display = "none";
    productImage.style.border = "1px solid #bdbdbd";
  } else {
    urlError.style.display = "block";
    productImage.style.border = "2px solid #ed553b";
  }

  if (checkLength(imageAltText.value, 9)) {
    altTextError.style.display = "none";
    imageAltText.style.border = "1px solid #bdbdbd";
  } else {
    altTextError.style.display = "block";
    imageAltText.style.border = "2px solid #ed553b";
  }

  if (
    checkLength(title.value, 4) &&
    checkLength(color.value, 2) &&
    checkLength(shortDescription.value, 9) &&
    checkLength(description.value, 14) &&
    checkLength(productImage.value, 9) &&
    checkLength(imageAltText.value, 9) &&
    validateNumber(price.value)
  ) {
    addProduct(
      titleValue,
      priceValue,
      colorValue,
      shortDescriptionValue,
      descriptionValue,
      productImageValue,
      imageAltTextValue,
      featuredValue,
      stockValue
    );
  } else {
    window.scrollTo(0, 200);
  }

  async function addProduct(
    title,
    price,
    color,
    short_description,
    description,
    image_url,
    image_alt_text,
    featured,
    stock
  ) {
    const jsonData = {
      title: title,
      price: price,
      color: color,
      short_description: short_description,
      description: description,
      image_url: image_url,
      image_alt_text: image_alt_text,
      featured: featured,
      stock: stock,
    };

    const addData = JSON.stringify(jsonData);

    const token = getToken();

    const options = {
      method: "POST",
      body: addData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const productsUrl = baseUrl + "products";

    try {
      const response = await fetch(productsUrl, options);
      const json = await response.json();

      console.log(json);

      if (json.created_at) {
        displayAlert(
          "success",
          "New Product successfully created",
          ".addalert-container"
        );

        setTimeout(function () {
          alertContainer.innerHTML = "";
        }, 2000);

        addForm.reset();
      }

      if (json.error) {
        displayAlert("error", json.message, ".addalert-container");
      }
      console.log(json);
    } catch (error) {
      displayAlert("error", "Something went wrong!", ".addalert-container");
    }
  }
}
