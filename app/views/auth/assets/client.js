const sign_up_form = document.getElementById("sign_up_form");
const sign_in_form = document.getElementById("sign_in_form");

const onSubmit = {
  signUpRequest: async (event) => {
    event.preventDefault();
    let username = document.querySelector('[name="signup_name"]');
    let email = document.querySelector('[name="signup_email"]');
    let password = document.querySelector('[name="signup_pwd"]');
    let err_div = document.querySelector("#sign_up_form .err_div");

    const userInfo = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    try {
      const response = await axios.post("/auth/signup", userInfo);
      const { data, status, headers } = response;
      console.log(response);
      console.log(document.cookie.split(";"));
      window.location.href = `/users/${data.user.username}`;
    } catch (error) {
      if (error.response) {
        const { data, status, headers } = error.response;
        console.log("Err: ", data);
        validate.showErrorMsg(err_div, data.message, data.customStatus);
      }
    }
  },
  signInRequest: async (event) => {
    event.preventDefault();
    let username = document.querySelector('[name="signin_nameEmail"]');
    let password = document.querySelector('[name="signin_pwd"]');
    let err_div = document.querySelector("#sign_in_form .err_div");

    const userInfo = {
      username: username.value,
      password: password.value,
    };

    try {
      const response = await axios.post("/auth/login", userInfo);
      const { data, status, headers } = response;
      window.location.href = `/users/${data.user.username}`;
    } catch (error) {
      if (error.response) {
        const { data, status, headers } = error.response;
        console.log("Err: ", data);
        validate.showErrorMsg(err_div, data.message, data.customStatus);
      }
    }
  },
};

const validate = {
  // during both
  fieldIsEmpty: (...params) => {},

  // during sign_up
  invalidUserName: (...params) => {},
  invalidPwd: (...params) => {},

  showErrorMsg: (err_div, msg, status) => {
    err_div.innerHTML = msg;
    err_div.classList.add("err_msg");
    err_div.classList.add("pulse");
    setTimeout(() => {
      err_div.classList.remove("pulse");
    }, 2000);
  },
  // showErrorBorder: (...params) => {
  //   params.forEach(param => {
  //     if(param)
  //   })
  // }
};
sign_up_form.addEventListener("submit", onSubmit.signUpRequest);
sign_in_form.addEventListener("submit", onSubmit.signInRequest);
