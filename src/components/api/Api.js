import axios from "axios";

export const Axios = axios.create({
    baseURL: "https://task-managent-api.onrender.com/api/",
    headers: {
      "Content-Type": "application/json",
    },
  });