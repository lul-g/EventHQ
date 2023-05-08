document.querySelectorAll(".btn-group .view-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(event.target.dataset);
    if (event.target.dataset.model == "events") {
      document.querySelector(".events").classList.replace("d-none", "d-flex");
      document.querySelector(".orgs").classList.replace("d-flex", "d-none");
    } else {
      document.querySelector(".orgs").classList.replace("d-none", "d-flex");
      document.querySelector(".events").classList.replace("d-flex", "d-none");
    }
  });
});

document.querySelectorAll(".fav").forEach((heart) => {
  heart.addEventListener("click", () => {
    Toastify({
      text: "Please Login Or Signup first!",
      duration: 2000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#ff426b",
      },
      destination: "/auth",
    }).showToast();
  });
});
