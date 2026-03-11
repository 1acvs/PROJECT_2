const card = document.querySelector(".card");
const cardInner = document.querySelector(".card-inner");
const btns = document.querySelectorAll(".btn-player-stats");

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    cardInner.classList.toggle("card-flip");
  });
});
