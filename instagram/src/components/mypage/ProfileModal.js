import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, CardMedia, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
import { getCookies } from '../../shared/Cookies';
import { useParams } from 'react-router-dom';
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

export default function ProfileModal({ userId }) {
    const param = useParams();

    const [postImg, SetImg] = useState("default_img.jpeg");
    const [postContent, SetContent] = useState("");
    const ImgRef = useRef();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const token = getCookies("accessToken");

    const SaveData = (e) => {
        return e.target.name === "img" ? SetImg(URL.createObjectURL(e.target.files[0])) : SetContent(e.target.value);
    }


    const PostData = () => {
        const formData = new FormData();
        console.log(ImgRef.current.files[0]);
        // formData.append('imgFile', ImgRef.current.files[0] === "undefined" ? "img/default_img.jpeg" : ImgRef.current.files[0]);
        formData.append('imgFIle', ImgRef.current.files[0]);
        formData.append('introduction', postContent);

        axios.put(`http://13.125.71.197/api/users/edit/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response);
            setOpen(false);
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            console.log("?????????");
        })
        setOpen(false);

    }

    return (
        <div>
            <Button size='small' onClick={handleOpen}>????????? ??????</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ position: 'relative' }} >
                    <Typography style={{ textAlign: "center", borderBottom: "1px solid" }} id="modal-modal-title" variant="h6" component="h2">
                        ????????? ??????
                    </Typography>
                    <Button style={{ position: 'absolute', top: "3%", right: "4%" }} variant="text" onClick={PostData}>????????????</Button>
                    <div style={{ height: "100%", display: "flex", justifyContent: "space-center", alignItems: "center" }}>
                        <div style={{ padding: '0 20px', width: "450px" }}>
                            <CardMedia
                                component="img"
                                height="350"

                                image={postImg}


                            />
                            <input accept="image/*" ref={ImgRef} multiple type="file" name="img" onChange={SaveData} />

                        </div>
                        <div style={{ width: '40%' }}>
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                label="?????????"
                                multiline
                                rows={15}
                                placeholder="?????? ??????"
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