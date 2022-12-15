const tokenKey = 'token';
const userKey = 'user';
const creditKey = 'credits';

function saveToken(token) {
  console.log('token: ', token);
  console.log('tokenKey: ', tokenKey);
  saveToStorage(tokenKey, token);
}

function getToken() {
  const value = localStorage.getItem(tokenKey);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
}


function saveUser(user) {
  saveToStorage(userKey, user);
}

const accessToken = getToken();

function updateLocalStorrage(url) {
  async function getUserData() {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const userToSave = {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        credits: data.credits,
      };
      saveUser(userToSave);
      location.reload();
    } else {
      console.log('There was an error');
    }
  }
  getUserData();
}

function getUserName() {
  const user = getFromStorage(userKey);
  if (userKey) {
    return user.name;
  } else {
    return null;
  }
}
function saveCredit(credits) {
  saveToStorage(creditKey, credits);
}
function getCreditAmount() {
  const availableCredit = getFromStorage(creditKey);
  if (availableCredit) {
    return availableCredit;
  } else {
    return null;
  }
}

function getUserAvatar() {
  const user = getFromStorage(userKey);
  if (userKey) {
    return user.avatar;
  } else {
    return null;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value); // convert to JS
  } else {
    return [];
  }
}

function clearStorage() {
  localStorage.clear();
}

export {
  getToken,
  saveToken,
  saveUser,
  updateLocalStorrage,
  getUserName,
  clearStorage,
  saveCredit,
  getCreditAmount,
  getUserAvatar,
};
