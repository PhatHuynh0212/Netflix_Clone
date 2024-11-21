import axios from "axios";
import { ENV_VAR } from "../config/envVar.js";

export const fetchTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ENV_VAR.TMDB_API_KEY}`,
    },
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB", response.statusText);
  }

  return response.data;
};
