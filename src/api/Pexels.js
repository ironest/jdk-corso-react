const API_BASE_URL = "https://api.pexels.com/v1/search";
const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const API_PARAMS = {
  per_page: 1,
  orientation: "landscape",
};
const FALL_BACK_IMAGE =
  "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export const fetchPexelsImage = async (keyword) => {
  const params = Object.keys(API_PARAMS)
    .map((key) => `${key}=${API_PARAMS[key]}`)
    .join("&");
  try {
    const response = await fetch(`${API_BASE_URL}?${params}&query=${keyword}`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    return data?.photos?.[0]?.src?.medium
      ? data?.photos?.[0]?.src?.medium
      : FALL_BACK_IMAGE;
  } catch (error) {
    console.error(error);
  }
};
