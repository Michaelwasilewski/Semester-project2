import { GET_LISTINGS_BY_ID_SELLER_URL, GET_LISTINGS_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';
const listingContainer = document.querySelector('#listings-container');
console.log(listingContainer);
const generalError = document.querySelector('#general-error');
console.log(generalError);
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
        console.log('listings ', post);
        const listingTitle = post.title;
        const listingDescription = post.description;
        const listingMedia = post.media[0];
        const listingEndsAt = post.endsAt;
        const listingTags = post.tags;
        return `
      <div class=" bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mt-10">
          <div class="w-full h-52 ">
            <img class="rounded-t-lg h-full w-full object-cover" src="${listingMedia}" alt="" />
          </div>
          <div class="p-4">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-orange-300">${listingTitle}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${listingDescription}</p>
            <span
              class="bg-yellow-100 mb-3 text-yellow-800 text-xs font-xs mr-2 px-2.5 py-0.5 rounded dark:bg-orange-300 dark:text-yellow-900">${listingTags}</span>
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
// (async function getAllListings() {
//   const response = await fetch(GET_POSTS_URL, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   console.log('Get all posts response: ', response);
//   if (response.ok) {
//     const listings = await response.json();
//     console.log(listings);
//     console.log('Get listings succeeded');
//     console.log('posts: ', listings);
//     if (!listings.length) {
//       generalError.innerHTML = 'Sorry, there are currently no listings';
//     } else {
//       const listOfHtmlPosts = listings
//         .map((post) => {
//           console.log('listings ', post);
//           const listingTitle = post.title;
//           const listingDescription = post.description;
//           const listingMedia = post.media[0];
//           const listingEndsAt = post.endsAt;
//           const listingTags = post.tags;

//           return `
//           <div class=" bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mt-10">
//           <div class="w-full h-52 ">
//             <img class="rounded-t-lg h-full w-full object-cover" src="${listingMedia}" alt="" />
//           </div>
//           <div class="p-4">
//             <a href="#">
//               <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-orange-300">${listingTitle}</h5>
//             </a>
//             <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${listingDescription}</p>
//             <span
//               class="bg-yellow-100 mb-3 text-yellow-800 text-xs font-xs mr-2 px-2.5 py-0.5 rounded dark:bg-orange-300 dark:text-yellow-900">${listingTags}</span>
//             <a href="/single-listing.html?listings_id=${post.id}"
//               class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray bg-orange-300 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-orange-300 dark:bg-orange-400 dark:hover:bg-orange-200 dark:focus:ring-orange-300">
//               View Listing
//               <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg">
//                 <path fill-rule="evenodd"
//                   d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                   clip-rule="evenodd"></path>
//               </svg>
//             </a>
//             <span
//               class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
//               <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg">
//                 <path fill-rule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                   clip-rule="evenodd"></path>
//               </svg>
//               ${listingEndsAt}
//             </span>
//           </div>
//         </div>
//         `;
//         })
//         .join('');
//       listingContainer.insertAdjacentHTML('beforeend', listOfHtmlPosts);
//     }
//   } else {
//     const err = await response.json();
//     const message = `Sorry error occured ${err}`;
//     throw new Error(message);
//   }
// })().catch((err) => {
//   console.log('Get listing failed ! ');
//   console.log(err);
//   generalError.innerHTML = err;
// });
