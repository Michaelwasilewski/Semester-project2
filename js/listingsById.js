import { GET_LISTINGS_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const listingId = searchParam.get('listings_id');
const accessToken = getToken();
const listingDetails = document.querySelector('#listing-container');

async function getListingsById() {
  const response = await fetch(`${GET_LISTINGS_BY_ID_URL}/${listingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  const title = data.title;
  const description = data.description;
  const media = data.media[0];
  const tags = data.tags;
  const created = data.created;
  const endsAt = data.endsAt;

  listingDetails.innerHTML = `
    <a href="#" class="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${media}" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${description}</p>
    </div>
</a>
    `;
}

getListingsById();
