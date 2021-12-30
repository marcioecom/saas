import React, { useEffect, useState } from 'react';
import { MdMenu, MdHome, MdOndemandVideo, MdSmsFailed } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logo from "../../assets/images/play512.png"

import './style.css'

const NavBar = () => {
  const pages = [
    {
      name: "Dashboard",
      icon: <MdHome color="white" />,
      link: "/dashboard"
    },
    {
      name: "Videos",
      icon: <MdOndemandVideo color="white" />,
      link: "/videos"
    },
    {
      name: "Alguma coisa",
      icon: <MdSmsFailed color="white" />,
      link: "/a"
    }
  ]
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/profile")
      setName(data.name)
    })()
  }, []);

  return (
    <>
      <header className="header-dashboard">
        <div className="header-logo">
          <img src={logo} alt="VClick Logo" />
          <p>VClick</p>
        </div>
        <div className="profile">
          Olá, {name}
        </div>
      </header>
    
      {/* Mobile Version */}
      <div className="navbar">
        <details>
          <summary className="menu">
            <MdMenu
              fontSize="1.7rem"
            />
          </summary>
          <div className="dropdown-wrapper">
            {pages.map((page, key) => (
              <Link
                key={key}
                className="navbar-link"
                to={page.link}
              >
                <div className="navbar-line">
                  {page.icon}
                  {page.name}
                </div>
              </Link>
            ))}
          </div>
        </details>

        <div className="profile">
          Olá, { name }
        </div>
      </div>
    </>
  );
}
 
export default NavBar;
