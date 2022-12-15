import { getToken } from './utils/storage';
import { GET_PROFILE_LISTINGS, GET_LISTINGS_BY_ID_URL } from './settings/api';

const listingContainer = document.querySelector('#profile-container');
const generalError = document.querySelector('#general-error');
const accessToken = getToken();

(async function getAllListings() {
  const response = await fetch(GET_PROFILE_LISTINGS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('Get all posts response: ', response);
  if (response.ok) {
    const listings = await response.json();
    if (!listings.length) {
      generalError.innerHTML = 'Sorry, there are currently no listings';
    } else {
      const listOfHtmlPosts = listings
        .map((post) => {
          const listingTitle = post.title;
          const listingDescription = post.description;
          const listingMedia = post.media[0];
          const listingTags = post.tags;

          return `
          <div class="border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-[90%]">
          <div>
            <img class="rounded-t-lg h-full w-full object-cover" src="${listingMedia}" alt="" />
          </div>
          <div class="p-4 bg-gray-800">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-orange-300">${listingTitle}</h5>
            </a>
            <p class="mb-3 font-normal text-orange-300">${listingDescription}</p>
            <span
              class=" mb-3 text-yellow-800 text-xs font-xs mr-2 px-2.5 py-0.5 rounded bg-orange-300">Tags: ${listingTags}</span>
          </div>
          <div class="flex gap-4 justify-center">
      </div>
        </div>
           
      </div>
         
        `;
        })
        .join('');
      listingContainer.insertAdjacentHTML('beforeend', listOfHtmlPosts);
    }
  } else {
    const err = await response.json();
    const message = `Sorry error occured ${err}`;
    throw new Error(message);
  }
})().catch((err) => {
  console.log(err);
  generalError.innerHTML = err;
});
