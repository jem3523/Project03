import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import globalContext from "../../utils/store.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item

function Navbar() {
  // for checking global (and only show "logout link" if email is in global)
  const { email, emailHandler } = useContext(globalContext);
  let history = useHistory();

  // logs out the user from session
  const handleLogout = () => 
  axios({
    method: "get",
    url: "/api/user/logout",
  })
    .then(data => {
      emailHandler("");
      history.push("/");
      console.log("logged out email", email)
      console.log("logged out from frontend");
    })
    .catch(err => {
      console.log("log out error", err);
    });

  return (
    <nav className="nav-wrapper blue darken-1">
      <Link className="brand-logo center" to="/">
        Convert-a-Trip
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item right">
            <Link
              to="/"
              className={
                window.location.pathname === "/" ||
                window.location.pathname === "/login"
                  ? "nav-link active"
                  : "nav-link"
              }
              // runs log out call on click
              onClick={()=> handleLogout()}
            >
              {/* only show the logout link if there is an email in globals (logged in) */}
              {email ? "Logout" : ""}
            </Link>
          </li>
          {/* REMOVED LINK TO TRIP AFTER TESTING COMPLETE
          <li className="nav-item right">
            <Link
              to="/trips"
              className={
                window.location.pathname === "/main"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Trips
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
