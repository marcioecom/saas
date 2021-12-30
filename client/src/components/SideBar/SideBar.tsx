import { Link } from "react-router-dom"
import { MdHome, MdOndemandVideo, MdSmsFailed } from "react-icons/md"

import logo from "../../assets/images/play512.png"
import "./sidebar.css"

const SideBar = () => {
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

  return (
    <>
      <div className="sidebar-container">
        <nav className="sidebar-nav">
          {pages.map((page, key) => (
            <Link
              key={key}
              className="sidebar-link"
              to={page.link}
            >
              <div className="sidebar-line">
                {page.icon}
                {page.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default SideBar;
