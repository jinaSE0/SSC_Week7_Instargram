import React from "react";
import PostCard from "../../components/main/postcard/PostCard";
import { useState } from "react";
import axios from "axios"
const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const Main = (props) => {

    const [postList, setPostList] = useState([]);

    return (
        <div style={{ margin: 'auto', paddingTop: '20px', backgroundColor: "#dcdcdc", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            {test.map((card) => {
                return <PostCard key={card} />
            })}
        </div>
    );
}

export default Main;