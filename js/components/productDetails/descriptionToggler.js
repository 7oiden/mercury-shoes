export default function descriptionToggler() {
  const iconSelector = document.querySelector(".fas");
  const descriptionParagraph = document.querySelector(".details__text");

  if (descriptionParagraph.style.display === "block") {
  }

  iconSelector.addEventListener("click", paragraphToggler);

  function paragraphToggler() {
    if (descriptionParagraph.style.display === "block") {
      descriptionParagraph.style.display = "none";
      iconSelector.classList.toggle("fa-plus");
    } else {
      descriptionParagraph.style.display = "block";
      iconSelector.classList.toggle("fa-plus");
    }
  }

  //prevents text from getting lost when rezising window
  window.onresize = function () {
    if (window.innerWidth >= 992) {
      descriptionParagraph.style.display = "block";
    }
  };
}
