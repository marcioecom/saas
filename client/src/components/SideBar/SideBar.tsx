import { Link } from "react-router-dom"
import { MdDashboard, MdOndemandVideo, MdSmsFailed } from "react-icons/md"

import logo from "../../assets/images/play512.png"
import "./sidebar.css"

const SideBar = () => {
  const pages = [
    {
      name: "Dashboard",
      icon: <MdDashboard color="white" />,
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
  return (
    <>
      <div className="sidebar-container">
        <header className="side-header">
          <div className="sidebar-title">
            <img src={logo} alt="VClick Logo" />
            <p>VClick</p>
          </div>
        </header>
        <nav className="sidebar-nav">
          {pages.map((val, key) => (
            <Link
              key={key}
              className="sidebar-link"
              to={val.link}
            >
              <div
                className="sidebar-line"
                id={
                  window.location.pathname === val.link ?
                    "active" : ""
                }
              >
                {val.icon}
                {val.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default SideBar;
