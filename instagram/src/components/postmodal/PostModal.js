import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, CardMedia, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
import { getCookies } from '../../shared/Cookies'; 

import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {

    const [postImg, SetImg] = useState("img/default_img.jpeg");
    const [postContent, SetContent] = useState("");
    const ImgRef = useRef();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const token = getCookies("accessToken");
        console.log(token);
    const SaveData = (e) => {
        return e.target.name === "img" ? SetImg(URL.createObjectURL(e.target.files[0])) : SetContent(e.target.value);
    }


    const PostData = () => {
        const formData = new FormData();
        formData.append('imgFile', ImgRef.current.files[0] === "undefined" ? "img / default_img.jpeg" : ImgRef.current.files[0]);
        formData.append('content', postContent);
        formData.append('title', "test");

        axios.post("http://3.38.212.192/api/posts", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            console.log("아몰랑");
        })
    }

    return (
        <div>

            <IconButton sx={{ backgroundColor: "gray" }} onClick={handleOpen}>
                <AddIcon sx={{ color: "white" }} />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ position: 'relative' }} >
                    <Typography style={{ textAlign: "center", borderBottom: "1px solid" }} id="modal-modal-title" variant="h6" component="h2">
                        게시물 만들기
                    </Typography>
                    <Button style={{ position: 'absolute', top: "3%", right: "4%" }} variant="text" onClick={PostData}>게시하기</Button>
                    <div style={{ height: "100%", display: "flex", justifyContent: "space-center", alignItems: "center" }}>
                        <div style={{ padding: '0 20px', width: "450px" }}>
                            <CardMedia
                                component="img"
                                height="350"

                                image={postImg}
                                alt="green iguana"
                            />
                            <Button sx={{ backgroundColor: '#8E2DE2' }} fullWidth variant="contained" component="label">
                                사진 추가
                                <input hidden accept="image/*" ref={ImgRef} multiple type="file" name="img" onChange={SaveData} />
                            </Button>
                        </div>
                        <div style={{ width: '40%' }}>
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                label="소개글"
                                multiline
                                rows={15}
                                placeholder="문구 입력"
                                sx={{ height: "400" }}
                                onChange={SaveData}
                            />
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}