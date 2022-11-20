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
