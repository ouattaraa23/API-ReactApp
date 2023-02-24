import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './MainPage.css';

function MainPage() {
    const [url, setUrl] = useState('');
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     axios.get('http://localhost:28017/auth');
    // })

    const searchPlayer = (event) => {
        if (event.key==="Enter") {
            setUrl(`http://localhost:28017/Players/${search}`);
        }
    }

    function handleClick(e) {
        axios.get(`http://localhost:28017/logout/`)
    }

return (
    <div>
        <div>
            <h1>Welcome to a 2018/2019 Premier League Database</h1>
        </div>
        <div>
            <input type="text"
            onChange = {el => setSearch(el.target.value)}
            onKeyPress = {searchPlayer}></input>
        </div>
        <div>
          <button onClick={handleClick}>Logout</button>
        </div>
    </div>);
}

export default MainPage;

