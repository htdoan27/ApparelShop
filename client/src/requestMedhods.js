import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;

const currentUser = user && JSON.parse(user).currentUser;

const TOKEN = currentUser?.accessToken;
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDllOWM1YWUyYTk3NDQ5NmViMTMyZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5Nzk4NzMwMiwiZXhwIjoxNjk4MjQ2NTAyfQ.wV4Lg1c5OPZODL6NrXuwMkAEwU4RIhkeuCLayONDimQ";



export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
  // headers: {
  //   Authorization: `Bearer ${TOKEN}`, // Set the Authorization header properly
  // },
});

console.log("token: " + TOKEN)
