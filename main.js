import './style.css';
import { clearStorage, getToken } from './js/utils/storage';
import { GET_LISTINGS_BY_ID_URL } from './js/settings/api';
import { list } from 'postcss';
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

const listingContainer = document.querySelector('#listings-container');
console.log(listingContainer);
const generalError = document.querySelector('#general-error');
console.log(generalError);
const accessToken = getToken();

(async function getAllListings() {
  const response = await fetch(GET_LISTINGS_BY_ID_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('Get all posts response: ', response);
  if (response.ok) {
    const listings = await response.json();
    console.log(listings);
    console.log('Get listings succeeded');
    console.log('posts: ', listings);
    if (!listings.length) {
      generalError.innerHTML = 'Sorry, there are currently no listings';
    } else {
      const listOfHtmlPosts = listings
        .map((post) => {
          console.log('listings ', post);
          const listingTitle = post.title;
          const listingDescription = post.description;
          const listingMedia = post.media[0];
          const listingEndsAt = post.endsAt;
          const listingTags = post.tags;

          return `
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="/single-post.html?post_id=${post.id}">
                <img class="rounded-t-lg" src="${listingMedia}" alt="" />
              </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${listingTitle}</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${listingDescription}</p>
              <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">${listingTags}</span>
              <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
  <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
  Listing ends ${listingEndsAt}
</span>
              <a href="/single-post.html?post_id=${post.id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
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
  console.log('Get listing failed ! ');
  console.log(err);
  generalError.innerHTML = err;
});
