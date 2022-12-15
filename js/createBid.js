import { GET_LISTINGS_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';
const createListingForm = document.querySelector('#create-listing');
const listingTitle = document.querySelector('#listing-title');
const tagOne = document.querySelector('#listingTagOne');
const tagTwo = document.querySelector('#listingTagTwo');
const tagThree = document.querySelector('#listingTagThree');

const description = document.querySelector('#listing-description');

const listingImgOne = document.querySelector('#listing-img-one');
const listingImgTwo = document.querySelector('#listing-img-two');
const listingImgThree = document.querySelector('#listing-img-three');

const endsAt = document.querySelector('#ends-at');
const accessToken = getToken();

createListingForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!accessToken) {
    location.href = '/index.html';
  }

  const listingTags = [tagOne.value, tagTwo.value, tagThree.value];
  const listingImages = [listingImgOne.value, listingImgTwo.value, listingImgThree.value];

  const listingData = {
    title: listingTitle.value.trim(),
    description: description.value.trim(),
    tags: listingTags,
    media: listingImages.length > 0 ? listingImages : null,
    endsAt: endsAt.value,
  };

  async function createListing() {
    const response = await fetch(GET_LISTINGS_BY_ID_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(listingData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const err = await response.json();
      console.log(err);
    }
    createListingForm.reset();
  }

  createListing();
});
