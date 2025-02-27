// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power, LogIn, LogOut } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/defaultadmin.svg";

// src/logout.js (or within a component where you handle user actions)
const logout = () => {
  // Remove tokens from local storage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');

  // Redirect to the login page
  window.location.href = '/login'; // Adjust the redirect path as needed
};

const UserDropdown = () => {
  const username = localStorage.getItem('username') || 'Guest';

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">Hello</span>
          <span className="user-status">{username}</span>
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        {username === 'admin' ? (
          <DropdownItem onClick={logout}>
            <LogOut size={14} className="me-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        ) : (
          <DropdownItem tag={Link} to="/login">
            <LogIn size={14} className="me-75" />
            <span className="align-middle">Login</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
