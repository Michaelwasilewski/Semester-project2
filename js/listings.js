import { GET_LISTINGS_BY_ID_SELLER_URL, GET_LISTINGS_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';
const listingContainer = document.querySelector('#listings-container');
const generalError = document.querySelector('#general-error');
const accessToken = getToken();
const searchBar = document.querySelector('#search-posts');

let GET_POSTS_URL = `${GET_LISTINGS_BY_ID_URL}?sort=created&sortOrder=desc&_bids=true`;

let data = [];
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPosts = data.filter((listings) => {
    return listings.title.toLowerCase().includes(searchString);
  });
  displayPosts(filteredPosts);
});

async function getListings() {
  const response = await fetch(GET_LISTINGS_BY_ID_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    data = await response.json();
    displayPosts(data);
  } else {
    const err = await response.json();
    const message = ` ${err.errors[0].message}`;
    generalError.classList.remove('hidden');
    generalError.innerHTML = message;
  }
}
const displayPosts = (data) => {
  listingContainer.innerHTML = '';
  if (!data.length) {
    generalError.classList.remove('hidden');
  } else {
    const listOfPosts = data
      .map((post) => {
        const listingTitle = post.title;
        const listingDescription = post.description;
        const listingMedia = post.media[0];
        const listingEndsAt = post.endsAt;
        const listingTags = post.tags;
        return `
      <div class="  border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mt-10">
          <div class="w-full h-52 ">
            <img class="rounded-t-lg h-full w-full object-cover" src="${listingMedia}" alt="" />
          </div>
          <div class="p-4">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight  text-orange-300">${listingTitle}</h5>
            </a>
            <p class="mb-3 font-normal  text-gray-400">${listingDescription}</p>
            <span
              class=" mb-3 text-yellow-800 text-xs font-xs mr-2 px-2.5 py-0.5 rounded bg-orange-300 ">${listingTags}</span>
            <a href="/single-listing.html?listings_id=${post.id}"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray bg-orange-300 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-orange-300 dark:bg-orange-400 dark:hover:bg-orange-200 dark:focus:ring-orange-300">
              View Listing
              <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      `;
      })
      .join('');
    listingContainer.insertAdjacentHTML('beforeend', listOfPosts);
  }
};
getListings().then(() => {
  displayPosts(data);
});
