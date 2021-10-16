import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

import "./notfound.css"

const NotFound: FunctionComponent = () => {
  return ( 
    <>
      <div className="not-found-wrapper">
        <img
          className="not-found-img"
          src="https://i.imgur.com/qIufhof.png"
          alt="Not found img" 
        />
        <div>
          <h2>This page could not be found</h2>
          <Link to="/login">
            <Button>
              Ir para home
            </Button>
          </Link>
        </div>
      </div >
    </>
  );
}
 
export default NotFound;
