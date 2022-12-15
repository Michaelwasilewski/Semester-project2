import { getToken, updateLocalStorrage } from './utils/storage';
import { GET_PROFILE, CHANGE_AVATAR_URL, PROFILE_AVATAR_URL } from './settings/api';
import { isValidUrl } from './utils/validation';

const profileInfo = document.querySelector('#profile-info');
const accessToken = getToken();
const changeAvatarForm = document.querySelector('#changeAvatarForm');
const avatarInput = document.querySelector('#avatarInput');
const generalErrorMessage = document.querySelector('#generalErrorMessage');

changeAvatarForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let isAvatarValid = false;
  isAvatarValid = isValidUrl(avatarInput.value);
  if (isAvatarValid) {
    avatarErrorMessage.classList.add('hidden');
    isAvatarValid = true;
  } else {
    avatarErrorMessage.classList.remove('hidden');
  }
  if (isAvatarValid) {
    const avatarData = {
      avatar: avatarInput.value,
    };
    (async function changeAvatar() {
      const response = await fetch(CHANGE_AVATAR_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(avatarData),
      });
      if (response.ok) {
        updateLocalStorrage(PROFILE_AVATAR_URL);
      } else {
        const error = await response.json();
        const errorMessage = error.errors[0].message;
        throw new Error(errorMessage);
      }
    })().catch((errorMessage) => {
      generalErrorMessage.innerHTML = `${errorMessage}`;
    });
  }
});

async function getProfile() {
  const response = await fetch(GET_PROFILE, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('Get profile respone: ', response);
  const profile = await response.json();
  const name = profile.name;
  const email = profile.email;
  const avatar = profile.avatar;
  const credits = profile.credits;

  profileInfo.innerHTML = `
    <div class="flex justify-end px-4 pt-4"></div>
          <div class="flex flex-col items-center pb-10">
            <h1 class="mb-1 text-xl font-medium  dark:text-orange-300">Username: ${name}</h1>
            <div class="overflow-hidden relative w-24 h-24 bg-gray-100 rounded-full dark:bg-gray-600">
              <img
                class="relative h-24 w-24 rounded-full"
                src="${avatar}"
                alt="Profile picture"
              />
            </div>
            <span class="text-sm text-gray-500 dark:text-orange-200">Auction seller</span>
            <span class="text-sm text-gray-500 dark:text-orange-200">Credits: ${credits} </span>
            <span class="text-sm text-gray-500 dark:text-orange-200">Email: ${email} </span>
            <button type="button" id="changeAvatarBtn" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray bg-orange-300 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-orange-300 dark:bg-orange-400 dark:hover:bg-orange-200 dark:focus:ring-orange-300">Change Avatar</button>
          </div>
        </div>
    `;
}

getProfile().then(() => {
  const changeAvatarBtn = document.querySelector('#changeAvatarBtn');
  const stopEditBtn = document.querySelector('#stopEditBtn');
  changeAvatarBtn.addEventListener('click', () => {
    changeAvatarForm.classList.remove('hidden');
    profileInfo.classList.add('blur-sm');
  });
  stopEditBtn.addEventListener('click', () => {
    changeAvatarForm.classList.add('hidden');
    profileInfo.classList.remove('blur-sm');
  });
});
