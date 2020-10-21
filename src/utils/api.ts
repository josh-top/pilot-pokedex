export const BASE_URL = 'https://pokeapi.co/api/v2';

export const getCachedResponse = (slug: string) => {
  const cachedResponse = localStorage.getItem(slug);

  if (cachedResponse !== null) {
    return JSON.parse(cachedResponse);
  }
  return null;
};

export const fetchAPI = (url: string) => {
  const cachedResponse = getCachedResponse(url);

  if (cachedResponse !== null) {
    return Promise.resolve(cachedResponse);
  }
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error('API error');
    })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem(url, JSON.stringify({ data }));
      return { data };
    })
    .catch((error) => {
      localStorage.setItem(url, JSON.stringify({ data: null }));
      throw error;
    });
};
