import { getUserName } from '../utils/storage';

const userName = getUserName();
console.log('userName: ', userName);
const API_BASE_URL = 'https://api.noroff.dev/';
// AUTH
const USER_LOGIN_URL = API_BASE_URL + 'api/v1/auction/auth/login';
const USER_SIGNUP_URL = API_BASE_URL + 'api/v1/auction/auth/register';
// LISTINGS
const GET_LISTINGS_BY_ID_SELLER_URL = API_BASE_URL + `api/v1/auction/listings?_seller=true&_bids=true`;
const GET_LISTINGS_BY_ID_URL = API_BASE_URL + `api/v1/auction/listings`;

// PROFILE
const GET_PROFILE = API_BASE_URL + `api/v1/auction/profiles/${userName}?_listings=true`;
const GET_PROFILE_LISTINGS = API_BASE_URL + `api/v1/auction/profiles/${userName}/listings`;
export {
  API_BASE_URL,
  USER_LOGIN_URL,
  USER_SIGNUP_URL,
  GET_LISTINGS_BY_ID_SELLER_URL,
  GET_LISTINGS_BY_ID_URL,
  GET_PROFILE,
  GET_PROFILE_LISTINGS,
};
// https://api.noroff.dev/api/v1/social/auth/register
