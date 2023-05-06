let data_cards = document.querySelector(".data-cards");

let populateWith = {
  events: async () => {
    let content = "";
    try {
      const response = await axios.post("/users/:id", { model: "event" });
      const { data, status, headers } = response;
      console.log(data);
      data.model.map((event) => {
        content += `
        <div class="card-cont" style="width: 18rem">
        <a href="x.html" class="text-dark card border-dark" style="width: 18rem">
          <div class="card-header">
            <h5 class="text-dark">${event.event.title}</h5>
          </div>
          <div class="card-body">
          <span class="fav">
                <i class="fa-regular fa-heart"></i>
          </span>
          <h6 class="card-subtitle mb-2 text-dark">${event.event.startDate}</h6>
          <h6 class="card-subtitle mb-2 text-muted">
            ${event.event.location}
          </h6>
          <p class="card-text">
            ${event.event.description}
          </p>
            <div class="card-text mt-3">
              <i class="fa-solid fa-users"></i>
              <b>${event.event.attendees.length} showing up</b>
            </div>
          </div>
        </a>
      </div>
      `;
      });
      console.log(response);
    } catch (error) {
      if (error.response) {
        const { data, status, headers } = error.response;
        console.log("Err: ", data);
        validate.showErrorMsg(err_div, data.message, data.customStatus);
      }
    }
    return content;
  },
  orgs: async () => {
    let content = "";
    try {
      const response = await axios.post("/users/:id", { model: "org" });
      const { data, status, headers } = response;
      data.model.map((org) => {
        content += `
        <div class="card-cont" style="width: 18rem">
        <a href="x.html" class="text-dark card border-dark" style="width: 18rem">
          <div class="card-header">
            <h5 class="text-dark">${org.org.name}</h5>
          </div>
          <div class="card-body">
          <span class="fav">
                <i class="fa-regular fa-heart"></i>
          </span>
          <h6 class="card-subtitle mb-2 text-dark">${org.org.startDate}</h6>
          <h6 class="card-subtitle mb-2 text-muted">
            ${org.org.location}
          </h6>
          <p class="card-text">
            ${org.org.description}
          </p>
            <div class="card-text mt-3">
              <i class="fa-solid fa-users"></i>
              <b>${org.org.members.length} showing up</b>
            </div>
          </div>
        </a>
      </div>
      `;
      });
      console.log(response);
    } catch (error) {
      if (error.response) {
        const { data, status, headers } = error.response;
        console.log("Err: ", data);
        validate.showErrorMsg(err_div, data.message, data.customStatus);
      }
    }
    return content;
  },
};

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
  btn.addEventListener("click", async () => {
    if (event.target.dataset.model == "events") {
      data_cards.innerHTML = await populateWith.events();
    } else {
      data_cards.innerHTML = await populateWith.orgs();
    }
  });
});

const eventsInit = async () => {
  data_cards.innerHTML = await populateWith.events();
};

eventsInit();
