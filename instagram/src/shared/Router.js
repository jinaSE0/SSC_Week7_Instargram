import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Main from "../pages/main";
import Login from "../pages/login";
import MyPage from "../pages/mypage";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/mypage/:username" element={<MyPage />} />

            </Routes>
        </BrowserRouter>
    );
};

export default Router;