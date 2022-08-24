import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { InputBase, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { useState } from 'react'
import { getCookies } from '../../../shared/Cookies';
import axios from "axios";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostCard({ CardInfo }) {

    const [expanded, setExpanded] = React.useState(false);

    const [heart, setHeart] = useState(CardInfo.likeState);

    const token = getCookies('accessToken');
    const refreshToken = getCookies('refreshToken');
    const username = getCookies('username');

    const [comment, setComment] = useState('');

    const postComment = () => {
        //값 입력안되면 무시
        if (comment === "") return;


        axios.post(`http://3.38.212.192/api/posts/${CardInfo.postId}/comments`, { 'comment': comment }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'Refresh-Token': refreshToken
            }
        }
        ).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);

        }).then();
    }


    const deletPost = () => {
        axios.delete(`http://3.38.212.192/api/posts/${CardInfo.postId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Refresh-Token': refreshToken
            }
        }
        ).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);

        }).then();
    }


    const clickHeart = () => {
        //state변경으로 뷰 변경
        setHeart(!heart);

        axios.post(`http://3.38.212.192/api/posts/like/${CardInfo.postId}`, {}, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        }
        ).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);

        }).then();
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: 500 }}>
            <CardHeader
                avatar={
                    <Avatar alt={CardInfo.username.slice(0, 1)} src={CardInfo.profileUrl === null ? "" : CardInfo.profileUrl} sx={{ background: 'gray' }} />
                }
                action={
                    CardInfo.username === username ?
                        <IconButton aria-label="settings" onClick={deletPost}>
                            <DeleteIcon />
                        </IconButton> : null
                }
                title={CardInfo.username}
                subheader={CardInfo.createdAt.slice(0, 10)}
            />
            <CardMedia
                component="img"
                height="300"
                image={CardInfo.postUrl}//"img/default_img.jpeg"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {CardInfo.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={clickHeart}>
                    {heart ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteTwoToneIcon sx={{ color: 'red' }} />}
                    <Typography>{CardInfo.likeCnt}</Typography>
                </IconButton>
                {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <Typography>댓글 보기</Typography>
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            {/* 댓글 */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant='h6' component="h6">댓글</Typography>
                    {CardInfo.commentList.map((comment) => {
                        return (
                            <>
                                <Typography paragraph>
                                    {comment.username} {comment.comment}
                                    {
                                        comment.username === username ?
                                            <IconButton aria-label="settings">
                                                <DeleteIcon />
                                            </IconButton> : null
                                    }

                                </Typography>


                            </>

                        )
                    })}
                </CardContent>
            </Collapse>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="댓글 달기"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={(e) => { setComment(e.target.value) }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <EditIcon onClick={postComment} />
                </IconButton>
            </Paper>

            {/* <TextField fullWidth id="fullWidth" placeholder='댓글 달기' /> */}




        </Card >
    );
}
