import React, { useEffect } from "react";
import { Paper, List, ListItem, ListItemText, Button, ListItemIcon, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";

const SearchTable = ({ searchList, isShow }) => {

    const [showBox, setShowBox] = useState(isShow)
    // console.log(searchList.length);
    // console.log(showBox);
    // const [userList, SetuserList] = useState(searchList);

    return (
        <>
            {isShow && <Paper sx={{ width: '300px', maxHeight: '200px', bgcolor: "#dcdcdc" }}>
                <List style={{ maxHeight: '200px', overflow: 'auto', position: 'absolute' }}>
                    {searchList.map((user) => {
                        return (
                            <ListItem sx={{ backgroundColor: 'gray', width: '300px' }}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <Button fullWidth href={`mypage/${user.username}`} sx={{ color: 'white' }}> {user.username}
                                </Button>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>}
        </>
    )
}

export default SearchTable;