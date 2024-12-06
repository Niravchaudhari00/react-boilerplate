import { CookieOptions } from "../type/cookie-option";
import { getLength } from "./helperFunctions";

// local storage service
const setLocalStorage = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// session storage service
const removeLocalStorage = (key: string) => localStorage.removeItem(key);

const setSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
};

const getSessionStorage = (key: string) => {
  const value = sessionStorage.getItem(key);

  if (value) {
    let data = null;
    try {
      data = JSON.parse(value);
    } catch (e) {
      data = value;
    }
    return value;
  }
  return null;
};

const removeSessionStorage = (key: string) => sessionStorage.removeItem(key);

// cookie service
const setCookie = (key: string, value: any, option: CookieOptions) => {
  console.log("value: ", value);

  const { expires = 0, path } = option;

  let expiresString = "";

  let cookieString = key + "=" + value + ";";

  if (expires != 0) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 1000);
    expiresString = "expires=" + date.toUTCString();

    cookieString += expiresString + ";";
  }

  if (path) {
    cookieString += "path=" + path + ";";
  }

  document.cookie = cookieString;
};

const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < getLength(cookies); i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
};

const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setCookie,
  getCookie,
  deleteCookie,
};
