import React from "react";
import UserCard from "../../components/mypage/UserCard";
import PostList from "../../components/mypage/PostList";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { getCookies } from "../../shared/Cookies";
import { useEffect, useState } from "react";

const MyPage = (props) => {

    const param = useParams();
    const access_token = getCookies('accessToken');
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {

        userData();
    }, [])

    const userData = () => {
        axios.get(`http://13.125.71.197/api/detail/${param.username}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then((response) => {
            console.log(response);
            setUserInfo(response.dadta.data);

        }).catch((error) => {
            console.log(error);
        }).then(() => {
            console.log("호출은 됐음");
        })
    }
    return (
        <>
            <UserCard userInfo={userInfo} />
            <PostList />
        </>
    )
}

export default MyPage;