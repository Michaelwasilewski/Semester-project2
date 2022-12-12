import { getToken, updateLocalStorrage } from './utils/storage';
import { GET_PROFILE, CHANGE_AVATAR_URL, PROFILE_AVATAR_URL } from './settings/api';
import { isValidUrl } from './utils/validation';

const profileInfo = document.querySelector('#profile-info');
console.log(profileInfo);
const accessToken = getToken();
const changeAvatarForm = document.querySelector('#changeAvatarForm');
console.log(changeAvatarForm);
const avatarInput = document.querySelector('#avatarInput');
const deletePopup = document.querySelector('#deletePopup');
const deleteBtn = document.querySelector('#deleteBtn');
const generalErrorMessage = document.querySelector('#generalErrorMessage');

changeAvatarForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let isAvatarValid = false;
  isAvatarValid = isValidUrl(avatarInput.value);
  if (isAvatarValid) {
    avatarErrorMessage.classList.add('hidden');
    isAvatarValid = true;
  } else {
    avatarErrorMessage.classList.remove('hidden');
  }
  if (isAvatarValid) {
    const avatarData = {
      avatar: avatarInput.value,
    };
    (async function changeAvatar() {
      const response = await fetch(CHANGE_AVATAR_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(avatarData),
      });
      if (response.ok) {
        updateLocalStorrage(PROFILE_AVATAR_URL);
      } else {
        const error = await response.json();
        const errorMessage = error.errors[0].message;
        throw new Error(errorMessage);
      }
    })().catch((errorMessage) => {
      generalErrorMessage.innerHTML = `${errorMessage}`;
    });
  }
});

