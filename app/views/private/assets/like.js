let attending = returnEvents().split(",");
let memberships = returnOrgs().split(",");
const href = window.location.href.split("/");
const UID =
  href[href.length - 1] == "likes" || href[href.length - 1] == "memberships"
    ? href[href.length - 2]
    : href[href.length - 1];
const like = {
  event: async () => {
    if (event.target.querySelector("i").classList.contains("fa-regular")) {
      attending[0] == ""
        ? (attending[0] = event.target.dataset.event)
        : attending.push(event.target.dataset.event);
      const response = await axios.put(`/users/${UID}/likes`, {
        info: [...new Set(attending)],
        _id: UID,
        model: "user",
        field: "attending",
      });
    } else {
      let index = attending.indexOf(event.target.dataset.event);

      if (index > -1) {
        attending.splice(index, 1);
      }
      const response = await axios.put(`/users/${UID}/likes`, {
        info: [...new Set(attending)],
        _id: UID,
        model: "user",
        field: "attending",
      });
    }
  },
  org: async () => {
    if (event.target.querySelector("i").classList.contains("fa-regular")) {
      memberships[0] == ""
        ? (memberships[0] = event.target.dataset.org)
        : memberships.push(event.target.dataset.org);
      const response = await axios.put(`/users/${UID}/memberships`, {
        info: [...new Set(memberships)],
        _id: UID,
        model: "user",
        field: "memberships",
      });
    } else {
      let index = memberships.indexOf(event.target.dataset.org);
      if (index > -1) {
        memberships.splice(index, 1);
      }
      const response = await axios.put(`/users/${UID}/memberships`, {
        info: [...new Set(memberships)],
        _id: UID,
        model: "user",
        field: "memberships",
      });
    }
  },
};
