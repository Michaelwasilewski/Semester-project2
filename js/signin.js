import { USER_LOGIN_URL } from "./settings/api";
import { validateEmail } from "./utils/validation";
import { saveUser, saveToken } from "./utils/storage";
const logInForm = document.querySelector("#login-form");
console.log(logInForm);
const formInputs = document.querySelector("#form-inputs");
console.log(formInputs);
const email = document.querySelector("#email-address");
console.log(email);
const emailError = document.querySelector('#emailError');
console.log(emailError);
const emailErrorNotValid = document.querySelector('#emailErrorValid');
console.log(emailErrorNotValid);
const password = document.querySelector('#password');
console.log(password);
const passwordError = document.querySelector('#passwordError');
console.log(passwordError);
const errorMessage = document.querySelector('#error-message');

if (logInForm){
    logInForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isEmail = false;
    if (email.value.trim().length > 0) {
      emailError.classList.add('hidden');
      isEmail = true;
    } else {
      emailError.classList.remove('hidden');
    }

    let isValidEmail = false;
    if (email.value.trim().length && validateEmail(email.value) === true) {
      emailErrorNotValid.classList.add('hidden');
      isValidEmail = true;
    } else if (
      email.value.trim().length &&
      validateEmail(email.value) !== true
    ) {
      emailErrorNotValid.classList.remove('hidden');
    }

    let isPassword = false;

    if (password.value.trim().length >= 8) {
      passwordError.classList.add('hidden');
      isPassword = true;
    } else {
      passwordError.classList.remove('hidden');
    }

    let isFormValid = isEmail && isValidEmail && isPassword;

    if (isFormValid) {
      const userData = {
        email: email.value,
        password: password.value,
      };

      const LOGIN_USER_URL_ENDPOINT = `${USER_LOGIN_URL}`;

      (async function logInUser() {
        const response = await fetch(LOGIN_USER_URL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const data = await response.json();
          saveToken(data.accessToken);
          const userToSave = {
            name: data.name,
            email: data.email,
          };
          saveUser(userToSave);
          location.href = '/home.html';
        } else {
          const err = await response.json();
          const message = `An Error occured: ${err.message}`;
          throw new Error(message);
        }
      })().catch((err) => {
        errorMessage.innerHTML = ` Sorry ${err.message}`;
      });
    } else {
      console.log('Validation Failed');
    }
  });

}
