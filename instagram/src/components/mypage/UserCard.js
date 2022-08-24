import React from "react";
import { Box } from "@mui/system";
import { Typography, Card, CardMedia, CardContent, Button, Grid, Container } from "@mui/material";
import ProfileModal from "./ProfileModal";

const UserCard = () => {
    return (
        <>
            <Card sx={{ width: '500px', height: '200px', margin: 'auto', marginTop: '50px', display: 'flex', alignItems: 'center', padding: '20px', bgcolor: 'background.paper' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151, height: 151, borderRadius: '100%' }}
                    image="https://source.unsplash.com/random"
                    onError='img/default_img.jpeg'
                    alt="test"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <div sx={{ display: 'flex' }}>
                        <Typography component="span" variant="h5">
                            UserId
                        </Typography>
                        <ProfileModal />
                    </div>
                    <Box sx={{ backgroundColor: 'orange', display: 'flex', justifyContent: 'space-evenly' }}>
                        <Box>게시물 수 124</Box>
                        <Box>팔로워 7890</Box>
                        <Box>팔로우 1212</Box>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Introduce
                    </Typography>
                </CardContent>
            </Card>


        </>
    );
}
export default UserCard;