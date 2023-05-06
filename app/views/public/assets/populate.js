let data_cards = document.querySelector(".data-cards");
let populateWith = {
  events: () => {
    let content = "";
    for (let i = 0; i < 6; i++) {
      content += `
            <div class="card-cont" style="width: 18rem">
            <a href="x.html" class="text-dark card border-dark" style="width: 18rem">
              <div class="card-header">
                <h5 class="text-dark">Johnson Elementary Color Run!</h5>
              </div>
              <div class="card-body">
              <span class="fav">
                    <i class="fa-regular fa-heart"></i>
                </span>
                <h6 class="card-subtitle mb-2 text-dark">SAT, may 19, 2:00am</h6>
                <h6 class="card-subtitle mb-2 text-muted">
                  103 parkway, cincinnati, oh
                </h6>
                <p class="card-text">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
                <div class="card-text mt-3">
                  <i class="fa-solid fa-users"></i>
                  <b>${13 * i + 16} showing up</b>
                </div>
              </div>
            </a>
          </div>
          `;
    }
    return content;
  },
  orgs: () => {
    let content = "";
    for (let i = 0; i < 5; i++) {
      content += `
            <div class="orgs card-cont" style="width: 18rem">
            <a href="x.html" class="text-dark card border-dark" style="width: 18rem">
              <div class="card-header">
                <h5 class="text-dark">Orgs</h5>
              </div>
              <div class="card-body">
                <span class="fav">
                    <i class="fa-regular fa-heart"></i>
                </span>
                <h6 class="card-subtitle mb-2 text-dark"></h6>
                <h6 class="card-subtitle mb-2 text-muted">
                  103 parkway, cincinnati, oh
                </h6>
                <p class="card-text">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
                <div class="card-text mt-3">
                  <i class="fa-solid fa-users"></i>
                  <b>${13 * i + 16} members</b>
                </div>
              </div>
            </a>
          </div>
          `;
    }
    return content;
  },
};

data_cards.innerHTML = populateWith.events();

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
    if (event.target.dataset.toggle == "events") {
      data_cards.innerHTML = populateWith.events();
    } else {
      data_cards.innerHTML = populateWith.orgs();
    }
  });
});
