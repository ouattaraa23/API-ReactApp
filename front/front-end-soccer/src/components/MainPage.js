import React, { useEffect, useState } from "react";
import './MainPage.css';

function MainPage() {
    const [url, setUrl] = useState('');
    const [search, setSearch] = useState("");

    const searchPlayer = (event) => {
        if (event.key==="Enter") {
            setUrl(`http://localhost:28017/Players/${search}`);
        }
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
    </div>);
}

export default MainPage;

