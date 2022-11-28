import { getToken } from './utils/storage';
import { GET_PROFILE_LISTINGS } from './settings/api';

// const profileContainer = document.querySelector('#profile-container');
// console.log(profileContainer);
// const accessToken = getToken();
// const generalError = document.querySelector('#general-error');

// async function getProfileLisitings() {
//   const response = await fetch(GET_PROFILE_LISTINGS, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   if (response.ok) {
//     const jsonResponse = await response.json();
//     profileContainer.innerHTML = '';
//     const  listings  = jsonResponse;
//     if (!listings.length) {
//       generalError.innerHTML = 'No listings currently available';
//     } else {
//       const numberOfListings = listings.length;
//       console.log(numberOfListings);
//       for (let i = 0; i < numberOfListings; i++) {
//         profileContainer.innerHTML = `
//                 <a href="#" class="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//     <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${listings.media}" alt="">
//     <div class="flex flex-col justify-between p-4 leading-normal">
//         <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-orange-300">${listings.title}</h5>
//         <p class="mb-3 font-normal text-gray-700 dark:text-orange-200">${listings.description}</p>
//     </div>
// </a>
//                 `;
//       }
//     }
//   } else {
//     generalError.innerHTML = await response.json();
//   }
// }
// getProfileLisitings().then(()=> {

// });

// import { GET_LISTINGS_BY_ID_SELLER_URL } from './settings/api';
// import { getToken } from './utils/storage';
const listingContainer = document.querySelector('#profile-container');
console.log(listingContainer);
const generalError = document.querySelector('#general-error');
console.log(generalError);
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
          const listingTags = post.tags;

          return `
          <div class="container flex flex-wrap justify-between items-center mx-auto m-auto w-4/6"> <a href="/single-listing.html?listings_id=${post.id}" class="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${listingMedia}" alt="">
          <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-orange-300">${listingTitle}</h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-orange-200">${listingDescription}</p>
              <p class="mb-3 font-normal text-gray-700 dark:text-orange-200">${listingTags}</p>
          </div>
            </a>
            <div class="flex gap-4">
            <button
                data-id=""
                type="button"
                class="delete-post-btn inline-flex items-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium leading-4 text-red-700 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    Delete
                </button>
                
                <a href="/edit-post.html?post_id=" class="inline-flex items-center rounded-md border border-transparent bg-purple-100 px-3 py-2 text-sm font-medium leading-4 text-purple-700 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    Edit
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
