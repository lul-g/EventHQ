const urlName = document.location.href.split("username=")[1];
const urlID = document.location.href.split("/")[4];

document.getElementById("username_txt").innerHTML = urlName;

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
          <span class="fav">
                <i class="fa-regular fa-heart"></i>
          </span>
        <a href="x.html" class="text-dark card border-dark" style="width: 18rem">
          <div class="card-header">
            <h5 class="text-dark">${event.event.title}</h5>
          </div>
          <div class="card-body">
          
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
   
      `;
      });
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

document.querySelectorAll(".btn-group .view-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    if (event.target.dataset.model == "events") {
      data_cards.innerHTML = await populateWith.events();
      listenOnHeart();
    } else {
      data_cards.innerHTML = await populateWith.orgs();
      listenOnHeart();
    }
  });
});

const eventsInit = async () => {
  data_cards.innerHTML = await populateWith.events();
  listenOnHeart();
};

eventsInit();

function listenOnHeart() {
  document.querySelectorAll(".card-cont .fav").forEach((icon_cont) => {
    icon_cont.addEventListener("click", () => {
      let icon = icon_cont.querySelector("i");
      if (icon.classList.contains("fa-heart")) {
        if (icon.classList.contains("fa-regular")) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        } else {
          icon.classList.add("fa-regular");
          icon.classList.remove("fa-solid");
        }
      } else {
        if (icon.classList.contains("fa-plus")) {
          icon.classList.remove("fa-plus");
          icon.classList.add("fa-minus");
        } else {
          icon.classList.add("fa-plus");
          icon.classList.remove("fa-minus");
        }
      }
    });
  });
}
