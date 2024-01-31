import axios from 'axios';
const apiKey = 'live_556TudEIJBFgsqTuCVfjOaeOsgZACB4js0ApoXEMzPpFPhkS8cTU590CVvPnZKVX';
const apiBaseURL = 'https://api.thecatapi.com/v1';
const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'x-api-key': apiKey,
  },
});
export function fetchBreeds() {
  return axiosInstance.get('/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  return axiosInstance.get(`/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}

