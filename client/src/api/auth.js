import axios from 'axios';

export const signinRequest = (user) =>
  axios.post('http://localhost:3000/auth/signin', user);
