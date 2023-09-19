import React, { useState } from 'react';
import './sidebar.css';
import { Avatar } from 'antd';
import { SearchOutlined, HomeOutlined, PlaySquareOutlined, LayoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="avatar-section">
                    <Avatar size={50} icon={<img src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611737.jpg?w=740&t=st=1694637819~exp=1694638419~hmac=d97fb780857f58c9685f99739016d1a8436bccdf09a211109ad57a653453e8b1" alt="Avatar" />} />
                </div>
                <ul> 
                    <Link to={"/Search"}>
                        <li><SearchOutlined className="icon" ></SearchOutlined> {isOpen && "Search"}</li>
                    </Link>
                    <Link to={"/"}>
                        <li><HomeOutlined className="icon"></HomeOutlined> {isOpen && "Home"}</li>
                        
                    </Link>
                    <Link to={"/sobre"}>
                        <li><PlaySquareOutlined className="icon"></PlaySquareOutlined> {isOpen && "Player"}</li>
                    </Link>
                    <li><LayoutOutlined className="icon"></LayoutOutlined> {isOpen && "Catalog"}</li>
                </ul>
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isOpen ? "←" : "→"}
                </button>
            </div>
        
    );
}

export default Sidebar;