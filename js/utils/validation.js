function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
  return email.match(regEx) ? true : false;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
function validatePassword(password, confirmPassword) {
  console.log(password);
  console.log(confirmPassword);
  if (!password) {
    return false;
  }
  if (!confirmPassword) {
    return false;
  }
  if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
}
/**
 * Checking whether Image URL is an Image or not.
 * Inspiration and regex from https://bobbyhadz.com/blog/javascript-check-if-url-is-image
 * @param url Image URL
 * @return {boolean}
 */
function isImage(url) {
  const imgRegex = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
  if (typeof url === 'object') {
    return imgRegex.test(url.value);
  } else {
    return imgRegex.test(url);
  }
}

/**
 * General Error message for API Calls.
 * @param elem Hidden element
 * @param {string} [message] General Error message
 */
function showErrorMsg(elem, message = 'Something went wrong.. please try again later') {
  elem.classList.remove('hidden');
  elem.innerHTML = message;
  elem.scrollIntoView({ block: 'center' });
}

export { validateEmail, validatePassword, isImage, showErrorMsg, isValidUrl };
