import { renderProducts } from "./renderProducts.js";

export function searchProducts(products) {
  const searchInput = document.querySelector(".search__input");
  const loadButton = document.querySelector("#load-button");

  searchInput.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    loadButton.style.display = "none";

    const filteredProducts = products.filter(function (product) {
      if (
        product.title.toLowerCase().includes(searchValue) ||
        product.short_description.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue) ||
        product.title.toLowerCase().startsWith(searchValue) ||
        product.short_description.toLowerCase().startsWith(searchValue) ||
        product.description.toLowerCase().includes(searchValue) 
      ) {
        return true;
      }
    });

    renderProducts(filteredProducts);
  };
}
