const newletterForm = document.querySelector(".newsletter__form");
const newsletterEmailError = document.querySelector("#newsletter-email-error");
const newsletterSuccess = document.querySelector(".newsletter__success");
const newsletterButton = document.querySelector(".newsletter__button");
const newsletterInput = document.querySelector(".newsletter__input");

function validateNewsletterForm(event) {
  event.preventDefault();

  if (validateEmail(newsletterInput.value)) {
    newsletterEmailError.style.display = "none";
  } else {
    newsletterEmailError.style.display = "block";
  }
  if (validateEmail(newsletterInput.value)) {
    newsletterSuccess.innerHTML = `<span>Thank you for subscribing!</span>
    <svg viewBox="0 0 24 24" class="checkmark">
    <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"/>
    </svg>`;
  }
}

newletterForm.addEventListener("submit", validateNewsletterForm);

function validateEmail(newsletterInput) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(newsletterInput);
  return patternMatches;
}