import { getUserName } from '../utils/storage';

const userName = getUserName();
console.log('userName: ', userName);
const API_BASE_URL = 'https://api.noroff.dev/';
// AUTH
const USER_LOGIN_URL = API_BASE_URL + 'api/v1/auction/auth/login';
const USER_SIGNUP_URL = API_BASE_URL + 'api/v1/auction/auth/register';
export { API_BASE_URL, USER_LOGIN_URL, USER_SIGNUP_URL };
// https://api.noroff.dev/api/v1/social/auth/register
