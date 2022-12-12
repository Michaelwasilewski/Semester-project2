import { GET_LISTINGS_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';
import { isImage, showErrorMsg } from './utils/validation';
import { addLoader, removeLoader } from './utils/loader';
const createListingForm = document.querySelector('#create-listing');
console.log(createListingForm);
const listingTitle = document.querySelector('#listing-title');
console.log(listingTitle);
const tagOne = document.querySelector('#listingTagOne');
const tagTwo = document.querySelector('#listingTagTwo');
const tagThree = document.querySelector('#listingTagThree');
console.log(tagOne);
console.log(tagTwo);
console.log(tagThree);

const description = document.querySelector('#listing-description');
console.log(description);
const listingImgOne = document.querySelector('#listing-img-one');
const listingImgTwo = document.querySelector('#listing-img-two');
const listingImgThree = document.querySelector('#listing-img-three');
console.log(listingImgOne);
console.log(listingImgTwo);
console.log(listingImgThree);

const endsAt = document.querySelector('#ends-at');
console.log(endsAt);
const generalError = document.querySelector('#general-error');
console.log(generalError);
const accessToken = getToken();

createListingForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('i clicked the form BTN');
  console.log(listingTitle.value.trim());
  console.log(description.value.trim());

  console.log(tagOne.value.trim());
  console.log(tagTwo.value.trim());
  console.log(tagThree.value.trim());

  console.log(listingImgOne.value.trim());
  console.log(listingImgTwo.value.trim());
  console.log(listingImgThree.value.trim());
  if (!accessToken) {
    location.href = '/index.html';
  }
  console.log(endsAt.value);

  const listingTags = [tagOne.value, tagTwo.value, tagThree.value];
  const listingImages = [listingImgOne.value, listingImgTwo.value, listingImgThree.value];

  const listingData = {
    title: listingTitle.value.trim(),
    description: description.value.trim(),
    tags: listingTags,
    media: listingImages.length > 0 ? listingImages : null,
    endsAt: endsAt.value,
  };
  console.log('listingData: ', listingData);

  async function createListing() {
    const response = await fetch(GET_LISTINGS_BY_ID_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(listingData),
    });
    console.log('list creation response: ', response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log('CREATE LIST SUCCEEDED!!  🥳 🤗🤗');
    } else {
      const err = await response.json();
      console.log(err);
      console.log('Create listing failed');
    }
    createListingForm.reset();
  }

  createListing();
});

// async function createListing(url, listingData) {
//   addLoader(createListingForm.querySelector('#create-listing-btn'));
//   try {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(listingData),
//     };
//     const response = await fetch(url, options);
//     await response.json();

//     if (response.ok) {
//       location.href = '/home.html';
//     } else {
//       if (response.status === 400) {
//         showErrorMsg(
//           document.querySelector('#general-error'),
//           'Image must a valid and a fully formed URL that links to a live and publicly accessible image'
//         );
//       } else {
//         showErrorMsg(document.querySelector('#general-error'));
//       }
//     }
//   } catch (error) {
//     showErrorMsg(document.querySelector('#general-error'));
//   } finally {
//     removeLoader();
//   }
// }

// createListingForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   const listingData = {
//     title: listingTitle.value,
//     description: description.value,
//     endsAt: endsAt.value,
//   };

//   if (listingImg.value) {
//     if (isImage(listingImg.value)) {
//       listingData.media = [listingImg.value];
//       createListing(GET_LISTINGS_BY_ID_URL, listingData);
//     } else {
//       showErrorMsg(document.querySelector('#general-error'), 'Image URL is not valid');
//     }
//   } else {
//     createListing(GET_LISTINGS_BY_ID_URL, listingData);
//   }
// });

// listingImg.onkeyup = function () {
//   document.querySelector('#general-error').classList.add('hidden');
// };
