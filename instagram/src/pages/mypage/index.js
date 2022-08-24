import React from "react";
import UserCard from "../../components/mypage/UserCard";
import PostList from "../../components/mypage/PostList";

const MyPage = (props) => {
    return (
        <>
            <UserCard />
            <PostList />
        </>
    )
}

export default MyPage;