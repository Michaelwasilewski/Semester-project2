import { GET_LISTINGS_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';
import { splitIntoArray } from './utils/countdown';

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const listingId = searchParam.get('listings_id');
const accessToken = getToken();
const listingDetails = document.querySelector('#listing-container');
const countDownContainer = document.querySelector('#countDown');

const biddingData = document.querySelector('#biddingData');
const noBidsMsg = document.querySelector('#no-bids');

if (!accessToken) {
  location.href = '/index.html';
}

const SINGLE_POST_API_URL = `${GET_LISTINGS_BY_ID_URL}/${listingId}?_bids=true&_seller=true`;

async function getListingsById() {
  const response = await fetch(SINGLE_POST_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  const title = data.title;
  const description = data.description;
  const tags = data.tags;
  const created = data.created;
  const bids = data._count.bids;
  const listingAuthor = data.seller.name;
  let postImages = data.media;
  const media = data.media;

  function displayTags() {
    let listOfTags = ``;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i]) {
        listOfTags += `${tags[i]} `;
      }
    }
    return listOfTags;
  }
  const endsAt = new Date(data.endsAt);
  console.log(endsAt);
  const countDown = new Date(`${endsAt}`).getTime();
  console.log(countDown);
  let now = new Date().getTime();
  console.log(now);
  let timeleft = countDown - now;
  let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const daysSplit = splitIntoArray(days);
  const hoursSplit = splitIntoArray(hours);
  const minutesSplit = splitIntoArray(minutes);
  let listingBids = data.bids;
  console.log(listingBids);
  listingBids.sort(function (x, y) {
    return y.amount - x.amount;
  });

  let standingBid = 0;
  if (listingBids[0]) {
    standingBid = listingBids[0].amount;
  }
  let biddingValue = standingBid + 1;

  function displayHighestBidder() {
    let highestBid = ``;
    if (listingBids[0]) {
      const standingBid = listingBids[0].amount;
      const standingBidName = listingBids[0].bidderName;
      const standingBidCreatedDateTime = new Date(listingBids[0].created);
      const standingBidCreated = standingBidCreatedDateTime.toLocaleTimeString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      noBidsMsg.classList.add('hidden');
      highestBid = `
        <div class="flex justify-between border-b border-b-stone-700 py-2">
        <div class="flex gap-3">
          <p class="text-stone-400">${standingBidCreated}</p>
          <p>${standingBidName}</p>
        </div>
        <p class="text-green-400">${standingBid} c</p>
      </div>
        `;
    } else {
      noBidsMsg.classList.remove('hidden');
    }
    return highestBid;
  }
  function displayBiddingHistory() {
    let listOfBiddings = ``;
    for (let i = 1; i < listingBids.length; i++) {
      if (listingBids[i]) {
        const bidName = listingBids[i].bidderName;
        const bidAmount = listingBids[i].amount;
        const bidCreatedDateTime = new Date(listingBids[i].created);
        const bidCreated = bidCreatedDateTime.toLocaleTimeString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        noBidsMsg.classList.add('hidden');
        listOfBiddings += `
          <div class="flex justify-between border-b border-b-stone-700 py-2">
          <div class="flex gap-3">
            <p class="text-stone-400">${bidCreated}</p>
            <p class="text-stone-200">${bidName}</p>
          </div>
          <p class="text-stone-200">${bidAmount} c</p>
        </div>`;
      } else {
        noBidsMsg.classList.remove('hidden');
      }
    }
    return listOfBiddings;
  }
  listingDetails.innerHTML = `
  <div class=" bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
  <div>
    <img class="rounded-t-lg h-full w-full object-cover" src="${media}" alt="" />
  </div>
  <div class="p-4">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-orange-300">${title}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${description}</p>
    <span
      class="bg-yellow-100 mb-3 text-yellow-800 text-xs font-xs mr-2 px-2.5 py-0.5 rounded dark:bg-orange-300 dark:text-yellow-900">Tags: ${displayTags()}</span>
  </div>
</div>
  <p class="mt-8 mb-4 text-xl lg:w-72 lg:mx-aut text-orange-300">Auction ends in:</p>
    <div class="flex mx-auto gap-5 text-stone-400 items-center" id="countDown">
      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md text-orange-300">${daysSplit[0]}</p>
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md text-orange-300">${daysSplit[1]}</p>
        </div>
        <p>Days</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md text-orange-300">${hoursSplit[0]}</p>
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md text-orange-300">${hoursSplit[1]}</p>
        </div>
        <p>Hours</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md text-orange-300">${minutesSplit[0]}</p>
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md text-orange-300">${minutesSplit[1]}</p>
        </div>
        <p>Minutes</p>
      </div>
    </div>
  </div>
    `;
  biddingData.innerHTML = ` ${displayHighestBidder()} ${displayBiddingHistory()}`;
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
