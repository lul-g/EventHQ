document.getElementById("logout").addEventListener("click", async () => {
  try {
    const response = await axios.post("/auth/logout");
    window.location.href = `/`;
  } catch (error) {
    if (error.response) {
      console.log("Logout Error");
    }
  }
});
