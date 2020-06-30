import React from "react";
import "./Navbar.css";
import logo from './logoPando.png'
import { useHistory, NavLink } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  const onLogout = () => {
    localStorage.removeItem("access_token");
    history.replace("/");
  };
  return (
    <nav className="Navbar">
    <NavLink exact to="/plants">
      <img src={logo} style={{height:109, width:179}}></img>
    </NavLink>
      <ul className="Navbar-choice">
        <li>
          <NavLink exact to="/donate" className="button" activeClassName="button-active">Donate</NavLink>
        </li>
        <li>
          <button className="button" onClick={onLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
