import axios from "axios";

const API_KEY = "5ab3022368e5324727d70673bd4175d9";
const BASE_URL = "https://api.themoviedb.org/3/";

const API = {
  getSortMovies: (url) => {
    const response = axios(BASE_URL + url, {
      params: {
        api_key: API_KEY,
      },
    });
    return response;
  },
};
export default API;