async function getProfile() {
  const response = await fetch(GET_PROFILE, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('Get profile respone: ', response);
  const profile = await response.json();
  const name = profile.name;
  const email = profile.email;
  const avatar = profile.avatar;
  const credits = profile.credits;

  profileInfo.innerHTML = `
    <div class="flex justify-end px-4 pt-4"></div>
          <div class="flex flex-col items-center pb-10">
            <h1 class="mb-1 text-xl font-medium  dark:text-orange-300">Username: ${name}</h1>
            <div class="overflow-hidden relative w-24 h-24 bg-gray-100 rounded-full dark:bg-gray-600">
              <img
                class="relative h-24 w-24 rounded-full"
                src="${avatar}"
                alt="Profile picture"
              />
            </div>
            <span class="text-sm text-gray-500 dark:text-orange-200">Auction seller</span>
            <span class="text-sm text-gray-500 dark:text-orange-200">Credits: ${credits} </span>
            <span class="text-sm text-gray-500 dark:text-orange-200">Email: ${email} </span>
            <button type="button" id="changeAvatarBtn" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray bg-orange-300 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-orange-300 dark:bg-orange-400 dark:hover:bg-orange-200 dark:focus:ring-orange-300">Change Avatar</button>
          </div>
        </div>
    `;
}

getProfile().then(() => {
  const changeAvatarBtn = document.querySelector('#changeAvatarBtn');
  const stopEditBtn = document.querySelector('#stopEditBtn');
  changeAvatarBtn.addEventListener('click', () => {
    changeAvatarForm.classList.remove('hidden');
    profileInfo.classList.add('blur-sm');
  });
  stopEditBtn.addEventListener('click', () => {
    changeAvatarForm.classList.add('hidden');
    profileInfo.classList.remove('blur-sm');
  });
});

// const deletePostBtn = document.getElementsByClassName('delete-post-btn');

//   const deletePostErrorMessage = document.querySelector('#deletePostErrorMessage');

//   const editTitle = document.querySelector('#editTitle');
//   const editTitleErrorMessage = document.querySelector('#editTitleErrorMessage');

//   const editDescription = document.querySelector('#editDescription');

//   const editTags = document.querySelector('#editTags');

//   const editImage = document.querySelector('#editImage');
//   const editImage2 = document.querySelector('#editImage2');
//   const editImage3 = document.querySelector('#editImage3');
//   const editImageErrorMessage = document.querySelector('#editImageErrorMessage');
//   const editImage2ErrorMessage = document.querySelector('#editImage2ErrorMessage');
//   const editImage3ErrorMessage = document.querySelector('#editImage3ErrorMessage');

//   const editListingErrorMessage = document.querySelector('#editListingErrorMessage');

//   for (let i = 0; i < deletePostBtn.length; i++) {
//     deletePostBtn[i].addEventListener('click', () => {
//       const deletePostID = deletePostBtn[i].dataset.id;
//       deletePopup.classList.remove('hidden');
//       profileContainer.classList.add('blur-sm');
//       deleteBtn.addEventListener('click', () => {
//         (async function deletePost() {
//           const response = await fetch(`${GET_POSTS_API_URL}/${deletePostID}`, {
//             method: 'DELETE',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
//           if (response.ok) {
//             location.reload();
//           } else {
//             const error = await response.json();
//             const errorMessage = `${error.errors[0].message}`;
//             throw new Error(errorMessage);
//           }
//         })().catch((errorMessage) => {
//           deletePostErrorMessage.innerHTML = `${errorMessage}`;
//         });
//       });
//     });
//   }

//   for (let i = 0; i < editPostBtns.length; i++) {
//     editPostBtns[i].addEventListener('click', () => {
//       const editPostID = editPostBtns[i].dataset.id;
//       editPostForm.classList.remove('hidden');
//       profileContainer.classList.add('blur-sm');
//       editPostForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         let isImageValid = false;
//         isImageValid = isValidUrl(editImage.value) || editImage.value === '';
//         if (isImageValid) {
//           editImageErrorMessage.classList.add('hidden');
//           isImageValid = true;
//         } else {
//           editImageErrorMessage.classList.remove('hidden');
//         }
//         let isImage2Valid = false;
//         isImage2Valid = isValidUrl(editImage2.value) || editImage2.value === '';
//         if (isImage2Valid) {
//           editImage2ErrorMessage.classList.add('hidden');
//           isImage2Valid = true;
//         } else {
//           editImage2ErrorMessage.classList.remove('hidden');
//         }
//         let isImage3Valid = false;
//         isImage3Valid = isValidUrl(editImage3.value) || editImage3.value === '';
//         if (isImage3Valid) {
//           editImage3ErrorMessage.classList.add('hidden');
//           isImage3Valid = true;
//         } else {
//           editImage3ErrorMessage.classList.remove('hidden');
//         }
//         let isTitle = false;
//         if (editTitle.value.trim().length > 0) {
//           editTitleErrorMessage.classList.add('hidden');
//           isTitle = true;
//         } else {
//           editTitleErrorMessage.classList.remove('hidden');
//         }
//         let isEditFormValid = isImageValid && isTitle;
//         if (isEditFormValid) {
//           let tagsString = new String(editTags.value);
//           let tagsArray = tagsString.split(' ');
//           let editPostMedia = [];
//           for (let i = 0; i < editPostMediaInputs.length; i++) {
//             if (editPostMediaInputs[i].value) {
//               editPostMedia.push(editPostMediaInputs[i].value);
//             }
//           }
//           let editPostData = {
//             title: editTitle.value,
//             description: editDescription.value,
//             tags: tagsArray,
//             media: editPostMedia,
//           };
//           (async function editPost() {
//             const response = await fetch(`${GET_POSTS_API_URL}/${editPostID}`, {
//               method: 'PUT',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${accessToken}`,
//               },
//               body: JSON.stringify(editPostData),
//             });
//             if (response.ok) {
//               location.href = `/details.html?post_id=${editPostID}`;
//             } else {
//               const error = await response.json();
//               const errorMessage = `${error.errors[0].message}`;
//               throw new Error(errorMessage);
//             }
//           })().catch((errorMessage) => {
//             editListingErrorMessage.innerHTML = `${errorMessage}`;
//           });
//         } else {
//           editListingErrorMessage.innerHTML = 'An error accured. Pleace try again';
//         }
//       });
//     });
//   }
