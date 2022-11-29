import { GET_LISTINGS_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const listingId = searchParam.get('listings_id');
const accessToken = getToken();
const listingDetails = document.querySelector('#listing-container');

async function getListingsById() {
  const response = await fetch(`${GET_LISTINGS_BY_ID_URL}/${listingId}/?_bids=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!accessToken) {
    location.href = '/index.html';
  }
  const data = await response.json();
  const title = data.title;
  const description = data.description;
  const media = data.media[0];
  const tags = data.tags;
  const created = data.created;
  const endsAt = data.endsAt;
  const bids = data._count.bids;

  listingDetails.innerHTML = `
    <a href="#" class="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${media}" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-orange-300">${title}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-orange-200"><span>Title:${description}</span></p> 
        <p class="mb-3 font-normal text-gray-700 dark:text-orange-200"><span>Tags:${tags}</span></p>
        <p class="mb-3 font-normal text-gray-700 dark:text-orange-300"><span>Created: ${created}</span></p>
        <p class="mb-3 font-normal text-gray-700 dark:text-orange-300"><span>Ends: ${endsAt} </span></p>
        <p class="mb-3 font-normal text-gray-700 dark:text-orange-300"><span>Current Bids: ${bids} </span></p>
    </div>
</a>
    `;
}

getListingsById();

const listingBidInput = document.querySelector('#listing-bid-input');
const biddingForm = document.querySelector('#bidding-form');

biddingForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('listingBidInput', listingBidInput.value);

  const amountToBid = {
    amount: parseInt(listingBidInput.value),
  };
  

  async function bidOnList() {
    const response = await fetch(`${GET_LISTINGS_BY_ID_URL}/${listingId}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(amountToBid),
    });
    console.log('bid on list response: ', response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log('Bid on a list SUCCEEDED!!  🥳 🤗🤗');
    } else {
      const err = await response.json();
      console.log(err);
      console.log('CREATE LIST FAILED');
    }
    biddingForm.reset();
  }

  bidOnList();
});
