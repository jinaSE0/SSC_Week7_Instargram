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

export default function PostCard() {

    const [expanded, setExpanded] = React.useState(false);

    const [heart, setHeart] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={() => { alert("삭제하시겠습니까?") }}>
                        <DeleteIcon />
                    </IconButton>
                }
                title="Username"
                subheader="게시일 날짜"
            />
            <CardMedia
                component="img"
                height="300"
                image="img/default_img.jpeg"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    -content내용-<br />
                    동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세.
                    무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => setHeart(!heart)}>
                    {heart ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteTwoToneIcon sx={{ color: 'red' }} />}
                    <Typography>123</Typography>
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
                    <Typography paragraph>
                        {"유저id / 댓글 내용 하하하하하하하ㅏ하하하하하하하ㅏ하하"}
                    </Typography>
                    <Typography paragraph>
                        {"유저id / 댓글 내용 호호호호호호호호호호호호ㅗ호호호호호호호호ㅗ호호"}
                    </Typography>
                    <Typography paragraph>
                        {"유저id / 댓글 내용 히히히히히히히ㅣ히히힣"}
                    </Typography>
                    <Typography paragraph>
                        {"유저id / 댓글 내용 헤헤헤헤헤ㅔ헿"}
                    </Typography>
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
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <EditIcon onClick={() => { alert("댓글을 게시하겠습니까?") }} />
                </IconButton>
            </Paper>

            {/* <TextField fullWidth id="fullWidth" placeholder='댓글 달기' /> */}




        </Card >
    );
}
