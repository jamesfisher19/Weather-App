import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_KEY,
});

export const getCityImage = async (city) => {
  try {
    const response = await unsplash.search.getPhotos({
      query: city,
      perPage: 1,
      orientation: 'landscape',
    });

    if (response.response && response.response.results.length > 0) {
      return response.response.results[0].urls.regular;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching city image:', error);
    return null;
  }
};
