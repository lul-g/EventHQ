document.getElementById("logout").addEventListener("click", async () => {
  try {
    const response = await axios.post("/auth/logout");
    console.log(response);
    window.location.href = `/`;
  } catch (error) {
    if (error.response) {
      console.log("Logout Error");
    }
  }
});
