import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Typography, Card, CardMedia, CardContent, Button, Grid, Container } from "@mui/material";
import ProfileModal from "./ProfileModal";
import { useState, useRef } from "react";

import { useParams } from "react-router-dom";
import axios from 'axios';
import { getCookies } from "../../shared/Cookies";


const UserCard = ({ }) => {

    // const [data, setData] = useState({
    //     "userId": 0,
    //     "username": "",
    //     "profileUrl": null,
    //     "introduction": null,
    //     "folloewState": false,
    //     "postCnt": 0,
    //     "follower": 0,
    //     "following": 0,
    //     "postList": [],
    //     "likePostList": []
    // });

    // const ImgRef = useRef();

    // useEffect(() => {
    //     setData({ ...data, ...userInfo });

    // }, [userInfo])


    const param = useParams();
    const access_token = getCookies('accessToken');
    const [userInfo, setUserInfo] = useState({
        "userId": 0,
        "username": "",
        "profileUrl": null,
        "introduction": null,
        "folloewState": false,
        "postCnt": 0,
        "follower": 0,
        "following": 0,
        "postList": [],
        "likePostList": []
    });



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
            setUserInfo(response.data.data);
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            console.log("호출은 됐음");
        })
    }


    return (
        <>
            <Card sx={{ width: '500px', height: '200px', margin: 'auto', marginTop: '50px', display: 'flex', alignItems: 'center', padding: '20px', bgcolor: 'background.paper' }}>
                <CardMedia
                    // ref={ImgRef}
                    component="img"
                    sx={{ width: 151, height: 151, borderRadius: '100%' }}
                    image={userInfo.profileUrl === null ? 'https://source.unsplash.com/random' : userInfo.profileUrl}
                    // image="https://source.unsplash.com/random"
                    // onError={ImgRef.current.image = "https://source.unsplash.com/random"}
                    alt="test"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <div sx={{ display: 'flex' }}>
                        <Typography component="span" variant="h5">
                            {userInfo.username}
                        </Typography>
                        <ProfileModal userId={userInfo.userId} />
                    </div>
                    <Box sx={{ backgroundColor: 'orange', display: 'flex', justifyContent: 'space-evenly' }}>
                        <Box>게시물 수  {userInfo.postCnt}</Box>
                        <Box>팔로워  {userInfo.follower}</Box>
                        <Box>팔로우  {userInfo.following}</Box>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {userInfo.introduction}
                    </Typography>
                </CardContent>
            </Card>


        </>
    );
}
export default UserCard;