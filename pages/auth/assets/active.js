let btn_left = document.getElementById("left");
let btn_right = document.getElementById("right");
let contanier = document.querySelector(".container");
let overlay_container = document.querySelector(".overlay__container");

btn_left.addEventListener("click", () => {
  event.preventDefault();
  contanier.classList.add("shift");
});
btn_right.addEventListener("click", () => {
  event.preventDefault();
  contanier.classList.remove("shift");
});

let btn_left_mobile = document.getElementById("mobile_left");
let btn_right_mobile = document.getElementById("mobile_right");

btn_left_mobile.addEventListener("click", () => {
  event.preventDefault();
  contanier.classList.add("shift");
});
btn_right_mobile.addEventListener("click", () => {
  event.preventDefault();
  contanier.classList.remove("shift");
});
