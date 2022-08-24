import React from "react";
import UserCard from "../../components/mypage/UserCard";
import PostList from "../../components/mypage/PostList";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { getCookies } from "../../shared/Cookies";
import { useEffect } from "react";
const MyPage = (props) => {

    const param = useParams();
    const access_token = getCookies('accessToken');

    console.log('asdfasfd', param);

    useEffect(() => {

        userData();
    }, [])

    const userData = () => {
        axios.get(`http://3.38.212.192/api/detail/${param.username}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);
        }).then(() => {
            console.log("호출은 됐음");
        })
    }
    return (
        <>
            <UserCard />
            <PostList />
        </>
    )
}

export default MyPage;