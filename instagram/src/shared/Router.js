import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Main from "../pages/main";
import Login from "../pages/login";
import MyPage from "../pages/mypage";
import { getCookies } from "./Cookies";
import { useNavigate, Navigate } from "react-router-dom";

const Router = () => {

    const [accessToken, setToken] = useState(getCookies('accessToken'));
    // const navigate = useNavigate();




    return (
        <BrowserRouter>
            <Header setToken={setToken} />
            <Routes>
                {/* <Route path="/" element={<Main />} /> */}
                {
                    accessToken === null ?
                        <Route path="/" element={<Navigate replace to='/login' />} /> :
                        <Route path="/" element={<Main />} />
                }

                <Route exact path="/login" element={<Login setToken={setToken} />} />
                <Route exact path="/mypage/:username" element={<MyPage />} />
                {/* <Route exact path="/mypage/" element={<MyPage />} /> */}

            </Routes>
        </BrowserRouter>
    );
};

export default Router;