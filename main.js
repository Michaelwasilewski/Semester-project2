import './style.css';
import { clearStorage } from './js/utils/storage';
const logOutBtn = document.querySelector('#log-out');
if (logOutBtn) {
  logOutBtn.addEventListener('click', function () {
    console.log('I am clicked');
    clearStorage();
    window.location.replace('/index.html');
  });
}

// const options = {method: 'GET'};

// fetch('https://api.noroff.dev/api/v1/auction/listings', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

