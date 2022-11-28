import { GET_LISTINGS_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';
import { isImage, showErrorMsg } from './utils/validation';
import { addLoader, removeLoader } from './utils/loader';
const createListingForm = document.querySelector('#create-listing');
console.log(createListingForm);
const listingTitle = document.querySelector('#listing-title');
console.log(listingTitle);
const tags = document.querySelector('#tags');
console.log(tags);
const description = document.querySelector('#listing-description');
console.log(description);
const listingImg = document.querySelector('#listing-img');
console.log(listingImg);
const endsAt = document.querySelector('#ends-at');
console.log(endsAt);
const generalError = document.querySelector('#general-error');
console.log(generalError);
const accessToken = getToken();



async function createListing(url, listingData) {
  addLoader(createListingForm.querySelector('#create-listing-btn'));
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(listingData),
    };
    const response = await fetch(url, options);
    await response.json();

    if (response.ok) {
      location.href = '/home.html';
    } else {
      if (response.status === 400) {
        showErrorMsg(
          document.querySelector('#general-error'),
          'Image must a valid and a fully formed URL that links to a live and publicly accessible image'
        );
      } else {
        showErrorMsg(document.querySelector('#general-error'));
      }
    }
  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'));
  } finally {
    removeLoader();
  }
}

createListingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const listingData = {
      title: listingTitle.value,
      body: endsAt.value,
    };
  
    if (listingImg.value) {
      if (isImage(listingImg.value)) {
        listingData.media = listingImg.value;
        createListing(GET_LISTINGS_BY_ID_URL, listingData);
      } else {
        showErrorMsg(document.querySelector('#general-error'), 'Image URL is not valid');
      }
    } else {
      createListing(GET_LISTINGS_BY_ID_URL, listingData);
    }
  });
  
  listingImg.onkeyup = function () {
    document.querySelector('#general-error').classList.add('hidden');
  };
