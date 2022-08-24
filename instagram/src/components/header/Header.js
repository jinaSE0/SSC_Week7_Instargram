import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

import PostModal from '../postmodal/PostModal';

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import SearchTable from "./SearchTable";
import { getCookies, removeCookies } from "../../shared/Cookies";



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Header = () => {

    const navigate = useNavigate();
    // const [param, SetParam] = useState(useParams());
    const { param } = useParams();
    //로그인 체크
    const [login, setLogin] = useState(false);

    //유저 search
    const [searchList, setSearchList] = useState("");
    const [isShow, setIsShow] = useState(false);

    //로그아웃 기능
    const Logout = () => {
        removeCookies('accessToken');
        removeCookies('refreshToken');
        removeCookies('username');
    }



    const token = getCookies('accessToken');
    const refreshToken = getCookies('refreshToken');

    const searchPost = (e) => {

        if (token === undefined || refreshToken === undefined) return;
        axios.get(`http://3.38.212.192/api/users/search?username=${e.target.value}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Refresh-Token': refreshToken
            }
        }).then((response) => {
            console.log(response);
            setSearchList(response.data.data)
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            console.log("아몰랑");
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant="text" sx={{ color: 'white', width: '20', flexGrow: 1 }} onClick={() => navigate('/')}>
                        Instargram
                    </Button>
                    <div style={{ flexGrow: 4 }}></div>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={searchPost}
                        />
                        <SearchTable searchList={searchList === null ? [] : [...searchList]} isShow={searchList === null ? false : true} />
                    </Search >

                    <div style={{ display: 'flex', flexGrow: 3, justifyContent: "center", gap: '30px' }}>
                        {token !== undefined ?
                            <>
                                <PostModal />
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                <Button color="inherit" onClick={Logout}>로그아웃</Button>
                            </>
                            : <Button color="inherit" onClick={() => navigate('/login')}>로그인/회원가입</Button>}

                    </div>

                </Toolbar>
            </AppBar>
        </Box>

    )
}

export default Header