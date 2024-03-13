import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
const TOKEN = JSON?.parse(JSON?.parse(localStorage.getItem("persist:root"))?.user).currentUser.accessToken;


 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDExYTc1ZmQwMzYxNjgzNGNlZjcyNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5OTYyMjM4OSwiZXhwIjoxNjk5ODgxNTg5fQ.X1WfDxko1iRaqMJGea2FwsUaFDKlBmIB32oWr9AZE-c"


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
