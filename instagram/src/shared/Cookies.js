import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookies = (name, value, option) => {
    return cookies.set(name, value, { ...option });
};

export const getCookies = (name) => {
    return cookies.get(name);
};

export const removeCookies = (name) => {
    return cookies.remove(name);
};

// 사용법
// setCookies(이름(key), 토큰, 옵션)
// getCookies(이름(key))