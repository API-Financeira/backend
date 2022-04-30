import axios from "axios";

export const hotmart = axios.create({
  baseURL: process.env.HOTMART_API_BASEURL as string,
});
