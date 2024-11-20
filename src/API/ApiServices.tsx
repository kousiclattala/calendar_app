import {ApiFetch} from './ApiFetch';

const BASE_URL = `https://admin-lkdentalcare.onrender.com/api/v1`;

const SEARCH_URL = `${BASE_URL}/appointments/search?searchValue=`;

export const handleSearchCall = async (value: string) => {
  const url = `${SEARCH_URL}${value}`;

  const res = await ApiFetch.GET(url);

  return res;
};
