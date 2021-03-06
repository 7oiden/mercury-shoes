import { adminUrl } from "../../settings/api.js";
import displayAlert from "./displayAlert.js";
import { saveToken, saveUser } from "../../utils/storage.js";
import { alertContainer } from "../../settings/constants.js";
import { ValidateAdminLogin } from "../formValidation/validateAdminLogin.js";
import { checkLength } from "../../utils/validators.js";

const adminForm = document.querySelector(".admin__form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

export default function adminLogin() {
  adminForm.addEventListener("submit", submitAdminForm);

  function submitAdminForm(event) {
    event.preventDefault();

    alertContainer.innerHTML = "";

    ValidateAdminLogin();

    const usernameInput = username.value.trim();
    const passwordInput = password.value.trim();

    if (checkLength(username.value, 3) && checkLength(password.value, 5)) {
      performLogin(usernameInput, passwordInput);
    }
  }

  async function performLogin(username, password) {
    const loginData = JSON.stringify({
      identifier: username,
      password: password,
    });

    const options = {
      method: "POST",
      body: loginData,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(adminUrl, options);
      const json = await response.json();

      if (json.user) {
        saveToken(json.jwt);
        saveUser(json.user);
        window.location.reload();
      }

      if (json.error) {
        displayAlert(
          "warning",
          "Username and/or password is invalid",
          ".alert-container"
        );
      }
    } catch (error) {
      displayAlert("error", "Something went wrong!", ".alert-container");
    }
  }
}
