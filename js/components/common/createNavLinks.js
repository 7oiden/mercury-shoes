import { getUsername } from "../../utils/storage.js";
import logoutIcon from "./logoutIcon.js";

export default function createNavLinks() {
  const { pathname } = document.location;

  const linksContainer = document.querySelector(".nav__links-list");
  const mobileLinksContainer = document.querySelector(".mobile-menu__list");
  const adminLogin = document.querySelector(".admin-login");
  const adminLogout = document.querySelector(".admin-logout");
  const banner = document.querySelector(".banner");
  const bannerContainer = document.querySelector(".banner__list");

  const username = getUsername();

  let authUser = "";
  let addLink = "";
  let addLinkMobile = "";

  adminLogout.innerHTML = "";

  if (username) {
    adminLogin.style.display = "none";

    adminLogout.innerHTML = `
    <div class="nav__icon" id="logout">
      <svg viewBox="0 0 24 24">
        <title>Admin logout</title>
        <path fill="currentColor" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
      </svg></div>`;

    addLink = `
    <li>
      <a href="add-product.html" class="nav__link ${
        pathname === "/add-product.html" ? "nav__link--active" : ""
      }">Add Product</a>
    </li>`;

    addLinkMobile = `
    <li>
      <a href="add-product.html" class="mobile-menu__item">Add Product</a>
    </li>`;

    authUser = `
    <span>Signed in as: <em>${username}</em></span>`;

    bannerContainer.innerHTML = `
    <li>${authUser}</li>`;

    banner.style.backgroundColor = "#0E6673";
  }

  linksContainer.innerHTML = `
  <li>
    <a href="/" class="${
      pathname === "/" || pathname === "/index.html" ? "nav__link--active" : ""
    } 
    nav__link">Home</a>
  </li>
  <li>
    <a href="products-overview.html" class="${
      pathname === "/products-overview.html" ? "nav__link--active" : ""
    } nav__link">Products</a>
  </li>
  <li id="about"><a href="about.html" class="${
    pathname === "/about.html" ? "nav__link--active" : ""
  } nav__link">About us</a></li>
  ${addLink}
  `;

  mobileLinksContainer.innerHTML = `
  <li class="mobile-menu__item">
    <a href="/" class= mobile-menu__link">Home</a>
  </li>
  <li class="mobile-menu__item">
    <a href="products-overview.html" class="mobile-menu__link">Products</a>
  </li>
  <li class="mobile-menu__item" id="about">
    <a href="about.html" class="mobile-menu__link">About us</a>
  </li>
  ${addLinkMobile}`;

  logoutIcon();
}
