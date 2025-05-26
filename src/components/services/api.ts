import axios from "axios";
import { Image } from "../../types/Image";

interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
}

export const fetchImages = async (
  query: string = "",
  page: number = 1,
  signal?: AbortSignal
): Promise<FetchImagesResponse> => {
  try {
    const response = await axios.get<FetchImagesResponse>(
      "https://api.unsplash.com/search/photos",
      {
        headers: {
          Authorization:
            "Client-ID dWRzBwMR3kUdoKW5W6JIH-y6SM2MBFQwKgg6hzCv5vU",
        },
        params: { query: query, page: page, per_page: 12 },
        signal,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
