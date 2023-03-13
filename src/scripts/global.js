import { getUser } from './index.js'

const user = getUser() || {};
// const { token } = user;

export const globals = {
    baseUrl: "http://localhost:6278/",
    requestHeaders:  {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    red: "#C20803",
    green: "#08C203",
    //token: getUser().token
  };