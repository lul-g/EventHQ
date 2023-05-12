document.querySelectorAll(".data-cards .fav").forEach((heart_cont) => {
  heart_cont.addEventListener("click", () => {
    let heart = heart_cont.querySelector(".data-cards .fav i");
    if (heart.classList.contains("fa-regular")) {
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");
    } else {
      heart.classList.add("fa-regular");
      heart.classList.remove("fa-solid");
    }
  });
});

document.querySelectorAll(".btn-group .view-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (event.target.dataset.model == "events") {
      document.querySelector(".events").classList.replace("d-none", "d-flex");
      document.querySelector(".orgs").classList.replace("d-flex", "d-none");
    } else {
      document.querySelector(".orgs").classList.replace("d-none", "d-flex");
      document.querySelector(".events").classList.replace("d-flex", "d-none");
    }
  });
});
