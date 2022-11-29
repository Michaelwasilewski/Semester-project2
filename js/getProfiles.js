import { getToken } from './utils/storage';
import { GET_PROFILE } from './settings/api';

const profileInfo = document.querySelector('#profile-info');
console.log(profileInfo);
const accessToken = getToken();

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

            <div class="flex mt-4 space-x-3 md:mt-6">
              <a
                href="#"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-600 bg-orange-300 rounded-lg hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-orange-400 dark:bg-orange-500 dark:hover:bg-orange-400 dark:focus:ring-orange-400"
                >Edit avatar</a
              >
            </div>
          </div>
        </div>
    `;
}

getProfile();
