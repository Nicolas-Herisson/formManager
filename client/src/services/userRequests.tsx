import httpRequester from './axios.config';

export async function fetchGetMe() {
  try {
    const response = await httpRequester.get('/users/me');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
