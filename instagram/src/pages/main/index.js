import React from "react";
import PostCard from "../../components/main/postcard/PostCard";
import { useState } from "react";
import axios from "axios"
import { getCookies } from "../../shared/Cookies";

import { useEffect } from "react";
const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const Main = (props) => {

    const [postList, setPostList] = useState([]);
    const access_token = getCookies('accessToken');

    const GetPostList = () => {
        axios.get("http://13.209.76.88/api/posts", {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then((response) => {
            console.log(response);
            setPostList(response.data.data);
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            console.log("호출은 됐음");
        })
    }

    useEffect(() => {
        GetPostList();
    }, []);


    return (
        <div style={{ margin: 'auto', paddingTop: '20px', paddingBottom: '50px', backgroundColor: "#dcdcdc", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            {postList.reverse().map((card, index) => {
                return <PostCard key={index} CardInfo={card} />
            })}
        </div>
    );
}

export default Main;