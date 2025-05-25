import axios from "axios";

export const fetchImages = async (query = "", page = 1, signal) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID dWRzBwMR3kUdoKW5W6JIH-y6SM2MBFQwKgg6hzCv5vU",
    },
    params: { query: query, page: page, per_page: 12 },
    signal,
  });
  return response.data;
};
